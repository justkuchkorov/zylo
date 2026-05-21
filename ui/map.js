function updateMapPreview() {
  const state = getState();
  const destination = state.to === "Anywhere" ? previewDestination(state.from) : state.to;
  const previewState = { ...state, to: destination };
  const plannedStop = plannedStopName(previewState, destination);
  const options = plannedStop
    ? buildPlannedOutbounds(previewState.from, plannedStop, destination, previewState)
    : buildOneWay(previewState.from, destination, previewState);
  const visualRoute = chooseMapRoute(options, previewState);
  const codePath = visualRoute
    ? airportPath({ outbound: visualRoute })
    : [previewState.from, plannedStop, destination].filter(Boolean).map(cityCode).join(" → ");
  const routePrice = visualRoute ? routeCost(visualRoute) * (previewState.tripType === "round" ? 2 : 1) : 0;
  mapCaption.textContent = codePath;
  mapPrice.textContent = routePrice ? money(routePrice) : "Search";
  mapHint.textContent = visualRoute ? "direct preview" : "selected cities preview";
  updateCityInsight(destination);

  if (!routeMap) return;

  const fromLatLng = cityLatLng(previewState.from);
  const toLatLng = cityLatLng(destination);
  const stopLatLng = plannedStop ? cityLatLng(plannedStop) : null;
  const routeLatLngs = curvedRouteLatLngs(stopLatLng ? [fromLatLng, stopLatLng, toLatLng] : [fromLatLng, toLatLng]);
  const distance = routeDistanceKm(fromLatLng, toLatLng);

  fromMarker.setLatLng(fromLatLng).setIcon(cityPin(previewState.from, "from"));
  toMarker.setLatLng(toLatLng).setIcon(cityPin(destination, "to"));
  if (plannedStop && stopLatLng) {
    stopMarker.setLatLng(stopLatLng).setIcon(cityPin(plannedStop, "stop"));
    stopMarker.addTo(routeMap);
  } else {
    stopMarker.remove();
  }
  routeLine.setLatLngs(routeLatLngs);
  routeLineShadow.setLatLngs(routeLatLngs);

  const bounds = L.latLngBounds(routeLatLngs);
  routeMap.fitBounds(bounds.pad(0.08), mapFitOptions(distance));
}

function curvedRouteLatLngs(points) {
  if (points.length < 2) return points;
  return points.slice(0, -1).flatMap((point, index) => {
    const segment = curvedSegment(point, points[index + 1], 28);
    return index === 0 ? segment : segment.slice(1);
  });
}

function curvedSegment(from, to, steps) {
  const [fromLat, fromLon] = from;
  const [toLat, toLon] = to;
  const dx = toLon - fromLon;
  const dy = toLat - fromLat;
  const distance = Math.hypot(dx, dy) || 1;
  const bend = Math.min(7, Math.max(1.2, distance * 0.16));
  const direction = fromLon < toLon ? 1 : -1;
  const control = [
    (fromLat + toLat) / 2 + (-dx / distance) * bend * direction,
    (fromLon + toLon) / 2 + (dy / distance) * bend * direction,
  ];

  return Array.from({ length: steps + 1 }, (_, step) => {
    const t = step / steps;
    const inv = 1 - t;
    return [
      inv * inv * fromLat + 2 * inv * t * control[0] + t * t * toLat,
      inv * inv * fromLon + 2 * inv * t * control[1] + t * t * toLon,
    ];
  });
}

function initRouteMap() {
  if (!mapElement || !window.L) return;

  routeMap = L.map(mapElement, {
    attributionControl: true,
    boxZoom: false,
    doubleClickZoom: false,
    dragging: false,
    keyboard: false,
    scrollWheelZoom: false,
    tap: false,
    touchZoom: false,
    zoomSnap: 0.1,
    zoomDelta: 0.25,
    zoomControl: false,
  }).setView([48.8, 10.5], 4);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 9,
    minZoom: 3,
  }).addTo(routeMap);

  routeLineShadow = L.polyline([], {
    className: "route-shadow",
    color: "#fff",
    opacity: 0.9,
    weight: 8,
  }).addTo(routeMap);

  routeLine = L.polyline([], {
    className: "route-line",
    color: "#17211d",
    dashArray: "9 8",
    opacity: 0.72,
    weight: 3,
  }).addTo(routeMap);

  fromMarker = L.marker([0, 0], { icon: cityPin("From", "from"), interactive: false }).addTo(routeMap);
  stopMarker = L.marker([0, 0], { icon: cityPin("Stop", "stop"), interactive: false });
  toMarker = L.marker([0, 0], { icon: cityPin("To", "to"), interactive: false }).addTo(routeMap);
}

function chooseMapRoute(options, state) {
  return options.find((route) => route.label === "Direct" || route.plannedStop) || null;
}

function previewDestination(from) {
  const options = destinationCities(from);
  if (options.includes("Barcelona")) return "Barcelona";
  return options[0] || "Barcelona";
}

function cityLatLng(cityName) {
  const coords = cityCoordinates[cityName] || cityCoordinates.Budapest;
  return [coords.lat, coords.lon];
}

function cityPin(cityName, type) {
  return L.divIcon({
    className: "city-pin-icon",
    html: `<div class="city-pin ${type}"><i></i><span>${cityLabelHtml(cityName)}<em>${cityCode(cityName)}</em></span></div>`,
    iconAnchor: [7, 14],
    iconSize: [190, 30],
  });
}

function mapFitOptions(distance) {
  const zoom = routePreviewZoom(distance);
  if (window.innerWidth < 980) {
    return {
      animate: true,
      maxZoom: zoom,
      padding: [38, 38],
    };
  }

  const mapRect = mapElement?.getBoundingClientRect();
  const formRect = form?.getBoundingClientRect();
  const coveredLeft = mapRect && formRect ? Math.max(0, formRect.right - mapRect.left) : 430;
  const mapWidth = mapRect?.width || window.innerWidth;
  const safeLeft = Math.round(Math.min(mapWidth * 0.42, Math.max(390, coveredLeft + 72)));
  const safeRight = Math.round(Math.min(150, Math.max(96, mapWidth * 0.09)));

  return {
    animate: true,
    maxZoom: zoom,
    paddingBottomRight: [safeRight, 72],
    paddingTopLeft: [safeLeft, 72],
  };
}

function routePreviewZoom(distance) {
  if (distance < 450) return 7.35;
  if (distance < 850) return 6.8;
  if (distance < 1500) return 6.15;
  if (distance < 2300) return 5.45;
  if (distance < 3100) return 5.05;
  return 4.7;
}

function routeDistanceKm(from, to) {
  const [lat1, lon1] = from.map(radians);
  const [lat2, lon2] = to.map(radians);
  const deltaLat = lat2 - lat1;
  const deltaLon = lon2 - lon1;
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function radians(value) {
  return (value * Math.PI) / 180;
}

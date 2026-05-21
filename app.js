var form = document.querySelector("#tripForm");
var fromCity = document.querySelector("#fromCity");
var toCity = document.querySelector("#toCity");
var addStop = document.querySelector("#addStop");
var stopCity = document.querySelector("#stopCity");
var stopLength = document.querySelector("#stopLength");
var stopFields = document.querySelector("#stopFields");
var dateOut = document.querySelector("#dateOut");
var tripLength = document.querySelector("#tripLength");
var budget = document.querySelector("#budget");
var budgetValue = document.querySelector("#budgetValue");
var nearbyAirports = document.querySelector("#nearbyAirports");
var selfTransfer = document.querySelector("#selfTransfer");
var includeHostel = document.querySelector("#includeHostel");
var flexDates = document.querySelector("#flexDates");
var backpackOnly = document.querySelector("#backpackOnly");
var lowStress = document.querySelector("#lowStress");
var airportSleep = document.querySelector("#airportSleep");
var hostelLimit = document.querySelector("#hostelLimit");
var hostelLimitValue = document.querySelector("#hostelLimitValue");
var lengthField = document.querySelector("#lengthField");
var tripToggle = document.querySelector(".trip-toggle");
var results = document.querySelector("#results");
var resultsTitle = document.querySelector("#resultsTitle");
var resultCount = document.querySelector("#resultCount");
var dataNote = document.querySelector("#dataNote");
var cards = document.querySelector("#cards");
var template = document.querySelector("#routeTemplate");
var mapElement = document.querySelector("#routeMap");
var mapCaption = document.querySelector("#mapCaption");
var mapPrice = document.querySelector("#mapPrice");
var mapHint = document.querySelector("#mapHint");
var plannerSection = document.querySelector("#routePlanner");
var cityInsight = document.querySelector("#cityInsight");
var insightCity = document.querySelector("#insightCity");
var insightMood = document.querySelector("#insightMood");
var insightFact = document.querySelector("#insightFact");
var insightTags = document.querySelector("#insightTags");
var nearbyRoutePills = document.querySelector("#nearbyRoutePills");
var popularRoutePills = document.querySelector("#popularRoutePills");
var routeDiscovery = document.querySelector(".route-discovery");
var cityByName = new Map(cities.map((item) => [item.name, item]));
var routeMap;
var fromMarker;
var stopMarker;
var toMarker;
var routeLine;
var routeLineShadow;
var renderToken = 0;

function init() {
  fillSelects();
  enhanceSelects();
  initRouteMap();
  document.querySelectorAll("[data-open-planner]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      plannerSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        routeMap?.invalidateSize();
        updateMapPreview();
      }, 360);
    });
  });
  dateOut.value = toInputDate(addDays(new Date(), 21));
  budget.addEventListener("input", () => {
    budgetValue.value = money(Number(budget.value));
    updateMapPreview();
  });
  hostelLimit.addEventListener("input", () => {
    hostelLimitValue.value = `${money(Number(hostelLimit.value))}/night`;
    updateMapPreview();
  });
  form.addEventListener("change", () => {
    syncTripType();
    syncStopover();
    updateMapPreview();
    updateRouteDiscovery();
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });
  routeDiscovery?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-preset]");
    if (!button) return;
    toCity.value = button.dataset.preset;
    refreshCustomSelect(toCity);
    updateMapPreview();
    updateRouteDiscovery();
    render();
  });
  syncTripType();
  syncStopover();
  updateMapPreview();
  updateRouteDiscovery();
  window.addEventListener("resize", () => {
    routeMap?.invalidateSize();
    updateMapPreview();
  });
}

function fillSelects() {
  cities.forEach((item) => fromCity.append(new Option(item.name, item.name)));
  toCity.append(new Option("Anywhere cheap", "Anywhere"));
  cities.forEach((item) => toCity.append(new Option(item.name, item.name)));
  cities.forEach((item) => stopCity.append(new Option(item.name, item.name)));
  fromCity.value = "Budapest";
  toCity.value = "Barcelona";
  stopCity.value = "Rome";
}

function syncTripType() {
  const roundTrip = tripType() === "round";
  lengthField.style.display = roundTrip ? "" : "none";
  tripToggle.dataset.active = roundTrip ? "round" : "oneway";
}

function syncStopover() {
  const active = addStop.checked;
  form.classList.toggle("has-stopover", active);
  stopFields.hidden = !active;
  stopCity.disabled = !active;
  stopLength.disabled = !active;
  if (active && (stopCity.value === fromCity.value || stopCity.value === toCity.value)) {
    const fallback = cities.find((item) => item.name !== fromCity.value && item.name !== toCity.value);
    if (fallback) {
      stopCity.value = fallback.name;
      refreshCustomSelect(stopCity);
    }
  }
}

function updateCityInsight(cityName) {
  if (!cityInsight || !insightCity || !insightMood || !insightFact || !insightTags) return;
  const cityItem = cities.find((item) => item.name === cityName);
  const market = hostelMarkets[cityName];
  const insight = cityInsights[cityName] || {
    mood: `${cityName} is in the route brain. Use the search to see if the price, timing, and stay length make sense.`,
    tags: ["city time", "hostel check", "weather"],
  };
  const hostelText = market ? `hostel ~${money(market.typical)}` : "hostel estimate";
  const tags = [hostelText, ...insight.tags].slice(0, 4);

  cityInsight.hidden = cityName === "Anywhere";
  insightCity.innerHTML = `${cityItem ? flagBadgeHtml(cityItem) : ""}<span>${escapeHtml(cityName)}</span>`;
  insightMood.textContent = insight.mood;
  insightFact.textContent = cityFacts[cityName] || "Zylo only likes it when price, bed, weather, and real city time agree.";
  insightTags.innerHTML = tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
}

function updateRouteDiscovery() {
  const state = getState();
  renderPresetButtons(nearbyRoutePills, nearbyDiscoveryCities(state.from, state.to));
  renderPresetButtons(popularRoutePills, popularDiscoveryCities(state.from, state.to));
}

function nearbyDiscoveryCities(fromName, toName) {
  const from = cityByName.get(fromName);
  const directGround = from?.nearby?.map((item) => item.cityName) || [];
  const intercityGround = groundRoutes.filter((leg) => leg.from === fromName).map((leg) => leg.to);
  return uniqueNames([...directGround, ...intercityGround, ...nearestCities(fromName, 5)])
    .filter((name) => name !== fromName && name !== toName && cityByName.has(name))
    .slice(0, 4);
}

function popularDiscoveryCities(fromName, toName) {
  return uniqueNames(["Barcelona", "Rome", "Paris", "Milan", "London", "Athens", "Anywhere"])
    .filter((name) => name !== fromName && name !== toName)
    .slice(0, 4);
}

function nearestCities(fromName, limit) {
  const fromCoords = cityCoordinates[fromName];
  if (!fromCoords) return [];
  return cities
    .filter((item) => item.name !== fromName && cityCoordinates[item.name])
    .map((item) => ({
      name: item.name,
      distance: routeDistanceKm([fromCoords.lat, fromCoords.lon], cityLatLng(item.name)),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map((item) => item.name);
}

function renderPresetButtons(container, names) {
  if (!container) return;
  container.innerHTML = names
    .map((name) => {
      const label = name === "Anywhere" ? "Anywhere cheap" : name;
      return `<button type="button" data-preset="${escapeHtml(name)}">${escapeHtml(label)}</button>`;
    })
    .join("");
}

function uniqueNames(names) {
  return [...new Set(names.filter(Boolean))];
}

function getState() {
  return {
    from: fromCity.value,
    to: toCity.value,
    date: dateOut.value,
    tripType: tripType(),
    length: Number(tripLength.value),
    budget: Number(budget.value),
    nearby: nearbyAirports.checked,
    stops: selfTransfer.checked,
    hostel: includeHostel.checked,
    flexDates: flexDates.checked,
    plannedStop: addStop.checked,
    stopCity: stopCity.value,
    stopLength: Number(stopLength.value),
    backpackOnly: backpackOnly.checked,
    lowStress: lowStress.checked,
    airportSleep: airportSleep.checked,
    hostelLimit: Number(hostelLimit.value),
    tripStyle: document.querySelector("input[name='tripStyle']:checked")?.value || "balanced",
  };
}

function tripType() {
  return document.querySelector("input[name='tripType']:checked").value;
}

function routeCost(route) {
  return route.legs.reduce((sum, leg) => sum + leg.price, 0);
}

function routeHours(route) {
  return route.legs.reduce((sum, leg) => sum + (leg.kind === "stay" ? 0 : leg.hours), 0);
}

function flightLegs(route) {
  if (!route) return [];
  return route.legs.filter((leg) => leg.kind === "flight");
}

function groundTravelLegs(route) {
  if (!route) return [];
  return route.legs.filter((leg) => leg.kind === "ground");
}

function routeHasFlights(route) {
  return flightLegs(route).length > 0;
}

function routeBonusCities(trip) {
  return [
    trip.outbound?.bonusCity,
    trip.inbound?.bonusCity,
  ].filter((cityName, index, citiesList) => cityName && citiesList.indexOf(cityName) === index);
}

function hostelStatText(trip) {
  if (!trip.plannedStop) return `${trip.hostelNights} × ${money(trip.hostelNightly)}`;
  const parts = [];
  if (trip.stopHostelNights) parts.push(`${trip.stopCity} ${trip.stopHostelNights} × ${money(trip.stopHostelNightly)}`);
  if (trip.destinationHostelNights) {
    parts.push(`${trip.destination} ${trip.destinationHostelNights} ${trip.destinationHostelNights === 1 ? "night" : "nights"}`);
  }
  return parts.join(" + ") || `${trip.hostelNights} nights`;
}

function airportPath(trip) {
  const travelLegs = trip.outbound.legs.filter((leg) => !["pause", "stay"].includes(leg.kind));
  const first = travelLegs[0];
  const parts = first ? [first.fromAirport || first.from] : [];
  travelLegs.forEach((leg) => parts.push(leg.toAirport || leg.to));
  return [...new Set(parts)].join(" → ");
}

function tripDateLabel(trip) {
  if (!trip.returnDate) return shortDate(trip.date);
  return `${shortDate(trip.date)} → ${shortDate(trip.returnDate)}`;
}

function shortDate(value) {
  return parseInputDate(value).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function destinationCities(from) {
  const originAirports = getCity(from).airports;
  const codes = new Set(
    routeGraph.filter((leg) => originAirports.includes(leg.from)).map((leg) => airportCity.get(leg.to)).filter(Boolean),
  );
  groundRoutes.filter((leg) => leg.from === from).forEach((leg) => codes.add(leg.to));
  return [...codes].filter((cityName) => cityName !== from);
}

function getCity(name) {
  return cities.find((item) => item.name === name);
}

function cityCode(name) {
  return getCity(name)?.airports[0] || name.slice(0, 3).toUpperCase();
}

function cityDisplayName(name) {
  const item = getCity(name);
  return item?.name || name;
}

function cityLabelHtml(name) {
  const item = getCity(name);
  if (!item) return escapeHtml(name);
  return `${flagBadgeHtml(item)}<span class="city-label-text">${escapeHtml(item.name)}</span>`;
}

function flagBadgeHtml(cityItem) {
  if (!cityItem.flagCode) return "";
  return `<img class="flag-badge" src="https://flagcdn.com/w40/${cityItem.flagCode}.png" alt="${escapeHtml(cityItem.country)} flag" loading="lazy" />`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function hostelNightlyEstimate(cityName, date) {
  const market = hostelMarkets[cityName] || { low: 20, typical: 30, high: 50, confidence: "low" };
  const tripDate = parseInputDate(date);
  const seasonal = hostelSeasonFactor(cityName, tripDate.getMonth());
  const weekend = [5, 6].includes(tripDate.getDay()) ? 1.12 : 1;
  const noise = 0.94 + seededUnit(`${cityName}-${date}-hostel`) * 0.13;
  const nightly = clamp(Math.round(market.typical * seasonal * weekend * noise), market.low, market.high);
  return { ...market, nightly, seasonal, weekend, source: "static city estimate" };
}

function hostelSeasonFactor(cityName, month) {
  const summer = [5, 6, 7];
  const shoulder = [3, 4, 8, 9];
  const winter = [0, 1, 10, 11];
  const mediterranean = ["Barcelona", "Rome", "Lisbon", "Madrid"];
  const expensiveAllYear = ["London", "Paris"];

  if (mediterranean.includes(cityName) && summer.includes(month)) return 1.18;
  if (expensiveAllYear.includes(cityName) && summer.includes(month)) return 1.12;
  if (summer.includes(month)) return 1.08;
  if (shoulder.includes(month)) return 1.04;
  if (winter.includes(month)) return cityName === "London" ? 0.97 : 0.9;
  return 1;
}

function hostelNightlyCost(cityName, date = dateOut.value) {
  return hostelNightlyEstimate(cityName, date).nightly;
}

function hostelCost(cityName, nights, date = dateOut.value) {
  return Math.max(0, nights - 1) * hostelNightlyCost(cityName, date);
}

function airlineBookingUrl(leg, outboundDate, returnDate = null) {
  const dateIn = returnDate || "null";

  if (leg.airline === "Wizz Air") {
    return `https://wizzair.com/en-gb/booking/select-flight/${leg.from}/${leg.to}/${outboundDate}/${dateIn}/1/0/0/null`;
  }

  if (leg.airline === "Ryanair") {
    const params = new URLSearchParams({
      adults: "1",
      teens: "0",
      children: "0",
      infants: "0",
      dateOut: outboundDate,
      dateIn: returnDate || "",
      isConnectedFlight: "false",
      discount: "0",
      promoCode: "",
      originIata: leg.from,
      destinationIata: leg.to,
      tpAdults: "1",
      tpTeens: "0",
      tpChildren: "0",
      tpInfants: "0",
      tpStartDate: outboundDate,
      tpEndDate: returnDate || "",
      tpDiscount: "0",
      tpPromoCode: "",
      tpOriginIata: leg.from,
      tpDestinationIata: leg.to,
    });
    return `https://www.ryanair.com/gb/en/trip/flights/select?${params.toString()}`;
  }

  return flightSearchFallback(leg, outboundDate, returnDate);
}

function flightSearchFallback(leg, outboundDate, returnDate = null) {
  const route = `${leg.from}-${leg.to}`;
  const dates = returnDate ? `${outboundDate}/${returnDate}` : outboundDate;
  return `https://www.kayak.com/flights/${route}/${dates}?sort=bestflight_a`;
}

function parseInputDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function riskLabel(risk) {
  if (risk <= 1) return "Low";
  if (risk === 2) return "Medium";
  return "High";
}

function riskClass(risk) {
  if (risk <= 1) return "good";
  if (risk === 2) return "warn";
  return "bad";
}

function formatHours(hours) {
  const rounded = Math.round(hours * 10) / 10;
  return `${rounded.toFixed(rounded % 1 ? 1 : 0)}h`;
}

function money(value) {
  return `€${Math.round(value)}`;
}

function slugifyCity(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function seededUnit(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addHours(date, hours) {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + Math.round(hours * 60));
  return result;
}

function dateAtHour(value, hour) {
  const result = parseInputDate(value);
  const wholeHours = Math.floor(hour);
  const minutes = Math.round((hour - wholeHours) * 60);
  result.setHours(wholeHours, minutes, 0, 0);
  return result;
}

function tripReturnDate(date, length) {
  return toInputDate(addDays(parseInputDate(date), Math.max(0, Number(length) - 1)));
}

function toInputDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

init();

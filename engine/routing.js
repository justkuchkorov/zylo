function buildTrips(state) {
  const destinations = state.to === "Anywhere" ? destinationCities(state.from) : [state.to];
  const planned = destinations.flatMap((destination) => buildPlannedTrips(destination, state));
  if (planned.length) return planned;

  const outbound = destinations.flatMap((destination) => buildOneWay(state.from, destination, state));

  if (state.tripType === "oneway") {
    return outbound.map((out) => ({ destination: out.destination, outbound: out, inbound: null }));
  }

  return outbound
    .map((out) => {
      const returnOptions = buildOneWay(out.destination, state.from, { ...state, nearby: false }).sort(
        (a, b) => oneWaySort(a) - oneWaySort(b),
      );
      return { destination: out.destination, outbound: out, inbound: returnOptions[0] || null };
    })
    .filter((trip) => trip.inbound);
}

function buildPlannedTrips(destination, state) {
  const stopName = plannedStopName(state, destination);
  if (!stopName) return [];

  const outbound = buildPlannedOutbounds(state.from, stopName, destination, state);
  if (state.tripType === "oneway") {
    return outbound.map((out) => ({
      destination,
      plannedStop: true,
      stopCity: stopName,
      stopLength: state.stopLength,
      outbound: out,
      inbound: null,
    }));
  }

  return outbound
    .map((out) => {
      const returnOptions = buildOneWay(destination, state.from, { ...state, plannedStop: false, nearby: false }).sort(
        (a, b) => oneWaySort(a) - oneWaySort(b),
      );
      return {
        destination,
        plannedStop: true,
        stopCity: stopName,
        stopLength: state.stopLength,
        outbound: out,
        inbound: returnOptions[0] || null,
      };
    })
    .filter((trip) => trip.inbound);
}

function buildPlannedOutbounds(originName, stopName, destinationName, state) {
  const firstLegs = buildOneWay(originName, stopName, { ...state, plannedStop: false }).slice(0, 3);
  const secondLegs = buildOneWay(stopName, destinationName, { ...state, plannedStop: false }).slice(0, 3);
  const routes = [];

  firstLegs.forEach((first) => {
    secondLegs.forEach((second) => {
      routes.push(
        makeRoute(
          `${stopName} stop`,
          destinationName,
          [...first.legs, plannedCityStay(stopName, state.stopLength), ...second.legs],
          Math.max(first.risk, second.risk, 2),
          { plannedStop: true, stopCity: stopName, stopLength: state.stopLength },
        ),
      );
    });
  });

  return routes.sort((a, b) => oneWaySort(a) - oneWaySort(b));
}

function plannedStopName(state, destination) {
  if (!state.plannedStop || !state.stopCity) return "";
  if (state.stopCity === "Anywhere" || state.stopCity === state.from || state.stopCity === destination) return "";
  return state.stopCity;
}

function buildOneWay(originName, destinationName, state) {
  const origins = airportChoices(originName, state.nearby, "origin");
  const destinations = airportChoices(destinationName, state.nearby, "destination");
  const direct = [];

  groundRoutes
    .filter((leg) => leg.from === originName && leg.to === destinationName)
    .forEach((leg) => {
      direct.push(makeRoute("Bus/train", destinationName, [intercityLeg(leg)], 1));
    });

  origins.forEach((origin) => {
    destinations.forEach((destination) => {
      routeGraph
        .filter((leg) => leg.from === origin.airport && leg.to === destination.airport)
        .forEach((leg) => {
          direct.push(makeRoute("Direct", destinationName, [origin.ground, leg, destination.ground].filter(Boolean), 1));
        });
    });
  });

  const stopovers = state.stops
    ? [...buildStopovers(origins, destinations, destinationName), ...buildGroundHops(origins, originName, destinationName)]
    : [];
  return [...direct, ...stopovers].sort((a, b) => oneWaySort(a) - oneWaySort(b));
}

function oneWaySort(route) {
  return routeCost(route) + routeHours(route) * 1.2 + route.risk * 14;
}

function buildStopovers(origins, destinations, destinationName) {
  const routes = [];

  origins.forEach((origin) => {
    destinations.forEach((destination) => {
      routeGraph
        .filter((first) => first.from === origin.airport)
        .forEach((first) => {
          routeGraph
            .filter((second) => second.from === first.to && second.to === destination.airport)
            .forEach((second) => {
              const stopCity = airportCity.get(first.to);
              if (!stopCity || stopCity === airportCity.get(origin.airport) || stopCity === destinationName) return;
              routes.push(
                makeRoute(
                  `${stopCity} stop`,
                  destinationName,
                  [origin.ground, first, pause(stopCity), second, destination.ground].filter(Boolean),
                  3,
                ),
              );
            });
        });
    });
  });

  return routes;
}

function buildGroundHops(origins, originName, destinationName) {
  const routes = [];

  origins.forEach((origin) => {
    routeGraph
      .filter((flight) => flight.from === origin.airport)
      .forEach((flight) => {
        const gatewayCity = airportCity.get(flight.to);
        if (!gatewayCity || gatewayCity === originName || gatewayCity === destinationName) return;
        if (flight.to !== cityCode(gatewayCity)) return;

        groundRoutes
          .filter((groundRoute) => groundRoute.from === gatewayCity && groundRoute.to === destinationName)
          .forEach((groundRoute) => {
            routes.push(
              makeRoute(
                `${gatewayCity} gateway`,
                destinationName,
                [origin.ground, flight, pause(gatewayCity), intercityLeg(groundRoute)].filter(Boolean),
                2,
                { groundHop: true, bonusCity: gatewayCity },
              ),
            );
          });
      });
  });

  return routes;
}

function makeRoute(label, destination, legs, risk, meta = {}) {
  return { label, destination, legs, risk, ...meta };
}

function airportChoices(cityName, allowNearby, side) {
  const item = getCity(cityName);
  const own = item.airports.map((airport) => ({ airport, ground: null }));
  if (!allowNearby && own.length) return own;

  const nearby = item.nearby.map((near) => ({
    airport: near.airport,
    ground:
      side === "origin"
        ? groundLeg(item.name, cityName, near.cityName, near.airport, near.price, near.hours, near.provider)
        : groundLeg(item.name, near.cityName, cityName, near.airport, near.price, near.hours, near.provider),
  }));

  return [...own, ...nearby];
}

function groundLeg(homeCity, from, to, airport, price, hours, provider) {
  return {
    kind: "ground",
    from,
    to,
    fromAirport: cityCode(from),
    toAirport: to === homeCity ? cityCode(to) : airport,
    airline: provider,
    price,
    hours,
    homeCity,
  };
}

function intercityLeg(leg) {
  return { ...leg };
}

function plannedCityStay(cityName, days) {
  return {
    kind: "stay",
    cityName,
    from: cityName,
    to: cityName,
    price: 0,
    hours: Math.max(1, Number(days)) * 24,
    airline: "Planned city stop",
  };
}

function pause(cityName) {
  return { kind: "pause", cityName, price: 0, hours: 3.5, airline: "Self-transfer buffer" };
}

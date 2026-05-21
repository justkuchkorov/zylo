var liveWeatherCache = new Map();

function buildRatedTrips(state) {
  const candidates = searchStates(state)
    .flatMap((searchState) =>
      buildTrips(searchState).map((trip) => scoreTrip(priceTrip(trip, searchState), searchState)),
    )
    .filter((trip) => state.to !== "Anywhere" || trip.total <= state.budget);

  const ranked = dedupeTrips(candidates).sort((a, b) => a.sort - b.sort);
  annotateTimingComparisons(ranked, state);
  return diversifyTrips(ranked).slice(0, 8);
}

function diversifyTrips(ranked) {
  const selected = ranked.slice(0, 8);
  const hasGateway = selected.some((trip) => trip.bonusCities?.length);
  const gateway = ranked.find((trip) => trip.bonusCities?.length);

  if (!hasGateway && gateway && selected.length >= 4 && gateway.sort <= selected[0].sort + 120) {
    selected[selected.length - 1] = gateway;
    return selected.sort((a, b) => a.sort - b.sort);
  }

  return selected;
}

function annotateTimingComparisons(trips, state) {
  if (!state.flexDates || state.tripType !== "round") return;

  trips.forEach((trip) => {
    const sameDestination = trips.filter((candidate) => candidate.destination === trip.destination && candidate !== trip);
    const shorter = sameDestination
      .filter((candidate) => candidate.length < trip.length)
      .sort((a, b) => Math.abs(a.total - trip.total) - Math.abs(b.total - trip.total))[0];
    const longer = sameDestination
      .filter((candidate) => candidate.length > trip.length && candidate.total <= trip.total + 12)
      .sort((a, b) => b.length - a.length || a.total - b.total)[0];

    if (shorter && trip.total <= shorter.total + 12 && trip.length > shorter.length) {
      const diff = trip.total - shorter.total;
      trip.timingInsight =
        diff <= 0
          ? `${trip.length} days is actually cheaper than a ${shorter.length}-day version.`
          : `${trip.length} days costs only ${money(diff)} more than ${shorter.length} days.`;
      return;
    }

    if (longer && state.tripStyle !== "short") {
      const diff = longer.total - trip.total;
      trip.timingInsight =
        diff <= 0
          ? `${longer.length} days is available for less than this shorter trip.`
          : `${longer.length} days is only ${money(diff)} more, worth checking if you are free.`;
      return;
    }

    trip.timingInsight = state.tripStyle === "short" ? "Short-trip mode keeps the scan focused on quick escapes." : "This is the best balance found in the 30-day scan.";
  });
}

function searchStates(state) {
  if (!state.flexDates || state.tripType === "oneway") return [state];

  const startDate = parseInputDate(state.date);
  return dateCandidates(startDate).flatMap((date) =>
    stayCandidates(state).map((length) => ({
      ...state,
      date: toInputDate(date),
      length,
    })),
  );
}

function dateCandidates(startDate) {
  return [0, 2, 4, 6, 8, 11, 14, 17, 20, 24, 28].map((offset) => addDays(startDate, offset));
}

function stayCandidates(state) {
  const exact = state.length;
  const ranges = {
    short: [1, 2, 3],
    balanced: [2, 3, 4, 5],
    longer: [3, 4, 5, 7],
  };
  return [...new Set([exact, ...(ranges[state.tripStyle] || ranges.balanced)])].sort((a, b) => a - b);
}

function priceTrip(trip, state) {
  const tripLength = trip.plannedStop ? state.length + trip.stopLength : state.length;
  const returnDate = state.tripType === "round" ? tripReturnDate(state.date, tripLength) : null;
  return {
    ...trip,
    date: state.date,
    returnDate,
    length: tripLength,
    finalLength: state.length,
    outbound: priceRoute(trip.outbound, state.date, "outbound"),
    inbound: trip.inbound ? priceRoute(trip.inbound, returnDate || state.date, "return") : null,
  };
}

function priceRoute(route, date, direction) {
  const priced = {
    ...route,
    legs: route.legs.map((leg) => priceLeg(leg, date, direction)),
  };
  return scheduleRoute(priced, date, direction);
}

function priceLeg(leg, date, direction) {
  if (leg.kind !== "flight") return { ...leg };
  const multiplier = fareMultiplier(leg, date, direction);
  return {
    ...leg,
    basePrice: leg.price,
    price: Math.max(14, Math.round(leg.price * multiplier)),
  };
}

function fareMultiplier(leg, date, direction) {
  const day = parseInputDate(date).getDay();
  const dayFactor = [1.22, 1.02, 0.88, 0.86, 0.94, 1.2, 1.08][day];
  const routeNoise = seededUnit(`${leg.airline}-${leg.from}-${leg.to}-${date}`) * 0.42 - 0.16;
  const returnFactor = direction === "return" ? 1.05 : 1;
  return clamp(dayFactor + routeNoise, 0.72, 1.55) * returnFactor;
}

function scheduleRoute(route, date, direction) {
  const firstFlightIndex = route.legs.findIndex((leg) => leg.kind === "flight");
  let cursor;
  if (firstFlightIndex >= 0) {
    const firstDeparture = estimatedFlightDeparture(route.legs[firstFlightIndex], date, direction);
    const preFlightHours = route.legs.slice(0, firstFlightIndex).reduce((sum, leg) => sum + leg.hours, 0);
    cursor = addHours(firstDeparture, -preFlightHours);
  } else {
    cursor = estimatedGroundDeparture(route, date, direction);
  }

  const legs = route.legs.map((leg) => {
    const departsAt = cursor;
    const arrivesAt = addHours(cursor, leg.hours);
    cursor = arrivesAt;
    return { ...leg, departsAt, arrivesAt };
  });

  return { ...route, legs };
}

function dedupeTrips(trips) {
  const best = new Map();
  trips.forEach((trip) => {
    const key = `${trip.date}-${trip.length}-${airportPath(trip)}-${trip.inbound ? airportPath({ outbound: trip.inbound }) : ""}`;
    const existing = best.get(key);
    if (!existing || trip.sort < existing.sort) best.set(key, trip);
  });
  return [...best.values()];
}

function scoreTrip(trip, state) {
  const outboundCost = routeCost(trip.outbound);
  const inboundCost = trip.inbound ? routeCost(trip.inbound) : 0;
  const flightCount = flightLegs(trip.outbound).length + flightLegs(trip.inbound).length;
  const baggage = state.backpackOnly ? 0 : flightCount * 18;
  const practicalStay = practicalStayFor(trip, state);
  const hostelInfo = hostelNightlyEstimate(trip.destination, trip.date || state.date);
  const finalLength = trip.finalLength || state.length;
  const destinationHostelNights = state.tripType === "round" ? Math.max(0, finalLength - 1) : 0;
  const stopHostelInfo = trip.stopCity ? hostelNightlyEstimate(trip.stopCity, trip.date || state.date) : null;
  const stopHostelNights = trip.stopCity ? Math.max(0, trip.stopLength || 0) : 0;
  const hostelNights = destinationHostelNights + stopHostelNights;
  const hostel =
    state.hostel
      ? destinationHostelNights * hostelInfo.nightly + stopHostelNights * (stopHostelInfo?.nightly || 0)
      : 0;
  const hostelNightly = hostelNights ? Math.round(hostel / hostelNights) : hostelInfo.nightly;
  const total = outboundCost + inboundCost + hostel + baggage;
  const hours = routeHours(trip.outbound) + (trip.inbound ? routeHours(trip.inbound) : 0);
  const rawRisk = Math.max(trip.outbound.risk, trip.inbound?.risk || 1);
  const stopCount = Math.max(0, flightLegs(trip.outbound).length + flightLegs(trip.inbound).length - (trip.inbound ? 2 : 1));
  const risk = personalityRisk(rawRisk, stopCount, state);
  const tripDays = state.tripType === "round" ? Math.max(1, trip.length || state.length) : 1;
  const perDay = Math.round(total / tripDays);
  const weatherInfo = weatherEstimate(trip.destination, trip.date || state.date);
  const weather = weatherInfo.score;
  const hostelPressure =
    Math.max(0, hostelInfo.nightly - state.hostelLimit) * destinationHostelNights +
    Math.max(0, (stopHostelInfo?.nightly || 0) - state.hostelLimit) * stopHostelNights;
  const hostelValueBonus =
    Math.max(0, state.hostelLimit - hostelInfo.nightly) * Math.min(destinationHostelNights, 4) * 0.55 +
    Math.max(0, state.hostelLimit - (stopHostelInfo?.nightly || state.hostelLimit)) * Math.min(stopHostelNights, 3) * 0.45;
  const styleBonus = tripStyleBonus(state.tripStyle, tripDays, hostelNightly, state.hostelLimit);
  const bonusCities = routeBonusCities(trip);
  const groundHopBonus = bonusCities.length ? (state.tripStyle === "short" ? 2 : 7) : 0;
  const stayCall = stayCallFor(hostelNightly, hostelNights, perDay, state, practicalStay);
  const trust = routeTrust({ ...trip, stopCount }, weatherInfo);
  const worth = clamp(
    Math.round(
      105 -
        perDay * 0.42 -
        total * 0.08 -
        hours * (state.lowStress ? 1.05 : 0.82) -
        risk * (state.lowStress ? 8.5 : 6.4) -
        baggage * 0.12 -
        hostelPressure * 0.65 -
        practicalStay.penalty +
        hostelValueBonus +
        practicalStay.score * 0.12 +
        weather * 0.16 +
        styleBonus +
        groundHopBonus +
        (stopCount ? 2 : 8),
    ),
    25,
    98,
  );
  const sort =
    total * 0.55 +
    perDay * (state.tripStyle === "longer" ? 1.15 : 0.82) +
    hours * (state.lowStress ? 0.88 : 0.66) +
    risk * (state.lowStress ? 16 : 11) +
    practicalStay.penalty * 1.4 +
    (80 - practicalStay.score) * 0.22 +
    baggage * 0.42 -
    worth * 0.28 -
    weather * 0.08 -
    hostelValueBonus -
    styleBonus -
    groundHopBonus * 1.35;
  const adjustedSort = sort + hostelPressure * 1.35 + (state.tripStyle !== "longer" && hostelNightly > state.hostelLimit ? hostelNights * 9 : 0);

  return {
    ...trip,
    total,
    hours,
    risk,
    worth,
    weather,
    weatherSource: weatherInfo.source,
    weatherSummary: weatherInfo.summary,
    weatherKey: weatherDomKey(trip.destination, trip.date || state.date),
    practicalStay,
    perDay,
    hostel,
    hostelNightly,
    hostelInfo,
    hostelNights,
    destinationHostelNights,
    stopHostelNights,
    stopHostelNightly: stopHostelInfo?.nightly || 0,
    finalLength,
    stayCall,
    trust,
    baggage,
    stopCount,
    bonusCities,
    outboundCost,
    inboundCost,
    sort: adjustedSort,
    verdict: verdict(
      {
        ...trip,
        total,
        hours,
        risk,
        worth,
        weather,
        practicalStay,
        perDay,
        hostel,
        hostelNightly,
        hostelNights,
        destinationHostelNights,
        stopHostelNights,
        stopHostelNightly: stopHostelInfo?.nightly || 0,
        baggage,
        stopCount,
        bonusCities,
      },
      state,
    ),
  };
}

function stayCallFor(hostelNightly, hostelNights, perDay, state, practicalStay) {
  if (!state.hostel || hostelNights <= 0) {
    return { label: "No hostel pressure", kind: "", detail: "No overnight stay is affecting this recommendation." };
  }
  if (practicalStay?.hours < 26 && hostelNights === 1) {
    return {
      label: "Hostel questionable",
      kind: "warn",
      detail: `You get about ${formatHours(practicalStay.hours)} of practical city time, so the hostel is more for sleep/shower than a full extra day.`,
    };
  }
  if (hostelNightly <= state.hostelLimit * 0.82 && perDay <= state.budget / 3.2) {
    return {
      label: "Stay longer works",
      kind: "good",
      detail: `Hostel is comfortably under your limit, so extra nights can improve the trip value.`,
    };
  }
  if (hostelNightly > state.hostelLimit && hostelNights >= 2) {
    if (practicalStay?.score >= 85) {
      return {
        label: "Good but hostel pricey",
        kind: "warn",
        detail: `City time is strong, but hostel is above your comfort line. Choose this if time there matters more than keeping nights lean.`,
      };
    }
    return {
      label: "Keep it short",
      kind: "warn",
      detail: `Hostel is above your comfort line, so extra nights need a cheaper return to make sense.`,
    };
  }
  return {
    label: "Hostel is okay",
    kind: "",
    detail: `Hostel cost is close enough to your comfort line that flight timing decides the trip.`,
  };
}

function routeTrust(trip, weatherInfo) {
  const flights = [...flightLegs(trip.outbound), ...flightLegs(trip.inbound)];
  const ground = [...groundTravelLegs(trip.outbound), ...groundTravelLegs(trip.inbound)];
  if (trip.outbound?.groundHop || trip.inbound?.groundHop) {
    return {
      label: "Gateway route",
      kind: "warn",
      detail: "This uses a flight into a connected city plus bus/train into the destination. It can be clever and more fun, but check the ground timing carefully.",
    };
  }
  if (trip.plannedStop) {
    return {
      label: "Stopover check",
      kind: "warn",
      detail: "You asked for a real city stop, so the brain builds it on purpose. Check both travel days before booking because the stop splits the trip into separate decisions.",
    };
  }
  const hasGenericEstimate = flights.some((leg) => leg.trust === "estimate");
  if (hasGenericEstimate) {
    return {
      label: "Estimate route",
      kind: "warn",
      detail: "Some flight legs use generic budget estimates, so use the search links before planning around it.",
    };
  }
  if (ground.length && !flights.length) {
    return {
      label: "Ground route ready",
      kind: "good",
      detail: "This is a bus/train estimate instead of a flight idea. Check FlixBus or train prices for the final live fare.",
    };
  }
  if (trip.stopCount > 0) {
    return {
      label: "Timing check",
      kind: "warn",
      detail: "Carrier links are available, but separate tickets need a real timing check before buying.",
    };
  }
  return {
    label: weatherInfo.source === "live" ? "Live weather + links" : "Airline links ready",
    kind: "good",
    detail: "This has direct low-cost airline search links, but fare and availability still need a final live check.",
  };
}

function personalityRisk(rawRisk, stopCount, state) {
  let value = rawRisk;
  if (state.lowStress && stopCount > 0) value += 0.45;
  if (state.airportSleep && stopCount > 0) value -= 0.55;
  return clamp(Math.round(value), 1, 4);
}

function tripStyleBonus(style, days, hostelNightly, hostelLimit) {
  if (style === "short") return days <= 3 ? 9 : -days * 4;
  if (style === "longer") return days >= 4 ? (hostelNightly <= hostelLimit ? 16 : -6) : -2;
  return days >= 3 && days <= 5 ? 8 : 0;
}

function practicalStayFor(trip, state) {
  if (!trip.inbound || !trip.returnDate) {
    return {
      hours: 0,
      score: 70,
      label: "One-way",
      kind: "",
      penalty: 0,
      detail: "Practical city time is not scored for one-way trips.",
    };
  }

  const arrival = estimatedCityArrival(trip.outbound, trip.date, "outbound");
  const cityLeave = estimatedCityLeave(trip.inbound, trip.returnDate);
  const hours = Math.max(0, (cityLeave - arrival) / 3600000);
  const hostelNights = Math.max(0, (trip.finalLength || state.length) - 1);
  let score = Math.round((hours / 48) * 100);
  if (hours < 26 && hostelNights === 1) score -= 12;
  if (hours < 18) score -= 14;
  if (state.tripStyle === "longer" && hours < 42) score -= 8;
  score = clamp(score, 18, 98);
  const penalty = practicalStayPenalty(hours, state, hostelNights);
  const label = practicalStayLabel(hours);

  return {
    hours,
    score,
    label: label.text,
    kind: label.kind,
    penalty,
    detail: practicalStayDetail(hours, hostelNights),
  };
}

function estimatedCityArrival(route, date, direction) {
  const lastLeg = route.legs.at(-1);
  if (!lastLeg?.arrivesAt) return parseInputDate(date);
  if (lastLeg.kind === "ground") return addHours(lastLeg.arrivesAt, lastLeg.mode === "intercity" ? 0.1 : 0.25);
  return addHours(lastLeg.arrivesAt, 0.75);
}

function estimatedCityLeave(route, date) {
  const flights = flightLegs(route);
  const firstFlight = flights[0];
  const firstLeg = route.legs[0];
  if (!firstFlight) {
    const firstTravelLeg = route.legs.find((leg) => !["pause", "stay"].includes(leg.kind));
    return firstTravelLeg?.departsAt || parseInputDate(date);
  }
  if (firstLeg?.kind === "ground" && firstLeg.departsAt) return firstLeg.departsAt;
  return addHours(firstFlight.departsAt || estimatedFlightDeparture(firstFlight, date, "return"), -2);
}

function estimatedFlightDeparture(leg, date, direction) {
  const outboundBuckets = [6.5, 9.25, 12.4, 15.75, 18.4, 20.25];
  const returnBuckets = [7.5, 10.75, 14.5, 17.75, 20, 21.25];
  const buckets = direction === "return" ? returnBuckets : outboundBuckets;
  const index = Math.min(buckets.length - 1, Math.floor(seededUnit(`${leg.airline}-${leg.from}-${leg.to}-${date}-${direction}`) * buckets.length));
  return dateAtHour(date, buckets[index]);
}

function estimatedGroundDeparture(route, date, direction) {
  const buckets = direction === "return" ? [8.25, 11.5, 15.25, 18.5, 21] : [6.75, 8.5, 10.75, 13.5, 16.75, 19.25];
  const path = route.legs.map((leg) => `${leg.from}-${leg.to}-${leg.kind}`).join("|");
  const index = Math.min(buckets.length - 1, Math.floor(seededUnit(`${path}-${date}-${direction}`) * buckets.length));
  return dateAtHour(date, buckets[index]);
}

function practicalStayPenalty(hours, state, hostelNights) {
  if (state.tripType !== "round") return 0;
  let penalty = 0;
  if (hours < 18) penalty += 18;
  else if (hours < 26) penalty += 10;
  else if (hours < 36) penalty += 4;
  if (hostelNights > 0 && hours / Math.max(1, hostelNights) < 26) penalty += 5;
  if (state.tripStyle === "longer" && hours < 42) penalty += 6;
  return penalty;
}

function practicalStayLabel(hours) {
  if (hours < 18) return { text: "Airport dash", kind: "bad" };
  if (hours < 28) return { text: "24h sprint", kind: "warn" };
  if (hours < 42) return { text: "Short real trip", kind: "warn" };
  return { text: "Real stay", kind: "good" };
}

function practicalStayDetail(hours, hostelNights) {
  if (hours < 18) return `Only about ${formatHours(hours)} of practical city time. This is usually not worth a hostel unless the flight is extremely cheap.`;
  if (hours < 28 && hostelNights === 1) return `About ${formatHours(hours)} of practical city time. It is a one-night sprint, not a full two-day feeling.`;
  if (hours < 42) return `About ${formatHours(hours)} of practical city time. Short, but it can still feel like a real break.`;
  return `About ${formatHours(hours)} of practical city time. This should feel like an actual stay.`;
}

function weatherEstimate(cityName, date) {
  return {
    score: seasonalWeatherScore(cityName, date),
    source: "seasonal",
    summary: "seasonal estimate",
  };
}

function seasonalWeatherScore(cityName, date) {
  const month = parseInputDate(date).getMonth();
  const comfortByMonth = {
    Barcelona: [58, 61, 68, 76, 84, 88, 78, 76, 86, 80, 68, 60],
    Rome: [55, 58, 66, 74, 82, 86, 74, 72, 84, 78, 66, 56],
    Milan: [42, 48, 60, 70, 78, 82, 76, 74, 76, 66, 52, 44],
    Paris: [38, 44, 56, 66, 76, 80, 82, 80, 72, 60, 48, 40],
    Lisbon: [62, 66, 72, 78, 84, 88, 86, 86, 84, 78, 70, 64],
    Madrid: [52, 58, 68, 76, 82, 80, 66, 68, 82, 76, 62, 54],
    Berlin: [30, 38, 50, 64, 74, 80, 82, 78, 68, 54, 42, 32],
    London: [36, 40, 50, 60, 68, 74, 76, 74, 66, 54, 44, 38],
    Budapest: [34, 42, 56, 70, 78, 82, 78, 76, 70, 58, 46, 36],
    Prague: [32, 40, 54, 68, 76, 80, 80, 76, 68, 56, 44, 34],
    Vienna: [34, 42, 56, 70, 78, 82, 80, 76, 70, 58, 46, 36],
    Bratislava: [34, 42, 56, 70, 78, 82, 80, 76, 70, 58, 46, 36],
    Venice: [48, 54, 64, 74, 82, 82, 72, 74, 82, 76, 62, 50],
    Naples: [58, 62, 70, 78, 84, 84, 72, 74, 86, 82, 70, 60],
    Nice: [55, 60, 68, 76, 84, 86, 80, 80, 84, 78, 66, 56],
    Porto: [58, 62, 70, 76, 82, 86, 86, 86, 82, 74, 66, 58],
    Valencia: [58, 62, 70, 78, 84, 86, 78, 78, 86, 82, 70, 60],
    Seville: [60, 66, 76, 84, 82, 72, 58, 60, 78, 84, 72, 62],
    Malaga: [62, 68, 76, 84, 86, 80, 68, 70, 84, 86, 76, 66],
    Palma: [56, 62, 70, 78, 84, 86, 78, 78, 86, 82, 70, 60],
    Munich: [30, 38, 52, 66, 74, 78, 78, 74, 66, 54, 42, 32],
    Amsterdam: [34, 40, 50, 60, 68, 74, 76, 74, 66, 54, 44, 36],
    Brussels: [34, 40, 50, 60, 68, 74, 76, 74, 66, 54, 44, 36],
    Copenhagen: [28, 34, 46, 58, 68, 74, 78, 74, 64, 50, 38, 30],
    Helsinki: [18, 26, 40, 54, 66, 74, 78, 72, 58, 42, 28, 20],
    Stockholm: [22, 28, 42, 56, 68, 76, 80, 74, 62, 46, 32, 24],
    Oslo: [20, 26, 40, 54, 66, 74, 78, 72, 60, 44, 30, 22],
    Edinburgh: [30, 34, 44, 54, 62, 68, 70, 68, 60, 50, 40, 32],
    Dublin: [34, 38, 48, 56, 64, 70, 72, 70, 62, 52, 42, 36],
    Zurich: [32, 40, 54, 66, 74, 80, 80, 76, 68, 56, 44, 34],
    Krakow: [28, 36, 50, 64, 74, 80, 80, 76, 66, 52, 40, 30],
    Warsaw: [28, 36, 50, 64, 74, 79, 80, 76, 66, 52, 40, 30],
    Riga: [22, 30, 44, 58, 68, 76, 78, 74, 62, 48, 34, 24],
    Tallinn: [20, 28, 42, 56, 68, 74, 78, 72, 60, 46, 32, 22],
    Vilnius: [24, 32, 46, 60, 70, 76, 78, 74, 62, 48, 34, 24],
    Athens: [58, 62, 70, 78, 84, 82, 66, 68, 84, 80, 70, 60],
    Sofia: [38, 46, 60, 72, 80, 82, 76, 76, 76, 64, 50, 40],
    Bucharest: [36, 44, 58, 70, 78, 80, 74, 74, 74, 62, 48, 38],
    Belgrade: [38, 46, 60, 72, 80, 82, 76, 76, 76, 64, 50, 40],
    Zagreb: [36, 44, 58, 70, 78, 80, 76, 76, 72, 60, 48, 38],
    Ljubljana: [34, 42, 56, 68, 76, 80, 78, 76, 70, 58, 46, 36],
    Dubrovnik: [52, 58, 68, 78, 84, 84, 74, 76, 84, 78, 66, 54],
    Split: [50, 56, 66, 76, 84, 84, 74, 76, 84, 78, 66, 52],
    Valletta: [64, 68, 74, 80, 84, 78, 66, 68, 80, 84, 76, 66],
    Istanbul: [48, 54, 64, 74, 80, 78, 68, 70, 80, 76, 66, 52],
    Tirana: [48, 54, 64, 74, 82, 84, 74, 74, 82, 76, 62, 50],
    Sarajevo: [26, 34, 50, 64, 72, 78, 78, 76, 68, 54, 40, 30],
    Skopje: [34, 42, 58, 70, 80, 82, 76, 76, 76, 64, 48, 36],
    Podgorica: [44, 50, 62, 72, 80, 84, 78, 78, 80, 70, 56, 46],
    Pristina: [30, 38, 54, 66, 76, 80, 78, 76, 68, 54, 40, 32],
    Luxembourg: [32, 38, 50, 62, 70, 76, 78, 74, 66, 54, 42, 34],
    Reykjavik: [20, 24, 32, 42, 50, 58, 62, 58, 50, 40, 30, 24],
    Chisinau: [28, 36, 52, 66, 76, 80, 78, 76, 68, 54, 40, 30],
    Larnaca: [62, 66, 72, 80, 84, 80, 68, 70, 82, 84, 74, 64],
    Tbilisi: [36, 44, 58, 70, 78, 82, 76, 76, 76, 64, 50, 38],
    Debrecen: [32, 40, 56, 70, 78, 82, 78, 76, 70, 58, 46, 34],
    Szeged: [36, 44, 58, 72, 80, 84, 80, 78, 72, 60, 48, 38],
    Pecs: [36, 44, 58, 72, 80, 84, 80, 78, 72, 60, 48, 38],
    Gyor: [34, 42, 56, 70, 78, 82, 80, 76, 70, 58, 46, 36],
  };
  return comfortByMonth[cityName]?.[month] || 65;
}

async function hydrateLiveWeather(trips) {
  const targets = [
    ...new Map(
      trips
        .filter((trip) => canUseLiveForecast(trip.date))
        .map((trip) => [weatherDomKey(trip.destination, trip.date), { cityName: trip.destination, date: trip.date }]),
    ).values(),
  ];

  await Promise.allSettled(
    targets.map(async (target) => {
      const live = await liveWeather(target.cityName, target.date);
      if (live) updateWeatherDom(weatherDomKey(target.cityName, target.date), live);
    }),
  );
}

function canUseLiveForecast(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = parseInputDate(date);
  const daysAway = Math.round((target - today) / 86400000);
  return daysAway >= 0 && daysAway <= 16;
}

async function liveWeather(cityName, date) {
  const cacheKey = `${cityName}-${date}`;
  if (liveWeatherCache.has(cacheKey)) return liveWeatherCache.get(cacheKey);

  const coords = cityCoordinates[cityName];
  if (!coords) return null;

  try {
    const params = new URLSearchParams({
      latitude: String(coords.lat),
      longitude: String(coords.lon),
      daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
      timezone: "auto",
      start_date: date,
      end_date: date,
    });
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    if (!response.ok) throw new Error(`Weather ${response.status}`);
    const data = await response.json();
    const max = data.daily?.temperature_2m_max?.[0];
    const min = data.daily?.temperature_2m_min?.[0];
    const rain = data.daily?.precipitation_probability_max?.[0] ?? 0;
    if (!Number.isFinite(max) || !Number.isFinite(min)) return null;

    const average = Math.round((max + min) / 2);
    const value = {
      score: liveWeatherScore(max, min, rain),
      source: "live",
      summary: `${average}C, ${Math.round(rain)}% rain`,
    };
    liveWeatherCache.set(cacheKey, value);
    return value;
  } catch (error) {
    console.warn("Live weather unavailable", error);
    return null;
  }
}

function liveWeatherScore(max, min, rain) {
  const average = (max + min) / 2;
  const coldPenalty = Math.max(0, 12 - average) * 3.4;
  const heatPenalty = Math.max(0, average - 25) * 3.1 + Math.max(0, max - 31) * 2.5;
  const rainPenalty = Math.max(0, rain) * 0.32;
  const comfortPenalty = Math.abs(average - 21) * 1.2;
  return clamp(Math.round(96 - coldPenalty - heatPenalty - rainPenalty - comfortPenalty), 25, 98);
}

function weatherDomKey(cityName, date) {
  return `${cityName}-${date}`.replace(/[^a-z0-9_-]/gi, "_");
}

function weatherChipLabel(tripOrWeather) {
  const source = tripOrWeather.source || tripOrWeather.weatherSource || "seasonal";
  const score = tripOrWeather.score ?? tripOrWeather.weather;
  return `${score}/100 ${source === "live" ? "live weather" : "seasonal weather"}`;
}

function updateWeatherDom(key, weather) {
  document.querySelectorAll(`[data-weather-key="${key}"]`).forEach((element) => {
    element.textContent = weatherChipLabel(weather);
    element.classList.toggle("good", weather.score >= 76);
  });
  document.querySelectorAll(`[data-weather-stat="${key}"]`).forEach((element) => {
    element.textContent = `${weather.score}/100 live, ${weather.summary}`;
  });
}

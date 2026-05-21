function render() {
  const state = getState();
  const token = ++renderToken;
  showResultsLoading(state);

  window.setTimeout(() => {
    if (token !== renderToken) return;
    try {
      renderBuiltTrips(state, buildRatedTrips(state));
    } catch (error) {
      console.error("Route render failed", error);
      renderError(state);
    }
  }, 140);
}

function showResultsLoading(state) {
  results.hidden = false;
  results.classList.add("is-loading");
  resultsTitle.textContent =
    state.to === "Anywhere"
      ? `Scanning cheap cities from ${cityDisplayName(state.from)}`
      : `Scanning ${cityDisplayName(state.to)}`;
  resultCount.textContent = "Checking";
  dataNote.textContent = "price + time + hostel";
  cards.innerHTML = skeletonCards();
}

function renderBuiltTrips(state, built) {
  const titleStop = state.to === "Anywhere" ? "" : plannedStopName(state, state.to);
  resultsTitle.textContent = titleStop
    ? `${cityDisplayName(state.from)} to ${cityDisplayName(state.to)} via ${cityDisplayName(titleStop)}`
    : state.to === "Anywhere"
      ? `Cheap ${state.tripType === "round" ? "round trips" : "routes"} from ${cityDisplayName(state.from)}`
      : state.flexDates
        ? `Best timing to ${cityDisplayName(state.to)}`
        : `${cityDisplayName(state.from)} to ${cityDisplayName(state.to)}`;
  resultCount.textContent = `${built.length} ${built.length === 1 ? "route" : "routes"}`;
  dataNote.textContent = titleStop
    ? "Planned stop · best-value order"
    : state.flexDates
      ? "Best-value order · 30-day scan"
      : "Estimates + live checks";
  results.classList.remove("is-loading");
  cards.innerHTML = "";

  if (!built.length) {
    renderEmpty(state);
  } else {
    built.forEach((trip, index) => renderCard(trip, index, state));
    hydrateLiveWeather(built);
  }
}

function skeletonCards() {
  return Array.from(
    { length: 2 },
    () => `<article class="route-card route-card--skeleton" aria-hidden="true"><div></div><div></div><div></div></article>`,
  ).join("");
}

function renderError(state) {
  results.classList.remove("is-loading");
  results.hidden = false;
  resultsTitle.textContent = "Route brain needs a refresh";
  resultCount.textContent = "Error";
  dataNote.textContent = "Try again";
  cards.innerHTML = "";
  const error = document.createElement("div");
  error.className = "empty empty--error";
  error.innerHTML = `
    <h3>Could not build this search</h3>
    <p>Zylo could not compare ${escapeHtml(cityDisplayName(state.from))} and ${escapeHtml(
      cityDisplayName(state.to),
    )} right now. Change one city or try again.</p>
  `;
  cards.append(error);
}

function renderCard(trip, index, state) {
  const card = template.content.firstElementChild.cloneNode(true);
  card.style.animationDelay = `${Math.min(index * 60, 360)}ms`;
  const image = card.querySelector("img");
  image.src = images[trip.destination] || images.Budapest;
  image.alt = `${trip.destination} city view`;
  card.querySelector(".route-badge").textContent = index === 0 ? "Best match" : trip.outbound.label;
  card.querySelector(".airport-line").textContent = airportPath(trip);
  card.querySelector("h3").innerHTML =
    `${cityLabelHtml(trip.destination)} ${trip.inbound ? "round trip" : "one way"}`;
  card.querySelector(".route-price").textContent = money(trip.total);
  card.querySelector(".verdict").textContent = trip.verdict;
  renderBrainNote(card.querySelector(".brain-note"), trip, state);

  const chips = [
    [tripDateLabel(trip), state.flexDates ? "good" : ""],
    ...(trip.inbound ? [[`${formatHours(trip.practicalStay.hours)} city time`, trip.practicalStay.kind]] : []),
    [`${trip.worth}/100 worth it`, trip.worth >= 72 ? "good" : ""],
    [weatherChipLabel(trip), trip.weather >= 76 ? "good" : "", trip.weatherKey],
    [`${riskLabel(trip.risk)} risk`, riskClass(trip.risk)],
  ];
  if (trip.bonusCities?.length) chips.splice(2, 0, [`via ${trip.bonusCities.join(", ")}`, "good"]);
  if (trip.plannedStop) chips.splice(2, 0, [`${trip.stopCity} stop`, "warn"]);
  card.querySelector(".chips").append(...chips.map(([text, kind, weatherKey]) => chip(text, kind, weatherKey)));

  const groups = card.querySelector(".leg-groups");
  groups.append(legGroup("Outbound", trip.outbound.legs));
  if (trip.inbound) groups.append(legGroup("Return", trip.inbound.legs));

  const side = card.querySelector("dl");
  addStat(side, "Dates", tripDateLabel(trip));
  if (trip.bonusCities?.length) addStat(side, "Gateway", trip.bonusCities.join(", "));
  if (trip.plannedStop) addStat(side, "Stop", `${trip.stopCity} · ${trip.stopLength} ${trip.stopLength === 1 ? "day" : "days"}`);
  if (trip.inbound) addStat(side, "City time", `${formatHours(trip.practicalStay.hours)} · ${trip.practicalStay.label}`);
  addStat(side, routeHasFlights(trip.outbound) ? "Fly out" : "Go out", routeTimeSummary(trip.outbound));
  if (trip.inbound) addStat(side, routeHasFlights(trip.inbound) ? "Fly back" : "Come back", routeTimeSummary(trip.inbound));
  addStat(side, "Outbound", money(trip.outboundCost));
  if (trip.inbound) addStat(side, "Return", money(trip.inboundCost));
  if (trip.hostel) addStat(side, "Hostel", hostelStatText(trip));
  if (trip.inbound) addStat(side, "Per day", money(trip.perDay));
  addStat(side, "Total", money(trip.total));

  renderBookingLinks(card.querySelector(".booking-links"), trip, state);

  cards.append(card);
}

function renderBookingLinks(container, trip, state) {
  container.innerHTML = "";
  const actions = bookingActions(trip, state);
  const title = document.createElement("strong");
  title.textContent = actions.length > 1 ? "Booking links" : "Book direct";
  container.append(title, ...actions.map(bookingLink));
}

function bookingActions(trip, state) {
  const outboundFlights = flightLegs(trip.outbound);
  const returnFlights = flightLegs(trip.inbound);
  const outboundDate = trip.date || state.date;
  const returnDate = trip.returnDate || (state.tripType === "round" ? tripReturnDate(state.date, state.length) : null);
  const actions = [];
  const roundTrip = roundTripBooking(outboundFlights, returnFlights, outboundDate, returnDate);

  if (roundTrip) actions.push(roundTrip);

  const includeLegs = !roundTrip || outboundFlights.length + returnFlights.length > 2;
  if (includeLegs) {
    actions.push(...routeBookingActions(trip.outbound, outboundDate, "Outbound"));
    actions.push(...routeBookingActions(trip.inbound, returnDate || outboundDate, "Return"));
  }

  actions.push(...researchActions(trip, state, outboundDate, returnDate));
  return actions;
}

function renderBrainNote(container, trip, state) {
  container.innerHTML = "";
  const summary = document.createElement("summary");
  summary.textContent = "More about this score";
  const scores = document.createElement("div");
  scores.className = "brain-scores";
  brainScoreItems(trip, state).forEach((item) => {
    const pill = document.createElement("span");
    pill.className = `brain-score ${item.kind}`.trim();
    pill.innerHTML = `<small>${item.label}</small><b>${item.value}</b>`;
    scores.append(pill);
  });
  const list = document.createElement("ul");
  brainInsights(trip, state).forEach((item) => {
    const row = document.createElement("li");
    const label = document.createElement("span");
    const value = document.createElement("b");
    label.textContent = item.label;
    value.textContent = item.value;
    row.append(label, value);
    list.append(row);
  });
  const inner = document.createElement("div");
  inner.className = "brain-note-inner";
  inner.append(scores, list);
  container.append(summary, inner);
}

function brainInsights(trip, state) {
  const insights = [
    {
      label: "Month scan",
      value: state.flexDates
        ? `${trip.timingInsight || "Checked dates and stay lengths around your start date."} Results are sorted by score, not by calendar order.`
        : "Using only your selected date.",
    },
    {
      label: "Cost shape",
      value: trip.inbound ? `${money(trip.total)} total, about ${money(trip.perDay)}/day.` : `${money(trip.total)} one-way idea.`,
    },
    {
      label: "Hostel logic",
      value: hostelBrainText(trip, state),
    },
    {
      label: "Risk",
      value: riskBrainText(trip, state),
    },
    {
      label: "Trust",
      value: trip.trust?.detail || "Prototype estimate; check live before buying.",
    },
  ];
  if (trip.inbound) {
    insights.splice(2, 0, {
      label: "City time",
      value: trip.practicalStay?.detail || "Practical city time is not scored for this route.",
    });
  } else {
    insights.splice(2, 0, {
      label: "Trip type",
      value: "One-way route: return timing, nights, and city-time pressure are not scored.",
    });
  }
  if (trip.plannedStop) {
    insights.splice(2, 0, {
      label: "Planned stop",
      value: `${trip.stopCity} is treated as part of the trip, with about ${trip.stopLength} ${trip.stopLength === 1 ? "day" : "days"} before continuing to ${trip.destination}.`,
    });
  }
  return insights;
}

function brainScoreItems(trip, state) {
  const moneyScore = clamp(Math.round(100 - (trip.total / Math.max(60, state.budget)) * 38 - (trip.perDay || trip.total) * 0.18), 18, 98);
  const timeScore = trip.inbound ? trip.practicalStay.score : 74;
  const hostelComfort = !trip.hostel ? 78 : trip.hostelNightly <= state.hostelLimit ? 88 : 58;
  const comfortScore = clamp(Math.round((trip.weather * 0.45) + (hostelComfort * 0.35) + ((100 - trip.risk * 16) * 0.2)), 18, 98);
  const trustScore = trip.trust?.kind === "good" ? 86 : trip.trust?.label === "Timing check" ? 62 : 48;
  return [
    { label: "Money", value: `${moneyScore}/100`, kind: scoreKind(moneyScore) },
    { label: "Time", value: trip.inbound ? `${timeScore}/100` : "one-way", kind: trip.inbound ? scoreKind(timeScore) : "" },
    { label: "Comfort", value: `${comfortScore}/100`, kind: scoreKind(comfortScore) },
    { label: "Trust", value: `${trustScore}/100`, kind: scoreKind(trustScore) },
  ];
}

function scoreKind(score) {
  if (score >= 76) return "good";
  if (score >= 55) return "warn";
  return "bad";
}

function riskBrainText(trip, state) {
  if (trip.stopCount <= 0) return "Simple route with low planning stress.";
  if (state.airportSleep) return "Stopover trick allowed because you said rough airport waits are okay.";
  if (state.lowStress) return "Separate-ticket trick is heavily punished because low-stress mode is on.";
  return "Cheaper trick, but separate-ticket timing needs a manual check.";
}

function hostelBrainText(trip, state) {
  if (!trip.hostel || !trip.hostelNights) return "No overnight cost added.";
  if (trip.plannedStop) {
    const stopCost = trip.stopHostelNights ? `${trip.stopCity}: ${trip.stopHostelNights} × ${money(trip.stopHostelNightly)}` : "";
    const finalCost = trip.destinationHostelNights
      ? `${trip.destination}: ${trip.destinationHostelNights} ${trip.destinationHostelNights === 1 ? "night" : "nights"}`
      : "";
    return `Hostel estimate includes the planned stop${stopCost ? ` (${stopCost}${finalCost ? `, ${finalCost}` : ""})` : ""}.`;
  }
  if (trip.stayCall?.detail) return trip.stayCall.detail;
  const nightly = `${money(trip.hostelNightly)}/night`;
  const limit = `${money(state.hostelLimit)}/night`;
  if (trip.hostelNightly <= state.hostelLimit) {
    return `${nightly} is under your ${limit} comfort line, so extra nights can still be worth it.`;
  }
  if (state.tripStyle === "longer") {
    return `${nightly} is above your ${limit} comfort line, so longer stays must beat it with cheaper returns.`;
  }
  return `${nightly} is above your ${limit} comfort line, so the brain avoids stretching the trip.`;
}

function researchActions(trip, state, outboundDate, returnDate) {
  const actions = [];
  if (trip.plannedStop && state.hostel) {
    actions.push({
      href: hostelSearchUrlForCity(trip.stopCity, trip.date, toInputDate(addDays(parseInputDate(trip.date), trip.stopLength))),
      label: "Check stop hostels",
      meta: `${trip.stopCity} · ${trip.stopLength} ${trip.stopLength === 1 ? "night" : "nights"}`,
      primary: false,
    });
  }
  if (trip.inbound && state.hostel) {
    actions.push({
      href: hostelSearchUrl(trip, returnDate),
      label: "Check hostels",
      meta: `${trip.destination} · ${tripDateLabel(trip)}`,
      primary: false,
    });
  }
  actions.push({
    href: weatherSearchUrl(trip.destination, outboundDate),
    label: "Check weather",
    meta: `${trip.destination} · ${shortDate(outboundDate)}`,
    primary: false,
  });
  return actions;
}

function roundTripBooking(outboundFlights, returnFlights, outboundDate, returnDate) {
  if (!returnDate || outboundFlights.length !== 1 || returnFlights.length !== 1) return null;

  const outbound = outboundFlights[0];
  const inbound = returnFlights[0];
  if (outbound.airline !== inbound.airline || outbound.from !== inbound.to || outbound.to !== inbound.from) return null;

  const href = airlineBookingUrl(outbound, outboundDate, returnDate);
  return {
    href,
    label: `${outbound.airline} round trip`,
    meta: `${outbound.from} ↔ ${outbound.to}`,
    primary: true,
  };
}

function routeBookingActions(route, fallbackDate, prefix) {
  if (!route) return [];
  let count = 0;
  return route.legs
    .filter((leg) => ["flight", "ground"].includes(leg.kind))
    .map((leg) => {
      count += 1;
      const label = `${prefix} ${count}`;
      return leg.kind === "flight"
        ? legBookingAction(leg, legTravelDate(leg, fallbackDate), label)
        : groundBookingAction(leg, legTravelDate(leg, fallbackDate), label);
    });
}

function legBookingAction(leg, date, label) {
  return {
    href: airlineBookingUrl(leg, date),
    label: `${label}: ${leg.airline}`,
    meta: `${leg.from} → ${leg.to}`,
    primary: false,
  };
}

function groundBookingAction(leg, date, label) {
  return {
    href: groundSearchUrl(leg, date),
    label: `${label}: ${leg.airline.replace(" estimate", "")}`,
    meta: `${leg.from} → ${leg.to}`,
    primary: false,
  };
}

function legTravelDate(leg, fallbackDate) {
  return leg.departsAt ? toInputDate(leg.departsAt) : fallbackDate;
}

function groundSearchUrl(leg, date) {
  if (leg.airline.includes("FlixBus")) {
    return `https://global.flixbus.com/bus-routes/bus-${slugifyCity(leg.from)}-${slugifyCity(leg.to)}`;
  }
  const params = new URLSearchParams({
    q: `${leg.from} to ${leg.to} bus train ${date}`,
  });
  return `https://www.google.com/search?${params.toString()}`;
}

function hostelSearchUrl(trip, returnDate) {
  const checkin = destinationCheckInDate(trip);
  const checkout = returnDate || tripReturnDate(checkin, trip.finalLength || trip.length || 1);
  return hostelSearchUrlForCity(trip.destination, checkin, checkout);
}

function destinationCheckInDate(trip) {
  const arrival = trip.outbound?.legs.at(-1)?.arrivesAt;
  return arrival ? toInputDate(arrival) : trip.date;
}

function hostelSearchUrlForCity(cityName, checkin, checkout) {
  const params = new URLSearchParams({
    ss: `${cityName}, ${getCity(cityName)?.country || "Europe"}`,
    checkin,
    checkout,
    group_adults: "1",
    no_rooms: "1",
    group_children: "0",
    selected_currency: "EUR",
    order: "price",
    nflt: "ht_id=203",
  });
  return `https://www.booking.com/searchresults.html?${params.toString()}`;
}

function weatherSearchUrl(cityName, date) {
  const params = new URLSearchParams({
    q: `${cityName} weather ${date}`,
  });
  return `https://www.google.com/search?${params.toString()}`;
}

function bookingLink(action) {
  const link = document.createElement("a");
  link.className = action.primary ? "book-link primary" : "book-link";
  link.href = action.href;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.innerHTML = `<span>${action.label}</span><small>${action.meta}</small>`;
  return link;
}

function renderEmpty(state) {
  const empty = document.createElement("div");
  empty.className = "empty";
  empty.innerHTML = `
    <h3>No believable route found</h3>
    <p>The local route graph does not have a clean ${state.tripType === "round" ? "return" : "one-way"} option under ${money(
      state.budget,
    )}. Raise the budget or allow nearby airports and clever stops.</p>
  `;
  cards.append(empty);
}

function legGroup(title, legs) {
  const group = document.createElement("div");
  group.className = "leg-group";
  const heading = document.createElement("strong");
  heading.textContent = title;
  const list = document.createElement("ol");
  legs.forEach((leg) => {
    const item = document.createElement("li");
    if (leg.kind === "flight") {
      item.innerHTML = `<b>${leg.from} → ${leg.to}</b><span>${timeRange(leg)} est · ${leg.airline} · ${money(leg.price)} · ${formatHours(leg.hours)}</span>`;
    } else if (leg.kind === "ground") {
      const mode = leg.mode === "intercity" ? leg.airline : `${leg.airline} to airport`;
      item.innerHTML = `<b>${leg.from} → ${leg.to}</b><span>${timeRange(leg)} est · ${mode} · ${money(leg.price)} · ${formatHours(leg.hours)}</span>`;
    } else if (leg.kind === "stay") {
      item.innerHTML = `<b>${leg.cityName} stop</b><span>${timeRange(leg)} · planned city time · ${formatHours(leg.hours)}</span>`;
    } else {
      item.innerHTML = `<b>${leg.cityName} buffer</b><span>${timeRange(leg)} est · ${leg.airline} · ${formatHours(leg.hours)}</span>`;
    }
    list.append(item);
  });
  group.append(heading, list);
  return group;
}

function timeRange(leg) {
  if (!leg.departsAt || !leg.arrivesAt) return "time tbc";
  return `${clockTime(leg.departsAt)} → ${clockTime(leg.arrivesAt)}`;
}

function routeTimeSummary(route) {
  const first = route.legs[0];
  const last = route.legs.at(-1);
  if (!first?.departsAt || !last?.arrivesAt) return "time tbc";
  return `${clockTime(first.departsAt)} → ${clockTime(last.arrivesAt)}`;
}

function clockTime(value) {
  return value.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function chip(text, kind, weatherKey = "") {
  const item = document.createElement("span");
  item.className = `chip ${kind}`.trim();
  item.textContent = text;
  if (weatherKey) item.dataset.weatherKey = weatherKey;
  return item;
}

function addStat(list, label, value) {
  const row = document.createElement("div");
  row.innerHTML = `<dt>${label}</dt><dd>${value}</dd>`;
  list.append(row);
  return row;
}

function addWeatherStat(list, trip) {
  const row = addStat(list, "Weather", `${trip.weather}/100 ${trip.weatherSource}, ${trip.weatherSummary}`);
  row.querySelector("dd").dataset.weatherStat = trip.weatherKey;
}

function verdict(trip, state) {
  if (state.flexDates && trip.inbound) {
    const timing = `${tripDateLabel(trip)} for ${trip.length} ${trip.length === 1 ? "day" : "days"}`;
    if (trip.plannedStop) {
      return `${timing}: includes ${trip.stopLength} ${trip.stopLength === 1 ? "day" : "days"} in ${trip.stopCity}, then about ${formatHours(
        trip.practicalStay.hours,
      )} of practical time in ${trip.destination}.`;
    }
    if (trip.bonusCities?.length) {
      return `${timing}: gateway route via ${trip.bonusCities.join(", ")}. It adds ground travel, but can make sense if you want one extra country/city on the way.`;
    }
    if (trip.practicalStay?.hours < 28) {
      return `${timing}: calendar trip is short, but practically it is about ${formatHours(trip.practicalStay.hours)} in the city. Treat it like a sprint, not a full ${trip.length}-day stay.`;
    }
    if (trip.hostelNightly > state.hostelLimit && trip.hostelNights > 1) {
      return `${timing}: hostel is ${money(trip.hostelNightly)}/night, above your ${money(state.hostelLimit)} comfort line, so the brain keeps extra nights under pressure.`;
    }
    if (state.tripStyle === "longer" && trip.length >= 4) {
      return `${timing}: better value because hostel is ${money(trip.hostelNightly)}/night and the total stays efficient at ${money(trip.perDay)}/day.`;
    }
    if (state.tripStyle === "short") {
      return `${timing}: picked for a short cheap break with low planning pain and a total around ${money(trip.total)}.`;
    }
    return `${timing}: best balance of fare timing, ${money(trip.perDay)}/day value, dorm-bed estimate, and weather comfort.`;
  }
  if (trip.risk <= 1 && trip.inbound) {
    return `Cleanest student option: simple flights both ways, total around ${money(trip.total)} before food and city transport.`;
  }
  if (trip.bonusCities?.length) {
    return `Clever gateway option: fly to ${trip.bonusCities.join(", ")}, then bus/train into ${trip.destination}. More moving parts, but you can touch two places in one trip.`;
  }
  if (trip.stopCount > 0 && trip.worth >= 65) {
    return `Worth checking: saves money if the timings exist, but leave buffer because separate tickets can hurt.`;
  }
  if (trip.risk >= 3) {
    return `Only take this if it is much cheaper live. The prototype sees extra stop risk and more waiting time.`;
  }
  if (state.to === "Anywhere") {
    return `Good cheap escape candidate from ${state.from}. Verify live fares before planning the weekend around it.`;
  }
  return `Balanced option: not the cheapest fantasy route, but believable enough to search live fares.`;
}

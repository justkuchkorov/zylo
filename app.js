const images = {
  Barcelona:
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=84",
  Rome: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=84",
  Milan:
    "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=900&q=84",
  Paris:
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=84",
  Lisbon:
    "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=84",
  Madrid:
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=84",
  Berlin:
    "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=900&q=84",
  London:
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=84",
  Budapest:
    "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=900&q=84",
  Prague:
    "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=900&q=84",
  Warsaw:
    "https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=900&q=84",
  Athens:
    "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=900&q=84",
  Istanbul:
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=84",
};

const countryFlags = {
  Austria: "🇦🇹",
  Belgium: "🇧🇪",
  Bulgaria: "🇧🇬",
  Croatia: "🇭🇷",
  Czechia: "🇨🇿",
  Denmark: "🇩🇰",
  Estonia: "🇪🇪",
  Finland: "🇫🇮",
  France: "🇫🇷",
  Germany: "🇩🇪",
  Greece: "🇬🇷",
  Hungary: "🇭🇺",
  Ireland: "🇮🇪",
  Italy: "🇮🇹",
  Latvia: "🇱🇻",
  Lithuania: "🇱🇹",
  Malta: "🇲🇹",
  Netherlands: "🇳🇱",
  Norway: "🇳🇴",
  Poland: "🇵🇱",
  Portugal: "🇵🇹",
  Romania: "🇷🇴",
  Serbia: "🇷🇸",
  Slovakia: "🇸🇰",
  Slovenia: "🇸🇮",
  Spain: "🇪🇸",
  Sweden: "🇸🇪",
  Switzerland: "🇨🇭",
  Turkey: "🇹🇷",
  "United Kingdom": "🇬🇧",
};

const countryCodes = {
  Albania: "al",
  Austria: "at",
  Belgium: "be",
  "Bosnia and Herzegovina": "ba",
  Bulgaria: "bg",
  Croatia: "hr",
  Cyprus: "cy",
  Czechia: "cz",
  Denmark: "dk",
  Estonia: "ee",
  Finland: "fi",
  France: "fr",
  Georgia: "ge",
  Germany: "de",
  Greece: "gr",
  Hungary: "hu",
  Iceland: "is",
  Ireland: "ie",
  Italy: "it",
  Kosovo: "xk",
  Latvia: "lv",
  Lithuania: "lt",
  Luxembourg: "lu",
  Malta: "mt",
  Moldova: "md",
  Montenegro: "me",
  Netherlands: "nl",
  "North Macedonia": "mk",
  Norway: "no",
  Poland: "pl",
  Portugal: "pt",
  Romania: "ro",
  Serbia: "rs",
  Slovakia: "sk",
  Slovenia: "si",
  Spain: "es",
  Sweden: "se",
  Switzerland: "ch",
  Turkey: "tr",
  "United Kingdom": "gb",
};

const cities = [
  city("Budapest", "Hungary", ["BUD"], [
    ground("Vienna", "VIE", 14, 3.0, "Bus/train"),
    ground("Bratislava", "BTS", 12, 3.1, "Bus"),
  ]),
  city("Vienna", "Austria", ["VIE"], [ground("Bratislava", "BTS", 8, 1.2, "Bus")]),
  city("Bratislava", "Slovakia", ["BTS"], [ground("Vienna", "VIE", 8, 1.2, "Bus")]),
  city("Barcelona", "Spain", ["BCN"], [ground("Girona", "GRO", 16, 1.4, "Airport bus")]),
  city("Rome", "Italy", ["FCO", "CIA"]),
  city("Milan", "Italy", ["BGY", "MXP"]),
  city("Venice", "Italy", ["VCE", "TSF"]),
  city("Naples", "Italy", ["NAP"]),
  city("Paris", "France", ["ORY", "BVA", "CDG"]),
  city("Nice", "France", ["NCE"]),
  city("Lisbon", "Portugal", ["LIS"]),
  city("Porto", "Portugal", ["OPO"]),
  city("Madrid", "Spain", ["MAD"]),
  city("Valencia", "Spain", ["VLC"]),
  city("Seville", "Spain", ["SVQ"]),
  city("Malaga", "Spain", ["AGP"]),
  city("Palma", "Spain", ["PMI"]),
  city("Berlin", "Germany", ["BER"]),
  city("Munich", "Germany", ["MUC"]),
  city("Amsterdam", "Netherlands", ["AMS"]),
  city("Brussels", "Belgium", ["BRU", "CRL"]),
  city("Copenhagen", "Denmark", ["CPH"]),
  city("Helsinki", "Finland", ["HEL"]),
  city("Stockholm", "Sweden", ["ARN"]),
  city("Oslo", "Norway", ["OSL"]),
  city("London", "United Kingdom", ["LTN", "STN", "LGW"]),
  city("Edinburgh", "United Kingdom", ["EDI"]),
  city("Dublin", "Ireland", ["DUB"]),
  city("Zurich", "Switzerland", ["ZRH"]),
  city("Prague", "Czechia", ["PRG"]),
  city("Krakow", "Poland", ["KRK"]),
  city("Warsaw", "Poland", ["WAW"]),
  city("Riga", "Latvia", ["RIX"]),
  city("Tallinn", "Estonia", ["TLL"]),
  city("Vilnius", "Lithuania", ["VNO"]),
  city("Athens", "Greece", ["ATH"]),
  city("Sofia", "Bulgaria", ["SOF"]),
  city("Bucharest", "Romania", ["OTP"]),
  city("Belgrade", "Serbia", ["BEG"]),
  city("Zagreb", "Croatia", ["ZAG"]),
  city("Ljubljana", "Slovenia", ["LJU"]),
  city("Dubrovnik", "Croatia", ["DBV"]),
  city("Split", "Croatia", ["SPU"]),
  city("Valletta", "Malta", ["MLA"]),
  city("Istanbul", "Turkey", ["IST", "SAW"]),
  city("Tirana", "Albania", ["TIA"]),
  city("Sarajevo", "Bosnia and Herzegovina", ["SJJ"]),
  city("Skopje", "North Macedonia", ["SKP"]),
  city("Podgorica", "Montenegro", ["TGD"]),
  city("Pristina", "Kosovo", ["PRN"]),
  city("Luxembourg", "Luxembourg", ["LUX"]),
  city("Reykjavik", "Iceland", ["KEF"]),
  city("Chisinau", "Moldova", ["RMO"]),
  city("Larnaca", "Cyprus", ["LCA"]),
  city("Tbilisi", "Georgia", ["TBS"]),
  city("Debrecen", "Hungary", ["DEB"], [ground("Budapest", "BUD", 11, 2.7, "Train/bus")]),
  city("Szeged", "Hungary", [], [ground("Budapest", "BUD", 9, 2.2, "Train/bus")]),
  city("Pecs", "Hungary", [], [ground("Budapest", "BUD", 12, 2.8, "Train/bus")]),
  city("Gyor", "Hungary", [], [ground("Budapest", "BUD", 8, 1.5, "Train")]),
];

const routeGraph = [
  air("BUD", "BCN", "Wizz Air", 48, 2.6),
  air("BUD", "BCN", "Ryanair", 56, 2.7),
  air("BUD", "FCO", "Wizz Air", 32, 1.8),
  air("BUD", "CIA", "Ryanair", 35, 1.7),
  air("BUD", "BGY", "Ryanair", 19, 1.6),
  air("BUD", "MXP", "Wizz Air", 24, 1.7),
  air("BUD", "ORY", "Wizz Air", 38, 2.4),
  air("BUD", "LIS", "Wizz Air", 61, 3.7),
  air("BUD", "MAD", "Wizz Air", 52, 3.2),
  air("BUD", "BER", "Ryanair", 29, 1.5),
  air("BUD", "LTN", "Wizz Air", 38, 2.8),
  air("VIE", "BCN", "Ryanair", 34, 2.5),
  air("VIE", "CIA", "Ryanair", 21, 1.6),
  air("VIE", "BVA", "Ryanair", 29, 2.1),
  air("VIE", "MAD", "Ryanair", 35, 3.0),
  air("BGY", "BCN", "Ryanair", 24, 1.7),
  air("MXP", "BCN", "Wizz Air", 28, 1.6),
  air("CIA", "BCN", "Ryanair", 21, 1.8),
  air("BVA", "BCN", "Ryanair", 27, 1.8),
  air("MAD", "BCN", "Ryanair", 22, 1.3),
  air("BER", "BCN", "Ryanair", 30, 2.6),
  air("STN", "BCN", "Ryanair", 33, 2.2),
  air("BUD", "PRG", "Budget airline estimate", 34, 1.3),
  air("BUD", "WAW", "Budget airline estimate", 36, 1.4),
  air("BUD", "ATH", "Wizz Air", 42, 2.1),
  air("BUD", "IST", "Budget airline estimate", 45, 2.0),
  air("BUD", "SAW", "Budget airline estimate", 39, 2.0),
  air("BUD", "VIE", "Budget airline estimate", 29, 0.9),
  air("BUD", "BTS", "Budget airline estimate", 28, 0.8),
  air("BUD", "AMS", "Budget airline estimate", 58, 2.2),
  air("BUD", "BRU", "Budget airline estimate", 52, 2.1),
  air("BUD", "CRL", "Budget airline estimate", 45, 2.0),
  air("BUD", "CPH", "Budget airline estimate", 48, 1.9),
  air("BUD", "HEL", "Budget airline estimate", 58, 2.3),
  air("BUD", "ARN", "Budget airline estimate", 55, 2.2),
  air("BUD", "OSL", "Budget airline estimate", 62, 2.5),
  air("BUD", "EDI", "Budget airline estimate", 66, 3.0),
  air("BUD", "DUB", "Budget airline estimate", 65, 3.2),
  air("BUD", "ZRH", "Budget airline estimate", 49, 1.7),
  air("BUD", "MUC", "Budget airline estimate", 38, 1.3),
  air("BUD", "VCE", "Budget airline estimate", 34, 1.3),
  air("BUD", "TSF", "Budget airline estimate", 31, 1.2),
  air("BUD", "NAP", "Budget airline estimate", 42, 1.7),
  air("BUD", "NCE", "Budget airline estimate", 47, 1.8),
  air("BUD", "OPO", "Budget airline estimate", 68, 3.6),
  air("BUD", "VLC", "Budget airline estimate", 55, 2.8),
  air("BUD", "SVQ", "Budget airline estimate", 66, 3.3),
  air("BUD", "AGP", "Budget airline estimate", 68, 3.4),
  air("BUD", "PMI", "Budget airline estimate", 54, 2.5),
  air("BUD", "KRK", "Budget airline estimate", 31, 1.0),
  air("BUD", "RIX", "Budget airline estimate", 42, 1.8),
  air("BUD", "TLL", "Budget airline estimate", 52, 2.2),
  air("BUD", "VNO", "Budget airline estimate", 42, 1.6),
  air("BUD", "SOF", "Budget airline estimate", 35, 1.3),
  air("BUD", "OTP", "Budget airline estimate", 38, 1.4),
  air("BUD", "BEG", "Budget airline estimate", 32, 1.0),
  air("BUD", "ZAG", "Budget airline estimate", 30, 1.0),
  air("BUD", "LJU", "Budget airline estimate", 32, 1.1),
  air("BUD", "DBV", "Budget airline estimate", 43, 1.3),
  air("BUD", "SPU", "Budget airline estimate", 39, 1.2),
  air("BUD", "MLA", "Budget airline estimate", 55, 2.2),
  air("BUD", "TIA", "Wizz Air", 39, 1.5),
  air("BUD", "SJJ", "Budget airline estimate", 41, 1.2),
  air("BUD", "SKP", "Wizz Air", 34, 1.4),
  air("BUD", "TGD", "Budget airline estimate", 44, 1.3),
  air("BUD", "PRN", "Wizz Air", 36, 1.5),
  air("BUD", "LUX", "Budget airline estimate", 46, 1.9),
  air("BUD", "KEF", "Budget airline estimate", 88, 4.6),
  air("BUD", "RMO", "Wizz Air", 36, 1.6),
  air("BUD", "LCA", "Wizz Air", 56, 2.8),
  air("BUD", "TBS", "Budget airline estimate", 76, 3.5),
  air("BUD", "DEB", "Budget airline estimate", 28, 0.8),
  air("PRG", "BCN", "Ryanair", 32, 2.4),
  air("PRG", "FCO", "Ryanair", 30, 1.8),
  air("PRG", "LTN", "Wizz Air", 34, 2.1),
  air("WAW", "BCN", "Wizz Air", 38, 3.0),
  air("WAW", "FCO", "Wizz Air", 34, 2.3),
  air("WAW", "LTN", "Wizz Air", 31, 2.5),
  air("ATH", "FCO", "Ryanair", 35, 2.1),
  air("ATH", "MXP", "Wizz Air", 42, 2.6),
  air("ATH", "BCN", "Budget airline estimate", 49, 3.1),
  air("IST", "FCO", "Budget airline estimate", 54, 2.5),
  air("SAW", "BER", "Budget airline estimate", 52, 3.0),
  air("MAD", "LIS", "Ryanair", 23, 1.4),
  air("ORY", "LIS", "Budget airline estimate", 34, 2.5),
  air("STN", "LIS", "Ryanair", 38, 2.8),
  air("BER", "BGY", "Ryanair", 27, 1.7),
  air("BGY", "FCO", "Ryanair", 20, 1.2),
  air("AMS", "BCN", "Budget airline estimate", 48, 2.2),
  air("AMS", "LTN", "Budget airline estimate", 36, 1.1),
  air("BRU", "BCN", "Budget airline estimate", 44, 2.1),
  air("CRL", "FCO", "Budget airline estimate", 36, 2.0),
  air("CPH", "LTN", "Budget airline estimate", 39, 1.9),
  air("ARN", "BER", "Budget airline estimate", 38, 1.6),
  air("OSL", "LTN", "Budget airline estimate", 42, 2.2),
  air("DUB", "LTN", "Budget airline estimate", 31, 1.2),
  air("EDI", "STN", "Budget airline estimate", 35, 1.3),
  air("ZRH", "BCN", "Budget airline estimate", 45, 1.8),
  air("VCE", "BCN", "Budget airline estimate", 38, 1.8),
  air("NAP", "BCN", "Budget airline estimate", 42, 2.0),
  air("OPO", "MAD", "Budget airline estimate", 26, 1.2),
  air("VLC", "MAD", "Budget airline estimate", 22, 1.0),
  air("SVQ", "MAD", "Budget airline estimate", 24, 1.1),
  air("AGP", "MAD", "Budget airline estimate", 26, 1.2),
  air("PMI", "BCN", "Budget airline estimate", 24, 0.9),
  air("NCE", "ORY", "Budget airline estimate", 36, 1.5),
  air("HEL", "BER", "Budget airline estimate", 46, 2.0),
  air("KRK", "LTN", "Budget airline estimate", 34, 2.5),
  air("SOF", "BER", "Budget airline estimate", 37, 2.1),
  air("OTP", "FCO", "Budget airline estimate", 34, 2.0),
  air("BEG", "BGY", "Budget airline estimate", 31, 1.6),
  air("ZAG", "BGY", "Budget airline estimate", 26, 1.1),
  air("LJU", "BGY", "Budget airline estimate", 24, 1.0),
  air("DBV", "FCO", "Budget airline estimate", 36, 1.3),
  air("SPU", "FCO", "Budget airline estimate", 34, 1.2),
  air("MLA", "FCO", "Budget airline estimate", 42, 1.5),
  air("RIX", "LTN", "Budget airline estimate", 37, 2.8),
  air("TLL", "BER", "Budget airline estimate", 39, 1.9),
  air("VNO", "LTN", "Budget airline estimate", 38, 2.9),
  air("TIA", "FCO", "Wizz Air", 28, 1.5),
  air("TIA", "BGY", "Wizz Air", 29, 1.9),
  air("SKP", "BGY", "Wizz Air", 27, 2.0),
  air("PRN", "VIE", "Wizz Air", 29, 1.7),
  air("LUX", "BCN", "Budget airline estimate", 42, 2.0),
  air("LUX", "LIS", "Budget airline estimate", 45, 2.7),
  air("LCA", "ATH", "Wizz Air", 34, 1.8),
  air("TBS", "ATH", "Budget airline estimate", 52, 3.0),
].flatMap((leg) => [leg, reverseLeg(leg)]);

const groundRoutes = [
  intercity("Budapest", "Vienna", 14, 2.8, "FlixBus/train estimate"),
  intercity("Budapest", "Bratislava", 12, 3.0, "FlixBus/train estimate"),
  intercity("Budapest", "Szeged", 9, 2.2, "Train/bus estimate"),
  intercity("Budapest", "Debrecen", 11, 2.7, "Train/bus estimate"),
  intercity("Budapest", "Pecs", 12, 2.8, "Train/bus estimate"),
  intercity("Budapest", "Gyor", 8, 1.5, "Train estimate"),
  intercity("Vienna", "Bratislava", 8, 1.2, "FlixBus estimate"),
  intercity("Budapest", "Prague", 24, 6.8, "Train/bus estimate"),
  intercity("Budapest", "Zagreb", 22, 4.8, "FlixBus estimate"),
  intercity("Budapest", "Ljubljana", 26, 6.3, "FlixBus estimate"),
  intercity("Budapest", "Krakow", 23, 6.6, "Train/bus estimate"),
  intercity("Vienna", "Prague", 18, 4.3, "Train/bus estimate"),
  intercity("Vienna", "Munich", 22, 4.5, "FlixBus/train estimate"),
  intercity("Vienna", "Zagreb", 24, 5.1, "FlixBus estimate"),
  intercity("Prague", "Berlin", 18, 4.2, "FlixBus/train estimate"),
  intercity("Prague", "Krakow", 20, 6.0, "Train/bus estimate"),
  intercity("Berlin", "Amsterdam", 24, 7.0, "FlixBus estimate"),
  intercity("Berlin", "Warsaw", 22, 6.2, "Train/bus estimate"),
  intercity("Amsterdam", "Brussels", 14, 3.0, "FlixBus/train estimate"),
  intercity("Brussels", "Paris", 16, 4.0, "FlixBus/train estimate"),
  intercity("Paris", "London", 38, 8.2, "Bus/train estimate"),
  intercity("Paris", "Barcelona", 32, 12.5, "FlixBus estimate"),
  intercity("Barcelona", "Madrid", 22, 7.5, "Bus/train estimate"),
  intercity("Barcelona", "Valencia", 16, 4.5, "FlixBus/train estimate"),
  intercity("Madrid", "Lisbon", 25, 8.0, "FlixBus estimate"),
  intercity("Lisbon", "Porto", 11, 3.4, "Bus/train estimate"),
  intercity("Milan", "Rome", 22, 7.5, "Train/bus estimate"),
  intercity("Milan", "Venice", 14, 3.2, "Train/bus estimate"),
  intercity("Rome", "Naples", 12, 2.8, "Train/bus estimate"),
  intercity("Zagreb", "Ljubljana", 11, 2.4, "FlixBus/train estimate"),
  intercity("Ljubljana", "Venice", 20, 4.2, "FlixBus estimate"),
  intercity("Zagreb", "Split", 24, 6.2, "FlixBus estimate"),
  intercity("Split", "Dubrovnik", 18, 4.5, "FlixBus estimate"),
  intercity("Tirana", "Podgorica", 18, 4.0, "FlixBus/bus estimate"),
  intercity("Tirana", "Skopje", 20, 6.0, "Bus estimate"),
  intercity("Podgorica", "Dubrovnik", 18, 4.0, "Bus estimate"),
  intercity("Skopje", "Pristina", 10, 2.0, "Bus estimate"),
  intercity("Sarajevo", "Belgrade", 24, 7.0, "Bus estimate"),
  intercity("Sarajevo", "Zagreb", 24, 6.5, "Bus estimate"),
  intercity("Chisinau", "Bucharest", 24, 8.5, "Bus/train estimate"),
].flatMap((leg) => [leg, reverseIntercity(leg)]);

const airportCity = new Map(cities.flatMap((item) => item.airports.map((airport) => [airport, item.name])));
const form = document.querySelector("#tripForm");
const fromCity = document.querySelector("#fromCity");
const toCity = document.querySelector("#toCity");
const addStop = document.querySelector("#addStop");
const stopCity = document.querySelector("#stopCity");
const stopLength = document.querySelector("#stopLength");
const stopFields = document.querySelector("#stopFields");
const dateOut = document.querySelector("#dateOut");
const tripLength = document.querySelector("#tripLength");
const budget = document.querySelector("#budget");
const budgetValue = document.querySelector("#budgetValue");
const nearbyAirports = document.querySelector("#nearbyAirports");
const selfTransfer = document.querySelector("#selfTransfer");
const includeHostel = document.querySelector("#includeHostel");
const flexDates = document.querySelector("#flexDates");
const backpackOnly = document.querySelector("#backpackOnly");
const lowStress = document.querySelector("#lowStress");
const airportSleep = document.querySelector("#airportSleep");
const hostelLimit = document.querySelector("#hostelLimit");
const hostelLimitValue = document.querySelector("#hostelLimitValue");
const lengthField = document.querySelector("#lengthField");
const tripToggle = document.querySelector(".trip-toggle");
const results = document.querySelector("#results");
const resultsTitle = document.querySelector("#resultsTitle");
const resultCount = document.querySelector("#resultCount");
const dataNote = document.querySelector("#dataNote");
const cards = document.querySelector("#cards");
const template = document.querySelector("#routeTemplate");
const mapElement = document.querySelector("#routeMap");
const mapCaption = document.querySelector("#mapCaption");
const mapPrice = document.querySelector("#mapPrice");
const mapHint = document.querySelector("#mapHint");
const plannerSection = document.querySelector("#routePlanner");
const cityInsight = document.querySelector("#cityInsight");
const insightCity = document.querySelector("#insightCity");
const insightMood = document.querySelector("#insightMood");
const insightFact = document.querySelector("#insightFact");
const insightTags = document.querySelector("#insightTags");
const nearbyRoutePills = document.querySelector("#nearbyRoutePills");
const popularRoutePills = document.querySelector("#popularRoutePills");
const routeDiscovery = document.querySelector(".route-discovery");
const cityByName = new Map(cities.map((item) => [item.name, item]));
let routeMap;
let fromMarker;
let stopMarker;
let toMarker;
let routeLine;
let routeLineShadow;
let renderToken = 0;

const cityCoordinates = {
  London: { lat: 51.5072, lon: -0.1276 },
  Paris: { lat: 48.8566, lon: 2.3522 },
  Lisbon: { lat: 38.7223, lon: -9.1393 },
  Madrid: { lat: 40.4168, lon: -3.7038 },
  Barcelona: { lat: 41.3874, lon: 2.1686 },
  Milan: { lat: 45.4642, lon: 9.19 },
  Rome: { lat: 41.9028, lon: 12.4964 },
  Berlin: { lat: 52.52, lon: 13.405 },
  Munich: { lat: 48.1351, lon: 11.582 },
  Amsterdam: { lat: 52.3676, lon: 4.9041 },
  Brussels: { lat: 50.8503, lon: 4.3517 },
  Copenhagen: { lat: 55.6761, lon: 12.5683 },
  Helsinki: { lat: 60.1699, lon: 24.9384 },
  Stockholm: { lat: 59.3293, lon: 18.0686 },
  Oslo: { lat: 59.9139, lon: 10.7522 },
  Edinburgh: { lat: 55.9533, lon: -3.1883 },
  Dublin: { lat: 53.3498, lon: -6.2603 },
  Zurich: { lat: 47.3769, lon: 8.5417 },
  Prague: { lat: 50.0755, lon: 14.4378 },
  Krakow: { lat: 50.0647, lon: 19.945 },
  Warsaw: { lat: 52.2297, lon: 21.0122 },
  Riga: { lat: 56.9496, lon: 24.1052 },
  Tallinn: { lat: 59.437, lon: 24.7536 },
  Vilnius: { lat: 54.6872, lon: 25.2797 },
  Athens: { lat: 37.9838, lon: 23.7275 },
  Sofia: { lat: 42.6977, lon: 23.3219 },
  Bucharest: { lat: 44.4268, lon: 26.1025 },
  Belgrade: { lat: 44.7866, lon: 20.4489 },
  Zagreb: { lat: 45.815, lon: 15.9819 },
  Ljubljana: { lat: 46.0569, lon: 14.5058 },
  Dubrovnik: { lat: 42.6507, lon: 18.0944 },
  Split: { lat: 43.5081, lon: 16.4402 },
  Valletta: { lat: 35.8997, lon: 14.5146 },
  Istanbul: { lat: 41.0082, lon: 28.9784 },
  Tirana: { lat: 41.3275, lon: 19.8187 },
  Sarajevo: { lat: 43.8563, lon: 18.4131 },
  Skopje: { lat: 41.9981, lon: 21.4254 },
  Podgorica: { lat: 42.4304, lon: 19.2594 },
  Pristina: { lat: 42.6629, lon: 21.1655 },
  Luxembourg: { lat: 49.6116, lon: 6.1319 },
  Reykjavik: { lat: 64.1466, lon: -21.9426 },
  Chisinau: { lat: 47.0105, lon: 28.8638 },
  Larnaca: { lat: 34.9229, lon: 33.6233 },
  Tbilisi: { lat: 41.7151, lon: 44.8271 },
  Debrecen: { lat: 47.5316, lon: 21.6273 },
  Szeged: { lat: 46.253, lon: 20.1414 },
  Pecs: { lat: 46.0727, lon: 18.2323 },
  Gyor: { lat: 47.6875, lon: 17.6504 },
  Venice: { lat: 45.4408, lon: 12.3155 },
  Naples: { lat: 40.8518, lon: 14.2681 },
  Nice: { lat: 43.7102, lon: 7.262 },
  Porto: { lat: 41.1579, lon: -8.6291 },
  Valencia: { lat: 39.4699, lon: -0.3763 },
  Seville: { lat: 37.3891, lon: -5.9845 },
  Malaga: { lat: 36.7213, lon: -4.4214 },
  Palma: { lat: 39.5696, lon: 2.6502 },
  Vienna: { lat: 48.2082, lon: 16.3738 },
  Budapest: { lat: 47.4979, lon: 19.0402 },
  Bratislava: { lat: 48.1486, lon: 17.1077 },
};

const cityInsights = {
  Amsterdam: {
    mood: "Canals, design museums, and bikeable neighborhoods. Great for a short trip if hostel prices behave.",
    tags: ["Rijksmuseum", "Jordaan", "canals"],
  },
  Athens: {
    mood: "Ancient ruins, rooftop sunsets, and cheap gyros. Best when you can avoid brutal midday heat.",
    tags: ["Acropolis", "Plaka", "sunset"],
  },
  Barcelona: {
    mood: "Gaudi walks, beach air, and cheap tapas if you dodge the obvious streets.",
    tags: ["Sagrada Familia", "Gothic Quarter", "beach"],
  },
  Berlin: {
    mood: "Street food, history, galleries, and nightlife. A strong student city when flights are under control.",
    tags: ["Museum Island", "Kreuzberg", "clubs"],
  },
  Budapest: {
    mood: "Thermal baths, river views, and low hostel pressure. A strong base for cheap Europe jumps.",
    tags: ["baths", "Danube", "ruin bars"],
  },
  Lisbon: {
    mood: "Hills, viewpoints, trams, and Atlantic light. Hostel prices can still be friendly.",
    tags: ["Alfama", "miradouros", "tram 28"],
  },
  London: {
    mood: "Huge city energy and free museums, but hostel prices can punish a long stay.",
    tags: ["free museums", "markets", "parks"],
  },
  Madrid: {
    mood: "Late dinners, big museums, parks, and day-trip energy. Often better if you stay long enough to breathe.",
    tags: ["Prado", "Retiro", "tapas"],
  },
  Milan: {
    mood: "Fast fashion, aperitivo, design streets, and an easy base for northern Italy.",
    tags: ["Duomo", "Navigli", "aperitivo"],
  },
  Paris: {
    mood: "Walkable icons, bakeries, museums, and expensive beds. Great when the fare is cheap enough.",
    tags: ["Montmartre", "Seine", "museums"],
  },
  Porto: {
    mood: "Riverside views, tiles, bridges, and a slower cheap-weekend mood.",
    tags: ["Ribeira", "Dom Luis", "tiles"],
  },
  Prague: {
    mood: "Old-town beauty, bridges, beer halls, and usually kinder hostel math.",
    tags: ["Charles Bridge", "Old Town", "views"],
  },
  Rome: {
    mood: "Big history, late walks, pasta, and intense sightseeing. Worth more than a rushed overnight.",
    tags: ["Colosseum", "Trastevere", "gelato"],
  },
  Vienna: {
    mood: "Clean, elegant, and easy from Budapest by bus or train. Great no-flight escape.",
    tags: ["museums", "coffee", "palaces"],
  },
  Bratislava: {
    mood: "Small capital, easy old-town walk, and a very practical Budapest/Vienna ground-hop.",
    tags: ["old town", "castle", "Danube"],
  },
  Zurich: {
    mood: "Beautiful lake, mountain views, and brutal daily costs. Only worth it when the route is unusually strong.",
    tags: ["lake", "old town", "viewpoints"],
  },
  Brussels: {
    mood: "Useful rail/bus gateway for Paris, Amsterdam, and London. Better as a clever stop than a random detour.",
    tags: ["Grand Place", "fries", "gateway"],
  },
  Copenhagen: {
    mood: "Clean, bikeable, design-heavy, and expensive. Great when you can keep the stay short and tight.",
    tags: ["Nyhavn", "bikes", "design"],
  },
  Krakow: {
    mood: "Compact, cheap, and easy to enjoy without burning cash. Strong student-weekend material.",
    tags: ["old town", "Kazimierz", "cheap food"],
  },
  Warsaw: {
    mood: "Big-city Poland with solid museums and friendlier hostel math than western capitals.",
    tags: ["old town", "museums", "parks"],
  },
  Istanbul: {
    mood: "Massive city energy, ferries, markets, and food value. Worth extra days if the flight is kind.",
    tags: ["ferries", "bazaars", "street food"],
  },
  Venice: {
    mood: "Unreal streets, but beds and crowds bite fast. Works best as a short, planned strike.",
    tags: ["canals", "walks", "islands"],
  },
  Naples: {
    mood: "Pizza, chaotic streets, sea views, and lower pressure than Rome or Milan.",
    tags: ["pizza", "old town", "Vesuvius"],
  },
  Nice: {
    mood: "Sea, old-town color, and French Riviera pricing. Best outside peak summer.",
    tags: ["Promenade", "old town", "beach"],
  },
  Tirana: {
    mood: "Colorful streets, mountain views, and cheap food. A strong Balkan pick when the fare lines up.",
    tags: ["Skanderbeg", "Blloku", "Dajti"],
  },
  Sarajevo: {
    mood: "Layered history, mountain edges, and cheap food. Better when you can give it more than one night.",
    tags: ["Bascarsija", "viewpoints", "cevapi"],
  },
  Skopje: {
    mood: "Unusual monuments, mountain day trips, and low daily costs. A useful Balkan connector.",
    tags: ["Old Bazaar", "Matka", "cheap eats"],
  },
  Podgorica: {
    mood: "Not the flashiest capital, but useful for Montenegro links and cheap Balkan routing.",
    tags: ["river walks", "day trips", "gateway"],
  },
  Pristina: {
    mood: "Young city energy, cafes, and cheap stays. Best as part of a Balkan route.",
    tags: ["cafes", "Newborn", "student mood"],
  },
  Luxembourg: {
    mood: "Pretty cliffs and old-town views, but beds can be expensive. Great if transport is very cheap.",
    tags: ["Grund", "fortress", "views"],
  },
  Reykjavik: {
    mood: "Huge nature payoff, serious hostel pressure. Zylo should only bless it when the fare is unusually good.",
    tags: ["harbor", "pools", "nature"],
  },
  Chisinau: {
    mood: "Cheap, calm, and underrated. Works best for curious travelers who like slower city days.",
    tags: ["parks", "wine", "markets"],
  },
  Larnaca: {
    mood: "Sea air, beach walks, and warm shoulder seasons. Good when the flight beats island pricing.",
    tags: ["beach", "salt lake", "sun"],
  },
  Tbilisi: {
    mood: "Old balconies, hills, sulfur baths, and big food value. Worth a longer stay if flights are kind.",
    tags: ["old town", "baths", "khachapuri"],
  },
  Debrecen: {
    mood: "Calmer Hungarian city break with thermal baths and student prices. Works well as a ground hop.",
    tags: ["Great Church", "baths", "parks"],
  },
  Szeged: {
    mood: "Sunny university city with river walks and paprika-food energy. Best reached by train or bus from Budapest.",
    tags: ["Dom Square", "Tisza", "paprika"],
  },
  Pecs: {
    mood: "Art, old streets, and a softer southern Hungary mood. Better by train than chasing a fake airport route.",
    tags: ["Zsolnay", "old town", "cafes"],
  },
  Gyor: {
    mood: "Easy train escape between Budapest and Vienna with baroque streets and riverside walks.",
    tags: ["old town", "rivers", "day trip"],
  },
};

const cityFacts = {
  Amsterdam: "Tiny fact: the canal ring is perfect for a 2-hour walk, but hostel prices can ruin the romance fast.",
  Athens: "Best trick: sunset viewpoints are free, so spend money on food, not views.",
  Barcelona: "Student move: stay near metro lines, not the beach, and the city feels cheaper immediately.",
  Berlin: "Useful fact: many great museums and memorials are clustered, so one transit pass can do a lot.",
  Budapest: "Local edge: baths plus night trains/buses make it a strong low-cost base city.",
  Lisbon: "Tiny warning: hills make distances feel longer than the map says.",
  London: "Budget hack: free museums are the real deal, but beds are the danger zone.",
  Madrid: "Good sign: late city rhythm makes short trips feel longer if your return is not too early.",
  Milan: "Best use: treat it as a northern Italy gateway, not only a fashion weekend.",
  Paris: "Budget truth: cheap flight plus expensive bed can still lose to Brussels plus bus.",
  Porto: "Good value: the best views are mostly free, which helps the daily budget.",
  Prague: "Student-friendly: compact center means less transit spending if your hostel is placed well.",
  Rome: "Timing rule: Rome punishes rushed overnights. Give it daylight or skip the trick.",
  Vienna: "Zylo note: often better by train/bus from Budapest than by airport gymnastics.",
  Bratislava: "Tiny capital advantage: you can pair it with Vienna or Budapest without airport drama.",
  Zurich: "Reality check: free lake views help, but Switzerland can destroy a student daily budget.",
  Brussels: "Gateway edge: sometimes Brussels plus train/bus beats pretending Paris direct is always best.",
  Copenhagen: "Design-city rule: short stay, bike/transit pass, and no expensive bed mistakes.",
  Krakow: "Budget sweet spot: compact sights plus lower hostel pressure make short trips feel fuller.",
  Warsaw: "Useful fact: bigger than it looks, so location matters more than in Krakow or Prague.",
  Istanbul: "Longer-stay city: one rushed night wastes the ferry, bazaar, and food value.",
  Venice: "Smart move: stay nearby or keep it short when island beds get expensive.",
  Naples: "Value angle: cheaper than Rome, but give yourself daylight for the city to make sense.",
  Nice: "Shoulder-season city: the sea is still there when summer prices are not.",
  Tirana: "Underrated: cheap food and mountain day-trip energy make extra nights easier.",
  Sarajevo: "Worth it when slow: the city rewards walking time more than fast checklist travel.",
  Skopje: "Budget edge: low daily costs can make a slightly longer stay still reasonable.",
  Podgorica: "Gateway logic: not always the final prize, but useful for Montenegro routing.",
  Pristina: "Cafe city: low stay cost makes it better as a Balkan add-on.",
  Luxembourg: "Watchout: free public transport helps, but hostel prices can hit hard.",
  Reykjavik: "Big warning: flights can look okay, but the daily cost is the real boss.",
  Chisinau: "Underrated: cheap stays make it interesting if you like slower cities.",
  Larnaca: "Shoulder season wins: warm weather without full island pricing pressure.",
  Tbilisi: "Value city: food and hostel math can make a longer stay smarter than a sprint.",
  Debrecen: "Ground-hop city: better as a train/bus extension than a fake flight target.",
  Szeged: "Zylo logic: fly to Budapest, then train down. That is exactly why this app exists.",
  Pecs: "Ground-hop pick: southern Hungary works best when the Budapest leg is already cheap.",
  Gyor: "Fast escape: easy train city when you want a cheap Hungary/Vienna-side mini trip.",
};

const hostelMarkets = {
  Barcelona: { low: 24, typical: 32, high: 55, confidence: "medium" },
  Rome: { low: 27, typical: 36, high: 56, confidence: "medium" },
  Milan: { low: 30, typical: 42, high: 62, confidence: "medium" },
  Paris: { low: 34, typical: 48, high: 70, confidence: "medium" },
  Lisbon: { low: 20, typical: 28, high: 44, confidence: "medium" },
  Madrid: { low: 24, typical: 34, high: 54, confidence: "medium" },
  Berlin: { low: 27, typical: 38, high: 58, confidence: "medium" },
  London: { low: 38, typical: 52, high: 78, confidence: "medium" },
  Budapest: { low: 15, typical: 23, high: 38, confidence: "medium" },
  Prague: { low: 20, typical: 30, high: 48, confidence: "medium" },
  Vienna: { low: 28, typical: 40, high: 62, confidence: "medium" },
  Bratislava: { low: 18, typical: 27, high: 44, confidence: "medium" },
  Venice: { low: 32, typical: 48, high: 78, confidence: "medium" },
  Naples: { low: 22, typical: 32, high: 52, confidence: "medium" },
  Nice: { low: 32, typical: 46, high: 72, confidence: "medium" },
  Porto: { low: 18, typical: 27, high: 44, confidence: "medium" },
  Valencia: { low: 22, typical: 31, high: 50, confidence: "medium" },
  Seville: { low: 20, typical: 30, high: 48, confidence: "medium" },
  Malaga: { low: 22, typical: 32, high: 54, confidence: "medium" },
  Palma: { low: 28, typical: 42, high: 72, confidence: "medium" },
  Munich: { low: 34, typical: 48, high: 76, confidence: "medium" },
  Amsterdam: { low: 36, typical: 54, high: 82, confidence: "medium" },
  Brussels: { low: 30, typical: 43, high: 66, confidence: "medium" },
  Copenhagen: { low: 38, typical: 55, high: 84, confidence: "medium" },
  Helsinki: { low: 34, typical: 50, high: 76, confidence: "medium" },
  Stockholm: { low: 34, typical: 50, high: 76, confidence: "medium" },
  Oslo: { low: 42, typical: 60, high: 90, confidence: "medium" },
  Edinburgh: { low: 32, typical: 48, high: 74, confidence: "medium" },
  Dublin: { low: 36, typical: 55, high: 86, confidence: "medium" },
  Zurich: { low: 44, typical: 64, high: 96, confidence: "medium" },
  Krakow: { low: 16, typical: 24, high: 40, confidence: "medium" },
  Warsaw: { low: 16, typical: 25, high: 42, confidence: "medium" },
  Riga: { low: 16, typical: 25, high: 42, confidence: "medium" },
  Tallinn: { low: 18, typical: 30, high: 48, confidence: "medium" },
  Vilnius: { low: 15, typical: 24, high: 40, confidence: "medium" },
  Athens: { low: 18, typical: 29, high: 48, confidence: "medium" },
  Sofia: { low: 14, typical: 22, high: 38, confidence: "medium" },
  Bucharest: { low: 15, typical: 24, high: 40, confidence: "medium" },
  Belgrade: { low: 14, typical: 23, high: 38, confidence: "medium" },
  Zagreb: { low: 18, typical: 28, high: 46, confidence: "medium" },
  Ljubljana: { low: 22, typical: 34, high: 54, confidence: "medium" },
  Dubrovnik: { low: 28, typical: 44, high: 76, confidence: "medium" },
  Split: { low: 24, typical: 38, high: 64, confidence: "medium" },
  Valletta: { low: 24, typical: 36, high: 58, confidence: "medium" },
  Istanbul: { low: 16, typical: 27, high: 46, confidence: "medium" },
  Tirana: { low: 12, typical: 21, high: 36, confidence: "medium" },
  Sarajevo: { low: 14, typical: 23, high: 38, confidence: "medium" },
  Skopje: { low: 12, typical: 21, high: 36, confidence: "medium" },
  Podgorica: { low: 16, typical: 28, high: 44, confidence: "medium" },
  Pristina: { low: 14, typical: 24, high: 40, confidence: "medium" },
  Luxembourg: { low: 38, typical: 58, high: 86, confidence: "medium" },
  Reykjavik: { low: 48, typical: 72, high: 110, confidence: "medium" },
  Chisinau: { low: 12, typical: 22, high: 36, confidence: "medium" },
  Larnaca: { low: 22, typical: 36, high: 58, confidence: "medium" },
  Tbilisi: { low: 10, typical: 20, high: 34, confidence: "medium" },
  Debrecen: { low: 14, typical: 24, high: 38, confidence: "medium" },
  Szeged: { low: 13, typical: 22, high: 36, confidence: "medium" },
  Pecs: { low: 13, typical: 22, high: 36, confidence: "medium" },
  Gyor: { low: 16, typical: 27, high: 42, confidence: "medium" },
};

const liveWeatherCache = new Map();
const SELECT_SEARCH_TIMEOUT = 760;

init();

function city(name, country, airports, nearby = []) {
  return { name, country, airports, nearby, flagCode: countryCodes[country] || "" };
}

function ground(cityName, airport, price, hours, provider) {
  return { cityName, airport, price, hours, provider };
}

function air(from, to, airline, price, hours) {
  const trust = airline === "Budget airline estimate" ? "estimate" : "airline-link";
  return { from, to, airline, price, hours, trust, kind: "flight" };
}

function reverseLeg(leg) {
  return { ...leg, from: leg.to, to: leg.from, price: Math.max(18, leg.price + 4) };
}

function intercity(from, to, price, hours, provider) {
  return {
    kind: "ground",
    mode: "intercity",
    from,
    to,
    fromAirport: cityCode(from),
    toAirport: cityCode(to),
    airline: provider,
    price,
    hours,
    trust: "ground-estimate",
  };
}

function reverseIntercity(leg) {
  return { ...leg, from: leg.to, to: leg.from, fromAirport: leg.toAirport, toAirport: leg.fromAirport };
}

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

function enhanceSelects() {
  document.querySelectorAll(".fields select").forEach((select) => {
    if (select.dataset.enhanced === "true") return;

    select.dataset.enhanced = "true";
    select.tabIndex = -1;
    select.hidden = true;
    select.setAttribute("aria-hidden", "true");
    select.classList.add("select-native");

    const shell = document.createElement("div");
    const compact = ["tripLength", "stopLength"].includes(select.id);
    shell.className = "select-shell";
    if (compact) shell.classList.add("select-shell--compact");
    const button = document.createElement("button");
    button.className = "select-button";
    button.type = "button";
    button.setAttribute("aria-haspopup", "listbox");
    button.setAttribute("aria-expanded", "false");
    const menu = document.createElement("div");
    menu.className = compact ? "select-menu select-menu--compact" : "select-menu";
    menu.hidden = true;
    menu.tabIndex = -1;
    menu.setAttribute("role", "listbox");
    select._customMenu = menu;

    select.before(shell);
    shell.append(select, button);
    document.body.append(menu);
    buildCustomSelectMenu(select);
    syncCustomSelect(select);

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleCustomSelect(select);
    });

    button.addEventListener("keydown", (event) => {
      if (isSelectSearchKey(event) && isSearchableSelect(select)) {
        event.preventDefault();
        openCustomSelect(select);
        handleCustomSelectSearch(event, select);
        return;
      }

      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openCustomSelect(select);
        focusCustomOption(select, event.key === "ArrowUp" ? -1 : 1);
      }
    });

    menu.addEventListener("click", (event) => {
      event.stopPropagation();
      const option = event.target.closest(".select-option");
      if (!option) return;
      chooseCustomSelectOption(select, option.dataset.value);
    });

    menu.addEventListener("keydown", (event) => handleCustomSelectKeydown(event, select));
    select.addEventListener("change", () => syncCustomSelect(select));
  });

  document.addEventListener("click", () => closeCustomSelects());
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCustomSelects();
  });
  window.addEventListener("resize", positionOpenCustomSelects);
  window.addEventListener("scroll", positionOpenCustomSelects, true);
}

function buildCustomSelectMenu(select) {
  const menu = customSelectMenu(select);
  menu.innerHTML = "";
  if (isSearchableSelect(select)) {
    const search = document.createElement("input");
    search.className = "select-search";
    search.type = "search";
    search.placeholder = "Search city";
    search.autocomplete = "off";
    search.spellcheck = false;
    search.setAttribute("aria-label", "Search cities");
    search.addEventListener("input", () => {
      select._searchState = { text: normalizeSelectSearch(search.value), time: Date.now() };
      applyCustomSelectSearch(select, search.value);
    });
    menu.append(search);
    select._customSearch = search;
  } else {
    select._customSearch = null;
  }
  Array.from(select.options).forEach((option) => {
    const meta = selectOptionMeta(option);
    const row = document.createElement("button");
    row.className = "select-option";
    row.type = "button";
    row.dataset.value = option.value;
    row.dataset.search = selectOptionSearch(option, meta);
    row.setAttribute("role", "option");
    row.innerHTML = `
      <span>
        <strong>${meta.labelHtml || escapeHtml(option.text)}</strong>
        <small>${meta.description}</small>
      </span>
      <i>${meta.badge}</i>
    `;
    menu.append(row);
  });
  const empty = document.createElement("div");
  empty.className = "select-empty";
  empty.hidden = true;
  empty.textContent = "No matching city";
  menu.append(empty);
}

function syncCustomSelect(select) {
  const shell = select.closest(".select-shell");
  if (!shell) return;

  const selected = select.selectedOptions[0];
  const button = shell.querySelector(".select-button");
  const menu = customSelectMenu(select);
  const meta = selectOptionMeta(selected);
  button.innerHTML = `
    <span>${meta.labelHtml || escapeHtml(selected.text)}</span>
    <small>${meta.badge}</small>
    <i aria-hidden="true"></i>
  `;
  menu.querySelectorAll(".select-option").forEach((option) => {
    const active = option.dataset.value === select.value;
    option.classList.toggle("is-selected", active);
    option.setAttribute("aria-selected", String(active));
  });
}

function refreshCustomSelect(select) {
  syncCustomSelect(select);
}

function selectOptionMeta(option) {
  if (["tripLength", "stopLength"].includes(option.parentElement?.id)) {
    return {
      badge: option.value === "7" ? "1w" : `${option.value}d`,
      description: option.parentElement?.id === "stopLength" ? "Stop time" : "Duration",
    };
  }
  const cityItem = cities.find((item) => item.name === option.value);
  if (cityItem) {
    return {
      labelHtml: cityLabelHtml(cityItem.name),
      badge: cityCode(cityItem.name),
      description: `${cityItem.country} · ${cityItem.airports.join(", ")}`,
    };
  }
  if (option.value === "Anywhere") return { badge: "Flex", description: "Let the cheapest city win" };
  return { badge: "Stay", description: "Trip length" };
}

function selectOptionSearch(option, meta) {
  const cityItem = cities.find((item) => item.name === option.value);
  if (cityItem) {
    return normalizeSelectSearch(`${cityItem.name} ${cityItem.country} ${cityItem.airports.join(" ")} ${cityCode(cityItem.name)}`);
  }
  if (option.value === "Anywhere") {
    return normalizeSelectSearch("anywhere cheap flexible flex cheapest budget surprise");
  }
  return normalizeSelectSearch(`${option.text} ${option.value} ${meta.badge || ""} ${meta.description || ""}`);
}

function toggleCustomSelect(select) {
  const shell = select.closest(".select-shell");
  if (shell.classList.contains("is-open")) {
    closeCustomSelect(select);
  } else {
    openCustomSelect(select);
  }
}

function openCustomSelect(select) {
  closeCustomSelects(select);
  const shell = select.closest(".select-shell");
  const menu = customSelectMenu(select);
  resetCustomSelectSearch(select);
  shell.classList.add("is-open");
  menu.hidden = false;
  shell.querySelector(".select-button").setAttribute("aria-expanded", "true");
  positionCustomSelectMenu(select);
  if (isSearchableSelect(select)) {
    requestAnimationFrame(() => select._customSearch?.focus({ preventScroll: true }));
  }
}

function closeCustomSelect(select) {
  const shell = select.closest(".select-shell");
  const menu = customSelectMenu(select);
  if (!shell) return;
  shell.classList.remove("is-open");
  resetCustomSelectSearch(select);
  menu.hidden = true;
  shell.querySelector(".select-button").setAttribute("aria-expanded", "false");
}

function closeCustomSelects(exceptSelect) {
  document.querySelectorAll(".select-native").forEach((select) => {
    if (select !== exceptSelect) closeCustomSelect(select);
  });
}

function chooseCustomSelectOption(select, value) {
  select.value = value;
  select.dispatchEvent(new Event("change", { bubbles: true }));
  requestAnimationFrame(() => routeMap?.invalidateSize());
  closeCustomSelect(select);
  select.closest(".select-shell").querySelector(".select-button").focus();
}

function focusCustomOption(select, direction) {
  const options = visibleCustomOptions(select);
  if (!options.length) return;
  const current = options.indexOf(document.activeElement);
  const selected = options.findIndex((option) => option.dataset.value === select.value);
  const start = current >= 0 ? current : Math.max(0, selected);
  const index = direction < 0 ? Math.max(0, start - 1) : Math.min(options.length - 1, start + 1);
  options[index]?.focus();
}

function handleCustomSelectKeydown(event, select) {
  if (event.target?.classList?.contains("select-search")) {
    if (event.key === "Escape") {
      closeCustomSelect(select);
      select.closest(".select-shell").querySelector(".select-button").focus();
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      visibleCustomOptions(select)[0]?.focus();
    }
    return;
  }

  if (isSelectSearchKey(event) && isSearchableSelect(select)) {
    event.preventDefault();
    handleCustomSelectSearch(event, select);
    return;
  }

  if (!["ArrowDown", "ArrowUp", "Enter", " ", "Escape"].includes(event.key)) return;
  event.preventDefault();

  if (event.key === "Escape") {
    closeCustomSelect(select);
    select.closest(".select-shell").querySelector(".select-button").focus();
    return;
  }

  const options = visibleCustomOptions(select);
  const current = options.indexOf(document.activeElement);
  if (event.key === "ArrowDown") options[Math.min(options.length - 1, current + 1)]?.focus();
  if (event.key === "ArrowUp") options[Math.max(0, current - 1)]?.focus();
  if (["Enter", " "].includes(event.key) && document.activeElement?.classList.contains("select-option")) {
    chooseCustomSelectOption(select, document.activeElement.dataset.value);
  }
}

function handleCustomSelectSearch(event, select) {
  const now = Date.now();
  const previous = select._searchState || { text: "", time: 0 };
  const stale = now - previous.time > SELECT_SEARCH_TIMEOUT;
  const base = stale ? "" : previous.text;
  const next = event.key === "Backspace" ? base.slice(0, -1) : `${base}${event.key}`;
  select._searchState = { text: normalizeSelectSearch(next), time: now };
  applyCustomSelectSearch(select, select._searchState.text);
}

function applyCustomSelectSearch(select, query) {
  const menu = customSelectMenu(select);
  const options = Array.from(menu.querySelectorAll(".select-option"));
  const normalized = normalizeSelectSearch(query);
  let visible = 0;

  options.forEach((option) => {
    const matches = !normalized || option.dataset.search.includes(normalized);
    option.hidden = !matches;
    if (matches) visible += 1;
  });

  const empty = menu.querySelector(".select-empty");
  if (empty) empty.hidden = visible > 0;
  menu.classList.toggle("is-filtering", Boolean(normalized));

  const visibleOptions = visibleCustomOptions(select);
  const nextFocus = visibleOptions.find((option) => option.dataset.value === select.value) || visibleOptions[0];
  if (document.activeElement === select._customSearch) {
    nextFocus?.scrollIntoView({ block: "nearest" });
  } else if (nextFocus) {
    nextFocus.focus({ preventScroll: true });
    nextFocus.scrollIntoView({ block: "nearest" });
  } else {
    menu.focus({ preventScroll: true });
  }
  positionCustomSelectMenu(select);
}

function resetCustomSelectSearch(select) {
  select._searchState = { text: "", time: 0 };
  const menu = customSelectMenu(select);
  if (!menu) return;
  if (select._customSearch) select._customSearch.value = "";
  menu.classList.remove("is-filtering");
  menu.querySelectorAll(".select-option").forEach((option) => {
    option.hidden = false;
  });
  const empty = menu.querySelector(".select-empty");
  if (empty) empty.hidden = true;
}

function visibleCustomOptions(select) {
  return Array.from(customSelectMenu(select).querySelectorAll(".select-option")).filter((option) => !option.hidden);
}

function isSearchableSelect(select) {
  return !["tripLength", "stopLength"].includes(select.id);
}

function isSelectSearchKey(event) {
  if (event.altKey || event.ctrlKey || event.metaKey) return false;
  return event.key === "Backspace" || (event.key.length === 1 && /\S/.test(event.key));
}

function normalizeSelectSearch(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function customSelectMenu(select) {
  return select._customMenu;
}

function positionOpenCustomSelects() {
  document.querySelectorAll(".select-native").forEach((select) => {
    if (select.closest(".select-shell")?.classList.contains("is-open")) {
      positionCustomSelectMenu(select);
    }
  });
}

function positionCustomSelectMenu(select) {
  const shell = select.closest(".select-shell");
  const button = shell.querySelector(".select-button");
  const menu = customSelectMenu(select);
  if (!button || !menu || menu.hidden) return;

  const rect = button.getBoundingClientRect();
  const viewportPad = 12;
  const gap = 8;
  const compact = ["tripLength", "stopLength"].includes(select.id);
  const desiredWidth = compact ? Math.max(rect.width, 300) : Math.max(rect.width, 320);
  const width = Math.min(desiredWidth, window.innerWidth - viewportPad * 2);
  const below = window.innerHeight - rect.bottom - gap - viewportPad;
  const above = rect.top - gap - viewportPad;
  const openAbove = below < (compact ? 210 : 260) && above > below;
  const maxHeight = compact ? 280 : Math.max(180, Math.min(380, openAbove ? above : below));

  menu.style.width = `${width}px`;
  menu.style.maxHeight = compact ? "none" : `${maxHeight}px`;
  menu.style.left = `${Math.round(Math.min(window.innerWidth - width - viewportPad, Math.max(viewportPad, compact ? rect.right - width : rect.left)))}px`;
  menu.style.top = "-9999px";
  menu.classList.toggle("is-above", openAbove);

  const height = menu.offsetHeight;
  const top = openAbove ? Math.max(viewportPad, rect.top - gap - height) : Math.min(window.innerHeight - viewportPad - height, rect.bottom + gap);
  menu.style.top = `${Math.round(Math.max(viewportPad, top))}px`;
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
  const intercityGround = intercityGraph.filter((leg) => leg.from === fromName).map((leg) => leg.to);
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

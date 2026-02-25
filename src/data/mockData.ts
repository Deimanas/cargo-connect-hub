export interface Cargo {
  id: string;
  title: string;
  from: string;
  fromCountry: string;
  to: string;
  toCountry: string;
  weight: number;
  volume?: number;
  price?: number;
  vehicleType: string;
  loadDate: string;
  unloadDate: string;
  status: "active" | "reserved" | "completed";
  distance: number;
  company: string;
  description?: string;
  fromCoords?: [number, number];
  toCoords?: [number, number];
}

export interface TransportOffer {
  id: string;
  company: string;
  vehicleType: string;
  from: string;
  to: string;
  availableDate: string;
  capacity: number;
  pricePerKm?: number;
  rating: number;
}

export interface Message {
  id: string;
  from: string;
  company: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
}

export const mockCargos: Cargo[] = [
  {
    id: "1",
    title: "Statybinės medžiagos",
    from: "Vilnius",
    fromCountry: "LT",
    to: "Warszawa",
    toCountry: "PL",
    weight: 18,
    volume: 82,
    price: 850,
    vehicleType: "Tentinis",
    loadDate: "2026-02-26",
    unloadDate: "2026-02-27",
    status: "active",
    distance: 580,
    company: "UAB Statyba",
    description: "Plytų ir cemento krovinys. Reikalingas standartinis tentinis puspriekabė.",
    fromCoords: [54.6872, 25.2797],
    toCoords: [52.2297, 21.0122],
  },
  {
    id: "2",
    title: "Maisto produktai (šaldytas)",
    from: "Kaunas",
    fromCountry: "LT",
    to: "Berlin",
    toCountry: "DE",
    weight: 12,
    volume: 60,
    price: 1450,
    vehicleType: "Refrižeratorius",
    loadDate: "2026-02-27",
    unloadDate: "2026-03-01",
    status: "active",
    distance: 1120,
    company: "UAB Šaldymas",
    description: "Šaldyti mėsos produktai. Temperatūra -18°C.",
    fromCoords: [54.8985, 23.9036],
    toCoords: [52.5200, 13.4050],
  },
  {
    id: "3",
    title: "Baldai (nestandartinis)",
    from: "Klaipėda",
    fromCountry: "LT",
    to: "Stockholm",
    toCountry: "SE",
    weight: 8,
    volume: 90,
    price: 1800,
    vehicleType: "Tentinis",
    loadDate: "2026-02-28",
    unloadDate: "2026-03-02",
    status: "active",
    distance: 950,
    company: "UAB Baldai LT",
    fromCoords: [55.7033, 21.1443],
    toCoords: [59.3293, 18.0686],
  },
  {
    id: "4",
    title: "Elektronika",
    from: "Riga",
    fromCountry: "LV",
    to: "Vilnius",
    toCountry: "LT",
    weight: 5,
    volume: 30,
    price: 320,
    vehicleType: "Furgoninis",
    loadDate: "2026-02-26",
    unloadDate: "2026-02-26",
    status: "reserved",
    distance: 310,
    company: "SIA TechLog",
    fromCoords: [56.9496, 24.1052],
    toCoords: [54.6872, 25.2797],
  },
  {
    id: "5",
    title: "Mediena (rąstai)",
    from: "Panevėžys",
    fromCountry: "LT",
    to: "Helsinki",
    toCountry: "FI",
    weight: 24,
    price: 2100,
    vehicleType: "Platforma",
    loadDate: "2026-03-01",
    unloadDate: "2026-03-04",
    status: "active",
    distance: 820,
    company: "UAB MedienosGrupė",
    fromCoords: [55.7348, 24.3575],
    toCoords: [60.1699, 24.9384],
  },
  {
    id: "6",
    title: "Cheminės medžiagos (ADR)",
    from: "Šiauliai",
    fromCountry: "LT",
    to: "Praha",
    toCountry: "CZ",
    weight: 15,
    price: 1650,
    vehicleType: "Cisterna",
    loadDate: "2026-03-02",
    unloadDate: "2026-03-04",
    status: "active",
    distance: 1280,
    company: "UAB ChemTrans",
    fromCoords: [55.9349, 23.3137],
    toCoords: [50.0755, 14.4378],
  },
];

export const mockTransportOffers: TransportOffer[] = [
  { id: "1", company: "UAB FastTruck", vehicleType: "Tentinis", from: "Vilnius", to: "Europa", availableDate: "2026-02-27", capacity: 22, pricePerKm: 1.2, rating: 4.8 },
  { id: "2", company: "PL-Trans Sp.", vehicleType: "Refrižeratorius", from: "Warszawa", to: "Baltijos šalys", availableDate: "2026-02-28", capacity: 18, pricePerKm: 1.5, rating: 4.5 },
  { id: "3", company: "Nordic Logistics", vehicleType: "Tentinis", from: "Stockholm", to: "Lietuva", availableDate: "2026-03-01", capacity: 24, pricePerKm: 1.3, rating: 4.9 },
  { id: "4", company: "UAB Keliai", vehicleType: "Platforma", from: "Kaunas", to: "Vokietija", availableDate: "2026-02-26", capacity: 25, pricePerKm: 1.1, rating: 4.2 },
];

export const mockMessages: Message[] = [
  { id: "1", from: "Petras K.", company: "UAB FastTruck", lastMessage: "Labas, ar galite pakrauti rytoj?", time: "14:32", unread: 2 },
  { id: "2", from: "Anna M.", company: "PL-Trans Sp.", lastMessage: "Kaina sutarta, siunčiu dokumentus.", time: "12:15", unread: 0 },
  { id: "3", from: "Erik S.", company: "Nordic Logistics", lastMessage: "Transportas bus Klaipėdoje penktadienį.", time: "Vakar", unread: 1 },
  { id: "4", from: "Marius V.", company: "UAB ChemTrans", lastMessage: "ADR dokumentai paruošti.", time: "Vakar", unread: 0 },
];

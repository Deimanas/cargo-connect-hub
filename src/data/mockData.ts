export interface Cargo {
  id: string;
  title: string;
  from: string;
  fromCountry: string;
  fromAddress?: string;
  to: string;
  toCountry: string;
  toAddress?: string;
  weight: number;
  volume?: number;
  price?: number;
  pricePerKm?: number;
  vehicleType: string;
  loadDate: string;
  unloadDate: string;
  status: "active" | "reserved" | "completed";
  distance: number;
  company: string;
  description?: string;
  fromCoords?: [number, number];
  toCoords?: [number, number];
  // Extended fields
  loadType?: string; // "FTL" | "LTL" | "Grupažas"
  dimensions?: { length?: number; width?: number; height?: number };
  pallets?: number;
  adr?: string;
  temperatureRange?: string;
  paymentTerm?: string;
  paymentDays?: number;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  createdAt?: string;
  views?: number;
  offers?: number;
  cargoType?: string;
  stackable?: boolean;
  customs?: boolean;
  cmr?: boolean;
  notes?: string;
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
    fromAddress: "Ukmergės g. 280, Vilnius",
    to: "Warszawa",
    toCountry: "PL",
    toAddress: "ul. Marszałkowska 100, Warszawa",
    weight: 18,
    volume: 82,
    price: 850,
    pricePerKm: 1.47,
    vehicleType: "Tentinis",
    loadDate: "2026-02-26",
    unloadDate: "2026-02-27",
    status: "active",
    distance: 580,
    company: "UAB Statyba",
    description: "Plytų ir cemento krovinys. Reikalingas standartinis tentinis puspriekabė. Pakrovimas nuo 8:00 iki 16:00. Iškrovimas darbo dienomis.",
    fromCoords: [54.6872, 25.2797],
    toCoords: [52.2297, 21.0122],
    loadType: "FTL",
    dimensions: { length: 13.6, width: 2.45, height: 2.7 },
    pallets: 33,
    paymentTerm: "Pavedimas",
    paymentDays: 30,
    contactPerson: "Jonas Kazlauskas",
    contactPhone: "+370 612 34567",
    contactEmail: "jonas@statyba.lt",
    createdAt: "2026-02-24",
    views: 47,
    offers: 3,
    cargoType: "Statybinės medžiagos",
    stackable: false,
    customs: false,
    cmr: true,
    notes: "Pakrovimas kranu. Būtinas tentinis su šoninėmis užuolaidomis.",
  },
  {
    id: "2",
    title: "Maisto produktai (šaldytas)",
    from: "Kaunas",
    fromCountry: "LT",
    fromAddress: "Pramonės pr. 16, Kaunas",
    to: "Berlin",
    toCountry: "DE",
    toAddress: "Industriestraße 45, Berlin",
    weight: 12,
    volume: 60,
    price: 1450,
    pricePerKm: 1.29,
    vehicleType: "Refrižeratorius",
    loadDate: "2026-02-27",
    unloadDate: "2026-03-01",
    status: "active",
    distance: 1120,
    company: "UAB Šaldymas",
    description: "Šaldyti mėsos produktai. Temperatūra -18°C. Būtinas temperatūros registratorius.",
    fromCoords: [54.8985, 23.9036],
    toCoords: [52.5200, 13.4050],
    loadType: "FTL",
    dimensions: { length: 13.6, width: 2.45, height: 2.5 },
    pallets: 26,
    temperatureRange: "-18°C ~ -22°C",
    paymentTerm: "Pavedimas",
    paymentDays: 45,
    contactPerson: "Rasa Petraitienė",
    contactPhone: "+370 698 76543",
    contactEmail: "rasa@saldymas.lt",
    createdAt: "2026-02-25",
    views: 62,
    offers: 5,
    cargoType: "Maisto produktai",
    stackable: false,
    customs: false,
    cmr: true,
    notes: "Būtinas FRC sertifikatas. Temperatūros režimas privalomas visą kelionę.",
  },
  {
    id: "3",
    title: "Baldai (nestandartinis)",
    from: "Klaipėda",
    fromCountry: "LT",
    fromAddress: "Šilutės pl. 2, Klaipėda",
    to: "Stockholm",
    toCountry: "SE",
    toAddress: "Kungsgatan 30, Stockholm",
    weight: 8,
    volume: 90,
    price: 1800,
    pricePerKm: 1.89,
    vehicleType: "Tentinis",
    loadDate: "2026-02-28",
    unloadDate: "2026-03-02",
    status: "active",
    distance: 950,
    company: "UAB Baldai LT",
    fromCoords: [55.7033, 21.1443],
    toCoords: [59.3293, 18.0686],
    loadType: "FTL",
    dimensions: { length: 13.6, width: 2.45, height: 2.7 },
    pallets: 20,
    paymentTerm: "Pavedimas",
    paymentDays: 60,
    contactPerson: "Mindaugas Jonaitis",
    contactPhone: "+370 655 11223",
    contactEmail: "mindaugas@baldai.lt",
    createdAt: "2026-02-26",
    views: 31,
    offers: 2,
    cargoType: "Baldai",
    stackable: false,
    customs: false,
    cmr: true,
    description: "Surinkti baldai ant paletų. Atsargus krovimas, jautru drėgmei.",
    notes: "Keltas iš Klaipėdos. Kaina su keltu.",
  },
  {
    id: "4",
    title: "Elektronika",
    from: "Riga",
    fromCountry: "LV",
    fromAddress: "Brīvības iela 200, Rīga",
    to: "Vilnius",
    toCountry: "LT",
    toAddress: "Laisvės pr. 60, Vilnius",
    weight: 5,
    volume: 30,
    price: 320,
    pricePerKm: 1.03,
    vehicleType: "Furgoninis",
    loadDate: "2026-02-26",
    unloadDate: "2026-02-26",
    status: "reserved",
    distance: 310,
    company: "SIA TechLog",
    fromCoords: [56.9496, 24.1052],
    toCoords: [54.6872, 25.2797],
    loadType: "LTL",
    dimensions: { length: 6, width: 2.4, height: 2.4 },
    pallets: 8,
    paymentTerm: "Išankstinis",
    paymentDays: 0,
    contactPerson: "Andris Bērziņš",
    contactPhone: "+371 2612 3456",
    contactEmail: "andris@techlog.lv",
    createdAt: "2026-02-23",
    views: 89,
    offers: 7,
    cargoType: "Elektronika",
    stackable: true,
    customs: true,
    cmr: true,
    description: "Kompiuterių komponentai. Vertingas krovinys, reikalingas draudimas.",
    notes: "GPS sekimas privalomas.",
  },
  {
    id: "5",
    title: "Mediena (rąstai)",
    from: "Panevėžys",
    fromCountry: "LT",
    fromAddress: "Miško g. 15, Panevėžys",
    to: "Helsinki",
    toCountry: "FI",
    toAddress: "Satamakatu 10, Helsinki",
    weight: 24,
    price: 2100,
    pricePerKm: 2.56,
    vehicleType: "Platforma",
    loadDate: "2026-03-01",
    unloadDate: "2026-03-04",
    status: "active",
    distance: 820,
    company: "UAB MedienosGrupė",
    fromCoords: [55.7348, 24.3575],
    toCoords: [60.1699, 24.9384],
    loadType: "FTL",
    paymentTerm: "Pavedimas",
    paymentDays: 30,
    contactPerson: "Tomas Medinis",
    contactPhone: "+370 677 88990",
    contactEmail: "tomas@medienagrupe.lt",
    createdAt: "2026-02-27",
    views: 22,
    offers: 1,
    cargoType: "Mediena",
    stackable: false,
    customs: true,
    cmr: true,
    description: "Apvaliosios medienos rąstai, ilgis 6m. Reikalingas stovų komplektas.",
    notes: "Pakrovimas kranu pakrovimo aikštelėje. Svoris gali kisti ±2t.",
  },
  {
    id: "6",
    title: "Cheminės medžiagos (ADR)",
    from: "Šiauliai",
    fromCountry: "LT",
    fromAddress: "Pramonės g. 8, Šiauliai",
    to: "Praha",
    toCountry: "CZ",
    toAddress: "Průmyslová 120, Praha",
    weight: 15,
    price: 1650,
    pricePerKm: 1.29,
    vehicleType: "Cisterna",
    loadDate: "2026-03-02",
    unloadDate: "2026-03-04",
    status: "active",
    distance: 1280,
    company: "UAB ChemTrans",
    fromCoords: [55.9349, 23.3137],
    toCoords: [50.0755, 14.4378],
    loadType: "FTL",
    adr: "ADR 3 klasė – Degieji skysčiai",
    paymentTerm: "Pavedimas",
    paymentDays: 14,
    contactPerson: "Vytautas Cheminis",
    contactPhone: "+370 611 22334",
    contactEmail: "vytautas@chemtrans.lt",
    createdAt: "2026-02-28",
    views: 56,
    offers: 4,
    cargoType: "Cheminės medžiagos",
    stackable: false,
    customs: true,
    cmr: true,
    description: "Pramoniniai tirpikliai. ADR 3 klasė. Būtinas ADR pažymėjimas ir atitinkama cisterna.",
    notes: "Vairuotojas privalo turėti galiojantį ADR pažymėjimą. Cisterna turi atitikti UN standartus.",
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

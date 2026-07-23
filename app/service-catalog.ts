export const serviceCatalog = [
  {
    id: "garden",
    number: "01",
    title: "Garten & Grundstück",
    formValue: "Gartenpflege",
    text: "Pflege, Rückschnitt und saubere Außenflächen — regelmäßig oder genau dann, wenn Unterstützung gebraucht wird.",
  },
  {
    id: "winter",
    number: "02",
    title: "Winterdienst",
    formValue: "Winterdienst",
    text: "Schnee räumen, Flächen streuen und Wege sichern. Abrufbereit bei plötzlichem Wintereinbruch.",
  },
  {
    id: "property",
    number: "03",
    title: "Hausmeisterservice",
    formValue: "Hausmeisterservice",
    text: "Kontrolle, Pflege, Koordination und kleinere Reparaturen für private und gewerbliche Immobilien.",
  },
  {
    id: "clear",
    number: "04",
    title: "Entrümpelung",
    formValue: "Entrümpelung",
    text: "Wohnungsauflösung, Betriebsauflösung, Demontage und besenreine Übergabe — diskret und gut geplant.",
  },
] as const;

export type ServiceCatalogItem = (typeof serviceCatalog)[number];
export type ServiceId = ServiceCatalogItem["id"];

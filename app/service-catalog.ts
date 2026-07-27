export const serviceCatalog = [
  {
    id: "garden",
    number: "01",
    title: "Garten & Grundstück",
    formValue: "Gartenpflege",
    text: "Rasen- und Grünpflege sowie Form- und Rückschnitt an Hecken und Gehölzen — für Eigenheime und größere Außenanlagen.",
  },
  {
    id: "winter",
    number: "02",
    title: "Winterdienst",
    formValue: "Winterdienst",
    text: "Schnee räumen und Flächen streuen auf Treppen, Aufgängen, Gehwegen, Zufahrten, Parkplätzen und Höfen.",
  },
  {
    id: "property",
    number: "03",
    title: "Hausmeisterservice",
    formValue: "Hausmeisterservice",
    text: "Kontrolle und Wartung privater sowie gewerblicher Objekte; Kleinreparaturen, wenn kein Fachbetrieb erforderlich ist.",
  },
  {
    id: "clear",
    number: "04",
    title: "Entrümpelung",
    formValue: "Entrümpelung",
    text: "Private Haushalts- und Wohnungsauflösungen sowie gewerbliche Betriebsauflösungen — auf Wunsch mit Demontagearbeiten.",
  },
] as const;

export type ServiceCatalogItem = (typeof serviceCatalog)[number];
export type ServiceId = ServiceCatalogItem["id"];

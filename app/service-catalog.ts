export const serviceCatalog = [
  {
    id: "garden",
    number: "01",
    title: "Garten & Hauspflege",
    formValue: "Garten- und Hauspflege",
    text: "Pflege, Reinigung und Betreuung privater sowie gewerblicher Objekte — innen wie außen.",
    details: [
      "Rasen- und Grünpflege",
      "Heckenform und Rückschnitt",
      "Gebäude- und Fensterreinigung nach Auftrag",
      "Pflege und Betreuung von Objekten",
    ],
  },
  {
    id: "winter",
    number: "02",
    title: "Winterdienst",
    formValue: "Winterdienst",
    text: "Schnee räumen und Flächen streuen auf Treppen, Aufgängen, Gehwegen, Zufahrten, Parkplätzen und Höfen.",
    details: [
      "Treppen, Aufgänge und Gehwege",
      "Zufahrten, Parkplätze und Höfe",
      "Räumen und Streuen nach Abstimmung",
    ],
  },
  {
    id: "property",
    number: "03",
    title: "Hausmeisterservice",
    formValue: "Hausmeisterservice",
    text: "Kontrolle und Wartung privater sowie gewerblicher Objekte; Kleinreparaturen, wenn kein Fachbetrieb erforderlich ist.",
    details: [
      "Kontrolle privater und gewerblicher Objekte",
      "Wartung im vereinbarten Umfang",
      "Kleinreparaturen ohne Fachbetriebspflicht",
    ],
  },
  {
    id: "clear",
    number: "04",
    title: "Entrümpelung",
    formValue: "Entrümpelung",
    text: "Private Haushalts- und Wohnungsauflösungen sowie gewerbliche Betriebsauflösungen — auf Wunsch mit abgestimmten Demontage- und Renovierungsarbeiten.",
    details: [
      "Haushalts- und Wohnungsauflösungen",
      "Gewerbliche Entrümpelungen und Betriebsauflösungen",
      "Entsorgung im vereinbarten Umfang",
      "Demontage- und Renovierungsarbeiten nach Abstimmung",
    ],
  },
] as const;

export type ServiceCatalogItem = (typeof serviceCatalog)[number];
export type ServiceId = ServiceCatalogItem["id"];

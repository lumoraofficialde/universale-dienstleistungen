export const serviceCatalog = [
  {
    id: "garden",
    number: "01",
    title: "Garten & Grundstück",
    formValue: "Gartenpflege",
    href: "/leistungen/gartenpflege/",
    text: "Rasen- und Grünpflege sowie Form- und Rückschnitt von Hecken und Gehölzen — für Eigenheime, kleinere Objekte und größere Außenanlagen.",
  },
  {
    id: "winter",
    number: "02",
    title: "Winterdienst",
    formValue: "Winterdienst",
    href: "/leistungen/winterdienst/",
    text: "Schneeräumung und Streuarbeiten auf Treppen, Aufgängen, Gehwegen, Zufahrten, Parkplätzen und Höfen.",
  },
  {
    id: "property",
    number: "03",
    title: "Hausmeisterservice",
    formValue: "Hausmeisterservice",
    href: "/leistungen/hausmeisterservice/",
    text: "Kontrolle und Wartung privater und gewerblicher Objekte sowie Kleinreparaturen, sofern kein Fachbetrieb erforderlich ist.",
  },
  {
    id: "clear",
    number: "04",
    title: "Entrümpelung",
    formValue: "Entrümpelung",
    href: "/leistungen/entruempelung/",
    text: "Private Haushalts- und Wohnungsauflösungen sowie gewerbliche Betriebsauflösungen — bei Bedarf einschließlich Demontagearbeiten.",
  },
  {
    id: "commercial",
    number: "05",
    title: "Objektbetreuung",
    formValue: "Gewerbliche Objektbetreuung",
    href: "/leistungen/objektbetreuung/",
    text: "Abgestimmte Kontroll-, Pflege- und Saisoneinsätze für Hausverwaltungen, Unternehmen und gewerblich genutzte Immobilien.",
  },
] as const;

export type ServiceCatalogItem = (typeof serviceCatalog)[number];
export type ServiceId = ServiceCatalogItem["id"];

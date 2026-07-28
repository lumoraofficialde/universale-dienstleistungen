import type { Metadata } from "next";

export type ServiceImage = {
  src: string;
  srcSet?: string;
  mobileSrc?: string;
  width: number;
  height: number;
  alt: string;
  position?: string;
  mobilePosition?: string;
};

export type ServiceStage = {
  key: string;
  label: string;
  number: string;
  title: string[];
  text: string;
  points: string[];
  image: ServiceImage;
};

export type ServiceSlug =
  | "gartenpflege"
  | "winterdienst"
  | "hausmeisterservice"
  | "entruempelung"
  | "objektbetreuung";

export type ServicePageData = {
  slug: ServiceSlug;
  name: string;
  formValue: string;
  seoTitle: string;
  metaDescription: string;
  schemaServiceType: string;
  stages: ServiceStage[];
  closingTitle: string[];
  closingText: string;
  whatsappText: string;
};

const images = {
  gardenStory: {
    src: "/media/chronogarten-garten.webp",
    srcSet:
      "/media/chronogarten-garten-960.webp 960w, /media/chronogarten-garten.webp 1586w",
    mobileSrc: "/media/chronogarten-garten-mobile.webp",
    width: 1586,
    height: 992,
    alt: "Mitarbeiter beim Heckenschnitt an einem gepflegten Grundstück",
    position: "center",
    mobilePosition: "52% center",
  },
  winterStory: {
    src: "/media/chronogarten-winter.webp",
    srcSet:
      "/media/chronogarten-winter-960.webp 960w, /media/chronogarten-winter.webp 1586w",
    mobileSrc: "/media/chronogarten-winter-mobile.webp",
    width: 1586,
    height: 992,
    alt: "Mitarbeiter räumt Schnee von einer Zufahrt",
    position: "center",
    mobilePosition: "58% center",
  },
  propertyStory: {
    src: "/media/chronogarten-hausmeister.webp",
    srcSet:
      "/media/chronogarten-hausmeister-960.webp 960w, /media/chronogarten-hausmeister.webp 1586w",
    mobileSrc: "/media/chronogarten-hausmeister-mobile.webp",
    width: 1586,
    height: 992,
    alt: "Mitarbeiter bei einer Kontrolle an einem Gebäude",
    position: "center",
    mobilePosition: "58% center",
  },
  clearanceStory: {
    src: "/media/chronogarten-entruempelung.webp",
    srcSet:
      "/media/chronogarten-entruempelung-960.webp 960w, /media/chronogarten-entruempelung.webp 1586w",
    mobileSrc: "/media/chronogarten-entruempelung-mobile.webp",
    width: 1586,
    height: 992,
    alt: "Zwei Mitarbeiter tragen Gegenstände aus einem Gebäude",
    position: "center",
    mobilePosition: "68% center",
  },
  objectStory: {
    src: "/media/chronogarten-intro.webp",
    srcSet:
      "/media/chronogarten-intro-960.webp 960w, /media/chronogarten-intro.webp 1586w",
    mobileSrc: "/media/chronogarten-intro-mobile.webp",
    width: 1586,
    height: 992,
    alt: "Mitarbeiter auf dem Weg über ein gepflegtes Grundstück",
    position: "center",
    mobilePosition: "58% center",
  },
  hedgeWork: {
    src: "/media/gardener-trimming.webp",
    srcSet:
      "/media/gardener-trimming-1280.webp 1280w, /media/gardener-trimming-1920.webp 1920w, /media/gardener-trimming.webp 2560w",
    width: 2560,
    height: 1707,
    alt: "Mitarbeiter beim Formschnitt einer Hecke",
    position: "center 48%",
    mobilePosition: "54% center",
  },
  gardenEdge: {
    src: "/media/massstabsreise-kante.webp",
    srcSet:
      "/media/massstabsreise-kante-960.webp 960w, /media/massstabsreise-kante.webp 1672w",
    width: 1672,
    height: 941,
    alt: "Gepflegte Rasenkante an einer dichten Hecke",
    position: "center",
    mobilePosition: "62% center",
  },
  grassWork: {
    src: "/media/grass-cutting.webp",
    srcSet:
      "/media/grass-cutting-1280.webp 1280w, /media/grass-cutting.webp 1920w",
    width: 1920,
    height: 1080,
    alt: "Mitarbeiter auf einem Aufsitzmäher bei der Grünpflege",
    position: "center",
    mobilePosition: "58% center",
  },
  summerGrounds: {
    src: "/media/massstabsreise-landschaft-sommer.webp",
    srcSet:
      "/media/massstabsreise-landschaft-sommer-960.webp 960w, /media/massstabsreise-landschaft-sommer.webp 1440w",
    width: 1440,
    height: 810,
    alt: "Gepflegte Grünflächen rund um ein Objekt",
    position: "center",
    mobilePosition: "58% center",
  },
  snowWork: {
    src: "/media/snow-clearing.webp",
    srcSet:
      "/media/snow-clearing-1280.webp 1280w, /media/snow-clearing.webp 2560w",
    width: 2560,
    height: 1707,
    alt: "Räumfahrzeug mit Kehrbürste bei Schneefall",
    position: "center",
    mobilePosition: "58% center",
  },
  winterGrounds: {
    src: "/media/massstabsreise-landschaft-winter.webp",
    srcSet:
      "/media/massstabsreise-landschaft-winter-960.webp 960w, /media/massstabsreise-landschaft-winter.webp 1440w",
    width: 1440,
    height: 810,
    alt: "Verschneites Grundstück mit geräumter Zufahrt",
    position: "center",
    mobilePosition: "68% center",
  },
  workPlanning: {
    src: "/media/process-impulse-panorama.webp",
    srcSet:
      "/media/process-impulse-panorama-960.webp 960w, /media/process-impulse-panorama.webp 1672w",
    width: 1672,
    height: 941,
    alt: "Abstimmung von Pflegearbeiten an einem Grundstück",
    position: "center",
    mobilePosition: "64% center",
  },
} satisfies Record<string, ServiceImage>;

export const servicePages: Record<ServiceSlug, ServicePageData> = {
  gartenpflege: {
    slug: "gartenpflege",
    name: "Gartenpflege",
    formValue: "Gartenpflege",
    seoTitle: "Gartenpflege | Universale Dienstleistungen Büsum",
    metaDescription:
      "Universale Dienstleistungen aus Büsum übernimmt Rasen- und Grünpflege sowie Form- und Rückschnitt von Hecken und Gehölzen.",
    schemaServiceType: "Garten- und Grundstückspflege",
    stages: [
      {
        key: "garten",
        label: "Garten",
        number: "01",
        title: ["Gartenpflege.", "Passend zur Fläche."],
        text: "Wir übernehmen Rasen- und Grünpflege rund um Eigenheime, kleinere Objekte und größere Außenanlagen.",
        points: [
          "Rasen- und Grünpflege",
          "Kleine und größere Flächen",
          "Umfang vorab abgestimmt",
        ],
        image: images.gardenStory,
      },
      {
        key: "hecke",
        label: "Hecke",
        number: "02",
        title: ["Form geben.", "Gehölze schneiden."],
        text: "Hecken und Gehölze schneiden wir als Form- oder Rückschnitt – abgestimmt auf Größe und Aufgabe.",
        points: [
          "Heckenformschnitt",
          "Rückschnitt von Gehölzen",
          "Unterschiedliche Größen",
        ],
        image: images.hedgeWork,
      },
      {
        key: "kante",
        label: "Grün",
        number: "03",
        title: ["Hecken. Gehölze.", "Grünflächen."],
        text: "Rasen- und Grünpflege lässt sich mit dem Form- und Rückschnitt von Hecken und Gehölzen verbinden.",
        points: [
          "Rasen- und Grünpflege",
          "Hecken und Gehölze",
          "Form- und Rückschnitt",
        ],
        image: images.gardenEdge,
      },
      {
        key: "objekt",
        label: "Objekt",
        number: "04",
        title: ["Wendige Technik.", "Für kleinere Flächen."],
        text: "Für die Grünpflege rund um Eigenheime und kleinere Objekte kommt passende Mähtechnik zum Einsatz.",
        points: [
          "Eigenheime",
          "Kleinere Objekte",
          "Mähtechnik für kleinere Flächen",
        ],
        image: images.grassWork,
      },
      {
        key: "flaeche",
        label: "Fläche",
        number: "05",
        title: ["Größere Flächen.", "Passendes Mähwerk."],
        text: "Auch größere Grünflächen pflegen wir mit dafür ausgelegten Mähwerken.",
        points: [
          "Größere Grünflächen",
          "Gleichmäßige Pflege",
          "Dafür ausgelegte Mähwerke",
        ],
        image: images.summerGrounds,
      },
    ],
    closingTitle: ["Ihre Fläche.", "Klar besprochen."],
    closingText:
      "Nennen Sie uns Fläche, Gehölze und gewünschten Umfang. Vom Standort Büsum aus stimmen wir Aufgabe und Termin direkt mit Ihnen ab.",
    whatsappText:
      "Moin, ich interessiere mich für Gartenpflege durch Universale Dienstleistungen.",
  },
  winterdienst: {
    slug: "winterdienst",
    name: "Winterdienst",
    formValue: "Winterdienst",
    seoTitle: "Winterdienst | Universale Dienstleistungen Büsum",
    metaDescription:
      "Universale Dienstleistungen aus Büsum räumt Schnee und streut Treppen, Aufgänge, Wege, Zufahrten, Parkplätze und Höfe.",
    schemaServiceType: "Winterdienst und Schnee- und Eisbeseitigung",
    stages: [
      {
        key: "winter",
        label: "Winter",
        number: "01",
        title: ["Winterdienst.", "Für Wege und Flächen."],
        text: "Wir übernehmen Schnee- und Eisbeseitigung auf den vorab vereinbarten Bereichen.",
        points: [
          "Schnee räumen",
          "Flächen streuen",
          "Einsatzumfang vorab klären",
        ],
        image: images.winterStory,
      },
      {
        key: "raeumen",
        label: "Räumen",
        number: "02",
        title: ["Schnee räumen.", "Flächen streuen."],
        text: "Räum- und Streuarbeiten werden passend zu Fläche und Aufgabe abgestimmt.",
        points: [
          "Räumarbeiten",
          "Streuarbeiten",
          "Passende Technik",
        ],
        image: images.snowWork,
      },
      {
        key: "wege",
        label: "Wege",
        number: "03",
        title: ["Treppen.", "Aufgänge. Gehwege."],
        text: "Zum Winterdienst gehören Treppen, Aufgänge und Gehwege im vereinbarten Arbeitsbereich.",
        points: [
          "Treppen",
          "Aufgänge",
          "Gehwege",
        ],
        image: {
          ...images.winterStory,
          position: "58% center",
          mobilePosition: "60% center",
        },
      },
      {
        key: "flaechen",
        label: "Flächen",
        number: "04",
        title: ["Zufahrten.", "Parkplätze. Höfe."],
        text: "Auch Zufahrten, Parkplätze und Höfe können in den Winterdienst einbezogen werden.",
        points: [
          "Zufahrten",
          "Parkplätze",
          "Höfe",
        ],
        image: images.winterGrounds,
      },
      {
        key: "technik",
        label: "Technik",
        number: "05",
        title: ["Räumfahrzeug.", "Schneefräse. Streusystem."],
        text: "Für unterschiedliche Winterflächen stehen Räumfahrzeuge mit Streusystem und mobile Schneefräsen bereit.",
        points: [
          "Räumfahrzeuge",
          "Integrierte Streusysteme",
          "Mobile Schneefräsen",
        ],
        image: images.snowWork,
      },
    ],
    closingTitle: ["Ihre Winterflächen.", "Direkt abstimmen."],
    closingText:
      "Nennen Sie uns die zu räumenden Wege und Flächen. Vom Standort Büsum aus klären wir Umfang und Einsatz mit Ihnen.",
    whatsappText:
      "Moin, ich interessiere mich für Winterdienst durch Universale Dienstleistungen.",
  },
  hausmeisterservice: {
    slug: "hausmeisterservice",
    name: "Hausmeisterservice",
    formValue: "Hausmeisterservice",
    seoTitle: "Hausmeisterservice | Universale Dienstleistungen Büsum",
    metaDescription:
      "Universale Dienstleistungen aus Büsum kontrolliert und wartet Anlagen privater und gewerblicher Objekte und übernimmt zulässige Kleinreparaturen.",
    schemaServiceType: "Hausmeisterservice",
    stages: [
      {
        key: "hausmeister",
        label: "Service",
        number: "01",
        title: ["Hausmeisterservice.", "Das Objekt im Blick."],
        text: "Wir übernehmen Kontrolle und Wartung an Anlagen privater und gewerblicher Objekte.",
        points: [
          "Private Haushalte",
          "Gewerbliche Objekte",
          "Aufgaben klar abgestimmt",
        ],
        image: images.propertyStory,
      },
      {
        key: "kontrolle",
        label: "Kontrolle",
        number: "02",
        title: ["Anlagen.", "Regelmäßig kontrolliert."],
        text: "Welche Anlagen kontrolliert werden, legen wir gemeinsam für das jeweilige Objekt fest.",
        points: [
          "Kontrolle am Objekt",
          "Vereinbarte Anlagen",
          "Abgestimmter Umfang",
        ],
        image: images.propertyStory,
      },
      {
        key: "wartung",
        label: "Wartung",
        number: "03",
        title: ["Wartung.", "Passend zum Auftrag."],
        text: "Kontrolle und Wartung werden als klar beschriebenes Aufgabenpaket für das Objekt vereinbart.",
        points: [
          "Kontrolle",
          "Wartung",
          "Private und gewerbliche Objekte",
        ],
        image: images.workPlanning,
      },
      {
        key: "kleinreparatur",
        label: "Reparatur",
        number: "04",
        title: ["Kleinreparaturen.", "Mit klarer Grenze."],
        text: "Kleinreparaturen übernehmen wir, soweit dafür kein Fachbetrieb erforderlich ist.",
        points: [
          "Kleinreparaturen",
          "Nur im zulässigen Rahmen",
          "Facharbeiten bleiben beim Fachbetrieb",
        ],
        image: images.propertyStory,
      },
      {
        key: "objektpflege",
        label: "Objekt",
        number: "05",
        title: ["Pflege.", "Innen und außen."],
        text: "Pflege, Reinigung und Betreuung können für vereinbarte Bereiche innen wie außen zusammengeführt werden.",
        points: [
          "Pflege",
          "Reinigung",
          "Betreuung des Objekts",
        ],
        image: images.objectStory,
      },
    ],
    closingTitle: ["Ihr Objekt.", "Aufgaben klar verteilt."],
    closingText:
      "Beschreiben Sie uns Objekt, Anlagen und gewünschte Aufgaben. Vom Standort Büsum aus stimmen wir den Hausmeisterservice direkt mit Ihnen ab.",
    whatsappText:
      "Moin, ich interessiere mich für den Hausmeisterservice von Universale Dienstleistungen.",
  },
  entruempelung: {
    slug: "entruempelung",
    name: "Entrümpelung",
    formValue: "Entrümpelung",
    seoTitle: "Entrümpelung | Universale Dienstleistungen Büsum",
    metaDescription:
      "Universale Dienstleistungen aus Büsum übernimmt private Haushalts- und Wohnungsauflösungen sowie gewerbliche Entrümpelungen und Betriebsauflösungen.",
    schemaServiceType: "Entrümpelung und Haushaltsauflösung",
    stages: [
      {
        key: "entruempelung",
        label: "Räumen",
        number: "01",
        title: ["Entrümpelung.", "Privat und gewerblich."],
        text: "Wir übernehmen private und größere gewerbliche Entrümpelungen im vorab vereinbarten Umfang.",
        points: [
          "Private Haushalte",
          "Gewerbliche Objekte",
          "Umfang vorab abgestimmt",
        ],
        image: images.clearanceStory,
      },
      {
        key: "haushalt",
        label: "Haushalt",
        number: "02",
        title: ["Haushalte.", "Wohnungen."],
        text: "Private Haushalts- und Wohnungsauflösungen gehören zum angebotenen Leistungsumfang.",
        points: [
          "Haushaltsauflösungen",
          "Wohnungsauflösungen",
          "Private Aufträge",
        ],
        image: {
          ...images.clearanceStory,
          position: "70% center",
          mobilePosition: "70% center",
        },
      },
      {
        key: "betrieb",
        label: "Betrieb",
        number: "03",
        title: ["Gewerbliche Räume.", "Betriebsauflösungen."],
        text: "Auch größere gewerbliche Entrümpelungen und Betriebsauflösungen können übernommen werden.",
        points: [
          "Gewerbliche Entrümpelungen",
          "Betriebsauflösungen",
          "Größere Aufträge",
        ],
        image: {
          ...images.clearanceStory,
          position: "82% center",
          mobilePosition: "72% center",
        },
      },
      {
        key: "demontage",
        label: "Demontage",
        number: "04",
        title: ["Demontage.", "Passend zum Auftrag."],
        text: "Erforderliche Demontagearbeiten können Teil des vorab abgestimmten Auftrags sein.",
        points: [
          "Demontagearbeiten",
          "Arbeitsumfang festlegen",
          "Auftrag direkt abstimmen",
        ],
        image: {
          ...images.clearanceStory,
          position: "76% center",
          mobilePosition: "70% center",
        },
      },
      {
        key: "renovierung",
        label: "Ergänzung",
        number: "05",
        title: ["Renovierungsarbeiten.", "Nach Abstimmung."],
        text: "Renovierungsarbeiten können die Entrümpelung ergänzen, wenn sie ausdrücklich vereinbart werden.",
        points: [
          "Renovierungsarbeiten",
          "Als vereinbarte Ergänzung",
          "Demontagearbeiten nach Abstimmung",
        ],
        image: {
          ...images.clearanceStory,
          position: "64% center",
          mobilePosition: "68% center",
        },
      },
    ],
    closingTitle: ["Ihr Auftrag.", "Vorher klar besprochen."],
    closingText:
      "Nennen Sie uns Räume, Umfang und gewünschte Ergänzungen. Vom Standort Büsum aus klären wir den Auftrag direkt mit Ihnen.",
    whatsappText:
      "Moin, ich interessiere mich für eine Entrümpelung durch Universale Dienstleistungen.",
  },
  objektbetreuung: {
    slug: "objektbetreuung",
    name: "Gewerbliche Objektbetreuung",
    formValue: "Gewerbliche Objektbetreuung",
    seoTitle:
      "Gewerbliche Objektbetreuung | Universale Dienstleistungen Büsum",
    metaDescription:
      "Universale Dienstleistungen aus Büsum bündelt für gewerbliche Objekte Kontrolle, Wartung, Pflege, Reinigung, Gartenpflege und Winterdienst.",
    schemaServiceType: "Gewerbliche Objektbetreuung",
    stages: [
      {
        key: "kombination",
        label: "Kombiniert",
        number: "01",
        title: ["Ein Objekt.", "Passende Leistungen."],
        text: "Für gewerbliche Objekte bündeln wir Gartenpflege, Winterdienst und Hausmeisterservice zu einem klar abgegrenzten Auftrag.",
        points: [
          "Hausmeisterservice",
          "Außenpflege",
          "Winterdienst",
        ],
        image: images.objectStory,
      },
      {
        key: "kontrolle",
        label: "Kontrolle",
        number: "02",
        title: ["Kontrolle.", "Wartung. Kleinreparatur."],
        text: "Kontrolle und Wartung vereinbarter Anlagen sowie Kleinreparaturen können zusammengeführt werden.",
        points: [
          "Kontrolle von Anlagen",
          "Wartung",
          "Kleinreparaturen ohne Fachbetrieb",
        ],
        image: images.propertyStory,
      },
      {
        key: "pflege",
        label: "Pflege",
        number: "03",
        title: ["Pflege.", "Reinigung. Betreuung."],
        text: "Vereinbarte Bereiche des Objekts können innen wie außen gepflegt, gereinigt und betreut werden.",
        points: [
          "Pflege",
          "Reinigung",
          "Innen- und Außenbereiche",
        ],
        image: images.workPlanning,
      },
      {
        key: "aussen",
        label: "Außen",
        number: "04",
        title: ["Grünflächen.", "Wege. Zufahrten."],
        text: "Gartenpflege und Winterdienst lassen sich passend zu den Außenbereichen des Objekts kombinieren.",
        points: [
          "Rasen- und Grünpflege",
          "Hecken und Gehölze",
          "Räumen und Streuen",
        ],
        image: images.grassWork,
      },
      {
        key: "abstimmung",
        label: "Auftrag",
        number: "05",
        title: ["Ein Paket.", "Direkt abgestimmt."],
        text: "Welche vorhandenen Leistungen zusammenpassen, legen wir für das gewerbliche Objekt vorab fest.",
        points: [
          "Aufgaben auswählen",
          "Umfang vereinbaren",
          "Ein Ansprechpartner",
        ],
        image: images.summerGrounds,
      },
    ],
    closingTitle: ["Ihr Objekt.", "Leistungen passend kombiniert."],
    closingText:
      "Beschreiben Sie uns Objekt und gewünschte Aufgaben. Vom Standort Büsum aus stimmen wir die passenden Leistungsbausteine direkt mit Ihnen ab.",
    whatsappText:
      "Moin, ich interessiere mich für gewerbliche Objektbetreuung durch Universale Dienstleistungen.",
  },
};

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://lumoraofficialde.github.io/universale-dienstleistungen"
).replace(/\/+$/, "");

const previewImage = `${siteUrl}/og.jpg`;

function serviceCanonicalUrl(service: ServicePageData) {
  return `${siteUrl}/leistungen/${service.slug}/`;
}

export function buildServiceMetadata(service: ServicePageData): Metadata {
  const canonicalUrl = serviceCanonicalUrl(service);

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: service.seoTitle,
      description: service.metaDescription,
      type: "website",
      locale: "de_DE",
      url: canonicalUrl,
      images: [
        {
          url: previewImage,
          width: 1200,
          height: 630,
          alt: `${service.name} bei Universale Dienstleistungen aus Büsum`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.metaDescription,
      images: [previewImage],
    },
  };
}

export function buildServiceStructuredData(service: ServicePageData) {
  const canonicalUrl = serviceCanonicalUrl(service);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#leistung`,
    name: service.name,
    serviceType: service.schemaServiceType,
    description: service.metaDescription,
    url: canonicalUrl,
    image: `${siteUrl}${service.stages[0].image.src}`,
    provider: {
      "@id": `${siteUrl}/#unternehmen`,
    },
  };
}

export const servicePageLinks = Object.values(servicePages).map((service) => ({
  href: `/leistungen/${service.slug}/`,
  label: service.name,
  slug: service.slug,
}));

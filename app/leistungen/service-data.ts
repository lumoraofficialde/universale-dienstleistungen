import type { Metadata } from "next";

export type ServiceSlug =
  | "gartenpflege"
  | "winterdienst"
  | "hausmeisterservice"
  | "entruempelung"
  | "objektbetreuung";

type ServiceImage = {
  src: string;
  srcSet?: string;
  mobileSrc?: string;
  width: number;
  height: number;
  alt: string;
  position?: string;
};

type ServiceDetail = {
  title: string;
  text: string;
};

type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePageData = {
  slug: ServiceSlug;
  name: string;
  seoTitle: string;
  metaDescription: string;
  schemaServiceType: string;
  heroTitle: string;
  heroIntro: string;
  heroImage: ServiceImage;
  supportingImage: ServiceImage;
  supportingCaption: string;
  overview: string;
  capabilities: ServiceDetail[];
  audiences: ServiceDetail[];
  areaPrivate: string;
  areaCommercial: string;
  areaPlaces: string;
  included: string[];
  byAgreement: string[];
  boundary: string;
  process: ServiceDetail[];
  faqs: ServiceFaq[];
  whatsappText: string;
};

const commonPlaces =
  "Büsum, Büsumer Deichhausen, Westerdeichstrich, Wesselburen, Heide, Meldorf und Friedrichskoog";

export const servicePages: Record<ServiceSlug, ServicePageData> = {
  gartenpflege: {
    slug: "gartenpflege",
    name: "Gartenpflege",
    seoTitle: "Gartenpflege in Büsum & Dithmarschen | Universale",
    metaDescription:
      "Gartenpflege für private und gewerbliche Außenflächen in Büsum und Dithmarschen: Rasen, Hecken, Gehölze und laufende Grundstückspflege.",
    schemaServiceType: "Garten- und Grundstückspflege",
    heroTitle: "Gartenpflege in Büsum und Dithmarschen.",
    heroIntro:
      "Wir pflegen private und gewerbliche Außenflächen passend zu Grundstück, Saison und gewünschtem Intervall.",
    heroImage: {
      src: "/media/gardener-trimming-1920.webp",
      srcSet:
        "/media/gardener-trimming-1280.webp 1280w, /media/gardener-trimming-1920.webp 1920w, /media/gardener-trimming.webp 2560w",
      width: 1920,
      height: 1280,
      alt: "Gartenpflege beim Rückschnitt einer dichten Hecke",
      position: "center 46%",
    },
    supportingImage: {
      src: "/media/grass-cutting-1280.webp",
      width: 1280,
      height: 720,
      alt: "Pflege einer Rasenfläche mit passender Arbeitstechnik",
      position: "center",
    },
    supportingCaption: "Pflegearbeiten an Rasen, Kanten und Grünflächen.",
    overview:
      "Von der einzelnen Pflegeaktion bis zum wiederkehrenden Termin: Wir stimmen Aufgaben und Zugänglichkeit vor Beginn konkret mit Ihnen ab.",
    capabilities: [
      {
        title: "Rasen und Kanten",
        text: "Mähen sowie Nacharbeiten an gut zugänglichen Randbereichen.",
      },
      {
        title: "Hecken und Gehölze",
        text: "Form- und Rückschnitt im vereinbarten Umfang und unter Beachtung saisonaler Vorgaben.",
      },
      {
        title: "Beete und Grünflächen",
        text: "Pflege zugänglicher Flächen sowie Entfernen von Wildwuchs und Laub.",
      },
      {
        title: "Wege und Grundstück",
        text: "Pflegearbeiten an vereinbarten Außenbereichen rund um das Objekt.",
      },
      {
        title: "Einmalig oder regelmäßig",
        text: "Einzeltermine und wiederkehrende Intervalle nach Abstimmung.",
      },
    ],
    audiences: [
      {
        title: "Private Grundstücke",
        text: "Gärten und Außenflächen an Einfamilienhäusern, Zweitwohnsitzen und Ferienimmobilien.",
      },
      {
        title: "Vermietete Objekte",
        text: "Regelmäßige Pflege rund um Ferienwohnungen, Mehrfamilienhäuser und kleinere Wohnanlagen.",
      },
      {
        title: "Gewerbliche Flächen",
        text: "Außenbereiche an Betrieben, Büros, Praxen und verwalteten Immobilien.",
      },
    ],
    areaPrivate:
      "Private Pflegeaufträge übernehmen wir im Kerngebiet Büsum und im nahen Dithmarschen. Vor der Zusage prüfen wir Anfahrt, Umfang und gewünschtes Intervall.",
    areaCommercial:
      "Bei wiederkehrenden oder größeren gewerblichen Aufträgen prüfen wir auch weitere Orte in Dithmarschen und angrenzende Bereiche individuell.",
    areaPlaces: `Anfragen prüfen wir unter anderem für ${commonPlaces}.`,
    included: [
      "Die vorab benannten Flächen und Pflegearbeiten",
      "Passende Technik für den vereinbarten Arbeitsumfang",
      "Abstimmung zu Termin, Zugang und gewünschtem Ergebnis",
      "Geordnete Übergabe der bearbeiteten Bereiche",
    ],
    byAgreement: [
      "Abtransport von Schnittgut und weiteren Grünresten",
      "Wiederkehrende Pflegeintervalle über die Saison",
      "Größere Rückschnitte und zusätzliche Grundstücksbereiche",
      "Kombination mit Hausmeister- oder Objektbetreuungsaufgaben",
    ],
    boundary:
      "Arbeiten, für die besondere Zulassungen, Fachnachweise oder ein spezialisierter Betrieb erforderlich sind, nehmen wir nicht stillschweigend in den Auftrag auf.",
    process: [
      {
        title: "Flächen und Ziel klären",
        text: "Sie nennen uns Einsatzort, Flächengröße, gewünschte Arbeiten und den passenden Zeitraum.",
      },
      {
        title: "Umfang vor Ort abstimmen",
        text: "Falls Fotos nicht ausreichen, besichtigen wir die Außenflächen und legen den konkreten Umfang fest.",
      },
      {
        title: "Pflege ausführen und übergeben",
        text: "Wir bearbeiten die vereinbarten Bereiche und stimmen mögliche Zusatzarbeiten vor ihrer Ausführung ab.",
      },
    ],
    faqs: [
      {
        question: "Ist Gartenpflege auch als regelmäßiger Termin möglich?",
        answer:
          "Ja. Je nach Grundstück und Saison können wir einzelne Einsätze oder wiederkehrende Intervalle vereinbaren. Die konkrete Taktung legen wir nach Besichtigung oder anhand aussagekräftiger Fotos fest.",
      },
      {
        question: "Wird Schnittgut mitgenommen?",
        answer:
          "Der Abtransport gehört nur dann zum Auftrag, wenn er im Angebot ausdrücklich vereinbart ist. Menge, Zufahrt und Entsorgungsweg klären wir deshalb vor dem Einsatz.",
      },
      {
        question: "Übernehmen Sie auch größere Grundstücke?",
        answer:
          "Grundsätzlich prüfen wir Anfragen für kleine und größere Außenflächen. Entscheidend sind Lage, Zugänglichkeit, gewünschter Umfang und die dafür benötigte Technik.",
      },
      {
        question: "Reichen Fotos für eine erste Einschätzung?",
        answer:
          "Oft ja. Für eine belastbare Abstimmung können zusätzlich Flächenangaben und ein kurzer Vor-Ort-Termin sinnvoll sein.",
      },
    ],
    whatsappText:
      "Moin, ich interessiere mich für Gartenpflege in Büsum oder Dithmarschen.",
  },
  winterdienst: {
    slug: "winterdienst",
    name: "Winterdienst",
    seoTitle: "Winterdienst in Büsum & Dithmarschen | Universale",
    metaDescription:
      "Winterdienst in Büsum und Dithmarschen für Gehwege, Zufahrten, Parkplätze, Treppen und Höfe. Einsätze nach abgestimmtem Umfang.",
    schemaServiceType: "Schneeräumung und Streudienst",
    heroTitle: "Winterdienst in Büsum und Dithmarschen.",
    heroIntro:
      "Wir räumen und streuen vereinbarte Wege, Zufahrten und Flächen für private und gewerbliche Auftraggeber.",
    heroImage: {
      src: "/media/snow-clearing-1280.webp",
      srcSet:
        "/media/snow-clearing-1280.webp 1280w, /media/snow-clearing.webp 2560w",
      width: 1280,
      height: 854,
      alt: "Maschineller Winterdienst auf einer verschneiten Fläche",
      position: "center 48%",
    },
    supportingImage: {
      src: "/media/winter-vehicle.webp",
      width: 1080,
      height: 1080,
      alt: "Einsatzfahrzeug für abgestimmte Arbeiten im Winter",
      position: "center",
    },
    supportingCaption: "Wintereinsätze werden nach Fläche, Priorität und Zugang geplant.",
    overview:
      "Winterdienst braucht klare Flächen, Auslöser und Prioritäten. Diese Punkte halten wir vor dem ersten Einsatz gemeinsam fest.",
    capabilities: [
      {
        title: "Gehwege und Zugänge",
        text: "Räumen und Streuen der eindeutig vereinbarten Laufwege.",
      },
      {
        title: "Treppen und Eingänge",
        text: "Bearbeitung zugänglicher Stufen, Aufgänge und Eingangsbereiche.",
      },
      {
        title: "Zufahrten und Höfe",
        text: "Winterdienst auf privaten und betrieblichen Verkehrsflächen nach Flächeneignung.",
      },
      {
        title: "Parkplätze",
        text: "Räumen und Streuen definierter Stell- und Bewegungsflächen.",
      },
      {
        title: "Saisonale Vereinbarung",
        text: "Wiederkehrende Einsätze mit abgestimmten Prioritäten und Einsatzbedingungen.",
      },
    ],
    audiences: [
      {
        title: "Privathaushalte",
        text: "Vereinbarte Wege, Treppen, Auffahrten und Zugänge an privaten Objekten.",
      },
      {
        title: "Hausverwaltungen",
        text: "Definierte Außenflächen an Mehrfamilienhäusern und verwalteten Wohnobjekten.",
      },
      {
        title: "Unternehmen",
        text: "Zugänge, Höfe, Zufahrten und Parkflächen an gewerblich genutzten Standorten.",
      },
    ],
    areaPrivate:
      "Für private Winterdienste liegt unser Kerngebiet in Büsum und im nahen Dithmarschen. Kurze Wege und passende Flächengrößen sind für die Einsatzplanung entscheidend.",
    areaCommercial:
      "Größere oder wiederkehrende gewerbliche Flächen prüfen wir innerhalb Dithmarschens und, abhängig vom Umfang, auch in angrenzenden Bereichen.",
    areaPlaces: `Anfragen prüfen wir unter anderem für ${commonPlaces}.`,
    included: [
      "Die im Auftrag eindeutig bezeichneten Wege und Flächen",
      "Räumen und Streuen nach der vereinbarten Leistungsbeschreibung",
      "Abgestimmte Prioritäten für Zugänge und Bewegungsflächen",
      "Klärung von Zufahrt, Lagerflächen und Besonderheiten",
    ],
    byAgreement: [
      "Wiederkehrende Einsätze über die Wintersaison",
      "Bereitstellung und Art des vorgesehenen Streumittels",
      "Zusätzliche Flächen oder geänderte Prioritäten",
      "Kombination mit laufender Objektbetreuung",
    ],
    boundary:
      "Wir übernehmen ausschließlich die vereinbarten Flächen, Zeitfenster und Leistungen. Eigentümer und Verwaltungen klären ihre örtlichen oder vertraglichen Pflichten eigenständig.",
    process: [
      {
        title: "Flächen erfassen",
        text: "Wir klären Lage, Größe, Zugänglichkeit und die wichtigsten Wege am Objekt.",
      },
      {
        title: "Prioritäten vereinbaren",
        text: "Auslöser, gewünschte Einsatzfenster, Streumittel und besondere Bereiche werden vor Saisonbeginn abgestimmt.",
      },
      {
        title: "Einsätze koordiniert ausführen",
        text: "Wir bearbeiten die beauftragten Flächen entsprechend der getroffenen Vereinbarung und der aktuellen Einsatzlage.",
      },
    ],
    faqs: [
      {
        question: "Wann beginnt ein Winterdiensteinsatz?",
        answer:
          "Auslöser, Prioritäten und gewünschte Zeitfenster werden vorab vereinbart. Die konkrete Planung hängt von Wetterlage, Flächen und dem beauftragten Leistungsumfang ab.",
      },
      {
        question: "Ist Streumittel im Auftrag enthalten?",
        answer:
          "Das halten wir im Angebot eindeutig fest. Art, Menge, Lagerung und zulässige Verwendung können je Objekt unterschiedlich sein.",
      },
      {
        question: "Ist auch ein einzelner Wintereinsatz möglich?",
        answer:
          "Einzelanfragen prüfen wir abhängig von Wetterlage, Entfernung, Fläche und verfügbarer Kapazität. Eine Zusage erfolgt erst nach konkreter Abstimmung.",
      },
      {
        question: "Übernehmen Sie automatisch alle Räumpflichten am Objekt?",
        answer:
          "Nein. Wir bearbeiten nur die ausdrücklich vereinbarten Flächen und Leistungen. Welche Pflichten am Standort bestehen, klären Eigentümer oder Verwaltung unabhängig davon.",
      },
    ],
    whatsappText:
      "Moin, ich interessiere mich für Winterdienst in Büsum oder Dithmarschen.",
  },
  hausmeisterservice: {
    slug: "hausmeisterservice",
    name: "Hausmeisterservice",
    seoTitle: "Hausmeisterservice in Büsum & Dithmarschen | Universale",
    metaDescription:
      "Hausmeisterservice in Büsum und Dithmarschen: Objektkontrollen, Außenpflege und Kleinreparaturen, soweit kein Fachbetrieb erforderlich ist.",
    schemaServiceType: "Hausmeisterservice",
    heroTitle: "Hausmeisterservice in Büsum und Dithmarschen.",
    heroIntro:
      "Wir kontrollieren und pflegen Objekte, Außenbereiche und kleinere Einrichtungen nach einem klar abgestimmten Aufgabenplan.",
    heroImage: {
      src: "/media/chronogarten-hausmeister.webp",
      mobileSrc: "/media/chronogarten-hausmeister-mobile.webp",
      srcSet:
        "/media/chronogarten-hausmeister-960.webp 960w, /media/chronogarten-hausmeister.webp 1586w",
      width: 1586,
      height: 992,
      alt: "Gepflegtes Wohnobjekt mit kontrollierten Außenbereichen",
      position: "center",
    },
    supportingImage: {
      src: "/media/winter-team.webp",
      width: 1080,
      height: 1080,
      alt: "Abstimmung eines Arbeitseinsatzes am Fahrzeug",
      position: "center",
    },
    supportingCaption: "Aufgaben, Zugänge und Zuständigkeiten werden vorab abgestimmt.",
    overview:
      "Ein Hausmeisterservice ist dann verlässlich planbar, wenn wiederkehrende Aufgaben und klare Grenzen schriftlich festgehalten sind.",
    capabilities: [
      {
        title: "Objektkontrollen",
        text: "Sichtkontrollen vereinbarter Innen- und Außenbereiche.",
      },
      {
        title: "Außenbereiche",
        text: "Pflege und Kontrolle zugänglicher Flächen rund um das Objekt.",
      },
      {
        title: "Kleinreparaturen",
        text: "Einfache Arbeiten, sofern dafür kein Fachbetrieb erforderlich ist.",
      },
      {
        title: "Funktionsprüfungen",
        text: "Prüfung vereinbarter Einrichtungen auf erkennbare Auffälligkeiten.",
      },
      {
        title: "Abstimmung und Meldung",
        text: "Rückmeldung zu festgestellten Punkten und Klärung des nächsten Schritts.",
      },
    ],
    audiences: [
      {
        title: "Private Eigentümer",
        text: "Unterstützung bei regelmäßig anfallenden Aufgaben rund um Haus und Grundstück.",
      },
      {
        title: "Ferienobjekte",
        text: "Abgestimmte Kontrollen und Pflegeaufgaben zwischen Nutzung oder Vermietung.",
      },
      {
        title: "Verwaltete Immobilien",
        text: "Klar definierte Aufgaben für Hausverwaltungen, Wohnanlagen und Gewerbeobjekte.",
      },
    ],
    areaPrivate:
      "Private Hausmeisteraufträge übernehmen wir vor allem in Büsum und im nahen Dithmarschen. Häufigkeit und Anfahrt müssen zum vereinbarten Aufgabenpaket passen.",
    areaCommercial:
      "Für laufende Objektaufträge von Verwaltungen und Unternehmen prüfen wir ein größeres Gebiet innerhalb Dithmarschens und angrenzende Standorte nach Umfang.",
    areaPlaces: `Anfragen prüfen wir unter anderem für ${commonPlaces}.`,
    included: [
      "Aufgaben aus einem vorab abgestimmten Leistungsverzeichnis",
      "Sichtkontrollen der benannten Bereiche",
      "Einfache Pflege- und Kleinreparaturarbeiten",
      "Rückmeldung zu erkennbaren Schäden oder zusätzlichem Bedarf",
    ],
    byAgreement: [
      "Feste Kontroll- oder Pflegeintervalle",
      "Zugangslösungen und Schlüsselübergaben",
      "Kombination mit Gartenpflege oder Winterdienst",
      "Koordination eines notwendigen Fachbetriebs",
    ],
    boundary:
      "Elektro-, Sanitär-, Heizungs-, Dach- und andere zulassungspflichtige Facharbeiten führen wir nicht als Hausmeisterleistung aus.",
    process: [
      {
        title: "Aufgaben festlegen",
        text: "Wir erfassen Objekt, Bereiche, gewünschte Kontrollen und wiederkehrende Arbeiten.",
      },
      {
        title: "Zugang und Rhythmus klären",
        text: "Ansprechpartner, Schlüsselregelung, Termine und Rückmeldungsweg werden gemeinsam festgelegt.",
      },
      {
        title: "Leistungen ausführen",
        text: "Wir bearbeiten die vereinbarten Punkte und melden zusätzlichen Bedarf, bevor weitere Arbeiten entstehen.",
      },
    ],
    faqs: [
      {
        question: "Welche Kleinreparaturen übernimmt der Hausmeisterservice?",
        answer:
          "Wir übernehmen einfache Arbeiten, für die kein zugelassener Fachbetrieb erforderlich ist. Den konkreten Umfang klären wir vorab anhand der Aufgabe.",
      },
      {
        question: "Sind regelmäßige Objektkontrollen möglich?",
        answer:
          "Ja. Kontrollpunkte, Intervall, Zugang und Form der Rückmeldung werden passend zum Objekt schriftlich vereinbart.",
      },
      {
        question: "Betreuen Sie auch Ferienimmobilien?",
        answer:
          "Wir prüfen Anfragen für Ferienhäuser und Ferienwohnungen in Büsum und Dithmarschen. Entscheidend sind Aufgabenpaket, Zugang und gewünschte Häufigkeit.",
      },
      {
        question: "Beauftragen Sie notwendige Fachbetriebe selbst?",
        answer:
          "Eine Koordination kann nach Abstimmung möglich sein. Beauftragung, Kostenfreigabe und Verantwortlichkeiten werden jedoch vorab eindeutig festgelegt.",
      },
    ],
    whatsappText:
      "Moin, ich interessiere mich für Hausmeisterservice in Büsum oder Dithmarschen.",
  },
  entruempelung: {
    slug: "entruempelung",
    name: "Entrümpelung",
    seoTitle: "Entrümpelung in Büsum & Dithmarschen | Universale",
    metaDescription:
      "Entrümpelung in Büsum und Dithmarschen für Wohnungen, Häuser und Gewerbeflächen, bei Bedarf mit Demontage und geordneter Übergabe.",
    schemaServiceType: "Entrümpelung und Auflösung",
    heroTitle: "Entrümpelung in Büsum und Dithmarschen.",
    heroIntro:
      "Wir räumen Wohnungen, Häuser und Gewerbeflächen nach abgestimmtem Umfang und übergeben die Bereiche geordnet.",
    heroImage: {
      src: "/media/chronogarten-entruempelung.webp",
      mobileSrc: "/media/chronogarten-entruempelung-mobile.webp",
      srcSet:
        "/media/chronogarten-entruempelung-960.webp 960w, /media/chronogarten-entruempelung.webp 1586w",
      width: 1586,
      height: 992,
      alt: "Vorbereitete Entrümpelung mit sortierten Gegenständen in einem Raum",
      position: "center",
    },
    supportingImage: {
      src: "/media/winter-vehicle.webp",
      width: 1080,
      height: 1080,
      alt: "Transport eines Möbelstücks zu einem Einsatzfahrzeug",
      position: "center",
    },
    supportingCaption: "Zugänge, Demontage und Abtransport werden vor dem Termin geklärt.",
    overview:
      "Eine gute Räumung beginnt mit klaren Mengen, Zugängen und Übergabezielen. So bleibt nachvollziehbar, was zum Auftrag gehört.",
    capabilities: [
      {
        title: "Wohnungen und Häuser",
        text: "Räumung benannter Zimmer, Nebenräume und zugänglicher Außenbereiche.",
      },
      {
        title: "Haushaltsauflösungen",
        text: "Geplante Räumung eines vollständigen Haushalts nach Besichtigung.",
      },
      {
        title: "Gewerbeflächen",
        text: "Räumung vereinbarter Büro-, Lager- oder Betriebsbereiche.",
      },
      {
        title: "Demontagearbeiten",
        text: "Demontage geeigneter Einbauten und Möbel, wenn ausdrücklich vereinbart.",
      },
      {
        title: "Geordnete Übergabe",
        text: "Übergabe des geräumten Bereichs im zuvor festgelegten Zustand.",
      },
    ],
    audiences: [
      {
        title: "Privathaushalte",
        text: "Entrümpelungen bei Umzug, Neuordnung, Nachlass oder Haushaltsauflösung.",
      },
      {
        title: "Eigentümer und Verwaltungen",
        text: "Räumung von Wohnungen, Kellern, Dachböden und Nebenflächen vor Übergaben.",
      },
      {
        title: "Gewerbliche Auftraggeber",
        text: "Betriebsauflösungen und Räumung klar definierter Arbeits- oder Lagerflächen.",
      },
    ],
    areaPrivate:
      "Private Entrümpelungen prüfen wir in Büsum und im gesamten Dithmarscher Raum. Umfang und Transportaufwand bestimmen, welche Anfahrt sinnvoll ist.",
    areaCommercial:
      "Bei größeren gewerblichen Räumungen oder Betriebsauflösungen kann das Einsatzgebiet nach Besichtigung und Auftragsumfang erweitert werden.",
    areaPlaces: `Anfragen prüfen wir unter anderem für ${commonPlaces}.`,
    included: [
      "Räumung der im Angebot bezeichneten Räume und Gegenstände",
      "Tragewege und Abtransport im vereinbarten Umfang",
      "Vorab geklärte Demontagearbeiten",
      "Übergabe im ausdrücklich vereinbarten Zustand",
    ],
    byAgreement: [
      "Keller, Dachboden, Garage und Außenbereiche",
      "Besenreine Übergabe der geräumten Flächen",
      "Demontage geeigneter Möbel oder Einbauten",
      "Zusätzliche Mengen, die erst vor Ort sichtbar werden",
    ],
    boundary:
      "Gefahrstoffe, unbekannte Flüssigkeiten und besonders zu behandelnde Abfälle müssen vorab benannt werden. Ihre Übernahme wird separat geprüft.",
    process: [
      {
        title: "Menge und Räume erfassen",
        text: "Sie senden Fotos und Eckdaten oder vereinbaren eine Besichtigung am Einsatzort.",
      },
      {
        title: "Umfang verbindlich festlegen",
        text: "Räume, Gegenstände, Demontage, Tragewege und gewünschter Übergabezustand werden im Angebot benannt.",
      },
      {
        title: "Räumen und übergeben",
        text: "Wir bearbeiten den vereinbarten Umfang und klären unerwartete Zusatzmengen vor ihrer Mitnahme.",
      },
    ],
    faqs: [
      {
        question: "Wie wird der Preis einer Entrümpelung ermittelt?",
        answer:
          "Entscheidend sind Menge, Materialarten, Etage, Zugänglichkeit, Tragewege, Demontage und gewünschter Übergabezustand. Deshalb benötigen wir Fotos oder einen Vor-Ort-Termin.",
      },
      {
        question: "Sind Demontagearbeiten möglich?",
        answer:
          "Ja, wenn die betreffenden Möbel oder Einbauten geeignet sind und die Demontage ausdrücklich im Angebot steht. Facharbeiten bleiben ausgeschlossen.",
      },
      {
        question: "Was passiert mit nicht angekündigten Zusatzmengen?",
        answer:
          "Zusätzliche Gegenstände werden nicht automatisch Teil des Auftrags. Wir stimmen den Mehraufwand und mögliche Kosten zuerst mit Ihnen ab.",
      },
      {
        question: "Kann eine erste Einschätzung anhand von Fotos erfolgen?",
        answer:
          "Ja. Übersichts- und Detailfotos helfen bei der Vorbereitung. Bei größeren oder unübersichtlichen Räumungen ist eine Besichtigung sinnvoll.",
      },
    ],
    whatsappText:
      "Moin, ich interessiere mich für eine Entrümpelung in Büsum oder Dithmarschen.",
  },
  objektbetreuung: {
    slug: "objektbetreuung",
    name: "Objektbetreuung",
    seoTitle: "Objektbetreuung in Büsum & Dithmarschen | Universale",
    metaDescription:
      "Gewerbliche Objektbetreuung in Büsum und Dithmarschen: abgestimmte Kontrollen, Außenpflege, Winterdienst und Koordination rund ums Objekt.",
    schemaServiceType: "Gewerbliche Objektbetreuung",
    heroTitle: "Objektbetreuung in Büsum und Dithmarschen.",
    heroIntro:
      "Wir bündeln wiederkehrende Kontrollen und Pflegeaufgaben für Gewerbeobjekte, Ferienimmobilien und Wohnanlagen.",
    heroImage: {
      src: "/media/process-impulse-panorama.webp",
      srcSet:
        "/media/process-impulse-panorama-960.webp 960w, /media/process-impulse-panorama.webp 1672w",
      width: 1672,
      height: 941,
      alt: "Abgestimmte Pflegearbeiten an den Außenflächen eines Objekts",
      position: "center 48%",
    },
    supportingImage: {
      src: "/media/chronogarten-hausmeister.webp",
      mobileSrc: "/media/chronogarten-hausmeister-mobile.webp",
      width: 1586,
      height: 992,
      alt: "Wohnobjekt mit gepflegten Wegen, Grünflächen und Fassade",
      position: "center",
    },
    supportingCaption: "Wiederkehrende Aufgaben werden objektbezogen zusammengeführt.",
    overview:
      "Statt einzelner unverbundener Termine entsteht ein abgestimmtes Aufgabenpaket mit klaren Bereichen, Zuständigkeiten und Rückmeldungswegen.",
    capabilities: [
      {
        title: "Regelmäßige Kontrollen",
        text: "Sichtkontrollen vereinbarter Bereiche und Meldung erkennbarer Auffälligkeiten.",
      },
      {
        title: "Außenpflege",
        text: "Koordinierte Garten- und Grundstückspflege passend zum Objekt.",
      },
      {
        title: "Saisonale Aufgaben",
        text: "Planung wiederkehrender Arbeiten und möglicher Winterdienstleistungen.",
      },
      {
        title: "Kleine Objektarbeiten",
        text: "Einfache Aufgaben, sofern kein zugelassener Fachbetrieb erforderlich ist.",
      },
      {
        title: "Ein Ansprechpartner",
        text: "Gebündelte Abstimmung zu vereinbarten Leistungen und zusätzlichem Bedarf.",
      },
    ],
    audiences: [
      {
        title: "Unternehmen",
        text: "Laufende Pflege- und Kontrollaufgaben an betrieblich genutzten Standorten.",
      },
      {
        title: "Hausverwaltungen",
        text: "Abgestimmte Leistungspakete für Wohnanlagen und gemischt genutzte Immobilien.",
      },
      {
        title: "Ferienvermietung",
        text: "Wiederkehrende Außen- und Kontrollaufgaben an Ferienhäusern und Ferienwohnungen.",
      },
    ],
    areaPrivate:
      "Für einzelne private Aufgaben gelten Büsum und das nahe Dithmarschen als Kerngebiet. Eine Objektbetreuung ist vor allem bei wiederkehrendem Bedarf sinnvoll.",
    areaCommercial:
      "Gewerbliche und verwaltete Objekte prüfen wir in ganz Dithmarschen. Bei passenden Leistungspaketen stimmen wir auch angrenzende Standorte individuell ab.",
    areaPlaces: `Anfragen prüfen wir unter anderem für ${commonPlaces}.`,
    included: [
      "Ein objektbezogenes Verzeichnis der vereinbarten Aufgaben",
      "Festgelegte Kontroll- und Pflegebereiche",
      "Definierte Ansprechpartner und Rückmeldungswege",
      "Ausführung einfacher Arbeiten innerhalb des Leistungsumfangs",
    ],
    byAgreement: [
      "Gartenpflege und saisonale Grundstücksarbeiten",
      "Winterdienst auf konkret bezeichneten Flächen",
      "Schlüssel- und Zugangsregelungen",
      "Koordination notwendiger Fachbetriebe nach Freigabe",
    ],
    boundary:
      "Objektbetreuung ersetzt keine technische Gebäudeprüfung und keine zulassungspflichtige Fachleistung. Solche Aufgaben werden getrennt geklärt.",
    process: [
      {
        title: "Objekt und Bedarf aufnehmen",
        text: "Wir erfassen Flächen, Nutzung, wiederkehrende Aufgaben und wichtige Ansprechpartner.",
      },
      {
        title: "Leistungspaket festlegen",
        text: "Kontrollpunkte, Intervalle, Zugänge und Rückmeldungswege werden nachvollziehbar vereinbart.",
      },
      {
        title: "Betreuung laufend abstimmen",
        text: "Wir führen die beauftragten Aufgaben aus und melden zusätzlichen Bedarf vor einer Erweiterung des Umfangs.",
      },
    ],
    faqs: [
      {
        question: "Für welche Objekte eignet sich die Objektbetreuung?",
        answer:
          "Wir prüfen Anfragen für Gewerbeobjekte, Wohnanlagen, Ferienimmobilien und gemischt genutzte Standorte. Das Aufgabenpaket muss zu Lage, Nutzung und Zugänglichkeit passen.",
      },
      {
        question: "Können mehrere Dienstleistungen kombiniert werden?",
        answer:
          "Ja. Hausmeisteraufgaben, Außenpflege und Winterdienst können in einem klar abgegrenzten Leistungspaket zusammengeführt werden.",
      },
      {
        question: "Wie werden Auffälligkeiten am Objekt gemeldet?",
        answer:
          "Ansprechpartner, Meldeweg und gewünschte Informationen legen wir zu Beginn fest. Zusätzliche Arbeiten erfolgen erst nach Abstimmung.",
      },
      {
        question: "Ist Objektbetreuung auch außerhalb von Büsum möglich?",
        answer:
          "Ja, abhängig von Standort, Aufgabenpaket und Intervall. Gewerbliche Anfragen prüfen wir im gesamten Dithmarscher Raum und bei passendem Umfang auch darüber hinaus.",
      },
    ],
    whatsappText:
      "Moin, ich interessiere mich für Objektbetreuung in Büsum oder Dithmarschen.",
  },
};

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://lumoraofficialde.github.io/universale-dienstleistungen"
).replace(/\/+$/, "");

const previewImage = `${siteUrl}/og.jpg`;

export function serviceCanonicalUrl(service: ServicePageData) {
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
          alt: `${service.name} bei Universale Dienstleistungen in Büsum`,
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
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#leistung`,
        name: service.name,
        serviceType: service.schemaServiceType,
        description: service.metaDescription,
        url: canonicalUrl,
        provider: {
          "@id": `${siteUrl}/#unternehmen`,
        },
        areaServed: [
          {
            "@type": "City",
            name: "Büsum",
          },
          {
            "@type": "AdministrativeArea",
            name: "Dithmarschen",
          },
        ],
        audience: service.audiences.map((audience) => ({
          "@type": "Audience",
          audienceType: audience.title,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export const servicePageLinks = Object.values(servicePages).map((service) => ({
  href: `/leistungen/${service.slug}/`,
  label: service.name,
  slug: service.slug,
}));

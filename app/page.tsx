"use client";

import {
  FormEvent,
  PointerEvent,
  useState,
} from "react";
import {
  assetPath,
  basePath,
  MobileCall,
  SiteFooter,
  SiteHeader,
  SiteMotion,
} from "./site-shell";
import { ActiveIntroConcept } from "./concepts/active-intro";
import { FleetScaleJourney } from "./concepts/fleet-scale-journey";
import { ProcessImpulseJourney } from "./concepts/process-impulse-journey";
import { serviceCatalog } from "./service-catalog";

const situations = [
  {
    number: "01",
    title: "Regelmäßig gepflegt.",
    text: "Wiederkehrende Garten- und Grundstückspflege für private und gewerbliche Außenflächen. Rhythmus und Umfang stimmen wir auf Objekt und Saison ab.",
    formValue: serviceCatalog[0].formValue,
    image: assetPath("/media/gardener-trimming.webp"),
    srcSet: `${assetPath("/media/gardener-trimming-1280.webp")} 1280w, ${assetPath("/media/gardener-trimming.webp")} 2560w`,
    width: 2560,
    height: 1707,
    alt: "Regelmäßige Pflege einer Gartenanlage",
    className: "service-card--garden",
    mediaNote: undefined,
  },
  {
    number: "02",
    title: "Saisonal geräumt.",
    text: "Winterdienst für vereinbarte Wege, Zufahrten und Höfe — planbar für die Saison und telefonisch abstimmbar, wenn das Wetter umschlägt.",
    formValue: serviceCatalog[1].formValue,
    image: assetPath("/media/snow-clearing.webp"),
    srcSet: `${assetPath("/media/snow-clearing-1280.webp")} 1280w, ${assetPath("/media/snow-clearing.webp")} 2560w`,
    width: 2560,
    height: 1707,
    alt: "Vorbereiteter Einsatz auf einer verschneiten Fläche",
    className: "service-card--winter",
    mediaNote: undefined,
  },
  {
    number: "03",
    title: "Gebündelt erledigt.",
    text: "Kontrollen, Pflege und kleinere Arbeiten an einem Objekt werden in einem abgestimmten Einsatz zusammengefasst.",
    formValue: serviceCatalog[2].formValue,
    image: assetPath("/media/grass-cutting.webp"),
    srcSet: `${assetPath("/media/grass-cutting-1280.webp")} 1280w, ${assetPath("/media/grass-cutting.webp")} 1920w`,
    width: 1920,
    height: 1080,
    alt: "Laufende Betreuung einer weitläufigen Außenfläche",
    className: "service-card--house",
    mediaNote: undefined,
  },
  {
    number: "04",
    title: "Einmalig organisiert.",
    text: "Für Entrümpelungen und klar definierte Einzelaufträge vereinbaren wir Umfang, Termin und Abschluss vorab.",
    formValue: serviceCatalog[3].formValue,
    image: assetPath("/media/winter-vehicle.webp"),
    srcSet: undefined,
    width: 1080,
    height: 1080,
    alt: "Zwei Helfer tragen ein Möbelstück aus einem Transportfahrzeug",
    className: "service-card--clear",
    mediaNote: "Symbolbild",
  },
];

const serviceChoices = [
  {
    value: serviceCatalog[0].formValue,
    label: serviceCatalog[0].title,
    note: "Grünpflege · Gebäude · Fenster",
    icon: "garden",
  },
  {
    value: serviceCatalog[1].formValue,
    label: serviceCatalog[1].title,
    note: "Wege, Zufahrten, Höfe",
    icon: "winter",
  },
  {
    value: serviceCatalog[2].formValue,
    label: serviceCatalog[2].title,
    note: "Kontrolle & Kleinreparaturen",
    icon: "property",
  },
  {
    value: serviceCatalog[3].formValue,
    label: serviceCatalog[3].title,
    note: "Haushalt & Betrieb",
    icon: "clear",
  },
  {
    value: "Mehrere Leistungen / noch unsicher",
    label: "Mehrere / unsicher",
    note: "Bedarf gemeinsam klären",
    icon: "property",
  },
] as const;

const trustSignals = [
  {
    label: "Standort",
    value: "GmbH aus Büsum",
  },
  {
    label: "Erreichbarkeit",
    value: "24/7 telefonisch",
  },
  {
    label: "Einsatzgebiet",
    value: "Norddeutschland · weitere Orte nach Prüfung",
  },
  {
    label: "Abstimmung",
    value: "Persönlich · bei Bedarf vor Ort",
  },
] as const;

const equipmentFacts = [
  "Räumfahrzeuge mit integriertem Streusystem",
  "Mobile Schneefräsen",
  "Mähwerke für größere Grünflächen",
  "Wendige Mähtechnik für Eigenheime",
  "Technik für Heckenform und Rückschnitt",
  "3,5-t-Einsatzfahrzeug",
] as const;

const faqItems = [
  {
    question: "In welchem Gebiet ist Universale Dienstleistungen im Einsatz?",
    answer:
      "Unser Standort ist Büsum und unser Schwerpunkt liegt in Norddeutschland. Je nach Aufgabe, Umfang und Termin kommen auch weitere Orte infrage. Ob Ihr Ort und Zeitraum abgedeckt werden können, klären wir direkt in der Anfrage.",
  },
  {
    question: "Arbeiten Sie für private und gewerbliche Auftraggeber?",
    answer:
      "Ja. Wir betreuen private Haushalte und Wohnobjekte ebenso wie gewerbliche Objekte und Flächen. Umfang, Rhythmus und Zuständigkeiten werden passend zum jeweiligen Auftrag vereinbart.",
  },
  {
    question: "Sind kurzfristige oder dringende Einsätze möglich?",
    answer:
      "Wir sind rund um die Uhr telefonisch erreichbar. Ein konkretes Einsatzfenster bestätigen wir, nachdem wir Aufgabe, Einsatzort, Zugänglichkeit und verfügbare Kapazitäten geprüft haben.",
  },
  {
    question: "Kann ich mehrere Leistungen kombinieren?",
    answer:
      "Ja. Pflege, Objektkontrolle, Winterdienst oder einmalige Arbeiten lassen sich nach Bedarf gemeinsam planen. Wählen Sie in der Anfrage „Mehrere / unsicher“, wenn der genaue Zuschnitt noch offen ist.",
  },
  {
    question: "Wie entsteht ein Angebot?",
    answer:
      "Sie nennen uns Ort, Aufgabe, Umfang und gewünschten Zeitraum. Falls nötig, folgt eine persönliche Beratung oder ein Termin vor Ort. Leistungsumfang, Preisgrundlage und Ausführungstermin werden vor Beginn abgestimmt.",
  },
  {
    question: "Wie wird der Preis bestimmt?",
    answer:
      "Fläche oder Umfang, Zugänglichkeit, Termin, notwendige Technik sowie möglicher Material- oder Entsorgungsaufwand unterscheiden sich je Auftrag. Deshalb kalkulieren wir individuell, statt einen unpassenden Pauschalpreis zu versprechen.",
  },
  {
    question: "Welche Angaben brauchen Sie für eine erste Einschätzung?",
    answer:
      "Leistung, Einsatzort, ungefährer Umfang und gewünschter Zeitraum reichen für den Start. Bei dringenden Fällen helfen zusätzlich Angaben zur betroffenen Fläche und zur Zugänglichkeit.",
  },
  {
    question: "Welche Flächen deckt der Winterdienst ab?",
    answer:
      "Nach Vereinbarung räumen und streuen wir Treppen, Aufgänge, Gehwege, Zufahrten, Parkplätze und Höfe. Welche Flächen konkret dazugehören, wird vor dem Einsatz festgelegt.",
  },
  {
    question: "Was umfasst der Hausmeisterservice?",
    answer:
      "Wir übernehmen vereinbarte Kontrollen und Wartungsaufgaben an privaten und gewerblichen Objekten. Kleinreparaturen führen wir aus, wenn dafür kein spezialisierter Fachbetrieb erforderlich ist.",
  },
  {
    question:
      "Worin unterscheiden sich Garten- und Hauspflege und Hausmeisterservice?",
    answer:
      "Garten- und Hauspflege umfasst vereinbarte Grünpflege sowie Gebäude- und Fensterreinigung. Der Hausmeisterservice betrifft vereinbarte Objektkontrollen, Wartungsaufgaben und geeignete Kleinreparaturen. Den genauen Umfang halten wir vor Beginn fest.",
  },
  {
    question: "Welche Entrümpelungen übernehmen Sie?",
    answer:
      "Zum Angebot gehören private Haushalts- und Wohnungsauflösungen sowie gewerbliche Entrümpelungen und Betriebsauflösungen. Entsorgung sowie mögliche Demontage- und Renovierungsarbeiten stimmen wir vorab nach Umfang und Zuständigkeit ab.",
  },
] as const;

const serviceFormHints: Record<string, string> = {
  [serviceCatalog[0].formValue]:
    "Hilfreich sind Fläche, gewünschte Arbeiten und ein möglicher Pflegerhythmus.",
  [serviceCatalog[1].formValue]:
    "Hilfreich sind zu räumende Flächen, Dringlichkeit und Zugänglichkeit.",
  [serviceCatalog[2].formValue]:
    "Hilfreich sind Objektart, gewünschte Kontrollen und konkrete Aufgaben.",
  [serviceCatalog[3].formValue]:
    "Hilfreich sind Räume oder Fläche, Etage, Zugang und gewünschter Termin.",
  "Mehrere Leistungen / noch unsicher":
    "Beschreiben Sie kurz das Objekt und alle Aufgaben, die zusammen anstehen.",
};

type ServiceChoiceIcon = (typeof serviceChoices)[number]["icon"];

function ServiceIllustration({ type }: { type: ServiceChoiceIcon }) {
  const common = {
    className: "service-choice__icon",
    viewBox: "0 0 72 72",
    "aria-hidden": true,
  } as const;

  if (type === "garden") {
    return (
      <svg {...common}>
        <path d="M14 54c14-3 25-13 31-29M27 43c-8 0-13-5-14-13 9-1 15 3 17 10M38 33c1-10 7-16 17-17 0 10-5 17-15 20M18 56h39" />
      </svg>
    );
  }
  if (type === "winter") {
    return (
      <svg {...common}>
        <path d="M36 13v46M16 25l40 22M56 25 16 47M36 13l-6 7m6-7 6 7M16 25l9 2m-9-2 3 9M56 25l-9 2m9-2-3 9M16 47l9-2m-9 2 3-9M56 47l-9-2m9 2-3-9M36 59l-6-7m6 7 6-7" />
      </svg>
    );
  }
  if (type === "property") {
    return (
      <svg {...common}>
        <path d="m13 34 23-19 23 19M19 30v28h34V30M29 58V42h14v16M15 58h42" />
        <path d="M48 20v-6h7v12" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M22 19h28l-3 40H25l-3-40ZM18 19h36M29 19v-6h14v6M31 29v20M41 29v20" />
      <path d="m12 54 7-7m-1 11-6-4" />
    </svg>
  );
}

export default function Home() {
  const [formStatus, setFormStatus] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [preparedRequest, setPreparedRequest] = useState("");
  const [preparedMailto, setPreparedMailto] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const handleSpotlight = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--spot-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--spot-y",
      `${event.clientY - rect.top}px`,
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedService) {
      setFormStatus("Bitte wählen Sie zuerst einen Leistungsbereich aus.");
      return;
    }
    const form = event.currentTarget;
    const phone = form.elements.namedItem("phone") as HTMLInputElement | null;
    const email = form.elements.namedItem("email") as HTMLInputElement | null;
    phone?.setCustomValidity("");
    email?.setCustomValidity("");
    if (!phone?.value.trim() && !email?.value.trim()) {
      phone?.setCustomValidity(
        "Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an.",
      );
    }
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const subject = `Anfrage: ${data.get("service")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Telefon: ${data.get("phone") || "nicht angegeben"}`,
      `E-Mail: ${data.get("email") || "nicht angegeben"}`,
      `Leistung: ${data.get("service")}`,
      `Objektart: ${data.get("objectType")}`,
      `Wunschtermin: ${data.get("date") || "offen"}`,
      `Bevorzugte Rückrufzeit: ${data.get("callbackTime") || "offen"}`,
      `PLZ / Ort: ${data.get("location")}`,
      "",
      String(data.get("message")),
    ].join("\n");

    const mailto = `mailto:info@universale-dienstleistungen.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPreparedRequest(`Betreff: ${subject}\n\n${body}`);
    setPreparedMailto(mailto);
    setCopyStatus("");
    setFormStatus(
      "Die Anfrage ist vorbereitet. Ihr E-Mail-Programm wird jetzt geöffnet.",
    );
    window.location.href = mailto;
  };

  const copyPreparedRequest = async () => {
    try {
      await navigator.clipboard.writeText(preparedRequest);
      setCopyStatus("Anfragetext kopiert.");
    } catch {
      setCopyStatus(
        "Kopieren war nicht möglich. Bitte markieren Sie den Text manuell.",
      );
    }
  };

  const clearContactMethodValidity = (event: FormEvent<HTMLInputElement>) => {
    const form = event.currentTarget.form;
    if (!form) return;
    form
      .querySelectorAll<HTMLInputElement>(
        'input[name="phone"], input[name="email"]',
      )
      .forEach((input) => input.setCustomValidity(""));
  };

  const clearPreparedRequest = () => {
    if (!preparedRequest && !preparedMailto && !copyStatus) return;
    setPreparedRequest("");
    setPreparedMailto("");
    setCopyStatus("");
    setFormStatus("");
  };

  const chooseService = (service: string) => {
    setSelectedService(service);
    setFormStatus("");
    setPreparedRequest("");
    setPreparedMailto("");
    setCopyStatus("");
  };

  const showSituation = (index: number) => {
    const target = document.querySelectorAll<HTMLElement>("[data-stack-card]")[index];
    if (!target) return;
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  const selectedServiceHint =
    serviceFormHints[selectedService] ??
    "Beschreiben Sie kurz Objekt, Aufgabe und gewünschten Zeitraum.";

  return (
    <>
      <SiteMotion />
      <SiteHeader />

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <img
              src={assetPath("/media/gardener-trimming.webp")}
              srcSet={`${assetPath("/media/gardener-trimming-1280.webp")} 1280w, ${assetPath("/media/gardener-trimming.webp")} 2560w`}
              sizes="100vw"
              width={2560}
              height={1707}
              alt=""
              fetchPriority="high"
            />
          </div>
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-inner">
            <div className="hero-kicker">
              <span className="status-dot" />
              Gartenpflege · Winterdienst · Büsum
            </div>

            <div className="hero-layout">
              <div className="hero-copy">
                <h1 id="hero-title">
                  Vier Leistungen.
                  <span>Ein Ansprechpartner.</span>
                </h1>
              </div>

              <div
                className="hero-panel"
                role="group"
                aria-label="Direktanfrage"
              >
                <p>
                  Garten- und Hauspflege, Winterdienst, Hausmeisterservice und
                  Entrümpelung für private und gewerbliche Objekte in
                  Norddeutschland — je nach Auftrag darüber hinaus.
                </p>
                <div className="hero-actions">
                  <a className="button button--accent" href="#kontakt">
                    Unverbindlich anfragen <span aria-hidden="true">↗</span>
                  </a>
                  <a className="text-link text-link--light" href="tel:+491738948124">
                    Jetzt anrufen <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-scroll">
              <a className="scroll-cue" href="#leistungen">
                <span>Leistungen ansehen</span>
                <i aria-hidden="true">↓</i>
              </a>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Unternehmensfakten">
          <div className="container trust-strip__grid">
            {trustSignals.map((signal, index) => (
              <div className="trust-strip__item" key={signal.label}>
                <span>
                  {String(index + 1).padStart(2, "0")} · {signal.label}
                </span>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section
          className="service-ledger section"
          id="leistungen"
          aria-labelledby="service-ledger-title"
          data-nav-section="leistungen"
        >
          <div className="container">
            <div className="service-ledger__head" data-reveal>
              <div>
                <p className="eyebrow eyebrow--dark">Leistungsübersicht</p>
                <h2 id="service-ledger-title">
                  Was wir konkret
                  <span>für Sie übernehmen.</span>
                </h2>
              </div>
              <p>
                Vier Leistungsbereiche für private und gewerbliche Objekte.
                Welche Aufgaben, Flächen und Intervalle dazugehören, legen wir
                vor Beginn gemeinsam fest.
              </p>
            </div>

            <div className="service-ledger__list">
              {serviceCatalog.map((service, index) => (
                <article
                  className="service-ledger__row"
                  data-reveal={index % 2 ? "right" : "left"}
                  key={service.id}
                >
                  <span className="service-ledger__number">{service.number}</span>
                  <div className="service-ledger__summary">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                  <ul>
                    {service.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <a
                    href="#kontakt"
                    aria-label={`${service.title} unverbindlich anfragen`}
                    onClick={() => chooseService(service.formValue)}
                  >
                    Anfragen <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>

            <div className="service-ledger__foot" data-reveal>
              <p>
                Sie brauchen mehrere Leistungen oder kennen den genauen Umfang
                noch nicht?
              </p>
              <a
                className="button button--dark"
                href="#kontakt"
                onClick={() =>
                  chooseService("Mehrere Leistungen / noch unsicher")
                }
              >
                Bedarf gemeinsam klären <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <ActiveIntroConcept onChooseService={chooseService} />

        <section
          className="services section"
          id="einsatzmodelle"
          aria-labelledby="service-models-title"
          data-nav-section="einsatzarten"
        >
          <div className="container">
            <div className="services-intro" data-reveal>
              <p className="eyebrow eyebrow--dark">So können Sie uns beauftragen</p>
              <h2 id="service-models-title">Regelmäßig, saisonal oder einmalig.</h2>
              <p>
                Sie stimmen Pflege, Winterdienst, Kontrollen und Räumung nicht
                mit mehreren Anbietern ab. Wir bündeln die vereinbarten
                Aufgaben in einem klaren Leistungsumfang.
              </p>
            </div>

            <nav className="services-stack-nav" aria-label="Einsatzmodelle">
              <div className="services-stack-nav__segments">
                {situations.map((situation, index) => (
                  <button
                    type="button"
                    data-stack-segment
                    aria-current={index === 0 ? "step" : undefined}
                    aria-label={`${situation.title} anzeigen`}
                    onClick={() => showSituation(index)}
                    key={situation.title}
                  />
                ))}
              </div>
              <p data-stack-current>{situations[0].title}</p>
            </nav>

            <div className="services-grid">
              {situations.map((situation, index) => (
                <article
                  className={`service-card ${situation.className}`}
                  data-reveal={index % 2 === 0 ? "left" : "right"}
                  data-stack-card
                  data-stack-title={situation.title}
                  style={{
                    "--delay": `${index * 70}ms`,
                    "--stack-top": `${132 + index * 8}px`,
                    "--stack-z": index + 10,
                  } as React.CSSProperties}
                  onPointerMove={handleSpotlight}
                  key={situation.title}
                >
                  <img
                    src={situation.image}
                    srcSet={situation.srcSet}
                    sizes={
                      situation.srcSet
                        ? "(max-width: 780px) calc(100vw - 36px), (max-width: 1100px) 55vw, 50vw"
                        : undefined
                    }
                    width={situation.width}
                    height={situation.height}
                    alt={situation.alt}
                    loading="lazy"
                  />
                  <div className="service-card__shade" aria-hidden="true" />
                  <div className="service-card__top">
                    <span>{situation.number}</span>
                    <span>
                      {situation.mediaNote
                        ? `${situation.mediaNote} · Einsatzmodell`
                        : "Einsatzmodell"}
                    </span>
                  </div>
                  <div className="service-card__body">
                    <h3>{situation.title}</h3>
                    <p>{situation.text}</p>
                    <a
                      href="#kontakt"
                      aria-label={`${situation.title} Situation besprechen`}
                      onClick={() => chooseService(situation.formValue)}
                    >
                      Situation besprechen <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="readiness" aria-labelledby="readiness-title">
          <div className="readiness-noise" aria-hidden="true" />
          <div className="container readiness-grid">
            <div
              className="readiness-display"
              role="img"
              aria-label="24 Stunden am Tag, 7 Tage die Woche erreichbar"
            >
              <div className="readiness-hours" data-reveal="left" aria-hidden="true">
                <strong>24</strong>
                <span>Stunden</span>
              </div>
              <div className="readiness-divider" data-reveal="scale" aria-hidden="true">
                <span />
                <p><i /> durchgehend erreichbar</p>
              </div>
              <div className="readiness-days" data-reveal="right" aria-hidden="true">
                <strong>7</strong>
                <span>Tage</span>
              </div>
            </div>
            <div className="readiness-copy" data-reveal="right">
              <p className="eyebrow">Wenn der Einsatz nicht warten kann</p>
              <h2 id="readiness-title">Erreichbar, wenn es darauf ankommt.</h2>
              <p>
                Bei plötzlichem Wintereinbruch oder einem dringenden Fall
                sind wir rund um die Uhr telefonisch erreichbar. Nennen Sie
                Einsatzort, betroffene Fläche und Zugänglichkeit — wir prüfen
                verfügbare Kapazitäten und bestätigen anschließend ein
                mögliches Einsatzfenster.
              </p>
              <a className="button button--outline" href="tel:+491738948124">
                Verfügbarkeit telefonisch prüfen <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="readiness-rail" aria-hidden="true">
            <div className="readiness-rail__track">
              {[0, 1].map((copy) => (
                <div className="readiness-rail__set" key={copy}>
                  <span>Treppen</span><i>-</i>
                  <span>Wege</span><i>-</i>
                  <span>Zufahrten</span><i>-</i>
                  <span>Parkplätze</span><i>-</i>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FleetScaleJourney />

        <section
          className="company-proof section"
          id="unternehmen"
          aria-labelledby="company-proof-title"
        >
          <div className="container">
            <div className="company-proof__head" data-reveal>
              <div>
                <p className="eyebrow eyebrow--dark">Unternehmen & Ausstattung</p>
                <h2 id="company-proof-title">
                  Klare Angaben.
                  <span>Konkrete Ausstattung.</span>
                </h2>
              </div>
              <p>
                Universale Dienstleistungen ist eine GmbH mit Sitz in Büsum.
                Wir beraten persönlich, besprechen den tatsächlichen Bedarf und
                stellen den Einsatz passend zu Aufgabe, Fläche und Termin
                zusammen.
              </p>
            </div>

            <div className="company-proof__facts">
              <article data-reveal="left">
                <span>01 · Unternehmen</span>
                <h3>Registrierte GmbH</h3>
                <p>
                  Universale Dienstleistungen GmbH · Amtsgericht Pinneberg ·
                  HRB 18480 PI.
                </p>
              </article>
              <article data-reveal>
                <span>02 · Erreichbarkeit</span>
                <h3>24/7 telefonisch</h3>
                <p>
                  Auch bei dringenden Fällen erreichbar. Einen Einsatz
                  bestätigen wir nach Prüfung von Ort, Aufgabe und Kapazität.
                </p>
              </article>
              <article data-reveal="right">
                <span>03 · Abstimmung</span>
                <h3>Persönlich und vor Ort</h3>
                <p>
                  Die Erstberatung ist unverbindlich. Eine Besichtigung
                  vereinbaren wir, wenn die Aufgabe vor Ort geklärt werden muss.
                </p>
              </article>
            </div>

            <div className="company-proof__equipment">
              <div data-reveal="left">
                <p className="eyebrow eyebrow--dark">
                  Einsatztechnik nach Aufgabe und Fläche
                </p>
                <h3>Vom schmalen Zugang bis zur größeren Fläche.</h3>
                <p>
                  Welche Maschine tatsächlich eingesetzt wird, richtet sich
                  nach Zugänglichkeit, Fläche und vereinbartem Leistungsumfang.
                </p>
                <a className="text-link" href={`${basePath}/team/`}>
                  Unternehmen kennenlernen <span aria-hidden="true">→</span>
                </a>
              </div>
              <ul data-reveal="right">
                {equipmentFacts.map((fact, index) => (
                  <li key={fact}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ProcessImpulseJourney />

        <section className="faq section" id="faq" aria-labelledby="faq-title">
          <div className="container">
            <div className="faq__head" data-reveal>
              <div>
                <p className="eyebrow eyebrow--dark">Häufige Fragen</p>
                <h2 id="faq-title">
                  Was vor einer Anfrage
                  <span>wichtig ist.</span>
                </h2>
              </div>
              <p>
                Die wichtigsten Rahmenbedingungen vorab — damit Sie wissen,
                wofür Sie anfragen und wie es danach weitergeht.
              </p>
            </div>

            <div className="faq__grid">
              {faqItems.map((item, index) => (
                <article
                  data-reveal={index % 2 ? "right" : "left"}
                  key={item.question}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>

            <div className="faq__cta" data-reveal>
              <p>Ihre Situation ist nicht dabei?</p>
              <a className="button button--dark" href="#kontakt">
                Aufgabe unverbindlich schildern <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section
          className="contact"
          id="kontakt"
          data-nav-section="kontakt"
        >
          <div className="container contact-grid">
            <div className="contact-intro" data-reveal="left">
              <p className="eyebrow">Ihre Anfrage</p>
              <h2>Beschreiben Sie<br />kurz, was ansteht.</h2>
              <p>
                Einsatzort, Aufgabe und gewünschter Zeitraum reichen für den
                Start. Die Beratung ist unverbindlich; Leistungsumfang,
                Preisgrundlage und Termin klären wir vor Beginn persönlich.
              </p>

              <ul className="contact-assurances" aria-label="So geht es weiter">
                <li>Persönliche Abstimmung per Telefon oder E-Mail</li>
                <li>Vor-Ort-Termin nach Bedarf und Vereinbarung</li>
                <li>Einzelne oder kombinierte Leistungen möglich</li>
              </ul>

              <div className="contact-direct">
                <a href="tel:+491738948124">
                  <span>Telefon · 24/7 erreichbar</span>
                  <strong>+49 173 8948124</strong>
                </a>
                <a href="mailto:info@universale-dienstleistungen.de">
                  <span>E-Mail</span>
                  <strong>info@universale-dienstleistungen.de</strong>
                </a>
                <div>
                  <span>Standort</span>
                  <strong>Westerstraße 3 · 25761 Büsum</strong>
                </div>
              </div>
            </div>

            <form
              className="contact-form"
              onInput={clearPreparedRequest}
              onSubmit={handleSubmit}
              data-reveal="right"
            >
              <fieldset className="service-picker">
                <legend>Welche Leistung brauchen Sie?</legend>
                <div className="service-picker__meta">
                  <span>01 / Leistung wählen</span>
                  <p>Ein Bereich genügt für den Start.</p>
                </div>
                <div className="service-picker__grid">
                  {serviceChoices.map((choice) => (
                    <button
                      className={`service-choice${selectedService === choice.value ? " is-selected" : ""}`}
                      type="button"
                      aria-pressed={selectedService === choice.value}
                      onClick={() => chooseService(choice.value)}
                      key={choice.value}
                    >
                      <ServiceIllustration type={choice.icon} />
                      <span><strong>{choice.label}</strong><small>{choice.note}</small></span>
                      <i aria-hidden="true">↗</i>
                    </button>
                  ))}
                </div>
              </fieldset>

              <input type="hidden" name="service" value={selectedService} />

              {selectedService ? (
                <div className="form-details">
                  <div className="form-details__heading">
                    <span>02 / Ihre Anfrage</span>
                    <p><strong>{selectedService}</strong> ist ausgewählt.</p>
                  </div>

                  <div className="form-row form-row--two">
                    <label>
                      <span>Name *</span>
                      <input
                        name="name"
                        type="text"
                        autoComplete="name"
                        maxLength={120}
                        required
                      />
                    </label>
                    <label>
                      <span>Telefon</span>
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        maxLength={40}
                        aria-describedby="contact-method-hint"
                        onInput={clearContactMethodValidity}
                      />
                    </label>
                  </div>

                  <div className="form-row form-row--two">
                    <label>
                      <span>E-Mail</span>
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        maxLength={160}
                        aria-describedby="contact-method-hint"
                        onInput={clearContactMethodValidity}
                      />
                    </label>
                    <label>
                      <span>PLZ / Ort *</span>
                      <input
                        name="location"
                        type="text"
                        autoComplete="address-level2"
                        placeholder="z. B. 25761 Büsum"
                        maxLength={120}
                        required
                      />
                    </label>
                  </div>

                  <p className="contact-method-hint" id="contact-method-hint">
                    Bitte geben Sie mindestens Telefon oder E-Mail an.
                  </p>

                  <div className="form-row form-row--two">
                    <label>
                      <span>Objektart *</span>
                      <select name="objectType" defaultValue="" required>
                        <option value="" disabled>Bitte wählen</option>
                        <option value="Privathaushalt / Wohnobjekt">
                          Privathaushalt / Wohnobjekt
                        </option>
                        <option value="Gewerbeobjekt / Unternehmen">
                          Gewerbeobjekt / Unternehmen
                        </option>
                        <option value="Andere / noch offen">
                          Andere / noch offen
                        </option>
                      </select>
                    </label>
                    <label>
                      <span>Bevorzugte Rückrufzeit</span>
                      <input
                        name="callbackTime"
                        type="text"
                        placeholder="z. B. werktags ab 16 Uhr"
                        maxLength={120}
                      />
                    </label>
                  </div>

                  <label className="date-label">
                    <span>Gewünschter Zeitraum</span>
                    <input
                      name="date"
                      type="text"
                      placeholder="z. B. Kalenderwoche 35 oder flexibel"
                      maxLength={120}
                    />
                  </label>

                  <label className="message-label">
                    <span>Worum geht es? * · max. 1.000 Zeichen</span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder={selectedServiceHint}
                      maxLength={1000}
                      required
                    />
                  </label>

                  <p className="privacy-note">
                    Hinweise zur Verarbeitung Ihrer Angaben finden Sie in der{" "}
                    <a href={`${basePath}/datenschutz/`} target="_blank" rel="noreferrer">
                      Datenschutzerklärung
                    </a>
                    . Beim Klick öffnet sich eine vorbereitete Nachricht in Ihrem
                    E-Mail-Programm; versendet wird sie erst dort.
                  </p>

                  <div className="form-submit">
                    <button className="button button--accent" type="submit">
                      Anfrage als E-Mail öffnen <span aria-hidden="true">↗</span>
                    </button>
                    <p aria-live="polite">{formStatus}</p>
                  </div>

                  {preparedRequest ? (
                    <div className="request-fallback" aria-labelledby="request-fallback-title">
                      <div>
                        <span>Alternative ohne geöffnetes E-Mail-Programm</span>
                        <h3 id="request-fallback-title">
                          Ihre Anfrage ist weiterhin verfügbar.
                        </h3>
                        <p>
                          Kopieren Sie den Text und senden Sie ihn an
                          info@universale-dienstleistungen.de oder öffnen Sie
                          die vorbereitete E-Mail erneut.
                        </p>
                      </div>
                      <label>
                        <span>Vorbereiteter Anfragetext</span>
                        <textarea
                          value={preparedRequest}
                          rows={10}
                          readOnly
                          onFocus={(event) => event.currentTarget.select()}
                        />
                      </label>
                      <div className="request-fallback__actions">
                        <button
                          className="button button--dark"
                          type="button"
                          onClick={copyPreparedRequest}
                        >
                          Anfragetext kopieren
                        </button>
                        <a className="button button--outline-dark" href={preparedMailto}>
                          E-Mail erneut öffnen
                        </a>
                        <a className="text-link" href="tel:+491738948124">
                          Stattdessen anrufen <span aria-hidden="true">→</span>
                        </a>
                      </div>
                      <p className="request-fallback__status" aria-live="polite">
                        {copyStatus}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="form-awaiting" aria-live="polite">
                  Wählen Sie oben einen Bereich aus. Danach fragen wir nach
                  Kontaktdaten, PLZ beziehungsweise Ort und den wichtigsten
                  Eckdaten.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
      <MobileCall />
    </>
  );
}

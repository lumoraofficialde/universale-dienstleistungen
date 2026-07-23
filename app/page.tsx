"use client";

import {
  CSSProperties,
  FormEvent,
  KeyboardEvent,
  PointerEvent,
  useRef,
  useState,
} from "react";
import {
  assetPath,
  MobileCall,
  SiteFooter,
  SiteHeader,
  SiteMotion,
} from "./site-shell";
import { ActiveIntroConcept } from "./concepts/active-intro";
import { serviceCatalog } from "./service-catalog";

const situations = [
  {
    number: "01",
    title: "Regelmäßig betreut.",
    text: "Für Außenflächen, die dauerhaft ordentlich bleiben sollen. Feste Abstimmung statt immer wieder neu organisieren.",
    formValue: serviceCatalog[0].formValue,
    image: assetPath("/media/gardener-trimming.webp"),
    srcSet: `${assetPath("/media/gardener-trimming-1280.webp")} 1280w, ${assetPath("/media/gardener-trimming.webp")} 2560w`,
    alt: "Regelmäßige Pflege einer Gartenanlage",
    className: "service-card--garden",
  },
  {
    number: "02",
    title: "Saisonal bereit.",
    text: "Kapazitäten passend zu Wetter und Jahreszeit planen, bevor daraus Zeitdruck entsteht.",
    formValue: serviceCatalog[1].formValue,
    image: assetPath("/media/snow-clearing.webp"),
    srcSet: `${assetPath("/media/snow-clearing-1280.webp")} 1280w, ${assetPath("/media/snow-clearing.webp")} 2560w`,
    alt: "Vorbereiteter Einsatz auf einer verschneiten Fläche",
    className: "service-card--winter",
  },
  {
    number: "03",
    title: "Alles im Blick.",
    text: "Kontrolle, Pflege und kleine Aufgaben bleiben bei einem Ansprechpartner gebündelt.",
    formValue: serviceCatalog[2].formValue,
    image: assetPath("/media/grass-cutting.webp"),
    srcSet: `${assetPath("/media/grass-cutting-1280.webp")} 1280w, ${assetPath("/media/grass-cutting.webp")} 1920w`,
    alt: "Laufende Betreuung einer weitläufigen Außenfläche",
    className: "service-card--house",
  },
  {
    number: "04",
    title: "Sauber übergeben.",
    text: "Eine klar umrissene Aufgabe vom ersten Überblick bis zum geordneten Abschluss.",
    formValue: serviceCatalog[3].formValue,
    image: assetPath("/media/winter-vehicle.webp"),
    srcSet: undefined,
    alt: "Geordnete Übergabe nach einer Entrümpelung",
    className: "service-card--clear",
  },
];

const serviceChoices = [
  {
    value: serviceCatalog[0].formValue,
    label: serviceCatalog[0].title,
    note: "Pflege & Rückschnitt",
    icon: "garden",
  },
  {
    value: serviceCatalog[1].formValue,
    label: serviceCatalog[1].title,
    note: "Räumen & sichern",
    icon: "winter",
  },
  {
    value: serviceCatalog[2].formValue,
    label: serviceCatalog[2].title,
    note: "Kontrolle & Pflege",
    icon: "property",
  },
  {
    value: serviceCatalog[3].formValue,
    label: serviceCatalog[3].title,
    note: "Räumen & übergeben",
    icon: "clear",
  },
] as const;

type ServiceChoiceIcon = (typeof serviceChoices)[number]["icon"];

const fleet = [
  {
    name: "Räumfahrzeuge mit Streusystem",
    note: "Räumen · streuen",
    icon: "plow",
  },
  {
    name: "Mobile Schneefräsen",
    note: "Wendig im Nahbereich",
    icon: "blower",
  },
  {
    name: "Mähwerke für Großflächen",
    note: "Effizient auf Fläche",
    icon: "acreage",
  },
  {
    name: "Mähwerke für Eigenheime",
    note: "Präzise am Objekt",
    icon: "residential",
  },
  {
    name: "Technik für Hecken- und Rückschnitt",
    note: "Saubere Konturen",
    icon: "hedge",
  },
  {
    name: "3,5-t-Einsatzfahrzeug",
    note: "Schnell vor Ort",
    icon: "response",
  },
] as const;

type FleetIcon = (typeof fleet)[number]["icon"];

const fleetScenarios = [
  {
    id: "eigenheim",
    label: "Eigenheim",
    title: "Präzise am Objekt.",
    text: "Mähwerke für Eigenheime passen zu kleineren Grundstücken und klar begrenzten Grünflächen.",
    equipment: [fleet[3]],
    hotspotIcon: "residential",
    season: "summer",
    focusX: "-2%",
    focusY: "-3%",
    focusScale: "1.06",
    mobileX: "12%",
    zoneX: "43%",
    zoneY: "61%",
  },
  {
    id: "grossflaeche",
    label: "Großfläche",
    title: "Effizient auf Fläche.",
    text: "Mähwerke für Großflächen sind für weitläufige Grünbereiche vorgesehen.",
    equipment: [fleet[2]],
    hotspotIcon: "acreage",
    season: "summer",
    focusX: "5%",
    focusY: "5%",
    focusScale: "1.12",
    mobileX: "28%",
    zoneX: "24%",
    zoneY: "26%",
  },
  {
    id: "rueckschnitt",
    label: "Rückschnitt",
    title: "Saubere Konturen.",
    text: "Technik für Hecken- und Rückschnitt unterstützt kontrollierte Arbeiten entlang von Grundstück und Bepflanzung.",
    equipment: [fleet[4]],
    hotspotIcon: "hedge",
    season: "summer",
    focusX: "6%",
    focusY: "-5%",
    focusScale: "1.12",
    mobileX: "29%",
    zoneX: "23%",
    zoneY: "62%",
  },
  {
    id: "winter",
    label: "Winter",
    title: "Räumen und streuen.",
    text: "Räumfahrzeuge mit Streusystem bearbeiten größere Flächen. Mobile Schneefräsen bleiben im Nahbereich wendig.",
    equipment: [fleet[0], fleet[1]],
    hotspotIcon: "plow",
    season: "winter",
    focusX: "-5%",
    focusY: "1%",
    focusScale: "1.08",
    mobileX: "-24%",
    zoneX: "78%",
    zoneY: "50%",
  },
] as const;

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

function FleetGlyph({ type }: { type: FleetIcon }) {
  const common = {
    className: "fleet-glyph",
    viewBox: "0 0 48 48",
    "aria-hidden": true,
  } as const;

  switch (type) {
    case "plow":
      return (
        <svg {...common}>
          <path d="M8 28h24l7 6H18L8 28Z" />
          <path d="M14 28v-9h14l4 9M11 35l25-1M9 39h28" />
          <circle cx="17" cy="36" r="3" /><circle cx="32" cy="36" r="3" />
        </svg>
      );
    case "blower":
      return (
        <svg {...common}>
          <circle cx="18" cy="29" r="9" /><path d="m12 29 12-5-2 11-10-6ZM25 23l7-11h6v5h-6l-3 10M27 34h11M34 34v5" />
          <circle cx="17" cy="29" r="2" />
        </svg>
      );
    case "acreage":
      return (
        <svg {...common}>
          <path d="M7 29h34M12 24h24l4 5-4 6H12l-4-6 4-5Z" />
          <path d="m17 29 7-4 7 4-7 4-7-4ZM12 38h24" />
        </svg>
      );
    case "residential":
      return (
        <svg {...common}>
          <path d="M10 34h23l4-7H17l-7 7ZM18 27l8-14 9 14" />
          <circle cx="17" cy="35" r="3" /><circle cx="32" cy="35" r="3" />
          <path d="M26 13v-4" />
        </svg>
      );
    case "hedge":
      return (
        <svg {...common}>
          <path d="M8 29h27l6 5H14l-6-5ZM13 25l4 4 4-4 4 4 4-4 4 4" />
          <path d="m11 34-4 6M34 34l7 6" />
        </svg>
      );
    case "response":
      return (
        <svg {...common}>
          <path d="M7 32V20h23l8 7v5H7ZM30 22v7h8M17 20v-5h9v5" />
          <path d="M19 15v-4h5v4M20 26h5M22.5 23.5v5" />
          <circle cx="15" cy="34" r="3" /><circle cx="33" cy="34" r="3" />
        </svg>
      );
  }
}

export default function Home() {
  const [formStatus, setFormStatus] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [activeFleetScenario, setActiveFleetScenario] = useState(0);
  const fleetSwipeStart = useRef<{ x: number; y: number } | null>(null);
  const activeFleet = fleetScenarios[activeFleetScenario];

  const handleFleetTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = Math.min(fleetScenarios.length - 1, index + 1);
    } else if (event.key === "ArrowLeft") {
      nextIndex = Math.max(0, index - 1);
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = fleetScenarios.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveFleetScenario(nextIndex);
    event.currentTarget
      .closest('[role="tablist"]')
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [nextIndex]?.focus();
  };

  const handleFleetPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    fleetSwipeStart.current = { x: event.clientX, y: event.clientY };
  };

  const handleFleetPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = fleetSwipeStart.current;
    fleetSwipeStart.current = null;
    if (!start) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 46 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) {
      return;
    }

    setActiveFleetScenario((current) =>
      Math.max(
        0,
        Math.min(
          fleetScenarios.length - 1,
          current + (deltaX < 0 ? 1 : -1),
        ),
      ),
    );
  };

  const handleSpotlight = (event: PointerEvent<HTMLElement>) => {
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
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const subject = `Anfrage: ${data.get("service")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Telefon: ${data.get("phone")}`,
      `E-Mail: ${data.get("email")}`,
      `Leistung: ${data.get("service")}`,
      `Wunschtermin: ${data.get("date") || "offen"}`,
      `Ausführungsort: ${data.get("location")}`,
      "",
      String(data.get("message")),
    ].join("\n");

    setFormStatus("Ihr E-Mail-Programm wird mit der vorbereiteten Anfrage geöffnet.");
    window.location.href = `mailto:info@universale-dienstleistungen.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const chooseService = (service: string) => {
    setSelectedService(service);
    setFormStatus("");
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
              alt=""
              fetchPriority="high"
            />
          </div>
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-inner">
            <div className="hero-kicker">
              <span className="status-dot" />
              Büsum · Norddeutschland · deutschlandweit im Einsatz
            </div>

            <div className="hero-layout">
              <div className="hero-copy">
                <h1 id="hero-title">
                  Alles im Griff.
                  <span>Bei jedem Wetter.</span>
                </h1>
              </div>

              <aside className="hero-panel" aria-label="Direktanfrage">
                <p>
                  Garten & Grundstück, Winterdienst, Hausmeisterservice und
                  Entrümpelung aus einer Hand.
                </p>
                <div className="hero-actions">
                  <a className="button button--accent" href="#kontakt">
                    Angebot anfragen <span aria-hidden="true">↗</span>
                  </a>
                  <a className="text-link text-link--light" href="tel:+491738948124">
                    Jetzt anrufen <span aria-hidden="true">→</span>
                  </a>
                </div>
              </aside>
            </div>

            <div className="hero-scroll">
              <a className="scroll-cue" href="#unternehmen">
                <span>Entdecken</span>
                <i aria-hidden="true">↓</i>
              </a>
            </div>
          </div>
        </section>

        <ActiveIntroConcept onChooseService={chooseService} />

        <section className="services section" id="leistungen">
          <div className="container">
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
                    sizes="(max-width: 780px) calc(100vw - 36px), (max-width: 1100px) 55vw, 50vw"
                    alt={situation.alt}
                    loading="lazy"
                  />
                  <div className="service-card__shade" aria-hidden="true" />
                  <div className="service-card__top">
                    <span>{situation.number}</span>
                    <span>Einsatzmodell</span>
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
              <p className="eyebrow">Wenn es schnell gehen muss</p>
              <h2 id="readiness-title">Bereit, bevor das Wetter umschlägt.</h2>
              <p>
                Bei Wintereinbruch und dringenden Fällen erreichen Sie uns rund
                um die Uhr. Klare Abstimmung, kurze Wege und einsatzbereite
                Technik sorgen dafür, dass kein Auftrag liegen bleibt.
              </p>
              <a className="button button--outline" href="tel:+491738948124">
                Notfall-Hotline anrufen <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="readiness-rail" aria-hidden="true">
            <div className="readiness-rail__track">
              {[0, 1].map((copy) => (
                <div className="readiness-rail__set" key={copy}>
                  <span>Räumen</span><i>-</i>
                  <span>Streuen</span><i>-</i>
                  <span>Sichern</span><i>-</i>
                  <span>Betreuen</span><i>-</i>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="fleet section"
          id="fuhrpark"
          aria-labelledby="fleet-title"
        >
          <div className="container">
            <div className="fleet-architect__intro" data-reveal="right">
              <h2 id="fleet-title">
                <span>Nicht irgendein Gerät.</span>
                <span>Das richtige Setup.</span>
              </h2>
              <p>
                Eigener Fuhrpark, passend zu Fläche, Zugang und Wetter
                zusammengestellt.
              </p>
            </div>

            <div className="fleet-architect" data-reveal="scale">
              <div
                className={`fleet-architect__stage fleet-architect__stage--${activeFleet.id}`}
                style={
                  {
                    "--fleet-focus-x": activeFleet.focusX,
                    "--fleet-focus-y": activeFleet.focusY,
                    "--fleet-focus-scale": activeFleet.focusScale,
                    "--fleet-mobile-x": activeFleet.mobileX,
                    "--fleet-zone-x": activeFleet.zoneX,
                    "--fleet-zone-y": activeFleet.zoneY,
                  } as CSSProperties
                }
              >
                <div
                  className="fleet-architect__media"
                  onPointerDown={handleFleetPointerDown}
                  onPointerUp={handleFleetPointerUp}
                  onPointerCancel={() => {
                    fleetSwipeStart.current = null;
                  }}
                >
                  <picture
                    className={`fleet-architect__scene fleet-architect__scene--summer${
                      activeFleet.season === "summer" ? " is-active" : ""
                    }`}
                  >
                    <source
                      media="(max-width: 780px)"
                      srcSet={assetPath(
                        "/media/einsatzlandschaft-sommer-960.webp",
                      )}
                    />
                    <img
                      src={assetPath("/media/einsatzlandschaft-sommer.webp")}
                      alt=""
                      loading="lazy"
                    />
                  </picture>
                  <picture
                    className={`fleet-architect__scene fleet-architect__scene--winter${
                      activeFleet.season === "winter" ? " is-active" : ""
                    }`}
                  >
                    <source
                      media="(max-width: 780px)"
                      srcSet={assetPath(
                        "/media/einsatzlandschaft-winter-960.webp",
                      )}
                    />
                    <img
                      src={assetPath("/media/einsatzlandschaft-winter.webp")}
                      alt=""
                      loading="lazy"
                    />
                  </picture>
                  <div className="fleet-architect__focus" aria-hidden="true" />
                </div>

                <div
                  className="fleet-architect__hotspots"
                  role="group"
                  aria-label="Bereiche der Einsatzlandschaft"
                >
                  {fleetScenarios.map((scenario, index) => (
                    <button
                      className={`fleet-architect__hotspot${
                        index === activeFleetScenario ? " is-active" : ""
                      }`}
                      style={
                        {
                          "--hotspot-x": scenario.zoneX,
                          "--hotspot-y": scenario.zoneY,
                        } as CSSProperties
                      }
                      type="button"
                      aria-label={`${scenario.label} anzeigen`}
                      aria-pressed={index === activeFleetScenario}
                      onClick={() => setActiveFleetScenario(index)}
                      onFocus={() => setActiveFleetScenario(index)}
                      onMouseEnter={() => setActiveFleetScenario(index)}
                      key={scenario.id}
                    >
                      <FleetGlyph type={scenario.hotspotIcon} />
                    </button>
                  ))}
                </div>

                <div
                  className="fleet-architect__panel"
                  id="fleet-scenario-panel"
                  role="tabpanel"
                  aria-labelledby={`fleet-tab-${activeFleet.id}`}
                  aria-live="polite"
                >
                  <div
                    className="fleet-architect__panel-content"
                    key={activeFleet.id}
                  >
                    <p>{activeFleet.label}</p>
                    <h3>{activeFleet.title}</h3>
                    <span>{activeFleet.text}</span>
                    <ul aria-label="Passende Technik">
                      {activeFleet.equipment.map((item) => (
                        <li key={item.name}>
                          <i>
                            <FleetGlyph type={item.icon} />
                          </i>
                          <strong>{item.name}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="fleet-architect__tabs"
                role="tablist"
                aria-label="Einsatzsituation auswählen"
              >
                {fleetScenarios.map((scenario, index) => (
                  <button
                    type="button"
                    role="tab"
                    id={`fleet-tab-${scenario.id}`}
                    aria-controls="fleet-scenario-panel"
                    aria-selected={index === activeFleetScenario}
                    aria-label={`${scenario.label}: ${scenario.equipment
                      .map((item) => item.name)
                      .join(", ")}`}
                    tabIndex={index === activeFleetScenario ? 0 : -1}
                    onClick={() => setActiveFleetScenario(index)}
                    onFocus={() => setActiveFleetScenario(index)}
                    onKeyDown={(event) =>
                      handleFleetTabKeyDown(event, index)
                    }
                    key={scenario.id}
                  >
                    <span>{scenario.label}</span>
                    <small>{scenario.title}</small>
                  </button>
                ))}
              </div>

              <div className="fleet-architect__response">
                <i>
                  <FleetGlyph type="response" />
                </i>
                <div>
                  <strong>{fleet[5].name}</strong>
                  <span>{fleet[5].note}</span>
                </div>
                <p>
                  Schnell vor Ort, unabhängig davon, welche Technik zur
                  Aufgabe passt.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="image-break" aria-label="Gartenpflege im Einsatz">
          <img
            src={assetPath("/media/tree-shaping.webp")}
            srcSet={`${assetPath("/media/tree-shaping-1280.webp")} 1280w, ${assetPath("/media/tree-shaping.webp")} 2560w`}
            sizes="100vw"
            alt="Gärtner beim professionellen Formschnitt einer Hecke"
            loading="lazy"
            data-scroll-parallax
          />
          <div className="image-break__overlay" aria-hidden="true" />
          <div className="container image-break__content" data-reveal="left">
            <p className="eyebrow">Vom ersten Schnitt bis zur letzten Kante</p>
            <blockquote>
              „Wir verlassen eine Fläche so, wie wir sie selbst vorfinden möchten.“
            </blockquote>
            <span>Universale Qualitätsversprechen</span>
          </div>
        </section>

        <section className="process section" aria-labelledby="process-title">
          <div className="container process-layout">
            <div className="process-intro" data-reveal="left">
              <p className="eyebrow eyebrow--dark">So arbeiten wir</p>
              <h2 id="process-title">Drei Schritte.<br />Kein Umweg.</h2>
              <p>
                Sie geben den Startschuss. Danach halten wir Abstimmung,
                Organisation und Umsetzung so einfach wie möglich.
              </p>
              <a className="text-link" href="#kontakt">
                Projekt anfragen <span aria-hidden="true">→</span>
              </a>
            </div>

            <ol className="process-stack">
              <li className="process-card process-card--one" data-process-reveal>
                <div className="process-card__top">
                  <span>01</span><p>Anfrage</p><i>Start</i>
                </div>
                <div className="process-card__body">
                  <h3>Sie erzählen.</h3>
                  <p>Telefonisch, per E-Mail oder im Formular. Ein paar Eckdaten reichen für den Anfang.</p>
                </div>
                <div className="process-card__foot">
                  <span>Telefon</span><span>E-Mail</span><span>Formular</span>
                </div>
              </li>
              <li className="process-card process-card--two" data-process-reveal>
                <div className="process-card__top">
                  <span>02</span><p>Planung</p><i>Abstimmung</i>
                </div>
                <div className="process-card__body">
                  <h3>Wir planen.</h3>
                  <p>Wir prüfen die Aufgabe, stimmen Aufwand und Termin ab und stellen das passende Team zusammen.</p>
                </div>
                <div className="process-card__foot">
                  <span>Umfang</span><span>Termin</span><span>Angebot</span>
                </div>
              </li>
              <li className="process-card process-card--three" data-process-reveal>
                <div className="process-card__top">
                  <span>03</span><p>Umsetzung</p><i>Erledigt</i>
                </div>
                <div className="process-card__body">
                  <h3>Wir erledigen.</h3>
                  <p>Unser Team setzt fachgerecht um, kommuniziert klar und hinterlässt die Fläche sauber.</p>
                </div>
                <div className="process-card__foot">
                  <span>Team</span><span>Technik</span><span>Saubere Übergabe</span>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="contact" id="kontakt">
          <div className="container contact-grid">
            <div className="contact-intro" data-reveal="left">
              <p className="eyebrow">Lassen Sie uns loslegen</p>
              <h2>Was können wir<br />für Sie erledigen?</h2>
              <p>
                Erzählen Sie uns kurz von Ihrem Vorhaben. Wir melden uns mit
                einer klaren Einschätzung und den nächsten Schritten.
              </p>

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

            <form className="contact-form" onSubmit={handleSubmit} data-reveal="right">
              <fieldset className="service-picker">
                <legend>Wobei können wir helfen?</legend>
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
                <div className="form-details" key={selectedService}>
                  <div className="form-details__heading">
                    <span>02 / Ihre Anfrage</span>
                    <p><strong>{selectedService}</strong> ist ausgewählt.</p>
                  </div>

                  <div className="form-row form-row--two">
                    <label>
                      <span>Name *</span>
                      <input name="name" type="text" autoComplete="name" required />
                    </label>
                    <label>
                      <span>Telefon *</span>
                      <input name="phone" type="tel" autoComplete="tel" required />
                    </label>
                  </div>

                  <div className="form-row form-row--two">
                    <label>
                      <span>E-Mail *</span>
                      <input name="email" type="email" autoComplete="email" required />
                    </label>
                    <label>
                      <span>Ausführungsort *</span>
                      <input name="location" type="text" autoComplete="street-address" required />
                    </label>
                  </div>

                  <label className="message-label">
                    <span>Worum geht es? *</span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Fläche, Aufgabe, gewünschter Zeitraum …"
                      required
                    />
                  </label>

                  <label className="privacy-check">
                    <input name="privacy" type="checkbox" required />
                    <span>
                      Ich habe die <a href="https://universale-dienstleistungen.de/datenschutz/" target="_blank" rel="noreferrer">Datenschutzerklärung</a> gelesen und stimme der Kontaktaufnahme zu.
                    </span>
                  </label>

                  <div className="form-submit">
                    <button className="button button--accent" type="submit">
                      Anfrage vorbereiten <span aria-hidden="true">↗</span>
                    </button>
                    <p aria-live="polite">{formStatus}</p>
                  </div>
                </div>
              ) : (
                <p className="form-awaiting" aria-live="polite">
                  Wählen Sie oben einen Bereich aus. Danach fragen wir nur noch
                  die Angaben ab, die wir für eine erste Einschätzung brauchen.
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

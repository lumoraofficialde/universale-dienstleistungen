"use client";

import { FormEvent, MouseEvent, useState } from "react";
import {
  assetPath,
  MobileCall,
  SiteFooter,
  SiteHeader,
  SiteMotion,
} from "./site-shell";

const services = [
  {
    number: "01",
    title: "Garten & Grundstück",
    formValue: "Gartenpflege",
    text: "Pflege, Rückschnitt und saubere Außenflächen — regelmäßig oder genau dann, wenn Unterstützung gebraucht wird.",
    image: assetPath("/media/gardener-trimming.webp"),
    srcSet: `${assetPath("/media/gardener-trimming-1280.webp")} 1280w, ${assetPath("/media/gardener-trimming.webp")} 2560w`,
    alt: "Mitarbeiter bei der professionellen Pflege einer Gartenanlage",
    className: "service-card--garden",
  },
  {
    number: "02",
    title: "Winterdienst",
    formValue: "Winterdienst",
    text: "Schnee räumen, Flächen streuen und Wege sichern. Abrufbereit bei plötzlichem Wintereinbruch.",
    image: assetPath("/media/snow-clearing.webp"),
    srcSet: `${assetPath("/media/snow-clearing-1280.webp")} 1280w, ${assetPath("/media/snow-clearing.webp")} 2560w`,
    alt: "Winterdienst beim Räumen einer verschneiten Fläche",
    className: "service-card--winter",
  },
  {
    number: "03",
    title: "Hausmeisterservice",
    formValue: "Hausmeisterservice",
    text: "Kontrolle, Pflege, Koordination und kleinere Reparaturen für private und gewerbliche Immobilien.",
    image: assetPath("/media/grass-cutting.webp"),
    srcSet: `${assetPath("/media/grass-cutting-1280.webp")} 1280w, ${assetPath("/media/grass-cutting.webp")} 1920w`,
    alt: "Professionelle Grünpflege auf einer weitläufigen Außenfläche",
    className: "service-card--house",
  },
  {
    number: "04",
    title: "Entrümpelung",
    formValue: "Entrümpelung",
    text: "Wohnungsauflösung, Betriebsauflösung, Demontage und besenreine Übergabe — diskret und gut geplant.",
    image: assetPath("/media/winter-vehicle.webp"),
    srcSet: undefined,
    alt: "Einsatzfahrzeug von Universale Dienstleistungen",
    className: "service-card--clear",
  },
];

const serviceChoices = [
  {
    value: "Gartenpflege",
    label: "Gartenpflege",
    note: "Pflege & Rückschnitt",
    icon: "garden",
  },
  {
    value: "Winterdienst",
    label: "Winterdienst",
    note: "Räumen & sichern",
    icon: "winter",
  },
  {
    value: "Hausmeisterservice",
    label: "Objektservice",
    note: "Kontrolle & Pflege",
    icon: "property",
  },
  {
    value: "Entrümpelung",
    label: "Entrümpelung",
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

function ServicesEmblem() {
  return (
    <svg
      className="services-emblem"
      viewBox="0 0 132 132"
      aria-hidden="true"
    >
      <circle className="services-emblem__orbit" cx="66" cy="66" r="58" pathLength="1" />
      <circle className="services-emblem__core" cx="66" cy="66" r="12" pathLength="1" />
      <path className="services-emblem__axis" d="M66 8v46M124 66H78M66 124V78M8 66h46" pathLength="1" />

      <g className="services-emblem__mark services-emblem__mark--leaf">
        <path d="M29 43c13 1 21-6 25-18-13-1-23 5-25 18Z" pathLength="1" />
        <path d="M31 42c7-5 13-9 21-14" pathLength="1" />
      </g>

      <g className="services-emblem__mark services-emblem__mark--snow">
        <path d="M91 25v28M79 32l24 14M103 32 79 46" pathLength="1" />
        <path d="m91 25-4 5m4-5 4 5m8 2-1 7m1-7-7 2m7 12-7-2m7 2-1-7m-11 14-4-5m4 5 4-5m-16-6 7-2m-7 2 1-7m-1-7 1 7m-1-7 7 2" pathLength="1" />
      </g>

      <g className="services-emblem__mark services-emblem__mark--home">
        <path d="m25 92 18-15 18 15M31 88v20h24V88M40 108V96h7v12" pathLength="1" />
      </g>

      <g className="services-emblem__mark services-emblem__mark--clear">
        <path d="m82 84 24 24M87 79l19 19M78 89l19 19" pathLength="1" />
        <path d="m96 108 12-12M82 84l5-5" pathLength="1" />
      </g>
    </svg>
  );
}

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

function SeasonsArtwork() {
  return (
    <svg className="season-art" viewBox="0 0 300 300" aria-hidden="true">
      <g className="season-art__scene season-art__spring">
        <path d="M31 190c42-8 67-42 78-92M67 142c-27 2-43-12-47-38 27-4 48 9 53 31M86 119c1-30 19-49 49-54 2 31-15 52-45 60" />
        <path d="M23 215c54-12 104-11 151 5" className="season-art__ground" />
        <circle cx="232" cy="66" r="5" /><circle cx="249" cy="91" r="3" />
      </g>
      <g className="season-art__scene season-art__summer">
        <circle cx="224" cy="70" r="28" /><path d="M224 25v-13M224 128v-13M179 70h-13M282 70h-13M192 38l-10-10M266 112l-10-10M256 38l10-10M182 112l10-10" />
        <path d="M27 221c35-9 75-8 118 2M41 219l-4-42m16 43 4-54m12 55-2-33m18 35 8-48m9 51-1-37m18 39 8-52m9 55 2-35" className="season-art__ground" />
      </g>
      <g className="season-art__scene season-art__autumn">
        <path d="M28 218c42-10 86-7 131 7" className="season-art__ground" />
        <path d="M61 69c22 7 37 22 46 44-25 2-43-8-54-30 3-6 5-10 8-14ZM179 48c18 12 27 29 29 51-22-4-37-17-44-38 5-5 10-9 15-13ZM221 137c18 5 31 17 39 35-20 2-35-6-44-23 1-5 3-9 5-12Z" />
        <path d="M50 56c43 47 76 90 100 150M180 43c-9 62-21 112-37 163M223 127c-26 35-52 62-80 82" />
      </g>
      <g className="season-art__scene season-art__winter">
        <path d="M31 222c52-18 100-16 145 6M44 188c28-13 56-12 84 3" className="season-art__ground" />
        <path d="M221 51v111M173 79l96 55M269 79l-96 55M221 51l-12 14m12-14 12 14M173 79l21 4m-21-4 7 20M269 79l-21 4m21-4-7 20M173 134l21-4m-21 4 7-20M269 134l-21-4m21 4-7-20M221 162l-12-14m12 14 12-14" />
      </g>
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

  const handleSpotlight = (event: MouseEvent<HTMLElement>) => {
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
                  Gartenpflege, Winterdienst und Objektservice aus einer Hand.
                  Schnell vor Ort, sauber geplant, zuverlässig erledigt.
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

        <div className="service-marquee" aria-label="Leistungsbereiche">
          <div className="service-marquee__track">
            {[0, 1].map((copy) => (
              <div className="service-marquee__set" aria-hidden={copy === 1} key={copy}>
                <span>Winterdienst</span><i>✳</i>
                <span>Gartenpflege</span><i>✳</i>
                <span>Hausmeisterservice</span><i>✳</i>
                <span>Entrümpelung</span><i>✳</i>
              </div>
            ))}
          </div>
        </div>

        <section className="intro section" id="unternehmen">
          <div className="container intro-stage">
            <div className="intro-statement" data-reveal="left">
              <p className="eyebrow eyebrow--dark">Rund um Haus & Grundstück</p>
              <h2>
                <span>Vier Aufgaben.</span>
                <span>Eine klare</span>
                <em>Verantwortung.</em>
              </h2>
            </div>

            <div
              className="season-story"
              data-season-story
              data-season="spring"
              data-reveal="scale"
              aria-label="365 Tage im Jahr: Frühling, Sommer, Herbst und Winter"
            >
              <div className="season-story__sticky">
                <div className="intro-orbit" data-scroll-rotate>
                  <SeasonsArtwork />
                  <div className="intro-orbit__core" aria-hidden="true">
                    <strong>365</strong>
                    <span>Tage im Jahr</span>
                  </div>
                  <i aria-hidden="true">ganzjährig · einsatzbereit</i>
                </div>

                <div className="season-index" aria-hidden="true">
                  <span data-season-name="spring"><b>01</b>Frühling</span>
                  <span data-season-name="summer"><b>02</b>Sommer</span>
                  <span data-season-name="autumn"><b>03</b>Herbst</span>
                  <span data-season-name="winter"><b>04</b>Winter</span>
                </div>
                <p className="season-caption">
                  <span>Wachsen.</span><span>Pflegen.</span><span>Sichern.</span><span>Räumen.</span>
                </p>
              </div>
            </div>

            <div className="intro-body" data-reveal>
              <p className="intro-lead">
                Wir halten Immobilien, Außenflächen und Wege in Ordnung —
                einmalig, saisonal oder als laufende Betreuung.
              </p>
              <p>
                Von der ersten Besichtigung bis zur sauberen Übergabe planen wir
                individuell und setzen mit eigenem Personal und moderner Technik
                fachgerecht um.
              </p>
              <a className="text-link" href="#leistungen">
                Leistungen ansehen <span aria-hidden="true">→</span>
              </a>
            </div>

          </div>
        </section>

        <section className="services section" id="leistungen">
          <div className="container">
            <div className="section-heading services-heading">
              <div data-reveal="left">
                <p className="eyebrow eyebrow--dark">Was wir übernehmen</p>
                <h2>
                  <span>Arbeit, die man sieht.</span>
                  <span>Service, den man merkt.</span>
                </h2>
              </div>
              <aside className="services-note" data-reveal="right">
                <ServicesEmblem />
                <div>
                  <strong>Vier Bereiche. Ein Team.</strong>
                  <p>Einzeln buchbar oder als laufende Objektbetreuung.</p>
                </div>
              </aside>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <article
                  className={`service-card ${service.className}`}
                  data-reveal={index % 2 === 0 ? "left" : "right"}
                  style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
                  onMouseMove={handleSpotlight}
                  key={service.title}
                >
                  <img
                    src={service.image}
                    srcSet={service.srcSet}
                    sizes="(max-width: 780px) calc(100vw - 36px), (max-width: 1100px) 55vw, 50vw"
                    alt={service.alt}
                    loading="lazy"
                  />
                  <div className="service-card__shade" aria-hidden="true" />
                  <div className="service-card__top">
                    <span>{service.number}</span>
                    <span>Leistungsbereich</span>
                  </div>
                  <div className="service-card__body">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <a
                      href="#kontakt"
                      aria-label={`${service.title} anfragen`}
                      onClick={() => chooseService(service.formValue)}
                    >
                      Leistung anfragen <span aria-hidden="true">↗</span>
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
                  <span>Räumen</span><i>—</i>
                  <span>Streuen</span><i>—</i>
                  <span>Sichern</span><i>—</i>
                  <span>Betreuen</span><i>—</i>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="fleet section" id="fuhrpark">
          <div className="container">
            <div className="fleet-top">
              <div className="fleet-title" data-reveal="right">
                <p className="eyebrow eyebrow--dark">Technik, die mitarbeitet</p>
                <h2>
                  <span>Für jede Fläche</span>
                  <span>das richtige Gerät.</span>
                </h2>
                <p>
                  Eigener Fuhrpark, passend zur Aufgabe — flexibel und
                  kurzfristig einsatzbereit.
                </p>
              </div>
            </div>

            <div className="fleet-showcase">
              <figure className="fleet-photo" data-reveal="scale">
                <img
                  src={assetPath("/media/winter-team.webp")}
                  alt="Universale Mitarbeiter beim Winterdiensteinsatz"
                  loading="lazy"
                  data-scroll-parallax
                />
              </figure>

              <div className="fleet-list" data-reveal="right">
                {fleet.map((item, index) => (
                  <div className={`fleet-item fleet-item--${item.icon}`} key={item.name}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div className="fleet-item__copy">
                      <p>{item.name}</p>
                      <small>{item.note}</small>
                    </div>
                    <i><FleetGlyph type={item.icon} /></i>
                  </div>
                ))}
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

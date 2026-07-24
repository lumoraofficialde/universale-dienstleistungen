"use client";

import {
  FormEvent,
  PointerEvent,
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
import { FleetScaleJourney } from "./concepts/fleet-scale-journey";
import { ProcessImpulseJourney } from "./concepts/process-impulse-journey";
import { serviceCatalog } from "./service-catalog";

const situations = [
  {
    number: "01",
    title: "Laufend betreut.",
    text: "Wiederkehrende Pflege- und Kontrolltermine für Außenflächen und Immobilien. Rhythmus und Umfang stimmen wir auf Objekt und Saison ab.",
    formValue: serviceCatalog[0].formValue,
    image: assetPath("/media/gardener-trimming.webp"),
    srcSet: `${assetPath("/media/gardener-trimming-1280.webp")} 1280w, ${assetPath("/media/gardener-trimming.webp")} 2560w`,
    alt: "Regelmäßige Pflege einer Gartenanlage",
    className: "service-card--garden",
  },
  {
    number: "02",
    title: "Saisonal vorbereitet.",
    text: "Gartenpflege und Winterdienst rechtzeitig einplanen — mit direkter Erreichbarkeit, wenn das Wetter kurzfristig umschlägt.",
    formValue: serviceCatalog[1].formValue,
    image: assetPath("/media/snow-clearing.webp"),
    srcSet: `${assetPath("/media/snow-clearing-1280.webp")} 1280w, ${assetPath("/media/snow-clearing.webp")} 2560w`,
    alt: "Vorbereiteter Einsatz auf einer verschneiten Fläche",
    className: "service-card--winter",
  },
  {
    number: "03",
    title: "Gebündelt erledigt.",
    text: "Kontrollen, Pflege und kleinere Arbeiten an einem Objekt werden in einem abgestimmten Einsatz zusammengefasst.",
    formValue: serviceCatalog[2].formValue,
    image: assetPath("/media/grass-cutting.webp"),
    srcSet: `${assetPath("/media/grass-cutting-1280.webp")} 1280w, ${assetPath("/media/grass-cutting.webp")} 1920w`,
    alt: "Laufende Betreuung einer weitläufigen Außenfläche",
    className: "service-card--house",
  },
  {
    number: "04",
    title: "Einmalig organisiert.",
    text: "Für Entrümpelungen und klar definierte Einzelaufträge vereinbaren wir Umfang, Termin und Abschluss vorab.",
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
    note: "Grünflächen, Hecken, Gehölze",
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
] as const;

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
                  Für private Haushalte und gewerbliche Objekte: Gartenpflege,
                  Winterdienst, Hausmeisterservice und Entrümpelung aus einer Hand.
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
              <p className="eyebrow">Wenn der Einsatz nicht warten kann</p>
              <h2 id="readiness-title">Erreichbar, wenn es darauf ankommt.</h2>
              <p>
                Bei plötzlichem Wintereinbruch oder einem dringenden Fall
                erreichen Sie uns telefonisch rund um die Uhr. Nennen Sie
                Einsatzort, betroffene Fläche und Zugänglichkeit — wir klären
                direkt, welches Team und welche Technik benötigt werden.
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

        <FleetScaleJourney />

        <ProcessImpulseJourney />

        <section className="contact" id="kontakt">
          <div className="container contact-grid">
            <div className="contact-intro" data-reveal="left">
              <p className="eyebrow">Ihre Anfrage</p>
              <h2>Beschreiben Sie<br />kurz, was ansteht.</h2>
              <p>
                Einsatzort, Aufgabe und gewünschter Zeitraum reichen für den
                Start. Alles Weitere klären wir persönlich.
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
                  Wählen Sie oben einen Bereich aus. Danach fragen wir nach
                  Kontaktdaten, Ausführungsort und den wichtigsten Eckdaten.
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

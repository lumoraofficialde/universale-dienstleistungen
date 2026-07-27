"use client";

import {
  assetPath,
  basePath,
  MobileCall,
  SiteFooter,
  SiteHeader,
  SiteMotion,
} from "../site-shell";

const principles = [
  {
    number: "01",
    title: "Direkte Abstimmung",
    text: "Vom ersten Gespräch bis zur Übergabe bleiben Aufgaben, Termine und Zuständigkeiten nachvollziehbar.",
  },
  {
    number: "02",
    title: "Passende Technik",
    text: "Team und Maschinenpark werden nach Fläche, Aufgabe und Zeitpunkt zusammengestellt.",
  },
  {
    number: "03",
    title: "Saubere Übergabe",
    text: "Das Ergebnis zählt — und der Zustand, in dem wir Wege, Flächen und Objekte hinterlassen.",
  },
];

const companyFacts = [
  {
    label: "Unternehmen",
    value: "Universale Dienstleistungen GmbH",
  },
  {
    label: "Geschäftsführung",
    value: "Barran Uca",
  },
  {
    label: "Sitz",
    value: "Westerstraße 3 · 25761 Büsum",
  },
  {
    label: "Register",
    value: "Amtsgericht Pinneberg · HRB 18480 PI",
  },
] as const;

export default function TeamPage() {
  return (
    <>
      <SiteMotion />
      <SiteHeader currentPage="team" />

      <main id="main" className="team-page">
        <section className="team-hero" id="top" aria-labelledby="team-hero-title">
          <div className="team-hero__media" aria-hidden="true">
            <img
              src={assetPath("/media/winter-team.webp")}
              width={1080}
              height={1080}
              alt=""
              fetchPriority="high"
            />
          </div>
          <div className="team-hero__shade" aria-hidden="true" />
          <div className="container team-hero__content">
            <p className="eyebrow">Unternehmen & Arbeitsweise</p>
            <p className="team-hero__media-note">Bildmotiv · Symbolbild</p>
            <h1 id="team-hero-title"><span>Klare Abläufe.</span><span>Klare Verantwortung.</span></h1>
            <div className="team-hero__foot">
              <p>
                Von Büsum aus koordinieren wir Aufgaben, Technik und Termine —
                persönlich, nachvollziehbar und passend zur Aufgabe.
              </p>
              <a className="button button--accent" href={`${basePath}/#kontakt`}>
                Aufgabe besprechen <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="team-intro section">
          <div className="container team-intro__grid">
            <div data-reveal="left">
              <p className="eyebrow eyebrow--dark">Wie wir zusammenarbeiten</p>
              <h2>Klare Abstimmung.<br />Vom Start bis zur Übergabe.</h2>
            </div>
            <div className="team-intro__copy" data-reveal="right">
              <p>
                Gute Dienstleistung beginnt vor dem ersten Handgriff: mit einem
                unverbindlichen Beratungsgespräch, einer klaren Einschätzung und
                einem Plan, der zur Situation vor Ort passt.
              </p>
              <p>
                Von Büsum aus betreuen wir private und gewerbliche Objekte.
                Wenn Aufgabe und Umfang nicht aus der Ferne belastbar geklärt
                werden können, vereinbaren wir eine Besichtigung vor Ort.
              </p>
            </div>
          </div>
        </section>

        <section
          className="team-company"
          aria-labelledby="team-company-title"
        >
          <div className="container">
            <div className="team-company__head" data-reveal>
              <p className="eyebrow">Nachvollziehbare Unternehmensangaben</p>
              <h2 id="team-company-title">
                Das Unternehmen
                <span>hinter dem Auftrag.</span>
              </h2>
              <p>
                Universale Dienstleistungen bündelt Garten- und Hauspflege,
                Winterdienst, Hausmeisterservice und Entrümpelung über einen
                zentralen Ansprechpartner. Einsatzgebiet, Leistungsumfang und
                notwendige Technik klären wir passend zum Auftrag.
              </p>
            </div>
            <dl className="team-company__facts">
              {companyFacts.map((fact, index) => (
                <div data-reveal={index % 2 ? "right" : "left"} key={fact.label}>
                  <dt>{String(index + 1).padStart(2, "0")} · {fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="team-company__contact" data-reveal>
              <p>
                Standort Büsum · Einsätze in Norddeutschland und je nach
                Auftrag darüber hinaus nach individueller Abstimmung.
              </p>
              <a className="button button--accent" href="tel:+491738948124">
                Verfügbarkeit besprechen <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="team-portrait" aria-label="Abgestimmter Arbeitseinsatz">
          <figure className="team-portrait__frame" data-reveal="scale">
            <img
              src={assetPath("/media/winter-vehicle.webp")}
              width={1080}
              height={1080}
              alt="Zwei Helfer tragen ein Möbelstück aus einem Transportfahrzeug"
              loading="lazy"
              data-scroll-parallax
            />
            <div className="team-portrait__shade" aria-hidden="true" />
            <figcaption>
              <span>Symbolbild · abgestimmter Einsatz</span>
              <p>Kurze Abstimmung. Klare Aufgaben. Saubere Übergabe.</p>
            </figcaption>
          </figure>
        </section>

        <section className="team-principles" aria-labelledby="principles-title">
          <div className="container">
            <div className="team-principles__head" data-reveal>
              <p className="eyebrow">Unser Arbeitsverständnis</p>
              <h2 id="principles-title">Woran gute Arbeit erkennbar wird.</h2>
            </div>
            <ol className="team-principles__list">
              {principles.map((principle, index) => (
                <li data-reveal={index % 2 ? "right" : "left"} key={principle.number}>
                  <span>{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="team-cta">
          <div className="container team-cta__grid" data-reveal>
            <p className="eyebrow">Lernen wir Ihr Projekt kennen</p>
            <h2>Eine Aufgabe.<br />Ein klarer nächster Schritt.</h2>
            <div>
              <p>Schildern Sie kurz, worum es geht. Wir melden uns mit einer ersten Einschätzung.</p>
              <a className="button button--accent" href={`${basePath}/#kontakt`}>
                Unverbindlich anfragen <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPage="team" />
      <MobileCall />
    </>
  );
}

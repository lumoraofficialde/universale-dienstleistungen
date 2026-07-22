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

export default function TeamPage() {
  return (
    <>
      <SiteMotion />
      <SiteHeader currentPage="team" />

      <main id="main" className="team-page">
        <section className="team-hero" id="top" aria-labelledby="team-hero-title">
          <div className="team-hero__media" aria-hidden="true">
            <img src={assetPath("/media/winter-team.webp")} alt="" fetchPriority="high" />
          </div>
          <div className="team-hero__shade" aria-hidden="true" />
          <div className="container team-hero__content">
            <p className="eyebrow">Das Team hinter dem Einsatz</p>
            <h1 id="team-hero-title"><span>Ein Team.</span><span>Klare Verantwortung.</span></h1>
            <div className="team-hero__foot">
              <p>
                Von Büsum aus koordinieren wir Menschen, Maschinen und Termine —
                persönlich, nachvollziehbar und passend zur Aufgabe.
              </p>
              <a className="button button--accent" href={`${basePath}/#kontakt`}>
                Projekt besprechen <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="team-intro section">
          <div className="container team-intro__grid">
            <div data-reveal="left">
              <p className="eyebrow eyebrow--dark">Wie wir zusammenarbeiten</p>
              <h2>Nicht viele Wege.<br />Ein verbindlicher.</h2>
            </div>
            <div className="team-intro__copy" data-reveal="right">
              <p>
                Gute Dienstleistung beginnt vor dem ersten Handgriff: mit einer
                klaren Einschätzung, erreichbaren Ansprechpartnern und einem Plan,
                der zur Situation vor Ort passt.
              </p>
              <p>
                Entscheidend ist, dass alle Beteiligten wissen, was ansteht —
                und dass am Ende nicht nur die Aufgabe erledigt, sondern die
                Fläche ordentlich übergeben ist.
              </p>
            </div>
          </div>
        </section>

        <section className="team-portrait" aria-label="Team im Einsatz">
          <figure className="team-portrait__frame" data-reveal="scale">
            <img
              src={assetPath("/media/winter-vehicle.webp")}
              alt="Mitarbeiter bei einem gemeinsamen Einsatz am Fahrzeug"
              loading="lazy"
              data-scroll-parallax
            />
            <div className="team-portrait__shade" aria-hidden="true" />
            <figcaption>
              <span>Gemeinsam im Einsatz</span>
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
                Anfrage starten <span aria-hidden="true">↗</span>
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

/* eslint-disable @next/next/no-img-element -- Team-page assets are pre-sized and the static deployment has no runtime image optimizer. */
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
    text: "Vom ersten Gespräch bis zur Übergabe stimmen wir Aufgaben, Termine und Zuständigkeiten mit Ihnen ab.",
  },
  {
    number: "02",
    title: "Passende Technik",
    text: "Personal und benötigte Technik werden nach Fläche, Aufgabe und Zeitpunkt zusammengestellt.",
  },
  {
    number: "03",
    title: "Saubere Übergabe",
    text: "Wir setzen den vereinbarten Umfang um, stimmen notwendige Änderungen ab und übergeben den bearbeiteten Bereich geordnet.",
  },
];

export default function TeamPage() {
  return (
    <>
      <SiteMotion />
      <SiteHeader currentPage="team" />

      <main id="main" className="team-page" tabIndex={-1}>
        <section className="team-hero" id="top" aria-labelledby="team-hero-title">
          <div className="team-hero__media" aria-hidden="true">
            <img
              src={assetPath("/media/winter-team.webp")}
              width="1080"
              height="1080"
              alt=""
              fetchPriority="high"
            />
          </div>
          <div className="team-hero__shade" aria-hidden="true" />
          <div className="container team-hero__content">
            <p className="eyebrow">So organisieren wir Einsätze</p>
            <h1 id="team-hero-title"><span>Klare Abläufe.</span><span>Verbindliche Abstimmung.</span></h1>
            <div className="team-hero__foot">
              <p>
                Von Büsum aus koordinieren wir Anfragen, Einsätze und Termine
                im Kreis Dithmarschen. Umfang, Termin, Personal und Technik
                stimmen wir passend zur Aufgabe ab.
              </p>
              <a className="button button--accent" href={`${basePath}/#kontakt`}>
                Anfrage starten <span aria-hidden="true">↗︎</span>
              </a>
            </div>
          </div>
        </section>

        <section className="team-intro section">
          <div className="container team-intro__grid">
            <div data-reveal="left">
              <p className="eyebrow eyebrow--dark">Unsere Arbeitsweise</p>
              <h2>Kurze Wege.<br />Verbindliche Abstimmung.</h2>
            </div>
            <div className="team-intro__copy" data-reveal="right">
              <p>
                Vor dem Einsatz klären wir Aufgabe, Einsatzort, Umfang und
                Termin. Wenn nötig, besichtigen wir den Einsatzort und stimmen
                Personal und Technik auf die Aufgabe ab.
              </p>
              <p>
                Notwendige Änderungen stimmen wir während der Ausführung mit
                Ihnen ab. Nach Abschluss übergeben wir den bearbeiteten Bereich
                geordnet.
              </p>
            </div>
          </div>
        </section>

        <section className="team-portrait" aria-label="Abstimmung im Einsatz">
          <figure className="team-portrait__frame" data-reveal="scale">
            <img
              src={assetPath("/media/winter-vehicle.webp")}
              width="1080"
              height="1080"
              alt="Zwei Personen beim Transport eines Möbelstücks am Fahrzeug"
              loading="lazy"
              data-scroll-parallax
            />
            <div className="team-portrait__shade" aria-hidden="true" />
            <figcaption>
              <span>Abgestimmt im Einsatz</span>
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
            <p className="eyebrow">Ihre Anfrage</p>
            <h2>Eine Aufgabe.<br />Ein klarer nächster Schritt.</h2>
            <div>
              <p>
                Schildern Sie kurz, worum es geht. Einsatzort, Umfang und Termin
                klären wir anschließend mit Ihnen.
              </p>
              <a className="button button--accent" href={`${basePath}/#kontakt`}>
                Anfrage starten <span aria-hidden="true">↗︎</span>
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

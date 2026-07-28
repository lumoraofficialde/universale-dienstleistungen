import styles from "./trust-area.module.css";

const coreLocations = [
  "Büsum",
  "Heide",
  "Wesselburen",
  "Meldorf",
  "Brunsbüttel",
  "Marne",
] as const;

export function TrustArea() {
  return (
    <section
      className={styles.root}
      id="einsatzgebiet"
      aria-labelledby="trust-area-title"
    >
      <div className={styles.inner}>
        <header className={styles.header} data-reveal>
          <h2 id="trust-area-title">
            Vor Ort verankert.
            <span>Verantwortung klar benannt.</span>
          </h2>
          <p>
            Unser Kerneinsatzgebiet liegt rund um Büsum und in Dithmarschen.
            Registereintrag, Standort und Geschäftsführung sind transparent
            benannt.
          </p>
        </header>

        <div className={styles.layout}>
          <article className={styles.region} data-reveal="left">
            <div className={styles.regionHeading}>
              <p>Kerneinsatzgebiet</p>
              <h3>Büsum und Dithmarschen</h3>
              <p>
                Für private Haushalte und gewerbliche Objekte koordinieren wir
                Einsätze in diesen Orten und im direkten Umfeld.
              </p>
            </div>

            <ul className={styles.locationGrid} aria-label="Orte im Kerneinsatzgebiet">
              {coreLocations.map((location) => (
                <li key={location}>{location}</li>
              ))}
            </ul>

            <p className={styles.regionNote}>
              Weitere Einsatzorte für gewerbliche Objekte prüfen wir
              individuell. Entfernung, Leistungsumfang, Termin und benötigte
              Technik stimmen wir vorab ab.
            </p>
          </article>

          <aside
            className={styles.facts}
            aria-labelledby="trust-facts-title"
            data-reveal="right"
          >
            <div className={styles.factsHeading}>
              <h3 id="trust-facts-title">Nachprüfbare Firmendaten.</h3>
              <p>
                Konkrete Angaben zu Unternehmen, Verantwortung und
                Erreichbarkeit.
              </p>
            </div>

            <dl className={styles.factList}>
              <div>
                <dt>Unternehmen</dt>
                <dd>
                  <strong>Universale Dienstleistungen GmbH</strong>
                  <span>HRB 18480 PI, Amtsgericht Pinneberg</span>
                </dd>
              </div>

              <div>
                <dt>Standort</dt>
                <dd>
                  <strong>Westerstraße 3</strong>
                  <span>25761 Büsum</span>
                </dd>
              </div>

              <div>
                <dt>Ansprechpartner</dt>
                <dd>
                  <strong>Barran Uca</strong>
                  <span>Geschäftsführer</span>
                </dd>
              </div>

              <div>
                <dt>Dringende Anfragen</dt>
                <dd>
                  <strong>Telefonisch 24 Stunden, 7 Tage</strong>
                  <span>
                    Verfügbarkeit und mögliche Ausführung klären wir direkt im
                    Gespräch.
                  </span>
                </dd>
              </div>

              <div className={styles.fullFact}>
                <dt>Vor dem Einsatz</dt>
                <dd>
                  <strong>Leistungsumfang und Technik klar abgestimmt</strong>
                  <span>
                    Aufgabe, Zuständigkeiten, Zeitraum, Zugang und benötigte
                    Technik werden passend zum Objekt festgelegt.
                  </span>
                </dd>
              </div>
            </dl>

            <a className={styles.phoneLink} href="tel:+491738948124">
              Dringende Anfrage telefonisch klären
              <span aria-hidden="true">↗︎</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

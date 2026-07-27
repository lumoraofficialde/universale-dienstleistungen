import type { Metadata } from "next";
import styles from "./not-found.module.css";
import {
  MobileCall,
  SiteFooter,
  SiteHeader,
  SiteMotion,
} from "./site-shell";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Seite nicht gefunden | Universale Dienstleistungen",
  description:
    "Die angeforderte Seite wurde nicht gefunden. Zurück zu den Leistungen von Universale Dienstleistungen.",
};

export default function NotFound() {
  return (
    <>
      <SiteMotion />
      <SiteHeader currentPage="not-found" />

      <main id="main" className={styles.page}>
        <section
          className={styles.hero}
          id="top"
          aria-labelledby="not-found-title"
        >
          <div className={styles.inner}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>404 · Nicht im Einsatzplan</p>
              <h1 id="not-found-title">
                Diese Fläche haben wir nicht gefunden.
              </h1>
              <p className={styles.intro}>
                Der aufgerufene Link ist nicht mehr aktuell oder führt an die
                falsche Stelle. Von hier kommen Sie direkt zurück zu unseren
                Leistungen und Kontaktwegen.
              </p>

              <div className={styles.actions}>
                <a
                  className={`button button--accent ${styles.primaryAction}`}
                  href={`${basePath}/`}
                >
                  Zur Startseite <span aria-hidden="true">→</span>
                </a>
                <a
                  className={styles.secondaryAction}
                  href={`${basePath}/#unternehmen`}
                >
                  Leistungen ansehen <span aria-hidden="true">↗</span>
                </a>
              </div>

              <a className={styles.call} href="tel:+491738948124">
                <span>Direkt anrufen</span>
                <strong>+49 173 8948124</strong>
              </a>
            </div>

            <div className={styles.map} aria-hidden="true">
              <div className={styles.mapMeta}>
                <span>Suchfeld</span>
                <strong>Außerhalb der Route</strong>
              </div>
              <strong className={styles.code}>404</strong>
              <svg
                className={styles.path}
                viewBox="0 0 620 520"
                preserveAspectRatio="none"
              >
                <path d="M34 452 C142 395 74 294 208 271 C338 249 294 132 438 109 C502 99 547 74 589 36" />
              </svg>
              <div className={styles.marker}>
                <span />
                Weg endet hier
              </div>
              <p className={styles.mapNote}>Büsum · 54.13° N</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPage="not-found" />
      <MobileCall />
    </>
  );
}

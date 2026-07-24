import type { ReactNode } from "react";
import {
  MobileCall,
  SiteFooter,
  SiteHeader,
  SiteMotion,
  type SitePage,
} from "./site-shell";
import styles from "./legal-page.module.css";

type LegalNavigationItem = {
  id: string;
  label: string;
  number: string;
};

type LegalPageProps = {
  currentPage: Extract<SitePage, "impressum" | "datenschutz">;
  documentNumber: string;
  eyebrow: string;
  title: string;
  intro: string;
  navigation: LegalNavigationItem[];
  children: ReactNode;
};

export function LegalPage({
  currentPage,
  documentNumber,
  eyebrow,
  title,
  intro,
  navigation,
  children,
}: LegalPageProps) {
  return (
    <>
      <SiteMotion />
      <SiteHeader currentPage={currentPage} />

      <main id="main" className={styles.page}>
        <section className={styles.hero} id="top" aria-labelledby="legal-title">
          <div className={styles.heroLines} aria-hidden="true" />
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <h1 id="legal-title">{title}</h1>
              <p className={styles.intro}>{intro}</p>
            </div>

            <div className={styles.documentMark} aria-hidden="true">
              <span>Dokument</span>
              <strong>{documentNumber}</strong>
              <i />
              <small>Stand · 24. Juli 2026</small>
            </div>
          </div>
        </section>

        <section className={styles.ledger}>
          <div className={`container ${styles.ledgerGrid}`}>
            <aside className={styles.index} data-reveal="left">
              <p>Inhalt</p>
              <nav aria-label={`${title} – Inhaltsverzeichnis`}>
                {navigation.map((item) => (
                  <a href={`#${item.id}`} key={item.id}>
                    <span>{item.number}</span>
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className={styles.indexContact}>
                <span>Rückfragen</span>
                <a href="mailto:info@universale-dienstleistungen.de">
                  info@universale-dienstleistungen.de
                </a>
                <a href="tel:+491738948124">+49 173 8948124</a>
              </div>
            </aside>

            <div className={styles.content}>{children}</div>
          </div>
        </section>
      </main>

      <SiteFooter currentPage={currentPage} />
      <MobileCall />
    </>
  );
}

type LegalSectionProps = {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
  tone?: "default" | "accent";
};

export function LegalSection({
  id,
  number,
  title,
  children,
  tone = "default",
}: LegalSectionProps) {
  return (
    <article
      className={`${styles.section}${tone === "accent" ? ` ${styles.sectionAccent}` : ""}`}
      id={id}
      data-reveal
    >
      <span className={styles.sectionNumber}>{number}</span>
      <div className={styles.sectionBody}>
        <h2>{title}</h2>
        {children}
      </div>
    </article>
  );
}

export const legalStyles = styles;

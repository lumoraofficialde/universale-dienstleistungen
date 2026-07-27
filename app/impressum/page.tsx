import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  legalStyles as styles,
} from "../legal-page";

export const metadata: Metadata = {
  title: "Impressum | Universale Dienstleistungen",
  description:
    "Anbieterkennzeichnung und rechtliche Angaben der Universale Dienstleistungen GmbH in Büsum.",
};

const navigation = [
  { id: "anbieter", number: "01", label: "Anbieter" },
  { id: "register", number: "02", label: "Register & Kontakt" },
  { id: "streitbeilegung", number: "03", label: "Streitbeilegung" },
  { id: "rechte", number: "04", label: "Inhalte & Bildmaterial" },
];

export default function ImpressumPage() {
  return (
    <LegalPage
      currentPage="impressum"
      documentNumber="01"
      eyebrow="Rechtliches · Anbieterkennzeichnung"
      title="Impressum"
      intro="Klare Angaben zum Unternehmen, zu Kontaktwegen und zur gesetzlichen Vertretung."
      navigation={navigation}
    >
      <LegalSection id="anbieter" number="01" title="Angaben gemäß § 5 DDG" tone="accent">
        <div className={styles.address}>
          <strong>Universale Dienstleistungen GmbH</strong>
          <span>Westerstraße 3</span>
          <span>25761 Büsum</span>
          <span>Deutschland</span>
        </div>

        <dl className={styles.factRows}>
          <div>
            <dt>Vertreten durch</dt>
            <dd>Barran Uca</dd>
          </div>
          <div>
            <dt>Rechtsform</dt>
            <dd>Gesellschaft mit beschränkter Haftung (GmbH)</dd>
          </div>
        </dl>
      </LegalSection>

      <LegalSection id="register" number="02" title="Register und Kontakt">
        <dl className={styles.factRows}>
          <div>
            <dt>Registergericht</dt>
            <dd>Amtsgericht Pinneberg</dd>
          </div>
          <div>
            <dt>Registernummer</dt>
            <dd>HRB 18480 PI</dd>
          </div>
          <div>
            <dt>Telefon</dt>
            <dd><a href="tel:+491738948124">+49 173 8948124</a></dd>
          </div>
          <div>
            <dt>E-Mail</dt>
            <dd>
              <a href="mailto:info@universale-dienstleistungen.de">
                info@universale-dienstleistungen.de
              </a>
            </dd>
          </div>
        </dl>
      </LegalSection>

      <LegalSection id="streitbeilegung" number="03" title="Verbraucherstreitbeilegung">
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
        <p className={styles.note}>
          Die frühere europäische Plattform zur Online-Streitbeilegung wurde zum
          20. Juli 2025 eingestellt. Daher wird auf dieser Seite kein veralteter
          Plattform-Link mehr geführt.
        </p>
      </LegalSection>

      <LegalSection id="rechte" number="04" title="Inhalte und Bildmaterial">
        <p>
          Die Inhalte, Fotografien, Grafiken und die Gestaltung dieses
          Internetauftritts sind urheberrechtlich geschützt. Eine Verwendung
          außerhalb dieser Website ist nur im Rahmen der gesetzlichen
          Bestimmungen oder mit Zustimmung der jeweiligen Rechteinhaber zulässig.
        </p>
        <p>
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
          für Inhalte externer Links. Für den Inhalt verlinkter Seiten sind
          ausschließlich deren Betreiber verantwortlich.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

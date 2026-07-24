import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  legalStyles as styles,
} from "../legal-page";

export const metadata: Metadata = {
  title: "Datenschutz | Universale Dienstleistungen",
  description:
    "Datenschutzerklärung der Universale Dienstleistungen GmbH für diesen Internetauftritt.",
};

const navigation = [
  { id: "ueberblick", number: "01", label: "Überblick" },
  { id: "verantwortlich", number: "02", label: "Verantwortliche Stelle" },
  { id: "hosting", number: "03", label: "Hosting" },
  { id: "kontakt", number: "04", label: "Kontaktaufnahme" },
  { id: "technik", number: "05", label: "Cookies & Technik" },
  { id: "rechte", number: "06", label: "Ihre Rechte" },
  { id: "speicherdauer", number: "07", label: "Speicherdauer" },
];

export default function DatenschutzPage() {
  return (
    <LegalPage
      currentPage="datenschutz"
      documentNumber="02"
      eyebrow="Rechtliches · Umgang mit Daten"
      title="Datenschutz"
      intro="Welche Daten auf dieser Website anfallen, wofür sie benötigt werden und welche Rechte Sie haben."
      navigation={navigation}
    >
      <LegalSection id="ueberblick" number="01" title="Datenschutz auf einen Blick" tone="accent">
        <h3>Allgemeine Hinweise</h3>
        <p>
          Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
          identifiziert werden können. Die folgenden Hinweise erläutern, welche
          Daten beim Besuch dieser Website oder bei einer Kontaktaufnahme
          verarbeitet werden.
        </p>

        <h3>Wie werden Daten erfasst?</h3>
        <p>
          Technische Daten entstehen beim Aufruf der Website durch den
          Hosting-Anbieter. Weitere Daten erhalten wir nur, wenn Sie uns diese
          mitteilen – beispielsweise telefonisch, per E-Mail oder über die
          vorbereitete E-Mail-Anfrage auf der Kontaktseite.
        </p>

        <h3>Wofür werden Daten genutzt?</h3>
        <p>
          Technische Daten dienen der sicheren und fehlerfreien Bereitstellung
          des Internetauftritts. Von Ihnen übermittelte Kontaktdaten verwenden
          wir ausschließlich zur Bearbeitung Ihrer Anfrage und zur
          gegebenenfalls anschließenden Vertragsabwicklung.
        </p>
      </LegalSection>

      <LegalSection id="verantwortlich" number="02" title="Verantwortliche Stelle">
        <p>
          Verantwortliche Stelle ist die natürliche oder juristische Person,
          die allein oder gemeinsam mit anderen über die Zwecke und Mittel der
          Verarbeitung personenbezogener Daten entscheidet.
        </p>

        <div className={styles.address}>
          <strong>Universale Dienstleistungen GmbH</strong>
          <span>Barran Uca</span>
          <span>Westerstraße 3</span>
          <span>25761 Büsum</span>
          <a href="tel:+491738948124">+49 173 8948124</a>
          <a href="mailto:info@universale-dienstleistungen.de">
            info@universale-dienstleistungen.de
          </a>
        </div>
      </LegalSection>

      <LegalSection id="hosting" number="03" title="Hosting über GitHub Pages">
        <p>
          Diese Website wird als statische Website über GitHub Pages
          bereitgestellt. Anbieter ist GitHub, Inc., 88 Colin P. Kelly Jr. St.,
          San Francisco, CA 94107, USA. Ansprechpartner für den europäischen
          Raum ist GitHub B.V., Prins Bernhardplein 200, 1097 JB Amsterdam,
          Niederlande.
        </p>
        <p>
          Nach Angaben von GitHub wird beim Besuch einer GitHub-Pages-Website
          die IP-Adresse der Besucher zu Sicherheitszwecken protokolliert und
          gespeichert. Die Verarbeitung erfolgt zur sicheren, schnellen und
          zuverlässigen Bereitstellung unseres Internetangebots auf Grundlage
          von Art. 6 Abs. 1 lit. f DSGVO.
        </p>

        <h3>Datenübermittlung in Drittländer</h3>
        <p>
          Eine Verarbeitung kann auch in den USA oder anderen Ländern
          stattfinden. GitHub stützt internationale Übermittlungen nach eigenen
          Angaben unter anderem auf die Standardvertragsklauseln der
          Europäischen Kommission und ist nach dem EU-U.S. Data Privacy
          Framework zertifiziert.
        </p>
        <p className={styles.note}>
          Weitere Informationen:{" "}
          <a
            href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement"
            target="_blank"
            rel="noreferrer"
          >
            Datenschutzerklärung von GitHub
          </a>
        </p>
      </LegalSection>

      <LegalSection id="kontakt" number="04" title="Kontaktaufnahme">
        <h3>Anfrageformular</h3>
        <p>
          Das Formular auf dieser Website sendet keine Daten an einen eigenen
          Webserver. Ihre Eingaben werden zunächst ausschließlich lokal in
          Ihrem Browser verarbeitet. Beim Absenden öffnet die Website Ihr
          E-Mail-Programm mit einer vorbereiteten Nachricht. Erst wenn Sie
          diese Nachricht dort versenden, werden die enthaltenen Angaben über
          Ihren E-Mail-Anbieter an uns übermittelt.
        </p>

        <h3>E-Mail und Telefon</h3>
        <p>
          Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir
          Ihre Anfrage und die daraus hervorgehenden personenbezogenen Daten
          zur Bearbeitung Ihres Anliegens. Eine Weitergabe erfolgt nicht ohne
          Ihre Einwilligung, sofern sie nicht zur Vertragsdurchführung
          erforderlich oder gesetzlich vorgeschrieben ist.
        </p>

        <h3>Rechtsgrundlagen</h3>
        <p>
          Bezieht sich Ihre Anfrage auf einen Vertrag oder vorvertragliche
          Maßnahmen, erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1
          lit. b DSGVO. In sonstigen Fällen beruht sie auf unserem berechtigten
          Interesse an einer effektiven Bearbeitung Ihrer Anfrage gemäß Art. 6
          Abs. 1 lit. f DSGVO oder – sofern abgefragt – auf Ihrer Einwilligung
          gemäß Art. 6 Abs. 1 lit. a DSGVO.
        </p>
      </LegalSection>

      <LegalSection id="technik" number="05" title="Cookies, Analyse und Technik">
        <h3>Keine Analyse- oder Marketingdienste</h3>
        <p>
          Der Websitebetreiber setzt auf dieser Website keine eigenen
          Analyse-, Marketing- oder Trackingdienste ein. Es werden keine
          Werbenetzwerke, Social-Media-Plugins oder extern eingebetteten Videos
          geladen.
        </p>

        <h3>Lokal bereitgestellte Schriften und Bilder</h3>
        <p>
          Die verwendeten Schriften, Bilder und Gestaltungselemente werden
          direkt mit dieser Website ausgeliefert. Beim Laden dieser Inhalte
          wird keine Verbindung zu Google Fonts, Bilddatenbanken oder anderen
          externen Inhaltsanbietern hergestellt.
        </p>

        <h3>SSL- beziehungsweise TLS-Verschlüsselung</h3>
        <p>
          Die Website wird verschlüsselt übertragen. Eine verschlüsselte
          Verbindung erkennen Sie am „https://“ in der Adresszeile Ihres
          Browsers. Dadurch können übertragene Daten nicht ohne Weiteres von
          Dritten mitgelesen werden.
        </p>
      </LegalSection>

      <LegalSection id="rechte" number="06" title="Ihre Datenschutzrechte">
        <p>
          Im Rahmen der geltenden gesetzlichen Bestimmungen haben Sie
          insbesondere folgende Rechte:
        </p>
        <ul>
          <li>Auskunft über Ihre gespeicherten personenbezogenen Daten nach Art. 15 DSGVO</li>
          <li>Berichtigung unrichtiger Daten nach Art. 16 DSGVO</li>
          <li>Löschung Ihrer Daten nach Art. 17 DSGVO</li>
          <li>Einschränkung der Verarbeitung nach Art. 18 DSGVO</li>
          <li>Datenübertragbarkeit nach Art. 20 DSGVO</li>
          <li>Widerspruch gegen bestimmte Verarbeitungen nach Art. 21 DSGVO</li>
          <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft</li>
        </ul>

        <h3>Beschwerderecht</h3>
        <p>
          Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer
          personenbezogenen Daten gegen die DSGVO verstößt, steht Ihnen ein
          Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu. Sie können
          sich insbesondere an die Aufsichtsbehörde Ihres gewöhnlichen
          Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen
          Verstoßes wenden.
        </p>
      </LegalSection>

      <LegalSection id="speicherdauer" number="07" title="Speicherdauer und Änderungen">
        <p>
          Soweit in dieser Erklärung keine speziellere Speicherdauer genannt
          wird, speichern wir personenbezogene Daten nur so lange, wie sie für
          den jeweiligen Zweck erforderlich sind. Daten aus Anfragen werden
          gelöscht, sobald das Anliegen abschließend bearbeitet ist und keine
          gesetzlichen Aufbewahrungspflichten oder sonstigen rechtmäßigen
          Gründe für eine weitere Speicherung bestehen.
        </p>
        <p>
          Wir passen diese Datenschutzerklärung an, wenn sich die technische
          Funktionsweise der Website, die eingesetzten Dienstleister oder die
          rechtlichen Anforderungen ändern.
        </p>
        <p className={`${styles.note} ${styles.caps}`}>Stand: 24. Juli 2026</p>
      </LegalSection>
    </LegalPage>
  );
}

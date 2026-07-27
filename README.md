# Universale Dienstleistungen

Neugestaltete, statisch exportierte Website der Universale
Dienstleistungen GmbH. Das Projekt ist für GitHub Pages vorbereitet.

## Lokale Entwicklung

Voraussetzung: Node.js 24 und npm.

```bash
npm install
npm run dev
```

Danach `http://localhost:3000` öffnen.

## Vollständige Prüfung

```bash
npm test
npm run lint
npx tsc --noEmit
npm audit --omit=dev
```

`npm test` erstellt den statischen Export in `dist/client` und prüft Seiten,
Metadaten, Assets, interne Links und Sprungziele.

## Preview- und Produktionskonfiguration

Die GitHub-Action veröffentlicht aktuell eine **nicht indexierbare Preview**
unter:

`https://lumoraofficialde.github.io/universale-dienstleistungen/`

| Umgebung | `NEXT_PUBLIC_BASE_PATH` | `NEXT_PUBLIC_SITE_URL` | `NEXT_PUBLIC_PREVIEW` |
| --- | --- | --- | --- |
| GitHub-Preview | `/universale-dienstleistungen` | Preview-URL | `true` |
| Kundendomain | leer | `https://universale-dienstleistungen.de` | `false` oder nicht gesetzt |

Bei `NEXT_PUBLIC_PREVIEW=true` erzeugt der Build `noindex, nofollow` und eine
blockierende `robots.txt`. Vor dem produktiven Domain-Cutover müssen die drei
Variablen in `.github/workflows/deploy-pages.yml` gemeinsam umgestellt und der
Build erneut geprüft werden.

## Veröffentlichung über GitHub Pages

1. Änderungen committen und auf `main` pushen.
2. Unter **Settings → Pages → Build and deployment** die Quelle
   **GitHub Actions** auswählen.
3. Den Workflow **Deploy to GitHub Pages** vollständig durchlaufen lassen.
4. Die Preview mit der unten stehenden Smoke-Test-Liste prüfen.
5. Erst danach die Kundendomain in GitHub Pages eintragen und die Web-DNS-Einträge
   gemäß der aktuellen GitHub-Pages-Dokumentation umstellen.
6. HTTPS in GitHub Pages aktivieren und nach der Zertifikatsausstellung erneut
   prüfen.

Wichtig: Beim Domain-Cutover ausschließlich die für die Website benötigten
Web-Einträge ändern. Die bestehenden E-Mail-Einträge für MX, SPF, DKIM und
DMARC dürfen nicht überschrieben werden, sonst kann
`info@universale-dienstleistungen.de` ausfallen. Vor der Änderung die bisherigen
DNS-Werte und deren TTL dokumentieren.

Eine `CNAME`-Datei wird bewusst erst ergänzt, wenn die Domain in GitHub Pages
verbindlich eingerichtet ist. So übernimmt die Preview nicht versehentlich die
noch produktive Kundendomain.

## Kontaktformular

Das Formular erstellt aktuell eine vorbereitete E-Mail und öffnet das lokale
E-Mail-Programm. Es überträgt keine Daten an einen Formularserver.

Vor bezahlter Werbung wird ein echter Formular-Endpunkt empfohlen. Die
Implementierung muss mindestens Folgendes enthalten:

- serverseitige Validierung und Spam-Schutz,
- eindeutige Lade-, Fehler- und Erfolgsmeldungen,
- Schutz vor Mehrfachübermittlung,
- keine geheimen Schlüssel im Browser,
- dokumentierte Aufbewahrung und Empfänger der Anfragedaten,
- angepasste Datenschutzerklärung und abschließender Funktionstest.

Solange kein Anbieter und keine datenschutzrechtliche Grundlage bestätigt sind,
bleibt der bewusst transparente E-Mail-Fallback bestehen.

## Medien und Bildrechte

Vor dem Livegang muss für jedes veröffentlichte Bild ein nachvollziehbarer
Quelle-, Lizenz- oder Freigabenachweis abgelegt werden. Die aktuelle Prüfliste
steht in [docs/MEDIA-LICENSES.md](docs/MEDIA-LICENSES.md). Symbolbilder sind auf
der Website sichtbar als solche gekennzeichnet; diese Kennzeichnung ersetzt
keinen Nutzungsnachweis.

## Smoke-Test vor Freigabe

- Startseite, Über-uns-Seite, Impressum, Datenschutz und 404 direkt aufrufen.
- Alle Navigationselemente, Sprunglinks, Telefon-, E-Mail- und Footer-Links
  auslösen.
- Formularvalidierung, E-Mail-Fallback und Kopierfunktion prüfen.
- Mobile Navigation bei 320, 390 und 768 px inklusive Tastatur und Escape testen.
- Layout zusätzlich bei 1024, 1366, 1440 und 1920 px kontrollieren.
- Browserkonsole und Netzwerkprotokoll auf Fehler und 404-Antworten prüfen.
- Canonical, Open Graph, Favicon, `robots.txt` und `sitemap.xml` auf die
  endgültige Domain kontrollieren.
- `https://` und Weiterleitung von `www` zur gewünschten Hauptdomain prüfen.
- E-Mail-Empfang nach der DNS-Änderung separat verifizieren.

## Rollback

Vor dem Cutover den letzten funktionierenden Deployment-Stand und die bisherigen
Web-DNS-Werte sichern. Bei einem Fehler:

1. den letzten funktionierenden Commit erneut deployen oder den fehlerhaften
   Release-Commit revertieren,
2. falls die neue Domain nicht erreichbar ist, nur die zuvor dokumentierten
   Web-DNS-Einträge zurücksetzen,
3. E-Mail-Einträge unverändert lassen,
4. nach Ablauf der DNS-TTL Website, HTTPS und E-Mail erneut prüfen.

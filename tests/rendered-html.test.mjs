import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const expectedSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://universale-dienstleistungen.de"
).replace(/\/+$/, "");
const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "true";

test("exports a complete static site", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<html lang="de">/i);
  assert.ok(html.trimEnd().endsWith("</html>"));
  assert.doesNotMatch(html, /<\/html>\s*<script/i);
  assert.match(html, /<title>Universale Dienstleistungen/i);
  assert.match(html, /Vier Leistungen\./);
  assert.doesNotMatch(html, /Universale Qualit/);
  assert.doesNotMatch(html, /Wir verlassen eine/);
  assert.match(html, /Ein Objekt\./);
  assert.match(html, /Vier Bereiche\./);
  assert.match(html, /Ein Ansprechpartner\./);
  assert.match(html, /private und gewerbliche Objekte in Norddeutschland/);
  assert.match(html, /Was wir konkret/);
  assert.match(html, /für Sie übernehmen\./);
  assert.match(html, /Pflege, Reinigung und Betreuung privater/);
  assert.match(html, /Treppen, Aufgänge und Gehwege/);
  assert.match(html, /Vier Leistungsbereiche/);
  assert.match(html, /Regelm\u00e4\u00dfig gepflegt\./);
  assert.match(html, /Saisonal ger\u00e4umt\./);
  assert.match(html, /Gebündelt erledigt\./);
  assert.match(html, /Einmalig organisiert\./);
  assert.match(html, /Situation besprechen/);
  assert.doesNotMatch(html, /Was oben/);
  assert.doesNotMatch(html, /Vorher-Nachher-Vergleich/);
  assert.doesNotMatch(html, /Arbeit, die man sieht\./);
  assert.doesNotMatch(html, /Wir halten Immobilien/);
  assert.match(html, /24 Stunden am Tag, 7 Tage die Woche erreichbar/);
  assert.match(html, /Von der Kante bis zur Großfläche\./);
  assert.match(html, /Saubere Konturen\./);
  assert.match(html, /Präzise am Objekt\./);
  assert.match(html, /Effizient auf Fläche\./);
  assert.match(html, /Passend transportiert\./);
  assert.match(html, /Winter/);
  assert.match(html, /Drei Schritte\./);
  assert.match(html, /Sie erzählen\./);
  assert.match(html, /Wir kl\u00e4ren\./);
  assert.match(html, /Wir erledigen\./);
  assert.doesNotMatch(html, /class="[^"]*\bundefined\b/);
  assert.doesNotMatch(html, /Worauf Sie sich verlassen können\./);
  assert.match(html, /Welche Leistung brauchen Sie\?/);
  assert.match(html, /id="faq"/);
  assert.match(html, /Was vor einer Anfrage/);
  assert.match(html, /Wie wird der Preis bestimmt\?/);
  assert.match(html, /Welche Flächen deckt der Winterdienst ab\?/);
  assert.match(html, /Universale Dienstleistungen GmbH · Amtsgericht Pinneberg/);
  assert.match(html, /Räumfahrzeuge mit integriertem Streusystem/);
  assert.match(html, /3,5-t-Einsatzfahrzeug/);
  assert.match(html, /id="kontakt"/);
  assert.ok(
    html.includes(`rel="canonical" href="${expectedSiteUrl}/"`),
    "the canonical URL should match NEXT_PUBLIC_SITE_URL",
  );
  assert.match(html, /og\.jpg/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"postalCode":"25761"/);

  const teamHtml = await readFile(
    new URL("../dist/client/team/index.html", import.meta.url),
    "utf8",
  );
  assert.match(teamHtml, /Klare Abl\u00e4ufe\./);
  assert.match(teamHtml, /Klare Verantwortung\./);
  assert.match(teamHtml, /Woran gute Arbeit erkennbar wird\./);
  assert.match(teamHtml, /Nachvollziehbare Unternehmensangaben/);
  assert.match(teamHtml, /Amtsgericht Pinneberg · HRB 18480 PI/);
  assert.match(teamHtml, /Barran Uca/);

  const impressumHtml = await readFile(
    new URL("../dist/client/impressum/index.html", import.meta.url),
    "utf8",
  );
  assert.match(impressumHtml, /Angaben gem\u00e4\u00df \u00a7 5 DDG/);
  assert.match(impressumHtml, /Amtsgericht Pinneberg/);
  assert.match(impressumHtml, /HRB 18480 PI/);
  assert.match(impressumHtml, /Geschäftsführer/);
  assert.match(impressumHtml, /Verbraucherstreitbeilegung/);

  const datenschutzHtml = await readFile(
    new URL("../dist/client/datenschutz/index.html", import.meta.url),
    "utf8",
  );
  assert.match(datenschutzHtml, /Hosting \u00fcber GitHub Pages/);
  assert.match(datenschutzHtml, /keine eigenen Analyse-, Marketing- oder Trackingdienste/);
  assert.match(datenschutzHtml, /ausschlie\u00dflich lokal in Ihrem Browser/);
  assert.match(datenschutzHtml, /Ihre Datenschutzrechte/);

  const notFoundHtml = await readFile(
    new URL("../dist/client/404.html", import.meta.url),
    "utf8",
  );
  assert.match(notFoundHtml, /Diese Fläche haben wir nicht gefunden\./);
  assert.match(notFoundHtml, /Zur Startseite/);
  assert.match(notFoundHtml, /Leistungen ansehen/);
  assert.match(notFoundHtml, /Direkt anrufen/);
  assert.match(
    notFoundHtml,
    /<title>Seite nicht gefunden \| Universale Dienstleistungen<\/title>/,
  );
  assert.equal(
    [...notFoundHtml.matchAll(/<meta name="robots"[^>]*>/g)].length,
    1,
  );
  assert.match(
    notFoundHtml,
    /<meta name="robots" content="noindex, nofollow"\/>/,
  );
  assert.doesNotMatch(notFoundHtml, /<link\b[^>]*rel="canonical"/i);
  assert.doesNotMatch(notFoundHtml, /<meta\b[^>]*property="og:url"/i);
  assert.doesNotMatch(notFoundHtml, /Unexpectedly client reference/);
  assert.match(
    notFoundHtml,
    /href="(?:\/universale-dienstleistungen)?\/#leistungen"/,
  );

  assert.match(
    html,
    /href="(?:\/universale-dienstleistungen)?\/datenschutz\/"/,
  );
  assert.match(
    html,
    /href="(?:\/universale-dienstleistungen)?\/impressum\/"/,
  );
});

test("keeps the Pages asset prefix, original motion, and natural skin wired in", async () => {
  const [
    page,
    shell,
    team,
    activeIntro,
    chronogarten,
    chronogartenCss,
    fleetJourney,
    fleetJourneyCss,
    processImpulseJourney,
    processImpulseJourneyCss,
    serviceCatalog,
    css,
    naturalCss,
    layout,
    nextConfig,
    viteConfig,
  ] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-shell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/team/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/concepts/active-intro.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/concepts/chronogarten.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/concepts/chronogarten.module.css", import.meta.url), "utf8"),
    readFile(new URL("../app/concepts/fleet-scale-journey.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/concepts/fleet-scale-journey.module.css", import.meta.url), "utf8"),
    readFile(new URL("../app/concepts/process-impulse-journey.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/concepts/process-impulse-journey.module.css", import.meta.url), "utf8"),
    readFile(new URL("../app/service-catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/natural.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
  ]);

  assert.match(shell, /NEXT_PUBLIC_BASE_PATH/);
  assert.doesNotMatch(page, /data-scroll-parallax/);
  assert.match(team, /data-scroll-parallax/);
  assert.doesNotMatch(page, /data-process-reveal/);
  assert.doesNotMatch(shell, /processObserver/);
  assert.match(shell, /Math\.min\(y \* 0\.58, 280\)/);
  assert.doesNotMatch(page, /Kompetenz durch Erfahrung/);
  assert.doesNotMatch(page, /hero-proof/);
  assert.match(page, /readiness-rail__track/);
  assert.match(page, /event\.pointerType !== "mouse"/);
  assert.match(page, /\(hover: hover\) and \(pointer: fine\)/);
  assert.match(shell, /classList\.toggle\(\s*"is-past"/);
  assert.match(shell, /handleHashNavigation/);
  assert.match(shell, /addEventListener\(\s*"click",\s*handleHashNavigation/);
  assert.match(shell, /__VINEXT_RSC_NAVIGATE__/);
  assert.match(shell, /const isSameDocument =/);
  assert.match(shell, /handleStaticNavigation/);
  assert.doesNotMatch(shell, /dataset\.season/);
  assert.doesNotMatch(page, /data-season-story/);
  assert.match(page, /ActiveIntroConcept/);
  assert.match(activeIntro, /Chronogarten/);
  assert.doesNotMatch(activeIntro, /TerraSchnitt/);
  assert.match(chronogarten, /data-stage/);
  assert.match(chronogarten, /IntersectionObserver/);
  assert.match(chronogarten, /prefers-reduced-motion/);
  assert.match(chronogarten, /serviceCatalog/);
  assert.match(chronogarten, /chronogarten-garten\.webp/);
  assert.match(chronogarten, /chronogarten-winter\.webp/);
  assert.doesNotMatch(chronogarten, /addEventListener\("scroll"/);
  assert.match(chronogartenCss, /min-height:\s*380dvh/);
  assert.match(chronogartenCss, /--chrono-top:\s*76px/);
  assert.match(
    chronogartenCss,
    /@media \(max-width: 780px\)[\s\S]*?--chrono-top:\s*68px/,
  );
  assert.match(chronogartenCss, /prefers-reduced-motion:\s*reduce/);
  assert.equal([...serviceCatalog.matchAll(/\bid:\s*"/g)].length, 4);
  for (const serviceName of [
    "Garten & Hauspflege",
    "Winterdienst",
    "Hausmeisterservice",
    "Entrümpelung",
  ]) {
    assert.ok(serviceCatalog.includes(serviceName));
  }
  assert.match(page, /service-picker__grid/);
  assert.match(page, /selectedService/);
  assert.match(page, /Anfrage als E-Mail öffnen/);
  assert.match(page, /request-fallback/);
  assert.match(
    page,
    /import\s*\{[\s\S]*?\bbasePath\b[\s\S]*?\}\s*from\s*["']\.\/site-shell["']/,
  );
  assert.match(page, /services-stack-nav/);
  assert.match(page, /data-stack-card/);
  assert.match(page, /data-stack-segment/);
  assert.match(page, /Einsatzmodell/);
  assert.match(page, /Situation besprechen/);
  assert.match(shell, /is-stack-active/);
  assert.match(shell, /data-stack-current/);
  assert.match(shell, /\[data-nav-section\]/);
  assert.match(shell, /activeSection/);
  assert.match(shell, /return "location" as const/);
  assert.match(page, /data-nav-section="einsatzarten"/);
  assert.match(page, /data-nav-section="kontakt"/);
  assert.match(chronogarten, /data-nav-section="leistungen"/);
  assert.doesNotMatch(fleetJourney, /data-nav-section=/);
  assert.match(chronogarten, /aria-live="polite"/);
  assert.doesNotMatch(page, /service-marquee/);
  assert.doesNotMatch(page, /Objektservice/);
  assert.doesNotMatch(page, /function ServicesEmblem/);
  assert.doesNotMatch(page, /Arbeit, die man sieht\./);
  assert.doesNotMatch(page, /Wir halten Immobilien/);
  assert.doesNotMatch(page, /services-heading/);
  assert.doesNotMatch(page, /image-break/);
  assert.doesNotMatch(page, /tree-shaping/);
  assert.match(page, /FleetScaleJourney/);
  assert.doesNotMatch(page, /FleetGlyph/);
  assert.doesNotMatch(page, /fleetScenarios/);
  assert.match(fleetJourney, /Von der Kante bis zur Großfläche\./);
  assert.match(fleetJourney, /gsap/);
  assert.match(fleetJourney, /ScrollTrigger/);
  assert.match(fleetJourney, /scrub:\s*0\.7/);
  assert.match(fleetJourney, /data-fleet-journey-marker/);
  assert.match(fleetJourney, /aria-current/);
  assert.match(fleetJourney, /prefers-reduced-motion/);
  assert.match(fleetJourney, /massstabsreise-landschaft-sommer\.webp/);
  assert.match(fleetJourney, /massstabsreise-landschaft-winter\.webp/);
  assert.match(fleetJourney, /massstabsreise-kante\.webp/);
  assert.doesNotMatch(fleetJourney, /addEventListener\(\s*["']scroll/);
  for (const fleetName of [
    "Räumfahrzeuge mit integriertem Streusystem",
    "Mobile Schneefräsen",
    "Mähwerke für Großflächen",
    "Wendige Mähtechnik",
    "Technik für Hecken- und Rückschnitt",
    "3,5-t-Einsatzfahrzeug",
  ]) {
    assert.ok(fleetJourney.includes(fleetName));
  }
  assert.doesNotMatch(page, /<figcaption>/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /html\s*\{[\s\S]*?scroll-padding-top:\s*76px/);
  assert.match(
    css,
    /@media \(max-width: 780px\)[\s\S]*?html\s*\{\s*scroll-padding-top:\s*68px/,
  );
  assert.doesNotMatch(css, /terraschnitt/);
  assert.match(css, /@keyframes readiness-marquee/);
  assert.doesNotMatch(css, /\.process-intro/);
  assert.doesNotMatch(css, /\.process-card/);
  assert.match(css, /\.hero-media\s*\{[\s\S]*?inset:\s*0/);
  assert.match(css, /\.services-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(12, 1fr\)/);
  assert.match(
    css,
    /@media \(max-width: 780px\)[\s\S]*?\.service-card,[\s\S]*?position:\s*sticky/,
  );
  assert.match(css, /\.services-stack-nav__segments/);
  assert.match(css, /\.is-stack-past/);
  assert.match(layout, /import "\.\/natural\.css"/);
  assert.match(naturalCss, /natural-paper-texture\.webp/);
  assert.doesNotMatch(naturalCss, /natural-paint-stroke/);
  assert.match(naturalCss, /natural-grass-ornament\.webp/);
  assert.doesNotMatch(naturalCss, /\[data-reveal/);
  assert.doesNotMatch(naturalCss, /\.process-intro/);
  assert.doesNotMatch(naturalCss, /\.process-card/);
  assert.doesNotMatch(naturalCss, /\.hero-media\s*\{/);
  assert.doesNotMatch(naturalCss, /\.services-grid\s*\{/);
  assert.doesNotMatch(naturalCss, /\.services-heading/);
  assert.doesNotMatch(naturalCss, /\.image-break/);
  assert.doesNotMatch(naturalCss, /\.mobile-call\s*\{/);
  assert.match(
    css,
    /\.mobile-call\s*\{[\s\S]*?background:\s*var\(--acid\)/,
  );
  assert.match(fleetJourneyCss, /min-height:\s*360dvh/);
  assert.match(fleetJourneyCss, /position:\s*sticky/);
  assert.match(fleetJourneyCss, /@media \(max-width: 780px\)/);
  assert.match(
    fleetJourneyCss,
    /@media \(max-width: 780px\)[\s\S]*?\.layer img\s*\{[\s\S]*?left:\s*50%;[\s\S]*?transform:\s*translateX\(-50%\)/,
  );
  assert.match(fleetJourneyCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(fleetJourneyCss, /min-height:\s*auto/);
  assert.doesNotMatch(css, /\.fleet-architect/);
  assert.doesNotMatch(naturalCss, /\.fleet-architect/);
  assert.doesNotMatch(css, /\.fleet-photo\s*\{/);
  assert.doesNotMatch(naturalCss, /\.fleet-item\s*\{/);
  assert.match(page, /ProcessImpulseJourney/);
  assert.match(processImpulseJourney, /gsap\.context/);
  assert.match(processImpulseJourney, /ScrollTrigger/);
  assert.match(processImpulseJourney, /MotionPathPlugin/);
  assert.match(processImpulseJourney, /getTotalLength\(\)/);
  assert.match(processImpulseJourney, /strokeDasharray/);
  assert.match(processImpulseJourney, /scrub:\s*isMobile\s*\?\s*0\.55\s*:\s*0\.65/);
  assert.match(processImpulseJourney, /prefers-reduced-motion/);
  assert.match(processImpulseJourney, /aria-labelledby="process-impulse-title"/);
  assert.match(processImpulseJourney, /process-impulse-panorama\.webp/);
  assert.match(processImpulseJourney, /Einsatzort, Aufgabe und gewünschten Zeitraum/);
  assert.match(processImpulseJourney, /Leistungsumfang, Preisgrundlage, Termin, Personal und Technik/);
  assert.match(processImpulseJourney, /Umsetzung, Rückmeldung und Übergabe/);
  assert.doesNotMatch(processImpulseJourney, /addEventListener\(\s*["']scroll/);
  assert.doesNotMatch(processImpulseJourney, /killAll/);
  assert.match(processImpulseJourneyCss, /min-height:\s*300dvh/);
  assert.match(processImpulseJourneyCss, /min-height:\s*280dvh/);
  assert.match(processImpulseJourneyCss, /position:\s*sticky/);
  assert.match(processImpulseJourneyCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(processImpulseJourneyCss, /min-height:\s*auto/);
  assert.match(
    css,
    /\.readiness-rail__track\s*\{[\s\S]*?animation:\s*none;[\s\S]*?will-change:\s*auto/,
  );
  assert.match(
    css,
    /\.readiness-rail span\s*\{[\s\S]*?font-size:\s*clamp\(2\.6rem, 12vw, 4rem\)/,
  );
  assert.match(
    css,
    /@media \(max-width: 780px\)[\s\S]*?\.hero-kicker\s*\{\s*display:\s*none;/,
  );
  assert.match(nextConfig, /output:\s*"export"/);
  assert.match(viteConfig, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(viteConfig, /base:/);
  assert.match(team, /SiteHeader currentPage="team"/);
  assert.match(team, /Symbolbild · abgestimmter Einsatz/);
  assert.match(team, /team-portrait__frame/);
  assert.doesNotMatch(team, /Menschen\. Technik\. Ergebnis\./);
  assert.doesNotMatch(team, /team-gallery/);
  assert.match(shell, /className="mobile-call"/);
  assert.match(shell, /aria-label="Jetzt anrufen: \+49 173 8948124"/);
  assert.match(shell, /<svg[\s\S]*?<path/);
  assert.doesNotMatch(shell, /<strong>24\/7 anrufen<\/strong>/);
  assert.match(
    shell,
    /\["Leistungen",\s*homeHref\("#leistungen"\),\s*"leistungen"\]/,
  );
  assert.match(
    shell,
    /\["Einsatzmodelle",\s*homeHref\("#einsatzmodelle"\),\s*"einsatzarten"\]/,
  );
  assert.match(shell, /normalizePathname/);
  assert.match(shell, /if \(!isSameDocument \|\| !nextUrl\.hash\) return/);
  assert.doesNotMatch(shell, /data-home-section|dataset\.homeSection/);
  assert.match(shell, /mobileMotion\.matches/);
  assert.match(fleetJourney, /staticMedia\.matches/);
  assert.match(
    css,
    /\.mobile-call\s*\{[\s\S]*?right:\s*calc\(12px \+ env\(safe-area-inset-right\)\)[\s\S]*?width:\s*48px[\s\S]*?border-radius:\s*50%/,
  );
  assert.match(
    css,
    /A native document flow[\s\S]*?\.services-grid\s*\{[\s\S]*?display:\s*flex;[\s\S]*?flex-direction:\s*column/,
  );
  assert.match(
    css,
    /A native document flow[\s\S]*?\.service-card,[\s\S]*?position:\s*relative;[\s\S]*?width:\s*100%;[\s\S]*?min-width:\s*0/,
  );
  assert.match(
    css,
    /\.motion-ready \[data-reveal\],[\s\S]*?transition:\s*none;[\s\S]*?will-change:\s*auto/,
  );
  assert.match(shell, /\["Über uns",/);
});

test("ships optimized responsive visual assets", async () => {
  const mediaRoot = new URL("../public/media/", import.meta.url);
  const files = await readdir(mediaRoot);
  assert.ok(files.includes("natural-paper-texture.webp"));
  assert.ok(files.includes("natural-grass-ornament.webp"));
  assert.ok(files.includes("universale-logo-160.webp"));
  assert.ok(files.includes("gardener-trimming-1280.webp"));
  assert.ok(files.includes("snow-clearing-1280.webp"));
  const fleetJourneyAssets = [
    "massstabsreise-kante.webp",
    "massstabsreise-kante-960.webp",
    "massstabsreise-landschaft-sommer.webp",
    "massstabsreise-landschaft-sommer-960.webp",
    "massstabsreise-landschaft-winter.webp",
    "massstabsreise-landschaft-winter-960.webp",
  ];
  fleetJourneyAssets.forEach((file) => assert.ok(files.includes(file)));
  const chronogartenAssets = [
    "chronogarten-intro.webp",
    "chronogarten-intro-960.webp",
    "chronogarten-garten.webp",
    "chronogarten-garten-960.webp",
    "chronogarten-hausmeister.webp",
    "chronogarten-hausmeister-960.webp",
    "chronogarten-entruempelung.webp",
    "chronogarten-entruempelung-960.webp",
    "chronogarten-winter.webp",
    "chronogarten-winter-960.webp",
  ];
  chronogartenAssets.forEach((file) => assert.ok(files.includes(file)));
  const processImpulseAssets = [
    "process-impulse-panorama.webp",
    "process-impulse-panorama-960.webp",
  ];
  processImpulseAssets.forEach((file) => assert.ok(files.includes(file)));
  assert.ok(!files.includes("terraschnitt-finished.jpg"));
  assert.ok(!files.includes("terraschnitt-before.jpg"));
  assert.ok(!files.includes("natural-paper-texture.png"));
  assert.ok(!files.includes("natural-paint-stroke.png"));

  const paper = await stat(new URL("natural-paper-texture.webp", mediaRoot));
  const grass = await stat(new URL("natural-grass-ornament.webp", mediaRoot));
  assert.ok(paper.size < 100_000, `Paper texture is still too large: ${paper.size}`);
  assert.ok(grass.size < 300_000, `Grass ornament is still too large: ${grass.size}`);
  for (const file of chronogartenAssets) {
    const asset = await stat(new URL(file, mediaRoot));
    assert.ok(asset.size < 500_000, `${file} is still too large: ${asset.size}`);
  }
  for (const file of fleetJourneyAssets) {
    const asset = await stat(new URL(file, mediaRoot));
    assert.ok(asset.size < 750_000, `${file} is still too large: ${asset.size}`);
  }
  for (const file of processImpulseAssets) {
    const asset = await stat(new URL(file, mediaRoot));
    assert.ok(asset.size < 400_000, `${file} is still too large: ${asset.size}`);
  }
});

test("exports valid prefixed asset references", async () => {
  const outputRoot = new URL("../dist/client/", import.meta.url);
  const html = await readFile(new URL("index.html", outputRoot), "utf8");
  const assetDirectory = new URL("assets/", outputRoot);
  const cssFiles = (await readdir(assetDirectory)).filter((name) =>
    name.endsWith(".css"),
  );
  const css = (
    await Promise.all(
      cssFiles.map((name) => readFile(new URL(name, assetDirectory), "utf8")),
    )
  ).join("\n");

  const references = [
    ...[...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(
      (match) => match[1],
    ),
    ...[...css.matchAll(/url\(([^)]+)\)/g)].map((match) =>
      match[1].replaceAll(/["']/g, ""),
    ),
  ].filter((reference) =>
    /^\/(?:.+\/)?(?:assets|media|fonts)\//.test(reference),
  );

  const expectedBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  assert.ok(references.length > 0);

  for (const reference of references) {
    if (expectedBasePath) {
      assert.ok(
        reference.startsWith(`${expectedBasePath}/`),
        `Missing Pages prefix: ${reference}`,
      );
    }

    const withoutBasePath = expectedBasePath
      ? reference.slice(expectedBasePath.length + 1)
      : reference.slice(1);
    await access(new URL(withoutBasePath, outputRoot));
  }
});

test("keeps every rendered internal link and anchor reachable", async () => {
  const outputRoot = new URL("../dist/client/", import.meta.url);
  const routes = new Map([
    ["/", "index.html"],
    ["/team/", "team/index.html"],
    ["/impressum/", "impressum/index.html"],
    ["/datenschutz/", "datenschutz/index.html"],
  ]);
  const htmlByRoute = new Map(
    await Promise.all(
      [...routes].map(async ([route, file]) => [
        route,
        await readFile(new URL(file, outputRoot), "utf8"),
      ]),
    ),
  );
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  for (const [currentRoute, html] of htmlByRoute) {
    const currentUrl = `https://example.test${basePath}${currentRoute}`;
    const hrefs = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map(
      (match) => match[1].replaceAll("&amp;", "&"),
    );

    for (const href of hrefs) {
      if (/^(?:mailto:|tel:|https?:\/\/)/i.test(href)) continue;

      const resolved = new URL(href, currentUrl);
      let route = resolved.pathname;
      if (basePath && route.startsWith(basePath)) {
        route = route.slice(basePath.length) || "/";
      }
      if (!route.endsWith("/")) route += "/";

      assert.ok(
        htmlByRoute.has(route),
        `Missing route for ${href} linked from ${currentRoute}`,
      );

      if (resolved.hash) {
        const id = decodeURIComponent(resolved.hash.slice(1));
        assert.match(
          htmlByRoute.get(route),
          new RegExp(`\\bid="${id.replaceAll(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}"`),
          `Missing #${id} target for ${href} linked from ${currentRoute}`,
        );
      }
    }
  }

  await access(new URL("robots.txt", outputRoot));
  await access(new URL("sitemap.xml", outputRoot));
  const robots = await readFile(new URL("robots.txt", outputRoot), "utf8");
  const sitemap = await readFile(new URL("sitemap.xml", outputRoot), "utf8");
  if (isPreview) {
    assert.match(robots, /Disallow: \//);
    assert.doesNotMatch(robots, /Sitemap:/);
  } else {
    assert.match(robots, new RegExp(`Sitemap: ${expectedSiteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/sitemap\\.xml`));
  }
  assert.match(sitemap, new RegExp(`<loc>${expectedSiteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/</loc>`));
  await access(new URL("favicon.png", outputRoot));
  await access(new URL("og.jpg", outputRoot));
});

import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

test("exports a complete static GitHub Pages site", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<html lang="de">/i);
  assert.match(html, /<title>Universale Dienstleistungen/i);
  assert.match(html, /Alles im Griff\./);
  assert.match(html, /Ein Objekt\./);
  assert.match(html, /Vier Leistungen\./);
  assert.match(html, /Das ganze Jahr\./);
  assert.match(html, /Vier Leistungsbereiche/);
  assert.match(html, /Regelmäßig betreut\./);
  assert.match(html, /Saisonal bereit\./);
  assert.match(html, /Alles im Blick\./);
  assert.match(html, /Sauber übergeben\./);
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
  assert.match(html, /Schnell vor Ort\./);
  assert.match(html, /Winter/);
  assert.match(html, /Drei Schritte\./);
  assert.match(html, /Sie erzählen\./);
  assert.match(html, /Wir planen\./);
  assert.match(html, /Wir erledigen\./);
  assert.doesNotMatch(html, /class="[^"]*\bundefined\b/);
  assert.doesNotMatch(html, /Worauf Sie sich verlassen können\./);
  assert.match(html, /Wobei können wir helfen\?/);
  assert.match(html, /id="kontakt"/);

  const teamHtml = await readFile(
    new URL("../dist/client/team/index.html", import.meta.url),
    "utf8",
  );
  assert.match(teamHtml, /Ein Team\./);
  assert.match(teamHtml, /Klare Verantwortung\./);
  assert.match(teamHtml, /Woran gute Arbeit erkennbar wird\./);
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
  assert.match(page, /data-scroll-parallax/);
  assert.doesNotMatch(page, /data-process-reveal/);
  assert.doesNotMatch(shell, /processObserver/);
  assert.match(shell, /Math\.min\(y \* 0\.58, 280\)/);
  assert.doesNotMatch(page, /Kompetenz durch Erfahrung/);
  assert.doesNotMatch(page, /hero-proof/);
  assert.match(page, /readiness-rail__track/);
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
  assert.match(chronogarten, /chronogarten-garten\.jpg/);
  assert.match(chronogarten, /chronogarten-winter\.jpg/);
  assert.doesNotMatch(chronogarten, /addEventListener\("scroll"/);
  assert.match(chronogartenCss, /min-height:\s*500dvh/);
  assert.match(chronogartenCss, /prefers-reduced-motion:\s*reduce/);
  assert.equal([...serviceCatalog.matchAll(/\bid:\s*"/g)].length, 4);
  for (const serviceName of [
    "Garten & Grundstück",
    "Winterdienst",
    "Hausmeisterservice",
    "Entrümpelung",
  ]) {
    assert.ok(serviceCatalog.includes(serviceName));
  }
  assert.match(page, /service-picker__grid/);
  assert.match(page, /selectedService/);
  assert.match(page, /services-stack-nav/);
  assert.match(page, /data-stack-card/);
  assert.match(page, /data-stack-segment/);
  assert.match(page, /Einsatzmodell/);
  assert.match(page, /Situation besprechen/);
  assert.match(shell, /is-stack-active/);
  assert.match(shell, /data-stack-current/);
  assert.doesNotMatch(page, /service-marquee/);
  assert.doesNotMatch(page, /Objektservice/);
  assert.doesNotMatch(page, /function ServicesEmblem/);
  assert.doesNotMatch(page, /Arbeit, die man sieht\./);
  assert.doesNotMatch(page, /Wir halten Immobilien/);
  assert.doesNotMatch(page, /services-heading/);
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
    "Räumfahrzeuge mit Streusystem",
    "Mobile Schneefräsen",
    "Mähwerke für Großflächen",
    "Mähwerke für Eigenheime",
    "Technik für Hecken- und Rückschnitt",
    "3,5-t-Einsatzfahrzeug",
  ]) {
    assert.ok(fleetJourney.includes(fleetName));
  }
  assert.doesNotMatch(page, /<figcaption>/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
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
  assert.match(fleetJourneyCss, /min-height:\s*500dvh/);
  assert.match(fleetJourneyCss, /position:\s*sticky/);
  assert.match(fleetJourneyCss, /@media \(max-width: 780px\)/);
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
  assert.match(processImpulseJourney, /scrub:\s*isMobile\s*\?\s*0\.55\s*:\s*0\.65/);
  assert.match(processImpulseJourney, /prefers-reduced-motion/);
  assert.match(processImpulseJourney, /aria-labelledby="process-impulse-title"/);
  assert.match(processImpulseJourney, /process-impulse-panorama\.webp/);
  assert.match(processImpulseJourney, /Telefonisch, per E-Mail oder im Formular/);
  assert.match(processImpulseJourney, /stellen das passende Team zusammen/);
  assert.match(processImpulseJourney, /hinterlässt die Fläche sauber/);
  assert.doesNotMatch(processImpulseJourney, /addEventListener\(\s*["']scroll/);
  assert.doesNotMatch(processImpulseJourney, /killAll/);
  assert.match(processImpulseJourneyCss, /min-height:\s*420dvh/);
  assert.match(processImpulseJourneyCss, /min-height:\s*360dvh/);
  assert.match(processImpulseJourneyCss, /position:\s*sticky/);
  assert.match(processImpulseJourneyCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(processImpulseJourneyCss, /min-height:\s*auto/);
  assert.match(css, /\.readiness-rail span\s*\{\s*font-size:\s*clamp\(3\.25rem, 15vw, 4\.5rem\)/);
  assert.match(
    css,
    /@media \(max-width: 780px\)[\s\S]*?\.hero-kicker\s*\{\s*display:\s*none;/,
  );
  assert.match(nextConfig, /output:\s*"export"/);
  assert.match(viteConfig, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(viteConfig, /base:/);
  assert.match(team, /SiteHeader currentPage="team"/);
  assert.match(team, /Gemeinsam im Einsatz/);
  assert.match(team, /team-portrait__frame/);
  assert.doesNotMatch(team, /Menschen\. Technik\. Ergebnis\./);
  assert.doesNotMatch(team, /team-gallery/);
  assert.match(shell, /<strong>24\/7 anrufen<\/strong>/);
});

test("ships optimized responsive visual assets", async () => {
  const mediaRoot = new URL("../public/media/", import.meta.url);
  const files = await readdir(mediaRoot);
  assert.ok(files.includes("natural-paper-texture.webp"));
  assert.ok(files.includes("natural-grass-ornament.webp"));
  assert.ok(files.includes("gardener-trimming-1280.webp"));
  assert.ok(files.includes("snow-clearing-1280.webp"));
  assert.ok(files.includes("tree-shaping-1280.webp"));
  const fleetJourneyAssets = [
    "einsatzlandschaft-sommer.webp",
    "einsatzlandschaft-winter.webp",
    "einsatzlandschaft-sommer-960.webp",
    "einsatzlandschaft-winter-960.webp",
    "massstabsreise-kante.webp",
    "massstabsreise-kante-960.webp",
    "massstabsreise-landschaft-sommer.webp",
    "massstabsreise-landschaft-sommer-960.webp",
    "massstabsreise-landschaft-winter.webp",
    "massstabsreise-landschaft-winter-960.webp",
  ];
  fleetJourneyAssets.forEach((file) => assert.ok(files.includes(file)));
  const chronogartenAssets = [
    "chronogarten-intro.jpg",
    "chronogarten-garten.jpg",
    "chronogarten-hausmeister.jpg",
    "chronogarten-entruempelung.jpg",
    "chronogarten-winter.jpg",
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

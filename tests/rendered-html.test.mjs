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
  assert.match(html, /Drei Schritte\./);
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
    readFile(new URL("../app/service-catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/natural.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
  ]);

  assert.match(shell, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(page, /data-scroll-parallax/);
  assert.match(page, /data-process-reveal/);
  assert.match(shell, /processObserver/);
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
  assert.match(page, /function FleetGlyph/);
  assert.match(page, /<span>Für jede Fläche<\/span>/);
  assert.match(page, /<span>das richtige Gerät\.<\/span>/);
  assert.doesNotMatch(page, /<figcaption>/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(css, /terraschnitt/);
  assert.match(css, /@keyframes readiness-marquee/);
  assert.match(css, /\.process-intro\s*\{[\s\S]*?position:\s*sticky/);
  assert.match(css, /\.process-card\s*\{[\s\S]*?position:\s*sticky/);
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
  assert.doesNotMatch(naturalCss, /\.process-intro\s*\{[^}]*position:/);
  assert.doesNotMatch(naturalCss, /\.process-card\s*\{[^}]*position:/);
  assert.doesNotMatch(naturalCss, /\.hero-media\s*\{/);
  assert.doesNotMatch(naturalCss, /\.services-grid\s*\{/);
  assert.doesNotMatch(naturalCss, /\.services-heading/);
  assert.match(naturalCss, /\.fleet-glyph\s*\{/);
  assert.match(css, /\.fleet-title h2 span\s*\{[\s\S]*?white-space:\s*nowrap/);
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
  const chronogartenAssets = [
    "chronogarten-intro.jpg",
    "chronogarten-garten.jpg",
    "chronogarten-hausmeister.jpg",
    "chronogarten-entruempelung.jpg",
    "chronogarten-winter.jpg",
  ];
  chronogartenAssets.forEach((file) => assert.ok(files.includes(file)));
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

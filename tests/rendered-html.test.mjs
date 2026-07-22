import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

test("exports a complete static GitHub Pages site", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<html lang="de">/i);
  assert.match(html, /<title>Universale Dienstleistungen/i);
  assert.match(html, /Alles im Griff\./);
  assert.match(html, /Vier Aufgaben\./);
  assert.match(html, /24 Stunden am Tag, 7 Tage die Woche erreichbar/);
  assert.match(html, /Drei Schritte\./);
  assert.match(html, /id="kontakt"/);
});

test("keeps the Pages asset prefix, original motion, and natural skin wired in", async () => {
  const [page, css, naturalCss, layout, nextConfig, viteConfig] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/natural.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(page, /data-scroll-parallax/);
  assert.match(page, /Math\.min\(y \* 0\.44, 200\)/);
  assert.doesNotMatch(page, /Kompetenz durch Erfahrung/);
  assert.doesNotMatch(page, /hero-proof/);
  assert.match(page, /readiness-rail__track/);
  assert.match(page, /classList\.toggle\(\s*"is-past"/);
  assert.match(page, /handleHashNavigation/);
  assert.match(page, /addEventListener\(\s*"click",\s*handleHashNavigation/);
  assert.match(page, /__VINEXT_RSC_NAVIGATE__/);
  assert.match(page, /const isSameDocument =/);
  assert.match(page, /handleStaticHashNavigation/);
  assert.match(page, /function ServicesEmblem/);
  assert.match(page, /function FleetGlyph/);
  assert.match(page, /Vier Bereiche\. Ein Team\./);
  assert.match(page, /<span>Für jede Fläche<\/span>/);
  assert.match(page, /<span>das richtige Gerät\.<\/span>/);
  assert.doesNotMatch(page, /<figcaption>/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@keyframes readiness-marquee/);
  assert.match(css, /\.process-intro\s*\{[\s\S]*?position:\s*sticky/);
  assert.match(css, /\.process-card\s*\{[\s\S]*?position:\s*sticky/);
  assert.match(css, /\.hero-media\s*\{[\s\S]*?inset:\s*0/);
  assert.match(css, /\.services-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(12, 1fr\)/);
  assert.match(layout, /import "\.\/natural\.css"/);
  assert.match(naturalCss, /natural-paper-texture\.png/);
  assert.doesNotMatch(naturalCss, /natural-paint-stroke\.png/);
  assert.match(naturalCss, /natural-grass-ornament\.png/);
  assert.doesNotMatch(naturalCss, /\[data-reveal/);
  assert.doesNotMatch(naturalCss, /\.process-intro\s*\{[^}]*position:/);
  assert.doesNotMatch(naturalCss, /\.process-card\s*\{[^}]*position:/);
  assert.doesNotMatch(naturalCss, /\.hero-media\s*\{/);
  assert.doesNotMatch(naturalCss, /\.services-grid\s*\{/);
  assert.match(naturalCss, /\.services-heading h2 span\s*\{[\s\S]*?white-space:\s*nowrap/);
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

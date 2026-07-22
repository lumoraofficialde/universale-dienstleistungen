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

test("keeps the Pages asset prefix and motion system wired in", async () => {
  const [page, css, nextConfig, viteConfig] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(page, /data-scroll-parallax/);
  assert.match(page, /classList\.toggle\(\s*"is-past"/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
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

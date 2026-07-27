import { existsSync } from "node:fs";
import { copyFile, readFile, readdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = `${directory}/${entry.name}`;
      if (entry.isDirectory()) return findHtmlFiles(path);
      return entry.name.endsWith(".html") ? [path] : [];
    }),
  );
  return files.flat();
}

async function normalizeExportedHtml() {
  const outputDirectory = "dist/client";
  const htmlFiles = await findHtmlFiles(outputDirectory);

  await Promise.all(
    htmlFiles.map(async (file) => {
      let normalized = await readFile(file, "utf8");
      const documentEnd = normalized.indexOf("</html>");

      if (documentEnd >= 0) {
        const trailingMarkup = normalized
          .slice(documentEnd + "</html>".length)
          .trim();

        if (trailingMarkup) {
          const document = normalized.slice(
            0,
            documentEnd + "</html>".length,
          );
          const closingTags = "</body></html>";

          if (document.includes(closingTags)) {
            normalized = document.replace(
              closingTags,
              `${trailingMarkup}</body></html>`,
            );
          }
        }
      }

      await writeFile(file, normalized);
    }),
  );

  // GitHub Pages serves /404.html for unknown paths. Vinext's generated
  // fallback currently inherits root metadata, so use the explicit /404 route
  // whose page-level metadata remains correct after hydration.
  await copyFile(
    `${outputDirectory}/404/index.html`,
    `${outputDirectory}/404.html`,
  );
}

async function writeSeoFiles() {
  const outputDirectory = "dist/client";
  const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "true";
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://universale-dienstleistungen.de"
  ).replace(/\/+$/, "");
  const routes = ["/", "/team/", "/impressum/", "/datenschutz/"];
  const robots = isPreview
    ? ["User-agent: *", "Disallow: /", ""].join("\n")
    : [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${siteUrl}/sitemap.xml`,
        "",
      ].join("\n");
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.flatMap((route) => [
      "  <url>",
      `    <loc>${siteUrl}${route}</loc>`,
      "  </url>",
    ]),
    "</urlset>",
    "",
  ].join("\n");

  await Promise.all([
    writeFile(`${outputDirectory}/robots.txt`, robots),
    writeFile(`${outputDirectory}/sitemap.xml`, sitemap),
  ]);
}

async function finishBuild() {
  try {
    await Promise.all([normalizeExportedHtml(), writeSeoFiles()]);
  } catch (error) {
    console.error("Could not normalize the static HTML export.", error);
    process.exitCode = 1;
  }
}

const child = spawn(
  process.execPath,
  ["node_modules/vinext/dist/cli.js", "build"],
  {
    env: process.env,
    stdio: ["inherit", "pipe", "pipe"],
  },
);

let output = "";

child.stdout.on("data", (chunk) => {
  output += chunk;
  process.stdout.write(chunk);
});

child.stderr.on("data", (chunk) => {
  output += chunk;
  process.stderr.write(chunk);
});

child.on("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});

child.on("close", async (code) => {
  if (code === 0) {
    await finishBuild();
    return;
  }

  const hasStaticEntry = existsSync("dist/client/index.html");
  const knownWindowsShutdownBug =
    process.platform === "win32" &&
    /UV_HANDLE_CLOSING/.test(output) &&
    /Build complete/.test(output);

  if (knownWindowsShutdownBug && hasStaticEntry) {
    console.warn(
      "Static export completed; ignored a known vinext/libuv shutdown assertion on Windows.",
    );
    await finishBuild();
    return;
  }

  process.exitCode = code ?? 1;
});

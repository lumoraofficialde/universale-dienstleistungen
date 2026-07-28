import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";

const defaultSiteUrl =
  "https://lumoraofficialde.github.io/universale-dienstleistungen";
const publicRoutes = ["", "team/", "impressum/", "datenschutz/"];

const resolveSiteUrl = () => {
  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl;
  let parsedSiteUrl;

  try {
    parsedSiteUrl = new URL(configuredSiteUrl);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be an absolute URL, received: ${configuredSiteUrl}`,
    );
  }

  if (!["http:", "https:"].includes(parsedSiteUrl.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must use http or https.");
  }
  if (
    parsedSiteUrl.username ||
    parsedSiteUrl.password ||
    parsedSiteUrl.search ||
    parsedSiteUrl.hash
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must not contain credentials, a query, or a fragment.",
    );
  }

  const pathname = parsedSiteUrl.pathname.replace(/\/+$/, "");
  const siteUrl = `${parsedSiteUrl.origin}${pathname}`;
  const configuredBasePath = (
    process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  ).replace(/\/+$/, "");

  if (configuredBasePath && !configuredBasePath.startsWith("/")) {
    throw new Error("NEXT_PUBLIC_BASE_PATH must be empty or start with '/'.");
  }
  if (
    configuredBasePath &&
    !siteUrl.endsWith(configuredBasePath)
  ) {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL (${siteUrl}) must end with NEXT_PUBLIC_BASE_PATH (${configuredBasePath}).`,
    );
  }

  return siteUrl;
};

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const replaceRequired = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) {
    throw new Error(`Static 404 export is missing its ${label}.`);
  }
  return html.replace(pattern, replacement);
};

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

const finalizeStaticExport = async () => {
  const siteUrl = resolveSiteUrl();
  const notFoundPath = "dist/client/404.html";
  const notFoundTitle = "Seite nicht gefunden | Universale Dienstleistungen";
  const notFoundDescription =
    "Die angeforderte Seite wurde nicht gefunden. Zurück zu den Leistungen von Universale Dienstleistungen.";
  const html = await readFile(notFoundPath, "utf8");
  const cleanedHtml = html
    .replace(/<title>[^<]*<\/title>\s*/gi, "")
    .replace(/<meta\b(?=[^>]*\bname="description")[^>]*>\s*/gi, "")
    .replace(/<meta\b(?=[^>]*\bname="robots")[^>]*>\s*/gi, "")
    .replace(/<meta\b(?=[^>]*\bproperty="og:[^"]+")[^>]*>\s*/gi, "")
    .replace(/<meta\b(?=[^>]*\bname="twitter:[^"]+")[^>]*>\s*/gi, "")
    .replace(
    /<link\b(?=[^>]*\brel="canonical")[^>]*>\s*/gi,
    "",
  );
  const patchedHtml = replaceRequired(
    cleanedHtml,
    /<head>/i,
    `<head>` +
      `<title>${notFoundTitle}</title>` +
      `<meta name="description" content="${notFoundDescription}"/>` +
      `<meta name="robots" content="noindex, nofollow"/>`,
    "head element",
  );

  await writeFile(notFoundPath, patchedHtml);
  await writeFile(
    "dist/client/robots.txt",
    `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );
  await writeFile(
    "dist/client/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      publicRoutes
        .map((route) => {
          const routeUrl = new URL(route, `${siteUrl}/`).href;
          return `  <url>\n    <loc>${escapeXml(routeUrl)}</loc>\n  </url>`;
        })
        .join("\n") +
      `\n</urlset>\n`,
  );
};

child.on("close", async (code) => {
  if (code === 0) {
    try {
      await finalizeStaticExport();
    } catch (error) {
      console.error("Failed to finalize the static export:", error);
      process.exitCode = 1;
    }
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
    try {
      await finalizeStaticExport();
    } catch (error) {
      console.error("Failed to finalize the static export:", error);
      process.exitCode = 1;
    }
    return;
  }

  process.exitCode = code ?? 1;
});

import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const defaultSiteUrl =
  "https://lumoraofficialde.github.io/universale-dienstleistungen";
const expectedSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl
).replace(/\/+$/, "");

const readTextTree = async (directoryUrl) => {
  const entries = await readdir(directoryUrl, { withFileTypes: true });
  const chunks = [];

  for (const entry of entries) {
    const entryUrl = new URL(
      entry.isDirectory() ? `${entry.name}/` : entry.name,
      directoryUrl,
    );
    if (entry.isDirectory()) {
      chunks.push(await readTextTree(entryUrl));
    } else if (/\.(?:css|html|js|mjs|txt|xml)$/i.test(entry.name)) {
      chunks.push(await readFile(entryUrl, "utf8"));
    }
  }

  return chunks.join("\n");
};

test("exports a complete static GitHub Pages site", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<html lang="de">/i);
  assert.match(
    html,
    /<title>Gartenpflege, Winterdienst, Hausmeisterservice &amp; Entrümpelung \| Universale<\/title>/,
  );
  assert.match(html, /Alles im Griff\./);
  assert.doesNotMatch(html, /Universale Qualit/);
  assert.doesNotMatch(html, /Wir verlassen eine/);
  assert.match(html, /Ein Objekt\./);
  assert.match(html, /Vier Bereiche\./);
  assert.match(html, /Ein Ansprechpartner\./);
  assert.match(html, /private Haushalte und gewerbliche Objekte/);
  assert.match(html, /Vier Leistungsbereiche/);
  assert.match(html, /Regelmäßig betreut\./);
  assert.match(html, /Saisonal geplant\./);
  assert.match(html, /Leistungen gebündelt\./);
  assert.match(html, /Einmalig beauftragt\./);
  assert.match(html, /Einsatzmodell besprechen/);
  assert.doesNotMatch(html, /Was oben/);
  assert.doesNotMatch(html, /Vorher-Nachher-Vergleich/);
  assert.doesNotMatch(html, /Arbeit, die man sieht\./);
  assert.doesNotMatch(html, /Wir halten Immobilien/);
  assert.match(html, /24 Stunden am Tag, 7 Tage die Woche erreichbar/);
  assert.match(html, /Passende Technik für Fläche und Zugang\./);
  assert.match(html, /Hecken und Gehölze schneiden\./);
  assert.match(html, /Grünpflege am Objekt\./);
  assert.match(html, /Größere Flächen pflegen\./);
  assert.match(html, /Personal und Technik transportieren\./);
  assert.match(html, /Winter/);
  assert.match(html, /Von der Anfrage bis zur Übergabe\./);
  assert.match(html, /Aufgabe schildern\./);
  assert.match(html, /Einsatz abstimmen\./);
  assert.match(html, /Ausführen und übergeben\./);
  assert.doesNotMatch(html, /class="[^"]*\bundefined\b/);
  assert.doesNotMatch(html, /Worauf Sie sich verlassen können\./);
  assert.match(html, /Welche Leistung brauchen Sie\?/);
  assert.doesNotMatch(html, /id="faq"/);
  assert.doesNotMatch(html, /Vier Fragen\. Klare Antworten\./);
  assert.match(html, /id="kontakt"/);

  const teamHtml = await readFile(
    new URL("../dist/client/team/index.html", import.meta.url),
    "utf8",
  );
  assert.match(teamHtml, /Klare Abläufe\./);
  assert.match(teamHtml, /Verbindliche Abstimmung\./);
  assert.match(teamHtml, /Woran gute Arbeit erkennbar wird\./);
  assert.ok(
    teamHtml.includes(
      `<link rel="canonical" href="${expectedSiteUrl}/team/"`,
    ),
  );
  assert.ok(
    teamHtml.includes(
      `<meta property="og:image" content="${expectedSiteUrl}/og.jpg"`,
    ),
  );

  const impressumHtml = await readFile(
    new URL("../dist/client/impressum/index.html", import.meta.url),
    "utf8",
  );
  assert.match(impressumHtml, /Angaben gem\u00e4\u00df \u00a7 5 DDG/);
  assert.match(impressumHtml, /Amtsgericht Pinneberg/);
  assert.match(impressumHtml, /HRB 18480 PI/);
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
  assert.match(notFoundHtml, /<title>Seite nicht gefunden \| Universale Dienstleistungen<\/title>/);
  assert.match(notFoundHtml, /<meta name="robots" content="noindex, nofollow"/);
  assert.equal(
    [...notFoundHtml.matchAll(/<title>/g)].length,
    1,
    "404 export must contain exactly one title",
  );
  assert.equal(
    [...notFoundHtml.matchAll(/<meta\b(?=[^>]*\bname="robots")/gi)].length,
    1,
    "404 export must contain exactly one robots directive",
  );
  assert.doesNotMatch(notFoundHtml, /<link rel="canonical"/);
  assert.doesNotMatch(notFoundHtml, /<meta\b(?=[^>]*\bproperty="og:)/i);
  assert.doesNotMatch(notFoundHtml, /<meta\b(?=[^>]*\bname="twitter:)/i);
  assert.match(notFoundHtml, /Zur Startseite/);
  assert.match(notFoundHtml, /Leistungen ansehen/);
  assert.match(notFoundHtml, /Direkt anrufen/);
  assert.doesNotMatch(notFoundHtml, /Unexpectedly client reference/);
  assert.match(
    notFoundHtml,
    /href="(?:\/universale-dienstleistungen)?\/#unternehmen"/,
  );

  assert.match(
    html,
    /href="(?:\/universale-dienstleistungen)?\/datenschutz\/"/,
  );
  assert.match(
    html,
    /href="(?:\/universale-dienstleistungen)?\/impressum\/"/,
  );

  const robots = await readFile(
    new URL("../dist/client/robots.txt", import.meta.url),
    "utf8",
  );
  const sitemap = await readFile(
    new URL("../dist/client/sitemap.xml", import.meta.url),
    "utf8",
  );
  assert.equal(
    robots,
    `User-agent: *\nAllow: /\n\nSitemap: ${expectedSiteUrl}/sitemap.xml\n`,
  );
  assert.match(sitemap, /<urlset/);
  for (const route of ["", "team/", "impressum/", "datenschutz/"]) {
    assert.ok(
      sitemap.includes(`<loc>${expectedSiteUrl}/${route}</loc>`),
      `Sitemap is missing ${expectedSiteUrl}/${route}`,
    );
  }
  assert.doesNotMatch(sitemap, /\/404(?:\/|<)/);
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
  assert.match(shell, /classList\.toggle\(\s*"is-past"/);
  assert.match(shell, /handleHashNavigation/);
  assert.match(shell, /addEventListener\(\s*"click",\s*handleHashNavigation/);
  assert.match(shell, /__VINEXT_RSC_NAVIGATE__/);
  assert.match(shell, /const isSameDocument =/);
  assert.match(shell, /handleStaticNavigation/);
  assert.match(shell, /normalizePathname/);
  assert.match(shell, /stabilizeCurrentHash/);
  assert.match(shell, /window\.location\.assign\(nextUrl\.href\)/);
  assert.match(shell, /popstate/);
  assert.match(shell, /hashchange/);
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
  assert.match(chronogarten, /chronogarten-garten-960\.webp/);
  assert.match(chronogarten, /chronogarten-winter\.webp/);
  assert.match(chronogarten, /chronogarten-winter-960\.webp/);
  assert.doesNotMatch(
    chronogarten,
    /matchMedia\(\s*["']max-width:\s*780px["']\s*\)/,
  );
  assert.doesNotMatch(chronogarten, /addEventListener\("scroll"/);
  assert.match(chronogartenCss, /min-height:\s*500dvh/);
  assert.match(chronogartenCss, /--chrono-top:\s*76px/);
  assert.match(
    chronogartenCss,
    /@media \(max-width: 780px\)[\s\S]*?--chrono-top:\s*68px/,
  );
  assert.match(
    chronogartenCss,
    /@media \(max-width: 780px\)[\s\S]*?min-height:\s*500svh[\s\S]*?height:\s*calc\(100svh - var\(--chrono-top\)\)/,
  );
  assert.match(
    chronogartenCss,
    /@media \(max-width: 780px\)[\s\S]*?\.image\s*\{[\s\S]*?filter:\s*none[\s\S]*?opacity\s+460ms\s+ease-in-out/,
  );
  assert.match(
    chronogartenCss,
    /@media \(max-width: 780px\)[\s\S]*?\.root\s*\{[\s\S]*?overflow:\s*visible[\s\S]*?background:\s*transparent/,
  );
  assert.match(
    chronogartenCss,
    /\.sticky,\s*[\r\n]+\s*\.visual\s*\{[\s\S]*?border-radius:\s*var\(--section-radius\)/,
  );
  assert.match(
    chronogartenCss,
    /\.weather i\s*\{[\s\S]*?animation-play-state:\s*paused\s*!important/,
  );
  assert.match(css, /--section-canvas:\s*#fff/);
  assert.match(
    css,
    /#main\s*\{[\s\S]*?background:\s*var\(--section-canvas\)/,
  );
  assert.match(css, /--cta-glass-highlight:/);
  assert.match(chronogartenCss, /background-image:\s*var\(--cta-glass-highlight\)/);
  assert.match(
    processImpulseJourneyCss,
    /background-image:\s*var\(--cta-glass-highlight\)/,
  );
  assert.ok(page.includes("↗\uFE0E"));
  assert.match(chronogartenCss, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(
    chronogartenCss,
    /@media \(max-width: 780px\),\s*\(prefers-reduced-motion:\s*reduce\)/,
  );
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
  assert.match(
    page,
    /import\s*\{[\s\S]*?\bbasePath\b[\s\S]*?\}\s*from\s*["']\.\/site-shell["']/,
  );
  assert.match(page, /services-stack-nav/);
  assert.match(page, /data-stack-card/);
  assert.match(page, /data-stack-segment/);
  assert.match(page, /Einsatzmodell/);
  assert.match(page, /Einsatzmodell besprechen/);
  assert.match(shell, /is-stack-active/);
  assert.match(shell, /data-stack-current/);
  assert.match(shell, /\[data-nav-section\]/);
  assert.match(shell, /activeSection/);
  assert.match(shell, /return "location" as const/);
  assert.match(page, /data-nav-section="einsatzarten"/);
  assert.match(page, /data-nav-section="kontakt"/);
  assert.match(chronogarten, /data-nav-section="leistungen"/);
  assert.match(fleetJourney, /data-nav-section="fuhrpark"/);
  assert.doesNotMatch(page, /service-marquee/);
  assert.doesNotMatch(page, /Objektservice/);
  assert.doesNotMatch(page, /function ServicesEmblem/);
  assert.doesNotMatch(page, /Arbeit, die man sieht\./);
  assert.doesNotMatch(page, /Wir halten Immobilien/);
  assert.match(page, /services-heading/);
  assert.doesNotMatch(page, /image-break/);
  assert.doesNotMatch(page, /tree-shaping/);
  assert.match(page, /FleetScaleJourney/);
  assert.doesNotMatch(page, /FleetGlyph/);
  assert.doesNotMatch(page, /fleetScenarios/);
  assert.match(fleetJourney, /Passende Technik für Fläche und Zugang\./);
  assert.match(fleetJourney, /gsap/);
  assert.match(fleetJourney, /ScrollTrigger/);
  assert.match(fleetJourney, /ignoreMobileResize:\s*true/);
  assert.match(fleetJourney, /scrub:\s*isMobile\s*\?\s*true\s*:\s*0\.7/);
  assert.match(fleetJourney, /data-fleet-journey-marker/);
  assert.match(fleetJourney, /aria-current/);
  assert.match(fleetJourney, /prefers-reduced-motion/);
  assert.match(
    fleetJourney,
    /\(max-width: 780px\) and \(orientation: landscape\)/,
  );
  assert.doesNotMatch(
    fleetJourney,
    /\(max-width: 780px\) and \(max-height:/,
  );
  assert.doesNotMatch(
    fleetJourney,
    /"\(max-width: 780px\), \(prefers-reduced-motion: reduce\)"/,
  );
  assert.match(fleetJourney, /massstabsreise-landschaft-sommer\.webp/);
  assert.match(fleetJourney, /massstabsreise-landschaft-winter\.webp/);
  assert.match(fleetJourney, /massstabsreise-kante\.webp/);
  assert.doesNotMatch(fleetJourney, /addEventListener\(\s*["']scroll/);
  for (const fleetName of [
    "Räumfahrzeuge mit Streusystem",
    "Mobile Schneefräsen",
    "Mähtechnik für größere Flächen",
    "Mähtechnik für kleinere Flächen",
    "Technik für Hecken- und Gehölzschnitt",
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
  assert.match(fleetJourneyCss, /min-height:\s*500dvh/);
  assert.match(
    fleetJourneyCss,
    /@media \(max-width: 780px\)[\s\S]*?min-height:\s*500svh[\s\S]*?height:\s*calc\(100svh - var\(--journey-top\)\)/,
  );
  assert.match(
    fleetJourneyCss,
    /@media \(max-width: 780px\)[\s\S]*?\.lightSweep,[\s\S]*?\.frostFront\s*\{[\s\S]*?display:\s*none/,
  );
  assert.match(fleetJourneyCss, /position:\s*sticky/);
  assert.match(fleetJourneyCss, /@media \(max-width: 780px\)/);
  assert.match(fleetJourneyCss, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(
    fleetJourneyCss,
    /@media \(max-width: 780px\),\s*\(prefers-reduced-motion:\s*reduce\)/,
  );
  assert.match(fleetJourneyCss, /min-height:\s*auto/);
  assert.doesNotMatch(css, /\.fleet-architect/);
  assert.doesNotMatch(naturalCss, /\.fleet-architect/);
  assert.doesNotMatch(css, /\.fleet-photo\s*\{/);
  assert.doesNotMatch(naturalCss, /\.fleet-item\s*\{/);
  assert.match(page, /ProcessImpulseJourney/);
  assert.match(processImpulseJourney, /gsap\.context/);
  assert.match(processImpulseJourney, /ScrollTrigger/);
  assert.match(processImpulseJourney, /MotionPathPlugin/);
  assert.match(processImpulseJourney, /ignoreMobileResize:\s*true/);
  assert.match(processImpulseJourney, /getTotalLength\(\)/);
  assert.match(processImpulseJourney, /strokeDasharray/);
  assert.match(processImpulseJourney, /scrub:\s*isMobile\s*\?\s*true\s*:\s*0\.65/);
  assert.match(processImpulseJourney, /prefers-reduced-motion/);
  assert.doesNotMatch(
    processImpulseJourney,
    /"\(max-width: 780px\), \(prefers-reduced-motion: reduce\)/,
  );
  assert.match(processImpulseJourney, /aria-labelledby="process-impulse-title"/);
  assert.match(processImpulseJourney, /process-impulse-panorama\.webp/);
  assert.match(processImpulseJourney, /Einsatzort, Aufgabe und gewünschten Zeitraum/);
  assert.match(processImpulseJourney, /Umfang, Termin, Personal und Technik/);
  assert.match(processImpulseJourney, /Ausführung, Abstimmung und Übergabe/);
  assert.doesNotMatch(processImpulseJourney, /addEventListener\(\s*["']scroll/);
  assert.doesNotMatch(processImpulseJourney, /killAll/);
  assert.match(processImpulseJourneyCss, /min-height:\s*420dvh/);
  assert.match(processImpulseJourneyCss, /min-height:\s*360svh/);
  assert.match(processImpulseJourneyCss, /height:\s*calc\(100svh - 68px\)/);
  assert.match(processImpulseJourneyCss, /position:\s*sticky/);
  for (const mobileMotionSource of [
    chronogartenCss,
    fleetJourney,
    fleetJourneyCss,
    processImpulseJourney,
    processImpulseJourneyCss,
    css,
  ]) {
    assert.doesNotMatch(
      mobileMotionSource,
      /\(max-width: 780px\) and \(max-height:/,
    );
  }
  assert.match(processImpulseJourneyCss, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(
    processImpulseJourneyCss,
    /@media \(max-width: 780px\),\s*\(prefers-reduced-motion:\s*reduce\)/,
  );
  assert.match(processImpulseJourneyCss, /min-height:\s*auto/);
  assert.match(css, /\.readiness-rail span\s*\{\s*font-size:\s*clamp\(3\.25rem, 15vw, 4\.5rem\)/);
  assert.match(
    css,
    /@media \(max-width: 780px\)[\s\S]*?\.hero-kicker\s*\{[\s\S]*?display:\s*flex;/,
  );
  assert.match(nextConfig, /output:\s*"export"/);
  assert.match(viteConfig, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(viteConfig, /base:/);
  assert.match(team, /SiteHeader currentPage="team"/);
  assert.match(team, /Abgestimmt im Einsatz/);
  assert.match(team, /team-portrait__frame/);
  assert.doesNotMatch(team, /Menschen\. Technik\. Ergebnis\./);
  assert.doesNotMatch(team, /team-gallery/);
  assert.match(shell, /aria-label="24\/7 erreichbar – jetzt anrufen: \+49 173 8948124"/);
  assert.match(shell, /className="mobile-call__label"[\s\S]*?24\/7 erreichbar/);
  assert.match(shell, /<svg[\s\S]*?viewBox="0 0 24 24"/);
  assert.doesNotMatch(shell, /<strong>24\/7 anrufen<\/strong>/);
  assert.match(
    shell,
    /\["Leistungen",\s*homeHref\("#unternehmen"\),\s*"leistungen"\]/,
  );
  assert.match(
    shell,
    /\["Einsatzmodelle",\s*homeHref\("#leistungen"\),\s*"einsatzarten"\]/,
  );
  assert.match(css, /\.mobile-call\s*\{[\s\S]*?width:\s*52px[\s\S]*?border-radius:\s*50%/);
  assert.match(css, /\.scroll-progress\s*\{[\s\S]*?transform:\s*scaleX\(0\)/);
  assert.match(shell, /className="back-to-top"/);
  assert.match(
    shell,
    /link\.closest\("\.mobile-menu"\) \|\| link\.matches\("\.back-to-top"\)/,
  );
  assert.match(css, /\.back-to-top\s*\{[\s\S]*?width:\s*44px[\s\S]*?height:\s*44px/);
  assert.doesNotMatch(shell, /\["Über uns",/);
});

test("ships optimized responsive visual assets", async () => {
  const mediaRoot = new URL("../public/media/", import.meta.url);
  const files = await readdir(mediaRoot);
  assert.ok(files.includes("natural-paper-texture.webp"));
  assert.ok(files.includes("natural-grass-ornament.webp"));
  assert.ok(files.includes("gardener-trimming-1280.webp"));
  assert.ok(files.includes("gardener-trimming-1920.webp"));
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
    assert.ok(asset.size < 250_000, `${file} is still too large: ${asset.size}`);
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

test("does not ship orphaned public media or font assets", async () => {
  const outputText = await readTextTree(
    new URL("../dist/client/", import.meta.url),
  );

  for (const directory of ["media", "fonts"]) {
    const publicDirectory = new URL(`../public/${directory}/`, import.meta.url);
    const files = await readdir(publicDirectory);

    for (const file of files) {
      assert.ok(
        outputText.includes(file),
        `Public asset is not referenced by the static export: ${directory}/${file}`,
      );
    }
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

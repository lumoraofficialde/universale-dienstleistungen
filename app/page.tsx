"use client";

import { FormEvent, MouseEvent, useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

type VinextNavigate = (
  href: string,
  ...navigationArguments: unknown[]
) => Promise<unknown>;

const services = [
  {
    number: "01",
    title: "Garten & Grundstück",
    text: "Pflege, Rückschnitt und saubere Außenflächen — regelmäßig oder genau dann, wenn Unterstützung gebraucht wird.",
    image: assetPath("/media/gardener-trimming.webp"),
    alt: "Mitarbeiter bei der professionellen Pflege einer Gartenanlage",
    className: "service-card--garden",
  },
  {
    number: "02",
    title: "Winterdienst",
    text: "Schnee räumen, Flächen streuen und Wege sichern. Abrufbereit bei plötzlichem Wintereinbruch.",
    image: assetPath("/media/snow-clearing.webp"),
    alt: "Winterdienst beim Räumen einer verschneiten Fläche",
    className: "service-card--winter",
  },
  {
    number: "03",
    title: "Hausmeisterservice",
    text: "Kontrolle, Pflege, Koordination und kleinere Reparaturen für private und gewerbliche Immobilien.",
    image: assetPath("/media/grass-cutting.webp"),
    alt: "Professionelle Grünpflege auf einer weitläufigen Außenfläche",
    className: "service-card--house",
  },
  {
    number: "04",
    title: "Entrümpelung",
    text: "Wohnungsauflösung, Betriebsauflösung, Demontage und besenreine Übergabe — diskret und gut geplant.",
    image: assetPath("/media/winter-vehicle.webp"),
    alt: "Einsatzfahrzeug von Universale Dienstleistungen",
    className: "service-card--clear",
  },
];

const fleet = [
  {
    name: "Räumfahrzeuge mit Streusystem",
    note: "Räumen · streuen",
    icon: "plow",
  },
  {
    name: "Mobile Schneefräsen",
    note: "Wendig im Nahbereich",
    icon: "blower",
  },
  {
    name: "Mähwerke für Großflächen",
    note: "Effizient auf Fläche",
    icon: "acreage",
  },
  {
    name: "Mähwerke für Eigenheime",
    note: "Präzise am Objekt",
    icon: "residential",
  },
  {
    name: "Technik für Hecken- und Rückschnitt",
    note: "Saubere Konturen",
    icon: "hedge",
  },
  {
    name: "3,5-t-Einsatzfahrzeug",
    note: "Schnell vor Ort",
    icon: "response",
  },
] as const;

type FleetIcon = (typeof fleet)[number]["icon"];

function ServicesEmblem() {
  return (
    <svg
      className="services-emblem"
      viewBox="0 0 132 132"
      aria-hidden="true"
    >
      <circle className="services-emblem__orbit" cx="66" cy="66" r="58" pathLength="1" />
      <circle className="services-emblem__core" cx="66" cy="66" r="12" pathLength="1" />
      <path className="services-emblem__axis" d="M66 8v46M124 66H78M66 124V78M8 66h46" pathLength="1" />

      <g className="services-emblem__mark services-emblem__mark--leaf">
        <path d="M29 43c13 1 21-6 25-18-13-1-23 5-25 18Z" pathLength="1" />
        <path d="M31 42c7-5 13-9 21-14" pathLength="1" />
      </g>

      <g className="services-emblem__mark services-emblem__mark--snow">
        <path d="M91 25v28M79 32l24 14M103 32 79 46" pathLength="1" />
        <path d="m91 25-4 5m4-5 4 5m8 2-1 7m1-7-7 2m7 12-7-2m7 2-1-7m-11 14-4-5m4 5 4-5m-16-6 7-2m-7 2 1-7m-1-7 1 7m-1-7 7 2" pathLength="1" />
      </g>

      <g className="services-emblem__mark services-emblem__mark--home">
        <path d="m25 92 18-15 18 15M31 88v20h24V88M40 108V96h7v12" pathLength="1" />
      </g>

      <g className="services-emblem__mark services-emblem__mark--clear">
        <path d="m82 84 24 24M87 79l19 19M78 89l19 19" pathLength="1" />
        <path d="m96 108 12-12M82 84l5-5" pathLength="1" />
      </g>
    </svg>
  );
}

function FleetGlyph({ type }: { type: FleetIcon }) {
  const common = {
    className: "fleet-glyph",
    viewBox: "0 0 48 48",
    "aria-hidden": true,
  } as const;

  switch (type) {
    case "plow":
      return (
        <svg {...common}>
          <path d="M8 28h24l7 6H18L8 28Z" />
          <path d="M14 28v-9h14l4 9M11 35l25-1M9 39h28" />
          <circle cx="17" cy="36" r="3" /><circle cx="32" cy="36" r="3" />
        </svg>
      );
    case "blower":
      return (
        <svg {...common}>
          <circle cx="18" cy="29" r="9" /><path d="m12 29 12-5-2 11-10-6ZM25 23l7-11h6v5h-6l-3 10M27 34h11M34 34v5" />
          <circle cx="17" cy="29" r="2" />
        </svg>
      );
    case "acreage":
      return (
        <svg {...common}>
          <path d="M7 29h34M12 24h24l4 5-4 6H12l-4-6 4-5Z" />
          <path d="m17 29 7-4 7 4-7 4-7-4ZM12 38h24" />
        </svg>
      );
    case "residential":
      return (
        <svg {...common}>
          <path d="M10 34h23l4-7H17l-7 7ZM18 27l8-14 9 14" />
          <circle cx="17" cy="35" r="3" /><circle cx="32" cy="35" r="3" />
          <path d="M26 13v-4" />
        </svg>
      );
    case "hedge":
      return (
        <svg {...common}>
          <path d="M8 29h27l6 5H14l-6-5ZM13 25l4 4 4-4 4 4 4-4 4 4" />
          <path d="m11 34-4 6M34 34l7 6" />
        </svg>
      );
    case "response":
      return (
        <svg {...common}>
          <path d="M7 32V20h23l8 7v5H7ZM30 22v7h8M17 20v-5h9v5" />
          <path d="M19 15v-4h5v4M20 26h5M22.5 23.5v5" />
          <circle cx="15" cy="34" r="3" /><circle cx="33" cy="34" r="3" />
        </svg>
      );
  }
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");

    let animationFrame = 0;
    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-parallax]"),
    );
    const rotatingElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-rotate]"),
    );

    const updateScrollEffects = () => {
      const y = window.scrollY;
      const viewportHeight = window.innerHeight;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${max > 0 ? (y / max) * 100 : 0}%`,
      );
      document.documentElement.style.setProperty(
        "--hero-shift",
        `${Math.min(y * 0.44, 200)}px`,
      );
      document.documentElement.style.setProperty(
        "--hero-content-y",
        `${Math.min(y * 0.1, 84)}px`,
      );
      document.documentElement.style.setProperty(
        "--hero-fade",
        `${Math.max(0.08, 1 - y / (viewportHeight * 0.82))}`,
      );

      parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const distanceFromCenter =
          (rect.top + rect.height / 2 - viewportHeight / 2) /
          (viewportHeight + rect.height);
        element.style.setProperty(
          "--parallax-y",
          `${Math.max(-44, Math.min(44, distanceFromCenter * -96))}px`,
        );
      });

      rotatingElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)),
        );
        element.style.setProperty("--scroll-turn", `${progress * 150 - 75}deg`);
      });

      setScrolled(y > 40);
      animationFrame = 0;
    };

    const onScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateScrollEffects);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.classList.remove("is-past");
          } else {
            entry.target.classList.remove("is-visible");
            entry.target.classList.toggle(
              "is-past",
              entry.boundingClientRect.top < 0,
            );
          }
        });
      },
      { threshold: 0.08, rootMargin: "-4% 0px -4% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) =>
      observer.observe(element),
    );
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScrollEffects();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  useEffect(() => {
    const vinextWindow = window as Window & {
      __VINEXT_RSC_NAVIGATE__?: VinextNavigate;
    };

    const originalVinextNavigate = vinextWindow.__VINEXT_RSC_NAVIGATE__;
    const handleStaticHashNavigation: VinextNavigate = (
      href,
      ...navigationArguments
    ) => {
      const nextUrl = new URL(href, window.location.href);
      const currentUrl = new URL(window.location.href);
      const isSameDocument =
        nextUrl.origin === currentUrl.origin &&
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search;

      if (isSameDocument) {
        const id = decodeURIComponent(nextUrl.hash.slice(1));
        const scrollToHash = () => {
          if (!id || id === "top") {
            window.scrollTo({ top: 0, behavior: "auto" });
          } else {
            document.getElementById(id)?.scrollIntoView({
              behavior: "auto",
              block: "start",
            });
          }
        };

        return new Promise((resolve) => {
          window.requestAnimationFrame(() => {
            resolve(undefined);
            window.queueMicrotask(() =>
              window.requestAnimationFrame(scrollToHash),
            );
          });
        });
      }

      return originalVinextNavigate
        ? originalVinextNavigate(href, ...navigationArguments)
        : Promise.resolve();
    };

    if (originalVinextNavigate) {
      vinextWindow.__VINEXT_RSC_NAVIGATE__ = handleStaticHashNavigation;
    }

    const handleHashNavigation = (event: globalThis.MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const origin = event.target;
      if (!(origin instanceof Element)) return;

      const link = origin.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();
      setMenuOpen(false);

      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? "auto"
        : "smooth";
      const scrollToTarget = () => {
        target.scrollIntoView({ behavior, block: "start" });
        if (window.location.hash !== hash) {
          window.history.pushState(null, "", hash);
        }
      };

      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(scrollToTarget),
      );
    };

    window.addEventListener("click", handleHashNavigation, { capture: true });
    return () => {
      window.removeEventListener("click", handleHashNavigation, true);
      if (
        vinextWindow.__VINEXT_RSC_NAVIGATE__ === handleStaticHashNavigation
      ) {
        vinextWindow.__VINEXT_RSC_NAVIGATE__ = originalVinextNavigate;
      }
    };
  }, []);

  const handleSpotlight = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--spot-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--spot-y",
      `${event.clientY - rect.top}px`,
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const subject = `Anfrage: ${data.get("service")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Telefon: ${data.get("phone")}`,
      `E-Mail: ${data.get("email")}`,
      `Leistung: ${data.get("service")}`,
      `Wunschtermin: ${data.get("date") || "offen"}`,
      `Ausführungsort: ${data.get("location")}`,
      "",
      String(data.get("message")),
    ].join("\n");

    setFormStatus("Ihr E-Mail-Programm wird mit der vorbereiteten Anfrage geöffnet.");
    window.location.href = `mailto:info@universale-dienstleistungen.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main">
        Zum Inhalt springen
      </a>
      <div className="scroll-progress" aria-hidden="true" />

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="Universale Startseite">
            <span className="brand-mark">
              <img src={assetPath("/media/universale-logo.png")} alt="" />
            </span>
            <span className="brand-name">
              <strong>Universale</strong>
              <span>Dienstleistungen</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Hauptnavigation">
            <a href="#leistungen">Leistungen</a>
            <a href="#unternehmen">Über uns</a>
            <a href="#fuhrpark">Fuhrpark</a>
            <a href="#kontakt">Kontakt</a>
          </nav>

          <a className="header-call" href="tel:+491738948124">
            <span>24/7 erreichbar</span>
            <strong>+49 173 8948124</strong>
          </a>

          <button
            className={`menu-button${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>

        <div id="mobile-menu" className={`mobile-menu${menuOpen ? " is-open" : ""}`}>
          <nav aria-label="Mobile Navigation">
            <a href="#leistungen" onClick={closeMenu}>Leistungen <span>01</span></a>
            <a href="#unternehmen" onClick={closeMenu}>Über uns <span>02</span></a>
            <a href="#fuhrpark" onClick={closeMenu}>Fuhrpark <span>03</span></a>
            <a href="#kontakt" onClick={closeMenu}>Kontakt <span>04</span></a>
          </nav>
          <div className="mobile-menu__contact">
            <a href="tel:+491738948124">+49 173 8948124</a>
            <a href="mailto:info@universale-dienstleistungen.de">
              info@universale-dienstleistungen.de
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <img
              src={assetPath("/media/gardener-trimming.webp")}
              alt=""
              fetchPriority="high"
            />
          </div>
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-inner">
            <div className="hero-kicker">
              <span className="status-dot" />
              Büsum · Norddeutschland · deutschlandweit im Einsatz
            </div>

            <div className="hero-layout">
              <div className="hero-copy">
                <h1 id="hero-title">
                  Alles im Griff.
                  <span>Bei jedem Wetter.</span>
                </h1>
              </div>

              <aside className="hero-panel" aria-label="Direktanfrage">
                <p>
                  Gartenpflege, Winterdienst und Objektservice aus einer Hand.
                  Schnell vor Ort, sauber geplant, zuverlässig erledigt.
                </p>
                <div className="hero-actions">
                  <a className="button button--accent" href="#kontakt">
                    Angebot anfragen <span aria-hidden="true">↗</span>
                  </a>
                  <a className="text-link text-link--light" href="tel:+491738948124">
                    Jetzt anrufen <span aria-hidden="true">→</span>
                  </a>
                </div>
              </aside>
            </div>

            <div className="hero-scroll">
              <a className="scroll-cue" href="#unternehmen">
                <span>Entdecken</span>
                <i aria-hidden="true">↓</i>
              </a>
            </div>
          </div>
        </section>

        <div className="service-marquee" aria-label="Leistungsbereiche">
          <div className="service-marquee__track">
            {[0, 1].map((copy) => (
              <div className="service-marquee__set" aria-hidden={copy === 1} key={copy}>
                <span>Winterdienst</span><i>✳</i>
                <span>Gartenpflege</span><i>✳</i>
                <span>Hausmeisterservice</span><i>✳</i>
                <span>Entrümpelung</span><i>✳</i>
              </div>
            ))}
          </div>
        </div>

        <section className="intro section" id="unternehmen">
          <div className="container intro-stage">
            <div className="intro-statement" data-reveal="left">
              <p className="eyebrow eyebrow--dark">Rund um Haus & Grundstück</p>
              <h2>
                <span>Vier Aufgaben.</span>
                <span>Eine klare</span>
                <em>Verantwortung.</em>
              </h2>
            </div>

            <div
              className="intro-orbit"
              data-reveal="scale"
              data-scroll-rotate
              aria-label="365 Tage im Jahr einsatzbereit"
            >
              <div className="intro-orbit__core" aria-hidden="true">
                <strong>365</strong>
                <span>Tage im Jahr</span>
              </div>
              <i aria-hidden="true">ganzjährig · einsatzbereit</i>
            </div>

            <div className="intro-body" data-reveal>
              <p className="intro-lead">
                Wir halten Immobilien, Außenflächen und Wege in Ordnung —
                einmalig, saisonal oder als laufende Betreuung.
              </p>
              <p>
                Von der ersten Besichtigung bis zur sauberen Übergabe planen wir
                individuell und setzen mit eigenem Personal und moderner Technik
                fachgerecht um.
              </p>
              <a className="text-link" href="#leistungen">
                Leistungen ansehen <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="intro-proof" data-reveal="right">
              <div>
                <span>01</span>
                <p><strong>Privat & Gewerbe</strong>Passend zum Objekt geplant.</p>
              </div>
              <div>
                <span>02</span>
                <p><strong>Innen & Außen</strong>Ein Team koordiniert alles.</p>
              </div>
              <div>
                <span>03</span>
                <p><strong>Büsum & darüber hinaus</strong>Flexibel deutschlandweit im Einsatz.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="services section" id="leistungen">
          <div className="container">
            <div className="section-heading services-heading">
              <div data-reveal="left">
                <p className="eyebrow eyebrow--dark">Was wir übernehmen</p>
                <h2>
                  <span>Arbeit, die man sieht.</span>
                  <span>Service, den man merkt.</span>
                </h2>
              </div>
              <aside className="services-note" data-reveal="right">
                <ServicesEmblem />
                <div>
                  <strong>Vier Bereiche. Ein Team.</strong>
                  <p>Einzeln buchbar oder als laufende Objektbetreuung.</p>
                </div>
              </aside>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <article
                  className={`service-card ${service.className}`}
                  data-reveal={index % 2 === 0 ? "left" : "right"}
                  style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
                  onMouseMove={handleSpotlight}
                  key={service.title}
                >
                  <img src={service.image} alt={service.alt} loading="lazy" />
                  <div className="service-card__shade" aria-hidden="true" />
                  <div className="service-card__top">
                    <span>{service.number}</span>
                    <span>Leistungsbereich</span>
                  </div>
                  <div className="service-card__body">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <a href="#kontakt" aria-label={`${service.title} anfragen`}>
                      Leistung anfragen <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="readiness" aria-labelledby="readiness-title">
          <div className="readiness-noise" aria-hidden="true" />
          <div className="container readiness-grid">
            <div
              className="readiness-display"
              aria-label="24 Stunden am Tag, 7 Tage die Woche erreichbar"
            >
              <div className="readiness-hours" data-reveal="left" aria-hidden="true">
                <strong>24</strong>
                <span>Stunden</span>
              </div>
              <div className="readiness-divider" data-reveal="scale" aria-hidden="true">
                <span />
                <p><i /> durchgehend erreichbar</p>
              </div>
              <div className="readiness-days" data-reveal="right" aria-hidden="true">
                <strong>7</strong>
                <span>Tage</span>
              </div>
            </div>
            <div className="readiness-copy" data-reveal="right">
              <p className="eyebrow">Wenn es schnell gehen muss</p>
              <h2 id="readiness-title">Bereit, bevor das Wetter umschlägt.</h2>
              <p>
                Bei Wintereinbruch und dringenden Fällen erreichen Sie uns rund
                um die Uhr. Klare Abstimmung, kurze Wege und einsatzbereite
                Technik sorgen dafür, dass kein Auftrag liegen bleibt.
              </p>
              <a className="button button--outline" href="tel:+491738948124">
                Notfall-Hotline anrufen <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="readiness-rail" aria-hidden="true">
            <div className="readiness-rail__track">
              {[0, 1].map((copy) => (
                <div className="readiness-rail__set" key={copy}>
                  <span>Räumen</span><i>—</i>
                  <span>Streuen</span><i>—</i>
                  <span>Sichern</span><i>—</i>
                  <span>Betreuen</span><i>—</i>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="fleet section" id="fuhrpark">
          <div className="container">
            <div className="fleet-top">
              <div className="section-label" data-reveal="left">
                <span>02</span>
                <p>Fuhr- &<br />Maschinenpark</p>
              </div>
              <div className="fleet-title" data-reveal="right">
                <p className="eyebrow eyebrow--dark">Technik, die mitarbeitet</p>
                <h2>
                  <span>Für jede Fläche</span>
                  <span>das richtige Gerät.</span>
                </h2>
                <p>
                  Eigener Fuhrpark, passend zur Aufgabe — flexibel und
                  kurzfristig einsatzbereit.
                </p>
              </div>
            </div>

            <div className="fleet-showcase">
              <figure className="fleet-photo" data-reveal="scale">
                <img
                  src={assetPath("/media/winter-team.webp")}
                  alt="Universale Mitarbeiter beim Winterdiensteinsatz"
                  loading="lazy"
                  data-scroll-parallax
                />
              </figure>

              <div className="fleet-list" data-reveal="right">
                {fleet.map((item, index) => (
                  <div className={`fleet-item fleet-item--${item.icon}`} key={item.name}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div className="fleet-item__copy">
                      <p>{item.name}</p>
                      <small>{item.note}</small>
                    </div>
                    <i><FleetGlyph type={item.icon} /></i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="image-break" aria-label="Gartenpflege im Einsatz">
          <img
            src={assetPath("/media/tree-shaping.webp")}
            alt="Gärtner beim professionellen Formschnitt einer Hecke"
            loading="lazy"
            data-scroll-parallax
          />
          <div className="image-break__overlay" aria-hidden="true" />
          <div className="container image-break__content" data-reveal="left">
            <p className="eyebrow">Vom ersten Schnitt bis zur letzten Kante</p>
            <blockquote>
              „Wir verlassen eine Fläche so, wie wir sie selbst vorfinden möchten.“
            </blockquote>
            <span>Universale Qualitätsversprechen</span>
          </div>
        </section>

        <section className="process section" aria-labelledby="process-title">
          <div className="container process-layout">
            <div className="process-intro" data-reveal="left">
              <p className="eyebrow eyebrow--dark">So arbeiten wir</p>
              <h2 id="process-title">Drei Schritte.<br />Kein Umweg.</h2>
              <p>
                Sie geben den Startschuss. Danach halten wir Abstimmung,
                Organisation und Umsetzung so einfach wie möglich.
              </p>
              <a className="text-link" href="#kontakt">
                Projekt anfragen <span aria-hidden="true">→</span>
              </a>
            </div>

            <ol className="process-stack">
              <li className="process-card process-card--one" data-reveal="right">
                <div className="process-card__top">
                  <span>01</span><p>Anfrage</p><i>Start</i>
                </div>
                <div className="process-card__body">
                  <h3>Sie erzählen.</h3>
                  <p>Telefonisch, per E-Mail oder im Formular. Ein paar Eckdaten reichen für den Anfang.</p>
                </div>
                <div className="process-card__foot">
                  <span>Telefon</span><span>E-Mail</span><span>Formular</span>
                </div>
              </li>
              <li className="process-card process-card--two" data-reveal="left">
                <div className="process-card__top">
                  <span>02</span><p>Planung</p><i>Abstimmung</i>
                </div>
                <div className="process-card__body">
                  <h3>Wir planen.</h3>
                  <p>Wir prüfen die Aufgabe, stimmen Aufwand und Termin ab und stellen das passende Team zusammen.</p>
                </div>
                <div className="process-card__foot">
                  <span>Umfang</span><span>Termin</span><span>Angebot</span>
                </div>
              </li>
              <li className="process-card process-card--three" data-reveal="right">
                <div className="process-card__top">
                  <span>03</span><p>Umsetzung</p><i>Erledigt</i>
                </div>
                <div className="process-card__body">
                  <h3>Wir erledigen.</h3>
                  <p>Unser Team setzt fachgerecht um, kommuniziert klar und hinterlässt die Fläche sauber.</p>
                </div>
                <div className="process-card__foot">
                  <span>Team</span><span>Technik</span><span>Saubere Übergabe</span>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="contact" id="kontakt">
          <div className="container contact-grid">
            <div className="contact-intro" data-reveal="left">
              <p className="eyebrow">Lassen Sie uns loslegen</p>
              <h2>Was können wir<br />für Sie erledigen?</h2>
              <p>
                Erzählen Sie uns kurz von Ihrem Vorhaben. Wir melden uns mit
                einer klaren Einschätzung und den nächsten Schritten.
              </p>

              <div className="contact-direct">
                <a href="tel:+491738948124">
                  <span>Telefon · 24/7 erreichbar</span>
                  <strong>+49 173 8948124</strong>
                </a>
                <a href="mailto:info@universale-dienstleistungen.de">
                  <span>E-Mail</span>
                  <strong>info@universale-dienstleistungen.de</strong>
                </a>
                <div>
                  <span>Standort</span>
                  <strong>Westerstraße 3 · 25761 Büsum</strong>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} data-reveal="right">
              <div className="form-row form-row--two">
                <label>
                  <span>Name *</span>
                  <input name="name" type="text" autoComplete="name" required />
                </label>
                <label>
                  <span>Telefon *</span>
                  <input name="phone" type="tel" autoComplete="tel" required />
                </label>
              </div>

              <div className="form-row form-row--two">
                <label>
                  <span>E-Mail *</span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label>
                  <span>Gewünschte Leistung *</span>
                  <select name="service" defaultValue="" required>
                    <option value="" disabled>Bitte auswählen</option>
                    <option>Winterdienst</option>
                    <option>Hausmeisterservice</option>
                    <option>Gartenpflege</option>
                    <option>Entrümpelung</option>
                    <option>Mehrere Leistungen</option>
                  </select>
                </label>
              </div>

              <div className="form-row form-row--two">
                <label>
                  <span>Wunschtermin</span>
                  <input name="date" type="date" />
                </label>
                <label>
                  <span>Ausführungsort *</span>
                  <input name="location" type="text" autoComplete="street-address" required />
                </label>
              </div>

              <label className="message-label">
                <span>Worum geht es? *</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Fläche, Aufgabe, gewünschter Zeitraum …"
                  required
                />
              </label>

              <label className="privacy-check">
                <input name="privacy" type="checkbox" required />
                <span>
                  Ich habe die <a href="https://universale-dienstleistungen.de/datenschutz/" target="_blank" rel="noreferrer">Datenschutzerklärung</a> gelesen und stimme der Kontaktaufnahme zu.
                </span>
              </label>

              <div className="form-submit">
                <button className="button button--accent" type="submit">
                  Anfrage vorbereiten <span aria-hidden="true">↗</span>
                </button>
                <p aria-live="polite">{formStatus}</p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <a className="brand brand--footer" href="#top" aria-label="Zurück zum Anfang">
            <span className="brand-mark"><img src={assetPath("/media/universale-logo.png")} alt="" /></span>
            <span className="brand-name"><strong>Universale</strong><span>Dienstleistungen</span></span>
          </a>
          <p>Gepflegte Flächen. Sichere Wege.<br />Ein zuverlässiger Partner.</p>
          <div className="footer-links">
            <a href="#leistungen">Leistungen</a>
            <a href="#unternehmen">Über uns</a>
            <a href="#fuhrpark">Fuhrpark</a>
            <a href="#kontakt">Kontakt</a>
          </div>
        </div>
        <div className="container footer-meta">
          <span>© {new Date().getFullYear()} Universale Dienstleistungen GmbH</span>
          <div>
            <a href="https://universale-dienstleistungen.de/datenschutz/" target="_blank" rel="noreferrer">Datenschutz</a>
            <a href="https://universale-dienstleistungen.de/impressum/" target="_blank" rel="noreferrer">Impressum</a>
          </div>
          <a href="#top">Nach oben ↑</a>
        </div>
      </footer>

      <a className="mobile-call" href="tel:+491738948124">
        <span aria-hidden="true">●</span> 24/7 anrufen
      </a>
    </>
  );
}

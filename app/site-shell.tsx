"use client";

import { useEffect, useState } from "react";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const assetPath = (path: string) => `${basePath}${path}`;

type VinextNavigate = (
  href: string,
  ...navigationArguments: unknown[]
) => Promise<unknown>;

export type SitePage =
  | "home"
  | "team"
  | "impressum"
  | "datenschutz"
  | "not-found";

type HomeNavSection =
  | "leistungen"
  | "einsatzarten"
  | "fuhrpark"
  | "kontakt";

const homePath = basePath
  ? `${basePath.replace(/\/+$/, "")}/`
  : "/";
const homeHref = (hash: string) => `${homePath}${hash}`;
const normalizePathname = (pathname: string) =>
  pathname.replace(/\/+$/, "") || "/";

export function SiteMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>(".site-header");
    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const hero = document.querySelector<HTMLElement>(".hero, .team-hero");
    let animationFrame = 0;
    let measureFrame = 0;
    let headerScrolled: boolean | null = null;
    let activeStackIndex = -1;
    let stackThresholds: number[] = [];
    let alive = true;
    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-parallax]"),
    );
    const stackCards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-stack-card]"),
    );
    const stackSegments = Array.from(
      document.querySelectorAll<HTMLElement>("[data-stack-segment]"),
    );
    const stackCurrent = document.querySelector<HTMLElement>("[data-stack-current]");
    const mobileStack = window.matchMedia("(max-width: 780px)");

    root.classList.add("motion-ready");

    const getDocumentTop = (element: HTMLElement) => {
      let top = 0;
      let current: HTMLElement | null = element;

      while (current) {
        top += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }

      return top;
    };

    const applyStackState = (nextIndex: number) => {
      if (!stackCards.length || nextIndex === activeStackIndex) return;
      activeStackIndex = nextIndex;

      stackCards.forEach((card, index) => {
        card.classList.toggle("is-stack-active", index === nextIndex);
        card.classList.toggle("is-stack-past", index < nextIndex);
      });

      stackSegments.forEach((segment, index) => {
        const isActive = index === nextIndex;
        segment.classList.toggle("is-active", isActive);
        segment.classList.toggle("is-complete", index < nextIndex);
        if (isActive) {
          segment.setAttribute("aria-current", "step");
        } else {
          segment.removeAttribute("aria-current");
        }
      });

      if (stackCurrent) {
        stackCurrent.textContent =
          stackCards[nextIndex]?.dataset.stackTitle ?? "";
      }
    };

    const measureStack = () => {
      if (!stackCards.length) return;
      if (!mobileStack.matches) {
        stackThresholds = [];
        applyStackState(0);
        return;
      }

      const activationOffset = Math.min(96, window.innerHeight * 0.12);
      stackThresholds = stackCards.map((card) => {
        const stickyTop =
          Number.parseFloat(card.style.getPropertyValue("--stack-top")) || 132;
        return getDocumentTop(card) - stickyTop - activationOffset;
      });
    };

    const getActiveStackIndex = (scrollTop: number) => {
      if (!mobileStack.matches || !stackThresholds.length) return 0;

      let nextIndex = 0;
      stackThresholds.forEach((threshold, index) => {
        if (scrollTop >= threshold) nextIndex = index;
      });
      return nextIndex;
    };

    const updateScrollEffects = () => {
      const y = window.scrollY;
      const viewportHeight = window.innerHeight;
      const max = document.documentElement.scrollHeight - viewportHeight;
      progress?.style.setProperty(
        "transform",
        `scaleX(${max > 0 ? y / max : 0})`,
      );

      if (hero && y <= viewportHeight * 1.25) {
        hero.style.setProperty(
          "--hero-shift",
          `${Math.min(y * 0.58, 280)}px`,
        );
        hero.style.setProperty(
          "--hero-content-y",
          `${Math.min(y * 0.1, 84)}px`,
        );
        hero.style.setProperty(
          "--hero-fade",
          `${Math.max(0.08, 1 - y / (viewportHeight * 0.82))}`,
        );
      }

      const nextHeaderScrolled = y > 40;
      if (nextHeaderScrolled !== headerScrolled) {
        headerScrolled = nextHeaderScrolled;
        header?.classList.toggle("is-scrolled", nextHeaderScrolled);
      }

      parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -viewportHeight || rect.top > viewportHeight * 2) {
          return;
        }
        const distanceFromCenter =
          (rect.top + rect.height / 2 - viewportHeight / 2) /
          (viewportHeight + rect.height);
        element.style.setProperty(
          "--parallax-y",
          `${Math.max(-44, Math.min(44, distanceFromCenter * -96))}px`,
        );
      });

      applyStackState(getActiveStackIndex(y));

      animationFrame = 0;
    };

    const onScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateScrollEffects);
      }
    };

    const onResize = () => {
      if (measureFrame) window.cancelAnimationFrame(measureFrame);
      measureFrame = window.requestAnimationFrame(() => {
        measureStack();
        onScroll();
        measureFrame = 0;
      });
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
    measureStack();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onResize, { once: true });
    mobileStack.addEventListener("change", onResize);
    void document.fonts.ready.then(() => {
      if (alive) onResize();
    });
    updateScrollEffects();

    return () => {
      alive = false;
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      mobileStack.removeEventListener("change", onResize);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (measureFrame) window.cancelAnimationFrame(measureFrame);
      stackCards.forEach((card) =>
        card.classList.remove("is-stack-active", "is-stack-past"),
      );
      root.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    const vinextWindow = window as Window & {
      __VINEXT_RSC_NAVIGATE__?: VinextNavigate;
    };
    const originalVinextNavigate = vinextWindow.__VINEXT_RSC_NAVIGATE__;
    const mobileViewport = window.matchMedia("(max-width: 780px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let firstHashFrame = 0;
    let secondHashFrame = 0;
    let alive = true;

    const isSameDocument = (nextUrl: URL, currentUrl: URL) =>
      nextUrl.origin === currentUrl.origin &&
      normalizePathname(nextUrl.pathname) ===
        normalizePathname(currentUrl.pathname) &&
      nextUrl.search === currentUrl.search;

    const moveToTarget = (
      id: string,
      behavior: ScrollBehavior = "auto",
    ) => {
      const target =
        !id || id === "top"
          ? document.documentElement
          : document.getElementById(id);
      if (!target) return false;

      const previousScrollBehavior =
        document.documentElement.style.scrollBehavior;
      if (behavior === "auto") {
        document.documentElement.style.scrollBehavior = "auto";
      }

      if (!id || id === "top") {
        window.scrollTo({ top: 0, behavior });
      } else {
        target.scrollIntoView({ behavior, block: "start" });
      }

      if (id === "main" && target instanceof HTMLElement) {
        target.focus({ preventScroll: true });
      }

      if (behavior === "auto") {
        window.requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior =
            previousScrollBehavior;
        });
      }
      return true;
    };

    const scrollToHash = (
      hash = window.location.hash,
      behavior: ScrollBehavior = "auto",
    ) => {
      let id = "top";
      try {
        id = hash ? decodeURIComponent(hash.slice(1)) : "top";
      } catch {
        id = hash.slice(1) || "top";
      }
      return moveToTarget(id, behavior);
    };

    const stabilizeCurrentHash = () => {
      if (!window.location.hash) return;
      if (firstHashFrame) window.cancelAnimationFrame(firstHashFrame);
      if (secondHashFrame) window.cancelAnimationFrame(secondHashFrame);
      firstHashFrame = window.requestAnimationFrame(() => {
        secondHashFrame = window.requestAnimationFrame(() => {
          if (alive) scrollToHash(window.location.hash, "auto");
        });
      });
    };

    const handleStaticNavigation: VinextNavigate = (href) => {
      const nextUrl = new URL(href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (isSameDocument(nextUrl, currentUrl)) {
        return new Promise((resolve) => {
          window.requestAnimationFrame(() => {
            scrollToHash(nextUrl.hash, "auto");
            resolve(undefined);
          });
        });
      }

      window.location.assign(nextUrl.href);
      return Promise.resolve();
    };

    vinextWindow.__VINEXT_RSC_NAVIGATE__ = handleStaticNavigation;

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
      const link = origin.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const nextUrl = new URL(link.href, window.location.href);
      const currentUrl = new URL(window.location.href);
      if (nextUrl.origin !== currentUrl.origin || !nextUrl.hash) return;

      if (!isSameDocument(nextUrl, currentUrl)) {
        event.preventDefault();
        event.stopPropagation();
        window.dispatchEvent(new Event("site:navigate"));
        document.body.classList.remove("menu-is-open");
        window.location.assign(nextUrl.href);
        return;
      }

      let id = "top";
      try {
        id = decodeURIComponent(nextUrl.hash.slice(1)) || "top";
      } catch {
        id = nextUrl.hash.slice(1) || "top";
      }
      if (
        id !== "top" &&
        !document.getElementById(id)
      ) {
        return;
      }

      event.preventDefault();
      window.dispatchEvent(new Event("site:navigate"));
      document.body.classList.remove("menu-is-open");

      const behavior =
        mobileViewport.matches || reducedMotion.matches ? "auto" : "smooth";
      window.requestAnimationFrame(() => {
        moveToTarget(id, behavior);
        window.history.pushState(null, "", nextUrl.href);
      });
    };

    const handleHistoryNavigation = () => {
      window.requestAnimationFrame(() => {
        scrollToHash(window.location.hash, "auto");
      });
    };

    window.addEventListener("click", handleHashNavigation, { capture: true });
    window.addEventListener("load", stabilizeCurrentHash, { once: true });
    window.addEventListener("popstate", handleHistoryNavigation);
    window.addEventListener("hashchange", handleHistoryNavigation);
    stabilizeCurrentHash();
    void document.fonts.ready.then(() => {
      if (alive) stabilizeCurrentHash();
    });

    return () => {
      alive = false;
      window.removeEventListener("click", handleHashNavigation, true);
      window.removeEventListener("load", stabilizeCurrentHash);
      window.removeEventListener("popstate", handleHistoryNavigation);
      window.removeEventListener("hashchange", handleHistoryNavigation);
      if (firstHashFrame) window.cancelAnimationFrame(firstHashFrame);
      if (secondHashFrame) window.cancelAnimationFrame(secondHashFrame);
      if (vinextWindow.__VINEXT_RSC_NAVIGATE__ === handleStaticNavigation) {
        vinextWindow.__VINEXT_RSC_NAVIGATE__ = originalVinextNavigate;
      }
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}

export function SiteHeader({ currentPage = "home" }: { currentPage?: SitePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<HomeNavSection | "">("");

  useEffect(() => {
    const closeAfterNavigation = () => setMenuOpen(false);
    window.addEventListener("site:navigate", closeAfterNavigation);
    return () => window.removeEventListener("site:navigate", closeAfterNavigation);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  useEffect(() => {
    const desktopViewport = window.matchMedia("(min-width: 781px)");
    const closeOnDesktop = () => {
      if (desktopViewport.matches) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    desktopViewport.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      desktopViewport.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (currentPage !== "home") return;

    let animationFrame = 0;
    let resizeFrame = 0;
    let alive = true;
    let navigationStops: Array<{
      section: HomeNavSection | "";
      top: number;
    }> = [];

    const measureNavigationStops = () => {
      navigationStops = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-section]"),
      ).map((section) => ({
        section:
          (section.dataset.navSection as HomeNavSection | undefined) ?? "",
        top: section.getBoundingClientRect().top + window.scrollY,
      }));
    };

    const updateActiveSection = () => {
      const activationLine =
        window.scrollY + 68 + Math.min(window.innerHeight * 0.28, 250);
      let nextSection: HomeNavSection | "" = "";

      navigationStops.forEach((stop) => {
        if (stop.top <= activationLine) {
          nextSection = stop.section;
        }
      });

      setActiveSection((current) =>
        current === nextSection ? current : nextSection,
      );
      animationFrame = 0;
    };

    const scheduleUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    const scheduleMeasure = () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        measureNavigationStops();
        scheduleUpdate();
        resizeFrame = 0;
      });
    };

    measureNavigationStops();
    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    window.addEventListener("load", scheduleMeasure, { once: true });
    void document.fonts.ready.then(() => {
      if (alive) scheduleMeasure();
    });

    return () => {
      alive = false;
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("load", scheduleMeasure);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
    };
  }, [currentPage]);

  const closeMenu = () => setMenuOpen(false);
  const teamHref = currentPage === "team" ? "#top" : `${basePath}/team/`;
  const links = [
    ["Leistungen", homeHref("#unternehmen"), "leistungen"],
    ["Einsatzarten", homeHref("#leistungen"), "einsatzarten"],
    ["Fuhrpark", homeHref("#fuhrpark"), "fuhrpark"],
    ["Team", teamHref, ""],
    ["Kontakt", homeHref("#kontakt"), "kontakt"],
  ] as const;

  const getAriaCurrent = (
    label: (typeof links)[number][0],
    section: (typeof links)[number][2],
  ) => {
    if (label === "Team" && currentPage === "team") return "page" as const;
    if (
      currentPage === "home" &&
      section &&
      section === activeSection
    ) {
      return "location" as const;
    }
    return undefined;
  };

  return (
    <>
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <header className="site-header">
        <div className="header-inner">
          <a
            className="brand"
            href={homeHref("#top")}
            aria-label="Universale Startseite"
          >
            <span className="brand-mark"><img src={assetPath("/media/universale-logo.png")} alt="" /></span>
            <span className="brand-name"><strong>Universale</strong><span>Dienstleistungen</span></span>
          </a>

          <nav className="desktop-nav" aria-label="Hauptnavigation">
            {links.map(([label, href, section]) => (
              <a
                href={href}
                aria-current={getAriaCurrent(label, section)}
                key={label}
              >
                {label}
              </a>
            ))}
          </nav>

          <a className="header-call" href="tel:+491738948124">
            <span>24/7 erreichbar</span><strong>+49 173 8948124</strong>
          </a>

          <button
            className={`menu-button${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
        </div>

        <div id="mobile-menu" className={`mobile-menu${menuOpen ? " is-open" : ""}`}>
          <nav aria-label="Mobile Navigation">
            {links.map(([label, href, section], index) => (
              <a
                href={href}
                aria-current={getAriaCurrent(label, section)}
                onClick={closeMenu}
                key={label}
              >
                {label} <span>{String(index + 1).padStart(2, "0")}</span>
              </a>
            ))}
          </nav>
          <div className="mobile-menu__contact">
            <a href="tel:+491738948124">+49 173 8948124</a>
            <a href="mailto:info@universale-dienstleistungen.de">info@universale-dienstleistungen.de</a>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter({ currentPage = "home" }: { currentPage?: SitePage }) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <a className="brand brand--footer" href={homeHref("#top")} aria-label="Zurück zum Anfang">
          <span className="brand-mark"><img src={assetPath("/media/universale-logo.png")} alt="" /></span>
          <span className="brand-name"><strong>Universale</strong><span>Dienstleistungen</span></span>
        </a>
        <p>Gepflegte Flächen. Sichere Wege.<br />Ein zuverlässiger Partner.</p>
        <div className="footer-links">
          <a href={homeHref("#unternehmen")}>Leistungen</a>
          <a href={homeHref("#leistungen")}>Einsatzarten</a>
          <a href={`${basePath}/team/`}>Team</a>
          <a href={homeHref("#fuhrpark")}>Fuhrpark</a>
          <a href={homeHref("#kontakt")}>Kontakt</a>
        </div>
      </div>
      <div className="container footer-meta">
        <span>© {new Date().getFullYear()} Universale Dienstleistungen GmbH</span>
        <div>
          <a
            href={`${basePath}/datenschutz/`}
            aria-current={currentPage === "datenschutz" ? "page" : undefined}
          >
            Datenschutz
          </a>
          <a
            href={`${basePath}/impressum/`}
            aria-current={currentPage === "impressum" ? "page" : undefined}
          >
            Impressum
          </a>
        </div>
        <a href="#top">Nach oben ↑</a>
      </div>
    </footer>
  );
}

export function MobileCall() {
  return (
    <a
      className="mobile-call"
      href="tel:+491738948124"
      aria-label="Jetzt anrufen: +49 173 8948124"
      title="Jetzt anrufen"
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M7.2 3.5 9.5 8l-1.9 1.9a15.7 15.7 0 0 0 6.5 6.5l1.9-1.9 4.5 2.3-.7 3.3c-.2.8-.9 1.4-1.8 1.4A15.5 15.5 0 0 1 2.5 6c0-.9.6-1.6 1.4-1.8l3.3-.7Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

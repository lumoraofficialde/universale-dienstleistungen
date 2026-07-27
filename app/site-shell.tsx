"use client";

import { useEffect, useRef, useState } from "react";

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
    const lightweightMotion = window.matchMedia(
      "(max-width: 780px), (prefers-reduced-motion: reduce)",
    );

    root.classList.add("motion-ready");

    let animationFrame = 0;
    let headerScrolled: boolean | null = null;
    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-parallax]"),
    );

    const updateHeader = () => {
      const nextScrolled = window.scrollY > 40;
      if (nextScrolled === headerScrolled) return;
      headerScrolled = nextScrolled;
      header?.classList.toggle("is-scrolled", nextScrolled);
    };

    const resetLightweightEffects = () => {
      progress?.style.setProperty("transform", "scaleX(0)");
      hero?.style.setProperty("--hero-shift", "0px");
      hero?.style.setProperty("--hero-content-y", "0px");
      hero?.style.setProperty("--hero-fade", "1");
      parallaxElements.forEach((element) => {
        element.style.setProperty("--parallax-y", "0px");
      });
    };

    const updateScrollEffects = () => {
      if (lightweightMotion.matches) {
        animationFrame = 0;
        return;
      }

      const y = window.scrollY;
      const viewportHeight = window.innerHeight;
      const max = document.documentElement.scrollHeight - viewportHeight;
      progress?.style.setProperty(
        "transform",
        `scaleX(${max > 0 ? y / max : 0})`,
      );
      hero?.style.setProperty(
        "--hero-shift",
        `${Math.min(y * 0.58, 280)}px`,
      );
      hero?.style.setProperty(
        "--hero-content-y",
        `${Math.min(y * 0.1, 84)}px`,
      );
      hero?.style.setProperty(
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

      animationFrame = 0;
    };

    const onScroll = () => {
      updateHeader();
      if (lightweightMotion.matches) return;
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateScrollEffects);
      }
    };

    const onMotionModeChange = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      if (lightweightMotion.matches) {
        resetLightweightEffects();
      } else {
        updateScrollEffects();
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
    lightweightMotion.addEventListener("change", onMotionModeChange);
    updateHeader();
    onMotionModeChange();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      lightweightMotion.removeEventListener("change", onMotionModeChange);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      root.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    const vinextWindow = window as Window & {
      __VINEXT_RSC_NAVIGATE__?: VinextNavigate;
    };

    const originalVinextNavigate = vinextWindow.__VINEXT_RSC_NAVIGATE__;
    let hashNavigationFrame = 0;
    let initialHashFrame = 0;
    let hashStabilizationActive = true;

    const moveToTarget = (
      target: Element,
      id: string,
      behavior: ScrollBehavior,
    ) => {
      const root = document.documentElement;
      const previousInlineBehavior = root.style.scrollBehavior;

      if (behavior === "auto") root.style.scrollBehavior = "auto";
      if (!id || id === "top") {
        window.scrollTo({ top: 0, behavior });
      } else {
        target.scrollIntoView({ behavior, block: "start" });
      }
      if (behavior === "auto") root.style.scrollBehavior = previousInlineBehavior;
    };

    const scrollToHash = (
      hash: string,
      behavior: ScrollBehavior = "auto",
    ) => {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      const target =
        !id || id === "top"
          ? document.documentElement
          : document.getElementById(id);
      if (!target) return false;

      window.cancelAnimationFrame(hashNavigationFrame);
      hashNavigationFrame = window.requestAnimationFrame(() => {
        moveToTarget(target, id, behavior);
        hashNavigationFrame = 0;
      });
      return true;
    };

    const handleStaticNavigation: VinextNavigate = (href) => {
      const nextUrl = new URL(href, window.location.href);
      const currentUrl = new URL(window.location.href);
      const isSameDocument =
        nextUrl.origin === currentUrl.origin &&
        normalizePathname(nextUrl.pathname) ===
          normalizePathname(currentUrl.pathname) &&
        nextUrl.search === currentUrl.search;

      if (isSameDocument) {
        scrollToHash(nextUrl.hash, "auto");
        return Promise.resolve();
      }

      window.location.assign(nextUrl.href);
      return Promise.resolve();
    };

    vinextWindow.__VINEXT_RSC_NAVIGATE__ = handleStaticNavigation;

    const stabilizeInitialHash = () => {
      if (hashStabilizationActive && window.location.hash) {
        scrollToHash(window.location.hash, "auto");
      }
    };

    initialHashFrame = window.requestAnimationFrame(() => {
      initialHashFrame = window.requestAnimationFrame(stabilizeInitialHash);
    });
    window.addEventListener("load", stabilizeInitialHash, { once: true });
    void document.fonts?.ready.then(stabilizeInitialHash);

    const handleHistoryNavigation = () => {
      window.dispatchEvent(new Event("site:navigate"));
      document.body.classList.remove("menu-is-open");
      scrollToHash(window.location.hash, "auto");
    };

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
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      ) {
        return;
      }

      const nextUrl = new URL(link.href, window.location.href);
      const currentUrl = new URL(window.location.href);
      if (nextUrl.origin !== currentUrl.origin || !nextUrl.hash) return;

      const isSameDocument =
        normalizePathname(nextUrl.pathname) ===
          normalizePathname(currentUrl.pathname) &&
        nextUrl.search === currentUrl.search;

      if (!isSameDocument) {
        event.preventDefault();
        event.stopPropagation();
        window.dispatchEvent(new Event("site:navigate"));
        document.body.classList.remove("menu-is-open");
        window.location.assign(nextUrl.href);
        return;
      }

      const id = decodeURIComponent(nextUrl.hash.slice(1));
      const target = id === "top" ? document.documentElement : document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      window.dispatchEvent(new Event("site:navigate"));
      document.body.classList.remove("menu-is-open");

      const behavior =
        window.matchMedia(
          "(max-width: 780px), (prefers-reduced-motion: reduce)",
        ).matches
          ? "auto"
          : "smooth";
      const shouldMoveFocus = link.classList.contains("skip-link");
      window.cancelAnimationFrame(hashNavigationFrame);
      hashNavigationFrame = window.requestAnimationFrame(() => {
        moveToTarget(target, id, behavior);
        if (shouldMoveFocus && target instanceof HTMLElement) {
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
        }
        if (window.location.hash !== nextUrl.hash) {
          window.history.pushState(null, "", nextUrl.hash);
        }
        hashNavigationFrame = 0;
      });
    };

    window.addEventListener("click", handleHashNavigation, { capture: true });
    window.addEventListener("popstate", handleHistoryNavigation);
    window.addEventListener("hashchange", handleHistoryNavigation);
    return () => {
      hashStabilizationActive = false;
      window.removeEventListener("click", handleHashNavigation, true);
      window.removeEventListener("popstate", handleHistoryNavigation);
      window.removeEventListener("hashchange", handleHistoryNavigation);
      window.removeEventListener("load", stabilizeInitialHash);
      window.cancelAnimationFrame(initialHashFrame);
      window.cancelAnimationFrame(hashNavigationFrame);
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeAfterNavigation = () => setMenuOpen(false);
    window.addEventListener("site:navigate", closeAfterNavigation);
    return () => window.removeEventListener("site:navigate", closeAfterNavigation);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    if (!menuOpen) {
      return () => document.body.classList.remove("menu-is-open");
    }

    const focusFrame = window.requestAnimationFrame(() => {
      document
        .querySelector<HTMLAnchorElement>("#mobile-menu nav a")
        ?.focus();
    });
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("menu-is-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    const mobileNavigation = window.matchMedia("(max-width: 780px)");
    const closeOnDesktop = () => {
      if (!mobileNavigation.matches) setMenuOpen(false);
    };

    mobileNavigation.addEventListener("change", closeOnDesktop);
    return () => mobileNavigation.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (currentPage !== "home") return;

    const navigationStops = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-section]"),
    );
    const visibleStops = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            visibleStops.add(section);
          } else {
            visibleStops.delete(section);
          }
        });

        const nextSection = navigationStops.reduce<HomeNavSection | "">(
          (current, section) =>
            visibleStops.has(section)
              ? (section.dataset.navSection as HomeNavSection | undefined) ??
                current
              : current,
          "",
        );
        if (nextSection) {
          setActiveSection((current) =>
            current === nextSection ? current : nextSection,
          );
        }
      },
      { rootMargin: "-68px 0px -70% 0px", threshold: 0 },
    );

    navigationStops.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
            ref={menuButtonRef}
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

        <div
          id="mobile-menu"
          className={`mobile-menu${menuOpen ? " is-open" : ""}`}
          aria-hidden={!menuOpen}
        >
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
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7.2 3.5 9.6 8l-2 1.7c.9 2 2.6 3.7 4.7 4.7l1.7-2 4.5 2.4-.7 3.5c-.2.9-1 1.5-1.9 1.5C9.4 19.8 4.2 14.6 4.2 8.1c0-.9.6-1.7 1.5-1.9l1.5-2.7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

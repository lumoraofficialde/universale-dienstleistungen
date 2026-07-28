/* eslint-disable @next/next/no-img-element -- Brand assets are pre-sized and the static deployment has no runtime image optimizer. */
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
  | "service"
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
    const backToTop = document.querySelector<HTMLElement>(".back-to-top");
    const hero = document.querySelector<HTMLElement>(".hero, .team-hero");
    let animationFrame = 0;
    let measureFrame = 0;
    let headerScrolled: boolean | null = null;
    let backToTopVisible: boolean | null = null;
    let activeStackIndex = -1;
    let stackThresholds: number[] = [];
    let measuredViewportWidth = window.innerWidth;
    let maxScroll = 1;
    let staticMotionEnabled: boolean | null = null;
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ambientMotionElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-ambient-motion]"),
    );

    root.classList.add("motion-ready");

    const measureScrollRange = () => {
      maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
    };

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

    const syncStaticMotion = () => {
      const nextStaticMotion =
        reducedMotion.matches || mobileStack.matches;
      if (nextStaticMotion === staticMotionEnabled) {
        return nextStaticMotion;
      }

      staticMotionEnabled = nextStaticMotion;
      if (nextStaticMotion) {
        hero?.style.setProperty("--hero-shift", "0px");
        hero?.style.setProperty("--hero-content-y", "0px");
        hero?.style.setProperty("--hero-fade", "1");
        parallaxElements.forEach((element) => {
          element.style.setProperty("--parallax-y", "0px");
        });
      }
      return nextStaticMotion;
    };

    const updateScrollEffects = () => {
      const y = window.scrollY;
      const viewportHeight = window.innerHeight;
      const hasStaticMotion = syncStaticMotion();
      progress?.style.setProperty(
        "transform",
        `scaleX(${Math.min(1, y / maxScroll)})`,
      );

      if (hero && !hasStaticMotion && y <= viewportHeight * 1.25) {
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

      const nextBackToTopVisible = y > Math.max(560, viewportHeight * 0.9);
      if (nextBackToTopVisible !== backToTopVisible) {
        backToTopVisible = nextBackToTopVisible;
        backToTop?.classList.toggle("is-visible", nextBackToTopVisible);
        backToTop?.setAttribute(
          "aria-hidden",
          nextBackToTopVisible ? "false" : "true",
        );
        if (backToTop instanceof HTMLAnchorElement) {
          backToTop.tabIndex = nextBackToTopVisible ? 0 : -1;
        }
      }

      if (!hasStaticMotion) {
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
      }

      applyStackState(getActiveStackIndex(y));

      animationFrame = 0;
    };

    const onScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateScrollEffects);
      }
    };

    const onResize = () => {
      const nextViewportWidth = window.innerWidth;
      const isHeightOnlyMobileResize =
        mobileStack.matches &&
        Math.abs(nextViewportWidth - measuredViewportWidth) < 1;
      measuredViewportWidth = nextViewportWidth;

      if (isHeightOnlyMobileResize) {
        measureScrollRange();
        onScroll();
        return;
      }

      if (measureFrame) window.cancelAnimationFrame(measureFrame);
      measureFrame = window.requestAnimationFrame(() => {
        measureScrollRange();
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
            if (mobileStack.matches) {
              observer.unobserve(entry.target);
            }
          } else {
            if (mobileStack.matches) return;
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

    const ambientMotionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          (entry.target as HTMLElement).dataset.ambientMotionActive =
            entry.isIntersecting ? "true" : "false";
        });
      },
      { threshold: 0.01, rootMargin: "120px 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) =>
      observer.observe(element),
    );
    ambientMotionElements.forEach((element) => {
      element.dataset.ambientMotionActive = "false";
      ambientMotionObserver.observe(element);
    });
    measureScrollRange();
    measureStack();
    const layoutObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            measureScrollRange();
            measureStack();
            onScroll();
          });
    layoutObserver?.observe(document.querySelector("main") ?? document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onResize, { once: true });
    mobileStack.addEventListener("change", onResize);
    reducedMotion.addEventListener("change", onResize);
    void document.fonts.ready.then(() => {
      if (alive) onResize();
    });
    updateScrollEffects();

    return () => {
      alive = false;
      observer.disconnect();
      ambientMotionObserver.disconnect();
      layoutObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      mobileStack.removeEventListener("change", onResize);
      reducedMotion.removeEventListener("change", onResize);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (measureFrame) window.cancelAnimationFrame(measureFrame);
      stackCards.forEach((card) =>
        card.classList.remove("is-stack-active", "is-stack-past"),
      );
      ambientMotionElements.forEach((element) => {
        delete element.dataset.ambientMotionActive;
      });
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
      focusTarget = false,
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

      if (target instanceof HTMLElement && (id === "main" || focusTarget)) {
        const focusDestination =
          id === "main"
            ? target
            : target.querySelector<HTMLElement>("h1, h2, h3") ?? target;
        if (!focusDestination.hasAttribute("tabindex")) {
          focusDestination.setAttribute("tabindex", "-1");
        }
        focusDestination.focus({ preventScroll: true });
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
      const focusTarget = Boolean(
        link.closest(".mobile-menu") || link.matches(".back-to-top"),
      );
      window.requestAnimationFrame(() => {
        moveToTarget(id, behavior, focusTarget);
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

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <a
        className="back-to-top"
        href="#top"
        aria-label="Zum Seitenanfang"
        aria-hidden="true"
        tabIndex={-1}
        title="Zum Seitenanfang"
      >
        <span aria-hidden="true">↑</span>
      </a>
    </>
  );
}

export function SiteHeader({ currentPage = "home" }: { currentPage?: SitePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<HomeNavSection | "">("");
  const brandRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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
      if (!desktopViewport.matches) return;

      const activeElement = document.activeElement;
      const focusWasInMobileNavigation =
        activeElement === menuButtonRef.current ||
        (activeElement instanceof Node &&
          mobileMenuRef.current?.contains(activeElement));

      setMenuOpen(false);
      if (focusWasInMobileNavigation) {
        window.requestAnimationFrame(() => brandRef.current?.focus());
      }
    };

    desktopViewport.addEventListener("change", closeOnDesktop);
    return () => {
      desktopViewport.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const menu = mobileMenuRef.current;
    const background = [
      document.querySelector<HTMLElement>(".skip-link"),
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>(".site-footer"),
      document.querySelector<HTMLElement>(".mobile-call"),
      document.querySelector<HTMLElement>(".back-to-top"),
    ].filter((element): element is HTMLElement => Boolean(element));
    const focusable = [
      menuButtonRef.current,
      ...(menu?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []),
    ].filter(
      (
        element,
      ): element is HTMLButtonElement | HTMLAnchorElement => element !== null,
    );
    const focusFrame = window.requestAnimationFrame(() => {
      focusable[1]?.focus();
    });

    background.forEach((element) => {
      element.inert = true;
    });

    const handleMenuKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleMenuKeydown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleMenuKeydown);
      background.forEach((element) => {
        element.inert = false;
      });
    };
  }, [menuOpen]);

  useEffect(() => {
    if (currentPage !== "home") return;

    let animationFrame = 0;
    let resizeFrame = 0;
    let alive = true;
    let measuredViewportWidth = window.innerWidth;
    let navigationStops: Array<{
      section: HomeNavSection | "";
      top: number;
    }> = [];
    const shouldTrackActiveSection = () =>
      window.innerWidth > 780 || menuOpen;

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
      if (!shouldTrackActiveSection()) {
        animationFrame = 0;
        return;
      }
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
      if (!shouldTrackActiveSection()) return;
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    const scheduleMeasure = (force = false) => {
      const nextViewportWidth = window.innerWidth;
      if (
        !force &&
        nextViewportWidth <= 780 &&
        Math.abs(nextViewportWidth - measuredViewportWidth) < 1
      ) {
        scheduleUpdate();
        return;
      }
      measuredViewportWidth = nextViewportWidth;

      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        measureNavigationStops();
        scheduleUpdate();
        resizeFrame = 0;
      });
    };
    const handleViewportMeasure = () => scheduleMeasure();

    measureNavigationStops();
    if (shouldTrackActiveSection()) updateActiveSection();
    const layoutObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => scheduleMeasure(true));
    layoutObserver?.observe(document.querySelector("main") ?? document.body);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleViewportMeasure, { passive: true });
    window.addEventListener("load", handleViewportMeasure, { once: true });
    void document.fonts.ready.then(() => {
      if (alive) scheduleMeasure();
    });

    return () => {
      alive = false;
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleViewportMeasure);
      window.removeEventListener("load", handleViewportMeasure);
      layoutObserver?.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
    };
  }, [currentPage, menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const closeMenuAndRestoreFocus = () => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  };
  const teamHref = currentPage === "team" ? "#top" : `${basePath}/team/`;
  const links = [
    ["Leistungen", homeHref("#unternehmen"), "leistungen"],
    ["Einsatzmodelle", homeHref("#leistungen"), "einsatzarten"],
    ["Technik", homeHref("#fuhrpark"), "fuhrpark"],
    ["Arbeitsweise", teamHref, ""],
    ["Kontakt", homeHref("#kontakt"), "kontakt"],
  ] as const;

  const getAriaCurrent = (
    label: (typeof links)[number][0],
    section: (typeof links)[number][2],
  ) => {
    if (label === "Leistungen" && currentPage === "service") {
      return "page" as const;
    }
    if (label === "Arbeitsweise" && currentPage === "team") return "page" as const;
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
            ref={brandRef}
            className="brand"
            href={homeHref("#top")}
            aria-label="Universale Startseite"
          >
            <span className="brand-mark">
              <img
                src={assetPath("/media/universale-logo.png")}
                width="512"
                height="502"
                alt=""
              />
            </span>
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
            <span>Einsatz besprechen</span><strong>+49 173 8948124</strong>
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
          ref={mobileMenuRef}
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
                {label}{" "}
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </nav>
          <div className="mobile-menu__contact">
            <a href="tel:+491738948124" onClick={closeMenuAndRestoreFocus}>
              +49 173 8948124
            </a>
            <a
              href="mailto:info@universale-dienstleistungen.de"
              onClick={closeMenuAndRestoreFocus}
            >
              info@universale-dienstleistungen.de
            </a>
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
        <a
          className="brand brand--footer"
          href={homeHref("#top")}
          aria-label="Zur Startseite von Universale Dienstleistungen"
        >
          <span className="brand-mark">
            <img
              src={assetPath("/media/universale-logo.png")}
              width="512"
              height="502"
              alt=""
            />
          </span>
          <span className="brand-name"><strong>Universale</strong><span>Dienstleistungen</span></span>
        </a>
        <p>Gartenpflege. Winterdienst.<br />Hausmeisterservice. Entrümpelung.</p>
        <nav className="footer-links" aria-label="Footer-Navigation">
          <a href={`${basePath}/leistungen/gartenpflege/`}>Gartenpflege</a>
          <a href={`${basePath}/leistungen/winterdienst/`}>Winterdienst</a>
          <a href={`${basePath}/leistungen/hausmeisterservice/`}>
            Hausmeisterservice
          </a>
          <a href={`${basePath}/leistungen/entruempelung/`}>Entrümpelung</a>
          <a href={`${basePath}/leistungen/objektbetreuung/`}>
            Gewerbliche Objektbetreuung
          </a>
          <a href={`${basePath}/team/`}>Arbeitsweise</a>
          <a href={homeHref("#kontakt")}>Kontakt</a>
        </nav>
      </div>
      <address className="container footer-contact">
        <span>Universale Dienstleistungen GmbH · Westerstraße 3 · 25761 Büsum</span>
        <a href="tel:+491738948124">+49 173 8948124</a>
        <a href="mailto:info@universale-dienstleistungen.de">
          info@universale-dienstleistungen.de
        </a>
      </address>
      <div className="container footer-meta">
        <span>© {new Date().getFullYear()} Universale Dienstleistungen GmbH</span>
        <nav aria-label="Rechtliches">
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
        </nav>
        <a href="#top" aria-label="Nach oben">
          Nach oben <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}

export function MobileCall() {
  const [contextHidden, setContextHidden] = useState(false);
  const callRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("#kontakt, .site-footer"),
    );
    if (!targets.length) return;

    const visibility = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target, entry.isIntersecting);
        });
        const visibleTarget = targets.find(
          (target) => visibility.get(target) === true,
        );
        const shouldHide = Boolean(visibleTarget);

        if (shouldHide && document.activeElement === callRef.current) {
          const nextTarget = visibleTarget?.querySelector<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled])',
          );
          window.requestAnimationFrame(() => nextTarget?.focus());
        }

        setContextHidden(shouldHide);
      },
      { threshold: 0.02 },
    );

    targets.forEach((target) => {
      visibility.set(target, false);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={callRef}
      className={`mobile-call${contextHidden ? " is-context-hidden" : ""}`}
      href="tel:+491738948124"
      aria-label="24/7 erreichbar – jetzt anrufen: +49 173 8948124"
      aria-hidden={contextHidden ? true : undefined}
      tabIndex={contextHidden ? -1 : undefined}
      title="24/7 erreichbar – jetzt anrufen"
    >
      <span className="mobile-call__label" aria-hidden="true">
        24/7 erreichbar
      </span>
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

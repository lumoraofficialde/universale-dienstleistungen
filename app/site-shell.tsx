"use client";

import { useEffect, useState } from "react";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const assetPath = (path: string) => `${basePath}${path}`;

type VinextNavigate = (
  href: string,
  ...navigationArguments: unknown[]
) => Promise<unknown>;

type SitePage = "home" | "team";

const homeHref = (hash: string, currentPage: SitePage) =>
  currentPage === "home" ? hash : `${basePath}/${hash}`;

export function SiteMotion() {
  useEffect(() => {
    document.documentElement.classList.add("motion-ready");

    let animationFrame = 0;
    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-parallax]"),
    );
    const rotatingElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-rotate]"),
    );
    const seasonStory = document.querySelector<HTMLElement>("[data-season-story]");
    const seasons = ["spring", "summer", "autumn", "winter"] as const;

    const updateScrollEffects = () => {
      const y = window.scrollY;
      const viewportHeight = window.innerHeight;
      const max = document.documentElement.scrollHeight - viewportHeight;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${max > 0 ? (y / max) * 100 : 0}%`,
      );
      document.documentElement.style.setProperty(
        "--hero-shift",
        `${Math.min(y * 0.58, 280)}px`,
      );
      document.documentElement.style.setProperty(
        "--hero-content-y",
        `${Math.min(y * 0.1, 84)}px`,
      );
      document.documentElement.style.setProperty(
        "--hero-fade",
        `${Math.max(0.08, 1 - y / (viewportHeight * 0.82))}`,
      );

      document.querySelector(".site-header")?.classList.toggle("is-scrolled", y > 40);

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

      if (seasonStory) {
        const storyBounds = seasonStory.getBoundingClientRect();
        // Begin as the artwork enters, then spread the four seasons across
        // almost a full viewport of scrolling. Winter arrives near the top of
        // the screen while the complete artwork is still visible.
        const seasonEntryLine = viewportHeight * 0.78;
        const seasonTravel = Math.max(viewportHeight * 0.92, 520);
        const storyProgress = Math.max(
          0,
          Math.min(
            0.999,
            (seasonEntryLine - storyBounds.top) / seasonTravel,
          ),
        );
        const seasonIndex = Math.min(3, Math.floor(storyProgress * 4));
        seasonStory.dataset.season = seasons[seasonIndex];
        seasonStory.style.setProperty("--season-progress", `${storyProgress}`);
        seasonStory.style.setProperty("--season-step", `${seasonIndex}`);
      }

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
    const vinextWindow = window as Window & {
      __VINEXT_RSC_NAVIGATE__?: VinextNavigate;
    };

    const originalVinextNavigate = vinextWindow.__VINEXT_RSC_NAVIGATE__;
    const handleStaticNavigation: VinextNavigate = (href) => {
      const nextUrl = new URL(href, window.location.href);
      const currentUrl = new URL(window.location.href);
      const isSameDocument =
        nextUrl.origin === currentUrl.origin &&
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search;

      if (isSameDocument) {
        const id = decodeURIComponent(nextUrl.hash.slice(1));
        return new Promise((resolve) => {
          window.requestAnimationFrame(() => {
            if (!id || id === "top") {
              window.scrollTo({ top: 0, behavior: "auto" });
            } else {
              document.getElementById(id)?.scrollIntoView({
                behavior: "auto",
                block: "start",
              });
            }
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
      const isSameDocument =
        nextUrl.origin === currentUrl.origin &&
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search;
      if (!isSameDocument || !nextUrl.hash) return;

      const id = decodeURIComponent(nextUrl.hash.slice(1));
      const target = id === "top" ? document.documentElement : document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();
      window.dispatchEvent(new Event("site:navigate"));
      document.body.classList.remove("menu-is-open");

      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";
      window.requestAnimationFrame(() => {
        if (id === "top") {
          window.scrollTo({ top: 0, behavior });
        } else {
          target.scrollIntoView({ behavior, block: "start" });
        }
        window.history.pushState(null, "", nextUrl.hash);
      });
    };

    window.addEventListener("click", handleHashNavigation, { capture: true });
    return () => {
      window.removeEventListener("click", handleHashNavigation, true);
      if (vinextWindow.__VINEXT_RSC_NAVIGATE__ === handleStaticNavigation) {
        vinextWindow.__VINEXT_RSC_NAVIGATE__ = originalVinextNavigate;
      }
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}

export function SiteHeader({ currentPage = "home" }: { currentPage?: SitePage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeAfterNavigation = () => setMenuOpen(false);
    window.addEventListener("site:navigate", closeAfterNavigation);
    return () => window.removeEventListener("site:navigate", closeAfterNavigation);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const teamHref = currentPage === "team" ? "#top" : `${basePath}/team/`;
  const links = [
    ["Leistungen", homeHref("#leistungen", currentPage)],
    ["Über uns", homeHref("#unternehmen", currentPage)],
    ["Fuhrpark", homeHref("#fuhrpark", currentPage)],
    ["Team", teamHref],
    ["Kontakt", homeHref("#kontakt", currentPage)],
  ] as const;

  return (
    <>
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <header className="site-header">
        <div className="header-inner">
          <a
            className="brand"
            href={homeHref("#top", currentPage)}
            aria-label="Universale Startseite"
          >
            <span className="brand-mark"><img src={assetPath("/media/universale-logo.png")} alt="" /></span>
            <span className="brand-name"><strong>Universale</strong><span>Dienstleistungen</span></span>
          </a>

          <nav className="desktop-nav" aria-label="Hauptnavigation">
            {links.map(([label, href]) => (
              <a
                href={href}
                aria-current={label === "Team" && currentPage === "team" ? "page" : undefined}
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
            {links.map(([label, href], index) => (
              <a href={href} onClick={closeMenu} key={label}>
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
        <a className="brand brand--footer" href={homeHref("#top", currentPage)} aria-label="Zurück zum Anfang">
          <span className="brand-mark"><img src={assetPath("/media/universale-logo.png")} alt="" /></span>
          <span className="brand-name"><strong>Universale</strong><span>Dienstleistungen</span></span>
        </a>
        <p>Gepflegte Flächen. Sichere Wege.<br />Ein zuverlässiger Partner.</p>
        <div className="footer-links">
          <a href={homeHref("#leistungen", currentPage)}>Leistungen</a>
          <a href={homeHref("#unternehmen", currentPage)}>Über uns</a>
          <a href={`${basePath}/team/`}>Team</a>
          <a href={homeHref("#fuhrpark", currentPage)}>Fuhrpark</a>
          <a href={homeHref("#kontakt", currentPage)}>Kontakt</a>
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
  );
}

export function MobileCall() {
  return (
    <a className="mobile-call" href="tel:+491738948124">
      <span aria-hidden="true">●</span><strong>24/7 anrufen</strong>
    </a>
  );
}

"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { assetPath } from "../site-shell";

const chapters = [
  {
    key: "bestand",
    label: "Aufnehmen",
    title: ["Was oben", "überzeugt,", "beginnt darunter."],
    body: "Wir erfassen Gelände, Boden und Wasser, bevor die erste Fläche verändert wird.",
  },
  {
    key: "fundament",
    label: "Fundament",
    title: ["Stabilität beginnt", "im Boden."],
    body: "Tragfähige Schichten und kontrollierte Wasserführung schaffen die Grundlage.",
  },
  {
    key: "bauen",
    label: "Bauen",
    title: ["Material wird", "präzise gefügt."],
    body: "Naturstein, Einfassungen und Übergänge verbinden Haus, Gelände und Nutzung.",
  },
  {
    key: "begruenen",
    label: "Begrünen",
    title: ["Wachstum braucht", "Vorbereitung."],
    body: "Gesunder Boden, passende Standorte und klare Pflanzbilder schaffen dauerhafte Wirkung.",
  },
  {
    key: "erhalten",
    label: "Erhalten",
    title: ["Gute Anlagen", "bleiben gut."],
    body: "Professionelle Pflege erhält Konturen, Funktion und Wert durch das ganze Jahr.",
  },
] as const;

export function TerraSchnitt() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [rainActive, setRainActive] = useState(false);
  const activeChapter = chapters[activeIndex];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setReducedMotion(query.matches);
      if (query.matches) setActiveIndex(chapters.length - 1);
    };

    syncPreference();
    query.addEventListener("change", syncPreference);
    return () => query.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible || visible.intersectionRatio < 0.45) return;
        const nextIndex = Number((visible.target as HTMLElement).dataset.terraMarker);
        if (Number.isFinite(nextIndex)) {
          setActiveIndex(nextIndex);
          if (chapters[nextIndex]?.key !== "fundament") setRainActive(false);
        }
      },
      { threshold: [0.45, 0.6, 0.75] },
    );

    markerRefs.current.forEach((marker) => {
      if (marker) observer.observe(marker);
    });

    return () => observer.disconnect();
  }, [reducedMotion]);

  const moveToChapter = (index: number) => {
    if (chapters[index]?.key !== "fundament") setRainActive(false);
    markerRefs.current[index]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--terra-lens-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--terra-lens-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  const handleCompareInput = (event: FormEvent<HTMLInputElement>) => {
    visualRef.current?.style.setProperty(
      "--terra-compare",
      `${event.currentTarget.value}%`,
    );
  };

  return (
    <section
      ref={sectionRef}
      className="terraschnitt"
      id="unternehmen"
      aria-labelledby="terraschnitt-title"
      data-terra-chapter={activeChapter.key}
      data-terra-rain={rainActive ? "on" : "off"}
    >
      <div className="terraschnitt__sticky">
        <div
          ref={visualRef}
          className="terraschnitt__visual"
          onPointerMove={handlePointerMove}
          onPointerEnter={(event) => {
            if (event.pointerType !== "touch") {
              event.currentTarget.classList.add("is-inspecting");
            }
          }}
          onPointerLeave={(event) => {
            event.currentTarget.classList.remove("is-inspecting");
          }}
          aria-hidden="true"
        >
          <img
            className="terraschnitt__image terraschnitt__image--finished"
            src={assetPath("/media/terraschnitt-finished.jpg")}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="terraschnitt__image terraschnitt__image--before"
            src={assetPath("/media/terraschnitt-before.jpg")}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="terraschnitt__image terraschnitt__image--compare"
            src={assetPath("/media/terraschnitt-before.jpg")}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="terraschnitt__image terraschnitt__image--lens"
            src={assetPath("/media/terraschnitt-before.jpg")}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <div className="terraschnitt__scan" />
          <div className="terraschnitt__water" />
          <div className="terraschnitt__rain" />
          <div className="terraschnitt__compare-edge" />
          <div className="terraschnitt__shade" />
        </div>

        <div className="terraschnitt__copy">
          <p className="terraschnitt__name">Terraschnitt</p>
          <div className="terraschnitt__copy-change" key={activeChapter.key}>
            <h2 id="terraschnitt-title">
              {activeChapter.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p>{activeChapter.body}</p>
          </div>
          <div className="terraschnitt__actions">
            <a className="terraschnitt__cta" href="#kontakt">
              Projekt anfragen <span aria-hidden="true">↗</span>
            </a>
            {activeChapter.key === "fundament" ? (
              <button
                className="terraschnitt__probe"
                type="button"
                aria-pressed={rainActive}
                onClick={() => setRainActive((active) => !active)}
              >
                {rainActive ? "Regen stoppen" : "Regenprobe"}
              </button>
            ) : null}
          </div>
        </div>

        <nav className="terraschnitt__chapters" aria-label="Leistungsweg">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.key}
              type="button"
              className={index === activeIndex ? "is-active" : undefined}
              aria-current={index === activeIndex ? "step" : undefined}
              onClick={() => moveToChapter(index)}
            >
              <span>{chapter.label}</span>
            </button>
          ))}
        </nav>

        <div className="terraschnitt__compare-control">
          <span>Vorher</span>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="0"
            aria-label="Vorher-Nachher-Vergleich"
            onInput={handleCompareInput}
          />
          <span>Fertig</span>
        </div>
      </div>

      <div className="terraschnitt__markers" aria-hidden="true">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.key}
            ref={(node) => {
              markerRefs.current[index] = node;
            }}
            data-terra-marker={index}
          />
        ))}
      </div>

      <ol className="terraschnitt__transcript">
        {chapters.map((chapter) => (
          <li key={chapter.key}>
            <strong>{chapter.label}</strong>
            <span>{chapter.title.join(" ")}</span>
            <p>{chapter.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

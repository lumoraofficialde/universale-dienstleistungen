"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { serviceCatalog } from "../service-catalog";
import { assetPath } from "../site-shell";
import styles from "./chronogarten.module.css";

const garden = serviceCatalog[0];
const winter = serviceCatalog[1];
const property = serviceCatalog[2];
const clearance = serviceCatalog[3];

const stages = [
  {
    key: "intro",
    image: "/media/chronogarten-intro.jpg",
    season: "Ein Jahr",
    number: "365",
    title: ["Ein Objekt.", "Vier Bereiche.", "Ein Ansprechpartner."],
    text: "Für private Haushalte und gewerbliche Objekte — einzeln beauftragt oder passend kombiniert.",
    service: null,
    sun: 11,
  },
  {
    key: "garden",
    image: "/media/chronogarten-garten.jpg",
    season: "Frühling",
    number: "01",
    title: [garden.title],
    text: garden.text,
    service: garden,
    sun: 24,
  },
  {
    key: "property",
    image: "/media/chronogarten-hausmeister.jpg",
    season: "Sommer",
    number: "02",
    title: [property.title],
    text: property.text,
    service: property,
    sun: 40,
  },
  {
    key: "clear",
    image: "/media/chronogarten-entruempelung.jpg",
    season: "Herbst",
    number: "03",
    title: [clearance.title],
    text: clearance.text,
    service: clearance,
    sun: 61,
  },
  {
    key: "winter",
    image: "/media/chronogarten-winter.jpg",
    season: "Winter",
    number: "04",
    title: [winter.title],
    text: winter.text,
    service: winter,
    sun: 82,
  },
] as const;

const timelineStages = [stages[1], stages[2], stages[3], stages[4]];

type ChronogartenProps = {
  onChooseService?: (service: string) => void;
};

export function Chronogarten({ onChooseService }: ChronogartenProps) {
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const visualRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeStage = stages[activeIndex];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(media.matches);

    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible || visible.intersectionRatio < 0.42) return;
        const nextIndex = Number(
          (visible.target as HTMLElement).dataset.chronogartenMarker,
        );
        if (Number.isFinite(nextIndex)) setActiveIndex(nextIndex);
      },
      { threshold: [0.42, 0.58, 0.74] },
    );

    markerRefs.current.forEach((marker) => {
      if (marker) observer.observe(marker);
    });

    return () => observer.disconnect();
  }, [reducedMotion]);

  const moveToStage = (index: number) => {
    if (reducedMotion) {
      setActiveIndex(index);
      return;
    }

    markerRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--chrono-lens-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--chrono-lens-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  return (
    <section
      className={styles.root}
      id="unternehmen"
      aria-labelledby="chronogarten-title"
      data-nav-section="leistungen"
      data-stage={activeStage.key}
      style={{ "--chrono-sun": `${activeStage.sun}%` } as React.CSSProperties}
    >
      <div className={styles.sticky}>
        <div
          ref={visualRef}
          className={styles.visual}
          onPointerMove={handlePointerMove}
          onPointerEnter={(event) => {
            if (event.pointerType !== "touch") {
              event.currentTarget.classList.add(styles.inspecting);
            }
          }}
          onPointerLeave={(event) => {
            event.currentTarget.classList.remove(styles.inspecting);
          }}
          aria-hidden="true"
        >
          {stages.map((stage, index) => (
            <img
              className={`${styles.image} ${
                index === activeIndex ? styles.imageActive : ""
              }`}
              src={assetPath(stage.image)}
              alt=""
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              key={stage.key}
            />
          ))}
          <img
            className={styles.timeLens}
            src={assetPath(stages[0].image)}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <div className={styles.seasonWipe} key={activeStage.key} />
          <div className={styles.weather}>
            {Array.from({ length: 12 }, (_, index) => (
              <i style={{ "--particle": index } as React.CSSProperties} key={index} />
            ))}
          </div>
        </div>

        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.ghostNumber} aria-hidden="true">
          {activeStage.number}
        </div>
        <div className={styles.sunTrack} aria-hidden="true">
          <i />
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span>Chronogarten</span>
            <span>{activeStage.season}</span>
          </p>
          <div className={styles.copyChange} key={activeStage.key}>
            <h2 id="chronogarten-title">
              {activeStage.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p>{activeStage.text}</p>
          </div>
          <a
            className={styles.cta}
            href="#kontakt"
            onClick={() => {
              if (activeStage.service) {
                onChooseService?.(activeStage.service.formValue);
              }
            }}
          >
            Leistung anfragen <span aria-hidden="true">↗</span>
          </a>
        </div>

        <nav className={styles.timeline} aria-label="Vier Leistungsbereiche">
          {timelineStages.map((stage, timelineIndex) => {
            const stageIndex = timelineIndex + 1;
            const isActive = activeIndex === stageIndex;
            return (
              <button
                type="button"
                className={isActive ? styles.timelineActive : undefined}
                aria-current={isActive ? "step" : undefined}
                onClick={() => moveToStage(stageIndex)}
                key={stage.key}
              >
                <span>{stage.service?.title}</span>
              </button>
            );
          })}
        </nav>

        <p
          className={`${styles.lensHint} ${
            activeStage.key === "winter" ? styles.lensHintVisible : ""
          }`}
        >
          Zeitlinse <span>Frühjahr ansehen</span>
        </p>
      </div>

      <div className={styles.markers} aria-hidden="true">
        {stages.map((stage, index) => (
          <div
            ref={(node) => {
              markerRefs.current[index] = node;
            }}
            data-chronogarten-marker={index}
            key={stage.key}
          />
        ))}
      </div>

      <ol className={styles.transcript}>
        {timelineStages.map((stage) => (
          <li key={stage.key}>
            <strong>{stage.service?.title}</strong>
            <p>{stage.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { assetPath } from "../site-shell";
import type { ServicePageData } from "./service-data";
import styles from "./service-page.module.css";

function withBasePathInSrcSet(srcSet?: string) {
  if (!srcSet) return undefined;

  return srcSet
    .split(",")
    .map((candidate) => {
      const [path, descriptor] = candidate.trim().split(/\s+/, 2);
      return `${assetPath(path)}${descriptor ? ` ${descriptor}` : ""}`;
    })
    .join(", ");
}

export function ServiceJourney({ service }: { service: ServicePageData }) {
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [staticMode, setStaticMode] = useState(false);
  const activeStage = service.stages[activeIndex];

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 780px) and (orientation: landscape), (max-width: 780px) and (max-height: 640px) and (orientation: portrait)",
    );
    const syncPreference = () => setStaticMode(media.matches);

    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (staticMode) return;

    const visibleRatios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(
            entry.target,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        const visible = Array.from(visibleRatios.entries()).sort(
          (a, b) => b[1] - a[1],
        )[0];
        if (!visible || visible[1] < 0.42) return;

        const nextIndex = Number(
          (visible[0] as HTMLElement).dataset.serviceMarker,
        );
        if (Number.isFinite(nextIndex)) setActiveIndex(nextIndex);
      },
      { threshold: [0.42, 0.58, 0.74] },
    );

    markerRefs.current.forEach((marker) => {
      if (!marker) return;
      visibleRatios.set(marker, 0);
      observer.observe(marker);
    });

    return () => {
      observer.disconnect();
      visibleRatios.clear();
    };
  }, [staticMode]);

  const moveToStage = (index: number) => {
    if (staticMode) {
      setActiveIndex(index);
      return;
    }

    markerRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section
      className={styles.journey}
      id="top"
      data-service={service.slug}
      data-stage={activeStage.key}
      data-stage-index={activeIndex}
      style={
        {
          "--service-stages": service.stages.length,
          "--service-progress": `${
            (activeIndex / Math.max(service.stages.length - 1, 1)) * 100
          }%`,
        } as CSSProperties
      }
    >
      <div className={styles.sticky}>
        <div className={styles.visual} aria-hidden="true">
          {service.stages.map((stage, index) => (
            <picture key={`${stage.key}-${stage.image.src}`}>
              {stage.image.mobileSrc ? (
                <source
                  media="(max-width: 480px) and (orientation: portrait)"
                  srcSet={assetPath(stage.image.mobileSrc)}
                />
              ) : null}
              <img
                className={`${styles.image} ${
                  index === activeIndex ? styles.imageActive : ""
                }`}
                src={assetPath(stage.image.src)}
                srcSet={withBasePathInSrcSet(stage.image.srcSet)}
                sizes="(max-width: 780px) 160vh, 100vw"
                width={stage.image.width}
                height={stage.image.height}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "low"}
                style={
                  {
                    "--service-position":
                      stage.image.position ?? "center",
                    "--service-mobile-position":
                      stage.image.mobilePosition ??
                      stage.image.position ??
                      "center",
                  } as CSSProperties
                }
              />
            </picture>
          ))}
        </div>

        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.ghostNumber} aria-hidden="true">
          {activeStage.number}
        </div>

        <div
          className={styles.copy}
          aria-hidden={staticMode ? true : undefined}
        >
          <p className={styles.eyebrow}>
            <span>{service.name}</span>
            <span>{activeStage.label}</span>
          </p>

          <div
            className={styles.copyChange}
            key={activeStage.key}
            aria-live="polite"
            aria-atomic="true"
          >
            <h1>
              {activeStage.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p>{activeStage.text}</p>
            <ul>
              {activeStage.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <a
            className={styles.primaryAction}
            href="#kontakt"
            tabIndex={staticMode ? -1 : undefined}
          >
            {service.formValue} anfragen <span aria-hidden="true">↗︎</span>
          </a>
        </div>

        <nav
          className={styles.stageNavigation}
          aria-label={`Kapitel zu ${service.name}`}
        >
          {service.stages.map((stage, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                type="button"
                aria-current={isActive ? "step" : undefined}
                aria-label={`${stage.label}: ${stage.title.join(" ")}`}
                className={isActive ? styles.stageActive : undefined}
                onClick={() => moveToStage(index)}
                key={stage.key}
              >
                <span>{stage.label}</span>
                <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
              </button>
            );
          })}
        </nav>

        <div className={styles.progressRail} aria-hidden="true">
          <i />
        </div>

        <p className={styles.scrollHint} aria-hidden="true">
          Scrollen <span>↓</span>
        </p>
      </div>

      <div className={styles.markers} aria-hidden="true">
        {service.stages.map((stage, index) => (
          <div
            ref={(node) => {
              markerRefs.current[index] = node;
            }}
            data-service-marker={index}
            key={stage.key}
          />
        ))}
      </div>

      <ol
        className={styles.transcript}
        aria-hidden={staticMode ? undefined : true}
      >
        {service.stages.map((stage, index) => (
          <li key={stage.key}>
            <p>{stage.label}</p>
            <div>
              {index === 0 && staticMode ? (
                <h1>{stage.title.join(" ")}</h1>
              ) : (
                <h2>{stage.title.join(" ")}</h2>
              )}
              <p>{stage.text}</p>
            </div>
            <ul>
              {stage.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
        <li className={styles.transcriptAction}>
          <a href="#kontakt">
            {service.formValue} anfragen <span aria-hidden="true">↗︎</span>
          </a>
        </li>
      </ol>
    </section>
  );
}

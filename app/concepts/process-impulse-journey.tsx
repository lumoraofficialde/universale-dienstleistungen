"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "../site-shell";
import styles from "./process-impulse-journey.module.css";

const processSteps = [
  {
    id: "anfrage",
    label: "Anfrage",
    title: "Sie erzählen.",
    text: "Telefonisch, per E-Mail oder im Formular. Ein paar Eckdaten reichen für den Anfang.",
    detail: "Telefon, E-Mail oder Formular",
  },
  {
    id: "planung",
    label: "Planung",
    title: "Wir planen.",
    text: "Wir prüfen die Aufgabe, stimmen Aufwand und Termin ab und stellen das passende Team zusammen.",
    detail: "Umfang, Termin und Angebot",
  },
  {
    id: "umsetzung",
    label: "Umsetzung",
    title: "Wir erledigen.",
    text: "Unser Team setzt fachgerecht um, kommuniziert klar und hinterlässt die Fläche sauber.",
    detail: "Team, Technik und saubere Übergabe",
  },
] as const;

export function ProcessImpulseJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const actionRef = useRef<HTMLAnchorElement>(null);
  const [staticMode, setStaticMode] = useState(false);
  const [enhanced, setEnhanced] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-height: 636px)",
    );
    const syncMode = () => setStaticMode(media.matches);

    syncMode();
    media.addEventListener("change", syncMode);
    return () => media.removeEventListener("change", syncMode);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const image = imageRef.current;
    const desktopPath = desktopPathRef.current;
    const mobilePath = mobilePathRef.current;
    const pulse = pulseRef.current;
    const sweep = sweepRef.current;
    const action = actionRef.current;
    const copies = copyRefs.current.filter(
      (copy): copy is HTMLDivElement => Boolean(copy),
    );

    const staticMedia = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-height: 636px)",
    );

    if (
      staticMode ||
      staticMedia.matches ||
      !root ||
      !image ||
      !desktopPath ||
      !mobilePath ||
      !pulse ||
      !sweep ||
      !action ||
      copies.length !== processSteps.length + 1
    ) {
      setEnhanced(false);
      return;
    }

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    let alive = true;

    const context = gsap.context(() => {
      const motionQueries = gsap.matchMedia();

      motionQueries.add(
        {
          mobile: "(max-width: 780px)",
          desktop: "(min-width: 781px)",
        },
        (queryContext) => {
          const isMobile = Boolean(queryContext.conditions?.mobile);
          const topOffset = isMobile ? 68 : 76;
          const activePath = isMobile ? mobilePath : desktopPath;
          const inactivePath = isMobile ? desktopPath : mobilePath;
          const camera = isMobile
            ? {
                introX: -42,
                introY: 0,
                introScale: 1.03,
                requestX: -15,
                requestY: 1,
                requestScale: 1.12,
                planX: -50,
                planY: -7,
                planScale: 1.23,
                workX: -87,
                workY: -2,
                workScale: 1.1,
              }
            : {
                introX: 0,
                introY: 0,
                introScale: 1.03,
                requestX: 13,
                requestY: 3,
                requestScale: 1.32,
                planX: 0,
                planY: 7,
                planScale: 1.42,
                workX: -13,
                workY: -2,
                workScale: 1.27,
              };

          gsap.set(image, {
            autoAlpha: 1,
            xPercent: camera.introX,
            yPercent: camera.introY,
            scale: camera.introScale,
          });
          gsap.set(copies, { autoAlpha: 0, y: 22 });
          gsap.set(copies[0], { autoAlpha: 1, y: 0 });
          gsap.set([desktopPath, mobilePath], {
            strokeDashoffset: 1,
          });
          gsap.set(inactivePath, { autoAlpha: 0 });
          gsap.set(activePath, { autoAlpha: 1 });
          gsap.set(pulse, { autoAlpha: 0 });
          gsap.set(action, { autoAlpha: 0, y: 18 });
          gsap.set(sweep, { autoAlpha: 0, xPercent: -145 });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: () => `top top+=${topOffset}`,
              end: "bottom bottom",
              scrub: isMobile ? 0.55 : 0.65,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(
              image,
              {
                xPercent: camera.requestX,
                yPercent: camera.requestY,
                scale: camera.requestScale,
                duration: 0.9,
              },
              0.08,
            )
            .to(
              activePath,
              {
                strokeDashoffset: 0,
                duration: 3.36,
              },
              0.16,
            )
            .to(pulse, { autoAlpha: 1, duration: 0.12 }, 0.16)
            .to(
              pulse,
              {
                motionPath: {
                  path: activePath,
                  align: activePath,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                  start: 0,
                  end: 1,
                },
                duration: 3.36,
              },
              0.16,
            )
            .to(copies[0], { autoAlpha: 0, y: -20, duration: 0.24 }, 0.16)
            .fromTo(
              copies[1],
              { autoAlpha: 0, y: 22 },
              { autoAlpha: 1, y: 0, duration: 0.28 },
              0.42,
            )
            .to(
              sweep,
              {
                autoAlpha: 0.54,
                xPercent: 150,
                duration: 0.72,
              },
              0.17,
            )
            .to(sweep, { autoAlpha: 0, duration: 0.15 }, 0.9)
            .to(copies[1], { autoAlpha: 0, y: -20, duration: 0.24 }, 1.03)
            .to(
              image,
              {
                xPercent: camera.planX,
                yPercent: camera.planY,
                scale: camera.planScale,
                duration: 0.96,
              },
              1.02,
            )
            .fromTo(
              copies[2],
              { autoAlpha: 0, y: 22 },
              { autoAlpha: 1, y: 0, duration: 0.28 },
              1.33,
            )
            .fromTo(
              sweep,
              { autoAlpha: 0, xPercent: -145 },
              { autoAlpha: 0.42, xPercent: 150, duration: 0.7 },
              1.13,
            )
            .to(sweep, { autoAlpha: 0, duration: 0.14 }, 1.84)
            .to(copies[2], { autoAlpha: 0, y: -20, duration: 0.24 }, 2.07)
            .to(
              image,
              {
                xPercent: camera.workX,
                yPercent: camera.workY,
                scale: camera.workScale,
                duration: 1.02,
              },
              2.03,
            )
            .fromTo(
              copies[3],
              { autoAlpha: 0, y: 22 },
              { autoAlpha: 1, y: 0, duration: 0.3 },
              2.38,
            )
            .fromTo(
              sweep,
              { autoAlpha: 0, xPercent: -145 },
              { autoAlpha: 0.48, xPercent: 150, duration: 0.76 },
              2.12,
            )
            .to(sweep, { autoAlpha: 0, duration: 0.15 }, 2.89)
            .to(
              image,
              {
                xPercent: camera.introX,
                yPercent: camera.introY,
                scale: camera.introScale,
                duration: 0.7,
              },
              3.04,
            )
            .to(copies[3], { y: isMobile ? -30 : -16, duration: 0.7 }, 3.04)
            .to(
              action,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.28,
              },
              3.3,
            )
            .to(pulse, { autoAlpha: 0, duration: 0.18 }, 3.42)
            .to({}, { duration: 0.24 });

          setEnhanced(true);

          return undefined;
        },
      );

      return () => motionQueries.revert();
    }, root);

    const refreshAfterAssets = async () => {
      await Promise.allSettled([
        image.complete ? Promise.resolve() : image.decode().catch(() => undefined),
        document.fonts?.ready,
      ]);
      if (alive) ScrollTrigger.refresh();
    };

    void refreshAfterAssets();

    return () => {
      alive = false;
      context.revert();
    };
  }, [staticMode]);

  return (
    <section
      ref={rootRef}
      className={styles.root}
      aria-labelledby="process-impulse-title"
      data-enhanced={enhanced ? "true" : "false"}
    >
      <div className={styles.staticStory}>
        <p className={styles.staticChapter}>So arbeiten wir</p>
        <h2 id="process-impulse-title">Drei Schritte. Kein Umweg.</h2>
        <p className={styles.staticIntro}>
          Sie geben den Startschuss. Danach halten wir Abstimmung,
          Organisation und Umsetzung so einfach wie möglich.
        </p>
        <ol>
          {processSteps.map((step) => (
            <li key={step.id}>
              <p>{step.label}</p>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <strong>{step.detail}</strong>
            </li>
          ))}
        </ol>
        <a
          className={styles.staticAction}
          href="#kontakt"
          aria-hidden={enhanced ? true : undefined}
          tabIndex={enhanced ? -1 : undefined}
        >
          Projekt anfragen <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className={styles.sticky}>
        <picture className={styles.media}>
          <source
            srcSet={`${assetPath("/media/process-impulse-panorama-960.webp")} 960w, ${assetPath("/media/process-impulse-panorama.webp")} 1672w`}
            sizes="(max-width: 780px) 178vh, 100vw"
          />
          <img
            ref={imageRef}
            src={assetPath("/media/process-impulse-panorama.webp")}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>

        <div className={styles.scrim} aria-hidden="true" />
        <div ref={sweepRef} className={styles.lightSweep} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />

        <svg
          className={`${styles.impulsePath} ${styles.desktopPath}`}
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={desktopPathRef}
            d="M 126 690 C 272 650 304 510 448 494 C 596 478 642 605 790 544 C 936 484 925 313 1086 306 C 1244 300 1280 431 1491 356"
            pathLength="1"
          />
        </svg>

        <svg
          className={`${styles.impulsePath} ${styles.mobilePath}`}
          viewBox="0 0 390 844"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={mobilePathRef}
            d="M 52 690 C 66 587 286 606 289 476 C 291 353 76 372 91 238 C 104 129 243 144 329 82"
            pathLength="1"
          />
        </svg>

        <div ref={pulseRef} className={styles.pulse} aria-hidden="true">
          <span />
        </div>

        <div className={styles.copyDeck} aria-hidden="true">
          <div
            ref={(node) => {
              copyRefs.current[0] = node;
            }}
            className={styles.copyFrame}
          >
            <p className={styles.chapter}>So arbeiten wir</p>
            <h2>Drei Schritte. Kein Umweg.</h2>
            <p>
              Eine klare Linie vom ersten Gespräch bis zur sauber übergebenen
              Fläche.
            </p>
          </div>

          {processSteps.map((step, index) => (
            <div
              ref={(node) => {
                copyRefs.current[index + 1] = node;
              }}
              className={styles.copyFrame}
              key={step.id}
            >
              <p className={styles.chapter}>{step.label}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <strong>{step.detail}</strong>
            </div>
          ))}
        </div>

        <a
          ref={actionRef}
          className={styles.action}
          href="#kontakt"
          aria-hidden={enhanced ? undefined : true}
          tabIndex={enhanced ? undefined : -1}
        >
          Projekt anfragen <span aria-hidden="true">→</span>
        </a>
      </div>

    </section>
  );
}

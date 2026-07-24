"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "../site-shell";
import styles from "./fleet-scale-journey.module.css";

const stages = [
  {
    id: "kante",
    label: "Kante",
    title: "Saubere Konturen.",
    text: "Für Form- und Rückschnitt an Hecken und Gehölzen — auch in unterschiedlichen Größenbereichen.",
    equipment: ["Technik für Hecken- und Rückschnitt"],
  },
  {
    id: "objekt",
    label: "Objekt",
    title: "Präzise am Objekt.",
    text: "Für wendige, saubere Grünpflege rund um Eigenheime und kleinere Objekte.",
    equipment: ["Mähwerke für Eigenheime"],
  },
  {
    id: "flaeche",
    label: "Fläche",
    title: "Effizient auf Fläche.",
    text: "Für gleichmäßige Pflege größerer Grünflächen mit dafür ausgelegten Mähwerken.",
    equipment: ["Mähwerke für Großflächen"],
  },
  {
    id: "winter",
    label: "Winter",
    title: "Bereit, wenn Winter einsetzt.",
    text: "Für Treppen, Wege, Zufahrten, Parkplätze und Höfe — räumen, streuen und Schnee gezielt beseitigen.",
    equipment: [
      "Räumfahrzeuge mit Streusystem",
      "Mobile Schneefräsen",
    ],
  },
  {
    id: "einsatz",
    label: "Einsatz",
    title: "Schnell vor Ort.",
    text: "Das 3,5-t-Einsatzfahrzeug bringt Personal und benötigte Technik abgestimmt zum Einsatzort.",
    equipment: ["3,5-t-Einsatzfahrzeug"],
  },
] as const;

export function FleetScaleJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const macroRef = useRef<HTMLImageElement>(null);
  const summerRef = useRef<HTMLImageElement>(null);
  const winterRef = useRef<HTMLImageElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const frostRef = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const staticRefs = useRef<Array<HTMLLIElement | null>>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 780px) and (max-height: 620px)",
    );
    const syncMode = () => setStaticMode(media.matches);

    syncMode();
    media.addEventListener("change", syncMode);
    return () => media.removeEventListener("change", syncMode);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const macro = macroRef.current;
    const summer = summerRef.current;
    const winter = winterRef.current;
    const light = lightRef.current;
    const frost = frostRef.current;
    const copies = copyRefs.current.filter(
      (copy): copy is HTMLDivElement => Boolean(copy),
    );

    if (
      staticMode ||
      !root ||
      !macro ||
      !summer ||
      !winter ||
      !light ||
      !frost ||
      copies.length !== stages.length
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
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
          const positions = isMobile
            ? {
                macroX: -50,
                objectStartX: -43,
                objectX: -43,
                objectY: 4,
                objectStartScale: 1.55,
                objectScale: 1.32,
                areaX: -20,
                areaY: 0,
                areaScale: 1.03,
                vehicleX: -70,
                vehicleY: -12,
                vehicleScale: 1.35,
              }
            : {
                macroX: 0,
                objectStartX: -4,
                objectX: -4,
                objectY: 7,
                objectStartScale: 1.66,
                objectScale: 1.42,
                areaX: 0,
                areaY: 0,
                areaScale: 1.03,
                vehicleX: -13,
                vehicleY: -15,
                vehicleScale: 1.48,
              };

          gsap.set(macro, {
            autoAlpha: 1,
            xPercent: positions.macroX,
            yPercent: 0,
            scale: 1.02,
          });
          gsap.set(summer, {
            autoAlpha: 0,
            xPercent: positions.objectStartX,
            yPercent: positions.objectY,
            scale: positions.objectStartScale,
          });
          gsap.set(winter, {
            autoAlpha: 0,
            xPercent: positions.areaX,
            yPercent: positions.areaY,
            scale: positions.areaScale,
          });
          gsap.set(copies, { autoAlpha: 0, y: 18 });
          gsap.set(copies[0], { autoAlpha: 1, y: 0 });
          gsap.set(light, { autoAlpha: 0, xPercent: -130 });
          gsap.set(frost, { autoAlpha: 0, xPercent: -130 });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: () => `top top+=${topOffset}`,
              end: "bottom bottom",
              scrub: 0.7,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const nextIndex = Math.min(
                  stages.length - 1,
                  Math.max(0, Math.round(self.progress * (stages.length - 1))),
                );
                if (nextIndex === activeIndexRef.current) return;
                activeIndexRef.current = nextIndex;
                setActiveIndex(nextIndex);
              },
            },
          });

          timeline
            .to(
              macro,
              {
                autoAlpha: 0,
                scale: 1.42,
                duration: 0.88,
              },
              0,
            )
            .to(
              summer,
              {
                autoAlpha: 1,
                xPercent: positions.objectX,
                yPercent: positions.objectY,
                scale: positions.objectScale,
                duration: 0.9,
              },
              0.05,
            )
            .to(copies[0], { autoAlpha: 0, y: -18, duration: 0.24 }, 0.08)
            .fromTo(
              copies[1],
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.28 },
              0.5,
            )
            .to(light, { autoAlpha: 0.62, xPercent: 125, duration: 0.62 }, 0.13)
            .to(light, { autoAlpha: 0, duration: 0.18 }, 0.76)
            .to(
              summer,
              {
                xPercent: positions.areaX,
                yPercent: positions.areaY,
                scale: positions.areaScale,
                duration: 1,
              },
              1,
            )
            .to(copies[1], { autoAlpha: 0, y: -18, duration: 0.24 }, 1.08)
            .fromTo(
              copies[2],
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.28 },
              1.5,
            )
            .to(copies[2], { autoAlpha: 0, y: -18, duration: 0.24 }, 2.08)
            .to(summer, { autoAlpha: 0, duration: 0.72 }, 2.08)
            .to(winter, { autoAlpha: 1, duration: 0.72 }, 2.08)
            .fromTo(
              frost,
              { autoAlpha: 0, xPercent: -130 },
              { autoAlpha: 0.72, xPercent: 130, duration: 0.62 },
              2.08,
            )
            .to(frost, { autoAlpha: 0, duration: 0.18 }, 2.7)
            .fromTo(
              copies[3],
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.28 },
              2.5,
            )
            .to(
              winter,
              {
                xPercent: positions.vehicleX,
                yPercent: positions.vehicleY,
                scale: positions.vehicleScale,
                duration: 1,
              },
              3,
            )
            .to(copies[3], { autoAlpha: 0, y: -18, duration: 0.24 }, 3.08)
            .fromTo(
              copies[4],
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.28 },
              3.5,
            )
            .to({}, { duration: 0.22 });

          return undefined;
        },
      );

      return () => motionQueries.revert();
    }, root);

    const refreshAfterAssets = async () => {
      const images = [macro, summer, winter];
      await Promise.allSettled(
        images.map((image) =>
          image.complete
            ? Promise.resolve()
            : image.decode().catch(() => undefined),
        ),
      );
      await document.fonts?.ready;
      if (alive) ScrollTrigger.refresh();
    };

    void refreshAfterAssets();

    return () => {
      alive = false;
      context.revert();
    };
  }, [staticMode]);

  const moveToStage = (index: number) => {
    if (staticMode) {
      setActiveIndex(index);
      activeIndexRef.current = index;
      staticRefs.current[index]?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
      return;
    }

    const root = rootRef.current;
    if (root) {
      const topOffset = window.innerWidth <= 780 ? 68 : 76;
      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      const start = rootTop - topOffset;
      const end = rootTop + root.offsetHeight - window.innerHeight;
      const progress = index / (stages.length - 1);
      window.scrollTo({
        top: start + (end - start) * progress,
        behavior: "smooth",
      });
      return;
    }

    markerRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section
      ref={rootRef}
      className={styles.root}
      id="fuhrpark"
      aria-labelledby="fleet-journey-title"
      data-stage={stages[activeIndex].id}
    >
      <div className={styles.sticky}>
        <div className={styles.media} aria-hidden="true">
          <picture className={styles.layer}>
            <source
              srcSet={`${assetPath("/media/massstabsreise-kante-960.webp")} 960w, ${assetPath("/media/massstabsreise-kante.webp")} 1672w`}
              sizes="100vw"
            />
            <img
              ref={macroRef}
              className={styles.macroImage}
              src={assetPath("/media/massstabsreise-kante.webp")}
              alt=""
              loading="eager"
              decoding="async"
            />
          </picture>

          <picture className={styles.layer}>
            <source
              srcSet={`${assetPath("/media/massstabsreise-landschaft-sommer-960.webp")} 960w, ${assetPath("/media/massstabsreise-landschaft-sommer.webp")} 1440w`}
              sizes="100vw"
            />
            <img
              ref={summerRef}
              src={assetPath("/media/massstabsreise-landschaft-sommer.webp")}
              alt=""
              loading="eager"
              decoding="async"
            />
          </picture>

          <picture className={styles.layer}>
            <source
              srcSet={`${assetPath("/media/massstabsreise-landschaft-winter-960.webp")} 960w, ${assetPath("/media/massstabsreise-landschaft-winter.webp")} 1440w`}
              sizes="100vw"
            />
            <img
              ref={winterRef}
              src={assetPath("/media/massstabsreise-landschaft-winter.webp")}
              alt=""
              loading="eager"
              decoding="async"
            />
          </picture>

          <div ref={lightRef} className={styles.lightSweep} />
          <div ref={frostRef} className={styles.frostFront} />
        </div>

        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.copyDeck} aria-hidden="true">
          {stages.map((stage, index) => (
            <div
              ref={(node) => {
                copyRefs.current[index] = node;
              }}
              className={styles.copyFrame}
              key={stage.id}
            >
              {index === 0 ? (
                <h2>Von der Kante bis zur Großfläche.</h2>
              ) : (
                <h3>{stage.title}</h3>
              )}
              <p>
                {index === 0
                  ? "Nicht jedes Grundstück braucht dieselbe Maschine. Wir wählen Technik nach Fläche, Zugänglichkeit und Aufgabe."
                  : stage.text}
              </p>
              <ul aria-label="Passende Technik">
                {stage.equipment.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <nav className={styles.navigation} aria-label="Maßstabsreise im Fuhrpark">
          {stages.map((stage, index) => (
            <button
              type="button"
              aria-current={index === activeIndex ? "step" : undefined}
              aria-label={`Zu ${stage.label} springen`}
              onClick={() => moveToStage(index)}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                moveToStage(index);
              }}
              key={stage.id}
            >
              <span>{stage.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.markers} aria-hidden="true">
        {stages.map((stage, index) => (
          <div
            ref={(node) => {
              markerRefs.current[index] = node;
            }}
            data-fleet-journey-marker={index}
            key={stage.id}
          />
        ))}
      </div>

      <div className={styles.staticStory}>
        <h2 id="fleet-journey-title">Von der Kante bis zur Großfläche.</h2>
        <p>
          Nicht jedes Grundstück braucht dieselbe Maschine. Wir wählen Technik
          nach Fläche, Zugänglichkeit und Aufgabe.
        </p>
        <ol>
          {stages.map((stage, index) => (
            <li
              ref={(node) => {
                staticRefs.current[index] = node;
              }}
              key={stage.id}
            >
              <span>{stage.label}</span>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
              <ul aria-label={`Technik für ${stage.label}`}>
                {stage.equipment.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

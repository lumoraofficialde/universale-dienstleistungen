"use client";

import {
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "../site-shell";
import styles from "./process-floating-property.module.css";

const processStages = [
  {
    id: "anfrage",
    label: "Anfrage",
    title: "Aufgabe schildern.",
    text: "Teilen Sie uns mit, was vor Ort ansteht und wo der Einsatz stattfinden soll.",
    detail: "Ort, Aufgabe, Terminwunsch",
  },
  {
    id: "planung",
    label: "Planung",
    title: "Einsatz abstimmen.",
    text: "Wir klären Umfang, Zugang und die passende Technik für die Aufgabe.",
    detail: "Umfang, Zugang, Technik",
  },
  {
    id: "umsetzung",
    label: "Umsetzung",
    title: "Vor Ort umsetzen.",
    text: "Die abgestimmten Arbeiten werden am Einsatzort fachgerecht ausgeführt.",
    detail: "Team, Technik, Ausführung",
  },
] as const;

const stageProgress = [0.25, 0.53, 0.79] as const;

export function ProcessFloatingProperty() {
  const rootRef = useRef<HTMLElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef<HTMLImageElement>(null);
  const planRef = useRef<HTMLImageElement>(null);
  const layersRef = useRef<HTMLImageElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const actionRef = useRef<HTMLDivElement>(null);
  const activeStageRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);
  const [staticMode, setStaticMode] = useState(true);
  const enhanced = !staticMode;

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
    const rig = rigRef.current;
    const complete = completeRef.current;
    const plan = planRef.current;
    const layers = layersRef.current;
    const scan = scanRef.current;
    const action = actionRef.current;
    const copies = copyRefs.current.filter(
      (copy): copy is HTMLDivElement => Boolean(copy),
    );
    const words = wordRefs.current.filter(
      (word): word is HTMLSpanElement => Boolean(word),
    );
    const staticMedia = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-height: 636px)",
    );

    if (
      !enhanced ||
      staticMode ||
      staticMedia.matches ||
      !root ||
      !rig ||
      !complete ||
      !plan ||
      !layers ||
      !scan ||
      !action ||
      copies.length !== processStages.length + 1 ||
      words.length !== processStages.length + 1
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

          gsap.set(rig, {
            autoAlpha: 0.42,
            yPercent: isMobile ? 8 : 10,
            scale: isMobile ? 0.92 : 0.9,
          });
          gsap.set(complete, { autoAlpha: 1, yPercent: 0 });
          gsap.set([plan, layers], { autoAlpha: 0, yPercent: 3 });
          gsap.set(copies, { autoAlpha: 0, y: 18 });
          gsap.set(copies[0], { autoAlpha: 1, y: 0 });
          gsap.set(words, { autoAlpha: 0, yPercent: 8 });
          gsap.set(words[0], { autoAlpha: 0.07, yPercent: 0 });
          gsap.set(scan, { autoAlpha: 0, xPercent: -150 });
          gsap.set(action, { autoAlpha: 0, y: 16 });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: () => `top top+=${topOffset}`,
              end: "bottom bottom",
              scrub: isMobile ? 0.52 : 0.68,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const nextStage =
                  self.progress < 0.39 ? 0 : self.progress < 0.68 ? 1 : 2;
                if (nextStage === activeStageRef.current) return;
                activeStageRef.current = nextStage;
                setActiveStage(nextStage);
              },
            },
          });

          timeline
            .to(
              rig,
              {
                autoAlpha: 1,
                yPercent: isMobile ? 2 : 0,
                scale: 1,
                duration: 0.72,
              },
              0,
            )
            .to(copies[0], { autoAlpha: 0, y: -16, duration: 0.24 }, 0.18)
            .to(words[0], { autoAlpha: 0, yPercent: -5, duration: 0.24 }, 0.18)
            .fromTo(
              copies[1],
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.28 },
              0.43,
            )
            .fromTo(
              words[1],
              { autoAlpha: 0, yPercent: 8 },
              { autoAlpha: 0.07, yPercent: 0, duration: 0.36 },
              0.38,
            )
            .to(rig, { scale: isMobile ? 1.08 : 1.025, duration: 0.56 }, 0.55)
            .to(copies[1], { autoAlpha: 0, y: -16, duration: 0.24 }, 1.18)
            .to(words[1], { autoAlpha: 0, yPercent: -5, duration: 0.24 }, 1.18)
            .to(complete, { autoAlpha: 0, duration: 0.7 }, 1.1)
            .to(plan, { autoAlpha: 1, yPercent: 0, duration: 0.72 }, 1.1)
            .fromTo(
              scan,
              { autoAlpha: 0, xPercent: -150 },
              { autoAlpha: 0.62, xPercent: 150, duration: 0.78 },
              1.08,
            )
            .to(scan, { autoAlpha: 0, duration: 0.14 }, 1.86)
            .fromTo(
              copies[2],
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.28 },
              1.48,
            )
            .fromTo(
              words[2],
              { autoAlpha: 0, yPercent: 8 },
              { autoAlpha: 0.07, yPercent: 0, duration: 0.36 },
              1.43,
            )
            .to(
              rig,
              {
                scale: isMobile ? 1.13 : 1.055,
                yPercent: isMobile ? 1 : -1,
                duration: 0.72,
              },
              1.43,
            )
            .to(copies[2], { autoAlpha: 0, y: -16, duration: 0.24 }, 2.32)
            .to(words[2], { autoAlpha: 0, yPercent: -5, duration: 0.24 }, 2.32)
            .to(plan, { autoAlpha: 0, yPercent: -2, duration: 0.72 }, 2.25)
            .fromTo(
              layers,
              { autoAlpha: 0, yPercent: isMobile ? 8 : 5 },
              { autoAlpha: 1, yPercent: 0, duration: 0.78 },
              2.25,
            )
            .fromTo(
              copies[3],
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.3 },
              2.58,
            )
            .fromTo(
              words[3],
              { autoAlpha: 0, yPercent: 8 },
              { autoAlpha: 0.07, yPercent: 0, duration: 0.38 },
              2.53,
            )
            .to(
              rig,
              {
                scale: isMobile ? 1.16 : 1.07,
                yPercent: isMobile ? 3 : 1,
                duration: 0.76,
              },
              2.48,
            )
            .to(layers, { autoAlpha: 0, yPercent: 4, duration: 0.68 }, 3.36)
            .to(
              complete,
              { autoAlpha: 1, yPercent: 0, duration: 0.68 },
              3.36,
            )
            .to(
              rig,
              {
                scale: isMobile ? 1.08 : 1.01,
                yPercent: isMobile ? 2 : 0,
                duration: 0.74,
              },
              3.36,
            )
            .fromTo(
              scan,
              { autoAlpha: 0, xPercent: -150 },
              { autoAlpha: 0.38, xPercent: 150, duration: 0.7 },
              3.34,
            )
            .to(scan, { autoAlpha: 0, duration: 0.14 }, 4.04)
            .to(
              action,
              { autoAlpha: 1, y: 0, duration: 0.3 },
              3.72,
            )
            .to({}, { duration: 0.28 });

          return undefined;
        },
      );

      return () => motionQueries.revert();
    }, root);

    const refreshAfterAssets = async () => {
      await Promise.allSettled([
        ...[complete, plan, layers].map((image) =>
          image.complete ? Promise.resolve() : image.decode().catch(() => undefined),
        ),
        document.fonts?.ready,
      ]);
      if (alive) ScrollTrigger.refresh();
    };

    void refreshAfterAssets();

    return () => {
      alive = false;
      context.revert();
    };
  }, [enhanced, staticMode]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltRef.current?.style.setProperty("--terrain-tilt-x", `${y * -2.2}deg`);
    tiltRef.current?.style.setProperty("--terrain-tilt-y", `${x * 2.8}deg`);
  };

  const resetPointerTilt = () => {
    tiltRef.current?.style.setProperty("--terrain-tilt-x", "0deg");
    tiltRef.current?.style.setProperty("--terrain-tilt-y", "0deg");
  };

  const goToStage = (index: number) => {
    const root = rootRef.current;
    if (!root) return;
    const topOffset = window.innerWidth <= 780 ? 68 : 76;
    const stageHeight = Math.max(
      0,
      root.offsetHeight - (window.innerHeight - topOffset),
    );
    const rootTop = window.scrollY + root.getBoundingClientRect().top;

    window.scrollTo({
      top: rootTop + stageHeight * stageProgress[index],
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section
      ref={rootRef}
      className={styles.root}
      aria-labelledby="floating-property-title"
      data-enhanced={enhanced ? "true" : "false"}
    >
      <article className={styles.staticStory}>
        <header>
          <p className={styles.staticLabel}>So läuft es ab</p>
          <h2 id="floating-property-title">
            Von der Anfrage bis zur Umsetzung.
          </h2>
          <p className={styles.staticIntro}>
            Sie schildern die Aufgabe. Wir stimmen den Einsatz ab. Danach
            beginnt die Umsetzung vor Ort.
          </p>
        </header>

        <figure className={styles.staticFigure}>
          <picture>
            <source
              srcSet={`${assetPath("/media/process-floating-property-complete-960.jpg")} 960w, ${assetPath("/media/process-floating-property-complete.jpg")} 1672w`}
              sizes="(max-width: 780px) 100vw, 86vw"
            />
            <img
              src={assetPath("/media/process-floating-property-complete.jpg")}
              alt="Schwebendes Landschaftsmodell mit Garten, Weg und sichtbaren Bodenschichten"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <figcaption>
            Vom ersten Gespräch bis zur fachgerechten Ausführung.
          </figcaption>
        </figure>

        <ol>
          {processStages.map((stage) => (
            <li key={stage.id}>
              <p>{stage.label}</p>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </div>
              <strong>{stage.detail}</strong>
            </li>
          ))}
        </ol>

        <a
          className={styles.staticAction}
          href="#kontakt"
          aria-hidden={enhanced ? true : undefined}
          tabIndex={enhanced ? -1 : undefined}
        >
          Aufgabe besprechen <span aria-hidden="true">→</span>
        </a>
      </article>

      <div className={styles.sticky}>
        <div
          className={styles.visual}
          aria-hidden="true"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointerTilt}
        >
          <div ref={rigRef} className={styles.rig}>
            <div ref={tiltRef} className={styles.tilt}>
              <picture className={styles.mediaState}>
                <source
                  srcSet={`${assetPath("/media/process-floating-property-complete-960.jpg")} 960w, ${assetPath("/media/process-floating-property-complete.jpg")} 1672w`}
                  sizes="(max-width: 780px) 150vw, 100vw"
                />
                <img
                  ref={completeRef}
                  src={assetPath("/media/process-floating-property-complete.jpg")}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </picture>

              <picture className={styles.mediaState}>
                <source
                  srcSet={`${assetPath("/media/process-floating-property-plan-960.jpg")} 960w, ${assetPath("/media/process-floating-property-plan.jpg")} 1672w`}
                  sizes="(max-width: 780px) 150vw, 100vw"
                />
                <img
                  ref={planRef}
                  src={assetPath("/media/process-floating-property-plan.jpg")}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </picture>

              <picture className={styles.mediaState}>
                <source
                  srcSet={`${assetPath("/media/process-floating-property-layers-960.jpg")} 960w, ${assetPath("/media/process-floating-property-layers.jpg")} 1672w`}
                  sizes="(max-width: 780px) 150vw, 100vw"
                />
                <img
                  ref={layersRef}
                  src={assetPath("/media/process-floating-property-layers.jpg")}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          </div>

          <div ref={scanRef} className={styles.scan} />
        </div>

        <div className={styles.backgroundWords} aria-hidden="true">
          {["PRÄZISION", "ANFRAGE", "PLANUNG", "UMSETZUNG"].map(
            (word, index) => (
              <span
                ref={(node) => {
                  wordRefs.current[index] = node;
                }}
                key={word}
              >
                {word}
              </span>
            ),
          )}
        </div>

        <div className={styles.copyDeck} aria-hidden="true">
          <div
            ref={(node) => {
              copyRefs.current[0] = node;
            }}
            className={styles.copyFrame}
          >
            <h2>
              <span>Vom Auftrag</span>
              <span>zum Ergebnis.</span>
            </h2>
            <p>
              Ein Auftrag wird sichtbar, bevor der erste Handgriff beginnt.
            </p>
          </div>

          {processStages.map((stage, index) => (
            <div
              ref={(node) => {
                copyRefs.current[index + 1] = node;
              }}
              className={styles.copyFrame}
              key={stage.id}
            >
              <p className={styles.stageLabel}>{stage.label}</p>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
              <strong>{stage.detail}</strong>
            </div>
          ))}
        </div>

        <nav className={styles.stageNav} aria-label="Ablauf">
          {processStages.map((stage, index) => (
            <button
              type="button"
              key={stage.id}
              aria-current={activeStage === index ? "step" : undefined}
              onClick={() => goToStage(index)}
            >
              {stage.label}
            </button>
          ))}
        </nav>

        <div
          ref={actionRef}
          className={styles.actionWrap}
          aria-hidden={enhanced ? undefined : true}
        >
          <a
            className={styles.action}
            href="#kontakt"
            tabIndex={enhanced ? undefined : -1}
          >
            Aufgabe besprechen <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

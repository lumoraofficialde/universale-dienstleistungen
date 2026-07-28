import {
  MobileCall,
  SiteFooter,
  SiteHeader,
  SiteMotion,
} from "../site-shell";
import styles from "./service-page.module.css";
import {
  buildServiceStructuredData,
  servicePageLinks,
  type ServicePageData,
} from "./service-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;
const pagePath = (path: string) => `${basePath}${path}`;

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

function ServiceImage({
  image,
  priority = false,
}: {
  image: ServicePageData["heroImage"];
  priority?: boolean;
}) {
  return (
    <picture>
      {image.mobileSrc ? (
        <source
          media="(max-width: 720px)"
          srcSet={assetPath(image.mobileSrc)}
        />
      ) : null}
      <img
        src={assetPath(image.src)}
        srcSet={withBasePathInSrcSet(image.srcSet)}
        sizes={priority ? "100vw" : "(max-width: 780px) 92vw, 45vw"}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        style={{ objectPosition: image.position }}
      />
    </picture>
  );
}

export function ServicePage({ service }: { service: ServicePageData }) {
  const whatsappHref = `https://wa.me/491738948124?text=${encodeURIComponent(
    service.whatsappText,
  )}`;
  const mailHref = `mailto:info@universale-dienstleistungen.de?subject=${encodeURIComponent(
    `Anfrage: ${service.name}`,
  )}`;
  const structuredData = buildServiceStructuredData(service);
  const relatedServices = servicePageLinks.filter(
    (item) => item.slug !== service.slug,
  );

  return (
    <>
      <SiteMotion />
      <SiteHeader currentPage="service" />

      <main
        id="main"
        className={styles.page}
        data-service-page={service.slug}
        tabIndex={-1}
      >
        <section
          className={`${styles.hero} hero`}
          id="top"
          aria-labelledby="service-title"
        >
          <div className={styles.heroMedia}>
            <ServiceImage image={service.heroImage} priority />
          </div>
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Universale Dienstleistungen</p>
            <h1 id="service-title">{service.heroTitle}</h1>
            <p className={styles.heroIntro}>{service.heroIntro}</p>
            <div className={styles.heroActions}>
              <a
                className={`button button--accent ${styles.primaryButton}`}
                href={pagePath("/#kontakt")}
              >
                Angebot anfragen <span aria-hidden="true">↗︎</span>
              </a>
              <a
                className={`button button--outline ${styles.secondaryButton}`}
                href="tel:+491738948124"
              >
                Jetzt anrufen
              </a>
            </div>
          </div>
        </section>

        <section
          className={styles.overview}
          aria-labelledby="service-overview-title"
        >
          <div className="container">
            <header className={styles.sectionHeader} data-reveal>
              <h2 id="service-overview-title">
                Leistungen im vereinbarten Umfang.
              </h2>
              <p>{service.overview}</p>
            </header>

            <div className={styles.overviewGrid}>
              <ol className={styles.capabilityList}>
                {service.capabilities.map((capability, index) => (
                  <li
                    key={capability.title}
                    data-reveal={index % 2 === 0 ? "left" : "right"}
                  >
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{capability.title}</h3>
                      <p>{capability.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <figure className={styles.supportingFigure} data-reveal="scale">
                <div className={styles.supportingImage}>
                  <ServiceImage image={service.supportingImage} />
                </div>
                <figcaption>{service.supportingCaption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section
          className={styles.audienceArea}
          aria-labelledby="audience-title"
        >
          <div className={`container ${styles.audienceAreaGrid}`}>
            <div className={styles.audienceBlock}>
              <h2 id="audience-title" data-reveal>
                Für wen wir arbeiten.
              </h2>
              <div className={styles.audienceList}>
                {service.audiences.map((audience) => (
                  <article key={audience.title} data-reveal>
                    <h3>{audience.title}</h3>
                    <p>{audience.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className={styles.areaBlock} data-reveal="right">
              <h2>Einsatzgebiet klar abgestimmt.</h2>
              <div>
                <h3>Private Aufträge</h3>
                <p>{service.areaPrivate}</p>
              </div>
              <div>
                <h3>Gewerbliche Aufträge</h3>
                <p>{service.areaCommercial}</p>
              </div>
              <p className={styles.areaPlaces}>{service.areaPlaces}</p>
            </aside>
          </div>
        </section>

        <section
          className={styles.scope}
          aria-labelledby="scope-title"
        >
          <div className={`container ${styles.scopeInner}`}>
            <header data-reveal>
              <h2 id="scope-title">Was im Angebot festgehalten wird.</h2>
              <p>
                Der konkrete Auftrag zählt. Zusätzliche Arbeiten werden erst
                nach Rücksprache übernommen.
              </p>
            </header>

            <div className={styles.scopeColumns}>
              <div data-reveal="left">
                <h3>Im vereinbarten Auftrag</h3>
                <ul>
                  {service.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div data-reveal="right">
                <h3>Nach gesonderter Abstimmung</h3>
                <ul>
                  {service.byAgreement.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className={styles.boundary} data-reveal>
              <strong>Leistungsgrenze:</strong> {service.boundary}
            </p>
          </div>
        </section>

        <section
          className={styles.process}
          aria-labelledby="process-title"
        >
          <div className="container">
            <header className={styles.sectionHeader} data-reveal>
              <h2 id="process-title">
                So wird aus einer Anfrage ein Einsatz.
              </h2>
              <p>
                Wenige klare Angaben reichen für den Start. Den Rest klären wir
                direkt und passend zur Aufgabe.
              </p>
            </header>
            <ol className={styles.processList}>
              {service.process.map((item, index) => (
                <li key={item.title} data-reveal>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="faq-title">
          <div className={`container ${styles.faqGrid}`}>
            <header data-reveal>
              <h2 id="faq-title">Häufige Fragen zu {service.name}.</h2>
              <p>
                Keine passende Antwort gefunden? Schildern Sie uns kurz den
                Einsatzort und die gewünschte Aufgabe.
              </p>
            </header>
            <div className={styles.faqList}>
              {service.faqs.map((faq, index) => (
                <details key={faq.question} data-reveal open={index === 0}>
                  <summary>
                    <span>{faq.question}</span>
                    <i aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className={styles.related}
          aria-labelledby="related-title"
        >
          <div className={`container ${styles.relatedInner}`}>
            <h2 id="related-title">Weitere Leistungen.</h2>
            <nav aria-label="Weitere Leistungsseiten">
              {relatedServices.map((item) => (
                <a key={item.slug} href={pagePath(item.href)}>
                  {item.label} <span aria-hidden="true">↗︎</span>
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section
          className={styles.contact}
          id="kontakt"
          aria-labelledby="contact-title"
        >
          <div className={`container ${styles.contactInner}`} data-reveal>
            <div>
              <h2 id="contact-title">
                {service.name} konkret anfragen.
              </h2>
              <p>
                Nennen Sie Einsatzort, gewünschten Umfang und einen passenden
                Zeitraum. Wir klären die nächsten Schritte mit Ihnen.
              </p>
            </div>
            <div className={styles.contactOptions}>
              <a href="tel:+491738948124">
                <span>Telefon</span>
                <strong>+49 173 8948124</strong>
              </a>
              <a href={mailHref}>
                <span>E-Mail</span>
                <strong>info@universale-dienstleistungen.de</strong>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label={`${service.name} per WhatsApp anfragen`}
              >
                <span>WhatsApp</span>
                <strong>Nachricht schreiben</strong>
              </a>
              <a href={pagePath("/#kontakt")}>
                <span>Online</span>
                <strong>Anfrageformular öffnen</strong>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPage="service" />
      <MobileCall />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}

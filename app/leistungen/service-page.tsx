import { ProcessImpulseJourney } from "../concepts/process-impulse-journey";
import {
  MobileCall,
  SiteFooter,
  SiteHeader,
  SiteMotion,
} from "../site-shell";
import {
  buildServiceStructuredData,
  servicePageLinks,
  type ServicePageData,
} from "./service-data";
import { ServiceJourney } from "./service-journey";
import styles from "./service-page.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ServicePage({ service }: { service: ServicePageData }) {
  const relatedServices = servicePageLinks.filter(
    (item) => item.slug !== service.slug,
  );
  const mailHref = `mailto:info@universale-dienstleistungen.de?subject=${encodeURIComponent(
    `Anfrage: ${service.formValue}`,
  )}`;

  return (
    <>
      <SiteMotion />
      <SiteHeader currentPage="service" />

      <main id="main" className={styles.page} tabIndex={-1}>
        <ServiceJourney service={service} />

        <ProcessImpulseJourney data={service.insight} />

        <section
          className={styles.contact}
          id="kontakt"
          aria-labelledby="service-contact-title"
        >
          <div className={styles.contactInner}>
            <header>
              <p>Direkt abstimmen</p>
              <h2 id="service-contact-title">
                {service.closingTitle.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
            </header>

            <div className={styles.contactCopy}>
              <p>{service.closingText}</p>
              <div className={styles.contactActions}>
                <a className={styles.contactPrimary} href="tel:+491738948124">
                  Einsatz besprechen <span aria-hidden="true">↗︎</span>
                </a>
                <a href={mailHref}>
                  E-Mail schreiben <span aria-hidden="true">→</span>
                </a>
                <a href={`${basePath}/#kontakt`}>
                  Anfrage vorbereiten <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>

          <nav
            className={styles.related}
            aria-label="Weitere Leistungsseiten"
          >
            <span>Weitere Leistungen</span>
            {relatedServices.map((item) => (
              <a href={`${basePath}${item.href}`} key={item.slug}>
                {item.label} <span aria-hidden="true">↗︎</span>
              </a>
            ))}
          </nav>
        </section>
      </main>

      <SiteFooter currentPage="service" />
      <MobileCall whatsappText={service.whatsappText} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildServiceStructuredData(service)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
    </>
  );
}

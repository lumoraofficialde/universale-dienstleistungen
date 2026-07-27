"use client";

import { useEffect } from "react";

const notFoundTitle = "Seite nicht gefunden | Universale Dienstleistungen";
const notFoundDescription =
  "Die angeforderte Seite wurde nicht gefunden. Zurück zu den Leistungen von Universale Dienstleistungen.";

export function NotFoundMetadata() {
  useEffect(() => {
    const applyMetadata = () => {
      document.title = notFoundTitle;

      const descriptions = Array.from(
        document.head.querySelectorAll<HTMLMetaElement>(
          'meta[name="description"]',
        ),
      );
      const description =
        descriptions.shift() ??
        document.head.appendChild(document.createElement("meta"));
      description.name = "description";
      description.content = notFoundDescription;
      descriptions.forEach((element) => element.remove());

      const robotsDirectives = Array.from(
        document.head.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'),
      );
      const robots =
        robotsDirectives.shift() ??
        document.head.appendChild(document.createElement("meta"));
      robots.name = "robots";
      robots.content = "noindex, nofollow";
      robotsDirectives.forEach((element) => element.remove());

      document.head
        .querySelectorAll('link[rel="canonical"]')
        .forEach((element) => element.remove());
      document.head
        .querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')
        .forEach((element) => element.remove());
    };

    applyMetadata();
    const frame = window.requestAnimationFrame(applyMetadata);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return null;
}

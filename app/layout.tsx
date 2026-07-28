import "./globals.css";
import "./natural.css";
import type { Metadata } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://lumoraofficialde.github.io/universale-dienstleistungen"
).replace(/\/+$/, "");
const canonicalUrl = `${siteUrl}/`;
const previewImage = `${siteUrl}/og.jpg`;
const logoPath = `${siteUrl}/media/universale-logo.png`;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const description =
  "Gartenpflege, Winterdienst, Hausmeisterservice und Entrümpelung für private und gewerbliche Objekte – persönlich koordiniert aus Büsum.";
const title =
  "Gartenpflege, Winterdienst, Hausmeisterservice & Entrümpelung | Universale";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  title,
  description,
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: logoPath,
    shortcut: logoPath,
    apple: logoPath,
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "de_DE",
    url: canonicalUrl,
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Universale Dienstleistungen — Alles im Griff. Bei jedem Wetter.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [previewImage],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${canonicalUrl}#unternehmen`,
  name: "Universale Dienstleistungen GmbH",
  url: canonicalUrl,
  image: previewImage,
  telephone: "+49 173 8948124",
  email: "info@universale-dienstleistungen.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Westerstraße 3",
    postalCode: "25761",
    addressLocality: "Büsum",
    addressCountry: "DE",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dienstleistungen",
    itemListElement: [
      "Gartenpflege",
      "Winterdienst",
      "Hausmeisterservice",
      "Entrümpelung",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
      },
    })),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <head>
        <link
          rel="preload"
          href={`${basePath}/fonts/manrope-variable.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${basePath}/fonts/barlow-condensed-600.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}

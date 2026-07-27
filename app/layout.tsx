import "./globals.css";
import "./natural.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://universale-dienstleistungen.de";
const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "true";
const previewImage = `${siteUrl}/og.jpg`;
const faviconPath = `${siteUrl}/favicon.png`;

export const metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: "Universale Dienstleistungen | Gartenpflege & Winterdienst",
  description:
    "Garten- und Hauspflege, Winterdienst, Hausmeisterservice und Entrümpelung für private und gewerbliche Objekte in Norddeutschland – je nach Auftrag darüber hinaus.",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  robots: {
    index: !isPreview,
    follow: !isPreview,
  },
  icons: {
    icon: faviconPath,
    shortcut: faviconPath,
    apple: faviconPath,
  },
  openGraph: {
    title: "Universale Dienstleistungen",
    description:
      "Garten- und Hauspflege, Winterdienst, Hausmeisterservice und Entrümpelung für private und gewerbliche Objekte. Persönliche Abstimmung aus Büsum.",
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/`,
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Universale Dienstleistungen — Gartenpflege, Winterdienst, Hausmeisterservice und Entrümpelung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Universale Dienstleistungen",
    description:
      "Garten- und Hauspflege, Winterdienst, Hausmeisterservice und Entrümpelung für private und gewerbliche Objekte. Persönliche Abstimmung aus Büsum.",
    images: [previewImage],
  },
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Universale Dienstleistungen GmbH",
  legalName: "Universale Dienstleistungen GmbH",
  identifier: "Amtsgericht Pinneberg · HRB 18480 PI",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/media/universale-logo.png`,
  email: "info@universale-dienstleistungen.de",
  telephone: "+49 173 8948124",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Westerstraße 3",
    postalCode: "25761",
    addressLocality: "Büsum",
    addressCountry: "DE",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}

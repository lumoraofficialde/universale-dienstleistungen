import "./globals.css";
import "./natural.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://lumoraofficialde.github.io/universale-dienstleistungen";
const previewImage = `${siteUrl}/og.png`;
const logoPath = `${basePath}/media/universale-logo.png`;

export const metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: "Universale Dienstleistungen | Garten, Winterdienst & Hausmeisterservice",
  description:
    "Gartenpflege, Winterdienst, Hausmeisterservice und Entrümpelung aus Büsum. Persönlich, zuverlässig und rund um die Uhr erreichbar.",
  icons: {
    icon: logoPath,
    shortcut: logoPath,
    apple: logoPath,
  },
  openGraph: {
    title: "Universale Dienstleistungen",
    description: "Alles im Griff. Bei jedem Wetter.",
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/`,
    images: [
      {
        url: previewImage,
        width: 1728,
        height: 909,
        alt: "Universale Dienstleistungen — Alles im Griff. Bei jedem Wetter.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Universale Dienstleistungen",
    description: "Alles im Griff. Bei jedem Wetter.",
    images: [previewImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

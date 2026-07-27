import type { Metadata } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://lumoraofficialde.github.io/universale-dienstleistungen"
).replace(/\/+$/, "");
const canonicalUrl = `${siteUrl}/team/`;
const previewImage = `${siteUrl}/og.jpg`;
const description =
  "Arbeitsweise, Abstimmung und Einsatzorganisation bei Universale Dienstleistungen aus Büsum.";

export const metadata: Metadata = {
  title: "Arbeitsweise | Universale Dienstleistungen",
  description,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Arbeitsweise | Universale Dienstleistungen",
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
    title: "Arbeitsweise | Universale Dienstleistungen",
    description,
    images: [previewImage],
  },
};

export default function TeamLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

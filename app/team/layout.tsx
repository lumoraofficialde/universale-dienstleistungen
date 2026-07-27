import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://universale-dienstleistungen.de";
const previewImage = `${siteUrl}/og.jpg`;

export const metadata: Metadata = {
  title: "Unternehmen & Arbeitsweise | Universale Dienstleistungen",
  description:
    "Unternehmensangaben, persönliche Beratung und Arbeitsweise der Universale Dienstleistungen GmbH aus Büsum.",
  alternates: {
    canonical: `${siteUrl}/team/`,
  },
  openGraph: {
    title: "Unternehmen & Arbeitsweise | Universale Dienstleistungen",
    description:
      "Unternehmensangaben, persönliche Beratung und Arbeitsweise der Universale Dienstleistungen GmbH aus Büsum.",
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/team/`,
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Universale Dienstleistungen — Unternehmen und Arbeitsweise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unternehmen & Arbeitsweise | Universale Dienstleistungen",
    description:
      "Unternehmensangaben, persönliche Beratung und Arbeitsweise der Universale Dienstleistungen GmbH aus Büsum.",
    images: [previewImage],
  },
};

export default function TeamLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

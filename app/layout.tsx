import type { Metadata } from "next";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Bat Mitzvah d'Iska",
  description: "Invitation à la Bat Mitzvah d'Iska - 28 Juin 2026",
  openGraph: {
    title: "Bat Mitzvah d'Iska",
    description: "Vous êtes invité à la Bat Mitzvah d'Iska - 28 Juin 2026 à Paris",
    images: [
      {
        url: "/images/section-1-iska.jpg",
        width: 1200,
        height: 630,
        alt: "Bat Mitzvah d'Iska",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bat Mitzvah d'Iska",
    description: "Invitation à la Bat Mitzvah d'Iska - 28 Juin 2026",
    images: ["/images/section-1-iska.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {children}
      </body>
    </html>
  );
}

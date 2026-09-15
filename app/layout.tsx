import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nandini · Your Safe Space",
  description: "Tu ahiyan safe che. A quiet celestial sanctuary crafted with all my heart for Nandini.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#040406",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="gu" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="bg-void text-ether antialiased">{children}</body>
    </html>
  );
}

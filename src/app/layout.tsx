import type { Metadata, Viewport } from "next";
import { Spectral, Inter } from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "GRÜNSCHNITT Cockpit",
  description: "Das Cockpit für GRÜNSCHNITT — offene Punkte, Chat und Lernen.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "GRÜNSCHNITT",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#3a6328",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${spectral.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GRÜNSCHNITT Cockpit",
    short_name: "GRÜNSCHNITT",
    description: "Das Cockpit für GRÜNSCHNITT — offene Punkte, Chat und Lernen.",
    start_url: "/offene-punkte",
    display: "standalone",
    orientation: "portrait",
    background_color: "#eef6e8",
    theme_color: "#3a6328",
    lang: "de",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

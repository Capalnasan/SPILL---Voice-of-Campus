import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Spill",
    short_name: "Spill",
    description: "A safer, pseudonymous place for honest conversations.",
    start_url: "/feed",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff514a",
    icons: [
      {
        src: "/brand/app-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/app-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}


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
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}


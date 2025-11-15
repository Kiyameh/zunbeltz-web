// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import clerk from "@clerk/astro";
import { esES } from "@clerk/localizations";
import svgr from "vite-plugin-svgr";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    clerk({
      localization: esES,
    }),
    icon(),
  ],

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),

  output: "server",

  vite: {
    plugins: [svgr()],
  },
});

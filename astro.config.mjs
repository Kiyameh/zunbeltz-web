// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import clerk from "@clerk/astro";
import { esES } from "@clerk/localizations";
import svgr from "vite-plugin-svgr";

import icon from "astro-icon";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    clerk({
      localization: esES,
    }),
    icon(),
    mdx(),
  ],

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),

  output: "static",

  vite: {
    plugins: [svgr()],
  },

  redirects: {
    "/blog": "/",
  },
});

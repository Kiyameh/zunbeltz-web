// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import node from "@astrojs/node";
import clerk from "@clerk/astro";
import { esES } from "@clerk/localizations";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    clerk({
      localization: esES,
    }),
  ],

  adapter: node({
    mode: "standalone",
  }),

  output: "server",

  vite: {
    plugins: [tailwindcss()],
  },
});

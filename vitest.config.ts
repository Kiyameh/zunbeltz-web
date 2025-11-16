import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { getViteConfig } from "astro/config";

export default defineConfig(
  getViteConfig({
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./test.config.ts",
      css: {
        modules: {
          classNameStrategy: "non-scoped",
        },
      },
    },
    plugins: [
      react(),
      tsconfigPaths(),
      /* Mock para la importación de imagenes svg mediante vite-plugin-svgr */
      {
        name: "svg-mock",
        transform(code, id) {
          if (id.endsWith(".svg?react")) {
            return {
              code: "export default () => null",
              map: null,
            };
          }
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  })
);

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Served from https://bhagya099.github.io/soniya-interior/
  base: "/soniya-interior/",
  // Builds into dist/ (Vite's default), which "npm run deploy" publishes
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 5.2's Sass predates these newer sass deprecations; they're
        // warnings only and would otherwise flood every build
        quietDeps: true,
        silenceDeprecations: ["import", "global-builtin", "color-functions", "mixed-decls"],
      },
    },
  },
});

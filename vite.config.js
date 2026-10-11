import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Origin the site is served from, no path (e.g. https://example.com),
// used for the absolute og:url / og:image links in index.html. Optional:
// when unset those links fall back to site-relative paths.
process.env.VITE_SITE_URL = (process.env.VITE_SITE_URL || "").replace(/\/+$/, "");

export default defineConfig({
  plugins: [react()],
  // "/" for Cloudflare Pages (the default). "npm run deploy" builds with
  // VITE_BASE=/soniya-interior/ for https://bhagya099.github.io/soniya-interior/
  base: process.env.VITE_BASE || "/",
  // Builds into dist/ (Vite's default), which Cloudflare Pages and "npm run deploy" publish
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

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Origin the site is served from, no path, used for the absolute og:url /
// og:image links in index.html. Set VITE_SITE_URL to override the live domain.
process.env.VITE_SITE_URL = (
  process.env.VITE_SITE_URL || "https://sparkledesignstudio.co.in"
).replace(/\/+$/, "");

export default defineConfig({
  plugins: [react()],
  base: "/",
  // Builds into dist/ (Vite's default), which Cloudflare Workers publishes (see wrangler.jsonc)
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

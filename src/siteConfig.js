/**
 * Site-wide feature switches.
 *
 * SHOW_PHONE controls Soniya's phone number and the WhatsApp links
 * (footer + Contact page). It is ON during `npm run dev` and OFF in the
 * production build. To show them in production again, build with
 * VITE_SHOW_PHONE=true (or set it in the hosting build settings).
 */
export const SHOW_PHONE =
  import.meta.env.DEV || import.meta.env.VITE_SHOW_PHONE === "true";

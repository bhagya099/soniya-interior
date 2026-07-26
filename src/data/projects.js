/**
 * Project photos live in folders under src/image/rooms/, one folder per
 * room (e.g. src/image/rooms/kitchen/). This file loads every image in
 * each folder automatically — to add photos, just drop them into the
 * matching folder and rebuild. No code changes needed.
 *
 * TO ADD A BRAND NEW ROOM: create a new folder under src/image/rooms/
 * (e.g. "study-room"), drop photos in it, then add one entry to
 * ROOM_DEFS below with the matching `slug` (the folder name).
 */

// Loads every .jpg/.jpeg/.png file anywhere under src/image/rooms/
const context = require.context("../image/rooms", true, /\.(jpe?g|png)$/i);

const imagesBySlug = {};
context.keys().forEach((key) => {
  // key looks like "./living-room/Image_1.jpg"
  const match = key.match(/^\.\/([^/]+)\//);
  if (!match) return;
  const slug = match[1];
  (imagesBySlug[slug] = imagesBySlug[slug] || []).push({ key, src: context(key) });
});
Object.values(imagesBySlug).forEach((list) =>
  list.sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }))
);

const ROOM_DEFS = [
  {
    id: 1,
    slug: "living-room",
    title: "Living Room",
    description: "Bright, layered living spaces designed for everyday comfort and entertaining.",
  },
  {
    id: 2,
    slug: "dining-room",
    title: "Dining Room",
    description: "Dining areas built for gathering, with custom lighting and finishes.",
  },
  {
    id: 3,
    slug: "kitchen",
    title: "Kitchen",
    description: "Functional, durable kitchen layouts finished with warm materials.",
  },
  {
    id: 4,
    slug: "bedroom",
    title: "Bedroom",
    description: "Calm, restful bedrooms with considered lighting and storage.",
  },
  {
    id: 5,
    slug: "kids-bedroom",
    title: "Kids Bedroom",
    description: "Playful, personalized rooms designed to grow with your child.",
  },
  {
    id: 6,
    slug: "bathroom",
    title: "Bathroom",
    description: "Spa-inspired bathrooms with clean lines and modern fixtures.",
  },
  {
    id: 7,
    slug: "pooja-room",
    title: "Pooja Room",
    description: "Dedicated prayer spaces finished with marble and warm wood detailing.",
  },
  {
    id: 8,
    slug: "foyer",
    title: "Foyer",
    description: "A considered first impression — entryway storage and styling.",
  },
  {
    id: 9,
    slug: "home-office",
    title: "Home Office",
    description: "A quiet, functional corner designed for focused work at home.",
  },
  {
    id: 10,
    slug: "balcony-terrace",
    title: "Balcony / Terrace",
    description: "Outdoor lounges and green corners that extend living space outward.",
  },
];

export const ROOMS = ROOM_DEFS.map((r) => r.title);

const projects = ROOM_DEFS.filter((def) => (imagesBySlug[def.slug] || []).length > 0).map((def) => {
  const images = (imagesBySlug[def.slug] || []).map((i) => i.src);
  return {
    id: def.id,
    slug: def.slug,
    title: def.title,
    description: def.description,
    room: def.title,
    images,
    image: images[0],
  };
});

export default projects;

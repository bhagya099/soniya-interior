# Soniya Interior — Interior Designer Portfolio (React)

https://sparkledesignstudio.co.in

This repository is a small React-based template for an interior designer portfolio website. It includes pages for Home, About, Projects, and Contact and demonstrates a responsive portfolio grid with image previews.

## Features
- Responsive navigation and layout using Bootstrap.
- Portfolio grid with modal image previews.
- Contact form with a mailto link and embedded map.
- Image-driven content stored in `src/image` and small sample metadata in `src/data/projects.js`.

## Local setup
1. Install dependencies:

```bash
npm install
```

2. Run the app locally:

```bash
npm start
```

Open http://localhost:3000 in your browser.

## Deployment
The site is hosted on Cloudflare Workers (static assets from `dist/`, configured in `wrangler.jsonc`).
Every push to `main` deploys automatically, so there is no `npm run deploy` anymore.

To check a production build locally:

```bash
npm run build
npm run preview
```

The share-preview links (`og:url`, `og:image`) use `https://sparkledesignstudio.co.in` by default; set `VITE_SITE_URL` to override it.

## Customize
- Replace images in `src/image/Project_pics` and `src/image/Home_pics`.
- Edit project metadata in `src/data/projects.js`.
- Update styles in `src/index.css`.

## Next steps (suggested)
- Add form handling (Netlify Forms, Formspree, or your backend).
- Improve accessibility attributes and alt text for images.

---
This project was bootstrapped with Create React App. See the original CRA README for advanced build and deployment topics.
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

# Bhim Majhi — Astro site

Same design as before, now built with Astro.

- `src/layouts/Layout.astro`  — head, background layers, page shell
- `src/components/`           — Header, Hero, GalleryCard, Testimonial
- `src/pages/index.astro`     — homepage
- `src/styles/style.css`      — original CSS (only font paths changed)
- `public/`                   — images, fonts, admin.html, Firebase JS (served as-is)
- `firebase/`                 — Firestore and Storage rules (deploy in Firebase console)

## TypeScript
- `astro.config.ts`, `tsconfig.json` (Astro strict preset) and `src/types.ts` (shared types)
- Component props are typed in each `.astro` file's frontmatter
- `npm run check` runs `astro check` to type-check everything before you build

## Run locally
    npm install
    npm run dev
    npm run check

## Deploy
Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.
Repo Settings > Pages > Source must be set to **GitHub Actions**.

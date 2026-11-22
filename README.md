<div align="center">

# Bhim Majhi — Photo Portfolio

<a href="https://trendshift.io/repositories/82054">
  <img src="https://trendshift.io/api/badge/repositories/82054" alt="bhimmajhi/bhimmajhi.github.io - Trendshift" width="250" height="55"/>
</a>

![Astro](https://img.shields.io/badge/Astro-5-FF5D01?logo=astro&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%2B%20Auth-FFCA28?logo=firebase&logoColor=black)
![Cloudinary](https://img.shields.io/badge/Media-Cloudinary-3448C5?logo=cloudinary&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Live site:** https://bhimmajhi.github.io

A photography portfolio built with [Astro](https://astro.build). Photos and short videos are uploaded from a private admin page, stored on Cloudinary, saved to Firebase Firestore, and shown in a responsive gallery with likes and per-photo SEO fields.

</div>

---

## Features

- **Uncropped gallery** — every photo is shown at its original proportions.
- **Admin upload page** — upload photos and videos with the Cloudinary upload widget.
- **Dynamic posts** — uploaded posts are loaded from Firestore, so new uploads appear without rebuilding the site.
- **Likes** — one like per visitor per post, with live counts.
- **Per-photo SEO** — title, alt text, keywords and description for every post (auto-generated if left empty).
- **Responsive design** — tuned for desktop, tablet and mobile.
- **Animated background** — layered gradients, grid and floating particles.
- **Footer stats** — live GitHub star and fork counts.
- **Search-ready** — `sitemap.xml`, `robots.txt`, web manifest and site verification files included.

---

## Tech Stack

| Layer      | Tool                                              |
| ---------- | ------------------------------------------------- |
| Framework  | Astro 5 (static output) with TypeScript           |
| Styling    | Plain CSS with custom properties                  |
| Auth       | Firebase Authentication (email & password)        |
| Database   | Cloud Firestore (`posts`, `likes`, `likes_count`) |
| Media      | Cloudinary (unsigned upload preset)               |
| Hosting    | GitHub Pages, deployed with GitHub Actions        |
| Icons      | Font Awesome                                      |

---

## Project Structure

```
.
├── .github/workflows/deploy.yml   # Build and deploy to GitHub Pages
├── firebase/
│   ├── firestore.rules            # Firestore security rules
│   └── storage.rules              # Storage security rules
├── public/                        # Copied to the site as-is
│   ├── admin.html                 # Admin upload page (/admin.html)
│   ├── assets/                    # Fonts and images
│   ├── css/admin.css              # Admin page styles
│   ├── js/
│   │   ├── app.js                 # Gallery, posts and likes (client side)
│   │   ├── admin.js               # Login, upload and post management
│   │   ├── particles.js           # Background particles
│   │   └── config/
│   │       ├── firebase-config.js    # Firebase project settings
│   │       └── cloudinary-config.js  # Cloudinary cloud name and preset
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── manifest.webmanifest
│   └── favicon files
├── src/
│   ├── components/                # Header, Hero, GalleryCard, Testimonial, Footer
│   ├── layouts/Layout.astro       # <head>, background layers, page shell
│   ├── pages/index.astro          # Homepage
│   ├── styles/style.css           # Main stylesheet
│   └── types.ts                   # Shared TypeScript types
├── astro.config.ts
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 20 or newer, with npm
- A Firebase project (Authentication and Firestore enabled)
- A Cloudinary account

### Install and run locally

```bash
git clone https://github.com/bhimmajhi/bhimmajhi.github.io.git
cd bhimmajhi.github.io
npm install
npm run dev
```

Open http://localhost:4321 in your browser.

### Scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Starts the local development server       |
| `npm run build`   | Builds the production site into `dist/`   |
| `npm run preview` | Serves the production build locally       |
| `npm run check`   | Runs Astro and TypeScript type checks     |

---

## Configuration

### 1. Firebase

1. Create a project in the [Firebase console](https://console.firebase.google.com).
2. Go to **Authentication → Sign-in method** and enable **Email/Password**. Then add your admin user under **Users**.
3. Add a **Web app** to the project, copy its config object, and paste the values into `public/js/config/firebase-config.js`.
4. Go to **Firestore Database → Rules**, paste the contents of `firebase/firestore.rules`, and publish.
5. Go to **Storage → Rules**, paste the contents of `firebase/storage.rules`, and publish.
6. In both rules files, replace the admin email address with your own admin account email. Only this account can create, edit or delete posts.

Collections are created automatically the first time data is written.

### 2. Cloudinary

1. Note your **Cloud name** from the Cloudinary dashboard.
2. Go to **Settings → Upload → Upload presets** and add a new preset.
   - Set **Signing mode** to **Unsigned**.
   - Leave **Incoming transformations** empty. A crop or resize rule here would change every uploaded photo.
3. Set `cloudName` and `uploadPreset` in `public/js/config/cloudinary-config.js`.

### 3. Site URL

If your domain changes, update all of these:

- `site` in `astro.config.ts`
- The URLs in `public/sitemap.xml`
- The sitemap line in `public/robots.txt`

---

## Admin Panel

1. Open `/admin.html`, for example https://bhimmajhi.github.io/admin.html.
2. Sign in with the admin email and password.
3. Upload a photo or video, fill in the title and tag, and optionally fill in the SEO fields.
4. Save. The post appears in the gallery and in the admin list.
5. Delete a post from the admin list when needed.

The upload widget has cropping turned off, so photos are saved at their original size.

---

## Deployment

1. In your GitHub repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Push to the `main` branch.
3. The workflow in `.github/workflows/deploy.yml` runs `withastro/action`, builds the site, and publishes it to GitHub Pages.

After a deploy, do a hard refresh (Ctrl+Shift+R on desktop, or clear the browser cache on mobile) to load the new CSS and JavaScript.

---

## Customization

| What to change              | Where                                              |
| --------------------------- | -------------------------------------------------- |
| Colours and shared styles   | CSS variables in `:root`, `src/styles/style.css`   |
| Hero image                  | `public/assets/images/photo1.jpg` (keep 768×1376 ratio) |
| Fonts                       | `public/assets/fonts/` and `@font-face` in `style.css` |
| Header links                | `src/components/Header.astro`                      |
| Testimonial text            | `src/components/Testimonial.astro`                 |
| Footer credit               | `src/components/Footer.astro`                      |
| Homepage sections           | `src/pages/index.astro`                            |

---

## Security Notes

- Firebase config values are public by design. Access is controlled by the Firestore and Storage rules, so keep the rules published and review them when you change them.
- Use a strong password for the admin account and turn on two-factor authentication for that Google account.
- The likes rules allow any visitor to like a post. If you see abuse, tighten the rules or add a Cloud Function.

---

## Known Limitations

- Uploads go to Cloudinary. Firebase Storage is initialized in the client, but the upload flow does not use it, so `firebase/storage.rules` is only needed if you move uploads to Storage.
- Likes are tracked per browser using an anonymous ID saved in `localStorage`. Clearing browser storage resets the "liked" state for that browser.

---

## License

Released under the [MIT License](LICENSE).

Copyright (c) 2026 Smart Alone | Bhim majhi

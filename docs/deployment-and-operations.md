# Deployment & Operations Guide

This guide describes local development operations, static site compilation, Firebase Hosting deployment, and routine maintenance tasks for **Sidawi Garage**.

---

## 🚀 Environment & Prerequisites

- **Node.js**: `v20.x` or later (LTS recommended)
- **Package Manager**: `npm` or `pnpm`
- **Firebase CLI**: `firebase-tools` (installed globally via `npm i -g firebase-tools` or run via `npx firebase`)
- **Google Account**: Access to the Firebase project `sidawigarage`

---

## 💻 Local Development Workflow

### 1. Initial Setup
Clone the repository and install dependencies:
```bash
npm install
```
This triggers the `postinstall` hook (`nuxt prepare`), generating internal Nuxt TypeScript declarations.

### 2. Start Development Server
```bash
npm run dev
```
Starts the local Nuxt development server at [http://localhost:3000](http://localhost:3000) with hot-module replacement (HMR).

### 3. Run Quality Verification
Before committing code or deploying to production, run tests:
```bash
npm test
```
Ensures all 23 Vitest tests (Zod schema validation, catalog filtering, utility builders) pass.

---

## 📦 Production Build & Prerender Pipeline

Sidawi Garage uses static-site generation (SSG) via Nitro:

```bash
npm run generate
```

### What Happens During `npm run generate`:
1. Nitro scans `content/data/products.json` and compiles the complete list of dynamic `/products/[slug]` routes.
2. Pages (`/`, `/products`, `/videos`, `/about`, `/contact`, `/sitemap.xml`, and all product detail pages) are pre-rendered into static `.html`, `.json`, and asset bundles.
3. The production-ready static site is written to `.output/public/`.

### Previewing the Production Build Locally
```bash
npm run preview
```
Spins up a lightweight local server serving the pre-rendered `.output/public` bundle to test performance and 404 handling.

---

## 🔥 Firebase Hosting Deployment

Firebase Hosting configuration is defined in `firebase.json` and `.firebaserc`:

### `firebase.json`
```json
{
  "hosting": {
    "public": ".output/public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

### `.firebaserc`
```json
{
  "projects": {
    "default": "sidawigarage"
  }
}
```

### Deployment Steps:

1. **Authenticate with Firebase (First Time Only)**:
   ```bash
   firebase login
   ```

2. **Verify Project Target**:
   ```bash
   firebase use sidawigarage
   ```

3. **Build & Deploy in One Command**:
   ```bash
   npm run generate && npm run deploy:hosting
   ```

The site is deployed instantly to the global Firebase CDN with automatic SSL and caching.

---

## 🛠️ Routine Maintenance Operations

### 1. Marking a Product Out of Stock
1. Open `content/data/products.json`.
2. Locate the product and set `"inStock": false`.
3. Re-run `npm run generate && npm run deploy:hosting`.
4. The product card immediately reflects the out-of-stock badge and updates the Schema.org `OutOfStock` structured data.

### 2. Updating Operating Hours or Holiday Schedules
1. Open `content/data/garage.json`.
2. Edit the `openingHours` array.
3. Re-generate and deploy. The changes will update the Contact page, Footer, and Schema.org `AutoRepair` opening hours automatically.

### 3. Adding or Updating Manufacturer Certificates
1. Place high-resolution certificate image (JPG/PNG) into `public/images/certificates/` (e.g., `addinol-cert.jpg`).
2. Update the `certificateImage`, `certificateTitle`, and `certificateNumber` fields in `content/data/brands.json`.
3. Verify the certificate modal by running `npm test`.
4. Deploy the update.

### 4. Updating Social Links or Phone Numbers
Update `phone`, `whatsappNumber`, or `socials` in `content/data/garage.json`. Because all links are dynamic, all header buttons, footer links, and WhatsApp booking URL builders update across the entire site without touching Vue components.

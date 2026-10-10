# Tooling & Automation Scripts Guide

This guide details the maintenance scripts and automated visual quality assurance (QA) tools located in the `scripts/` directory.

---

## 🛠️ Scripts Directory Overview

```
scripts/
├── download-reels.mjs        # Instagram Reels video scraper & local cache
├── generate-og-image.mjs     # Sharp OpenGraph 1200x630 banner generator
├── verify-all.js             # Automated mobile CDP verification & screenshot audit
├── find-overflow.js          # DOM horizontal overflow scanner
├── inspect-modal.js          # Certificate modal accessibility & layout auditor
└── capture-card.js           # Isolated card screenshot renderer
```

---

## 📥 1. Instagram Reels Local Cacher (`download-reels.mjs`)

### Purpose:
While social embeds work online, third-party social iframes can be blocked by ad-blockers, tracking blockers, or Instagram login walls. This script scrapes and downloads client video reels directly to `public/videos/reels/{id}.mp4` and updates `content/data/videos.json` with direct stream paths.

### Mechanics:
1. Iterates through all entries in `content/data/videos.json`.
2. Fetches the clean embed HTML (`https://www.instagram.com/p/{id}/embed/`) without sending custom headers that trigger anti-scraping checkpoints.
3. Extracts the high-definition `video_url` stream source.
4. Downloads the MP4 buffer and saves it to `public/videos/reels/{reelId}.mp4`.
5. Updates `videoUrl: '/videos/reels/{reelId}.mp4'` in `videos.json`.

### Execution:
```bash
node scripts/download-reels.mjs
```

---

## 🖼️ 2. Open Graph Banner Generator (`generate-og-image.mjs`)

### Purpose:
Generates the official Open Graph sharing card (`public/images/sidawi-garage-og.jpg`) sized at **1200x630px** (the global standard for iMessage, WhatsApp, Twitter/X, and LinkedIn previews).

### Mechanics:
1. Uses **Sharp** (`sharp: ^0.35.5`) for GPU-accelerated image compositing.
2. Creates an obsidian base canvas with a radial amber glow (`#2a1f0a` to `#08090C`).
3. Renders high-precision vector text with a metallic 3-stop gold linear gradient (`#FDE68A` → `#F59E0B` → `#D97706`).
4. Composites the central Sidawi Garage crest emblem at 320x320px with crisp drop shadows.
5. Saves the final asset with 92% JPEG quality.

### Execution:
```bash
node scripts/generate-og-image.mjs
```

---

## 🤖 3. Headless Chrome Visual Auditing (`verify-all.js`)

### Purpose:
Performs headless end-to-end visual verification across mobile viewports using the **Chrome DevTools Protocol (CDP)** over WebSockets.

### Test Routine:
1. Spawns Chrome in headless mode:
   ```bash
   chrome.exe --headless=new --remote-debugging-port=9333 --window-size=375,812
   ```
2. Emulates iPhone mobile metrics (`375x812`, Device Pixel Ratio: 2).
3. **Navbar Audit**:
   - Captures navbar at top position (`verify_navbar_top.png`).
   - Scrolls 350px down and captures compressed floating glass navbar (`verify_navbar_scrolled.png`).
4. **Card Layout Audit**:
   - Scrolls to Mahmoud Sidawi's Craftsman spotlight card (`verify_about_card.png`).
5. **Certificate Modal Ergonomics Audit**:
   - Simulates click on "Inspect Certificate" button.
   - Evaluates modal dialog bounding boxes to verify that close buttons and zoom toggles are strictly within visible viewport coordinates (`r.top >= 0 && r.bottom <= window.innerHeight`).
   - Captures full-screen modal verification (`verify_cert_modal.png`).

### Execution:
```bash
node scripts/verify-all.js
```

---

## 📐 4. Horizontal Overflow Scanner (`find-overflow.js`)

### Purpose:
Detects unwanted horizontal scrolling or layout bugs on mobile devices:
- Scans every DOM node in the active page.
- Identifies elements where `scrollWidth > clientWidth` or whose bounding rect extends beyond `window.innerWidth`.
- Outputs precise CSS selector paths for rapid debugging.

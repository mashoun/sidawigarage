import fs from 'fs';
import path from 'path';

const videosPath = './content/data/videos.json';
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
const outDir = './public/videos/reels';
fs.mkdirSync(outDir, { recursive: true });

async function downloadSingle(reelId) {
  const targetFile = path.join(outDir, `${reelId}.mp4`);
  if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 100000) {
    console.log(`[SKIP] Already exists: ${reelId}.mp4 (${(fs.statSync(targetFile).size / 1024 / 1024).toFixed(1)}MB)`);
    return `/videos/reels/${reelId}.mp4`;
  }

  try {
    // Note: Do NOT send custom User-Agent here - default fetch works without triggering login checkpoint
    const res = await fetch(`https://www.instagram.com/p/${reelId}/embed/`);
    const html = await res.text();
    const idx = html.indexOf('video_url');
    if (idx === -1) {
      console.warn(`[WARN] No video_url for ${reelId} (len: ${html.length})`);
      return null;
    }

    const slice = html.slice(idx);
    const start = slice.indexOf('http');
    const end = slice.indexOf('\\"', start + 10);
    const raw = slice.slice(start, end);
    const cleanUrl = raw.replaceAll('\\u0026', '&').replaceAll('\\', '');

    const videoRes = await fetch(cleanUrl);
    if (!videoRes.ok) {
      console.warn(`[WARN] Video fetch failed for ${reelId}: ${videoRes.status}`);
      return null;
    }

    const buf = await videoRes.arrayBuffer();
    fs.writeFileSync(targetFile, Buffer.from(buf));
    console.log(`[SUCCESS] Saved ${reelId}.mp4 (${(buf.byteLength / 1024 / 1024).toFixed(1)}MB)`);
    return `/videos/reels/${reelId}.mp4`;
  } catch (err) {
    console.error(`[ERROR] ${reelId}:`, err.message);
    return null;
  }
}

async function run() {
  for (const reel of videos) {
    const match = reel.url.match(/instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
    if (!match) continue;
    const reelId = match[1];
    const url = await downloadSingle(reelId);
    if (url) {
      reel.videoUrl = url;
    }
    // 1s delay
    await new Promise(r => setTimeout(r, 1000));
  }

  fs.writeFileSync(videosPath, JSON.stringify(videos, null, 2), 'utf8');
  console.log('[ALL DONE] Successfully updated videos.json with all local MP4 paths!');
}

run();

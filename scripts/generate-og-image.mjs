import sharp from 'sharp';
import fs from 'fs';

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // Read emblem
  const emblemBuffer = await sharp('./public/images/brand/sidawi-emblem.png')
    .resize(320, 320, { fit: 'contain' })
    .toBuffer();

  const svgText = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg-glow" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#2a1f0a" stop-opacity="0.9"/>
          <stop offset="50%" stop-color="#12141a" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#08090C" stop-opacity="1"/>
        </radialGradient>
        <linearGradient id="gold-text" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FDE68A"/>
          <stop offset="50%" stop-color="#F59E0B"/>
          <stop offset="100%" stop-color="#D97706"/>
        </linearGradient>
      </defs>

      <rect width="${width}" height="${height}" fill="url(#bg-glow)"/>

      <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="rgba(245, 158, 11, 0.3)" stroke-width="2"/>

      <text x="600" y="420" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="54" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">
        SIDAWI GARAGE
      </text>
      
      <text x="600" y="470" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" font-weight="700" fill="url(#gold-text)" text-anchor="middle" letter-spacing="4">
        PRECISION LUBRICATION &amp; FLUID DYNAMICS
      </text>

      <text x="600" y="525" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="19" font-weight="500" fill="#A1A1AA" text-anchor="middle">
        Certified Reseller: Liqui Moly • Addinol • Castrol | Beirut, Lebanon
      </text>
    </svg>
  `);

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 8, g: 9, b: 12, alpha: 1 }
    }
  })
  .composite([
    { input: svgText, top: 0, left: 0 },
    { input: emblemBuffer, top: 50, left: 440 }
  ])
  .jpeg({ quality: 92 })
  .toFile('./public/images/sidawi-garage-og.jpg');

  console.log('OG image created successfully! Size:', fs.statSync('./public/images/sidawi-garage-og.jpg').size);
}

createOgImage().catch(console.error);

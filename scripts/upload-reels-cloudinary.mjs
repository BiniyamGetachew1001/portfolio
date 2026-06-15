/**
 * upload-reels-cloudinary.mjs
 * Uploads all MP4s to Cloudinary (free tier: 25GB storage, 25GB bandwidth/month)
 *
 * Setup (one time):
 *   1. Sign up free at https://cloudinary.com (no credit card)
 *   2. Go to Dashboard → copy Cloud Name, API Key, API Secret
 *   3. Add to .env:
 *        CLOUDINARY_CLOUD_NAME=your_cloud_name
 *        CLOUDINARY_API_KEY=your_api_key
 *        CLOUDINARY_API_SECRET=your_api_secret
 *   4. node scripts/upload-reels-cloudinary.mjs
 */

import { v2 as cloudinary } from 'cloudinary';
import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const REELS_DIR = join(ROOT, 'Glowing Motion Graphics Reels Bundle-20260412T121753Z-3-002', 'Glowing Motion Graphics Reels Bundle');
const FOLDER    = 'reels'; // folder inside your Cloudinary account

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true,
});

function formatBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Cloudinary public_id: strip extension, keep the name
function toPublicId(filename) {
  return `${FOLDER}/${filename.replace(/\.mp4$/i, '')}`;
}

async function getExistingIds() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: FOLDER + '/',
      resource_type: 'video',
      max_results: 500,
    });
    return new Set(result.resources.map(r => r.public_id));
  } catch {
    return new Set();
  }
}

async function uploadFile(filepath, filename, existing) {
  const publicId = toPublicId(filename);
  const sizeMb   = formatBytes(statSync(filepath).size);

  if (existing.has(publicId)) {
    console.log(`  ✓ skip  ${filename} (already uploaded)`);
    return 'skipped';
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
        public_id: publicId,
        overwrite: false,
        folder: null, // already embedded in public_id
      },
      (error, result) => {
        if (error) {
          console.log(`  ❌ fail  ${filename}: ${error.message}`);
          resolve('failed');
        } else {
          console.log(`  ✅ done  ${filename} (${sizeMb})`);
          resolve('uploaded');
        }
      }
    );

    import('fs').then(({ createReadStream }) => {
      createReadStream(filepath).pipe(stream);
    });
  });
}

async function main() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
    console.error(`
❌  Missing credentials. Add these to your .env:

   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

Get them from: https://cloudinary.com → Dashboard
`);
    process.exit(1);
  }

  const files = readdirSync(REELS_DIR)
    .filter(f => extname(f).toLowerCase() === '.mp4')
    .sort();

  console.log(`\n🎬  Uploading ${files.length} videos → Cloudinary (${process.env.CLOUDINARY_CLOUD_NAME}/${FOLDER})\n`);

  const existing = await getExistingIds();
  if (existing.size) console.log(`   Found ${existing.size} already uploaded\n`);

  let uploaded = 0, skipped = 0, failed = 0;
  const CONCURRENCY = 3; // Cloudinary free tier rate limit

  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map(f => uploadFile(join(REELS_DIR, f), f, existing))
    );
    results.forEach(r => {
      if (r === 'uploaded') uploaded++;
      else if (r === 'skipped') skipped++;
      else failed++;
    });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  console.log(`
✅  Done! ${uploaded} uploaded, ${skipped} skipped, ${failed} failed.

Add this to your .env AND your Vercel/Netlify environment variables:

   VITE_REELS_CDN_URL=https://res.cloudinary.com/${cloudName}/video/upload/q_auto,vc_auto/reels

That URL auto-compresses videos and serves them from Cloudinary's global CDN.
`);
}

main().catch(e => { console.error(e); process.exit(1); });

/**
 * upload-reels.mjs
 * Uploads all MP4s from the reels folder to Cloudflare R2 in parallel.
 *
 * Setup:
 *   1. Copy .env.example to .env and fill in your R2 credentials
 *   2. node scripts/upload-reels.mjs
 *
 * Get credentials from: Cloudflare Dashboard → R2 → Manage R2 API Tokens
 */

import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { createReadStream, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

config(); // load .env

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Config ──────────────────────────────────────────────────────────────────
const REELS_DIR = join(ROOT, 'Glowing Motion Graphics Reels Bundle-20260412T121753Z-3-002', 'Glowing Motion Graphics Reels Bundle');
const BUCKET    = process.env.R2_BUCKET_NAME;
const PREFIX    = 'reels/'; // folder inside the bucket

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function exists(key) {
  try {
    await client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function uploadFile(filename) {
  const key      = PREFIX + filename;
  const filepath = join(REELS_DIR, filename);
  const size     = statSync(filepath).size;

  if (await exists(key)) {
    console.log(`  ✓ skip  ${filename} (already uploaded)`);
    return { skipped: true };
  }

  const upload = new Upload({
    client,
    params: {
      Bucket:      BUCKET,
      Key:         key,
      Body:        createReadStream(filepath),
      ContentType: 'video/mp4',
      CacheControl: 'public, max-age=31536000, immutable',
    },
    queueSize: 4,
    partSize:  10 * 1024 * 1024, // 10 MB parts
  });

  upload.on('httpUploadProgress', (p) => {
    const pct = p.total ? Math.round((p.loaded / p.total) * 100) : '?';
    process.stdout.write(`\r  ↑ ${filename.slice(0, 40).padEnd(40)} ${pct}% of ${formatBytes(size)}   `);
  });

  await upload.done();
  process.stdout.write(`\r  ✅ done  ${filename.slice(0, 40).padEnd(40)} ${formatBytes(size)}\n`);
  return { skipped: false };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!BUCKET || !process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID) {
    console.error('\n❌  Missing env vars. Copy .env.example → .env and fill it in.\n');
    process.exit(1);
  }

  const files = readdirSync(REELS_DIR)
    .filter(f => extname(f).toLowerCase() === '.mp4')
    .sort();

  console.log(`\n🎬  Uploading ${files.length} videos → r2://${BUCKET}/${PREFIX}`);
  console.log(`    Endpoint: https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com\n`);

  // Upload in batches of 5 concurrently so we don't saturate the connection
  const CONCURRENCY = 5;
  let uploaded = 0, skipped = 0;

  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(uploadFile));
    results.forEach(r => r.skipped ? skipped++ : uploaded++);
  }

  console.log(`\n✅  Done!  ${uploaded} uploaded, ${skipped} already existed.`);
  console.log(`\n   Your CDN base URL for .env:`);
  console.log(`   VITE_REELS_CDN_URL=https://<your-custom-domain-or-r2-public-url>/reels\n`);
}

main().catch(e => { console.error(e); process.exit(1); });

#!/usr/bin/env python3
"""
upload-reels-ia.py  —  Upload all MP4s to Internet Archive (free, no account needed beyond login)

Setup (one time):
  ia configure          ← enter your archive.org email + password

Then run:
  python scripts/upload-reels-ia.py

Each video becomes publicly available at:
  https://archive.org/download/<IDENTIFIER>/<filename>

After uploading, the script prints your VITE_REELS_CDN_URL to paste into .env
"""

import os
import sys
import glob
from pathlib import Path
from internetarchive import upload, get_item

ROOT = Path(__file__).parent.parent
REELS_DIR = ROOT / "Glowing Motion Graphics Reels Bundle-20260412T121753Z-3-002" / "Glowing Motion Graphics Reels Bundle"

# This becomes the archive.org item identifier — must be unique across all of archive.org
# Change this to something that reflects your portfolio name
IDENTIFIER = "biniyam-edits-short-form-reels"

METADATA = {
    "title": "Biniyam Edits — Short-Form Reels",
    "description": "Short-form video content portfolio — TikTok/Instagram reels by Biniyam Edits",
    "subject": ["video editing", "short form", "reels", "portfolio"],
    "mediatype": "movies",
    "access-restricted": "0",  # keep public
}

def main():
    videos = sorted(REELS_DIR.glob("*.mp4"))
    if not videos:
        print(f"❌  No MP4 files found in:\n   {REELS_DIR}")
        sys.exit(1)

    print(f"\n🎬  Found {len(videos)} videos → uploading to archive.org/{IDENTIFIER}\n")

    # Check which files are already uploaded
    try:
        item = get_item(IDENTIFIER)
        existing = {f.name for f in item.files} if item.exists else set()
    except Exception:
        existing = set()

    to_upload = [v for v in videos if v.name not in existing]
    skipped   = len(videos) - len(to_upload)

    if skipped:
        print(f"   ✓ {skipped} already uploaded, skipping\n")

    if not to_upload:
        print("✅  All videos already uploaded!")
    else:
        print(f"   Uploading {len(to_upload)} videos...\n")
        for i, video in enumerate(to_upload, 1):
            size_mb = video.stat().st_size / (1024 * 1024)
            print(f"   [{i}/{len(to_upload)}] {video.name} ({size_mb:.1f} MB)")
            try:
                upload(
                    IDENTIFIER,
                    files=[str(video)],
                    metadata=METADATA if i == 1 else {},  # metadata only on first upload
                    verbose=False,
                    retries=3,
                )
                print(f"         ✅ done")
            except Exception as e:
                print(f"         ❌ failed: {e}")

    cdn_base = f"https://archive.org/download/{IDENTIFIER}"
    print(f"""
✅  Upload complete!

Add this to your .env (and Vercel/Netlify env vars):

   VITE_REELS_CDN_URL={cdn_base}

Videos are available at:
   {cdn_base}/THE SOCIAL GAME (28).mp4
   (etc.)

Note: archive.org processes uploads asynchronously — videos may take
a few minutes to become publicly accessible after uploading.
""")

if __name__ == "__main__":
    main()

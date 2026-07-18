#!/usr/bin/env python3
"""Optimise the game's art in place. Idempotent: a file is only rewritten
when the optimised version is smaller. Run after any art changes, before
build. PNGs are palette-quantised (256 colours, alpha preserved) — ample
for photofit and heraldry art at these sizes — and JPEGs re-encoded
progressive at quality 80. Requires Pillow."""
import os
import sys
from io import BytesIO
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIRS = [os.path.join(ROOT, 'avatars'), os.path.join(ROOT, 'assets')]


def optimise_png(path):
    im = Image.open(path)
    rgba = im.convert('RGBA')
    # FASTOCTREE is the quantiser that understands alpha
    q = rgba.quantize(colors=256, method=Image.FASTOCTREE, dither=Image.FLOYDSTEINBERG)
    buf = BytesIO()
    q.save(buf, 'PNG', optimize=True)
    return buf.getvalue()


def optimise_jpg(path):
    im = Image.open(path).convert('RGB')
    buf = BytesIO()
    im.save(buf, 'JPEG', quality=80, optimize=True, progressive=True)
    return buf.getvalue()


def main():
    before_total = after_total = 0
    for d in DIRS:
        for base, _dirs, files in os.walk(d):
            for name in sorted(files):
                path = os.path.join(base, name)
                ext = name.lower().rsplit('.', 1)[-1]
                if ext == 'png':
                    data = optimise_png(path)
                elif ext in ('jpg', 'jpeg'):
                    data = optimise_jpg(path)
                else:
                    continue
                old = os.path.getsize(path)
                before_total += old
                if len(data) < old:
                    with open(path, 'wb') as f:
                        f.write(data)
                    after_total += len(data)
                    print(f'{os.path.relpath(path, ROOT)}: {old // 1024} KB -> {len(data) // 1024} KB')
                else:
                    after_total += old
                    print(f'{os.path.relpath(path, ROOT)}: {old // 1024} KB (already optimal)')
    print(f'TOTAL: {before_total // 1024} KB -> {after_total // 1024} KB '
          f'({100 - after_total * 100 // max(before_total, 1)}% saved)')


if __name__ == '__main__':
    sys.exit(main())

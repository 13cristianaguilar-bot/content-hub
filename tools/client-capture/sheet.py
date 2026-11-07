#!/usr/bin/env python3
"""Label and stack screenshots. Does not read script exports."""

import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def font(size):
    for path in (
        '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
    ):
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def wrap_text(text, face, width):
    words = text.split()
    lines = []
    current = ''
    probe = ImageDraw.Draw(Image.new('RGB', (1, 1)))
    for word in words:
        trial = word if not current else current + ' ' + word
        if probe.textlength(trial, font=face) <= width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return '\n'.join(lines)


def label_image(src, dest, text):
    dest = Path(dest)
    image = Image.open(src).convert('RGB')
    face = font(22)
    pad = 16
    text = wrap_text(text, face, image.width - pad * 2)
    probe = ImageDraw.Draw(image)
    box = probe.multiline_textbbox((0, 0), text, font=face, spacing=4)
    bar_h = (box[3] - box[1]) + pad * 2
    canvas = Image.new('RGB', (image.width, image.height + bar_h), 'white')
    draw = ImageDraw.Draw(canvas)
    draw.multiline_text((pad, pad), text, fill='black', font=face, spacing=4)
    draw.line((0, bar_h - 1, image.width, bar_h - 1), fill='#cccccc')
    canvas.paste(image, (0, bar_h))
    dest.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(dest, optimize=True)


def crop_css(image, box, dsf):
    x = int(round(box['x'] * dsf))
    y = int(round(box['y'] * dsf))
    w = int(round(box['w'] * dsf))
    h = int(round(box['h'] * dsf))
    return image.crop((x, y, x + w, y + h))


def stitch(meta_path, dest):
    meta = json.loads(Path(meta_path).read_text())
    dsf = float(meta['dsf'])
    images = [Image.open(path).convert('RGB') for path in meta['slices']]
    scroll = meta['scroll']
    header = crop_css(images[0], meta['header'], dsf)
    footer = crop_css(images[-1], meta['footer'], dsf)
    parts = [header]
    prev = 0
    for i, image in enumerate(images):
        body = crop_css(image, scroll, dsf)
        delta = meta['scrollTops'][i] - prev
        if i == 0:
            parts.append(body)
        else:
            cut = int(round(delta * dsf))
            cut = max(1, min(cut, body.height))
            parts.append(body.crop((0, body.height - cut, body.width, body.height)))
        prev = meta['scrollTops'][i]
    parts.append(footer)
    width = max(part.width for part in parts)
    height = sum(part.height for part in parts)
    canvas = Image.new('RGB', (width, height), 'white')
    y = 0
    for part in parts:
        canvas.paste(part, (0, y))
        y += part.height
    dest = Path(dest)
    dest.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(dest, optimize=True)


def contact(paths, dest, heading):
    face = font(28)
    images = [Image.open(path).convert('RGB') for path in paths]
    width = max(image.width for image in images)
    probe = Image.new('RGB', (10, 10))
    box = ImageDraw.Draw(probe).textbbox((0, 0), heading, font=face)
    head_h = (box[3] - box[1]) + 28
    height = head_h + sum(image.height + 12 for image in images) + 12
    canvas = Image.new('RGB', (width, height), 'white')
    draw = ImageDraw.Draw(canvas)
    draw.text((16, 14), heading, fill='black', font=face)
    y = head_h
    for image in images:
        canvas.paste(image, (0, y))
        y += image.height + 12
    dest = Path(dest)
    dest.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(dest, optimize=True)


def main():
    command = sys.argv[1]
    if command == 'label':
        label_image(sys.argv[2], sys.argv[3], sys.argv[4])
    elif command == 'stitch':
        stitch(sys.argv[2], sys.argv[3])
    elif command == 'contact':
        contact(sys.argv[4:], sys.argv[2], sys.argv[3])
    else:
        raise SystemExit('unknown command')


if __name__ == '__main__':
    main()

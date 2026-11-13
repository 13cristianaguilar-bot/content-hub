#!/usr/bin/env python3
"""1200x630 Signal booking cards and the favicon PNGs. No network at runtime."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "book" / "og"
ASSETS = ROOT / "book" / "assets"
SKYLINE = Path("/tmp/signal-skyline.png")
BG = (8, 8, 8)
RED = (239, 48, 56)
INK = (243, 241, 238)
MUTED = (183, 178, 170)

CARDS = [
    ("home", "Book a call", "Five conversations with Cristian Aguilar"),
    ("audit", "AI Gap Audit", "60 minutes, paid after the call"),
    ("connect", "Opportunities & Connecting", "60 minutes on Google Meet"),
    ("content-engine", "Content Engine Strategy Call", "60 minutes on Google Meet"),
    ("ma", "M&A Interview", "60 minutes, recorded"),
    ("ma-30", "M&A Interview", "30 minutes on Google Meet"),
]


def font(size, bold=False):
    candidates = [
        Path("/tmp/Geist-Regular.ttf"),
        Path("/tmp/Geist-SemiBold.ttf") if bold else Path("/tmp/Geist-Regular.ttf"),
        Path("/usr/share/fonts/truetype/inter/Inter-Regular.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
    ]
    if bold:
        candidates.insert(0, Path("/tmp/Geist-SemiBold.ttf"))
    for path in candidates:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def wrap(draw, text, face, width):
    words = text.split()
    lines, current = [], ""
    for word in words:
        trial = word if not current else f"{current} {word}"
        if draw.textlength(trial, font=face) <= width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def stroke(draw, x, y1, y2, width, color):
    draw.line((x, y1, x, y2), fill=color, width=width)
    radius = width / 2
    draw.ellipse((x - radius, y1 - radius, x + radius, y1 + radius), fill=color)
    draw.ellipse((x - radius, y2 - radius, x + radius, y2 + radius), fill=color)


def bars(draw, x, y, scale, color=RED):
    specs = [(14, 27, 10), (23, 19, 26), (32, 11, 42), (41, 21, 22), (50, 27, 10)]
    width = max(2, int(5 * scale))
    for sx, sy, sh in specs:
        stroke(draw, x + sx * scale, y + sy * scale, y + (sy + sh) * scale, width, color)


def card(slug, title, subtitle):
    image = Image.new("RGB", (1200, 630), BG)
    if SKYLINE.exists():
        sky = Image.open(SKYLINE).convert("RGB")
        crop = sky.crop((420, 180, 1536, 780)).resize((760, 630), Image.Resampling.LANCZOS)
        crop = ImageEnhance.Brightness(crop).enhance(0.38)
        image.paste(crop, (520, 0))
        mask = Image.new("L", (240, 630))
        for col in range(240):
            value = int(255 * (1 - col / 239))
            for row in range(630):
                mask.putpixel((col, row), value)
        black = Image.new("RGB", (240, 630), BG)
        image.paste(black, (480, 0), mask)
    draw = ImageDraw.Draw(image)
    bars(draw, 64, 58, 1.15)
    small = font(22, bold=True)
    title_face = font(64, bold=True)
    sub_face = font(28)
    draw.text((72, 168), "SIGNAL MARKETING", font=small, fill=RED)
    lines = wrap(draw, title, title_face, 560)
    y = 214
    for line in lines[:3]:
        draw.text((72, y), line, font=title_face, fill=INK)
        y += 74
    draw.text((72, y + 12), subtitle, font=sub_face, fill=MUTED)
    draw.text((72, 560), "signals.marketing", font=font(22), fill=MUTED)
    path = OUT / f"{slug}.jpg"
    image.save(path, "JPEG", quality=82, optimize=True, progressive=True)
    return path


def icon(size, radius):
    image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=BG + (255,))
    bars(draw, 0, 0, size / 64, RED + (255,))
    return image


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for spec in CARDS:
        path = card(*spec)
        print(f"{path.name} {path.stat().st_size}")
    icon(32, 6).save(ASSETS / "favicon-32.png")
    icon(180, 36).save(ASSETS / "apple-touch-icon.png")


if __name__ == "__main__":
    main()

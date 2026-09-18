import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

WIDTH = 1200
HEIGHT = 630

# 1. Base Background - Dark Royal Crimson
bg = Image.new("RGBA", (WIDTH, HEIGHT), (22, 4, 8, 255))

# 2. Hero Background texture overlay
if os.path.exists("public/assets/hero-bg.png"):
    hero_bg = Image.open("public/assets/hero-bg.png").convert("RGBA")
    hero_bg = hero_bg.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    # Dim hero bg to 50% opacity
    r, g, b, a = hero_bg.split()
    a = a.point(lambda p: int(p * 0.45))
    hero_bg.putalpha(a)
    bg.paste(hero_bg, (0, 0), hero_bg)

# 3. Add soft golden glow on the right for couple
glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
draw_glow = ImageDraw.Draw(glow)
glow_center = (860, 315)
for radius in range(260, 40, -15):
    alpha = int((1.0 - radius / 260.0) * 85)
    draw_glow.ellipse(
        [glow_center[0] - radius, glow_center[1] - radius, glow_center[0] + radius, glow_center[1] + radius],
        fill=(217, 164, 65, alpha)
    )
glow = glow.filter(ImageFilter.GaussianBlur(25))
bg.paste(glow, (0, 0), glow)

# 4. Mandala in background
if os.path.exists("public/assets/mandala.png"):
    mandala = Image.open("public/assets/mandala.png").convert("RGBA")
    mandala = mandala.resize((520, 520), Image.Resampling.LANCZOS)
    mr, mg, mb, ma = mandala.split()
    ma = ma.point(lambda p: int(p * 0.22))
    mandala.putalpha(ma)
    bg.paste(mandala, (600, 55), mandala)

# 5. Ornate Golden Border & Corner Accents
draw = ImageDraw.Draw(bg)
gold_primary = (217, 164, 65, 220)
gold_secondary = (246, 226, 174, 180)
gold_subtle = (217, 164, 65, 80)

# Outer thin border
draw.rectangle([20, 20, WIDTH - 21, HEIGHT - 21], outline=gold_primary, width=2)
# Inner thin border
draw.rectangle([28, 28, WIDTH - 29, HEIGHT - 29], outline=gold_subtle, width=1)

# Corner ornamental brackets
corner_len = 35
for cx, cy, dx, dy in [(20, 20, 1, 1), (WIDTH - 21, 20, -1, 1), (20, HEIGHT - 21, 1, -1), (WIDTH - 21, HEIGHT - 21, -1, -1)]:
    draw.line([(cx, cy), (cx + dx * corner_len, cy)], fill=gold_secondary, width=3)
    draw.line([(cx, cy), (cx, cy + dy * corner_len)], fill=gold_secondary, width=3)
    # Small diamond accent in corner
    draw.regular_polygon((cx + dx * 16, cy + dy * 16, 4), 4, fill=gold_primary)

# 6. Place Couple Artwork (Right side)
if os.path.exists("public/assets/couple.png"):
    couple_img = Image.open("public/assets/couple.png").convert("RGBA")
    # Scale couple to fit nicely on the right side
    # Desired height ~ 540px
    orig_w, orig_h = couple_img.size
    target_h = 540
    target_w = int(orig_w * (target_h / orig_h))
    couple_resized = couple_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Soft drop shadow behind couple
    shadow = Image.new("RGBA", (target_w + 40, target_h + 40), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    couple_mask = couple_resized.split()[3]
    shadow.paste((0, 0, 0, 160), (20, 20), mask=couple_mask)
    shadow = shadow.filter(ImageFilter.GaussianBlur(15))
    
    couple_x = 760
    couple_y = 60
    bg.paste(shadow, (couple_x - 20, couple_y - 10), shadow)
    bg.paste(couple_resized, (couple_x, couple_y), couple_resized)

# 7. Left Side Typography
# Fonts
try:
    font_script_huge = ImageFont.truetype("GreatVibes-Regular.ttf", 86)
    font_script_lg = ImageFont.truetype("GreatVibes-Regular.ttf", 64)
except Exception:
    font_script_huge = ImageFont.truetype("C:/Windows/Fonts/georgiai.ttf", 72)
    font_script_lg = ImageFont.truetype("C:/Windows/Fonts/georgiai.ttf", 52)

font_serif_top = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 15)
font_serif_h3 = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 18)
font_serif_host = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 23)
font_serif_details = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 16)
font_serif_bold_details = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 16)
font_badge = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 13)

# Top invocation
invoc_text = "!! Shree Shree Prajapataye Namah !!"
draw.text((65, 55), invoc_text, font=font_serif_top, fill=(217, 179, 106, 240))

# Gold divider line
draw.line([(65, 84), (240, 84)], fill=(217, 164, 65, 160), width=1)

# Header Tagline
kicker_text = "WEDDING RECEPTION INVITATION"
draw.text((65, 102), kicker_text, font=font_serif_h3, fill=(232, 200, 116, 255))

# Names: Ribhu & Swati (with subtle gold shadow)
names_text = "Ribhu & Swati"
# Shadow
draw.text((67, 137), names_text, font=font_script_huge, fill=(30, 6, 10, 220))
draw.text((65, 135), names_text, font=font_script_huge, fill=(246, 226, 174, 255))

# Decorative hairline
draw.line([(65, 240), (500, 240)], fill=(217, 164, 65, 120), width=1)
draw.regular_polygon((280, 240, 4), 4, fill=(217, 164, 65, 220))

# Invitation Host Text
draw.text((65, 260), "Cordially invited by", font=font_serif_h3, fill=(217, 179, 106, 210))
draw.text((65, 288), "Rinku & Partha Pramanik", font=font_serif_host, fill=(246, 226, 174, 255))
draw.text((65, 320), "to celebrate the wedding reception of their son Ribhu & Swati", font=font_serif_details, fill=(243, 231, 211, 180))

# Date & Venue Card / Block
card_box = [65, 365, 580, 490]
draw.rounded_rectangle(card_box, radius=12, fill=(43, 10, 16, 180), outline=(217, 164, 65, 100), width=1)

# Calendar icon dot
draw.ellipse([85, 390, 93, 398], fill=(217, 164, 65, 240))
draw.text((105, 386), "Tuesday, 8th December 2026", font=font_serif_bold_details, fill=(246, 226, 174, 255))
draw.text((105, 410), "Reception from 6:30 PM Onwards", font=font_serif_details, fill=(243, 231, 211, 200))

# Location icon dot
draw.ellipse([85, 442, 93, 450], fill=(217, 164, 65, 240))
draw.text((105, 438), "Swapno Bhor (Seniors' Park)", font=font_serif_bold_details, fill=(246, 226, 174, 255))
draw.text((105, 460), "BF 04, Action Area-1, New Town, Kolkata 700156", font=font_serif_details, fill=(243, 231, 211, 180))

# Bottom Badge
badge_box = [65, 522, 390, 564]
draw.rounded_rectangle(badge_box, radius=21, fill=(33, 7, 12, 230), outline=(217, 164, 65, 140), width=1)
# Draw small diamond icon instead of unicode character
draw.regular_polygon((84, 543, 5), 4, fill=(217, 164, 65, 230))
draw.text((98, 533), "swathi-weds-ribhu.invitingyou.top", font=font_badge, fill=(232, 200, 116, 240))

# Convert to RGB and save all locations
final_rgb = bg.convert("RGB")
final_rgb.save("public/assets/og-image.jpg", "JPEG", quality=95, optimize=True)
final_rgb.save("public/assets/og-card.jpg", "JPEG", quality=95, optimize=True)
final_rgb.save("public/og-card.jpg", "JPEG", quality=95, optimize=True)
print("OG Image generated successfully at public/assets/og-image.jpg, public/assets/og-card.jpg, and public/og-card.jpg")

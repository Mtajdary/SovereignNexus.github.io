from PIL import Image, ImageDraw

def draw_lux_crown_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = int(size * 0.22)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=(9, 13, 22, 255), outline=(234, 179, 8, 120), width=max(1, int(size*0.015)))
    
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    center = size // 2
    r_glow = int(size * 0.35)
    glow_draw.ellipse([center - r_glow, center - r_glow, center + r_glow, center + r_glow], fill=(234, 179, 8, 35))
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)
    
    def pt(x, y):
        return (int(size * (0.15 + (x / 100.0) * 0.7)), int(size * (0.2 + (y / 100.0) * 0.6)))
    
    b_tl, b_br = pt(12, 75), pt(88, 86)
    draw.rounded_rectangle([b_tl[0], b_tl[1], b_br[0], b_br[1]], radius=max(2, int(size*0.02)), fill=(234, 179, 8, 255), outline=(254, 240, 138, 255), width=max(1, int(size*0.008)))
    
    for gem_x in [30, 50, 70]:
        gx, gy = pt(gem_x, 80.5)
        gr = max(2, int(size * 0.022))
        draw.ellipse([gx - gr, gy - gr, gx + gr, gy + gr], fill=(9, 13, 22, 255))
        draw.ellipse([gx - gr//2, gy - gr//2, gx + gr//2, gy + gr//2], fill=(254, 240, 138, 255))
        
    crown_poly = [
        pt(14, 73), pt(15, 38), pt(32, 56), pt(50, 22), pt(68, 56), pt(85, 38), pt(86, 73)
    ]
    draw.polygon(crown_poly, fill=(245, 158, 11, 255), outline=(254, 240, 138, 255))
    
    jewels = [(15, 36, 0.035), (50, 20, 0.045), (85, 36, 0.035)]
    for jx, jy, jr_pct in jewels:
        px, py = pt(jx, jy)
        jr = max(3, int(size * jr_pct))
        draw.ellipse([px - jr, py - jr, px + jr, py + jr], fill=(254, 240, 138, 255), outline=(217, 119, 6, 255), width=max(1, int(size*0.006)))
        draw.ellipse([px - jr//2, py - jr//2, px, py], fill=(255, 255, 255, 255))

    return img

draw_lux_crown_icon(192).save("public/logo192.png")
draw_lux_crown_icon(512).save("public/logo512.png")
draw_lux_crown_icon(64).save("public/favicon.ico")
print("High-res Golden Crown Icons Generated!")

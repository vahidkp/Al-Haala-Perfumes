# AR-Rahmani — Image Prompts for `/home-v2` (Afnan-Inspired)

These prompts target the Afnan-style v2 only. **Do not use these on the Yusuf Bhai homepage** — that page expects the warm forest/cream/gold palette. v2 expects bright, saturated, fashion-editorial photography.

Drop generated files into `public/images/v2/` and wire them via the file-by-file mapping at the end.

---

## ⚙️ Global v2 Style Guide (prepend if model loses style)

> Brand: **AR-Rahmani Perfumes** — luxury Arabian fragrance house, **modern fashion-editorial styling** in the spirit of Afnan / Lattafa campaigns. Bright saturated jewel tones (electric blue, deep violet, burgundy, navy, ochre, charcoal), clean studio lighting, high contrast. Atmospheric props — fresh roses and rose petals, dried botanicals, silk ribbons, scattered florals, soft fabric folds, glass refractions, light haze, occasional fish/water motifs. **Product hero shots are crisp cutouts with seamless solid coloured backgrounds.** Photographic realism, magazine-quality, no people's faces unless specified, no logos, no text on the bottle, no watermarks.

---

## 🌟 Hero & Brand Banners

### 1. Hero Bottle Cutout (`/images/v2/hero-bottle.png`)
- **Used by:** `HeroV2` (right side, oversized bottle floating on bright blue background)
- **Aspect / size:** 4:5 portrait, **1400×1750 px**, **transparent or matching blue background**
- **Prompt:**
> A tall faceted crystal perfume bottle with brushed gold cap and amber-rose tinted liquid inside, photographed in clean studio lighting against an electric royal-blue gradient backdrop (#0049b3 → #1a5fc7). The bottle is centered, slightly rotated, with strong rim light from the upper right. Subtle drop shadow below. No text on the bottle. Editorial fashion-perfume campaign style, photorealistic, magazine-quality.

### 2. LYNKED Dual Product — Left (`/images/v2/lynked-left.png`)
- **Used by:** `DualProductBanner` (left bottle on black)
- **Aspect / size:** 4:5 portrait, **900×1200 px**, **black or transparent background**
- **Prompt:**
> A square-cut clear glass perfume bottle with matte-black cap, golden liquid inside, photographed straight-on against a pure black background. Dramatic soft-key light from the side casts subtle highlights on the glass edges. Crisp, modern, masculine campaign aesthetic, photorealistic, no text.

### 3. LYNKED Dual Product — Right (`/images/v2/lynked-right.png`)
- **Used by:** `DualProductBanner` (right bottle on black)
- **Aspect / size:** 4:5 portrait, **900×1200 px**, **black or transparent background**
- **Prompt:**
> A tapered cylindrical translucent amber-glass perfume bottle with gold-and-black striped cap, photographed against a pure black background with the same dramatic side lighting and crisp glass highlights as the previous shot. Companion piece — same lighting, same camera angle. Photorealistic, no text.

---

## 🧴 Lifestyle 2×2 Collage (`LifestyleCollage`)

Four atmospheric mood shots that sit between sections — they should feel like a fashion editorial spread.

### 4. Collage 1 — Florals (`/images/v2/lifestyle-roses.png`)
- **Aspect / size:** 5:4 landscape, **1400×1120 px**
- **Prompt:**
> Editorial close-up of a blush-pink frosted glass perfume bottle resting amongst fresh velvety red and pink roses in full bloom, soft natural side light, dreamy painterly quality, shallow depth of field, warm romantic mood. Magazine-spread aesthetic, photorealistic.

### 5. Collage 2 — Golden Atelier (`/images/v2/lifestyle-atelier.png`)
- **Aspect / size:** 5:4 landscape, **1400×1120 px**
- **Prompt:**
> Overhead luxury still-life of an ornate gold attar vial on a cream silk cloth, surrounded by gold trays, antique brass dishes, scattered dried saffron threads, and rose buds. Warm gold-and-cream colour palette, soft natural daylight, magazine editorial shot, photorealistic.

### 6. Collage 3 — Cool Blue Mood (`/images/v2/lifestyle-blue.png`)
- **Aspect / size:** 5:4 landscape, **1400×1120 px**
- **Prompt:**
> A frosted crystal perfume bottle backlit on a wave-like piece of blue silk fabric with subtle iridescent shimmer. Cool blue palette (sapphire and ice tones), studio-clean composition, atmospheric haze around the bottle, sense of motion. Modern editorial perfume campaign, photorealistic, no text.

### 7. Collage 4 — Amber Glow (`/images/v2/lifestyle-amber.png`)
- **Aspect / size:** 5:4 landscape, **1400×1120 px**
- **Prompt:**
> A trio of amber-glass perfume bottles in different shapes arranged on a polished black marble surface, lit from above with warm golden light that catches the glass and casts long amber reflections. Dark backdrop, low-key cinematic, photorealistic editorial shot.

---

## 🌆 Wide Collection Banners

### 8. 9AM/9PM Collection (`/images/v2/banner-9am-9pm.png`)
- **Used by:** `CollectionBanner` (heading "9AM / 9PM Collection")
- **Aspect / size:** ultra-wide 21:9, **2400×1030 px**
- **Prompt:**
> A wide cinematic banner showing twelve different luxury perfume bottles arranged in a precise grid on a textured neutral wall — half the bottles in daytime warm tones (white, cream, gold), half in nighttime cool tones (navy, midnight blue, charcoal). Single soft directional light grazes across them. Modern editorial product wall, photorealistic, no text. Composition leaves clear space on the left for headline text overlay.

### 9. Gift Sets Banner (`/images/v2/banner-gift-sets.png`)
- **Used by:** `CollectionBanner` (heading "Gift Sets", blue tone)
- **Aspect / size:** ultra-wide 21:9, **2400×1030 px**
- **Prompt:**
> A vivid electric-blue editorial banner showing three luxury perfume bottles wrapped in dark ribbon with gold accents, suspended in mid-air against a saturated royal-blue gradient backdrop. Crisp studio lighting, subtle blue smoke / haze, modern campaign aesthetic, photorealistic. Leaves left third of the image clear for overlaid headline.

---

## 📷 Our Looks — Lookbook (`OurLooks`)

### 10. Look 1 — The Atelier (`/images/v2/look-atelier.png`)
- **Aspect / size:** 4:3 landscape, **1600×1200 px**
- **Prompt:**
> A trio of luxurious crystal attar vials with ornate gold filigree caps arranged on a slab of polished cream marble, surrounded by scattered saffron threads, dried red rose petals, and a single fresh white jasmine bloom. Soft warm overhead light, magazine-spread aesthetic, painterly, photorealistic.

### 11. Look 2 — Heritage (`/images/v2/look-heritage.png`)
- **Aspect / size:** 4:3 landscape, **1600×1200 px**
- **Prompt:**
> An ornate gold-and-amber attar bottle with a teardrop crystal stopper, photographed against a backdrop of antique parchment with faint Arabic calligraphy patterns (not readable text — pure aesthetic), brass tray and dried rose buds nearby. Warm cream-and-gold heritage palette, soft directional daylight, photorealistic editorial.

### 12. Look 3 — Modern Femme (`/images/v2/look-modern-femme.png`)
- **Aspect / size:** 4:3 landscape, **1600×1200 px**
- **Prompt:**
> A soft blush-pink frosted glass perfume bottle tied with a single dusty-rose silk ribbon, floating against a backdrop of falling pink rose petals frozen in mid-air. Warm golden hour light, dreamy painterly atmosphere, modern feminine editorial campaign, photorealistic, no text.

---

## 🎨 Discover Our Exquisite Collection — 5 Tiles (`CollectionTiles`)

Each tile sits over a saturated brand-coloured background with `mix-blend-multiply` — so the image should have STRONG composition that reads well when colour-shifted. Aim for atmospheric, slightly painterly product+prop combinations.

### 13. Tile — Celebrate You (violet) (`/images/v2/tile-celebrate.png`)
- **Aspect / size:** 3:4 portrait, **900×1200 px**
- **Prompt:**
> A tall pearl-and-rose perfume bottle photographed against a deep violet velvet backdrop, surrounded by scattered iridescent confetti and soft purple petals. Atmospheric haze, warm rim light, modern campaign aesthetic, photorealistic.

### 14. Tile — Dare To Be Bold (burgundy) (`/images/v2/tile-bold.png`)
- **Aspect / size:** 3:4 portrait, **900×1200 px**
- **Prompt:**
> A sleek dark oxblood perfume bottle photographed against a moody burgundy textured backdrop, surrounded by curling wisps of dark smoke and a single piece of dark oud wood. Dramatic single side light, low-key cinematic, photorealistic.

### 15. Tile — The Night Out (navy) (`/images/v2/tile-night.png`)
- **Aspect / size:** 3:4 portrait, **900×1200 px**
- **Prompt:**
> A deep navy-blue glass perfume bottle with a gold cap, photographed against a midnight-blue backdrop with subtle star-like specks of light, a faint moonlight glow from above, scattered gold flakes drifting. Cinematic, mysterious, photorealistic.

### 16. Tile — Heritage (ochre) (`/images/v2/tile-heritage.png`)
- **Aspect / size:** 3:4 portrait, **900×1200 px**
- **Prompt:**
> A honey-amber glass perfume bottle with brass detailing, photographed against a saturated ochre-orange backdrop with dried rose petals and brass dish props. Warm spice-tone palette, magazine editorial, photorealistic.

### 17. Tile — Signature (charcoal) (`/images/v2/tile-signature.png`)
- **Aspect / size:** 3:4 portrait, **900×1200 px**
- **Prompt:**
> A monolithic matte-black perfume bottle with a single thin gold band around the neck, photographed against a deep charcoal-grey backdrop with a single column of warm light slicing across it. Minimalist, sculptural, photorealistic editorial.

---

## 🧴 Product Cutouts (×12) — Recommended for v2

The Afnan aesthetic puts every product on a **clean cream background with no styling props**. The current v2 cards reuse the moody Yusuf-style product photos, which clash with the bright Afnan grid.

Drop these 12 images at `public/images/v2/product-{slug}.png`. They will **automatically swap in** on v2 without affecting the original `/` homepage — the v2 card component already prefers the v2 path and falls back to the original product image if the v2 file is missing.

### Common template — prepend to every product prompt

> **Background & lighting:** photograph the bottle as a clean, centered cutout on a **soft warm cream background (#f7f5f0)**, soft single top-light, subtle floor reflection / shadow directly beneath. No props, no florals, no fabric, no text. Crisp campaign-grade studio realism. **Aspect 1:1 square, 1200×1200 px.** Save as `/images/v2/product-{slug}.png`.

### Per-product prompts

| # | Filename | Bottle description |
|---|---|---|
| 1 | `product-oud-al-rahmani.png` | A heavy faceted dark-amber crystal perfume bottle with a brushed antique-gold cap, golden-brown liquid visible through the facets. |
| 2 | `product-amber-nights.png` | A tall cylindrical translucent amber-glass perfume bottle with a black-and-gold striped cap, warm honey-amber liquid inside. |
| 3 | `product-rose-royale.png` | A romantic feminine perfume bottle in soft blush-pink frosted glass with a polished rose-gold cap. |
| 4 | `product-cedar-and-musk.png` | A minimalist square-cut clear glass perfume bottle with a matte-black cap, pale champagne liquid. |
| 5 | `product-mystic-attar.png` | A small ornate crystal attar vial with intricate gold filigree pattern and a tear-drop gold stopper, golden oil inside. |
| 6 | `product-desert-bloom.png` | A sand-coloured frosted glass perfume bottle with a coral-pink ribbon tied around the neck. |
| 7 | `product-black-oud.png` | A sleek matte-black tall perfume bottle with a single thin polished-gold band around the neck. |
| 8 | `product-saffron-dreams.png` | A warm honey-gold rounded perfume bottle with an ornate gold cap, vivid amber liquid visible. |
| 9 | `product-midnight-oud.png` | A deep navy-blue glass perfume bottle with a polished gold cap. |
| 10 | `product-royal-bakhoor.png` | An ornate brass mabkhara (incense burner) with intricate cut-out patterns, no smoke (clean shot). |
| 11 | `product-jasmine-attar.png` | A delicate clear-crystal attar vial with a silver-and-pearl cap, faintly pearlescent liquid. |
| 12 | `product-gift-set-noir.png` | A small open dark-green velvet gift box lined with cream silk, containing three miniature black perfume bottles with gold detailing. |

### Per-product prompt (full text — for copy-paste convenience)

Pick any product and concatenate the **Common template** above with its bottle description below. Example for Oud Al Rahmani:

> Photograph a heavy faceted dark-amber crystal perfume bottle with a brushed antique-gold cap, golden-brown liquid visible through the facets, as a clean, centered cutout on a soft warm cream background (#f7f5f0), soft single top-light, subtle floor reflection / shadow directly beneath. No props, no florals, no fabric, no text. Crisp campaign-grade studio realism. Aspect 1:1 square, 1200×1200 px.

### Wire-in

**Already wired** — no code edits needed. The v2 product card ([AfnanProductCard.tsx](src/components/home-v2/AfnanProductCard.tsx)) and discovery kit card ([DiscoveryKitCard.tsx](src/components/home-v2/DiscoveryKitCard.tsx)) try `/images/v2/product-{slug}.png` first and fall back to `product.images[0].url` if the file 404s. So:

- Drop a v2 cutout into `public/images/v2/` → it appears on v2
- Skip a product → that card uses the original image
- Original `/` homepage is **never** affected — it doesn't look at `/images/v2/` at all

---

## 📐 Quick-reference size table

| Slot                             | Ratio | Size       | Path                                       |
|----------------------------------|-------|------------|--------------------------------------------|
| Hero bottle (right of hero)      | 4:5   | 1400×1750  | `v2/hero-bottle.png`                       |
| LYNKED dual — left               | 4:5   | 900×1200   | `v2/lynked-left.png`                       |
| LYNKED dual — right              | 4:5   | 900×1200   | `v2/lynked-right.png`                      |
| Lifestyle collage (×4)           | 5:4   | 1400×1120  | `v2/lifestyle-{roses,atelier,blue,amber}.png` |
| 9AM/9PM banner                   | 21:9  | 2400×1030  | `v2/banner-9am-9pm.png`                    |
| Gift Sets banner                 | 21:9  | 2400×1030  | `v2/banner-gift-sets.png`                  |
| Lookbook (×3)                    | 4:3   | 1600×1200  | `v2/look-{atelier,heritage,modern-femme}.png` |
| Collection tiles (×5)            | 3:4   | 900×1200   | `v2/tile-{celebrate,bold,night,heritage,signature}.png` |
| Product cutouts (×12)            | 1:1   | 1200×1200  | `v2/product-{slug}.png`                    |

**Total new images: 17 hero/banner/tile/look + 12 product cutouts = 29**

---

## 🔁 Wire-in checklist after generation

After dropping files into `public/images/v2/`, only 5 files need edits:

### a) [src/components/home-v2/HeroV2.tsx](src/components/home-v2/HeroV2.tsx)
Add a prop and swap `productImage` for `/images/v2/hero-bottle.png`:
```tsx
// In page.tsx, pass: <HeroV2 product={heroProduct} heroImage="/images/v2/hero-bottle.png" />
// Inside HeroV2, default to the prop:
const productImage = heroImage ?? product?.images[0]?.url
```

### b) [src/components/home-v2/DualProductBanner.tsx](src/components/home-v2/DualProductBanner.tsx)
Same pattern — accept `leftImage` / `rightImage` props, default to product images.

### c) [src/app/(afnan)/home-v2/page.tsx](src/app/(afnan)/home-v2/page.tsx)
Update the four arrays at the top of the function:
```tsx
const collageImages = [
  '/images/v2/lifestyle-roses.png',
  '/images/v2/lifestyle-atelier.png',
  '/images/v2/lifestyle-blue.png',
  '/images/v2/lifestyle-amber.png',
]

const lookbookImages = [
  { title: 'The Atelier Look',  caption: 'Signature · Limited',  href: '/collections',                  image: '/images/v2/look-atelier.png' },
  { title: 'Heritage Collection', caption: 'Attar · Oud',         href: '/collections?category=attar',    image: '/images/v2/look-heritage.png' },
  { title: 'Modern Femme',       caption: 'Floral · Modern',     href: '/collections?category=women',    image: '/images/v2/look-modern-femme.png' },
]
```

Also swap the two `CollectionBanner` `imageUrl` props to `/images/v2/banner-9am-9pm.png` and `/images/v2/banner-gift-sets.png`.

### d) [src/components/home-v2/CollectionTiles.tsx](src/components/home-v2/CollectionTiles.tsx)
Update each tile's `image` field to the matching `/images/v2/tile-*.png`.

### e) (Optional) [src/lib/mock-data.ts](src/lib/mock-data.ts)
If you regenerated the product cutouts, change the product hero path:
```tsx
// In makeProduct, swap:
const productHero = `/images/v2/product-${args.slug}.png`
```
Note: this would also affect the Yusuf Bhai pages — best to add a v2-only override at the call sites or accept that both versions get the cleaner cutouts.

### Compression

PNG files at the sizes above can be 1–4 MB each. Run them through [squoosh.app](https://squoosh.app) (target ~150–300 KB WebP/JPEG) before committing.

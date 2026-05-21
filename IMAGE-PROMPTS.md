# AR-Rahmani Perfumes — Image Generation Prompts

Paste each prompt into ChatGPT (DALL·E), Gemini, Midjourney, or any image generator. Each section lists:
- **Slot** — where the image is used in the codebase
- **Aspect ratio / size** — recommended export
- **Prompt** — copy/paste

Save the generated files into `/public/images/...` (create the folder) and swap the Unsplash URLs in [src/lib/images.ts](src/lib/images.ts) and [src/lib/mock-data.ts](src/lib/mock-data.ts) for the new local paths.

---

## ⚙️ Global Brand & Style Guide (prepend to any prompt if model loses style)

> Brand: **AR-Rahmani Perfumes** — luxury Arabian / oud-attar house. Editorial, cinematic, magazine-quality. Soft natural daylight, warm golden-hour glow. Colour palette: deep forest green (#1B3A2E), warm cream (#F1ECE2), antique gold (#C9A84C), ink black. Mood: timeless, sensual, hand-crafted, quiet luxury. No people's faces, no logos, no text, no watermarks. Studio-grade composition, shallow depth of field, soft film grain, true-to-life skin tones if hands appear. Style references: Tom Ford private blend, Maison Francis Kurkdjian, Le Labo.

---

## 🌅 Hero & Editorial Banners

### 1. Main Hero (`heroImages.main`)
- **Where:** Top of homepage — full-bleed background behind "AR-RAHMANI / FRAGRANCES"
- **Aspect / size:** 21:9 ultrawide, **2400×1080 px**, will be darkened ~70% with a forest-green overlay
- **Prompt:**
> A dark, moody cinematic flat-lay shot from above of an amber glass perfume bottle resting on rich black marble, surrounded by dried oud chips, a single ivory rose, golden specks of saffron threads, and trails of light incense smoke curling upward. Warm low-key lighting with a single soft amber rim light. Shallow depth of field, photorealistic, editorial perfume campaign style, slight film grain, deep forest-green colour cast in the shadows. No text, no labels, no logos.

### 2. Men's Banner (`heroImages.men`)
- **Where:** "AR-RAHMANI Signature Edition" banner + "Poem For Him" split banner
- **Aspect / size:** 16:9, **2000×1125 px**
- **Prompt:**
> A masculine, sculptural product shot of a heavy crystal-cut amber perfume bottle with brushed gold cap, photographed on a polished dark walnut surface. Background of deep emerald-green velvet drapery, lit by a single warm golden side light. Subtle smoke / oud incense drifting across the frame. Editorial menswear-style composition, very shallow depth of field, soft film grain, hint of antique gold reflections. Photorealistic, no people, no text.

### 3. Women's Banner (`heroImages.women`)
- **Where:** "Poem For Her" split banner
- **Aspect / size:** 16:9, **2000×1125 px**
- **Prompt:**
> An elegant feminine still life of a tall faceted crystal perfume bottle with a rose-gold cap, placed on a cream silk fabric with delicate folds. Pale blush roses and tiny dried jasmine flowers scattered around the base. A soft beam of morning window light hits the bottle, scattering golden refractions. Romantic editorial perfume photography, painterly, dreamy, very shallow depth of field, warm cream-and-gold palette. Photorealistic, no people, no text.

### 4. Story Banner (`heroImages.story`)
- **Where:** Product page "Story" section
- **Aspect / size:** 4:3, **1800×1350 px**
- **Prompt:**
> An overhead artisan workbench scene: small brass measuring cups of essential oils, glass droppers, raw oud wood chips, dried rose petals, a leather-bound notebook with quill, and an antique amber perfume bottle being filled. Warm soft daylight from a side window. Brown leather, brass, cream linen, deep green and gold tones. Hands of a perfumer (no face) may appear holding a dropper. Documentary editorial style, photorealistic, shallow DOF.

---

## 🗂️ Category Tiles (`categoryImages` in src/lib/images.ts)

All category tiles should feel like a coherent set — same lighting, same backdrop tone.

### 5. Oud (`categoryImages.oud`)
- **Aspect / size:** 4:5 portrait, **1200×1500 px**
- **Prompt:**
> Close-up macro of dark oud wood chips and resin pieces piled on a slab of charcoal stone, single column of warm golden light slicing across the frame. Tiny wisps of incense smoke. Background deep forest-green blur. Photorealistic, editorial luxury fragrance brand aesthetic, no text.

### 6. Attar / Perfume Oil (`categoryImages.attar`)
- **Aspect / size:** 4:5 portrait, **1200×1500 px**
- **Prompt:**
> A small jewel-like crystal attar vial with gold filigree stopper, half-filled with golden oil, standing on a sheet of antique parchment beside a dried rose and a brass tray. Soft directional daylight, warm cream and gold palette, faint film grain, editorial perfumery photograph. Photorealistic, no text, no logos.

### 7. Bakhoor (`categoryImages.bakhoor`)
- **Aspect / size:** 4:5 portrait, **1200×1500 px**
- **Prompt:**
> A traditional brass mabkhara incense burner glowing with embers, releasing soft swirling smoke. Background of dark forest-green textured wall, side warm light, scattered bakhoor wood chips on the surface. Atmospheric, cinematic, photorealistic, no text.

### 8. Gift Sets (`categoryImages.gifts`)
- **Aspect / size:** 4:5 portrait, **1200×1500 px**
- **Prompt:**
> A luxurious open gift box made of dark forest-green velvet lined with cream silk, holding three small amber perfume bottles arranged neatly. A satin ribbon and a sprig of dried gypsophila draped beside it. Warm golden lighting, overhead 3/4 angle, editorial product photography, photorealistic, no text or logos.

### 9. New Arrivals (`categoryImages.new`)
- **Aspect / size:** 4:5 portrait, **1200×1500 px**
- **Prompt:**
> A fresh editorial composition of a brand-new translucent crystal perfume bottle with a polished gold cap, surrounded by white blossoms and soft mist. Bright but warm morning light, cream and pale-gold palette, minimalist, photorealistic, no text.

### 10. All Collections (`categoryImages.all`)
- **Aspect / size:** 4:5 portrait, **1200×1500 px**
- **Prompt:**
> A flat-lay of a curated group of five different perfume bottles of varying shapes — amber, crystal, frosted glass — arranged like a still-life on a warm cream linen surface with dried roses, saffron, and a brass tray. Soft overhead daylight, editorial luxury brand aesthetic, photorealistic, no text.

---

## ✨ Scented Delights (`delightImages` in src/lib/images.ts)

These show as three square tiles with a dark gradient overlay and a label.

### 11. Perfumes (`delightImages.perfumes`)
- **Aspect / size:** 1:1 square, **1200×1200 px**
- **Prompt:**
> A single tall amber perfume bottle photographed against a soft pastel rose backdrop with falling rose petals frozen in mid-air, warm golden side light. Editorial luxury perfume shot, photorealistic, no text.

### 12. Candles / Bakhoor (`delightImages.bakhoor`)
- **Aspect / size:** 1:1 square, **1200×1200 px**
- **Prompt:**
> A cluster of three lit cream-coloured pillar candles of different heights on a dark wooden tray, gentle smoke curling upward, warm flickering amber light, deep forest-green velvet background. Cinematic still life, photorealistic, no text.

### 13. Attar (`delightImages.attar`)
- **Aspect / size:** 1:1 square, **1200×1200 px**
- **Prompt:**
> A row of three tiny crystal attar vials with gold stoppers, each filled with a different shade of golden oil (light honey, deep amber, dark cognac), on a marble slab with a few saffron threads and dried rose petals. Soft warm light, editorial luxury aesthetic, photorealistic, no text.

---

## 🎵 Note Explorer (Product Page) (`noteExplorerImages`)

### 14. Background (`noteExplorerImages.bg`)
- **Aspect / size:** 21:9, **2000×857 px**, will sit behind cream text with dark overlay
- **Prompt:**
> A dark, textured forest-floor scene at dusk: damp moss, scattered cedar bark, drops of resin glistening, sparse beams of warm light cutting through. Cinematic, painterly, very low-key, deep greens and amber. Photorealistic, no people, no text.

### 15. Top notes (`noteExplorerImages.top`)
- **Aspect / size:** 1:1 square, **800×800 px**
- **Prompt:**
> A bright, fresh close-up macro of fresh bergamot citrus halved, pink peppercorns, and cardamom pods arranged on a cream linen cloth, scattered citrus mist. Warm overhead daylight, editorial food-photography style, photorealistic, no text.

### 16. Heart notes (`noteExplorerImages.heart`)
- **Aspect / size:** 1:1 square, **800×800 px**
- **Prompt:**
> A romantic close-up macro of velvety crimson rose petals, golden saffron threads, and a single small piece of dark oud wood, on a cream marble surface. Warm soft light, painterly, photorealistic, no text.

### 17. Base notes (`noteExplorerImages.base`)
- **Aspect / size:** 1:1 square, **800×800 px**
- **Prompt:**
> A deep, moody close-up macro of dark amber resin pieces, vanilla pods split open showing seeds, and a swirl of cream musk powder, on a dark wood slab. Single warm side light, painterly, editorial, photorealistic, no text.

---

## 🧴 Product Images (`mockProducts` in src/lib/mock-data.ts)

Each product currently uses the same default array of 4 photos. For polished launch art, generate the **hero shot** for each product (the rest can reuse category visuals).

**Common product-shot template:**
> A single luxury perfume bottle photographed in a styled editorial still life. Bottle shape, cap, and surrounding props described per product below. Soft cinematic lighting, shallow depth of field, photorealistic, no text on the bottle (we add label in post). Aspect 4:5 portrait, 1200×1500 px.

### 18. Oud Al Rahmani (`/products/oud-al-rahmani`)
> A heavy dark-amber faceted crystal perfume bottle with a brushed antique-gold cap, set on black marble, dark oud wood chips scattered around its base, a thin trail of incense smoke behind it, deep forest-green velvet backdrop, single warm gold spotlight from the upper right. Cinematic, photorealistic, no text.

### 19. Amber Nights (`/products/amber-nights`)
> A tall cylindrical translucent amber-glass perfume bottle with a black-and-gold cap, sitting on a polished dark walnut surface, scattered amber resin pieces and a single dried orange slice nearby, warm low-key candlelight glow, deep brown and gold tones. Photorealistic, no text.

### 20. Rose Royale (`/products/rose-royale`)
> A romantic feminine perfume bottle in soft blush-pink frosted glass with a rose-gold cap, surrounded by fresh velvety red and pink roses and a few fallen petals, on a cream silk fabric, soft morning window light, warm golden refractions. Editorial perfume photography, photorealistic, no text.

### 21. Cedar & Musk (`/products/cedar-and-musk`)
> A minimalist square-cut clear glass perfume bottle with a matte-black cap, on a slab of pale raw cedar wood, scattered with a few cedar shavings and a sprig of fresh thyme. Soft cool daylight balanced with a warm fill, masculine and clean, photorealistic, no text.

### 22. Mystic Attar (`/products/mystic-attar`)
> A small ornate crystal attar vial with intricate gold filigree and a tear-drop gold stopper, sitting on a piece of antique parchment with delicate Arabic calligraphy faintly visible (no readable text), dried rose buds and a brass tray nearby. Warm cream and gold palette, soft directional light, photorealistic.

### 23. Desert Bloom (`/products/desert-bloom`)
> A sand-coloured frosted glass perfume bottle with a coral-pink ribbon tied around its neck, on a backdrop of warm cream linen with scattered dried desert wildflowers and tiny grains of sand. Soft golden hour light, warm peach and beige tones, editorial, photorealistic.

### 24. Black Oud (`/products/black-oud`)
> A sleek matte-black tall perfume bottle with a single thin gold band around its neck, against a smoky dark background with curling incense smoke, a piece of dark oud wood resting at the base. Single dramatic golden side light, low-key cinematic, photorealistic, no text.

### 25. Saffron Dreams (`/products/saffron-dreams`)
> A warm honey-gold rounded perfume bottle with an ornate gold cap, surrounded by a small spill of vivid red saffron threads, on a cream marble slab. Soft warm overhead light, painterly, editorial fragrance still life, photorealistic.

### 26. Midnight Oud (`/products/midnight-oud`)
> A deep navy-blue glass perfume bottle with a gold cap, set on a midnight-blue velvet surface with a faint moonlight glow from above, scattered dark oud chips and a small silver coin beside it. Cinematic, mysterious, photorealistic.

### 27. Royal Bakhoor (`/products/royal-bakhoor`)
> An ornate brass mabkhara (incense burner) glowing with embers, releasing soft smoke, with a small bowl of bakhoor wood chips beside it on a dark teak surface. Warm amber light, atmospheric, photorealistic, no text.

### 28. Jasmine Attar (`/products/jasmine-attar`)
> A delicate clear-crystal attar vial with a silver-and-pearl cap, surrounded by fresh white jasmine flowers spilling over a cream silk cloth, soft morning window light. Romantic, editorial, photorealistic.

### 29. Noir Gift Set (`/products/gift-set-noir`)
> An open dark forest-green velvet gift box lined with cream silk, containing three small black perfume bottles with gold detailing arranged neatly, a satin gold ribbon trailing beside it, and a tag (blank) with a wax seal. Overhead 3/4 angle, warm directional light, luxury packaging editorial, photorealistic, no text.

---

## 📐 Quick-reference size table

| Slot                    | Ratio | Recommended size |
|-------------------------|-------|------------------|
| Main hero               | 21:9  | 2400×1080        |
| Editorial banners (men/women/signature) | 16:9 | 2000×1125 |
| Story banner            | 4:3   | 1800×1350        |
| Category tiles          | 4:5   | 1200×1500        |
| Scented Delights tiles  | 1:1   | 1200×1200        |
| NoteExplorer background | 21:9  | 2000×857         |
| NoteExplorer note tiles | 1:1   | 800×800          |
| Product hero shots      | 4:5   | 1200×1500        |

---

## 🔁 Swap-in checklist after generation

1. Drop files into `public/images/` using descriptive names, e.g. `public/images/hero-main.jpg`, `public/images/category-oud.jpg`, `public/images/product-oud-al-rahmani.jpg`.
2. Open [src/lib/images.ts](src/lib/images.ts) and replace each Unsplash URL with the local path, e.g. `main: '/images/hero-main.jpg'`.
3. Open [src/lib/mock-data.ts](src/lib/mock-data.ts) and update the per-product `images` arrays.
4. Compress to ~150–250 KB each (use [squoosh.app](https://squoosh.app) or `sharp`).
5. Reload `localhost:3000` — Next.js Image will optimise local assets automatically.

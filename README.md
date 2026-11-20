# EVLAN Bar Pro — Apple-Inspired Protein Bar Website

An Apple-style showcase and storefront for **EVLAN Bar Pro** — engineered for peak performance with cold-microfiltered grass-fed whey isolate, single-origin cacao, and zero added sugar.

Built with pure semantic HTML5, modern CSS3 (Apple dark aesthetic, dynamic finishes, bento grids, glassmorphism, 3D CSS rendering), and zero-dependency vanilla JavaScript.

---

## ⚡ Live Subdomain Setup: `protein.evlanfoods.com`

The site is already configured with `CNAME` pointing to `protein.evlanfoods.com`.

### Step 1: Add DNS Record to your Domain Registrar
Log into your DNS provider (Cloudflare, GoDaddy, Namecheap, Hostinger, Squarespace, etc.) for `evlanfoods.com` and add this single record:

| Type | Name / Host | Target / Value | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `protein` | `luckyrites.github.io` | Automatic (or 300 / 1 hour) |

> **Note**: If using **Cloudflare**, make sure the proxy status is set to **DNS Only** (grey cloud) during initial SSL certificate issuance by GitHub, or ensure SSL/TLS encryption mode is set to **Full**.

---

### Step 2: Push Changes to GitHub
Run the following commands in this directory (`d:\Git\evlan`):

```bash
git add .
git commit -m "feat: Apple-inspired UI and color website for EVLAN Bar Pro on protein.evlanfoods.com"
git push origin main
```

---

### Step 3: Verify GitHub Pages
1. Open your repository on GitHub: [https://github.com/luckyrites/evlan](https://github.com/luckyrites/evlan)
2. Go to **Settings** > **Pages**
3. Verify:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
   - **Custom domain**: `protein.evlanfoods.com` (auto-detected from the `CNAME` file)
4. Check **Enforce HTTPS** (turns active once DNS propagates, usually 2–10 minutes).

Your site will be live at: **[https://protein.evlanfoods.com](https://protein.evlanfoods.com)**!

---

## 🎨 Apple-Inspired Design Highlights

1. **Apple Color Finishes & Ambient Glow**:
   - **Obsidian Cocoa**: Deep midnight 72% dark cacao with warm amber glow.
   - **Natural Titanium**: Caramelized lucuma and roasted almond with golden titanium reflection.
   - **Glacial Vanilla**: Bourbon vanilla bean and cashew butter with crisp alpine blue glow.
   - **Cosmic Berry**: Freeze-dried bilberry and Amazonian acai with neon ultraviolet glow.
   - **Kyoto Matcha**: Stone-ground Uji tencha with emerald glow.
2. **Interactive 3D Bar Stage**: 3D parallax tilt response to cursor movement, metallic foil wrapper reflection, exposed interior layers.
3. **Four-Layer Architecture (Exploded View)**: Apple Silicon-inspired breakdown of the edible engineering.
4. **By the Numbers**: Massive typographic metric hierarchy (21g Protein, 0.0g Added Sugar, 10g Prebiotic Fiber, 100% Clean Label).
5. **Head-to-Head Comparison Table**: Apple-style breakdown against conventional gym bars and candy snacks.
6. **Complete FDA Nutrition Panel**: Interactive modal with complete BCAA, Leucine, and Glutamine amino acid matrix.
7. **Apple Pay Slide-Over Bag**: Flavor customizer, 12-pack / 24-pack sizing, and Subscribe & Save (-15%) calculation.

---

*(Note: The previous general artisan foods landing page has been backed up in `foods-index.html`)*

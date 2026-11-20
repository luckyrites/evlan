# AURA Foods — Modern Minimalist UI

An ultra-fast, minimalist, Apple-inspired website showcase for artisan organic food products. Built with pure semantic HTML5, modern CSS3 (custom properties, bento grids, glassmorphism, responsive clamp typography), and zero-dependency micro-interactions.

---

## 🚀 Quick Steps to Host on GitHub Pages & Connect Domain

### 1. Initialize Git & Push to GitHub

Run these commands in this directory (`d:\Git\evlan`):

```bash
git init
git add .
git commit -m "Initial commit: Apple-inspired food products website"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git push -u origin main
```

*(Replace `<YOUR_GITHUB_USERNAME>` and `<YOUR_REPO_NAME>` with your actual GitHub details).*

---

### 2. Enable GitHub Pages

1. Open your repository on GitHub.
2. Go to **Settings** > **Pages** (under "Code and automation" in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
4. Click **Save**.

Your site will be live within 1–2 minutes at: `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/`.

---

### 3. Connect Your Custom Domain

#### A. Set Domain in GitHub
1. Under **Settings** > **Pages** > **Custom domain**, enter your domain (e.g. `yourdomain.com` or `www.yourdomain.com`).
2. Click **Save**. This creates / updates the `CNAME` file in your repository.
3. Check the box **Enforce HTTPS** (available once DNS propagation is verified, usually 5-15 mins).

#### B. Update DNS Records at Your Domain Registrar (Namecheap, GoDaddy, Cloudflare, Google Domains, etc.)

**If using an Apex domain (e.g., `example.com`):**
Add four `A` records pointing to GitHub's IPs:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

**If using a subdomain or `www` (e.g., `www.example.com`):**
- Add a `CNAME` record:
  - **Host / Name**: `www`
  - **Target / Value**: `<YOUR_GITHUB_USERNAME>.github.io`

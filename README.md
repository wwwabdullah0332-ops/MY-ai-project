# MY-ai-project (STRIDE Shoes)

Professional multi-page static e-commerce website for a shoe brand named **STRIDE**.

## What I already set up for your launch

This repository is now configured to be deployment-ready:

- SEO metadata and canonical/Open Graph URL set to `https://www.strideshoes.com/`.
- `sitemap.xml` added for search indexing.
- `robots.txt` added and pointing to your sitemap.
- `netlify.toml` added for easy Netlify deployment.
- `vercel.json` added for easy Vercel deployment.

---

## Run locally

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Then open:

- `http://localhost:4173/index.html`

---

## Deploy to `www.strideshoes.com` (fastest path)

## Option A: Netlify (recommended)

1. Push this repo to GitHub.
2. Go to Netlify → **Add new site** → **Import from Git**.
3. Select this repository.
4. Build command: *(leave empty)*
5. Publish directory: `.`
6. Click **Deploy**.
7. In Netlify → **Domain management** → **Add custom domain** → add `www.strideshoes.com`.
8. In your domain registrar DNS:
   - Add `CNAME` record: `www` → your Netlify site domain.
   - Add root domain records for `strideshoes.com` exactly as Netlify shows.

## Option B: Vercel

1. Push repo to GitHub.
2. Import project in Vercel.
3. Framework preset: **Other**.
4. Build command: none.
5. Output directory: `.`
6. Add `www.strideshoes.com` in **Domains**.
7. Update DNS exactly as Vercel provides.

---

## Get your website on Google

1. Open **Google Search Console**.
2. Add property: `https://www.strideshoes.com` (or domain-level property).
3. Verify ownership with the DNS TXT record.
4. Submit: `https://www.strideshoes.com/sitemap.xml`.
5. Use URL Inspection for:
   - `https://www.strideshoes.com/`
   - `https://www.strideshoes.com/products.html`

---

## Important: what I cannot do without your accounts

I can prepare all code/configuration (done), but these steps require your account access:

- Logging into your registrar (GoDaddy/Namecheap/Cloudflare) to update DNS.
- Logging into Netlify/Vercel to connect the project and domain.
- Logging into Google Search Console to verify domain ownership.

If you want, I can next generate a **copy-paste DNS checklist** specifically for your registrar (GoDaddy, Namecheap, Cloudflare, etc.) so setup takes 5–10 minutes.

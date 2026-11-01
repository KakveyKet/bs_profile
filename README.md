# Kakvey Business Portfolio (Khmer-first)

A business-owner-facing Vue 3 + Vite + Tailwind CSS landing page, focused on service outcomes rather than tech stacks.

## Start locally

1. Install Node.js 20.19+ or 22.12+.
2. `npm install`
3. Copy `.env.example` to `.env.local` and replace the placeholder if using Web3Forms.
4. `npm run dev`
5. `npm run build` to create `dist/`.

## Deploy

Push this repository to GitHub, then connect it to Vercel or Cloudflare Pages.
Build command: `npm run build`
Output directory: `dist`
Set the public build-time variable `VITE_WEB3FORMS_ACCESS_KEY` in the hosting dashboard and redeploy. Use the provider's Config / non-secret type; do NOT put passwords here.

If contact submissions do not work on a Vercel-provided subdomain, consult Web3Forms' domain restrictions or use the Telegram contact link. https://docs.web3forms.com/getting-started/troubleshooting

## Customize

- `src/components/BusinessPortfolio.vue`: service copy, prices, contact details, FAQ, Cloudinary posters.
- `index.html`: title, description, Khmer font.
- `public/favicon.svg`: simple placeholder icon (replace with your real logo if you have one).
- Three service poster URLs come from user-supplied Cloudinary links; confirm their service mapping before launch.

## Pricing and marketing accuracy

$250 and $350 are advertised as *starting prices*. Confirm the precise list of features, domain/hosting costs, and maintenance terms with every customer. Website mockups/posters are promotional materials and not evidence of delivered client projects.

## Notes

No custom backend is needed. Submissions are handled by Web3Forms, subject to its domain and spam policies. No guarantee of delivery until a real test email has been verified. The form falls back to Telegram when no public access key is configured.

# Card Zone (كارد زون)

Live store for gaming and telecom cards. Orders go to WhatsApp (+218 91-2304055).

- `index.html`, `app.js` — the store page (served by the Cloudflare Worker `cardzone`).
- `admin.html` — the management panel at `/admin` (password protected). Cards, prices and images are edited there and stored in Cloudflare KV, not in this repo.
- `catalog.json` — the starting catalog, used only when KV is empty.
- `worker.js` — the Cloudflare Worker: serves these files from this branch and holds the catalog/orders API.
- `img/` — design images (tiger, paw, poster layers, card tiles).

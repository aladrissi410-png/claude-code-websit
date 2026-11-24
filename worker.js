// Card Zone — Cloudflare Worker
// Pages and images are served from the GitHub branch (SRC); the catalog, uploaded images and orders live in KV (CZ).
// Admin API requires the ADMIN_PASS secret in the x-admin-key header.

const TYPES = { html: 'text/html; charset=utf-8', js: 'application/javascript; charset=utf-8', css: 'text/css; charset=utf-8', json: 'application/json; charset=utf-8', webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml', ico: 'image/x-icon' };
const SECURITY = { 'x-content-type-options': 'nosniff', 'referrer-policy': 'strict-origin-when-cross-origin' };

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': TYPES.json, 'cache-control': 'no-store', ...SECURITY, ...extra } });
}

async function fromRepo(env, path, ttl) {
  const ext = (path.split('.').pop() || '').toLowerCase();
  const res = await fetch(env.SRC + path, { cf: { cacheTtl: ttl, cacheEverything: true } });
  if (!res.ok) return new Response('Not found', { status: 404 });
  return new Response(res.body, { headers: { 'content-type': TYPES[ext] || 'application/octet-stream', 'cache-control': `public, max-age=${ttl}`, ...SECURITY } });
}

async function getCatalog(env) {
  const raw = await env.CZ.get('catalog');
  if (raw) return JSON.parse(raw);
  const res = await fetch(env.SRC + '/catalog.json', { cf: { cacheTtl: 60 } });
  const seed = await res.json();
  await env.CZ.put('catalog', JSON.stringify(seed));
  return seed;
}

function same(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
async function isAdmin(req, env) {
  const ok = same(req.headers.get('x-admin-key') || '', env.ADMIN_PASS || '');
  if (!ok) await new Promise((r) => setTimeout(r, 700));
  return ok;
}

function cleanCatalog(c) {
  const str = (v, n) => String(v == null ? '' : v).slice(0, n);
  if (!c || !Array.isArray(c.brands) || !Array.isArray(c.cats)) throw new Error('bad catalog');
  return {
    cats: c.cats.slice(0, 30).map((x) => ({ id: str(x.id, 40), label: str(x.label, 40) })),
    brands: c.brands.slice(0, 200).map((b) => ({
      id: str(b.id, 60), name: str(b.name, 40), ar: str(b.ar, 40), cat: str(b.cat, 40), tone: str(b.tone, 1) || 'g',
      img: str(b.img, 300), hidden: !!b.hidden,
      items: (Array.isArray(b.items) ? b.items : []).slice(0, 60).map((i) => ({
        id: str(i.id, 80), label: str(i.label, 60), price: Math.max(0, Math.round((+i.price || 0) * 100) / 100), out: !!i.out, hidden: !!i.hidden,
      })),
    })),
    updated: new Date().toISOString(),
  };
}

async function readOrders(env) {
  const raw = await env.CZ.get('orders');
  return raw ? JSON.parse(raw) : [];
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const p = url.pathname;
    const m = req.method;

    // ---------- public API ----------
    if (p === '/api/catalog' && m === 'GET') {
      const c = await getCatalog(env);
      return json(c, 200, { 'cache-control': 'public, max-age=20' });
    }
    if (p === '/api/order' && m === 'POST') {
      let body;
      try { body = await req.json(); } catch { return json({ error: 'bad json' }, 400); }
      const c = await getCatalog(env);
      const idx = {};
      c.brands.forEach((b) => b.items.forEach((i) => { idx[i.id] = i; }));
      const lines = (Array.isArray(body.items) ? body.items : []).slice(0, 50)
        .map((x) => ({ it: idx[x.id], qty: Math.min(99, Math.max(1, parseInt(x.qty, 10) || 1)) }))
        .filter((x) => x.it)
        .map((x) => ({ id: x.it.id, label: x.it.label, price: x.it.price, qty: x.qty }));
      if (!lines.length) return json({ error: 'empty' }, 400);
      const total = Math.round(lines.reduce((a, l) => a + l.price * l.qty, 0) * 100) / 100;
      const n = (parseInt(await env.CZ.get('order-seq'), 10) || 1000) + 1;
      await env.CZ.put('order-seq', String(n));
      const order = { id: 'CZ-' + n, at: new Date().toISOString(), name: String(body.name || '').slice(0, 60), note: String(body.note || '').slice(0, 300), lines, total, status: 'new' };
      const orders = await readOrders(env);
      orders.unshift(order);
      await env.CZ.put('orders', JSON.stringify(orders.slice(0, 300)));
      return json({ id: order.id, lines, total });
    }
    if (p.startsWith('/u/') && m === 'GET') {
      const key = p.slice(3);
      const { value, metadata } = await env.CZ.getWithMetadata('img:' + key, { type: 'arrayBuffer' });
      if (!value) return new Response('Not found', { status: 404 });
      return new Response(value, { headers: { 'content-type': (metadata && metadata.type) || 'image/webp', 'cache-control': 'public, max-age=31536000, immutable', ...SECURITY } });
    }

    // ---------- admin API ----------
    if (p.startsWith('/api/admin/')) {
      if (!(await isAdmin(req, env))) return json({ error: 'unauthorized' }, 401);
      if (p === '/api/admin/check') return json({ ok: true });
      if (p === '/api/admin/catalog' && m === 'PUT') {
        let c;
        try { c = cleanCatalog(await req.json()); } catch (e) { return json({ error: String(e.message || e) }, 400); }
        const prev = await env.CZ.get('catalog');
        if (prev) await env.CZ.put('catalog-backup', prev);
        await env.CZ.put('catalog', JSON.stringify(c));
        return json({ ok: true, updated: c.updated });
      }
      if (p === '/api/admin/restore' && m === 'POST') {
        const prev = await env.CZ.get('catalog-backup');
        if (!prev) return json({ error: 'no backup' }, 404);
        await env.CZ.put('catalog', prev);
        return json({ ok: true });
      }
      if (p === '/api/admin/image' && m === 'POST') {
        const type = req.headers.get('content-type') || '';
        if (!/^image\/(webp|png|jpeg)$/.test(type)) return json({ error: 'type' }, 400);
        const buf = await req.arrayBuffer();
        if (buf.byteLength > 400000) return json({ error: 'too big' }, 413);
        const key = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        await env.CZ.put('img:' + key, buf, { metadata: { type } });
        return json({ url: '/u/' + key });
      }
      if (p === '/api/admin/orders' && m === 'GET') return json(await readOrders(env));
      if (p === '/api/admin/order' && m === 'POST') {
        const b = await req.json();
        const orders = await readOrders(env);
        const o = orders.find((x) => x.id === b.id);
        if (!o) return json({ error: 'not found' }, 404);
        if (b.delete) orders.splice(orders.indexOf(o), 1);
        else o.status = b.status === 'done' ? 'done' : 'new';
        await env.CZ.put('orders', JSON.stringify(orders));
        return json({ ok: true });
      }
      return json({ error: 'not found' }, 404);
    }

    // ---------- pages & static files from the repo ----------
    if (m !== 'GET' && m !== 'HEAD') return new Response('Method not allowed', { status: 405 });
    if (p === '/' || p === '/index.html') return fromRepo(env, '/index.html', 120);
    if (p === '/admin' || p === '/admin/') return fromRepo(env, '/admin.html', 120);
    if (/^\/(app\.js|admin\.js|catalog\.json)$/.test(p)) return fromRepo(env, p, 120);
    if (/^\/img\/[\w.-]+\.(webp|png|jpg|svg)$/.test(p)) return fromRepo(env, p, 86400);
    return new Response('Not found', { status: 404 });
  },
};

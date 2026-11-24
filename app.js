/* Card Zone store: catalog, cart, and WhatsApp checkout. Motion lives in the inline Component (index.html). */
(function () {
  'use strict';
  var WA = '218912304055';
  var CART_KEY = 'cz-cart-v1';
  var NAME_KEY = 'cz-name-v1';
  var root = document.querySelector('.a-root');
  var grid = document.getElementById('grid');
  var chips = document.getElementById('chips');
  var clawTpl = document.getElementById('tpl-claw');
  var state = { catalog: { cats: [], brands: [] }, cat: 'all', focus: '' };
  var cart = load(CART_KEY, {});

  function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v || d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(n) { return (Math.round(n * 100) / 100).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' د.ل'; }
  function waUrl(text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); }
  function openWa(text) {
    var u = waUrl(text);
    var w = window.open(u, '_blank');
    if (!w) location.href = u;
  }

  // ---------- catalog ----------
  function itemIndex() {
    var map = {};
    state.catalog.brands.forEach(function (b) {
      (b.items || []).forEach(function (it) { map[it.id] = { item: it, brand: b }; });
    });
    return map;
  }
  function catLabel(id) {
    var c = state.catalog.cats.filter(function (x) { return x.id === id; })[0];
    return c ? c.label : '';
  }
  function visibleBrands() {
    var list = state.catalog.brands.filter(function (b) {
      return !b.hidden && (b.items || []).some(function (i) { return !i.hidden; }) && (state.cat === 'all' || b.cat === state.cat);
    });
    if (state.focus) {
      list = list.filter(function (b) { return b.id === state.focus; }).concat(list.filter(function (b) { return b.id !== state.focus; }));
    }
    return list;
  }

  var FLIP_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg>';

  function cardHtml(b, i) {
    var items = (b.items || []).filter(function (x) { return !x.hidden; });
    var min = Math.min.apply(null, items.map(function (x) { return +x.price || 0; }));
    var rows = items.map(function (it) {
      return '<button class="a-den' + (it.out ? ' off' : '') + '" data-add="' + esc(it.id) + '" aria-label="أضف ' + esc(it.label) + '">' +
        '<span>' + esc(it.label) + (it.out ? ' (نفد)' : '') + '</span><b>' + money(+it.price) + '</b><i>+</i></button>';
    }).join('');
    var idx = (i < 9 ? '0' : '') + (i + 1);
    var tone = /^[gocpy]$/.test(b.tone) ? b.tone : 'g';
    return '<div class="a-flip a-t-' + tone + (state.focus === b.id ? ' a-hit' : '') + '" data-b="' + esc(b.id) + '" style="--rows:' + items.length + '">' +
      '<div class="a-hitw"><div class="a-fin">' +
        '<div class="a-face a-front">' +
          '<img class="a-wm" src="' + esc(b.img) + '" alt="" aria-hidden="true" draggable="false">' +
          '<div class="a-bar"></div>' +
          '<div class="a-cp1"><span class="a-idx">' + idx + '</span><span style="font-size:13px;font-weight:900;color:#050505;background:#ffffff;border-radius:999px;padding:3px 12px">' + esc(catLabel(b.cat)) + '</span></div>' +
          '<div class="a-cp2"><img class="a-tile" src="' + esc(b.img) + '" alt="' + esc(b.ar) + '" loading="lazy" draggable="false">' +
            '<div class="a-brand">' + esc(b.name) + '</div><div class="a-sub">' + esc(b.ar) + ' · ' + items.length + ' فئات</div></div>' +
          '<div class="a-cp3"><div class="a-from"><small>ابتداءً من</small><span class="a-price">' + money(min) + '</span></div>' +
            '<span class="a-flipic">' + FLIP_ICON + 'اقلبه</span></div>' +
        '</div>' +
        '<div class="a-face a-back">' +
          '<div class="a-bk-top"><img src="' + esc(b.img) + '" alt="" draggable="false"><div><div class="a-bk-name">' + esc(b.ar) + '</div><small>اختر الفئة واضغط +</small></div></div>' +
          '<div class="a-dl">' + rows + '</div>' +
        '</div>' +
      '</div>' + (clawTpl ? clawTpl.innerHTML : '') + '</div>' +
    '</div>';
  }

  function renderChips() {
    var all = [{ id: 'all', label: 'الكل' }].concat(state.catalog.cats);
    chips.innerHTML = all.map(function (c) {
      return '<button class="a-chip' + (c.id === state.cat ? ' on' : '') + '" data-cat="' + esc(c.id) + '">' + esc(c.label) + '</button>';
    }).join('');
  }
  function renderGrid() {
    var list = visibleBrands();
    grid.innerHTML = list.length ? list.map(cardHtml).join('') : '<div class="a-empty">لا توجد كروت في هذا القسم حاليًا.</div>';
  }
  function render() { renderChips(); renderGrid(); renderCart(); }

  // ---------- cart ----------
  var scrim = document.createElement('div');
  scrim.className = 'cz-scrim';
  var drawer = document.createElement('aside');
  drawer.className = 'cz-drawer';
  drawer.setAttribute('aria-label', 'السلة');
  drawer.innerHTML =
    '<div class="cz-dh"><h3>سلّتك</h3><button class="cz-x" data-close aria-label="إغلاق">✕</button></div>' +
    '<div class="cz-list" id="czList"></div>' +
    '<div class="cz-foot">' +
      '<div class="cz-total"><span>الإجمالي</span><b id="czTotal">0 د.ل</b></div>' +
      '<input class="cz-in" id="czName" placeholder="اسمك" autocomplete="name">' +
      '<textarea class="cz-in" id="czNote" placeholder="ملاحظة (اختياري)"></textarea>' +
      '<button class="a-btn a-btn-p cz-send" id="czSend">أرسل الطلب على واتساب</button>' +
      '<div class="cz-note">يفتح واتساب برسالة فيها طلبك جاهزة، اضغط إرسال ونتواصل معك للدفع وتسليم الكود.</div>' +
    '</div>';
  var fab = document.createElement('button');
  fab.className = 'cz-fab';
  fab.innerHTML = 'السلة <em id="czFabN">0</em>';
  document.body.appendChild(scrim);
  document.body.appendChild(drawer);
  document.body.appendChild(fab);
  var nameIn = drawer.querySelector('#czName');
  nameIn.value = load(NAME_KEY, '') || '';

  function cartLines() {
    var idx = itemIndex();
    return Object.keys(cart).map(function (id) {
      var hit = idx[id];
      return hit && cart[id] > 0 ? { id: id, qty: cart[id], item: hit.item, brand: hit.brand } : null;
    }).filter(Boolean);
  }
  function cartCount() { return cartLines().reduce(function (a, l) { return a + l.qty; }, 0); }
  function cartTotal() { return cartLines().reduce(function (a, l) { return a + l.qty * (+l.item.price); }, 0); }

  function renderCart() {
    // drop items that no longer exist in the catalog
    var idx = itemIndex();
    Object.keys(cart).forEach(function (id) { if (!idx[id] || cart[id] <= 0) delete cart[id]; });
    save(CART_KEY, cart);
    var n = cartCount();
    document.getElementById('cartCount').textContent = n;
    document.getElementById('czFabN').textContent = n;
    fab.classList.toggle('on', n > 0 && !drawer.classList.contains('on'));
    var lines = cartLines();
    drawer.querySelector('#czList').innerHTML = lines.length ? lines.map(function (l) {
      return '<div class="cz-row"><img src="' + esc(l.brand.img) + '" alt="">' +
        '<div class="t"><b>' + esc(l.item.label) + '</b><span>' + money(+l.item.price) + '</span></div>' +
        '<div class="cz-q"><button data-dec="' + esc(l.id) + '" aria-label="إنقاص">−</button><em>' + l.qty + '</em><button data-inc="' + esc(l.id) + '" aria-label="زيادة">+</button></div></div>';
    }).join('') : '<div class="cz-emptycart">السلة فاضية. اضغط على أي كرت واختر الفئة.</div>';
    drawer.querySelector('#czTotal').textContent = money(cartTotal());
    drawer.querySelector('#czSend').disabled = !lines.length;
  }

  var badgeN = 0;
  function bump() {
    var b = document.getElementById('cartCount');
    badgeN += 1;
    b.classList.remove('a-bumpA', 'a-bumpB');
    void b.offsetWidth;
    b.classList.add(badgeN % 2 ? 'a-bumpA' : 'a-bumpB');
  }
  var toastT;
  function toast(text) {
    var box = document.getElementById('toastBox');
    box.innerHTML = '<div class="a-toast">' + esc(text) + '</div>';
    clearTimeout(toastT);
    toastT = setTimeout(function () { box.innerHTML = ''; }, 1900);
  }
  function add(id) {
    var hit = itemIndex()[id];
    if (!hit || hit.item.out) return;
    cart[id] = (cart[id] || 0) + 1;
    renderCart();
    bump();
    toast('تمت إضافة ' + hit.item.label + ' للسلة');
  }
  function openCart() { drawer.classList.add('on'); scrim.classList.add('on'); fab.classList.remove('on'); }
  function closeCart() { drawer.classList.remove('on'); scrim.classList.remove('on'); renderCart(); }

  // ---------- checkout ----------
  function orderText(id, name, note, lines, total) {
    var t = 'طلب جديد من كارد زون\n';
    if (id) t += 'رقم الطلب: ' + id + '\n';
    t += 'الاسم: ' + name + '\n\n';
    lines.forEach(function (l) { t += '• ' + l.label + ' × ' + l.qty + ' = ' + money(l.price * l.qty) + '\n'; });
    t += '\nالإجمالي: ' + money(total);
    if (note) t += '\nملاحظة: ' + note;
    return t;
  }
  function send() {
    var name = nameIn.value.trim();
    if (!name) { nameIn.focus(); nameIn.style.borderColor = '#FF3B6B'; return; }
    nameIn.style.borderColor = '';
    save(NAME_KEY, name);
    var note = drawer.querySelector('#czNote').value.trim();
    var lines = cartLines().map(function (l) { return { id: l.id, label: l.item.label, price: +l.item.price, qty: l.qty }; });
    var btn = drawer.querySelector('#czSend');
    btn.disabled = true;
    btn.textContent = 'جاري التجهيز...';
    // open the WhatsApp window right away so mobile browsers do not block it
    var win = window.open('about:blank', '_blank');
    var finish = function (id, srvLines, total) {
      var text = orderText(id, name, note, srvLines || lines, total != null ? total : lines.reduce(function (a, l) { return a + l.price * l.qty; }, 0));
      var u = waUrl(text);
      if (win && !win.closed) { try { win.location.href = u; } catch (e) { location.href = u; } } else { location.href = u; }
      cart = {};
      drawer.querySelector('#czNote').value = '';
      btn.textContent = 'أرسل الطلب على واتساب';
      closeCart();
      toast('تم تجهيز طلبك على واتساب');
    };
    fetch('/api/order', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: name, note: note, items: lines.map(function (l) { return { id: l.id, qty: l.qty }; }) })
    }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { d && d.id ? finish(d.id, d.lines, d.total) : finish('', null, null); })
      .catch(function () { finish('', null, null); });
  }

  // ---------- events ----------
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var a;
    if ((a = t.closest('[data-add]'))) { add(a.getAttribute('data-add')); return; }
    if ((a = t.closest('[data-cat]'))) { state.cat = a.getAttribute('data-cat'); state.focus = ''; render(); return; }
    if ((a = t.closest('[data-inc]'))) { cart[a.getAttribute('data-inc')] += 1; renderCart(); return; }
    if ((a = t.closest('[data-dec]'))) { var id = a.getAttribute('data-dec'); cart[id] -= 1; renderCart(); return; }
    if (t.closest('#cartBtn') || t.closest('.cz-fab')) { openCart(); return; }
    if (t.closest('[data-close]') || t === scrim) { closeCart(); return; }
    if (t.closest('#czSend')) { send(); return; }
    if ((a = t.closest('[data-wa]'))) {
      e.preventDefault();
      openWa(a.getAttribute('data-wa') === 'special' ? 'مرحبا كارد زون، أبغى أطلب كرت مش موجود في الموقع: ' : 'مرحبا كارد زون 👋');
      return;
    }
    if ((a = t.closest('[data-go]'))) {
      var key = a.getAttribute('data-go');
      var exists = state.catalog.brands.some(function (b) { return b.id === key && !b.hidden; });
      if (exists) {
        state.cat = 'all';
        state.focus = key;
        render();
      } else {
        e.preventDefault();
        var label = (a.parentNode.querySelector('b') || {}).textContent || key;
        openWa('مرحبا كارد زون، هل عندكم كرت ' + label + '؟');
      }
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCart(); });

  function boot(data) {
    if (data && data.brands) state.catalog = data;
    render();
  }
  fetch('/api/catalog', { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw 0; return r.json(); })
    .catch(function () { return fetch('/catalog.json').then(function (r) { return r.json(); }); })
    .then(boot)
    .catch(function () { boot(null); });

  // start the motion engine (tiger, paw strike, claws, sparks)
  try { new Component().componentDidMount(); } catch (e) { if (window.console) console.error(e); }
})();

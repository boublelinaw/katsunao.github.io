/* KatsuNao — 開場動畫：黃昏森林 → 拾起書本 → 書封與計時器 → 翻開、火花與燃燒的書頁 */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ════════════════ 粒子特效（落葉、螢火蟲、餘燼、火花） ════════════════ */
  function createFX(canvas) {
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, DPR = 1;
    const parts = [];
    const cfg = { leaves: 0, fireflies: 0, embers: 0 };
    let running = true;

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    window.addEventListener('resize', resize);
    resize();

    const LEAF_COLORS = ['#c8642f', '#e0a040', '#9b4a2a', '#7fa35b', '#b07a3c', '#d9803a'];

    function spawn(type, extra) {
      const p = { type, age: 0 };
      if (type === 'leaf') {
        Object.assign(p, {
          x: Math.random() * W * 1.1 - W * 0.05, y: -12,
          vx: (Math.random() - 0.3) * 0.6, vy: 0.5 + Math.random() * 0.9,
          rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.06,
          s: 4 + Math.random() * 5, c: LEAF_COLORS[(Math.random() * LEAF_COLORS.length) | 0],
          sway: Math.random() * 6.28, life: 900,
        });
      } else if (type === 'firefly') {
        Object.assign(p, {
          x: Math.random() * W, y: H * (0.3 + Math.random() * 0.65),
          vx: 0, vy: 0, ph: Math.random() * 6.28, s: 1.4 + Math.random() * 1.6,
          life: 600 + Math.random() * 600, c: Math.random() < 0.6 ? '233,255,154' : '255,216,107',
        });
      } else if (type === 'ember') {
        Object.assign(p, {
          x: Math.random() * W, y: H + 6,
          vx: (Math.random() - 0.5) * 0.4, vy: -(0.5 + Math.random() * 1.3),
          s: 0.8 + Math.random() * 1.8, life: 220 + Math.random() * 260, ph: Math.random() * 6.28,
        });
      } else if (type === 'spark') {
        const a = Math.random() * Math.PI * 2;
        const sp = (extra.power || 1) * (2 + Math.random() * 7);
        Object.assign(p, {
          x: extra.x, y: extra.y, px: extra.x, py: extra.y,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1.2,
          life: 40 + Math.random() * 55, s: 1 + Math.random() * 1.6,
        });
      }
      parts.push(p);
    }

    function burst(x, y, n, power) {
      for (let i = 0; i < n; i++) spawn('spark', { x, y, power });
    }

    function count(type) {
      let n = 0;
      for (const p of parts) if (p.type === type) n++;
      return n;
    }

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      if (Math.random() < cfg.leaves) spawn('leaf');
      if (count('firefly') < cfg.fireflies && Math.random() < 0.15) spawn('firefly');
      if (Math.random() < cfg.embers) spawn('ember');

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.age++;
        if (p.age > p.life || p.y > H + 20 || p.x < -40 || p.x > W + 40 || p.y < -60) {
          parts.splice(i, 1);
          continue;
        }
        if (p.type === 'leaf') {
          p.sway += 0.03;
          p.x += p.vx + Math.sin(p.sway) * 0.7;
          p.y += p.vy;
          p.rot += p.vr;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.globalAlpha = clamp(1 - cfg.dark * 0.9, 0.12, 0.9);
          ctx.fillStyle = p.c;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.s, p.s * 0.45, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (p.type === 'firefly') {
          p.ph += 0.05;
          p.vx += (Math.random() - 0.5) * 0.08; p.vy += (Math.random() - 0.5) * 0.08;
          p.vx *= 0.96; p.vy *= 0.96;
          p.x += p.vx; p.y += p.vy;
          const fade = Math.min(1, p.age / 60, (p.life - p.age) / 60);
          const a = (0.45 + 0.55 * Math.sin(p.ph)) * fade;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.s * 7);
          g.addColorStop(0, `rgba(${p.c},${0.9 * a})`);
          g.addColorStop(1, `rgba(${p.c},0)`);
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.s * 7, 0, Math.PI * 2); ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
        } else if (p.type === 'ember') {
          p.ph += 0.06;
          p.x += p.vx + Math.sin(p.ph) * 0.35;
          p.y += p.vy;
          const t = p.age / p.life;
          const a = Math.min(1, p.age / 30) * (1 - t);
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = `rgba(255,${(150 - t * 80) | 0},${(60 - t * 40) | 0},${a})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(255,140,60,${a * 0.08})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.s * 3, 0, Math.PI * 2); ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
        } else if (p.type === 'spark') {
          p.px = p.x; p.py = p.y;
          p.vx *= 0.975; p.vy = p.vy * 0.975 + 0.07;
          p.x += p.vx; p.y += p.vy;
          const t = p.age / p.life;
          const col = t < 0.25 ? '255,247,214' : t < 0.6 ? '255,200,90' : '255,110,40';
          ctx.globalCompositeOperation = 'lighter';
          ctx.strokeStyle = `rgba(${col},${1 - t})`;
          ctx.lineWidth = p.s;
          ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
          ctx.globalCompositeOperation = 'source-over';
        }
      }
      requestAnimationFrame(frame);
    }
    cfg.dark = 0;
    requestAnimationFrame(frame);

    return {
      cfg, burst, resize,
      stop() { running = false; ctx.clearRect(0, 0, W, H); parts.length = 0; },
      start() { if (!running) { running = true; resize(); requestAnimationFrame(frame); } },
    };
  }

  /* ════════════════ 交往計時器（向上翻動的數字） ════════════════ */
  const UNITS = { zh: ['天', '時', '分', '秒'], en: ['D', 'H', 'M', 'S'], none: ['', '', '', ''] };

  function parseStart(str) {
    const m = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/.exec(String(str || '').trim());
    if (!m) return null;
    return Date.parse(`${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:00+08:00`);
  }

  function createCounter(el, cfg) {
    const start = parseStart(cfg.start);
    if (!cfg.enabled || start == null) { el.hidden = true; return { stop() {} }; }
    const units = UNITS[cfg.units] || UNITS.zh;
    el.classList.toggle('no-units', cfg.units === 'none');
    el.innerHTML = (cfg.caption ? `<p class="counter-cap">${escapeHTML(cfg.caption)}</p>` : '') +
      `<div class="cnt-row">${['d', 'h', 'm', 's'].map((k, i) =>
        `<span class="cnt-group cnt-${k}"><span class="cnt-digits"></span>` +
        (units[i] ? `<span class="cnt-unit">${units[i]}</span>` : '') + '</span>').join('')}</div>`;
    const groups = ['d', 'h', 'm', 's'].map((k) => el.querySelector(`.cnt-${k} .cnt-digits`));
    const reels = [[], [], [], []];

    function makeDigit() {
      const d = document.createElement('span');
      d.className = 'dg';
      d.innerHTML = `<span class="dg-reel">${'01234567890'.split('').map((n) => `<b>${n}</b>`).join('')}</span>`;
      d._val = 0;
      return d;
    }

    function setDigit(d, v) {
      if (d._val === v) return;
      const reel = d.firstChild;
      if (v === 0 && d._val === 9) {
        reel.style.transform = 'translateY(-11.5em)';
        setTimeout(() => {
          reel.style.transition = 'none';
          reel.style.transform = 'translateY(0)';
          void reel.offsetWidth;
          reel.style.transition = '';
        }, 520);
      } else {
        reel.style.transform = `translateY(${-v * 1.15}em)`;
      }
      d._val = v;
    }

    function render() {
      let s = Math.max(0, Math.floor((Date.now() - start) / 1000));
      const vals = [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
      vals.forEach((v, gi) => {
        const str = gi === 0 ? String(v) : String(v).padStart(2, '0');
        const reel = reels[gi];
        while (reel.length < str.length) { const d = makeDigit(); groups[gi].prepend(d); reel.unshift(d); }
        while (reel.length > str.length) { reel.shift().remove(); }
        str.split('').forEach((ch, i) => setDigit(reel[i], +ch));
      });
    }
    render();
    const timer = setInterval(render, 1000);
    return { stop() { clearInterval(timer); } };
  }

  function escapeHTML(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ════════════════ 開場流程 ════════════════ */
  const WALK_MS = reduceMotion ? 2500 : 7500;
  let fx, S, phase = 'idle', t0 = 0, dark = 0, layers = [], timers = [], counter, opts;

  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  function buildForest() {
    const A = window.KN_ART;
    const defs = [
      { seed: 11, count: 26, color: '#6b4a5a', hMin: 160, hMax: 260, depth: 0.25, pineRatio: 0.7, ground: 40 },
      { seed: 23, count: 20, color: '#3e3341', hMin: 230, hMax: 360, depth: 0.45, pineRatio: 0.65, ground: 30 },
      { seed: 37, count: 14, color: '#22252a', hMin: 320, hMax: 470, depth: 0.8, gap: 120, ground: 26 },
      { seed: 51, count: 9, color: '#121614', hMin: 470, hMax: 600, depth: 1.5, gap: 190, wRatio: 0.48, ground: 22 },
    ];
    const forest = $('forest');
    forest.innerHTML = '';
    layers = defs.map((d, i) => {
      const el = document.createElement('div');
      el.className = `layer layer-${i}`;
      el.innerHTML = A.forestLayer(d);
      el._depth = d.depth;
      forest.appendChild(el);
      return el;
    });
    const path = document.createElement('div');
    path.className = 'trail';
    forest.appendChild(path);

    $('egg-wolf').innerHTML = `<div class="trunk"></div><div class="peek">${A.WOLF}</div>`;
    $('egg-rabbit').innerHTML = `<div class="bush"><svg viewBox="0 0 120 64" preserveAspectRatio="none"><g fill="#121614"><circle cx="22" cy="44" r="22"/><circle cx="52" cy="32" r="28"/><circle cx="86" cy="40" r="24"/><circle cx="108" cy="50" r="16"/><rect x="0" y="48" width="120" height="16"/></g><g fill="#1b231c"><circle cx="46" cy="22" r="6"/><circle cx="80" cy="28" r="5"/></g></svg></div><div class="peek">${A.RABBIT}</div>`;
    $('book-small').innerHTML = A.BOOK_SMALL;
    document.querySelectorAll('.cover-ornament').forEach((o) => { o.innerHTML = A.ORNAMENT; });
  }

  function fillCover() {
    const c = S.cover || {};
    $('cover-title').textContent = c.title || 'KatsuNao';
    $('cover-sub').textContent = c.subtitle || '';
    $('cover-quote').innerHTML = escapeHTML(c.quote || '').replace(/([，、,])/g, '$1<wbr>');
    $('btn-open').textContent = c.open_text || '翻開這本書';
    $('hint').textContent = (S.forest && S.forest.hint) || '輕觸書本';
  }

  function setDark(v) {
    dark = v;
    document.documentElement.style.setProperty('--dark', v.toFixed(3));
    if (fx) fx.cfg.dark = v;
  }

  function loop(now) {
    if (phase === 'done') return;
    if (phase === 'forest') {
      const p = clamp((now - t0) / WALK_MS, 0, 1);
      const e = easeInOut(p);
      layers.forEach((l) => {
        const s = 1 + e * l._depth * 0.55;
        l.style.transform = `translate3d(0, ${e * l._depth * 2}vh, 0) scale(${s.toFixed(4)})`;
      });
      setDark(0.04 + 0.56 * e);
      fx.cfg.leaves = 0.16 * (1 - e * 0.7);
      fx.cfg.fireflies = Math.round(e * 22);
    }
    requestAnimationFrame(loop);
  }

  function showQuote(text, ms) {
    const q = $('forest-quote');
    q.innerHTML = escapeHTML(text).replace(/([，、,])/g, '$1<wbr>');
    q.classList.add('show');
    later(() => q.classList.remove('show'), ms);
  }

  function start(data, options) {
    S = data.settings || {};
    opts = options || {};
    fx = createFX($('fx'));
    buildForest();
    fillCover();
    phase = 'forest';
    t0 = performance.now();
    requestAnimationFrame(loop);

    const quotes = (S.forest && S.forest.quotes) || [];
    const slot = WALK_MS / Math.max(quotes.length + 1, 2);
    quotes.forEach((q, i) => later(() => phase === 'forest' && showQuote(q, slot * 0.8), 900 + i * slot));
    later(() => $('egg-wolf').classList.add('peeking'), WALK_MS * 0.32);
    later(() => $('egg-rabbit').classList.add('peeking'), WALK_MS * 0.5);
    later(() => $('clearing').classList.add('show'), WALK_MS * 0.82);
    later(() => $('hint').classList.add('show'), WALK_MS + 600);

    const skipAfter = Number(S.forest && S.forest.skip_after);
    later(() => { if (phase === 'forest' || phase === 'pickup') $('skip').classList.add('show'); },
      (isFinite(skipAfter) ? skipAfter : 5) * 1000);

    $('book-small').addEventListener('click', pickup);
    $('skip').addEventListener('click', skip);
    $('btn-open').addEventListener('click', openBook);
  }

  function animateDark(to, ms) {
    const from = dark, s = performance.now();
    (function step(now) {
      const t = clamp((now - s) / ms, 0, 1);
      setDark(from + (to - from) * easeInOut(t));
      if (t < 1) requestAnimationFrame(step);
    })(s);
  }

  function pickup() {
    if (phase !== 'forest') return;
    phase = 'pickup';
    const intro = $('intro');
    intro.classList.add('picked');
    animateDark(0.97, 1400);
    fx.cfg.leaves = 0;
    fx.cfg.fireflies = 8;
    later(showCover, 900);
  }

  function showCover() {
    phase = 'cover';
    $('intro').classList.add('cover-on');
    $('skip').classList.remove('show');
    fx.cfg.embers = 0.18;
    counter = createCounter($('counter'), S.counter || {});
  }

  function skip() {
    if (phase !== 'forest' && phase !== 'pickup') return;
    timers.forEach(clearTimeout);
    timers = [];
    const intro = $('intro');
    intro.classList.add('instant', 'picked');
    $('forest-quote').classList.remove('show');
    setDark(0.97);
    fx.cfg.leaves = 0;
    fx.cfg.fireflies = 8;
    showCover();
    requestAnimationFrame(() => requestAnimationFrame(() => intro.classList.remove('instant')));
  }

  function openBook() {
    if (phase !== 'cover') return;
    phase = 'open';
    const intro = $('intro');
    const page = $('page-scroll');
    if (opts.renderHome) opts.renderHome(page, finish);
    intro.classList.add('opening');
    const r = $('book').getBoundingClientRect();
    later(() => fx.burst(r.left + 6, r.top + r.height * 0.5, 90, 1), 250);
    later(() => fx.burst(r.left + r.width * 0.5, r.top + r.height * 0.15, 60, 0.8), 450);
    later(() => fx.burst(r.right - 6, r.top + r.height * 0.75, 60, 0.8), 650);
    later(() => { intro.classList.add('expanded'); fx.cfg.embers = 0.3; }, 1100);
  }

  function finish() {
    if (phase !== 'open') return;
    phase = 'leaving';
    const intro = $('intro');
    fx.burst(window.innerWidth / 2, window.innerHeight / 2, 180, 1.4);
    intro.classList.add('leaving');
    later(() => {
      phase = 'done';
      if (counter) counter.stop();
      fx.stop();
      intro.hidden = true;
      if (opts.onDone) opts.onDone();
    }, 900);
  }

  window.KN_INTRO = { start, createFX, escapeHTML };
})();

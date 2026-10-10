/* KatsuNao — 插畫素材（全部用程式繪製的 SVG） */
(function () {
  'use strict';

  const WOLF = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M19 47 L27 9 L46 31 Z" fill="#b5a888"/>
  <path d="M81 47 L73 9 L54 31 Z" fill="#b5a888"/>
  <path d="M25 38 L29 18 L39 31 Z" fill="#e8895a" opacity=".75"/>
  <path d="M75 38 L71 18 L61 31 Z" fill="#e8895a" opacity=".75"/>
  <path d="M50 91 C40 87 30 79 24 69 L13 57 L24 52 L17 42 C24 32 36 26 50 26 C64 26 76 32 83 42 L76 52 L87 57 L76 69 C70 79 60 87 50 91 Z" fill="#d8cdae"/>
  <path d="M41 29 L45 18 L50 27 L55 17 L59 29 Z" fill="#d8cdae"/>
  <path d="M50 91 C43 87 37 81 35 73 C38 65 44 61 50 61 C56 61 62 65 65 73 C63 81 57 87 50 91 Z" fill="#f4eedb"/>
  <path d="M31 50 Q38 44.5 45 50 Q38 54 31 50 Z" fill="#e0482a"/>
  <path d="M69 50 Q62 44.5 55 50 Q62 54 69 50 Z" fill="#e0482a"/>
  <circle cx="39" cy="49.6" r="1.9" fill="#2b1a14"/>
  <circle cx="61" cy="49.6" r="1.9" fill="#2b1a14"/>
  <path d="M29 42.5 L45 46.5" stroke="#6e604a" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M71 42.5 L55 46.5" stroke="#6e604a" stroke-width="3.2" stroke-linecap="round"/>
  <ellipse cx="50" cy="65" rx="6.2" ry="4.6" fill="#2b2420"/>
  <path d="M50 69 L50 74.5 M50 74.5 Q45.5 78.5 42 75.5 M50 74.5 Q54.5 78.5 58 75.5" stroke="#2b2420" stroke-width="1.8" fill="none" stroke-linecap="round"/>
</svg>`;

  const RABBIT = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M33 36 C15 36 7 60 13 79 C17 86 26 83 27 74 C29 59 34 47 40 39 Z" fill="#b48963"/>
  <path d="M67 36 C85 36 93 60 87 79 C83 86 74 83 73 74 C71 59 66 47 60 39 Z" fill="#b48963"/>
  <path d="M30 44 C20 47 16 62 19 75 C21 79 24 77 24.5 72 C25.5 61 28 52 33 45 Z" fill="#e6bba2"/>
  <path d="M70 44 C80 47 84 62 81 75 C79 79 76 77 75.5 72 C74.5 61 72 52 67 45 Z" fill="#e6bba2"/>
  <ellipse cx="50" cy="57" rx="28" ry="26" fill="#cba47c"/>
  <path d="M43 32 Q47 26 50 31 Q53 25 57 32" fill="#cba47c"/>
  <path d="M55 31 Q65 21 71 27 Q65 36 55 31 Z" fill="#7fa35b"/>
  <path d="M56 31 Q63 27 69 27.5" stroke="#5e7d42" stroke-width="1" fill="none"/>
  <ellipse cx="50" cy="67" rx="12.5" ry="9.5" fill="#f5eadb"/>
  <circle cx="38.5" cy="55" r="4.4" fill="#3a2a1e"/>
  <circle cx="61.5" cy="55" r="4.4" fill="#3a2a1e"/>
  <circle cx="40" cy="53.4" r="1.5" fill="#fff"/>
  <circle cx="63" cy="53.4" r="1.5" fill="#fff"/>
  <ellipse cx="32" cy="63" rx="4.6" ry="2.6" fill="#e89a8a" opacity=".55"/>
  <ellipse cx="68" cy="63" rx="4.6" ry="2.6" fill="#e89a8a" opacity=".55"/>
  <path d="M47 62.5 L53 62.5 L50 66 Z" fill="#d98a8a"/>
  <path d="M50 66 Q47 69.5 44.5 68 M50 66 Q53 69.5 55.5 68" stroke="#8a5e45" stroke-width="1.5" fill="none" stroke-linecap="round"/>
</svg>`;

  const BOOK_SMALL = `
<svg viewBox="0 0 140 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="bkc" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#2c5240"/><stop offset="1" stop-color="#173024"/>
    </linearGradient>
  </defs>
  <path d="M14 30 L84 14 L128 34 L58 54 Z" fill="#f1e2c2"/>
  <path d="M14 30 L14 44 L58 68 L58 54 Z" fill="#e4d0a6"/>
  <path d="M58 54 L58 68 L128 48 L128 34 Z" fill="#d9c18f"/>
  <path d="M12 26 L84 9 L130 30 L58 50 Z" fill="url(#bkc)"/>
  <path d="M12 26 L12 30 L58 54 L58 50 Z" fill="#10231a"/>
  <path d="M24 26.5 L83 13 L118 29.5 L59 45 Z" fill="none" stroke="#e7b766" stroke-width="1.3" opacity=".9"/>
  <circle cx="71" cy="29" r="5" fill="none" stroke="#ffb35c" stroke-width="1.2"/>
  <path d="M71 22 L72.2 27.6 L78 29 L72.2 30.4 L71 36 L69.8 30.4 L64 29 L69.8 27.6 Z" fill="#ffcf7a"/>
</svg>`;

  const ORNAMENT = `
<svg viewBox="0 0 240 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M10 20 H95 M145 20 H230" stroke="currentColor" stroke-width="1" opacity=".7"/>
  <path d="M30 20 Q40 10 50 20 Q40 30 30 20 Z M190 20 Q200 10 210 20 Q200 30 190 20 Z" fill="currentColor" opacity=".55"/>
  <path d="M62 20 Q70 13 78 20 Q70 27 62 20 Z M162 20 Q170 13 178 20 Q170 27 162 20 Z" fill="currentColor" opacity=".4"/>
  <path d="M120 6 L123 17 L134 20 L123 23 L120 34 L117 23 L106 20 L117 17 Z" fill="#ffb35c"/>
  <circle cx="120" cy="20" r="2.4" fill="#fff4d6"/>
</svg>`;

  // ───── 森林圖層產生器 ─────
  function rng(seed) {
    let s = seed >>> 0;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }

  function pine(x, h, w, color) {
    const tiers = 4;
    let d = '';
    for (let i = 0; i < tiers; i++) {
      const top = 600 - h + (h * 0.78) * (i / tiers);
      const bot = top + h * 0.34;
      const ww = w * (0.45 + 0.55 * (i + 1) / tiers);
      d += `M${x} ${top} L${x + ww / 2} ${bot} L${x - ww / 2} ${bot} Z `;
    }
    return `<rect x="${x - w * 0.05}" y="${600 - h * 0.25}" width="${w * 0.1}" height="${h * 0.25}" fill="${color}"/><path d="${d}" fill="${color}"/>`;
  }

  function broadleaf(x, h, w, color, r) {
    let s = `<path d="M${x - w * 0.05} 600 L${x - w * 0.03} ${600 - h * 0.55} L${x + w * 0.03} ${600 - h * 0.55} L${x + w * 0.05} 600 Z" fill="${color}"/>`;
    const cy = 600 - h * 0.66;
    for (let i = 0; i < 6; i++) {
      const cx = x + (r() - 0.5) * w * 0.7;
      const yy = cy + (r() - 0.5) * h * 0.38;
      s += `<circle cx="${cx.toFixed(1)}" cy="${yy.toFixed(1)}" r="${(w * (0.22 + r() * 0.16)).toFixed(1)}" fill="${color}"/>`;
    }
    return s;
  }

  function forestLayer(opts) {
    const r = rng(opts.seed);
    let trees = '';
    for (let i = 0; i < opts.count; i++) {
      let x = (i + r() * 0.8) * (1000 / opts.count);
      if (opts.gap && x > 500 - opts.gap && x < 500 + opts.gap) {
        x = x < 500 ? 500 - opts.gap - r() * 60 : 500 + opts.gap + r() * 60;
      }
      const h = opts.hMin + r() * (opts.hMax - opts.hMin);
      const w = h * (opts.wRatio || 0.42);
      trees += (r() < (opts.pineRatio ?? 0.6)) ? pine(x, h, w, opts.color) : broadleaf(x, h, w, opts.color, r);
    }
    const ground = `<rect x="0" y="${600 - (opts.ground || 18)}" width="1000" height="${opts.ground || 18}" fill="${opts.color}"/>`;
    return `<svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${trees}${ground}</svg>`;
  }

  const FAVICON_FALLBACK = '';

  window.KN_ART = { WOLF, RABBIT, BOOK_SMALL, ORNAMENT, forestLayer, FAVICON_FALLBACK };
})();

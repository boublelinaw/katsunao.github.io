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

  // 古老魔法書（森林中央那本）
  const BOOK_SMALL = `
<svg viewBox="0 0 160 112" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="bkc" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#2d5644"/><stop offset=".55" stop-color="#173326"/><stop offset="1" stop-color="#0c1d15"/>
    </linearGradient>
    <linearGradient id="bkg" x1="0" x2="1">
      <stop offset="0" stop-color="#a87a2c"/><stop offset=".5" stop-color="#f6dc8f"/><stop offset="1" stop-color="#a87a2c"/>
    </linearGradient>
  </defs>
  <path d="M16 36 L94 16 L146 38 L66 60 Z" fill="#f1e2c2"/>
  <path d="M16 36 L16 52 L66 78 L66 60 Z" fill="#e4d0a6"/>
  <path d="M66 60 L66 78 L146 54 L146 38 Z" fill="#d6bd88"/>
  <path d="M66 63 L146 41 M66 67 L146 45 M66 71 L146 49" stroke="#c4a771" stroke-width=".6"/>
  <path d="M13 31 L94 10 L149 34 L66 56 Z" fill="url(#bkc)"/>
  <path d="M13 31 L13 36 L66 61 L66 56 Z" fill="#0a1a12"/>
  <path d="M26 31.5 L93 14.5 L134 33.5 L67 51 Z" fill="none" stroke="url(#bkg)" stroke-width="1.6"/>
  <path d="M33 31.8 L93 17.5 L127 33.4 L67 47.8 Z" fill="none" stroke="#e8c877" stroke-width=".6" opacity=".7"/>
  <path d="M26 31.5 l7 3 M93 14.5 l0 4 M134 33.5 l-7 0 M67 51 l0 -4" stroke="#f6dc8f" stroke-width="2.2" stroke-linecap="round"/>
  <ellipse cx="80" cy="32.5" rx="12" ry="6" fill="none" stroke="url(#bkg)" stroke-width="1.4"/>
  <path d="M80 24 L82 30.6 L90 32.5 L82 34.4 L80 41 L78 34.4 L70 32.5 L78 30.6 Z" fill="#ffd27f"/>
  <path d="M142 37 L152 41 L152 49 L142 46 Z" fill="url(#bkg)"/>
  <circle cx="148" cy="44" r="2.2" fill="#ff7a3a"/>
</svg>`;

  // 細緻的燙金分隔花紋
  const ORNAMENT = `
<svg viewBox="0 0 260 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-linecap="round">
    <path d="M8 20 H92" stroke-width=".9" opacity=".7"/>
    <path d="M168 20 H252" stroke-width=".9" opacity=".7"/>
    <path d="M92 20 C100 20 104 10 112 10 C118 10 118 17 113 17 C109 17 110 12 114 13" stroke-width="1.2"/>
    <path d="M92 20 C100 20 104 30 112 30 C118 30 118 23 113 23 C109 23 110 28 114 27" stroke-width="1.2"/>
    <path d="M168 20 C160 20 156 10 148 10 C142 10 142 17 147 17 C151 17 150 12 146 13" stroke-width="1.2"/>
    <path d="M168 20 C160 20 156 30 148 30 C142 30 142 23 147 23 C151 23 150 28 146 27" stroke-width="1.2"/>
  </g>
  <g fill="currentColor">
    <path d="M40 20 Q48 14 56 20 Q48 26 40 20 Z" opacity=".6"/>
    <path d="M204 20 Q212 14 220 20 Q212 26 204 20 Z" opacity=".6"/>
    <circle cx="22" cy="20" r="1.6" opacity=".7"/><circle cx="238" cy="20" r="1.6" opacity=".7"/>
    <circle cx="72" cy="20" r="1.3" opacity=".7"/><circle cx="188" cy="20" r="1.3" opacity=".7"/>
  </g>
  <path d="M130 3 L133.5 16.5 L147 20 L133.5 23.5 L130 37 L126.5 23.5 L113 20 L126.5 16.5 Z" fill="#ffb35c"/>
  <path d="M130 10 L131.6 18.4 L140 20 L131.6 21.6 L130 30 L128.4 21.6 L120 20 L128.4 18.4 Z" fill="#fff1c9"/>
</svg>`;

  // 燙金邊角花紋（左上角，其他角用 CSS 翻轉）
  const CORNER = `
<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-linecap="round">
    <path d="M4 78 V30 Q4 4 30 4 H78" stroke-width="1.6"/>
    <path d="M10 78 V34 Q10 10 34 10 H78" stroke-width=".7" opacity=".75"/>
    <path d="M18 64 C18 38 38 18 64 18" stroke-width="1.1"/>
    <path d="M18 64 c0 -9 9 -11 11 -5 c2 6 -6 8 -6 2" stroke-width="1.1"/>
    <path d="M64 18 c-9 0 -11 9 -5 11 c6 2 8 -6 2 -6" stroke-width="1.1"/>
    <path d="M22 40 C28 36 32 30 34 24" stroke-width=".8"/>
  </g>
  <g fill="currentColor">
    <path d="M24 33 c5 -4 10 -3 12 1 c-5 3 -9 3 -12 -1 z"/>
    <path d="M33 24 c-4 -5 -3 -10 1 -12 c3 5 3 9 -1 12 z" opacity=".85"/>
    <circle cx="20" cy="20" r="3.2"/>
    <circle cx="44" cy="44" r="1.6" opacity=".7"/>
  </g>
</svg>`;

  // 原創紋章：左半是小森的樹，右半是爆豪的火焰
  const CREST = `
<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="cg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#f8e3a0"/><stop offset=".5" stop-color="#d4a54a"/><stop offset="1" stop-color="#8c6224"/>
    </linearGradient>
    <clipPath id="shield"><path d="M60 14 L104 26 V66 C104 94 84 112 60 124 C36 112 16 94 16 66 V26 Z"/></clipPath>
  </defs>
  <g opacity=".9" fill="none" stroke="url(#cg)" stroke-width="1.4" stroke-linecap="round">
    <path d="M14 46 C2 60 4 88 22 106"/><path d="M106 46 C118 60 116 88 98 106"/>
  </g>
  <g fill="url(#cg)" opacity=".9">
    <path d="M8 60 c-5 -2 -6 -7 -3 -10 c4 2 5 6 3 10z"/><path d="M6 74 c-5 -1 -7 -6 -4 -9 c4 2 6 5 4 9z"/>
    <path d="M9 88 c-5 0 -8 -4 -6 -8 c4 1 6 4 6 8z"/><path d="M15 100 c-5 1 -8 -3 -7 -7 c4 0 7 3 7 7z"/>
    <path d="M112 60 c5 -2 6 -7 3 -10 c-4 2 -5 6 -3 10z"/><path d="M114 74 c5 -1 7 -6 4 -9 c-4 2 -6 5 -4 9z"/>
    <path d="M111 88 c5 0 8 -4 6 -8 c-4 1 -6 4 -6 8z"/><path d="M105 100 c5 1 8 -3 7 -7 c-4 0 -7 3 -7 7z"/>
  </g>
  <g clip-path="url(#shield)">
    <rect x="0" y="0" width="60" height="140" fill="#1c3b2c"/>
    <rect x="60" y="0" width="60" height="140" fill="#5a1d14"/>
    <path d="M38 98 V72" stroke="#c9a27a" stroke-width="3"/>
    <circle cx="38" cy="58" r="12" fill="#7fa35b"/><circle cx="29" cy="66" r="8" fill="#6b8f4c"/><circle cx="47" cy="66" r="8" fill="#6b8f4c"/>
    <path d="M28 98 Q38 92 48 98" stroke="#c9a27a" stroke-width="2" fill="none"/>
    <path d="M82 100 C70 92 72 78 78 70 C78 78 82 80 84 78 C80 68 86 56 92 50 C92 60 98 66 98 78 C98 90 92 98 82 100 Z" fill="#ff8a3d"/>
    <path d="M83 98 C78 92 79 84 83 80 C84 86 87 86 88 84 C90 90 89 96 83 98 Z" fill="#ffd27f"/>
  </g>
  <path d="M60 14 L104 26 V66 C104 94 84 112 60 124 C36 112 16 94 16 66 V26 Z" fill="none" stroke="url(#cg)" stroke-width="3"/>
  <path d="M60 20 L98 30.5 V66 C98 90 81 106 60 117 C39 106 22 90 22 66 V30.5 Z" fill="none" stroke="#f8e3a0" stroke-width=".8" opacity=".6"/>
  <path d="M60 14 V124" stroke="url(#cg)" stroke-width="1.6"/>
  <path d="M60 0 L63 9 L72 11 L63 13 L60 22 L57 13 L48 11 L57 9 Z" fill="#ffd27f"/>
  <path d="M28 120 Q60 134 92 120 L96 130 Q60 142 24 130 Z" fill="#6e1a1a" stroke="url(#cg)" stroke-width="1"/>
</svg>`;

  // 紅色蠟封印章
  const SEAL = `
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="wax" cx=".38" cy=".32" r=".75">
      <stop offset="0" stop-color="#d0473a"/><stop offset=".55" stop-color="#9a2420"/><stop offset="1" stop-color="#5c1210"/>
    </radialGradient>
  </defs>
  <path d="M60 6 C72 6 76 12 86 14 C98 17 104 26 108 36 C112 46 116 52 114 64 C112 76 116 84 108 94 C100 104 92 106 82 110 C72 114 66 116 56 114 C44 112 36 114 26 106 C16 98 12 90 8 78 C4 66 6 58 8 48 C10 36 14 28 24 20 C34 12 46 6 60 6 Z" fill="url(#wax)"/>
  <path d="M104 92 c4 6 6 12 2 16 c-4 -2 -5 -8 -2 -16z M18 100 c-3 5 -2 11 2 12 c2 -3 1 -8 -2 -12z" fill="#7a1a17"/>
  <circle cx="60" cy="60" r="38" fill="none" stroke="#5c1210" stroke-width="3" opacity=".7"/>
  <circle cx="60" cy="60" r="33" fill="none" stroke="#e98a78" stroke-width="1" opacity=".45"/>
  <g fill="#5c1210" opacity=".75">
    <path d="M60 24 l2 5 5 1 -5 1 -2 5 -2 -5 -5 -1 5 -1z"/><path d="M60 84 l2 5 5 1 -5 1 -2 5 -2 -5 -5 -1 5 -1z"/>
  </g>
  <text x="60" y="71" text-anchor="middle" font-family="Cinzel Decorative, Cinzel, serif" font-weight="700" font-size="30" fill="#5c1210" opacity=".85">KN</text>
  <text x="59" y="70" text-anchor="middle" font-family="Cinzel Decorative, Cinzel, serif" font-weight="700" font-size="30" fill="#f2a08c" opacity=".55">KN</text>
  <ellipse cx="42" cy="32" rx="14" ry="6" fill="#fff" opacity=".14" transform="rotate(-30 42 32)"/>
</svg>`;

  // 魔法陣：同心圓＋自動產生的符文
  function rng(seed) {
    let s = seed >>> 0;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }

  function magicCircle() {
    const r = rng(42);
    const runes = [];
    const N = 24;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * 360;
      let d = '';
      const strokes = 2 + Math.floor(r() * 3);
      for (let k = 0; k < strokes; k++) {
        const x1 = (r() - 0.5) * 7, y1 = (r() - 0.5) * 9, x2 = (r() - 0.5) * 7, y2 = (r() - 0.5) * 9;
        d += `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} `;
      }
      runes.push(`<path transform="rotate(${a} 100 100) translate(100 17)" d="${d}"/>`);
    }
    const star = [0, 1, 2, 3, 4, 5].map((i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 3;
      return [100 + Math.cos(a) * 60, 100 + Math.sin(a) * 60];
    });
    const tri = (o) => `M${star[o][0].toFixed(1)} ${star[o][1].toFixed(1)} L${star[o + 2][0].toFixed(1)} ${star[o + 2][1].toFixed(1)} L${star[(o + 4) % 6][0].toFixed(1)} ${star[(o + 4) % 6][1].toFixed(1)} Z`;
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-linecap="round">
        <circle cx="100" cy="100" r="96" stroke-width="1.2"/>
        <circle cx="100" cy="100" r="90" stroke-width=".5"/>
        <circle cx="100" cy="100" r="74" stroke-width="1"/>
        <circle cx="100" cy="100" r="60" stroke-width=".6" stroke-dasharray="2 4"/>
        <path d="${tri(0)} ${tri(1)}" stroke-width=".9"/>
        <circle cx="100" cy="100" r="22" stroke-width=".8"/>
        <g stroke-width="1.1">${runes.join('')}</g>
        ${star.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" stroke-width=".8"/>`).join('')}
      </g>
    </svg>`;
  }

  // ───── 森林圖層產生器 ─────
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

  // 漂浮的蠟燭
  function candles(count, seed, area) {
    const r = rng(seed);
    let html = '';
    for (let i = 0; i < count; i++) {
      const x = 4 + ((i + r() * 0.8) / count) * 92;
      const y = area[0] + r() * (area[1] - area[0]);
      const s = 0.45 + r() * 0.65;
      const dur = 4 + r() * 3;
      const delay = -r() * 6;
      html += `<div class="candle" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;--s:${s.toFixed(2)};--dur:${dur.toFixed(1)}s;--delay:${delay.toFixed(1)}s;z-index:${Math.round(s * 10)}"><i class="flame"></i><i class="halo"></i></div>`;
    }
    return html;
  }

  window.KN_ART = { WOLF, RABBIT, BOOK_SMALL, ORNAMENT, CORNER, CREST, SEAL, magicCircle, forestLayer, candles };
})();

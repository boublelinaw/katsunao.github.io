/* KatsuNao — 網站本體：讀取資料、目錄、頁面、區塊、創作、音樂 */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const A = window.KN_ART;
  let D = null;

  /* ───── 工具 ───── */
  const fmtDate = (d) => String(d || '').slice(0, 10);
  const keyOf = (ref) => String(ref || '').split('/').pop().replace(/\.(ya?ml|json)$/i, '');

  function asset(src) {
    if (!src) return '';
    if (/^(https?:|data:)/i.test(src)) return src;
    return String(src).replace(/^\/+/, '');
  }

  marked.setOptions({ breaks: true, gfm: true });

  function md(text) {
    if (!text) return '';
    let html = marked.parse(String(text));
    html = html.replace(/[（(]待新增[）)]/g, '<span class="tbd">待新增</span>');
    html = html.replace(/<img /g, '<img loading="lazy" draggable="false" ');
    html = html.replace(/src="\/?(assets\/uploads\/)/g, 'src="$1');
    return html;
  }

  function mdInline(text) {
    return md(text).replace(/^<p>|<\/p>\s*$/g, '');
  }

  function iconHTML(kind) {
    if (kind === 'wolf') return `<span class="icon icon-wolf">${A.WOLF}</span>`;
    if (kind === 'rabbit') return `<span class="icon icon-rabbit">${A.RABBIT}</span>`;
    if (kind === 'both') return `<span class="icon icon-wolf">${A.WOLF}</span><span class="spark-mini">✦</span><span class="icon icon-rabbit">${A.RABBIT}</span>`;
    return '';
  }

  /* ───── 雷達圖 ───── */
  const GRADES = { E: 1, D: 2, C: 3, B: 4, A: 5, S: 6 };
  function gradeValue(g) {
    const m = /^([SABCDE])([+-]?)$/.exec(String(g || '').trim().toUpperCase());
    if (!m) return 0;
    return GRADES[m[1]] + (m[2] === '+' ? 0.33 : m[2] === '-' ? -0.33 : 0);
  }

  function radarSVG(chart, idx) {
    const axes = (chart.axes || []).filter((a) => a && a.label);
    const n = axes.length;
    if (n < 3) return `<p class="muted">雷達圖至少需要 3 個項目</p>`;
    const cx = 150, cy = 150, R = 100, MAX = 6.33;
    const pt = (i, r) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    };
    let grid = '';
    for (let lv = 1; lv <= 6; lv++) {
      const pts = axes.map((_, i) => pt(i, (R * lv) / 6).map((v) => v.toFixed(1)).join(',')).join(' ');
      grid += `<polygon points="${pts}" class="rg-ring${lv === 6 ? ' outer' : ''}"/>`;
    }
    const spokes = axes.map((_, i) => { const [x, y] = pt(i, R); return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="rg-spoke"/>`; }).join('');
    const vals = axes.map((a, i) => pt(i, (R * Math.min(Math.max(gradeValue(a.grade), 0.15), MAX)) / 6));
    const shape = vals.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ');
    const dots = vals.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" class="rg-dot"/>`).join('');
    const labels = axes.map((a, i) => {
      const [x, y] = pt(i, R + 26);
      const anchor = Math.abs(x - cx) < 8 ? 'middle' : x > cx ? 'start' : 'end';
      return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}" class="rg-label">${esc(a.label)}<tspan class="rg-grade" dx="4">${esc(a.grade || '')}</tspan></text>`;
    }).join('');
    const tone = idx % 2 === 0 ? 'fire' : 'leaf';
    return `<svg viewBox="-40 -10 380 320" class="radar radar-${tone}" role="img" aria-label="${esc(chart.name || '雷達圖')}">${grid}${spokes}<polygon points="${shape}" class="rg-shape"/>${dots}${labels}</svg>`;
  }

  /* ───── 對話 ───── */
  function chatHTML(messages) {
    const c = (D.settings && D.settings.chat) || {};
    return `<div class="chat">${(messages || []).map((m) => {
      const right = m.side === 'right';
      const name = m.name || (right ? c.right_name : c.left_name) || '';
      const av = m.avatar || (right ? c.right_avatar : c.left_avatar);
      const avatar = av ? `<img src="${esc(asset(av))}" alt="" draggable="false">` : (right ? A.RABBIT : A.WOLF);
      return `<div class="msg ${right ? 'msg-right' : 'msg-left'}">
        <div class="msg-avatar">${avatar}</div>
        <div class="msg-body">${name ? `<span class="msg-name">${esc(name)}</span>` : ''}<div class="bubble">${mdInline(m.text)}</div></div>
      </div>`;
    }).join('')}</div>`;
  }

  /* ───── 區塊 ───── */
  function block(b) {
    if (!b || !b._block) return '';
    switch (b._block) {
      case 'heading': {
        const tag = b.level === 'h3' ? 'h3' : 'h2';
        return `<${tag} class="b-heading">${esc(b.text)}</${tag}>`;
      }
      case 'text':
        return `<div class="b-text prose">${md(b.body)}</div>`;
      case 'info':
        return `<dl class="b-info">${(b.rows || []).map((r) => `<div class="row"><dt>${esc(r.label)}</dt><dd>${mdInline(r.value)}</dd></div>`).join('')}</dl>`;
      case 'radar':
        return `<figure class="b-radar">${b.title ? `<figcaption class="radar-title">${esc(b.title)}</figcaption>` : ''}
          <div class="radar-row">${(b.charts || []).map((c, i) => `<div class="radar-item">${radarSVG(c, i)}${c.name ? `<p class="radar-name">${esc(c.name)}</p>` : ''}</div>`).join('')}</div>
          ${b.note ? `<p class="radar-note">${esc(b.note)}</p>` : ''}</figure>`;
      case 'quote':
        return `<blockquote class="b-quote"><p>${mdInline(b.text)}</p>${b.cite ? `<cite>${esc(b.cite)}</cite>` : ''}</blockquote>`;
      case 'note':
        return `<aside class="b-note tone-${esc(b.tone || 'fire')}">${b.title ? `<p class="note-title">${esc(b.title)}</p>` : ''}<div class="prose">${md(b.body)}</div></aside>`;
      case 'fold':
        return `<details class="b-fold"${b.open ? ' open' : ''}><summary>${esc(b.title || '展開')}</summary><div class="prose">${md(b.body)}</div></details>`;
      case 'chat':
        if (b.title) return `<details class="b-fold b-chat"${b.collapsed ? '' : ' open'}><summary>${esc(b.title)}</summary>${chatHTML(b.messages)}</details>`;
        return `<div class="b-chat">${chatHTML(b.messages)}</div>`;
      case 'timeline':
        return `<section class="b-timeline"><div class="tl-dot"></div><div class="tl-card">
          ${b.title ? `<h3 class="tl-title">${esc(b.title)}</h3>` : ''}
          ${b.subtitle ? `<p class="tl-sub">${esc(b.subtitle)}</p>` : ''}
          ${b.body ? `<div class="prose">${md(b.body)}</div>` : ''}
          ${(b.messages || []).length ? `<details class="b-fold b-chat"><summary>${esc(b.chat_title || '兩人對彼此的看法')}</summary>${chatHTML(b.messages)}</details>` : ''}
        </div></section>`;
      case 'card': {
        const pic = b.image ? `<img src="${esc(asset(b.image))}" alt="" draggable="false">` : iconHTML(b.icon);
        const link = b.link ? `<a class="btn-link" href="#/p/${esc(keyOf(b.link))}">${esc(b.link_text || '前往更多設定')} ›</a>` : '';
        return `<article class="b-card">${pic ? `<div class="card-pic">${pic}</div>` : ''}<div class="card-main">
          <h3>${esc(b.name)}</h3>${b.subtitle ? `<p class="card-sub">${esc(b.subtitle)}</p>` : ''}
          ${b.body ? `<p class="card-body">${esc(b.body)}</p>` : ''}${link}</div></article>`;
      }
      case 'chips':
        return `<div class="b-chips">${b.label ? `<span class="chips-label">${esc(b.label)}</span>` : ''}${(b.items || []).filter(Boolean).map((t) => `<span class="chip">＃${esc(String(t).replace(/^[#＃]/, ''))}</span>`).join('')}</div>`;
      case 'image':
        if (!b.src) return '';
        return `<figure class="b-image size-${esc(b.size || 'full')}"><img src="${esc(asset(b.src))}" alt="${esc(b.caption || '')}" loading="lazy" draggable="false">${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''}</figure>`;
      case 'chapter':
        return `<div class="b-chapter"><span>${esc(b.text)}</span></div>`;
      case 'divider':
        return divider(b.style);
      default:
        return '';
    }
  }

  function divider(style) {
    const glyph = { spark: '✦', leaf: '❦', line: '' }[style || 'spark'] ?? '✦';
    return `<div class="b-divider div-${esc(style || 'spark')}" role="separator">${glyph ? `<span>${glyph}</span>` : ''}</div>`;
  }

  const blocks = (list) => (list || []).map(block).join('');

  /* ───── 首頁（世界觀＋入內須知） ───── */
  function homeHTML(withAgree) {
    const h = D.home || {};
    const contact = h.contact_url
      ? `<a href="${esc(h.contact_url)}" target="_blank" rel="noopener">${esc(h.contact_text || h.contact_url)}</a>`
      : '<span class="tbd">待新增</span>';
    return `
      <div class="home">
        <div class="home-ornament">${A.ORNAMENT}</div>
        <section class="home-sec">
          <h2 class="sec-title">${esc(h.worldview_title || '世界觀')}</h2>
          ${blocks(h.worldview)}
        </section>
        ${divider('spark')}
        <section class="home-sec">
          <h2 class="sec-title">${esc(h.notice_title || '入內須知')}</h2>
          ${blocks(h.notice)}
          <p class="contact"><strong>${esc(h.contact_label || '我的聯繫方式')}：</strong>${contact}</p>
        </section>
        ${withAgree ? `<div class="agree-wrap"><button class="btn-seal" id="btn-agree" type="button"><span class="seal">${A.SEAL}</span><span class="seal-text">${esc(h.agree_text || '同意並進入')}</span></button><p class="seal-hint">按下封蠟，即表示同意以上須知</p></div>` : ''}
      </div>`;
  }

  function renderHomeInto(el, onAgree) {
    el.innerHTML = homeHTML(true);
    const btn = el.querySelector('#btn-agree');
    btn.addEventListener('click', () => {
      if (btn.classList.contains('pressed')) return;
      btn.classList.add('pressed');
      setTimeout(onAgree, 520);
    });
  }

  /* ───── 目錄 ───── */
  function viewTOC() {
    const t = D.toc || {};
    const items = t.items || [];
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    return `
      <div class="paper toc">
        <div class="toc-head">
          <p class="toc-en">Contents</p>
          <h1 class="toc-title">目錄</h1>
          <div class="toc-orn">${A.ORNAMENT}</div>
        </div>
        <a class="toc-home" href="#/home">${esc(t.home_title || '首頁')}<span>世界觀・入內須知</span></a>
        <ol class="toc-list">
          ${items.map((it, i) => `
            <li class="toc-item">
              <a class="toc-main" href="${it.page ? `#/p/${esc(keyOf(it.page))}` : '#/toc'}">
                <span class="toc-num">${romans[i] || i + 1}</span>
                <span class="toc-text"><span class="toc-name">${esc(it.title)}</span>${it.subtitle ? `<span class="toc-sub">${esc(it.subtitle)}</span>` : ''}</span>
              </a>
              ${(it.children || []).length ? `<ul class="toc-children">${it.children.map((c) => `
                <li><a href="${c.page ? `#/p/${esc(keyOf(c.page))}` : '#/toc'}">${esc(c.title)}</a></li>`).join('')}</ul>` : ''}
            </li>`).join('')}
        </ol>
      </div>`;
  }

  /* ───── 一般頁面 ───── */
  function pageHero(p) {
    const icon = p.icon_image ? `<span class="icon"><img src="${esc(asset(p.icon_image))}" alt="" draggable="false"></span>` : iconHTML(p.icon);
    return `
      <header class="page-hero">
        ${icon ? `<div class="hero-icons">${icon}</div>` : ''}
        <h1 class="page-title">${esc(p.title)}</h1>
        ${p.subtitle ? `<p class="page-sub">${esc(p.subtitle)}</p>` : ''}
        ${p.motto ? `<p class="page-motto">${esc(p.motto)}</p>` : ''}
      </header>`;
  }

  function viewPage(key, query) {
    const p = (D.pages || {})[key];
    if (!p) return notFound();
    if (p.kind === 'works') return viewWorks(p, query);
    return `<article class="paper page">${pageHero(p)}<div class="blocks">${blocks(p.blocks)}</div></article>`;
  }

  /* ───── 創作 ───── */
  const sortedBy = (obj) => Object.entries(obj || {}).sort((a, b) => (Number(a[1].order) || 0) - (Number(b[1].order) || 0));

  function creationsList() {
    return Object.entries(D.creations || {})
      .map(([k, v]) => ({ key: k, ...v }))
      .sort((a, b) => fmtDate(b.date).localeCompare(fmtDate(a.date)) || String(a.title).localeCompare(String(b.title)));
  }

  function tagPills(tags) {
    return (tags || []).map((t) => {
      const tag = (D.tags || {})[keyOf(t)];
      return tag ? `<span class="tag">${esc(tag.title)}</span>` : '';
    }).join('');
  }

  function viewWorks(p, query) {
    const cats = sortedBy(D.categories);
    const cur = query.get('cat') || '';
    const all = creationsList();
    const list = cur ? all.filter((c) => keyOf(c.category) === cur) : all;
    const pageKey = Object.keys(D.pages).find((k) => D.pages[k] === p);
    return `
      <div class="paper page works">
        ${pageHero(p)}
        <div class="blocks">${blocks(p.blocks)}</div>
        <nav class="filters" aria-label="創作分類">
          <a class="filter${cur ? '' : ' on'}" href="#/p/${esc(pageKey)}">全部</a>
          ${cats.map(([k, c]) => `<a class="filter${cur === k ? ' on' : ''}" href="#/p/${esc(pageKey)}?cat=${esc(k)}">${esc(c.title)}</a>`).join('')}
        </nav>
        <div class="work-grid">
          ${list.length ? list.map((c) => {
            const cat = (D.categories || {})[keyOf(c.category)];
            return `
            <a class="work-card" href="#/w/${esc(c.key)}">
              <div class="work-cover">${c.cover ? `<img src="${esc(asset(c.cover))}" alt="" loading="lazy" draggable="false">` : `<div class="cover-placeholder">${A.ORNAMENT}<span>${esc((cat && cat.title) || 'KatsuNao')}</span></div>`}</div>
              <div class="work-info">
                <p class="work-meta">${cat ? `<span class="work-cat">${esc(cat.title)}</span>` : ''}${c.date ? `<time>${esc(fmtDate(c.date))}</time>` : ''}</p>
                <h3 class="work-title">${esc(c.title)}</h3>
                <div class="tags">${tagPills(c.tags)}</div>
                ${c.summary ? `<p class="work-sum">${esc(c.summary)}</p>` : ''}
              </div>
            </a>`;
          }).join('') : '<p class="empty">這個分類還沒有作品。</p>'}
        </div>
      </div>`;
  }

  function viewCreation(key) {
    const c = (D.creations || {})[key];
    if (!c) return notFound();
    const list = creationsList();
    const i = list.findIndex((x) => x.key === key);
    const newer = list[i - 1], older = list[i + 1];
    const cat = (D.categories || {})[keyOf(c.category)];
    const worksKey = Object.keys(D.pages || {}).find((k) => D.pages[k].kind === 'works');
    return `
      <article class="paper page reading">
        ${worksKey ? `<a class="back" href="#/p/${esc(worksKey)}">‹ 回到創作列表</a>` : ''}
        <header class="read-head">
          <p class="work-meta">${cat ? `<span class="work-cat">${esc(cat.title)}</span>` : ''}${c.date ? `<time>${esc(fmtDate(c.date))}</time>` : ''}</p>
          <h1 class="read-title">${esc(c.title)}</h1>
          <div class="tags">${tagPills(c.tags)}</div>
        </header>
        ${c.cover ? `<figure class="b-image size-full read-cover"><img src="${esc(asset(c.cover))}" alt="" draggable="false"></figure>` : ''}
        ${c.notes ? `<aside class="b-note tone-wood read-notes"><p class="note-title">前言</p><div class="prose">${md(c.notes)}</div></aside>` : ''}
        <div class="blocks story">${blocks(c.blocks)}</div>
        ${divider('spark')}
        <nav class="pager">
          ${older ? `<a href="#/w/${esc(older.key)}" class="prev">‹ ${esc(older.title)}</a>` : '<span></span>'}
          ${newer ? `<a href="#/w/${esc(newer.key)}" class="next">${esc(newer.title)} ›</a>` : '<span></span>'}
        </nav>
      </article>`;
  }

  function viewHome() {
    return `<article class="paper page">${homeHTML(false)}</article>`;
  }

  function notFound() {
    return `<div class="paper page"><p class="empty">找不到這一頁。<a href="#/toc">回到目錄</a></p></div>`;
  }

  function addCorners(root) {
    root.querySelectorAll('.paper').forEach((p) => {
      if (p.querySelector(':scope > .corner')) return;
      p.insertAdjacentHTML('afterbegin', ['tl', 'tr', 'bl', 'br'].map((c) => `<span class="corner ${c}" aria-hidden="true">${A.CORNER}</span>`).join(''));
    });
  }

  /* ───── 路由 ───── */
  function route() {
    const raw = location.hash.replace(/^#\/?/, '');
    const [path, qs] = raw.split('?');
    const query = new URLSearchParams(qs || '');
    const [kind, key] = path.split('/');
    let html;
    if (kind === 'p' && key) html = viewPage(decodeURIComponent(key), query);
    else if (kind === 'w' && key) html = viewCreation(decodeURIComponent(key));
    else if (kind === 'home') html = viewHome();
    else html = viewTOC();
    const view = $('view');
    view.innerHTML = html;
    addCorners(view);
    view.classList.remove('enter');
    void view.offsetWidth;
    view.classList.add('enter');
    window.scrollTo(0, 0);
    const title = view.querySelector('h1');
    const site = (D.settings && D.settings.site_title) || 'KatsuNao';
    document.title = title && kind ? `${title.textContent}｜${site}` : site;
  }

  /* ───── 字體 ───── */
  function applyFonts() {
    const f = (D.settings && D.settings.fonts) || {};
    const head = f.heading || 'Noto Serif TC';
    const body = f.body || 'Noto Serif TC';
    const fam = (name) => `family=${name.trim().replace(/ /g, '+')}${/Iansui/.test(name) ? '' : ':wght@400;700'}`;
    const set = Array.from(new Set([head, body]));
    $('font-link').href = `https://fonts.googleapis.com/css2?${set.map(fam).join('&')}&family=Cinzel+Decorative:wght@700&family=Cinzel:wght@500;700&family=IM+Fell+English:ital@0;1&display=swap`;
    const stack = (n) => `"${n}", "Noto Serif TC", "Songti TC", "PMingLiU", serif`;
    document.documentElement.style.setProperty('--font-head', stack(head));
    document.documentElement.style.setProperty('--font-body', stack(body));
  }

  /* ───── 背景音樂（預設靜音，訪客點按鈕才播放） ───── */
  function ytId(url) {
    const m = String(url || '').match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : (/^[A-Za-z0-9_-]{11}$/.test(String(url || '').trim()) ? String(url).trim() : null);
  }

  function setupMusic() {
    const m = (D.settings && D.settings.music) || {};
    const btn = $('music');
    const vol = Math.min(100, Math.max(0, Number(m.volume ?? 40)));
    let playing = false, player = null, ready = false, audio = null;

    const setState = (on) => {
      playing = on;
      btn.setAttribute('aria-pressed', String(on));
      btn.classList.toggle('on', on);
      btn.querySelector('.music-label').textContent = on ? '音樂開' : '音樂';
    };

    if (m.file) {
      audio = new Audio(asset(m.file));
      audio.loop = true;
      audio.volume = vol / 100;
      btn.hidden = false;
      btn.addEventListener('click', () => {
        if (playing) { audio.pause(); setState(false); }
        else audio.play().then(() => setState(true)).catch(() => setState(false));
      });
      return;
    }

    const id = ytId(m.youtube);
    if (!id) return;
    btn.hidden = false;
    window.onYouTubeIframeAPIReady = () => {
      const holder = document.createElement('div');
      holder.id = 'yt-player';
      $('yt-holder').appendChild(holder);
      player = new YT.Player('yt-player', {
        width: 200, height: 200, videoId: id,
        playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: id, playsinline: 1, rel: 0 },
        events: {
          onReady: () => { ready = true; player.setVolume(vol); },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) setState(true);
            if (e.data === YT.PlayerState.PAUSED) setState(false);
            if (e.data === YT.PlayerState.ENDED) { player.seekTo(0); player.playVideo(); }
          },
        },
      });
    };
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
    btn.addEventListener('click', () => {
      if (!ready) return;
      if (playing) { player.pauseVideo(); setState(false); }
      else { player.unMute(); player.playVideo(); setState(true); }
    });
  }

  /* ───── 圖片保護：全站禁止右鍵、長按、拖曳存圖 ───── */
  function protectImages() {
    const isImg = (t) => t && (t.tagName === 'IMG' || (t.closest && t.closest('svg, .icon, .work-cover, .b-image, .msg-avatar, .card-pic')));
    document.addEventListener('contextmenu', (e) => { if (isImg(e.target)) e.preventDefault(); });
    document.addEventListener('dragstart', (e) => { if (isImg(e.target)) e.preventDefault(); });
  }

  /* ───── 背景餘燼（閱讀頁的淡淡火光） ───── */
  let embersFX = null;
  function startEmbers() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    embersFX = window.KN_INTRO.createFX($('embers'));
    embersFX.cfg.embers = 0.02;
    embersFX.cfg.motes = 0.06;
  }

  /* ───── 啟動 ───── */
  function enterSite() {
    document.body.classList.remove('is-intro');
    $('app').hidden = false;
    $('bg-candles').innerHTML = A.candles(7, 19, [2, 75]);
    if (!location.hash || location.hash === '#' || location.hash === '#/') location.hash = '#/toc';
    route();
    window.addEventListener('hashchange', route);
    startEmbers();
  }

  async function boot() {
    try {
      const res = await fetch('data.json', { cache: 'no-cache' });
      D = await res.json();
    } catch (e) {
      document.body.innerHTML = '<p style="color:#f3e6cc;padding:2rem;font-family:serif">網站資料讀取失敗，請重新整理頁面。</p>';
      return;
    }
    D.pages = D.pages || {};
    applyFonts();
    $('footer').textContent = (D.settings && D.settings.footer) || '';
    $('brand').textContent = (D.settings && D.settings.site_title) || 'KatsuNao';
    document.title = (D.settings && D.settings.site_title) || 'KatsuNao';
    protectImages();
    setupMusic();
    window.KN_INTRO.start(D, { renderHome: renderHomeInto, onDone: enterSite });
  }

  boot();
})();

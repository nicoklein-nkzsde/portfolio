(() => {
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Video-Quellen ── */
  const parseVideo = (src) => {
    if (!src) return null;
    let m = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (m) return { embed: `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0&modestbranding=1`, poster: `https://i.ytimg.com/vi/${m[1]}/maxresdefault.jpg` };
    m = src.match(/instagram\.com\/(?:[\w.]+\/)?(?:reel|reels|p)\/([\w-]+)/);
    if (m) return { embed: `https://www.instagram.com/reel/${m[1]}/embed/`, ig: true };
    m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return { embed: `https://player.vimeo.com/video/${m[1]}?autoplay=1&dnt=1&byline=0&title=0` };
    return { file: src };
  };
  const player = (v) => v.file
    ? `<video src="${esc(v.file)}" controls autoplay playsinline></video>`
    : `<iframe src="${esc(v.embed)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;

  /* ── Lightbox ── */
  const lb = $("#lightbox"), stage = $("#lb-stage"), cap = $("#lb-cap");
  let items = [], idx = 0;
  const render = () => {
    const it = items[idx];
    stage.className = "lb-stage" + (it.vertical ? " is-vertical" : "") + (it.video ? " is-video" : "") + (it.video?.ig ? " is-ig" : "");
    stage.innerHTML = it.video ? player(it.video) : `<img src="${esc(it.src)}" alt="${esc(it.alt || it.title || "")}">`;
    const count = items.length > 1 ? `${String(idx + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}` : "";
    cap.textContent = [it.caption, count].filter(Boolean).join("   ·   ");
    lb.querySelectorAll(".lb-nav").forEach((b) => (b.hidden = items.length < 2));
    lbSrc.innerHTML = it.srcInfo && window.__srcBar ? window.__srcBar(it.srcInfo) : "";
  };
  const lbSrc = $("#lb-src");
  // Doppelklick / Doppeltipp aufs Bild im Vollbild = Original-Post öffnen
  const lbPost = () => { const si = items[idx]?.srcInfo; if (si?.post) window.open(si.post, "_blank", "noopener"); };
  stage.addEventListener("dblclick", (e) => { if (e.target.tagName === "IMG") lbPost(); });
  let lastTap = 0;
  stage.addEventListener("touchend", (e) => {
    if (e.target.tagName !== "IMG") return;
    const now = Date.now(); if (now - lastTap < 300) { e.preventDefault(); lbPost(); lastTap = 0; } else lastTap = now;
  });
  const S = window.Sound || { tick() {}, thump() {}, whoosh() {}, grid() {} };
  const open = (list, i) => { items = list; idx = Math.max(0, i); render(); lb.hidden = false; document.body.classList.add("locked"); S.whoosh(true); };
  const close = () => { lb.hidden = true; stage.innerHTML = ""; if ($("#case").hidden) document.body.classList.remove("locked"); S.whoosh(false); };
  const step = (d) => { idx = (idx + d + items.length) % items.length; render(); S.tick(1.1); };
  lb.querySelector(".lb-close").onclick = close;
  lb.querySelector(".lb-prev").onclick = () => step(-1);
  lb.querySelector(".lb-next").onclick = () => step(1);
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target === stage) close(); });
  addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  let tx = null;
  lb.addEventListener("touchstart", (e) => (tx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => { if (tx == null) return; const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); tx = null; });

  /* ── Hero ── */
  const reel = window.SHOWREEL || {};
  const loopV = parseVideo(reel.loop);
  if (loopV) {
    const hm = $("#hero-media");
    const ytId = loopV.poster && loopV.poster.match(/vi\/([\w-]{11})\//)?.[1];
    if (ytId) {
      // Standbild sofort, Video blendet darüber ein
      hm.innerHTML = `<img class="hero-poster" src="${esc(loopV.poster)}" alt="">` + (reduced ? "" :
        `<iframe class="hero-yt" tabindex="-1" title="" allow="autoplay; encrypted-media"
          src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&disablekb=1&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3"></iframe>`);
      const ifr = hm.querySelector("iframe");
      if (ifr) ifr.addEventListener("load", () => setTimeout(() => ifr.classList.add("on"), 1200));
    } else if (loopV.file && !reduced) {
      hm.innerHTML = `<video src="${esc(loopV.file)}" autoplay muted loop playsinline></video>`;
    }
    hm.classList.add("has-media");
  }
  if (reel.credit) $("#hero-credit").textContent = reel.credit;
  const reelV = parseVideo(reel.full);
  $("#reel-btn").addEventListener("click", () => (reelV ? open([{ video: reelV }], 0) : $("#film").scrollIntoView({ behavior: "smooth" })));
  if (!reduced) {
    const wm = $(".wordmark");
    addEventListener("scroll", () => {
      const y = scrollY, h = innerHeight;
      if (y > h) return;
      wm.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
      wm.style.opacity = String(1 - y / (h * 0.8));
    }, { passive: true });
  }

  /* ═════════ PROJEKTE ═════════ */
  // Quelle eines Fotos/Videos: wer hat's gepostet, Link zum Original-Post
  const ACC = window.ACCOUNTS || {};
  const mkSrc = (by, post, withs) => {
    if (!by && !post) return null;
    const a = ACC[by] || (by ? { name: by } : null);
    const platform = a?.platform || (/youtu/.test(post || "") ? "youtube" : "instagram");
    return {
      name: a?.name, avatar: a?.avatar, verified: a?.verified, platform, post,
      profile: a ? (platform === "youtube" ? `https://www.youtube.com/@${a.name}` : `https://www.instagram.com/${a.name}/`) : null,
      with: (withs || []).map((k) => ACC[k]?.name || k),
    };
  };
  const WORKS = (window.WORKS || []).map((w) => {
    const videos = (w.videos || []).map((v) => ({ ...v, video: parseVideo(v.src) })).filter((v) => v.video);
    videos.forEach((v) => {
      v.poster = v.poster || v.video.poster || "";
      v.srcInfo = v.loop ? mkSrc(v.by || w.by, v.post || w.post, v.with || w.with)
                         : mkSrc(v.by, v.post || (/^https?:/.test(v.src) ? v.src : null), v.with);
    });
    const photos = (w.photos || []).filter((p) => p.src).map((p) => ({ ...p, cat: p.cat || w.cat || "Foto", caption: w.title, work: w.id,
      srcInfo: mkSrc(p.by || w.by, p.post || w.post, p.with || w.with) }));
    const cover = w.cover || videos[0]?.poster || photos[0]?.src || "";
    return { ...w, videos, photos, cover };
  });
  // "Wer bin ich" läuft als besondere Projektseite (#p/ueber), taucht aber nicht im Grid/Wheel auf
  const A = window.ABOUT;
  const ABOUT_W = A ? { id: "ueber", about: true, title: A.name, videos: [], cover: A.photos?.[0]?.src,
    photos: (A.photos || []).map((p) => ({ ...p, caption: A.name, work: "ueber", srcInfo: null })) } : null;
  const byId = (id) => WORKS.find((w) => w.id === id) || (id === "ueber" ? ABOUT_W : undefined);

  /* ── Projektseite ── */
  const caseEl = $("#case"), caseIn = $("#case-inner");
  let caseOpen = null, casePushed = false;
  // Account-Leiste wie bei Instagram/YouTube
  const srcBar = (si) => {
    if (!si) return "";
    const ini = (si.name || "?").replace(/[^a-z0-9]/gi, "").charAt(0).toUpperCase();
    const av = si.avatar ? `<img src="${esc(si.avatar)}" alt="">` : `<span>${esc(ini)}</span>`;
    const label = si.platform === "youtube" ? "Auf YouTube ansehen" : "Auf Instagram ansehen";
    return `<div class="src-bar">
      <a class="src-acc" ${si.profile ? `href="${esc(si.profile)}" target="_blank" rel="noopener"` : ""}>
        <span class="src-av${si.platform === "youtube" ? " is-yt" : ""}">${av}</span>
        <span class="src-name">${esc(si.name || "")}${si.verified ? ` <i class="src-ok" aria-label="verifiziert">✓</i>` : ""}</span>
      </a>
      ${si.with.length ? `<span class="src-with">mit ${si.with.map((n) => `<a href="https://www.instagram.com/${esc(n)}/" target="_blank" rel="noopener">${esc(n)}</a>`).join(", ")}</span>` : ""}
      ${si.post ? `<a class="src-link mono" href="${esc(si.post)}" target="_blank" rel="noopener">${label} ↗</a>` : ""}
    </div>`;
  };
  window.__srcBar = srcBar; // auch fürs Vollbild
  const videoBlock = (v, i) => `
    <figure class="cv${v.vertical ? " is-vertical" : ""}${v.mitarbeit ? " is-assist" : ""}${v.loop ? " is-loop" : ""}">
      ${v.loop ? "" : srcBar(v.srcInfo)}
      <button class="cv-play" type="button" data-v="${i}" aria-label="Video abspielen"${v.ratio ? ` style="aspect-ratio:${esc(v.ratio)}"` : ""}>
        ${v.loop && v.video.file
          ? `<video src="${esc(v.video.file)}" muted loop playsinline autoplay preload="metadata"${v.poster ? ` poster="${esc(v.poster)}"` : ""}></video>`
          : v.poster ? `<img src="${esc(v.poster)}" alt="" loading="lazy" onerror="this.remove()">`
          : v.video.file ? `<video src="${esc(v.video.file)}#t=0.5" muted playsinline preload="metadata"></video>` : ""}
        <span class="vplay" aria-hidden="true">${v.loop ? "⤢" : "▶"}</span>
      </button>
      ${v.label || v.mitarbeit ? `<figcaption class="cv-cap">${v.mitarbeit ? `<span class="cv-tag mono">Mitarbeit</span>` : ""}${v.label ? `<span class="mono">${esc(v.label)}</span>` : ""}</figcaption>` : ""}
      ${v.note ? `<p class="cv-note">${esc(v.note)}</p>` : ""}
    </figure>`;
  const renderAbout = (w) => {
    const [lead, ...rest] = w.photos;
    caseIn.innerHTML = `
      <div class="case-bar"><button class="case-back mono" type="button">← Zurück</button><span class="mono case-count">Über</span></div>
      <div class="about-wrap">
        ${lead ? `<button class="cph about-lead" type="button" data-p="0"><img src="${esc(lead.src)}" alt="${esc(lead.alt || "")}"></button>` : ""}
        <div class="about-text">
          <p class="mono">${esc(A.kicker || "")}</p>
          <h2 class="case-title">${esc(A.name)}</h2>
          ${A.aka ? `<p class="about-aka mono">${esc(A.aka)}</p>` : ""}
          ${(A.text || []).map((t) => `<p class="about-p">${esc(t)}</p>`).join("")}
          ${A.facts?.length ? `<dl class="about-facts">${A.facts.map(([k, v]) => `<div><dt class="mono">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
          <a class="about-cta" href="mailto:nicoklein@nkzs.de">Projekt anfragen →</a>
        </div>
      </div>
      ${rest.length ? `<section class="case-photos about-photos">${rest.map((p, k) => `<button class="cph" type="button" data-p="${k + 1}"><img src="${esc(p.src)}" alt="${esc(p.alt || "")}" loading="lazy"></button>`).join("")}</section>` : ""}
      ${WORKS.length ? `<button class="case-next" type="button" data-next="${esc(WORKS[0].id)}"><span class="mono">Zur Arbeit</span><span class="cn-title">${esc(WORKS[0].title)} →</span></button>` : ""}`;
  };
  const renderCase = (w) => {
    if (w.about) return renderAbout(w);
    const i = WORKS.indexOf(w), next = WORKS[(i + 1) % WORKS.length];
    // Hauptvideos oben, kurze Loop-Clips darunter in eigenem Raster
    const mains = w.videos.map((v, k) => [v, k]).filter(([v]) => !v.loop), loops = w.videos.map((v, k) => [v, k]).filter(([v]) => v.loop);
    const vids =
      (mains.length ? `<section class="case-videos${mains.every(([v]) => v.vertical) ? " all-vertical" : ""}">${mains.map(([v, k]) => videoBlock(v, k)).join("")}</section>` : "") +
      (loops.length ? srcBar(loops[0][0].srcInfo) + `<section class="case-loops">${loops.map(([v, k]) => videoBlock(v, k)).join("")}</section>` : "");
    // Fotos nach Original-Post gruppiert, jede Gruppe mit Account-Leiste darüber
    const groups = [];
    w.photos.forEach((p, k) => {
      const key = p.srcInfo?.post || "";
      const last = groups[groups.length - 1];
      if (last && last.key === key) last.items.push([p, k]); else groups.push({ key, si: p.srcInfo, items: [[p, k]] });
    });
    const phs = groups.map((g) => `<div class="case-group">${srcBar(g.si)}<section class="case-photos">${g.items.map(([p, k]) =>
      `<button class="cph" type="button" data-p="${k}"${g.si?.post ? ` title="Doppelklick: Original-Post öffnen"` : ""}><img src="${esc(p.src)}" alt="${esc(p.alt || "")}" loading="lazy"></button>`).join("")}</section></div>`).join("");
    caseIn.innerHTML = `
      <div class="case-bar">
        <button class="case-back mono" type="button">← Zurück</button>
        <span class="mono case-count">${String(i + 1).padStart(2, "0")} / ${String(WORKS.length).padStart(2, "0")}</span>
      </div>
      <header class="case-head">
        <p class="mono">${esc(w.type || "")}${w.client ? " · " + esc(w.client) : ""}</p>
        <h2 class="case-title">${esc(w.title)}</h2>
        ${w.badge ? `<span class="case-badge mono">${esc(w.badge)}</span>` : ""}
      </header>
      ${w.videosAfterPhotos ? phs + vids : vids + phs}
      ${WORKS.length > 1 ? `<button class="case-next" type="button" data-next="${esc(next.id)}">
        <span class="mono">Nächstes Projekt</span><span class="cn-title">${esc(next.title)} →</span></button>` : ""}`;
  };
  const showCase = (w, photo) => {
    renderCase(w); caseOpen = w;
    caseEl.hidden = false; caseEl.scrollTop = 0; document.body.classList.add("locked");
    if (photo != null) setTimeout(() => open(w.photos, photo), 350);
  };
  const openCase = (id, opts = {}) => {
    const w = byId(id); if (!w) return;
    if (location.hash !== "#p/" + id) { history.pushState(null, "", "#p/" + id); casePushed = true; }
    S.whoosh(true);
    if (opts.instant || !window.FX) showCase(w, opts.photo); else window.FX.wipe(() => showCase(w, opts.photo));
  };
  const hideCase = () => { caseEl.hidden = true; caseIn.innerHTML = ""; caseOpen = null; if (lb.hidden) document.body.classList.remove("locked"); };
  const closeCase = () => {
    if (!caseOpen) return;
    S.whoosh(false);
    if (casePushed) { casePushed = false; history.back(); return; } // hashchange erledigt den Rest
    history.replaceState(null, "", location.pathname + location.search);
    window.FX ? window.FX.wipe(hideCase) : hideCase();
  };
  addEventListener("hashchange", () => {
    const m = location.hash.match(/^#p\/([\w-]+)/);
    if (m) { if (caseOpen?.id !== m[1]) { const w = byId(m[1]); if (w) window.FX ? window.FX.wipe(() => showCase(w)) : showCase(w); } }
    else if (caseOpen) { casePushed = false; window.FX ? window.FX.wipe(hideCase) : hideCase(); }
  });
  // Einfachklick = groß ansehen / abspielen, Doppelklick = Original-Post öffnen
  let clickTimer = null;
  const openPost = (si) => { if (si?.post) { window.open(si.post, "_blank", "noopener"); S.tick(1.5); } };
  caseEl.addEventListener("click", (e) => {
    const media = e.target.closest(".cph, .cv-play");
    if (media && !e.target.closest("a")) {
      const si = media.classList.contains("cph") ? caseOpen.photos[+media.dataset.p].srcInfo : caseOpen.videos[+media.dataset.v].srcInfo;
      if (e.detail >= 2 || clickTimer) { clearTimeout(clickTimer); clickTimer = null; return openPost(si); }
      if (si?.post) { clickTimer = setTimeout(() => { clickTimer = null; handleCaseClick(media); }, 260); return; }
      return handleCaseClick(media);
    }
    handleCaseClick(e.target);
  });
  function handleCaseClick(target) {
    const e = { target };
    if (e.target.closest(".case-back")) return closeCase();
    const nx = e.target.closest(".case-next");
    if (nx) { const w = byId(nx.dataset.next); history.replaceState(null, "", "#p/" + w.id); S.whoosh(true); return window.FX ? window.FX.wipe(() => showCase(w)) : showCase(w); }
    const ph = e.target.closest(".cph");
    if (ph) return open(caseOpen.photos, +ph.dataset.p);
    const pl = e.target.closest(".cv-play");
    if (pl) {
      const v = caseOpen.videos[+pl.dataset.v];
      if (v.video.ig) return open([{ video: v.video, vertical: v.vertical, caption: caseOpen.title, srcInfo: v.srcInfo }], 0); // Instagram lieber im Vollbild
      if (v.loop) { // Loop-Clips: groß mit Ton, alle Clips des Projekts durchblätterbar
        const loops = caseOpen.videos.filter((x) => x.loop).map((x) => ({ video: x.video, vertical: x.vertical, caption: caseOpen.title, srcInfo: x.srcInfo }));
        return open(loops, caseOpen.videos.filter((x) => x.loop).indexOf(v));
      }
      const frame = document.createElement("div");
      frame.className = "cv-frame"; frame.style.aspectRatio = pl.style.aspectRatio || ""; frame.innerHTML = player(v.video);
      pl.replaceWith(frame); S.tick(1.2);
    }
  }
  addEventListener("keydown", (e) => { if (e.key === "Escape" && caseOpen && lb.hidden) closeCase(); });
  // Direktlink #p/<id> beim Laden
  { const m = location.hash.match(/^#p\/([\w-]+)/); if (m && byId(m[1])) showCase(byId(m[1])); }

  /* ── Film (Liste): ein Eintrag pro Projekt mit Video ── */
  // Projekte mit "richtigem" Film (nicht nur kurze Loop-Clips); Hauptvideo = erstes Nicht-Loop-Video
  const mainVid = (w) => w.videos.find((v) => !v.loop);
  const filmWorks = WORKS.filter(mainVid);
  const wide = filmWorks.filter((w) => !mainVid(w).vertical), tall = filmWorks.filter((w) => mainVid(w).vertical);
  const vcard = (w) => `
    <button class="vcard${mainVid(w).vertical ? " is-vertical" : ""}" type="button" data-w="${esc(w.id)}">
      ${mainVid(w).poster ? `<img src="${esc(mainVid(w).poster)}" alt="" loading="lazy" onerror="this.remove()">` : ""}
      ${w.badge ? `<span class="vbadge mono">${esc(w.badge)}</span>` : ""}
      <span class="vinfo"><span class="mono">${esc(w.type || "")}${w.photos.length ? ` · ${w.photos.length} Fotos` : ""}</span><span class="vtitle">${esc(w.title)}</span></span>
      <span class="vplay" aria-hidden="true">▶</span>
    </button>`;
  $("#videos").innerHTML =
    `<div class="vwide">${wide.map(vcard).join("")}</div>` +
    (tall.length ? `<div class="vtall">${tall.map(vcard).join("")}</div>` : "");
  $("#videos").addEventListener("click", (e) => {
    const b = e.target.closest(".vcard"); if (b) openCase(b.dataset.w);
  });
  $("#videos").addEventListener("pointerover", (e) => { const p = e.target.closest(".vcard")?.querySelector(".vprev"); if (p) p.play().catch(() => {}); });
  $("#videos").addEventListener("pointerout", (e) => { const c = e.target.closest(".vcard"); if (c && !c.contains(e.relatedTarget)) c.querySelector(".vprev")?.pause(); });

  /* ── Mitarbeit (nur unten, klar markiert) ── */
  const assists = (window.ASSISTS || []).map((a) => ({ ...a, video: parseVideo(a.src) }));
  if (assists.length) {
    $("#mitarbeit").hidden = false;
    $("#assist").innerHTML = assists.map((a, i) => {
      const poster = a.poster || a.video?.poster || "";
      return `<button class="arow" type="button" data-a="${i}">
        <span class="athumb">${poster ? `<img src="${esc(poster)}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span class="vplay" aria-hidden="true">▶</span></span>
        <span class="atext">
          <span class="atitle">${esc(a.title)}</span>
          ${a.context ? `<span class="acontext mono">${esc(a.context)}</span>` : ""}
          <span class="arole"><span class="mono">Meine Rolle</span> ${esc(a.role)}</span>
          ${a.credit ? `<span class="acredit mono">${esc(a.credit)}</span>` : ""}
        </span>
      </button>`;
    }).join("");
    const playA = assists.filter((a) => a.video);
    $("#assist").addEventListener("click", (e) => {
      const b = e.target.closest(".arow"); if (!b) return;
      const a = assists[+b.dataset.a];
      if (a.project && byId(a.project)) openCase(a.project); else if (a.video) open(playA, playA.indexOf(a));
    });
  }

  /* ── Foto ── */
  // alle Fotos aller Projekte, abwechselnd gemischt (damit nicht ein Projekt die Galerie füllt)
  // (ein Foto, das in mehreren Projekten steckt, erscheint hier nur einmal)
  const photos = [], seenPh = new Set();
  for (let i = 0, max = Math.max(0, ...WORKS.map((w) => w.photos.length)); i < max; i++)
    WORKS.forEach((w) => { const p = w.photos[i]; if (p && !seenPh.has(p.src)) { seenPh.add(p.src); photos.push(p); } });
  const cats = [...new Set(photos.map((p) => p.cat).filter(Boolean))];
  const fEl = $("#photo-filters");
  fEl.innerHTML = cats.length > 1 ? ["Alle", ...cats].map((c, i) => `<button class="chip${i ? "" : " is-active"}" data-cat="${i ? esc(c) : ""}">${esc(c)}</button>`).join("") : "";
  let shown = photos;
  const draw = () => {
    $("#gallery").innerHTML = shown.map((p, i) => `
      <button class="ph${p.src ? "" : " is-empty"}" type="button" data-i="${i}" style="aspect-ratio:${p.w || 3}/${p.h || 2}">
        ${p.src ? `<img src="${esc(p.src)}" alt="${esc(p.alt)}" loading="lazy">` : ""}
      </button>`).join("");
  };
  draw();
  fEl.addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    fEl.querySelectorAll(".chip").forEach((x) => x.classList.toggle("is-active", x === b));
    shown = b.dataset.cat ? photos.filter((p) => p.cat === b.dataset.cat) : photos;
    draw();
  });
  $("#gallery").addEventListener("click", (e) => {
    const b = e.target.closest(".ph"); if (!b) return;
    const p = shown[+b.dataset.i], w = byId(p.work);
    if (w) openCase(w.id, { photo: w.photos.indexOf(p) }); // Projekt öffnen, Foto gleich groß zeigen
  });
  $("#gallery").addEventListener("load", (e) => {
    const img = e.target; if (img.tagName !== "IMG") return;
    img.parentElement.style.aspectRatio = `${img.naturalWidth}/${img.naturalHeight}`;
    img.classList.add("loaded");
  }, true);

  /* ── Web & Grafik ── */
  const webs = (window.PROJECTS || []).filter((p) => p.cat === "web" || p.cat === "app");
  const gfx = window.GRAPHICS || [];
  $("#more").innerHTML =
    gfx.map((g, i) => `<button class="tile" type="button" data-g="${i}"><img src="${esc(g.src)}" alt="" loading="lazy"><span class="tile-cap"><span class="mono">Grafik</span>${esc(g.title || "")}</span></button>`).join("") +
    webs.map((p) => `<a class="tile" href="${esc(p.url)}" target="_blank" rel="noopener">${p.img ? `<img src="${esc(p.img)}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span class="tile-cap"><span class="mono">${p.cat === "app" ? "Web-App" : "Website"}</span>${esc(p.title)} ↗</span></a>`).join("");
  $("#more").addEventListener("click", (e) => {
    const b = e.target.closest("[data-g]"); if (b) open(gfx, +b.dataset.g);
  });

  /* ═════════ INDEX: GRID / WHEEL / LIST ═════════ */
  // Grid & Wheel: ein Eintrag pro Projekt (Web & Grafik stehen unten in der Liste)
  const ALL = WORKS.map((w) => ({
    title: w.title,
    kind: w.videos.length && w.photos.length ? "Film + Foto" : w.videos.length ? "Film" : "Foto",
    thumb: w.cover,
    act: () => openCase(w.id),
  }));
  if (!ALL.length) webs.forEach((p) => ALL.push({ title: p.title, kind: "Website", thumb: p.img, href: p.url }));
  const activate = (it) => { if (it.act) it.act(); else if (it.href) window.open(it.href, "_blank", "noopener"); };
  const thumbHTML = (it) => it.thumb ? `<img src="${esc(it.thumb)}" alt="" loading="lazy" draggable="false" onerror="this.remove()">` : `<span class="ph-kind mono">${esc(it.kind)}</span>`;

  const work = $("#work");
  const isMobile = () => matchMedia("(max-width:700px)").matches;

  /* ── GRID: endlose, gekippte Fläche ── */
  const vg = $("#vgrid"), plane = $("#plane");
  let G = null; // Layout
  const buildGrid = () => {
    const vw = innerWidth, vh = innerHeight;
    const cw = Math.round(Math.min(380, Math.max(200, vw * 0.24))), ch = Math.round(cw * 0.68), gap = Math.round(cw * 0.1), lab = 26;
    const px = cw + gap, py = ch + gap + lab;
    const C = Math.ceil((vw * 1.5) / px) + 2, R = Math.ceil((vh * 1.6) / py) + 2;
    let html = "";
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
      const it = ALL[(r * 5 + c * 3 + r * C) % ALL.length]; // versetzt, damit Nachbarn variieren
      const k = ALL.indexOf(it);
      html += `<button class="gtile${it.thumb ? "" : " is-empty"}" type="button" data-k="${k}" style="width:${cw}px">
        <span class="gimg" style="height:${ch}px">${thumbHTML(it)}</span>
        <span class="gcap"><span>${esc(it.title)}</span><span>${esc(it.kind)}</span></span></button>`;
    }
    plane.innerHTML = html;
    G = { C, R, px, py, tiles: [...plane.children], ox: G?.ox ?? 0, oy: G?.oy ?? 0, vx: G?.vx ?? -0.35, vy: 0, W: C * px, H: R * py, offX: (vw * 1.5 - vw) / 2 + px, offY: (vh * 1.6 - vh) / 2 + py };
  };
  const mod = (a, n) => ((a % n) + n) % n;
  const placeGrid = () => {
    const { C, px, py, W, H, tiles, ox, oy, offX, offY } = G;
    tiles.forEach((t, i) => {
      const x = mod((i % C) * px + ox, W) - offX, y = mod(Math.floor(i / C) * py + oy, H) - offY;
      t.style.transform = `translate3d(${x}px,${y}px,0)`;
    });
  };
  let drag = null, moved = 0;
  vg.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY, t: performance.now() }; moved = 0; G.vx = G.vy = 0; S.tick(0.6, 0.5); vg.setPointerCapture(e.pointerId); vg.classList.add("dragging"); });
  vg.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y, now = performance.now(), dt = Math.max(1, now - drag.t);
    G.ox += dx; G.oy += dy; G.vx = (dx / dt) * 16; G.vy = (dy / dt) * 16; moved += Math.abs(dx) + Math.abs(dy);
    drag = { x: e.clientX, y: e.clientY, t: now };
  });
  const endDrag = (e) => {
    if (!drag) return; drag = null; vg.classList.remove("dragging");
    if (moved < 6) { const t = document.elementFromPoint(e.clientX, e.clientY)?.closest(".gtile"); if (t) activate(ALL[+t.dataset.k]); }
  };
  vg.addEventListener("pointerup", endDrag);
  vg.addEventListener("pointercancel", () => { drag = null; vg.classList.remove("dragging"); });
  vg.addEventListener("wheel", (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); G.ox -= e.deltaX; } }, { passive: false });
  vg.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.closest(".gtile")) activate(ALL[+e.target.closest(".gtile").dataset.k]); });

  /* ── WHEEL: Titel auf einem Rad ── */
  const wl = $("#wheel-list"), wp = $("#wheel-preview");
  wl.innerHTML = ALL.map((it, i) => `<li data-i="${i}"><span class="wt">${esc(it.title)}</span><span class="wk mono">${esc(it.kind)}</span></li>`).join("");
  wp.innerHTML = ALL.map((it, i) => `<div class="wpi${it.thumb ? "" : " is-empty"}" data-i="${i}">${thumbHTML(it)}</div>`).join("");
  const wItems = [...wl.children], wPrev = [...wp.children];
  let wPos = 0, wTarget = 0, wActive = -1, wIdle = 0;
  const setTarget = (v) => { wTarget = Math.max(0, Math.min(ALL.length - 1, v)); wIdle = 0; };
  const vw = $("#vwheel");
  vw.addEventListener("wheel", (e) => {
    const atStart = wTarget <= 0 && e.deltaY < 0, atEnd = wTarget >= ALL.length - 1 && e.deltaY > 0;
    if (atStart || atEnd) return; // Seite normal weiterscrollen lassen
    e.preventDefault(); setTarget(wTarget + e.deltaY * 0.006);
  }, { passive: false });
  let wty = null;
  vw.addEventListener("touchstart", (e) => (wty = e.touches[0].clientY), { passive: true });
  vw.addEventListener("touchmove", (e) => {
    if (wty == null) return; const dy = wty - e.touches[0].clientY;
    const atStart = wTarget <= 0 && dy < 0, atEnd = wTarget >= ALL.length - 1 && dy > 0;
    if (atStart || atEnd) return;
    e.preventDefault(); setTarget(wTarget + dy / 55); wty = e.touches[0].clientY;
  }, { passive: false });
  vw.addEventListener("touchend", () => (wty = null));
  wl.addEventListener("click", (e) => {
    const li = e.target.closest("li"); if (!li) return;
    const i = +li.dataset.i; if (i === Math.round(wPos)) activate(ALL[i]); else setTarget(i);
  });
  wp.addEventListener("click", () => activate(ALL[Math.round(wPos)]));
  addEventListener("keydown", (e) => {
    if (work.dataset.view !== "wheel" || !lb.hidden || caseOpen) return;
    const r = work.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setTarget(Math.round(wTarget) + 1); }
    if (e.key === "ArrowUp") { e.preventDefault(); setTarget(Math.round(wTarget) - 1); }
    if (e.key === "Enter") activate(ALL[Math.round(wPos)]);
  });
  const placeWheel = () => {
    const mob = isMobile(), R = Math.min(innerHeight * 0.46, 480), step = mob ? 0.2 : 0.17;
    wItems.forEach((li, i) => {
      const d = i - wPos, a = d * step;
      if (Math.abs(a) > 1.45) { li.style.visibility = "hidden"; return; }
      li.style.visibility = "";
      const y = Math.sin(a) * R, x = (1 - Math.cos(a)) * R * (mob ? 0.55 : 0.75);
      li.style.transform = `translate3d(${-x}px,${y}px,0) rotate(${a * 32}deg)`;
      li.style.opacity = String(Math.max(0, 1 - Math.abs(d) * 0.11));
    });
    const act = Math.round(wPos);
    if (act !== wActive) {
      if (wActive !== -1) (act === 0 || act === ALL.length - 1) ? (S.tick(0.8), S.thump()) : S.tick();
      wItems[wActive]?.classList.remove("on"); wPrev[wActive]?.classList.remove("on");
      wItems[act]?.classList.add("on"); wPrev[act]?.classList.add("on"); wActive = act;
    }
  };

  /* ── Umschalter ── */
  const sw = $("#switch");
  let view;
  const setView = (v, save) => {
    view = v; work.dataset.view = v;
    sw.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.view === v));
    if (v === "grid") { buildGrid(); placeGrid(); }
    if (save) try { localStorage.setItem("kaizo-view", v); } catch {}
  };
  sw.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.view === view) return;
    S.tick(1.4);
    const go = () => { setView(b.dataset.view, true); work.scrollIntoView({ behavior: "auto" }); };
    window.FX ? window.FX.wipe(go) : go();
  });
  let saved = null; try { saved = localStorage.getItem("kaizo-view"); } catch {}
  setView(saved || (isMobile() ? "wheel" : "grid"));
  let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => view === "grid" && (buildGrid(), placeGrid()), 150); });

  // Umschalter nur zeigen, solange man im Arbeiten-Bereich ist
  new IntersectionObserver(([e]) => sw.classList.toggle("show", e.isIntersecting), { threshold: 0, rootMargin: "-50% 0px -50% 0px" }).observe(work);

  /* ── Animationsschleife ── */
  let inView = true;
  new IntersectionObserver(([e]) => (inView = e.isIntersecting)).observe(work);
  const tick = () => {
    // Grid-Sound: nur bei echter Bewegung (Ziehen oder Ausrollen), nicht beim langsamen Treiben
    let gSpeed = 0;
    const free = inView && lb.hidden && !caseOpen;
    if (free && view === "grid" && G) {
      const stale = drag && performance.now() - drag.t > 70;
      gSpeed = stale ? 0 : Math.hypot(G.vx, G.vy);
    }
    S.grid(gSpeed);
    if (free) {
      if (view === "grid" && G) {
        if (!drag) {
          G.ox += G.vx; G.oy += G.vy; G.vx *= 0.95; G.vy *= 0.95;
          if (!reduced && Math.abs(G.vx) < 0.35 && Math.abs(G.vy) < 0.05) G.vx += (-0.35 - G.vx) * 0.02; // leichtes Treiben
        }
        placeGrid();
      } else if (view === "wheel") {
        wIdle++;
        if (wIdle > 12) wTarget += (Math.round(wTarget) - wTarget) * 0.15; // einrasten
        wPos += (wTarget - wPos) * 0.14;
        placeWheel();
      }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  /* ── Sound-Schalter ── */
  const snd = $("#snd");
  const showSnd = (on) => { snd.classList.toggle("on", on); snd.setAttribute("aria-pressed", String(on)); snd.title = on ? "Sound aus" : "Sound an"; };
  if (window.Sound) {
    showSnd(window.Sound.enabled);
    snd.addEventListener("click", () => window.Sound.setEnabled(!window.Sound.enabled));
    document.addEventListener("kaizo-sound", (e) => showSnd(e.detail));
  } else snd.hidden = true;

  $("#year").textContent = new Date().getFullYear();

  /* ── Einblenden ── */
  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".label, .vcard, .ph, .tile, .contact > *").forEach((el) => { el.classList.add("reveal"); io.observe(el); });
    // Elemente, die nach Filterwechsel neu gerendert werden
    new MutationObserver(() => document.querySelectorAll("#gallery .ph:not(.reveal)").forEach((el) => { el.classList.add("reveal"); io.observe(el); })).observe($("#gallery"), { childList: true });
  }
})();

/* ─────────────────────────────────────────────────────────────
   FX — Ladebildschirm, Wipe-Übergänge, Buchstaben-Intro, Cursor
   ───────────────────────────────────────────────────────────── */
window.FX = (() => {
  const $ = (s) => document.querySelector(s);
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ── Wordmark in Buchstaben zerlegen ── */
  document.querySelectorAll(".wm-line").forEach((line, li) => {
    const txt = line.textContent.trim();
    line.innerHTML = [...txt].map((ch, i) => `<span class="ch" style="--i:${i + li * 5}">${ch}</span>`).join("");
  });

  /* ── Wipe: Fläche fährt von unten hoch, deckt ab, fährt oben raus ── */
  const wipeEl = $("#wipe");
  let wiping = false;
  const wipe = async (mid) => {
    if (reduced || wiping) { mid && mid(); return; }
    wiping = true;
    wipeEl.className = "wipe in";
    await wait(520);
    mid && mid();
    await wait(80);
    wipeEl.className = "wipe out";
    await wait(560);
    wipeEl.className = "wipe";
    wiping = false;
  };

  /* ── Ladebildschirm ── */
  const finish = () => { root.classList.remove("is-loading"); root.classList.add("is-loaded"); };
  if (!root.classList.contains("is-loading")) { finish(); }
  else {
    const loader = $("#loader"), countEl = $("#ld-count"), bar = $("#ld-bar");
    const t0 = performance.now(), MIN = 1500, MAX = 4500;
    let real = 0; // echter Fortschritt 0..1
    const imgs = [...document.images].filter((i) => !i.loading || i.loading !== "lazy");
    const tasks = [document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r, { once: true })))]
      .concat(imgs.slice(0, 6).map((i) => i.complete ? Promise.resolve() : new Promise((r) => { i.onload = i.onerror = r; })));
    let done = 0; tasks.forEach((p) => p.then(() => { done++; real = done / tasks.length; }));

    let shown = 0;
    const loop = () => {
      const t = performance.now() - t0;
      // Zähler folgt dem Minimum an Zeit UND dem echten Laden
      const timeP = Math.min(1, t / MIN), target = t > MAX ? 1 : Math.min(timeP, 0.15 + real * 0.85);
      shown += (target - shown) * 0.12;
      if (target >= 1 && shown > 0.995) shown = 1;
      const n = Math.round(shown * 100);
      countEl.textContent = String(n).padStart(3, "0");
      bar.style.transform = `scaleX(${shown})`;
      if (shown < 1) return requestAnimationFrame(loop);
      exit();
    };
    const exit = async () => {
      await wait(180);
      loader.classList.add("fill");        // Balken wächst auf ganzen Screen
      await wait(620);
      finish();                            // Seite darunter scharf schalten
      loader.classList.add("gone");        // Fläche fährt nach oben weg
      await wait(900);
      loader.remove();
    };
    requestAnimationFrame(loop);
  }

  /* ── Cursor ── */
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine && !reduced) {
    const cur = $("#cursor"), lab = $("#cursor-label");
    root.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, shown = false;
    addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; if (!shown) { shown = true; cx = x; cy = y; cur.classList.add("on"); } }, { passive: true });
    document.addEventListener("pointerleave", () => { shown = false; cur.classList.remove("on"); });
    const labelFor = (el) => {
      if (!el || !el.closest) return null;
      if (el.closest(".lightbox")) return el.closest(".lb-nav") ? "" : el.closest("iframe,video,img") ? null : "Close";
      if (el.closest(".vcard:not(.is-empty), .reel")) return "Play";
      if (el.closest(".gtile, .wpi, .tile")) return "Open";
      if (el.closest(".ph:not(.is-empty)")) return "View";
      if (el.closest(".wheel-list li")) return "";
      if (el.closest(".view-grid")) return "Drag";
      if (el.closest(".view-wheel")) return "Scroll";
      if (el.closest("a, button")) return "";
      return null;
    };
    document.addEventListener("pointerover", (e) => {
      const l = labelFor(e.target);
      cur.classList.toggle("big", !!l);
      cur.classList.toggle("hover", l === "");
      if (l) lab.textContent = l;
    });
    document.addEventListener("pointerdown", () => cur.classList.add("press"));
    document.addEventListener("pointerup", () => cur.classList.remove("press"));
    const tick = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  return { wipe };
})();

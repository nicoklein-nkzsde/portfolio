/* ─────────────────────────────────────────────────────────────
   SOUND DESIGN — alles live im Browser erzeugt (keine Audiodateien).
   Lautstärke gesamt: MASTER. Browser erlauben Ton erst nach einem
   Klick/Tap auf der Seite – vorher bleibt es still.
   ───────────────────────────────────────────────────────────── */
window.Sound = (() => {
  const MASTER = 0.9;
  let ctx = null, out = null, noiseBuf = null, enabled = true, lastTick = 0;
  let air = null; // Grid-Rauschen

  try { enabled = localStorage.getItem("kaizo-sound") !== "off"; } catch {}

  const ensure = () => {
    if (ctx) { if (ctx.state === "suspended") ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    ctx = new AC();
    out = ctx.createGain(); out.gain.value = enabled ? MASTER : 0;
    // sanfter Kompressor, damit nichts spitz wird
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 4;
    out.connect(comp).connect(ctx.destination);
    // 2 s rosa-ähnliches Rauschen als Rohmaterial
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0); let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.997 * b0 + w * 0.029; b1 = 0.985 * b1 + w * 0.032; b2 = 0.95 * b2 + w * 0.048;
      d[i] = (b0 + b1 + b2 + w * 0.05) * 0.9;
    }
  };
  // Audio erst nach echter Nutzer-Geste starten
  ["pointerdown", "keydown", "touchend"].forEach((ev) => addEventListener(ev, ensure, { passive: true }));

  const ready = () => ctx && enabled && ctx.state === "running";
  const noise = () => { const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true; return s; };

  /* Rad-Raste: kurzer, trockener Klick (Rauschimpuls + kleiner Ton) */
  const tick = (pitch = 1, vol = 1) => {
    if (!ready()) return;
    const now = ctx.currentTime;
    if (now - lastTick < 0.028) return; lastTick = now;
    const p = pitch * (0.96 + Math.random() * 0.08);
    const n = noise(), bp = ctx.createBiquadFilter(), g = ctx.createGain();
    bp.type = "bandpass"; bp.frequency.value = 3200 * p; bp.Q.value = 2.2;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.32 * vol, now + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
    n.connect(bp).connect(g).connect(out); n.start(now, Math.random() * 1.5); n.stop(now + 0.05);
    const o = ctx.createOscillator(), og = ctx.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(1700 * p, now); o.frequency.exponentialRampToValueAtTime(900 * p, now + 0.03);
    og.gain.setValueAtTime(0.0001, now);
    og.gain.exponentialRampToValueAtTime(0.06 * vol, now + 0.002);
    og.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
    o.connect(og).connect(out); o.start(now); o.stop(now + 0.05);
  };

  /* Anschlag am Ende des Rads: tiefer, weicher Thump */
  let lastThump = 0;
  const thump = () => {
    if (!ready()) return;
    const now = ctx.currentTime; if (now - lastThump < 0.25) return; lastThump = now;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(140, now); o.frequency.exponentialRampToValueAtTime(55, now + 0.18);
    g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(0.35, now + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    o.connect(g).connect(out); o.start(now); o.stop(now + 0.25);
  };

  /* Öffnen: kurzer Luftzug nach oben */
  const whoosh = (up = true) => {
    if (!ready()) return;
    const now = ctx.currentTime, n = noise(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    f.type = "bandpass"; f.Q.value = 0.9;
    f.frequency.setValueAtTime(up ? 400 : 2400, now); f.frequency.exponentialRampToValueAtTime(up ? 2600 : 380, now + 0.35);
    g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(0.22, now + 0.08); g.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
    n.connect(f).connect(g).connect(out); n.start(now, Math.random()); n.stop(now + 0.45);
  };

  /* Grid: dauerhaftes Luft-Rauschen, Lautstärke/Helligkeit folgt der Geschwindigkeit */
  const grid = (speed) => {
    if (!ctx || ctx.state !== "running") return;
    if (!air) {
      const n = noise(), lp = ctx.createBiquadFilter(), hp = ctx.createBiquadFilter(), g = ctx.createGain();
      lp.type = "lowpass"; lp.frequency.value = 300; lp.Q.value = 0.6;
      hp.type = "highpass"; hp.frequency.value = 90;
      g.gain.value = 0;
      n.connect(hp).connect(lp).connect(g).connect(out); n.start();
      air = { lp, g };
    }
    const s = Math.min(1, Math.max(0, (speed - 0.6) / 28));
    const t = ctx.currentTime;
    air.g.gain.setTargetAtTime(enabled ? s * 0.5 : 0, t, 0.08);
    air.lp.frequency.setTargetAtTime(280 + s * 2600, t, 0.08);
  };

  const setEnabled = (on) => {
    enabled = on; ensure();
    try { localStorage.setItem("kaizo-sound", on ? "on" : "off"); } catch {}
    if (out) out.gain.setTargetAtTime(on ? MASTER : 0, ctx.currentTime, 0.05);
    document.dispatchEvent(new CustomEvent("kaizo-sound", { detail: on }));
    if (on) setTimeout(() => tick(1.2), 60);
  };

  return { tick, thump, whoosh, grid, setEnabled, get enabled() { return enabled; } };
})();

/* ─────────────────────────────────────────────────────────────
   DEIN PORTFOLIO — nur diese Datei bearbeiten.

   SHOWREEL
     loop:  kurzer stummer Clip als Hintergrund oben (mp4, 10–20 s, < 10 MB)
            -> Datei nach /media, z. B. "media/reel-loop.mp4"
     full:  komplettes Reel als YouTube- oder Vimeo-Link

   VIDEOS   src = YouTube-/Vimeo-Link ODER eigene mp4 ("media/xyz.mp4")
            poster = Vorschaubild (bei YouTube automatisch)
            preview = kurzer stummer Clip, der beim Drüberfahren läuft (optional)
            vertical: true für Reels/Hochformat
   FOTOS    src = Bild in /photos (JPG, lange Kante ~2400 px, < 700 KB)
            cat = frei wählbar, wird automatisch zum Filter
   GRAFIK   src = Bild in /grafik
   (Websites stehen in projects.js)
   ───────────────────────────────────────────────────────────── */

window.SHOWREEL = {
  loop: "https://youtu.be/M5AAtJu4wNc",   // läuft stumm im Hintergrund (YouTube-Link oder mp4)
  full: "https://youtu.be/M5AAtJu4wNc",   // öffnet sich beim Klick auf "Showreel"
  credit: "Soufian — Kompass · DoP",      // kleine Zeile unten rechts
};

window.VIDEOS = [
  // badge = kleines Label oben links auf der Kachel (optional)
  { title: "Soufian — Kompass", type: "Album-Trailer · DoP", src: "https://youtu.be/M5AAtJu4wNc", badge: "250K+ Views" },
  { title: "Cinematic", type: "Solo-Film · Kamera, Regie & Schauspiel", src: "https://youtu.be/vBig1kVT0Qw", badge: "Nur natürliches Licht" },
  // Reels (Hochformat) z. B.: { title: "Reel", type: "Social", src: "https://youtube.com/shorts/…", vertical: true },
];

/* MITARBEIT — Projekte, bei denen du nur geholfen hast.
   Erscheinen NUR ganz unten im eigenen Bereich, klar mit deiner Rolle markiert,
   nicht im Grid/Wheel und nicht bei deinen eigenen Filmen. */
window.ASSISTS = [
  {
    title: "NovoTech Megawood",
    context: "Entstanden bei Knumox · 4 Drehtage im Zweierteam",
    role: "Unterstützung am Set, Licht & Aufbau",
    credit: "Die Hauptarbeit bei diesem Dreh hat mein Kollege gemacht – ich habe ihn unterstützt.",   // Name gern ergänzen
    src: "https://youtu.be/cfSJ8Xp8BHE",
  },
];

window.PHOTOS = [
  // w/h nur für die Form der Platzhalter
  { src: "", alt: "", cat: "Portrait", w: 4, h: 5 },
  { src: "", alt: "", cat: "Automotive", w: 3, h: 2 },
  { src: "", alt: "", cat: "Event", w: 3, h: 2 },
  { src: "", alt: "", cat: "Portrait", w: 2, h: 3 },
  { src: "", alt: "", cat: "Automotive", w: 4, h: 5 },
  { src: "", alt: "", cat: "Event", w: 2, h: 3 },
  { src: "", alt: "", cat: "Portrait", w: 3, h: 2 },
  { src: "", alt: "", cat: "Produkt", w: 1, h: 1 },
  { src: "", alt: "", cat: "Produkt", w: 4, h: 5 },
];

window.GRAPHICS = [
  // { src: "grafik/logo-xyz.jpg", title: "Logo XYZ" },
];

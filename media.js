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
  // Reels (Hochformat): YouTube-Shorts- oder Instagram-Reel-Link, vertical: true
  { title: "Hafty Barbershop — Opening", type: "Reel · Opening-Film", src: "https://www.instagram.com/reel/Df5Sz31glAL/", poster: "media/hafty-opening.jpg", vertical: true },
  { title: "Hafty — Behind the Chair", type: "Reel · Barber bei der Arbeit", src: "https://www.instagram.com/reel/DZ0dgrLRwWG/", poster: "media/hafty-barber.jpg", vertical: true },
];

/* MITARBEIT — Projekte, bei denen du nur geholfen hast.
   Erscheinen NUR ganz unten im eigenen Bereich, klar mit deiner Rolle markiert,
   nicht im Grid/Wheel und nicht bei deinen eigenen Filmen. */
window.ASSISTS = [
  {
    title: "NovoTech Megawood",
    context: "Entstanden bei Knumox · 4 Drehtage im Zweierteam",
    role: "Unterstützung am Set, Licht & Aufbau · Fotografie",
    credit: "Die Hauptarbeit bei diesem Dreh hat mein Kollege gemacht – ich habe ihn unterstützt.",   // Name gern ergänzen
    src: "https://youtu.be/cfSJ8Xp8BHE",
  },
];

window.PHOTOS = [
  // title  = Name im Wheel/Grid · caption = Zeile in der Vollbild-Ansicht
  // cat    = Filter (ab 2 verschiedenen Kategorien erscheinen Filter-Knöpfe)
  { src: "photos/novotech-stroh.jpg",    title: "NovoTech — Rohstoff",  alt: "Hand lässt Stroh-Fasern in eine Kiste rieseln", cat: "Industrie", caption: "NovoTech Megawood · Knumox", w: 3, h: 2 },
  { src: "photos/novotech-maschine.jpg", title: "NovoTech — Maschine",  alt: "Druckkopf einer Maschine mit Spiegelung", cat: "Industrie", caption: "NovoTech Megawood · Knumox", w: 3, h: 2 },
  { src: "photos/novotech-halle.jpg",    title: "NovoTech — Halle",     alt: "Stahlrahmen am Kran in einer Industriehalle", cat: "Industrie", caption: "NovoTech Megawood · Knumox", w: 3, h: 2 },
  { src: "photos/novotech-schale.jpg",   title: "NovoTech — Labor",     alt: "Siebschale mit feinem Holzmehl", cat: "Industrie", caption: "NovoTech Megawood · Knumox", w: 3, h: 2 },
  { src: "photos/novotech-fraese.jpg",   title: "NovoTech — Werkstatt", alt: "Mitarbeiter fräst eine Dielenkante", cat: "Industrie", caption: "NovoTech Megawood · Knumox", w: 3, h: 2 },
];

window.GRAPHICS = [
  // { src: "grafik/logo-xyz.jpg", title: "Logo XYZ" },
];

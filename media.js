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
  { title: "Schwarzwald — Emirhansyz", type: "Kooperation · Schwarzwaldhaus Wolftal", src: "https://www.instagram.com/p/DfK29musKGC/", poster: "media/wolftal.jpg" },
  // Reels (Hochformat): YouTube-Shorts- oder Instagram-Reel-Link, vertical: true
  { title: "Hafty Barbershop — Opening", type: "Reel · Opening-Film", src: "https://www.instagram.com/reel/Df5Sz31glAL/", poster: "media/hafty-opening.jpg", vertical: true },
  { title: "Sticker Collective — Rave Recap", type: "Aftermovie · Werbung", src: "https://www.instagram.com/p/Dc1KxHmNHCh/", poster: "media/sticker-rave.jpg", vertical: true },
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
  // Reihenfolge = Reihenfolge in der Galerie (bewusst gemischt)
  { src: "photos/hochzeit-1.jpg",        title: "Hochzeit — Die Jungs",  alt: "Bräutigam mit seinen Freunden, schwarz-weiß", cat: "Hochzeit", caption: "Hochzeit · Brüder. Freunde. Familie.", w: 3, h: 4 },
  { src: "photos/novotech-stroh.jpg",    title: "NovoTech — Rohstoff",  alt: "Hand lässt Stroh-Fasern in eine Kiste rieseln", cat: "Industrie", caption: "NovoTech Megawood · Knumox", w: 3, h: 2 },
  { src: "photos/cutiq-1.jpg",           title: "cutiq — Made with Love", alt: "Handgemachtes Kinderkleid mit Anhänger", cat: "Produkt", caption: "cutiq.ev · Handgemachte Baby- & Kinderkleidung", w: 1, h: 1 },
  { src: "photos/bts-soufian-1.jpg",     title: "BTS — Soufian am Monitor", alt: "Nico zeigt Soufian den Monitor am Set", cat: "BTS", caption: "Behind the Scenes · Soufian — Kompass", w: 3, h: 4 },
  { src: "photos/novotech-maschine.jpg", title: "NovoTech — Maschine",  alt: "Druckkopf einer Maschine mit Spiegelung", cat: "Industrie", caption: "NovoTech Megawood · Knumox", w: 3, h: 2 },
  { src: "photos/hochzeit-2.jpg",        title: "Hochzeit — Am Tisch",  alt: "Bräutigam und Freunde sitzend, schwarz-weiß", cat: "Hochzeit", caption: "Hochzeit · Brüder. Freunde. Familie.", w: 3, h: 4 },
  { src: "photos/cutiq-4.jpg",           title: "cutiq — Stand",        alt: "Marktstand von cutiq mit Kinderkleidung", cat: "Produkt", caption: "cutiq.ev · Handgemachte Baby- & Kinderkleidung", w: 1, h: 1 },
  { src: "photos/novotech-halle.jpg",    title: "NovoTech — Halle",     alt: "Stahlrahmen am Kran in einer Industriehalle", cat: "Industrie", caption: "NovoTech Megawood · Knumox", w: 3, h: 2 },
  { src: "photos/bts-soufian-2.jpg",     title: "BTS — Am Set",         alt: "Nico an der Kamera mit Soufian am Set", cat: "BTS", caption: "Behind the Scenes · Soufian — Kompass", w: 3, h: 4 },
  { src: "photos/cutiq-2.jpg",           title: "cutiq — Kollektion",   alt: "Kinderkleider auf Holzbügeln", cat: "Produkt", caption: "cutiq.ev · Handgemachte Baby- & Kinderkleidung", w: 1, h: 1 },
  { src: "photos/hochzeit-3.jpg",        title: "Hochzeit — Zu viert",  alt: "Vier Männer im Anzug, schwarz-weiß", cat: "Hochzeit", caption: "Hochzeit · Brüder. Freunde. Familie.", w: 3, h: 4 },
  { src: "photos/novotech-schale.jpg",   title: "NovoTech — Labor",     alt: "Siebschale mit feinem Holzmehl", cat: "Industrie", caption: "NovoTech Megawood · Knumox", w: 3, h: 2 },
  { src: "photos/cutiq-5.jpg",           title: "cutiq — Nightmarket",  alt: "cutiq-Stand auf dem Nightmarket", cat: "Produkt", caption: "cutiq.ev · Handgemachte Baby- & Kinderkleidung", w: 1, h: 1 },
  { src: "photos/novotech-fraese.jpg",   title: "NovoTech — Werkstatt", alt: "Mitarbeiter fräst eine Dielenkante", cat: "Industrie", caption: "NovoTech Megawood · Knumox", w: 3, h: 2 },
  { src: "photos/cutiq-3.jpg",           title: "cutiq — Markt",        alt: "Marktstand mit Banner und Kleidung", cat: "Produkt", caption: "cutiq.ev · Handgemachte Baby- & Kinderkleidung", w: 1, h: 1 },
];

window.GRAPHICS = [
  // { src: "grafik/logo-xyz.jpg", title: "Logo XYZ" },
];

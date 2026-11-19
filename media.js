/* ─────────────────────────────────────────────────────────────
   DEIN PORTFOLIO — nur diese Datei bearbeiten.

   Jede Arbeit ist ein PROJEKT (= ein Ordner): Titel + Videos + Fotos.
   Im Wheel/Grid erscheint jedes Projekt genau einmal. Klick öffnet die
   Projektseite: oben Video(s), darunter alle Fotos.
   Eigener Link pro Projekt: …/portfolio/#p/<id>

   PROJEKT-FELDER
     id      kurzer Name für den Link (klein, ohne Leerzeichen)
     title   Titel · type = Art & deine Rolle · client = Kunde (optional)
     badge   kleines Label (optional) · cover = Titelbild (sonst automatisch)
     cat     Foto-Kategorie für die Filter (kann pro Foto überschrieben werden)
     videos  [{ src, poster?, vertical?, label?, mitarbeit?, note? }]
             src = YouTube-, Vimeo-, Instagram-Link oder eigene mp4
     photos  [{ src, alt, cat? }]  -> Bilder in /photos

   Reihenfolge hier = Reihenfolge auf der Seite.
   ───────────────────────────────────────────────────────────── */

window.SHOWREEL = {
  loop: "https://youtu.be/M5AAtJu4wNc",   // läuft stumm im Hintergrund (YouTube-Link oder mp4)
  full: "https://youtu.be/M5AAtJu4wNc",   // öffnet sich beim Klick auf "Showreel"
  credit: "Soufian — Kompass · DoP",      // kleine Zeile unten rechts
};

window.WORKS = [
  {
    id: "soufian",
    title: "Soufian — Kompass",
    type: "Album-Trailer · DoP",
    badge: "250K+ Views",
    cat: "BTS",
    videos: [{ src: "https://youtu.be/M5AAtJu4wNc" }],
    photos: [
      { src: "photos/bts-soufian-1.jpg", alt: "Nico zeigt Soufian den Monitor am Set" },
      { src: "photos/bts-soufian-2.jpg", alt: "Nico an der Kamera mit Soufian am Set" },
    ],
  },
  {
    id: "hochzeit",
    title: "Hochzeit — Die Jungs",
    type: "Fotografie · Schwarz-Weiß",
    cat: "Hochzeit",
    photos: [
      { src: "photos/hochzeit-1.jpg", alt: "Bräutigam mit seinen Freunden" },
      { src: "photos/hochzeit-2.jpg", alt: "Bräutigam und Freunde sitzend" },
      { src: "photos/hochzeit-3.jpg", alt: "Vier Männer im Anzug" },
    ],
  },
  {
    id: "cinematic",
    title: "Cinematic",
    type: "Solo-Film · Kamera, Regie & Schauspiel",
    badge: "Nur natürliches Licht",
    videos: [{ src: "https://youtu.be/vBig1kVT0Qw" }],
  },
  {
    id: "novotech",
    title: "NovoTech Megawood",
    type: "Industrie · Fotografie",
    client: "Knumox",
    cat: "Industrie",
    cover: "photos/novotech-stroh.jpg",
    photos: [
      { src: "photos/novotech-stroh.jpg", alt: "Hand lässt Stroh-Fasern in eine Kiste rieseln" },
      { src: "photos/novotech-maschine.jpg", alt: "Druckkopf einer Maschine mit Spiegelung" },
      { src: "photos/novotech-halle.jpg", alt: "Stahlrahmen am Kran in einer Industriehalle" },
      { src: "photos/novotech-schale.jpg", alt: "Siebschale mit feinem Holzmehl" },
      { src: "photos/novotech-fraese.jpg", alt: "Mitarbeiter fräst eine Dielenkante" },
    ],
    // Film = Mitarbeit -> wird in der Projektseite klar so markiert
    videos: [{
      src: "https://youtu.be/cfSJ8Xp8BHE",
      label: "Imagefilm",
      mitarbeit: true,
      note: "Mitarbeit: Unterstützung am Set, Licht & Aufbau. Die Hauptarbeit bei diesem Film hat mein Kollege gemacht – ich habe ihn unterstützt. Die Fotos oben sind von mir.",
    }],
    videosAfterPhotos: true,
  },
  {
    id: "hafty",
    title: "Hafty Barbershop",
    type: "Reels · Opening-Film & Barber bei der Arbeit",
    videos: [
      { src: "https://www.instagram.com/reel/Df5Sz31glAL/", poster: "media/hafty-opening.jpg", vertical: true, label: "Opening" },
      { src: "https://www.instagram.com/reel/DZ0dgrLRwWG/", poster: "media/hafty-barber.jpg", vertical: true, label: "Behind the Chair" },
    ],
  },
  {
    id: "cutiq",
    title: "cutiq",
    type: "Produkt · Handgemachte Baby- & Kinderkleidung",
    client: "cutiq.ev",
    cat: "Produkt",
    photos: [
      { src: "photos/cutiq-1.jpg", alt: "Handgemachtes Kinderkleid mit Anhänger" },
      { src: "photos/cutiq-4.jpg", alt: "Marktstand von cutiq mit Kinderkleidung" },
      { src: "photos/cutiq-2.jpg", alt: "Kinderkleider auf Holzbügeln" },
      { src: "photos/cutiq-5.jpg", alt: "cutiq-Stand auf dem Nightmarket" },
      { src: "photos/cutiq-3.jpg", alt: "Marktstand mit Banner und Kleidung" },
    ],
  },
  {
    id: "schwarzwald",
    title: "Schwarzwald — Emirhansyz",
    type: "Kooperation · Schwarzwaldhaus Wolftal",
    videos: [{ src: "https://www.instagram.com/p/DfK29musKGC/", poster: "media/wolftal.jpg" }],
  },
  {
    id: "sticker",
    title: "Sticker Collective — Rave Recap",
    type: "Aftermovie · Werbung",
    videos: [{ src: "https://www.instagram.com/p/Dc1KxHmNHCh/", poster: "media/sticker-rave.jpg", vertical: true }],
  },
];

/* MITARBEIT — Projekte, bei denen du nur geholfen hast.
   Erscheinen zusätzlich ganz unten im eigenen Bereich, klar mit deiner Rolle markiert. */
window.ASSISTS = [
  {
    title: "NovoTech Megawood",
    context: "Entstanden bei Knumox · 4 Drehtage im Zweierteam",
    role: "Unterstützung am Set, Licht & Aufbau · Fotografie",
    credit: "Die Hauptarbeit bei diesem Dreh hat mein Kollege gemacht – ich habe ihn unterstützt.",   // Name gern ergänzen
    src: "https://youtu.be/cfSJ8Xp8BHE",
    project: "novotech",
  },
];

window.GRAPHICS = [
  // { src: "grafik/logo-xyz.jpg", title: "Logo XYZ" },
];

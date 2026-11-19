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

/* ACCOUNTS — wer den Post hochgeladen hat (erscheint als Leiste über Fotos/Videos).
   Bei Fotos/Videos: by = Account, post = Link zum Original-Post, with = Collab-Partner.
   Steht by/post/with beim Projekt, gilt es für alle Fotos + kurzen Clips des Projekts.
   Doppelklick auf ein Bild öffnet den Original-Post. */
window.ACCOUNTS = {
  soufian:      { name: "soufian", avatar: "media/avatars/soufian.jpg", verified: true },
  alfrt:        { name: "alfrt.ben", avatar: "media/avatars/alfrt.ben.jpg" },
  just1n:       { name: "just1n.wiens" },
  n1coklein:    { name: "n1coklein", avatar: "media/avatars/n1coklein.jpg" },
  kaizostudios: { name: "kaizostudios" },
  hafty:        { name: "hafty_barbershop", avatar: "media/avatars/hafty_barbershop.jpg" },
  haftys:       { name: "haftys_barber", avatar: "media/avatars/haftys_barber.jpg" },
  family353:    { name: "family_barbershop_353" },
  cutiq:        { name: "cutiq.ev", avatar: "media/avatars/cutiq.ev.jpg" },
  trione:       { name: "trione.store", avatar: "media/avatars/trione.store.jpg" },
  emirhansyz:   { name: "emirhansyz", avatar: "media/avatars/emirhansyz.jpg" },
  wolftal:      { name: "schwarzwaldhaus_wolftal" },
  sticker:      { name: "sticker.collective", avatar: "media/avatars/sticker.collective.jpg" },
  hmra:         { name: "hmra_events" },
  azzlackz:     { name: "Azzlackz", platform: "youtube", avatar: "media/avatars/yt-Azzlackz.jpg" },
  nicokaizo:    { name: "Nicokaizo", platform: "youtube", avatar: "media/avatars/yt-Nicokaizo.jpg" },
};

window.WORKS = [
  {
    id: "soufian",
    title: "Soufian — Kompass",
    type: "Album-Trailer · DoP",
    badge: "250K+ Views",
    cat: "BTS",
    by: "soufian", post: "https://www.instagram.com/p/DfSR-rxAiqh/",
    videos: [{ src: "https://youtu.be/M5AAtJu4wNc", by: "azzlackz" }],
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
    by: "alfrt", with: ["just1n"], post: "https://www.instagram.com/p/DdTt05OjYBU/",
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
    videos: [{ src: "https://youtu.be/vBig1kVT0Qw", by: "nicokaizo" }],
  },
  {
    id: "bosbach",
    title: "Heinz Bosbach — Dokumentation",
    type: "Dokumentation · Kamera & Color · Sony FX3",
    badge: "4K",
    cat: "Doku",
    cover: "photos/bosbach-doku-2.jpg",
    videos: [
      { src: "https://youtu.be/OVsVChVri2Q", by: "nicokaizo", label: "Cyprus" },
      { src: "media/bosbach-immo.mp4", poster: "media/bosbach-immo.jpg", label: "Bosbach Immo" },
      { src: "media/bts-clip-2.mp4", loop: true, vertical: true, ratio: "3/4", by: "n1coklein", with: ["kaizostudios"], post: "https://www.instagram.com/p/DbI-NRsjdNO/" },  // BTS Bosbach Consulting
    ],
    photos: [
      // Color-Grading-Standbilder aus der Doku
      { src: "photos/bosbach-doku-2.jpg", alt: "Interview-Standbild, Color Grading" },
      { src: "photos/bosbach-doku-1.jpg", alt: "Interview-Standbild im Wohnzimmer, Color Grading" },
      { src: "photos/bosbach-doku-3.jpg", alt: "Interview-Standbild im Sessel, Color Grading" },
      // BTS vom Set (steht zusätzlich auch im Projekt "Behind the Scenes")
      { src: "photos/bts-1.jpg", alt: "Interview-Set mit Heinz Bosbach in einer Industriehalle", cat: "BTS", by: "n1coklein", with: ["kaizostudios"], post: "https://www.instagram.com/p/DbI-NRsjdNO/" },
    ],
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
      by: "nicokaizo",
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
      { src: "https://www.instagram.com/reel/Df5Sz31glAL/", poster: "media/hafty-opening.jpg", vertical: true, label: "Opening", by: "hafty", with: ["haftys"] },
      { src: "https://www.instagram.com/reel/DZ0dgrLRwWG/", poster: "media/hafty-barber.jpg", vertical: true, label: "Behind the Chair", by: "haftys", with: ["family353"] },
    ],
  },
  {
    id: "cutiq",
    title: "cutiq",
    type: "Produkt · Handgemachte Baby- & Kinderkleidung",
    client: "cutiq.ev",
    cat: "Produkt",
    by: "cutiq", with: ["n1coklein"], post: "https://www.instagram.com/p/DZDpnRaCLrV/",
    photos: [
      { src: "photos/cutiq-1.jpg", alt: "Handgemachtes Kinderkleid mit Anhänger" },
      { src: "photos/cutiq-4.jpg", alt: "Marktstand von cutiq mit Kinderkleidung" },
      { src: "photos/cutiq-2.jpg", alt: "Kinderkleider auf Holzbügeln" },
      { src: "photos/cutiq-5.jpg", alt: "cutiq-Stand auf dem Nightmarket" },
      { src: "photos/cutiq-3.jpg", alt: "Marktstand mit Banner und Kleidung" },
    ],
  },
  {
    id: "trione",
    title: "Trione — Sunday Between the Towers",
    type: "Event · Reel & Fotografie",
    client: "trione.store",
    cat: "Event",
    cover: "photos/trione-1.jpg",
    by: "trione", post: "https://www.instagram.com/p/Df0FfYQjbzF/",
    videos: [
      { src: "media/trione-reel.mp4", poster: "media/trione-reel.jpg", vertical: true, label: "Reel", by: "trione", post: "https://www.instagram.com/reel/Dfr1x4-Nd6U/" },
      { src: "media/trione-clip-1.mp4", loop: true, vertical: true, ratio: "4/5" },
      { src: "media/trione-clip-2.mp4", loop: true, vertical: true, ratio: "4/5" },
      { src: "media/trione-clip-3.mp4", loop: true, vertical: true, ratio: "4/5" },
      { src: "media/trione-clip-4.mp4", loop: true, vertical: true, ratio: "4/5" },
      { src: "media/trione-clip-5.mp4", loop: true, vertical: true, ratio: "4/5" },
    ],
    photos: [
      { src: "photos/trione-1.jpg", alt: "Pilates-Gruppe auf einer Dachterrasse zwischen Hochhäusern" },
      { src: "photos/trione-2.jpg", alt: "Pilates-Matte mit Trione-Logo von oben" },
      { src: "photos/trione-3.jpg", alt: "Schale mit Trione-Pilates-Socken" },
      { src: "photos/trione-4.jpg", alt: "Hände greifen in eine Box mit Snacks" },
    ],
  },
  {
    id: "kroatien",
    title: "Ulja Komarija — Kroatien",
    type: "Event · Fotografie",
    client: "Knumox · in Kooperation mit Ulja Komarija",
    badge: "Mai 2025",
    cat: "Event",
    by: "n1coklein", post: "https://www.instagram.com/p/DbI8Y3kjVoX/",
    photos: [
      { src: "photos/kroatien-3.jpg", alt: "Olivenöl-Flasche mit Brot und Öl im Sonnenlicht" },
      { src: "photos/kroatien-1.jpg", alt: "Geschenkbox mit drei Olivenöl-Flaschen" },
      { src: "photos/kroatien-4.jpg", alt: "Olivenöl wird über Häppchen gegossen" },
      { src: "photos/kroatien-2.jpg", alt: "Tisch mit Olivenöl-Flaschen im Steinbruch" },
      { src: "photos/kroatien-5.jpg", alt: "Tafel von Komarija mit Ölsorten" },
    ],
  },
  {
    id: "bts",
    title: "Behind the Scenes",
    type: "BTS · Fotos & Clips von meinen Sets",
    cat: "BTS",
    cover: "photos/bts-1.jpg",
    by: "n1coklein", with: ["kaizostudios"], post: "https://www.instagram.com/p/DbI-NRsjdNO/",
    photos: [
      { src: "photos/bts-1.jpg", alt: "Interview-Set in einer Industriehalle" },
      { src: "photos/bts-2.jpg", alt: "Cinema-Kamera-Rig mit Monitor" },
      { src: "photos/bts-10.jpg", alt: "Nico mit Kamera, schwarz-weiß" },
      { src: "photos/bts-6.jpg", alt: "Rapper auf der Bühne" },
      { src: "photos/bts-9.jpg", alt: "Maskierter Künstler am Set" },
      { src: "photos/bts-5.jpg", alt: "Crew am Monitor, schwarz-weiß" },
      { src: "photos/bts-4.jpg", alt: "Kamera mit Gimbal im Dunkeln" },
      { src: "photos/bts-3.jpg", alt: "Kamera-Equipment im Regal" },
      { src: "photos/bts-7.jpg", alt: "Interview-Set im Büro" },
      { src: "photos/bts-8.jpg", alt: "Spiegel-Selfie im Aufzug mit Kamera" },
    ],
    // kurze Clips: laufen stumm in Schleife, Klick = groß mit Ton
    videos: [
      { src: "media/bts-clip-2.mp4", loop: true, vertical: true, ratio: "3/4" },
      { src: "media/bts-clip-4.mp4", loop: true, vertical: true, ratio: "3/4" },
      { src: "media/bts-clip-1.mp4", loop: true, vertical: true, ratio: "3/4" },
      { src: "media/bts-clip-3.mp4", loop: true, vertical: true, ratio: "3/4" },
    ],
  },
  {
    id: "honey",
    title: "HoneyDaBandit — Men in Black",
    type: "Musikvideo · Release-Teaser",
    badge: "April 2026",
    videos: [{ src: "media/honey-mib.mp4", poster: "media/honey-mib.jpg", vertical: true, label: "MIB — Out Now" }],
  },
  {
    id: "paris",
    title: "Paris",
    type: "Travel · Cinematic Vlog",
    videos: [{ src: "media/paris.mp4", poster: "media/paris.jpg" }],
  },
  {
    id: "david",
    title: "David Gartenbau",
    type: "Werbeclip · 10 Sekunden",
    videos: [{ src: "media/david-gartenbau.mp4", poster: "media/david-gartenbau.jpg" }],
  },
  {
    id: "drohne",
    title: "Golden Hour",
    type: "Drohne · Cinematic",
    videos: [{ src: "media/drone.mp4", poster: "media/drone.jpg" }],
  },
  {
    id: "birkenmeier",
    title: "Birkenmeier — Grünwand",
    type: "Corporate · Fotografie",
    badge: "Mai 2025",
    cat: "Corporate",
    cover: "photos/birkenmeier-7.jpg",
    photos: [
      { src: "photos/birkenmeier-7.jpg", alt: "Begrünte Fassade vor weißem Gebäude" },
      { src: "photos/birkenmeier-6.jpg", alt: "Besucher vor der Grünwand" },
      { src: "photos/birkenmeier-1.jpg", alt: "Blaue Blüte vor der Grünwand" },
      { src: "photos/birkenmeier-3.jpg", alt: "Gruppe bei der Besichtigung" },
      { src: "photos/birkenmeier-5.jpg", alt: "Lachender Teilnehmer bei der Besichtigung" },
      { src: "photos/birkenmeier-2.jpg", alt: "Gruppe auf einer Wiese" },
      { src: "photos/birkenmeier-4.jpg", alt: "Gespräch im Garten" },
    ],
  },
  {
    id: "hainmueller",
    title: "Hainmüller",
    type: "Social Media · Fotografie",
    badge: "Juli 2025",
    cat: "Architektur",
    cover: "photos/hainmueller-3.jpg",
    photos: [
      { src: "photos/hainmueller-3.jpg", alt: "Weißer Pavillon mit Holzdeck im Garten" },
      { src: "photos/hainmueller-2.jpg", alt: "Outdoor-Küche mit Edelstahlgrill" },
      { src: "photos/hainmueller-5.jpg", alt: "Pavillon mit Außendusche" },
      { src: "photos/hainmueller-4.jpg", alt: "Außendusche aus Beton" },
      { src: "photos/hainmueller-1.jpg", alt: "Detail eines Edelstahlgrills" },
    ],
  },
  {
    id: "salomon",
    title: "Salomon",
    type: "Produkt · Outdoor-Schuhe",
    cat: "Produkt",
    photos: [
      { src: "photos/salomon-1.jpg", alt: "Salomon-Schuh im Gras" },
      { src: "photos/salomon-2.jpg", alt: "Salomon-Schuhe beim Wandern" },
    ],
  },
  {
    id: "schwarzwald",
    title: "Schwarzwald — Emirhansyz",
    type: "Kooperation · Schwarzwaldhaus Wolftal",
    videos: [{ src: "https://www.instagram.com/p/DfK29musKGC/", poster: "media/wolftal.jpg", by: "emirhansyz", with: ["wolftal"] }],
  },
  {
    id: "sticker",
    title: "Sticker Collective — Rave Recap",
    type: "Aftermovie · Werbung",
    videos: [{ src: "https://www.instagram.com/p/Dc1KxHmNHCh/", poster: "media/sticker-rave.jpg", vertical: true, by: "sticker", with: ["hmra"] }],
  },
];

/* WER BIN ICH — eigene Seite (Link: …/portfolio/#p/ueber, oben im Menü "Über")
   text = Absätze. Einfach umschreiben/ergänzen. */
window.ABOUT = {
  kicker: "Wer bin ich",
  name: "Nico Klein",
  aka: "aka KaizoStudios",
  text: [
    "Ich bin Nico – Fotograf und Videograf aus Gießen. Unter dem Namen KaizoStudios fotografiere und filme ich zwischen Gießen und Frankfurt für Artists, Marken und Events.",
    "Meine Arbeit reicht vom Album-Trailer für Soufian über Dokumentationen bis zu Produkt-, Event- und Corporate-Fotografie. Bei Knumox habe ich als Videograf mit Schwerpunkt Fotografie gearbeitet – heute bin ich mit KaizoStudios selbst unterwegs.",
  ],
  facts: [
    ["Basis", "Gießen / Frankfurt"],
    ["Fokus", "Foto & Film"],
    ["Referenz", "Soufian — Kompass · 250K+ Views"],
    ["Kamera", "Sony FX3 · Sony a7 IV"],
  ],
  photos: [
    { src: "photos/nico-1.jpg", alt: "Nico mit Kamera" },
    { src: "photos/nico-7.jpg", alt: "Nico im Profil, schwarz-weiß" },
    { src: "photos/nico-2.jpg", alt: "Nico mit Kamera, schwarz-weiß" },
    { src: "photos/nico-6.jpg", alt: "Nico mit Kamera im Innenhof" },
    { src: "photos/nico-3.jpg", alt: "Nachtdreh auf dem Zebrastreifen" },
    { src: "photos/nico-5.jpg", alt: "Nico von oben mit Kamera" },
    { src: "photos/nico-4.jpg", alt: "Nico mit Gimbal in der Nacht" },
  ],
};

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

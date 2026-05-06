import { useState, useRef } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

const LISTINGS = [
  {
    id: 1, type: "Loft", status: "Contract Pending",
    address: "16 W 19th St, Unit 3D", neighborhood: "Flatiron", city: "New York, NY",
    price: null, beds: 1, baths: 1, sqft: 907,
    img: "https://i.imgur.com/5gkLnzP.jpg",
    gallery: [
      { url: "https://i.imgur.com/GDR0Wae.jpg", label: "Dining Area" },
      { url: "https://i.imgur.com/TTzZt3X.jpg", label: "Living Room Detail" },
      { url: "https://i.imgur.com/8UC5ENm.jpg", label: "Bedroom" },
      { url: "https://i.imgur.com/5gkLnzP.jpg", label: "Living Room" },
      { url: "https://i.imgur.com/NHrnvBt.jpg", label: "Loft" },
      { url: "https://i.imgur.com/D0DSD7I.jpg", label: "Rooftop Lounge" },
      { url: "https://i.imgur.com/Q8sJUfU.jpg", label: "Entrance" },
      { url: "https://i.imgur.com/gbcIs4v.jpg", label: "Full Bathroom — Dual Sinks" },
      { url: "https://i.imgur.com/qStcztJ.jpg", label: "Kitchen" },
      { url: "https://i.imgur.com/itNqcxC.jpg", label: "Hallway" },
      { url: "https://i.imgur.com/BigvFHn.jpg", label: "Gym" },
      { url: "https://i.imgur.com/yN0dMJS.jpg", label: "Rooftop Terrace" },
    ],
    tags: ["24/7 Doorman", "Rooftop Terrace", "Sauna", "In-Unit W/D", "Juliet Balconies"],
    featured: true,
    desc: "Own a piece of downtown cool in this rare 1-bedroom loft at JADE — a boutique 57-unit full-service condo in a converted commercial building designed by Jade Jagger. Authentic loft with high ceilings, premium blonde hardwood floors, oversized south-facing windows, two Juliet balconies, and a sleek lacquered kitchen with Sub-Zero & Miele appliances. The spacious bathroom features a double vanity and dual rain shower. Building amenities include a penthouse-level fitness center, sauna, lounge, and a stunning rooftop terrace with nearly 360° city views.",
    year: 1913, parking: false, pet: true, building: "Jade NYC",
    contractNote: "Contract finalization in progress. Price to be announced.",
  },
  {
    id: 2, type: "Penthouse", status: "Coming Soon",
    address: "TBA — Manhattan", neighborhood: "Manhattan", city: "New York, NY",
    price: null, beds: null, baths: null, sqft: null,
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    tags: ["30–40 Units", "Full-Floor Residences", "Panoramic Views", "Private Terraces"],
    featured: true,
    desc: "An exclusive penthouse development coming to Manhattan — 30 to 40 curated residences offering full-floor living with panoramic city views, private terraces, and white-glove services. Details and pricing to be announced. Register your interest to be first notified.",
    year: null, parking: null, pet: null, building: "Penthouse Development",
    contractNote: "Pre-launch. Register interest for priority access when pricing is released.",
  },
];

const fmt = (n, isRent) => {
  if (n === null || n === undefined) return "Price TBA";
  return isRent ? `$${n.toLocaleString()}/mo` : n >= 1000000 ? `$${(n/1000000).toFixed(1)}M` : `$${n.toLocaleString()}`;
};

const BedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8"/><path d="M2 14h20"/><path d="M7 14V9a1 1 0 011-1h8a1 1 0 011 1v5"/>
  </svg>
);
const BathIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4z"/><path d="M6 12V5a2 2 0 012-2h3v2.25"/><path d="M4 20l-1 2"/><path d="M20 20l1 2"/>
  </svg>
);
const SqftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 3v18"/>
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#c9a96e" : "none"} stroke={filled ? "#c9a96e" : "currentColor"} strokeWidth="1.8">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const ChevronIcon = ({ dir = "right" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ transform: dir === "left" ? "rotate(180deg)" : dir === "down" ? "rotate(90deg)" : "" }}>
    <path d="M9 18l6-6-6-6"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const styles = `
${FONT}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --cream: #f8f5f0;
  --dark: #1a1814;
  --gold: #c9a96e;
  --gold-light: #e8d5b0;
  --muted: #8a7f72;
  --border: #e5dfd6;
  --white: #ffffff;
  --card-bg: #ffffff;
  --overlay: rgba(26,24,20,0.55);
  font-family: 'DM Sans', sans-serif;
}
body { background: var(--cream); color: var(--dark); min-height: 100vh; }

/* NAV */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(248,245,240,0.92); backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px; height: 64px;
}
.nav-logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; font-weight: 600; letter-spacing: 0.02em;
  color: var(--dark); cursor: pointer; user-select: none;
}
.nav-logo span { color: var(--gold); font-weight: 300; letter-spacing: 0.08em; }
.nav-tabs { display: flex; gap: 4px; }
.nav-tab {
  padding: 6px 16px; border-radius: 6px; font-size: 13px;
  font-weight: 400; cursor: pointer; border: none; background: none;
  color: var(--muted); transition: all 0.2s; font-family: 'DM Sans', sans-serif;
}
.nav-tab:hover { color: var(--dark); background: var(--border); }
.nav-tab.active { color: var(--dark); background: var(--dark); color: var(--cream); }
.nav-right { display: flex; align-items: center; gap: 12px; }
.nav-saved {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; color: var(--muted); cursor: pointer;
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--border);
  background: none; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
}
.nav-saved:hover { border-color: var(--gold); color: var(--dark); }
.saved-count {
  background: var(--gold); color: var(--white); border-radius: 50%;
  width: 18px; height: 18px; font-size: 10px; display: flex;
  align-items: center; justify-content: center;
}

@media (max-width: 600px) {
  .nav { padding: 0 16px; }
  .nav-right { display: none; }
  .nav-tab { padding: 6px 12px; font-size: 12px; }
  .hero { height: auto; padding: 40px 0 36px; align-items: flex-start; }
  .hero-content { padding: 0 20px; max-width: 100%; }
  .hero-title { font-size: 38px; margin-bottom: 14px; }
  .hero-sub { font-size: 13px; margin-bottom: 24px; }
  .hero-search { max-width: 100%; }
  .hero-stats { gap: 24px; margin-top: 28px; }
  .hero-stat-n { font-size: 26px; }
  .filters-bar { padding: 0 16px; gap: 8px; }
  .sort-select { display: none; }
  .main { padding: 24px 16px; }
  .listings-grid { grid-template-columns: 1fr; gap: 16px; }
  .featured-banner { flex-direction: column; max-height: none; }
  .featured-img-wrap { height: 220px; }
  .featured-info { padding: 24px; }
  .featured-type { font-size: 28px; }
  .modal { border-radius: 12px; max-height: 95vh; }
  .modal-body { padding: 20px; }
  .modal-title { font-size: 26px; }
  .modal-stats { gap: 16px; flex-wrap: wrap; }
  .modal-stat { min-width: 28%; }
  .modal-actions { flex-direction: column; }
  .gallery-thumbs { padding: 8px 16px 0; }
}
.nav-tabs { display: flex; gap: 4px; }
.nav-tab {
  padding: 6px 16px; border-radius: 6px; font-size: 13px;
  font-weight: 400; cursor: pointer; border: none; background: none;
  color: var(--muted); transition: all 0.2s; font-family: 'DM Sans', sans-serif;
}
.nav-tab:hover { color: var(--dark); background: var(--border); }
.nav-tab.active { color: var(--dark); background: var(--dark); color: var(--cream); }
.nav-right { display: flex; align-items: center; gap: 12px; }
.nav-saved {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; color: var(--muted); cursor: pointer;
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--border);
  background: none; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
}
.nav-saved:hover { border-color: var(--gold); color: var(--dark); }
.saved-count {
  background: var(--gold); color: var(--white); border-radius: 50%;
  width: 18px; height: 18px; font-size: 10px; display: flex;
  align-items: center; justify-content: center;
}

/* HERO */
.hero {
  margin-top: 64px; position: relative; height: 520px;
  background: linear-gradient(135deg, #1a1814 0%, #2d2820 50%, #1a1814 100%);
  display: flex; align-items: center; overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0; opacity: 0.18;
  background-image: repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(201,169,110,0.15) 60px, rgba(201,169,110,0.15) 61px),
    repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(201,169,110,0.15) 60px, rgba(201,169,110,0.15) 61px);
}
.hero-content { position: relative; z-index: 2; padding: 0 48px; max-width: 660px; }
.hero-eyebrow {
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 16px; font-weight: 500;
}
.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(40px, 6vw, 68px); font-weight: 300; line-height: 1.1;
  color: var(--cream); margin-bottom: 20px;
}
.hero-title em { font-style: italic; color: var(--gold); }
.hero-sub { font-size: 15px; color: rgba(248,245,240,0.6); line-height: 1.6; margin-bottom: 36px; font-weight: 300; }
.hero-search {
  display: flex; align-items: center;
  background: rgba(248,245,240,0.96); border-radius: 10px;
  overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,0.3);
  max-width: 560px;
}
.hero-search-input {
  flex: 1; padding: 16px 20px; border: none; outline: none;
  font-size: 14px; background: transparent; color: var(--dark);
  font-family: 'DM Sans', sans-serif;
}
.hero-search-input::placeholder { color: var(--muted); }
.hero-search-btn {
  padding: 14px 24px; background: var(--gold); border: none; cursor: pointer;
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 500; color: var(--white);
  font-family: 'DM Sans', sans-serif; transition: background 0.2s;
  white-space: nowrap;
}
.hero-search-btn:hover { background: #b8934a; }
.hero-stats {
  display: flex; gap: 40px; margin-top: 36px;
}
.hero-stat-n {
  font-family: 'Cormorant Garamond', serif;
  font-size: 32px; font-weight: 300; color: var(--cream);
}
.hero-stat-l { font-size: 11px; color: rgba(248,245,240,0.5); letter-spacing: 0.08em; text-transform: uppercase; }

/* FILTERS */
.filters-bar {
  background: var(--white); border-bottom: 1px solid var(--border);
  padding: 0 32px; display: flex; align-items: center; gap: 12px;
  overflow-x: auto; scrollbar-width: none; position: sticky; top: 64px; z-index: 50;
  height: 58px;
}
.filters-bar::-webkit-scrollbar { display: none; }
.filter-chip {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 20px; border: 1px solid var(--border);
  font-size: 13px; font-weight: 400; color: var(--muted); cursor: pointer;
  background: none; white-space: nowrap; font-family: 'DM Sans', sans-serif;
  transition: all 0.15s;
}
.filter-chip:hover { border-color: var(--gold); color: var(--dark); }
.filter-chip.active { background: var(--dark); border-color: var(--dark); color: var(--cream); }
.filter-divider { width: 1px; height: 20px; background: var(--border); flex-shrink: 0; }
.sort-select {
  margin-left: auto; padding: 6px 14px; border-radius: 20px;
  border: 1px solid var(--border); font-size: 13px;
  color: var(--muted); background: none; cursor: pointer;
  font-family: 'DM Sans', sans-serif; outline: none;
}

/* MAIN CONTENT */
.main { padding: 40px 32px; max-width: 1400px; margin: 0 auto; }
.section-header {
  display: flex; align-items: baseline; gap: 12px; margin-bottom: 28px;
}
.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px; font-weight: 400; color: var(--dark);
}
.section-count { font-size: 13px; color: var(--muted); }

/* GRID */
.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}
.featured-banner {
  grid-column: 1 / -1; display: flex; gap: 0;
  border-radius: 16px; overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  margin-bottom: 8px; max-height: 360px;
}
.featured-img-wrap { flex: 1.4; position: relative; overflow: hidden; }
.featured-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
.featured-banner:hover .featured-img { transform: scale(1.04); }
.featured-info {
  flex: 1; padding: 36px; background: var(--dark);
  display: flex; flex-direction: column; justify-content: space-between;
}
.featured-label {
  font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 12px;
}
.featured-type {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px; font-weight: 300; color: var(--cream); line-height: 1.1; margin-bottom: 6px;
}
.featured-addr { font-size: 13px; color: rgba(248,245,240,0.55); margin-bottom: 16px; }
.featured-desc { font-size: 13px; color: rgba(248,245,240,0.5); line-height: 1.7; margin-bottom: 24px; font-weight: 300; }
.featured-price {
  font-family: 'Cormorant Garamond', serif;
  font-size: 30px; font-weight: 300; color: var(--gold); margin-bottom: 20px;
}
.featured-meta { display: flex; gap: 20px; margin-bottom: 28px; }
.featured-meta-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: rgba(248,245,240,0.5); }
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 24px; background: var(--gold); border: none; border-radius: 8px;
  font-size: 13px; font-weight: 500; color: var(--white); cursor: pointer;
  font-family: 'DM Sans', sans-serif; transition: all 0.2s;
}
.btn-primary:hover { background: #b8934a; transform: translateY(-1px); }
.btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 24px; background: transparent;
  border: 1px solid rgba(248,245,240,0.2); border-radius: 8px;
  font-size: 13px; font-weight: 400; color: rgba(248,245,240,0.7); cursor: pointer;
  font-family: 'DM Sans', sans-serif; transition: all 0.2s;
}
.btn-outline:hover { border-color: var(--gold); color: var(--gold); }

/* CARD */
.card {
  border-radius: 12px; overflow: hidden; background: var(--card-bg);
  border: 1px solid var(--border); cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
.card-img-wrap { position: relative; aspect-ratio: 4/3; overflow: hidden; }
.card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; display: block; }
.card:hover .card-img { transform: scale(1.06); }
.card-status {
  position: absolute; top: 12px; left: 12px;
  padding: 4px 10px; border-radius: 4px; font-size: 10px;
  font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
}
.status-sale { background: var(--dark); color: var(--gold); }
.status-rent { background: var(--gold); color: var(--white); }
.status-pending { background: #b45309; color: #fff; }
.status-soon { background: #1d4ed8; color: #fff; }
.card-heart {
  position: absolute; top: 12px; right: 12px;
  background: rgba(255,255,255,0.9); border: none; border-radius: 50%;
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s; backdrop-filter: blur(4px);
}
.card-heart:hover { background: white; transform: scale(1.1); }
.card-body { padding: 20px; }
.card-type { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
.card-addr { font-size: 15px; font-weight: 500; color: var(--dark); margin-bottom: 2px; }
.card-neighborhood { font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 4px; margin-bottom: 14px; }
.card-price {
  font-family: 'Cormorant Garamond', serif;
  font-size: 26px; font-weight: 400; color: var(--dark); margin-bottom: 14px;
}
.card-stats { display: flex; gap: 14px; padding-top: 14px; border-top: 1px solid var(--border); }
.card-stat { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--muted); }
.card-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
.card-tag {
  padding: 3px 10px; border-radius: 4px; font-size: 11px;
  background: var(--cream); color: var(--muted); border: 1px solid var(--border);
}

/* MODAL */
/* GALLERY */
.gallery-main-wrap {
  position: relative; width: 100%; aspect-ratio: 16/9; overflow: hidden; background: #111; border-radius: 16px 16px 0 0;
}
.gallery-main-img { width: 100%; height: 100%; object-fit: contain; display: block; transition: opacity 0.25s ease; background: #111; }
.gallery-label {
  position: absolute; bottom: 14px; left: 14px;
  background: rgba(26,24,20,0.72); backdrop-filter: blur(6px);
  color: var(--cream); font-size: 11px; letter-spacing: 0.1em;
  text-transform: uppercase; padding: 5px 12px; border-radius: 4px;
}
.gallery-counter {
  position: absolute; bottom: 14px; right: 14px;
  background: rgba(26,24,20,0.72); backdrop-filter: blur(6px);
  color: var(--cream); font-size: 11px; padding: 5px 12px; border-radius: 4px;
}
.gallery-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,0.88); border: none; border-radius: 50%;
  width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.15s; backdrop-filter: blur(4px); z-index: 2;
}
.gallery-arrow:hover { background: white; }
.gallery-arrow.left { left: 14px; }
.gallery-arrow.right { right: 14px; }
.gallery-thumbs {
  display: flex; gap: 8px; padding: 10px 36px 0;
  overflow-x: auto; scrollbar-width: none; background: var(--white);
}
.gallery-thumbs::-webkit-scrollbar { display: none; }
.gallery-thumb {
  flex-shrink: 0; width: 84px; height: 58px; border-radius: 6px;
  overflow: hidden; cursor: pointer; border: 2px solid transparent;
  transition: border-color 0.15s, opacity 0.15s; opacity: 0.55;
}
.gallery-thumb.active { border-color: var(--gold); opacity: 1; }
.gallery-thumb:hover { opacity: 0.85; }
.gallery-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

.modal-overlay {
  backdrop-filter: blur(4px); z-index: 200;
  display: flex; align-items: center; justify-content: center;
  padding: 20px; animation: fadeIn 0.2s;
}
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
.modal {
  background: var(--white); border-radius: 16px; max-width: 900px;
  width: 100%; max-height: 90vh; overflow-y: auto;
  animation: slideUp 0.25s;
}
@keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
.modal-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; }
.modal-body { padding: 36px; }
.modal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.modal-close {
  background: var(--cream); border: none; border-radius: 50%;
  width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0; transition: background 0.15s;
}
.modal-close:hover { background: var(--border); }
.modal-type { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
.modal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 38px; font-weight: 300; color: var(--dark); line-height: 1.15;
}
.modal-loc { font-size: 13px; color: var(--muted); display: flex; align-items: center; gap: 5px; margin-top: 6px; }
.modal-price {
  font-family: 'Cormorant Garamond', serif;
  font-size: 40px; font-weight: 400; color: var(--gold);
}
.modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 28px 0; }
.modal-detail-box {
  background: var(--cream); border-radius: 10px; padding: 20px;
}
.modal-detail-label { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
.modal-detail-val { font-size: 18px; font-weight: 500; color: var(--dark); }
.modal-desc { font-size: 14px; line-height: 1.8; color: #4a4540; margin: 24px 0; font-weight: 300; }
.modal-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
.modal-tag {
  padding: 6px 14px; border-radius: 6px;
  background: var(--cream); border: 1px solid var(--border);
  font-size: 12px; color: var(--muted);
}
.modal-actions { display: flex; gap: 12px; }
.modal-stats { display: flex; gap: 32px; margin: 24px 0; padding: 24px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.modal-stat { text-align: center; }
.modal-stat-n { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; color: var(--dark); }
.modal-stat-l { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px; }

/* LEAD FORM */
.lead-form { margin-top: 24px; border-top: 1px solid var(--border); padding-top: 24px; }
.lead-form-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: var(--dark); margin-bottom: 4px; }
.lead-form-sub { font-size: 13px; color: var(--muted); margin-bottom: 20px; }
.lead-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.lead-form-field { display: flex; flex-direction: column; gap: 5px; }
.lead-form-field label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); }
.lead-form-field input, .lead-form-field textarea {
  padding: 11px 14px; border: 1px solid var(--border); border-radius: 8px;
  font-size: 14px; font-family: 'DM Sans', sans-serif; color: var(--dark);
  background: var(--cream); outline: none; transition: border-color 0.15s; resize: none;
}
.lead-form-field input:focus, .lead-form-field textarea:focus { border-color: var(--gold); background: white; }
.lead-form-field.full { grid-column: 1 / -1; }
.lead-form-actions { display: flex; gap: 10px; margin-top: 16px; }
.form-success { text-align: center; padding: 32px 20px; background: var(--cream); border-radius: 12px; margin-top: 24px; border-top: 1px solid var(--border); }
.form-success-icon { font-size: 36px; margin-bottom: 10px; }
.form-success-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; color: var(--dark); margin-bottom: 6px; }
.form-success-sub { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* SAVED VIEW */
.saved-empty { text-align: center; padding: 80px 32px; }
.saved-empty-icon { font-size: 48px; margin-bottom: 16px; }
.saved-empty-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: var(--dark); margin-bottom: 8px; }
.saved-empty-sub { font-size: 14px; color: var(--muted); }

/* NO RESULTS */
.no-results { text-align: center; padding: 80px 32px; }
.no-results-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: var(--dark); margin-bottom: 8px; }
.no-results-sub { font-size: 14px; color: var(--muted); }

/* TOAST */
.toast {
  position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
  background: var(--dark); color: var(--cream); padding: 12px 24px;
  border-radius: 8px; font-size: 13px; z-index: 300;
  animation: toastIn 0.3s; box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  border-left: 3px solid var(--gold);
}
@keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px) } to { opacity: 1; transform: translateX(-50%) translateY(0) } }
`;

export default function App() {
  const [view, setView] = useState("browse");
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState(new Set());
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sort, setSort] = useState("featured");
  const [toast, setToast] = useState(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | sent | error
  const [showForm, setShowForm] = useState(false);
  const toastTimer = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  };

  const openListing = (l) => { setSelected(l); setGalleryIdx(0); setShowForm(false); setFormStatus("idle"); setFormState({ name: "", email: "", phone: "", message: "" }); };

  const submitForm = async (e) => {
    e?.preventDefault();
    if (!formState.name || !formState.email) return;
    setFormStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xjglynkr", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          message: formState.message || "No message provided",
          listing: selected?.address,
          interest: selected?.status === "Coming Soon" ? "Penthouse Pre-Launch" : "Tour Request",
        }),
      });
      if (res.ok) { setFormStatus("sent"); }
      else { setFormStatus("error"); }
    } catch { setFormStatus("error"); }
  };
  const galleryImages = selected?.gallery || (selected ? [{ url: selected.img, label: selected.type }] : []);
  const galleryPrev = () => setGalleryIdx(i => (i - 1 + galleryImages.length) % galleryImages.length);
  const galleryNext = () => setGalleryIdx(i => (i + 1) % galleryImages.length);

  const toggleSaved = (id, e) => {
    e?.stopPropagation();
    setSaved(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); showToast("Removed from saved"); }
      else { next.add(id); showToast("Saved to favorites"); }
      return next;
    });
  };

  const statusClass = (s) => {
    if (s === "For Sale") return "status-sale";
    if (s === "For Rent") return "status-rent";
    if (s === "Contract Pending") return "status-pending";
    if (s === "Coming Soon") return "status-soon";
    return "status-sale";
  };

  const types = ["All", ...new Set(LISTINGS.map(l => l.type))];
  const statuses = ["All", "Contract Pending", "Coming Soon"];

  let filtered = LISTINGS.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.address.toLowerCase().includes(q) || l.neighborhood.toLowerCase().includes(q) || l.city.toLowerCase().includes(q) || l.type.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || l.status === statusFilter;
    const matchType = typeFilter === "All" || l.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  if (view === "saved") filtered = filtered.filter(l => saved.has(l.id));

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "featured") filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  else if (sort === "newest") filtered = [...filtered].sort((a, b) => b.year - a.year);

  const featuredItem = view === "browse" && !search && statusFilter === "All" && typeFilter === "All"
    ? LISTINGS.find(l => l.featured && l.id === 1)
    : null;

  const gridItems = featuredItem ? filtered.filter(l => l.id !== featuredItem.id) : filtered;

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => { setView("browse"); setSearch(""); setSearchInput(""); }}>
          Soryx<span> Estates</span>
        </div>
        <div className="nav-tabs">
          <button className={`nav-tab ${view === "browse" ? "active" : ""}`} onClick={() => setView("browse")}>Browse</button>
          <button className={`nav-tab ${view === "saved" ? "active" : ""}`} onClick={() => setView("saved")}>
            Saved {saved.size > 0 && <span className="saved-count" style={{ marginLeft: 4 }}>{saved.size}</span>}
          </button>
        </div>
      </nav>

      {/* HERO — only on browse */}
      {view === "browse" && (
        <div className="hero">
          <div className="hero-bg" />
          <div className="hero-content">
            <div className="hero-eyebrow">Soryx Estates · New York City</div>
            <h1 className="hero-title">Find your <em>perfect</em> address</h1>
            <p className="hero-sub">Curated listings across Manhattan, Brooklyn, and beyond — exclusively represented by Soryx Estates.</p>
            <div className="hero-search">
              <input
                className="hero-search-input"
                placeholder="Search by neighborhood, address, or type…"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && setSearch(searchInput)}
              />
              <button className="hero-search-btn" onClick={() => setSearch(searchInput)}>
                <SearchIcon /> Search
              </button>
            </div>
            <div className="hero-stats">
              <div><div className="hero-stat-n">2</div><div className="hero-stat-l">Listings</div></div>
              <div><div className="hero-stat-n">2</div><div className="hero-stat-l">Neighborhoods</div></div>
              <div><div className="hero-stat-n">1</div><div className="hero-stat-l">Borough</div></div>
            </div>
          </div>
        </div>
      )}

      {/* FILTERS */}
      <div className="filters-bar">
        {statuses.map(s => (
          <button key={s} className={`filter-chip ${statusFilter === s ? "active" : ""}`} onClick={() => setStatusFilter(s)}>{s}</button>
        ))}
        <div className="filter-divider" />
        {types.map(t => (
          <button key={t} className={`filter-chip ${typeFilter === t ? "active" : ""}`} onClick={() => setTypeFilter(t)}>{t}</button>
        ))}
        <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="featured">Featured First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest Build</option>
        </select>
      </div>

      {/* MAIN */}
      <div className="main">
        {view === "saved" && saved.size === 0 ? (
          <div className="saved-empty">
            <div className="saved-empty-icon">♡</div>
            <div className="saved-empty-title">No saved listings yet</div>
            <div className="saved-empty-sub">Browse properties and tap the heart to save your favorites here.</div>
          </div>
        ) : (
          <>
            <div className="section-header">
              <span className="section-title">{view === "saved" ? "Saved Properties" : search ? `Results for "${search}"` : "All Properties"}</span>
              <span className="section-count">{filtered.length} listing{filtered.length !== 1 ? "s" : ""}</span>
            </div>

            {filtered.length === 0 ? (
              <div className="no-results">
                <div className="no-results-title">No properties found</div>
                <div className="no-results-sub">Try adjusting your search or filters.</div>
              </div>
            ) : (
              <div className="listings-grid">

                {/* Featured banner */}
                {featuredItem && (
                  <div className="featured-banner" onClick={() => openListing(featuredItem)}>
                    <div className="featured-img-wrap">
                      <img src={featuredItem.img} alt="" className="featured-img" />
                    </div>
                    <div className="featured-info">
                      <div>
                        <div className="featured-label">Featured Listing</div>
                        <div className="featured-type">{featuredItem.type}</div>
                        <div className="featured-addr">{featuredItem.address}, {featuredItem.neighborhood}</div>
                        <p className="featured-desc">{featuredItem.desc}</p>
                        <div className="featured-meta">
                          {featuredItem.beds > 0 && <div className="featured-meta-item"><BedIcon />{featuredItem.beds} Beds</div>}
                          {featuredItem.beds === null && <div className="featured-meta-item"><BedIcon />Multiple Units</div>}
                          {featuredItem.baths !== null && <div className="featured-meta-item"><BathIcon />{featuredItem.baths} Baths</div>}
                          {featuredItem.sqft !== null && <div className="featured-meta-item"><SqftIcon />{featuredItem.sqft.toLocaleString()} ft²</div>}
                        </div>
                      </div>
                      <div>
                        <div className="featured-price" style={featuredItem.price === null ? { fontSize: 20, color: "rgba(248,245,240,0.5)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 } : {}}>
                          {fmt(featuredItem.price, featuredItem.status === "For Rent")}
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                          <button className="btn-primary" onClick={e => { e.stopPropagation(); openListing(featuredItem); }}>
                            View Details <ChevronIcon />
                          </button>
                          <button className="btn-outline" onClick={e => toggleSaved(featuredItem.id, e)}>
                            <HeartIcon filled={saved.has(featuredItem.id)} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cards */}
                {gridItems.map(l => (
                  <div key={l.id} className="card" onClick={() => openListing(l)}>
                    <div className="card-img-wrap">
                      <img src={l.img} alt="" className="card-img" />
                      <span className={`card-status ${statusClass(l.status)}`}>{l.status}</span>
                      <button className="card-heart" onClick={e => toggleSaved(l.id, e)}>
                        <HeartIcon filled={saved.has(l.id)} />
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="card-type">{l.type}</div>
                      <div className="card-addr">{l.address}</div>
                      <div className="card-neighborhood"><MapPinIcon />{l.neighborhood}, {l.city.split(",")[1]?.trim()}</div>
                      <div className="card-price" style={l.price === null ? { fontSize: 18, color: "var(--muted)", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 } : {}}>
                        {fmt(l.price, l.status === "For Rent")}
                      </div>
                      <div className="card-stats">
                        {l.beds > 0 && <div className="card-stat"><BedIcon />{l.beds} {l.beds === 1 ? "Bed" : "Beds"}</div>}
                        {l.beds === 0 && <div className="card-stat"><BedIcon />Studio</div>}
                        {l.beds === null && <div className="card-stat"><BedIcon />Multiple Units</div>}
                        {l.baths !== null && <div className="card-stat"><BathIcon />{l.baths} {l.baths === 1 ? "Bath" : "Baths"}</div>}
                        {l.sqft !== null && <div className="card-stat"><SqftIcon />{l.sqft.toLocaleString()} ft²</div>}
                        {l.sqft === null && <div className="card-stat"><SqftIcon />TBA</div>}
                      </div>
                      <div className="card-tags">
                        {l.tags.slice(0, 3).map(t => <span key={t} className="card-tag">{t}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>

            {/* GALLERY */}
            <div className="gallery-main-wrap">
              <img
                key={galleryImages[galleryIdx]?.url}
                src={galleryImages[galleryIdx]?.url}
                alt={galleryImages[galleryIdx]?.label || ""}
                className="gallery-main-img"
              />
              {galleryImages.length > 1 && (
                <>
                  <button className="gallery-arrow left" onClick={e => { e.stopPropagation(); galleryPrev(); }}><ChevronIcon dir="left" /></button>
                  <button className="gallery-arrow right" onClick={e => { e.stopPropagation(); galleryNext(); }}><ChevronIcon /></button>
                  {galleryImages[galleryIdx]?.label && <div className="gallery-label">{galleryImages[galleryIdx].label}</div>}
                  <div className="gallery-counter">{galleryIdx + 1} / {galleryImages.length}</div>
                </>
              )}
              {/* Close button overlaid on gallery */}
              <button className="modal-close" style={{ position: "absolute", top: 14, right: 14, zIndex: 3 }} onClick={() => setSelected(null)}><CloseIcon /></button>
            </div>

            {/* THUMBNAILS — only shown if gallery exists */}
            {galleryImages.length > 1 && (
              <div className="gallery-thumbs">
                {galleryImages.map((img, i) => (
                  <div key={i} className={`gallery-thumb ${i === galleryIdx ? "active" : ""}`} onClick={() => setGalleryIdx(i)}>
                    <img src={img.url} alt={img.label || ""} />
                  </div>
                ))}
              </div>
            )}
            <div className="modal-body">
              <div className="modal-header">
                <div>
                  <div className="modal-type">{selected.type} · {selected.status}</div>
                  <div className="modal-title">{selected.address}</div>
                  <div className="modal-loc"><MapPinIcon />{selected.neighborhood}, {selected.city}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                  <div className="modal-price" style={selected.price === null ? { fontSize: 24, color: "var(--muted)" } : {}}>
                    {fmt(selected.price, selected.status === "For Rent")}
                  </div>
                  {selected.building && <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{selected.building}</div>}
                </div>
              </div>

              <div className="modal-stats">
                <div className="modal-stat">
                  <div className="modal-stat-n">{selected.beds ?? "—"}</div>
                  <div className="modal-stat-l">Bedrooms</div>
                </div>
                <div className="modal-stat">
                  <div className="modal-stat-n">{selected.baths ?? "—"}</div>
                  <div className="modal-stat-l">Bathrooms</div>
                </div>
                <div className="modal-stat">
                  <div className="modal-stat-n">{selected.sqft ? selected.sqft.toLocaleString() : "—"}</div>
                  <div className="modal-stat-l">Square Ft</div>
                </div>
                <div className="modal-stat">
                  <div className="modal-stat-n">{selected.year ?? "—"}</div>
                  <div className="modal-stat-l">Year Built</div>
                </div>
                <div className="modal-stat">
                  <div className="modal-stat-n">{selected.parking === null ? "—" : selected.parking ? "Yes" : "No"}</div>
                  <div className="modal-stat-l">Parking</div>
                </div>
                <div className="modal-stat">
                  <div className="modal-stat-n">{selected.pet === null ? "—" : selected.pet ? "Yes" : "No"}</div>
                  <div className="modal-stat-l">Pet Friendly</div>
                </div>
              </div>

              {selected.contractNote && (
                <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "14px 18px", marginBottom: 20, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 16 }}>⚠️</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: "#92400e", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>{selected.status}</div>
                    <div style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{selected.contractNote}</div>
                  </div>
                </div>
              )}

              <p className="modal-desc">{selected.desc}</p>

              <div className="modal-tags">
                {selected.tags.map(t => <span key={t} className="modal-tag">{t}</span>)}
              </div>

              {/* LEAD CAPTURE FORM */}
              {formStatus === "sent" ? (
                <div className="form-success">
                  <div className="form-success-icon">✓</div>
                  <div className="form-success-title">We'll be in touch</div>
                  <div className="form-success-sub">Thanks {formState.name.split(" ")[0]}. We received your inquiry about {selected.address} and will reach out within 24 hours.</div>
                </div>
              ) : !showForm ? (
                <div className="modal-actions">
                  <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowForm(true)}>
                    {selected.status === "Coming Soon" ? "Register Interest" : "Request a Tour"}
                  </button>
                  <button className="btn-outline" style={{ border: "1px solid var(--border)", color: "var(--dark)", padding: "11px 20px" }} onClick={() => toggleSaved(selected.id)}>
                    <HeartIcon filled={saved.has(selected.id)} />
                    {saved.has(selected.id) ? "Saved" : "Save"}
                  </button>
                </div>
              ) : (
                <div className="lead-form">
                  <div className="lead-form-title">
                    {selected.status === "Coming Soon" ? "Register Your Interest" : "Request a Tour"}
                  </div>
                  <div className="lead-form-sub">
                    {selected.status === "Coming Soon"
                      ? "Be first notified when pricing and availability are released for this development."
                      : `Schedule a private showing for ${selected.address}.`}
                  </div>
                  <div className="lead-form-row">
                    <div className="lead-form-field">
                      <label>Full Name *</label>
                      <input
                        type="text" placeholder="Jane Smith"
                        value={formState.name}
                        onChange={e => setFormState(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div className="lead-form-field">
                      <label>Email *</label>
                      <input
                        type="email" placeholder="jane@email.com"
                        value={formState.email}
                        onChange={e => setFormState(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="lead-form-row">
                    <div className="lead-form-field">
                      <label>Phone</label>
                      <input
                        type="tel" placeholder="(212) 555-0000"
                        value={formState.phone}
                        onChange={e => setFormState(f => ({ ...f, phone: e.target.value }))}
                      />
                    </div>
                    <div className="lead-form-field">
                      <label>Budget / Timeline</label>
                      <input
                        type="text" placeholder="e.g. Under $5M, closing Q3"
                        value={formState.budget}
                        onChange={e => setFormState(f => ({ ...f, budget: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="lead-form-row">
                    <div className="lead-form-field full">
                      <label>Message</label>
                      <textarea
                        rows={3} placeholder="Any questions or preferred showing times…"
                        value={formState.message}
                        onChange={e => setFormState(f => ({ ...f, message: e.target.value }))}
                      />
                    </div>
                  </div>
                  {formStatus === "error" && (
                    <div style={{ fontSize: 13, color: "#dc2626", marginBottom: 8 }}>Something went wrong — please try again or email us directly.</div>
                  )}
                  <div className="lead-form-actions">
                    <button
                      className="btn-primary"
                      style={{ flex: 1, justifyContent: "center", opacity: formStatus === "sending" ? 0.7 : 1 }}
                      onClick={submitForm}
                      disabled={formStatus === "sending"}
                    >
                      {formStatus === "sending" ? "Sending…" : "Submit Inquiry"}
                    </button>
                    <button
                      className="btn-outline"
                      style={{ border: "1px solid var(--border)", color: "var(--muted)", padding: "11px 18px" }}
                      onClick={() => { setShowForm(false); setFormStatus("idle"); }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

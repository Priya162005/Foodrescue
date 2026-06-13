# 🌿 FoodRescue — Food Waste Reduction Platform
**Final Year Project | Full-Stack Web Application**

---

## 📁 Project Structure

```
FoodRescue/
│
├── index.html                  ← Homepage (main entry point)
│
├── html/                       ← All inner pages
│   ├── browse.html             ← Browse & search food listings
│   ├── donate.html             ← Post surplus food form
│   ├── impact.html             ← Community impact dashboard
│   └── dashboard.html          ← User personal dashboard
│
├── css/                        ← Stylesheets (each with a single responsibility)
│   ├── reset.css               ← Browser reset / normalize
│   ├── variables.css           ← Design tokens (colors, spacing, radius, shadows)
│   ├── typography.css          ← Font stacks, heading scales, text utilities
│   ├── layout.css              ← Grid, flex, container, section utilities
│   ├── components.css          ← Buttons, inputs, badges, tags, chips
│   ├── navbar.css              ← Navigation bar + mobile menu
│   ├── hero.css                ← Hero section, stats, testimonials, footer
│   ├── cards.css               ← Food listing cards
│   ├── modal.css               ← Modal overlays, reservation flow, time slots
│   ├── dashboard.css           ← Dashboard layout, sidebar, stat cards, tables
│   ├── animations.css          ← Keyframes, reveal, shimmer, toast, spinner
│   └── responsive.css          ← Media queries (tablet ≤1024, mobile ≤768)
│
├── js/                         ← JavaScript (modular, separated by concern)
│   ├── data.js                 ← Central mock data store (listings, donors, impact)
│   ├── utils.js                ← Shared utilities (auth, toast, modal, storage, geo)
│   ├── main.js                 ← Homepage bootstrapper
│   └── components/
│       ├── card.js             ← Food card renderer
│       ├── modal.js            ← Reservation modal + flow
│       ├── ticker.js           ← Hero ticker + live strip + real-time simulation
│       └── filter.js           ← Filter, search, sort logic
│
└── assets/
    ├── icons/                  ← (Add favicon, PWA icons)
    └── images/                 ← (Add screenshots, uploads)
```

---

## ✨ Features Implemented

| Feature | Page | Status |
|---------|------|--------|
| Real-time food listings | Homepage, Browse | ✅ |
| Filter by category (veg, vegan, bakery…) | Browse | ✅ |
| Search by name / donor | Browse | ✅ |
| Sort (nearest, price, expiry, rating) | Browse | ✅ |
| Distance radius filter | Browse | ✅ |
| Geolocation API | Browse | ✅ |
| Reservation system with time slots | All pages | ✅ |
| Unique pickup code generation | Modal | ✅ |
| SMS confirmation (console mock) | Modal | ✅ |
| Donor food listing form | Donate | ✅ |
| Dietary tags & allergen filter | Donate | ✅ |
| Photo upload (UI) | Donate | ✅ |
| Impact metrics dashboard | Impact | ✅ |
| Weekly bar chart (meals vs waste) | Impact | ✅ |
| Donut chart (food categories) | Impact | ✅ |
| Monthly trend chart | Impact | ✅ |
| Top donors leaderboard | Impact | ✅ |
| SDG alignment section | Impact | ✅ |
| Personal dashboard | Dashboard | ✅ |
| Sidebar navigation | Dashboard | ✅ |
| Activity history table | Dashboard | ✅ |
| Notification panel | Dashboard | ✅ |
| Rating system | Dashboard | ✅ |
| Personal impact metrics | Dashboard | ✅ |
| Settings (preferences, SMS radius) | Dashboard | ✅ |
| Auth (login/register mock) | All pages | ✅ |
| Session persistence (localStorage) | All pages | ✅ |
| Scroll-reveal animations | All pages | ✅ |
| Count-up animations for stats | Homepage, Impact | ✅ |
| Live ticker strip | Homepage | ✅ |
| Simulated real-time listing updates | Homepage | ✅ |
| Toast notifications | All pages | ✅ |
| Fully responsive (mobile + tablet) | All pages | ✅ |

---

## 🚀 How to Run

**No build step required. Pure HTML/CSS/JS.**

1. Open `index.html` in any browser, OR
2. Use Live Server (VS Code extension) for best experience:
   - Install "Live Server" in VS Code
   - Right-click `index.html` → "Open with Live Server"

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (semantic) |
| Styling | CSS3 (custom properties, grid, flexbox, animations) |
| Logic | Vanilla JavaScript (ES6+, modular) |
| Fonts | Google Fonts (Space Grotesk + Fraunces) |
| Storage | localStorage (session persistence) |
| Location | Navigator Geolocation API |
| Real-time (mock) | setInterval simulation |

---

## 🎯 SDG Alignment

- **SDG 2 — Zero Hunger**: Redistributing surplus food to those in need
- **SDG 12 — Responsible Consumption**: Cutting food waste at source
- **SDG 13 — Climate Action**: Preventing methane emissions from landfills

---

## 🔮 Future Scope (Backend Integration)

- **Node.js + Express** REST API replacing mock data
- **MongoDB** for listings, users, reservations
- **Socket.io** for true real-time notifications
- **Twilio** for actual SMS alerts
- **Google Maps API** for live map view
- **Razorpay / Stripe** for optional monetary donations
- **Firebase Auth** or JWT authentication
- **PWA** (Progressive Web App) for offline mobile use

---

*Made with 💚 as a Final Year Project to fight food waste.*

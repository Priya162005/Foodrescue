// ============================================================
// components/ticker.js — Hero ticker & live strip
// ============================================================

function initHeroTicker() {
  const container = document.getElementById('foodTicker');
  if (!container) return;

  const items = FoodRescueData.listings.slice(0, 4);
  container.innerHTML = items.map(l => `
    <div class="ticker-card" onclick="showReservationModal('${l.id}')" style="cursor:pointer">
      <div class="ticker-emoji">${l.emoji}</div>
      <div class="ticker-info">
        <h4>${l.name}</h4>
        <p>${l.donor}</p>
        <div class="ticker-meta">
          ${l.isFree
            ? '<span class="badge badge-free">FREE</span>'
            : `<span class="badge badge-amber">₹${l.price}</span>`}
          <span style="font-size:0.75rem;color:var(--smoke)">📍 ${l.distance} km</span>
          <span style="font-size:0.75rem;color:var(--smoke)">🕐 ${l.pickupStart}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function initLiveStrip() {
  const scroll = document.getElementById('liveScroll');
  if (!scroll) return;

  const items = FoodRescueData.listings.map(l =>
    `<span class="live-item">
      ${l.emoji} <span>${l.name}</span> @ ${l.donor} — pickup ${l.pickupStart}–${l.pickupEnd}
    </span>`
  );

  // Duplicate for seamless loop
  const track = document.createElement('div');
  track.className = 'ticker-track';
  track.innerHTML = [...items, ...items].join(
    '<span class="live-item" style="opacity:0.3"> &nbsp;•&nbsp; </span>'
  );
  scroll.appendChild(track);
}

// Simulated real-time: add a new listing every ~25 seconds
function simulateLiveUpdates() {
  const newItems = [
    { id: 'sim001', emoji: '🫙', name: 'Pickle & Chutney Jars', donor: 'Home Kitchen Collective', isFree: true, price: 0, distance: 0.4, pickupStart: '17:00', pickupEnd: '18:00' },
    { id: 'sim002', emoji: '🥞', name: 'Pancake Stack (6 pcs)', donor: 'Sunrise Café', isFree: false, price: 15, distance: 1.1, pickupStart: '11:00', pickupEnd: '12:00' },
    { id: 'sim003', emoji: '🍜', name: 'Noodle Soup Bowls', donor: 'Dragon House', isFree: false, price: 25, distance: 2.0, pickupStart: '20:30', pickupEnd: '21:30' },
  ];

  let idx = 0;
  setInterval(() => {
    const item = newItems[idx % newItems.length];
    idx++;
    if (!FoodRescueData.listings.find(l => l.id === item.id)) {
      FoodRescueData.listings.unshift({
        ...item,
        category: 'meals', tags: ['veg'],
        originalPrice: item.price * 4,
        quantity: 3, claimed: 0,
        urgent: false, rating: 4.5, ratingCount: 0,
        postedAt: new Date(),
        donorId: 'sim',
      });
      showToast(`🆕 New listing: ${item.name} from ${item.donor}!`, 'info');
    }
  }, 25000);
}

window.initHeroTicker   = initHeroTicker;
window.initLiveStrip    = initLiveStrip;
window.simulateLiveUpdates = simulateLiveUpdates;

// ============================================================
// components/card.js — Food card renderer
// ============================================================

function buildFoodCard(listing) {
  const isClaimed = listing.claimed >= listing.quantity;
  const soon      = isPickupSoon(listing.pickupStart);
  const discount  = discountPercent(listing.originalPrice, listing.price);
  const remaining = listing.quantity - listing.claimed;

  const tagsHTML = listing.tags.map(t =>
    `<span class="tag">${t === 'veg' ? '🥗 Veg' : t === 'vegan' ? '🌱 Vegan' : t === 'allergen-free' ? '✅ Allergen-free' : t}</span>`
  ).join('');

  const priceHTML = listing.isFree
    ? `<span class="badge badge-free">FREE</span>`
    : `<span class="card-price">₹${listing.price}</span>`;

  const originalPriceHTML = (!listing.isFree && listing.originalPrice)
    ? `<span class="card-original-price">₹${listing.originalPrice}</span>` : '';

  const urgentBadge = (soon || listing.urgent)
    ? `<span class="badge badge-red card-urgency-badge">⚡ Ending soon</span>` : '';

  const discountBadge = (discount >= 50 && !listing.isFree)
    ? `<span class="badge badge-amber card-free-badge">${discount}% off</span>` : '';

  return `
    <div class="food-card ${isClaimed ? 'claimed' : ''} ${listing.urgent ? 'urgent' : ''} reveal"
         onclick="showReservationModal('${listing.id}')">
      <div class="food-card-image">
        ${listing.emoji}
        ${urgentBadge}
        ${discountBadge}
        ${listing.isFree ? '<span class="badge badge-free card-free-badge">FREE</span>' : ''}
      </div>
      <div class="food-card-body">
        <div class="card-header">
          <h3 class="card-title">${listing.name}</h3>
          <div style="text-align:right">
            ${priceHTML}
            ${originalPriceHTML}
          </div>
        </div>
        <p class="card-donor">📍 ${listing.donor}</p>
        <div class="card-tags">${tagsHTML}</div>
        <div class="card-meta">
          <span class="card-pickup-time">🕐 ${formatPickup(listing.pickupStart, listing.pickupEnd)}</span>
          <span class="card-distance">📍 ${listing.distance} km</span>
        </div>
        <div class="card-meta" style="margin-top:6px">
          <span class="stars" title="${listing.rating}/5">${renderStars(listing.rating)}</span>
          <span style="font-size:0.78rem;color:var(--smoke)">${remaining} left</span>
        </div>
        <div class="card-action">
          <button class="btn ${isClaimed ? 'btn-ghost' : 'btn-primary'} btn-sm btn-full"
                  onclick="event.stopPropagation(); showReservationModal('${listing.id}')">
            ${isClaimed ? 'Fully Claimed' : 'Reserve Now →'}
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderCards(containerId, listings) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!listings || listings.length === 0) {
    el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:var(--space-2xl);color:var(--smoke)">
      <div style="font-size:3rem;margin-bottom:12px">🔍</div>
      <p>No listings match this filter right now. Check back soon!</p>
    </div>`;
    return;
  }
  el.innerHTML = listings.map(buildFoodCard).join('');
  initReveal();
}

window.buildFoodCard = buildFoodCard;
window.renderCards   = renderCards;

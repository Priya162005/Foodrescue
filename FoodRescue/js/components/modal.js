// ============================================================
// components/modal.js — Reservation modal & flow
// ============================================================

function showReservationModal(listingId) {
  const listing = FoodRescueData.listings.find(l => l.id === listingId);
  if (!listing) return;
  if (listing.claimed >= listing.quantity) {
    showToast('Sorry, this item is fully claimed!', 'error');
    return;
  }

  // Build modal HTML dynamically
  let existing = document.getElementById('reserveModal');
  if (existing) existing.remove();

  const slots = generateTimeSlots(listing.pickupStart, listing.pickupEnd);
  const slotsHTML = slots.map((s, i) =>
    `<div class="time-slot ${s.full ? 'full' : ''}" data-time="${s.label}"
          onclick="selectTimeSlot(this)">${s.label}${s.full ? '<br/><small>Full</small>' : ''}</div>`
  ).join('');

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'reserveModal';
  modal.innerHTML = `
    <div class="modal" onclick="event.stopPropagation()">
      <button class="modal-close" onclick="closeModal('reserveModal')">✕</button>
      <h2>Reserve Food</h2>
      <p class="modal-subtitle">Confirm your pickup slot below.</p>

      <div class="modal-food-preview">
        <div class="modal-food-emoji">${listing.emoji}</div>
        <div class="modal-food-info">
          <h4>${listing.name}</h4>
          <p>${listing.donor}</p>
          <p>📍 ${listing.distance} km away &nbsp;|&nbsp;
             ${listing.isFree ? '<strong style="color:var(--green-fresh)">FREE</strong>' : `₹${listing.price}`}
          </p>
        </div>
      </div>

      <div class="form-group">
        <label>Choose Pickup Time</label>
        <div class="time-slots">${slotsHTML}</div>
      </div>

      <div class="form-group">
        <label>Your Name</label>
        <input type="text" class="input" id="reserveName" placeholder="Full name" />
      </div>

      <div class="form-group">
        <label>Phone (for SMS confirmation)</label>
        <input type="tel" class="input" id="reservePhone" placeholder="+91 XXXXX XXXXX" />
      </div>

      <div class="form-group">
        <label>Quantity (available: ${listing.quantity - listing.claimed})</label>
        <input type="number" class="input" id="reserveQty" min="1"
               max="${listing.quantity - listing.claimed}" value="1" />
      </div>

      <button class="btn btn-primary btn-full" id="confirmReserveBtn"
              onclick="confirmReservation('${listingId}')">
        Confirm Reservation
      </button>
    </div>
  `;
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal('reserveModal');
  });
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('open'), 10);
}

function selectTimeSlot(el) {
  if (el.classList.contains('full')) return;
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

function generateTimeSlots(start, end) {
  const slots = [];
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let current = sh * 60 + sm;
  const endMin = eh * 60 + em;

  while (current + 20 <= endMin) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    const label = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    slots.push({ label, full: Math.random() < 0.15 });
    current += 20;
  }
  return slots;
}

function confirmReservation(listingId) {
  const name  = document.getElementById('reserveName')?.value?.trim();
  const phone = document.getElementById('reservePhone')?.value?.trim();
  const qty   = parseInt(document.getElementById('reserveQty')?.value) || 1;
  const slot  = document.querySelector('.time-slot.selected')?.dataset?.time;

  if (!name)  { showToast('Please enter your name', 'error'); return; }
  if (!slot)  { showToast('Please select a pickup time', 'error'); return; }

  const listing = FoodRescueData.listings.find(l => l.id === listingId);
  if (!listing) return;

  const code = genReservationCode();
  listing.claimed = Math.min(listing.claimed + qty, listing.quantity);

  const reservation = {
    id: genId('res'),
    listingId,
    code,
    name,
    phone,
    qty,
    slot,
    listingName: listing.name,
    donor: listing.donor,
    savedAt: new Date().toISOString(),
  };

  FoodRescueData.reservations.push(reservation);
  Store.set('reservations', FoodRescueData.reservations);

  // Show success state
  const modal = document.querySelector('#reserveModal .modal');
  if (modal) {
    modal.innerHTML = `
      <div class="modal-success">
        <div class="success-icon">🎉</div>
        <h3>You're all set, ${name}!</h3>
        <p>Show this code when you arrive to pick up your food.</p>
        <div class="reservation-code">${code}</div>
        <p><strong>📍 ${listing.donor}</strong></p>
        <p>🕐 Pickup at <strong>${slot}</strong></p>
        <p style="margin-top:8px">You saved approximately <strong style="color:var(--green-fresh)">${(qty * 0.5).toFixed(1)} kg</strong> of food from waste! 🌍</p>
        <button class="btn btn-primary btn-full" style="margin-top:20px"
                onclick="closeModal('reserveModal')">Done</button>
      </div>
    `;
  }

  if (phone) {
    console.log(`[SMS] To: ${phone} — "FoodRescue: Your reservation code is ${code}. Pick up ${listing.name} at ${slot} from ${listing.donor}. Thank you!"`);
  }

  showToast('Reservation confirmed! 🌿', 'success');
  refreshHomeListings();
}

window.showReservationModal = showReservationModal;
window.selectTimeSlot       = selectTimeSlot;
window.confirmReservation   = confirmReservation;

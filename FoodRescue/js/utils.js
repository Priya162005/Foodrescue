// ============================================================
// utils.js — Shared utility functions across the platform
// ============================================================

// --- TIME ---
function timeAgo(date) {
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60)     return 'just now';
  if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatPickup(start, end) {
  return `${start} – ${end}`;
}

function isPickupSoon(startTime) {
  const [h, m] = startTime.split(':').map(Number);
  const now = new Date();
  const pickup = new Date();
  pickup.setHours(h, m, 0, 0);
  const diff = (pickup - now) / 60000; // minutes
  return diff > 0 && diff <= 45;
}

// --- NUMBERS ---
function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

function countUp(el, target, duration = 1800) {
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.round(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// --- STARS ---
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// --- DISCOUNT CALC ---
function discountPercent(original, current) {
  if (!original || original === 0) return 0;
  return Math.round(((original - current) / original) * 100);
}

// --- GENERATE RESERVATION CODE ---
function genReservationCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// --- GENERATE UNIQUE ID ---
function genId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

// --- TOAST NOTIFICATION ---
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = 'toast';
  }, duration);
}

// --- MODAL HELPERS ---
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

function switchModal(closeId, openId) {
  closeModal(closeId);
  setTimeout(() => openModal(openId), 200);
}

// --- NAVBAR SCROLL ---
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// --- MOBILE MENU ---
function toggleMenu() {
  const links = document.getElementById('navLinks');
  if (links) links.classList.toggle('mobile-open');
}

// --- SCROLL REVEAL ---
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- GEOLOCATION ---
function getUserLocation(onSuccess, onError) {
  if (!navigator.geolocation) {
    onError('Geolocation not supported');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos => onSuccess(pos.coords.latitude, pos.coords.longitude),
    () => onError('Location permission denied')
  );
}

// --- LOCAL STORAGE HELPERS ---
const Store = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem('fr_' + key)); }
    catch { return null; }
  },
  set: (key, val) => {
    try { localStorage.setItem('fr_' + key, JSON.stringify(val)); }
    catch {}
  },
  remove: (key) => localStorage.removeItem('fr_' + key),
};

// --- AUTH MOCK ---
function handleLogin() {
  const inputs = document.querySelectorAll('#loginModal .input');
  const email = inputs[0]?.value?.trim();
  const password = inputs[1]?.value?.trim();
  if (!email || !password) { showToast('Please fill in all fields', 'error'); return; }
  FoodRescueData.currentUser = { email, name: email.split('@')[0], role: 'user' };
  Store.set('user', FoodRescueData.currentUser);
  closeModal('loginModal');
  showToast('Welcome back! 🌿', 'success');
}

function handleRegister() {
  const inputs = document.querySelectorAll('#registerModal .input');
  const name  = inputs[0]?.value?.trim();
  const email = inputs[1]?.value?.trim();
  const phone = inputs[2]?.value?.trim();
  const password = inputs[3]?.value?.trim();
  if (!name || !email || !password) { showToast('Please fill in required fields', 'error'); return; }
  FoodRescueData.currentUser = { name, email, phone, role: 'user' };
  Store.set('user', FoodRescueData.currentUser);
  closeModal('registerModal');
  showToast(`Welcome, ${name}! 🎉`, 'success');
}

function selectRole(role) {
  document.getElementById('roleUser')?.classList.toggle('active', role === 'user');
  document.getElementById('roleDonor')?.classList.toggle('active', role === 'donor');
}

// --- FILTER LOGIC ---
function initFilters(containerId, gridId, data) {
  const container = document.getElementById(containerId) || document.querySelector('.filter-bar');
  if (!container) return;
  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const filtered = filter === 'all'
        ? data
        : filter === 'free'
          ? data.filter(d => d.isFree)
          : data.filter(d => d.category === filter || d.tags.includes(filter));
      renderCards(gridId, filtered);
    });
  });
}

// --- EXPOSE ---
window.timeAgo    = timeAgo;
window.formatPickup = formatPickup;
window.isPickupSoon = isPickupSoon;
window.formatNumber = formatNumber;
window.countUp    = countUp;
window.renderStars = renderStars;
window.discountPercent = discountPercent;
window.genReservationCode = genReservationCode;
window.genId      = genId;
window.showToast  = showToast;
window.openModal  = openModal;
window.closeModal = closeModal;
window.switchModal = switchModal;
window.initNavbarScroll = initNavbarScroll;
window.toggleMenu = toggleMenu;
window.initReveal = initReveal;
window.getUserLocation = getUserLocation;
window.Store      = Store;
window.handleLogin    = handleLogin;
window.handleRegister = handleRegister;
window.selectRole = selectRole;
window.initFilters = initFilters;

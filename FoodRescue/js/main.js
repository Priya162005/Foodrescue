// ============================================================
// main.js — Homepage bootstrapper
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initReveal();
  initHeroTicker();
  initLiveStrip();
  loadHomeListings();
  initHomeFilters();
  animateHeroStats();
  simulateLiveUpdates();
  restoreSession();
});

function loadHomeListings() {
  renderCards('homeListings', FoodRescueData.listings.slice(0, 6));
}

function refreshHomeListings() {
  // Re-render after a reservation
  const active = document.querySelector('.filter-btn.active');
  const filter = active ? active.dataset.filter : 'all';
  applyFilter(filter, FoodRescueData.listings, 'homeListings');
}

function initHomeFilters() {
  const filterBar = document.querySelector('.filter-bar');
  if (!filterBar) return;
  filterBar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter, FoodRescueData.listings, 'homeListings');
    });
  });
}

function animateHeroStats() {
  const statEls = document.querySelectorAll('.stat-number[data-target]');
  if (!statEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.target);
        countUp(e.target, target, 1800);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => observer.observe(el));
}

function restoreSession() {
  const saved = Store.get('user');
  if (saved) {
    FoodRescueData.currentUser = saved;
    updateNavForUser(saved);
  }
}

function updateNavForUser(user) {
  const actions = document.querySelector('.nav-actions');
  if (!actions) return;
  actions.innerHTML = `
    <span style="font-size:0.88rem;color:var(--smoke)">Hi, ${user.name.split(' ')[0]}!</span>
    <a href="html/dashboard.html" class="btn btn-primary btn-sm">My Dashboard</a>
  `;
}

window.refreshHomeListings = refreshHomeListings;

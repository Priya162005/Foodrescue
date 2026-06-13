// ============================================================
// components/filter.js — Filter & search logic
// ============================================================

function applyFilter(filter, sourceData, gridId) {
  let results;
  if (filter === 'all')    results = sourceData;
  else if (filter === 'free')  results = sourceData.filter(d => d.isFree);
  else results = sourceData.filter(d => d.category === filter || d.tags.includes(filter));
  renderCards(gridId, results);
}

function applySearch(query, sourceData, gridId) {
  const q = query.toLowerCase().trim();
  if (!q) { renderCards(gridId, sourceData); return; }
  const results = sourceData.filter(d =>
    d.name.toLowerCase().includes(q) ||
    d.donor.toLowerCase().includes(q) ||
    d.tags.some(t => t.includes(q))
  );
  renderCards(gridId, results);
}

function sortListings(method, sourceData) {
  const sorted = [...sourceData];
  switch (method) {
    case 'nearest':  return sorted.sort((a, b) => a.distance - b.distance);
    case 'price':    return sorted.sort((a, b) => a.price - b.price);
    case 'newest':   return sorted.sort((a, b) => b.postedAt - a.postedAt);
    case 'expiring': return sorted.sort((a, b) => a.pickupStart.localeCompare(b.pickupStart));
    case 'rating':   return sorted.sort((a, b) => b.rating - a.rating);
    default:         return sorted;
  }
}

window.applyFilter  = applyFilter;
window.applySearch  = applySearch;
window.sortListings = sortListings;

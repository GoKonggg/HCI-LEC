// ======== Greet user by name ========
document.addEventListener("DOMContentLoaded", function() {
  // Greet
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let current = localStorage.getItem("current") || "";
  let user = users.find(u => u.email === current);
  if(user) document.querySelector('.account-dashboard h2').textContent = `Hi, ${user.first}!`;

  // Render recently viewed
  renderRecentlyViewed();
});

// ======== Sign Out ========
function signOut() {
  localStorage.removeItem("current");
  window.location.href = "index.html";
}

// ======== Render Recently Viewed Products ========
function renderRecentlyViewed() {
  const container = document.getElementById('recentProducts');
  if (!container) return;
  const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  if (recent.length === 0) {
    container.innerHTML = "<p style='color:#aaa;margin-top:6px;'>You haven't viewed any products yet.</p>";
    return;
  }
  container.innerHTML = recent.map(prod => `
    <a href="product-detail.html?id=${prod.id}" class="recent-product-card">
      <img src="${prod.img}" alt="${prod.title}">
      <div class="recent-product-title">${prod.title}</div>
      <div class="recent-product-price">${prod.price}</div>
    </a>
  `).join('');
}

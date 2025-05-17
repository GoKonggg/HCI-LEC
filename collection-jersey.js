// ========================
// Data Sample (Edit sendiri!)
// ========================
const topSales = [
  {
    img: "asset/prod-1.jpg",
    title: "RRQ X SLIME FANS BLACK 2025",
    price: "IDR 300,000.00",
    category: "Jersey",
    link: "#"
  },
  {
    img: "asset/prod-1.jpg",
    title: "RRQ X SLIME FANS WHITE 2025",
    price: "IDR 300,000.00",
    category: "Jersey",
    link: "#"
  }
];

const products = [
  {
    img: "asset/prod-1.jpg",
    title: "RRQ X SLIME FANS BLACK 2025",
    price: 300000,
    category: "Jersey"
  },
  {
    img: "asset/prod-1.jpg",
    title: "RRQ X SLIME FANS WHITE 2025",
    price: 300000,
    category: "Jersey"
  },
  {
    img: "asset/prod-1.jpg",
    title: "RRQ PREMIUM HOODIE",
    price: 379000,
    category: "Hoodie"
  },
  {
    img: "asset/prod-1.jpg",
    title: "RRQ SIGNATURE CAP",
    price: 129000,
    category: "Accessories"
  }
];

// ========================
// Top Sales Carousel
// ========================
let currentTopSale = 0;

function renderTopSalesCarousel() {
  const list = document.getElementById("topSalesList");
  list.innerHTML = "";

  topSales.forEach((prod, i) => {
    const div = document.createElement("div");
    div.className = "top-sale-card";
    if (i === currentTopSale) div.style.border = "2px solid #ff7d00";
    div.innerHTML = `
      <img src="${prod.img}" alt="${prod.title}"/>
      <div class="top-sale-info">
        <div class="top-sale-title">${prod.title}</div>
        <div class="top-sale-price">${prod.price}</div>
      </div>
    `;
    div.onclick = () => window.location.href = prod.link;
    list.appendChild(div);
  });

  // Auto scroll to current card
  const cardWidth = 300; // approx, samakan dengan CSS min-width/max-width
  list.scrollTo({
    left: currentTopSale * (cardWidth + 20),
    behavior: "smooth"
  });
}

// Tombol panah
function nextTopSale() {
  currentTopSale = (currentTopSale + 1) % topSales.length;
  renderTopSalesCarousel();
}
function prevTopSale() {
  currentTopSale = (currentTopSale - 1 + topSales.length) % topSales.length;
  renderTopSalesCarousel();
}

// Event listener tombol panah
document.getElementById("topSalesNext").onclick = nextTopSale;
document.getElementById("topSalesPrev").onclick = prevTopSale;

// Auto slide tiap 4 detik
setInterval(nextTopSale, 4000);

renderTopSalesCarousel();

// ========================
// Product Grid Render
// ========================
let currentCategory = "";
let currentSort = "default";
function renderProducts() {
  let filtered = [...products];
  // filter kategori
  if (currentCategory) filtered = filtered.filter(p => p.category === currentCategory);
  // sorting
  if (currentSort === "priceLow") filtered.sort((a, b) => a.price - b.price);
  if (currentSort === "priceHigh") filtered.sort((a, b) => b.price - a.price);

  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  filtered.forEach(prod => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${prod.img}" class="prod-img" alt="${prod.title}">
      <div class="prod-title">${prod.title}</div>
      <div class="prod-price">IDR ${prod.price.toLocaleString("id-ID")}.00</div>
      <div class="prod-action">
        <button>Add to Cart</button>
        <button class="wishlist-btn"><i class="fa-regular fa-heart"></i></button>
      </div>
    `;
    grid.appendChild(div);
  });
  document.getElementById("prodCount").textContent = `${filtered.length} products`;
}
renderProducts();

// ========================
// Filter Modal/Sheet Logic
// ========================
document.getElementById("filterBtn").onclick = () => {
  document.getElementById("filterModal").style.display = "flex";
};
document.getElementById("filterClose").onclick = () => {
  document.getElementById("filterModal").style.display = "none";
};
document.getElementById("applyFilterBtn").onclick = () => {
  currentCategory = document.getElementById("categoryFilter").value;
  currentSort = document.getElementById("sortFilter").value;
  document.getElementById("filterModal").style.display = "none";
  renderProducts();
};

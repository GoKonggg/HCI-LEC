// Simulasi data produk (sebenarnya bisa diimport/fetch dari file/data lain)
const products = [
  { id: 1, name: "RRQ ROSSEAU T-SHIRT SHORT SLEEVE", price: 159000, img: "./ASSET/prod-1.jpg" },
  { id: 2, name: "RRQ PREMIUM HOODIE", price: 379000, img: "./ASSET/prod-2.jpg" },
  { id: 3, name: "RRQ SIGNATURE CAP", price: 129000, img: "./ASSET/prod-3.jpg" },
  { id: 4, name: "RRQ Jogger Pants", price: 269000, img: "./ASSET/prod-4.jpg" },
  { id: 5, name: "RRQ Classic Jersey", price: 185000, img: "./ASSET/prod-5.jpg" }
  // Tambah produk lainnya...
];

// Ambil query dari URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || "";
}

// Tampilkan hasil pencarian
function showResults(items, query) {
  const container = document.getElementById("searchResults");
  const info = document.getElementById("searchInfo");
  if (!query) {
    info.textContent = "Please enter a product name in the search bar above.";
    container.innerHTML = "";
    return;
  }
  info.textContent = `Showing results for: "${query}"`;
  if (!items.length) {
    container.innerHTML = "<p>No products found for your search.</p>";
    return;
  }
  container.innerHTML = "";
  items.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.img}" alt="${product.name}">
        <div class="product-title">${product.name}</div>
        <div class="product-price">IDR${product.price.toLocaleString()}</div>
      </div>
    `;
  });
}

// Ambil query dan tampilkan hasil saat halaman dibuka
function doSearch(query) {
  query = query.trim();
  const matchedProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  showResults(matchedProducts, query);
}

// Saat halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
  const query = getQueryParam("query");
  document.getElementById("searchInput").value = query || "";
  doSearch(query);

  // Ketika search bar di-submit lagi dari page ini
  document.querySelector(".searchbar").addEventListener("submit", function(e) {
    e.preventDefault();
    const val = document.getElementById("searchInput").value.trim();
    if (!val) return;
    window.location.href = `search.html?query=${encodeURIComponent(val)}`;
  });
});

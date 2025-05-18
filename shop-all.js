// Daftar produk, isi sesuai katalog kamu
const products = [
  // Jersey
  { id: "jersey-black", title: "RRQ X SLIME FANS BLACK 2025", price: "IDR 300,000.00", img: "https://dummyimage.com/200x170/000/fff&text=JERSEY", category: "jersey" },
  { id: "jersey-white", title: "RRQ X SLIME FANS WHITE 2025", price: "IDR 300,000.00", img: "https://dummyimage.com/200x170/111/fff&text=JERSEY", category: "jersey" },
  { id: "jersey-classic", title: "RRQ CLASSIC JERSEY", price: "IDR 250,000.00", img: "https://dummyimage.com/200x170/222/fff&text=JERSEY", category: "jersey" },
{ id: "jersey-black", title: "RRQ X SLIME FANS BLACK 2025", price: "IDR 300,000.00", img: "https://dummyimage.com/200x170/000/fff&text=JERSEY", category: "jersey" },
  { id: "jersey-white", title: "RRQ X SLIME FANS WHITE 2025", price: "IDR 300,000.00", img: "https://dummyimage.com/200x170/111/fff&text=JERSEY", category: "jersey" },
  { id: "jersey-classic", title: "RRQ CLASSIC JERSEY", price: "IDR 250,000.00", img: "https://dummyimage.com/200x170/222/fff&text=JERSEY", category: "jersey" },
{ id: "jersey-black", title: "RRQ X SLIME FANS BLACK 2025", price: "IDR 300,000.00", img: "https://dummyimage.com/200x170/000/fff&text=JERSEY", category: "jersey" },
  { id: "jersey-white", title: "RRQ X SLIME FANS WHITE 2025", price: "IDR 300,000.00", img: "https://dummyimage.com/200x170/111/fff&text=JERSEY", category: "jersey" },
  { id: "jersey-classic", title: "RRQ CLASSIC JERSEY", price: "IDR 250,000.00", img: "https://dummyimage.com/200x170/222/fff&text=JERSEY", category: "jersey" },
{ id: "jersey-black", title: "RRQ X SLIME FANS BLACK 2025", price: "IDR 300,000.00", img: "https://dummyimage.com/200x170/000/fff&text=JERSEY", category: "jersey" },
  { id: "jersey-white", title: "RRQ X SLIME FANS WHITE 2025", price: "IDR 300,000.00", img: "https://dummyimage.com/200x170/111/fff&text=JERSEY", category: "jersey" },
  { id: "jersey-classic", title: "RRQ CLASSIC JERSEY", price: "IDR 250,000.00", img: "https://dummyimage.com/200x170/222/fff&text=JERSEY", category: "jersey" },
{ id: "jersey-black", title: "RRQ X SLIME FANS BLACK 2025", price: "IDR 300,000.00", img: "https://dummyimage.com/200x170/000/fff&text=JERSEY", category: "jersey" },
  { id: "jersey-white", title: "RRQ X SLIME FANS WHITE 2025", price: "IDR 300,000.00", img: "https://dummyimage.com/200x170/111/fff&text=JERSEY", category: "jersey" },
  { id: "jersey-classic", title: "RRQ CLASSIC JERSEY", price: "IDR 250,000.00", img: "https://dummyimage.com/200x170/222/fff&text=JERSEY", category: "jersey" },
{ id: "jersey-black", title: "RRQ X SLIME FANS BLACK 2025", price: "IDR 300,000.00", img: "https://dummyimage.com/200x170/000/fff&text=JERSEY", category: "jersey" },
  { id: "jersey-white", title: "RRQ X SLIME FANS WHITE 2025", price: "IDR 300,000.00", img: "https://dummyimage.com/200x170/111/fff&text=JERSEY", category: "jersey" },
  { id: "jersey-classic", title: "RRQ CLASSIC JERSEY", price: "IDR 250,000.00", img: "https://dummyimage.com/200x170/222/fff&text=JERSEY", category: "jersey" },

  // Hoodie
  { id: "hoodie-premium", title: "RRQ PREMIUM HOODIE", price: "IDR 379,000.00", img: "https://dummyimage.com/200x170/444/fff&text=HOODIE", category: "hoodie" },
  { id: "hoodie-windbreaker", title: "RRQ WINDBREAKER", price: "IDR 289,000.00", img: "https://dummyimage.com/200x170/666/fff&text=HOODIE", category: "hoodie" },
    { id: "hoodie-premium", title: "RRQ PREMIUM HOODIE", price: "IDR 379,000.00", img: "https://dummyimage.com/200x170/444/fff&text=HOODIE", category: "hoodie" },
  { id: "hoodie-windbreaker", title: "RRQ WINDBREAKER", price: "IDR 289,000.00", img: "https://dummyimage.com/200x170/666/fff&text=HOODIE", category: "hoodie" },
{ id: "hoodie-premium", title: "RRQ PREMIUM HOODIE", price: "IDR 379,000.00", img: "https://dummyimage.com/200x170/444/fff&text=HOODIE", category: "hoodie" },
  { id: "hoodie-windbreaker", title: "RRQ WINDBREAKER", price: "IDR 289,000.00", img: "https://dummyimage.com/200x170/666/fff&text=HOODIE", category: "hoodie" },

  { id: "hoodie-premium", title: "RRQ PREMIUM HOODIE", price: "IDR 379,000.00", img: "https://dummyimage.com/200x170/444/fff&text=HOODIE", category: "hoodie" },
  { id: "hoodie-windbreaker", title: "RRQ WINDBREAKER", price: "IDR 289,000.00", img: "https://dummyimage.com/200x170/666/fff&text=HOODIE", category: "hoodie" },

  { id: "hoodie-premium", title: "RRQ PREMIUM HOODIE", price: "IDR 379,000.00", img: "https://dummyimage.com/200x170/444/fff&text=HOODIE", category: "hoodie" },
  { id: "hoodie-windbreaker", title: "RRQ WINDBREAKER", price: "IDR 289,000.00", img: "https://dummyimage.com/200x170/666/fff&text=HOODIE", category: "hoodie" },

  { id: "hoodie-premium", title: "RRQ PREMIUM HOODIE", price: "IDR 379,000.00", img: "https://dummyimage.com/200x170/444/fff&text=HOODIE", category: "hoodie" },
  { id: "hoodie-windbreaker", title: "RRQ WINDBREAKER", price: "IDR 289,000.00", img: "https://dummyimage.com/200x170/666/fff&text=HOODIE", category: "hoodie" },

  { id: "hoodie-premium", title: "RRQ PREMIUM HOODIE", price: "IDR 379,000.00", img: "https://dummyimage.com/200x170/444/fff&text=HOODIE", category: "hoodie" },
  { id: "hoodie-windbreaker", title: "RRQ WINDBREAKER", price: "IDR 289,000.00", img: "https://dummyimage.com/200x170/666/fff&text=HOODIE", category: "hoodie" },

  { id: "hoodie-premium", title: "RRQ PREMIUM HOODIE", price: "IDR 379,000.00", img: "https://dummyimage.com/200x170/444/fff&text=HOODIE", category: "hoodie" },
  { id: "hoodie-windbreaker", title: "RRQ WINDBREAKER", price: "IDR 289,000.00", img: "https://dummyimage.com/200x170/666/fff&text=HOODIE", category: "hoodie" },


  // Accessories
  { id: "keychain", title: "RRQ KEYCHAIN", price: "IDR 35,000.00", img: "https://dummyimage.com/200x170/222/fff&text=ACCESSORY", category: "accessories" },
  { id: "socks", title: "RRQ SOCKS", price: "IDR 25,000.00", img: "https://dummyimage.com/200x170/333/fff&text=ACCESSORY", category: "accessories" },
 { id: "keychain", title: "RRQ KEYCHAIN", price: "IDR 35,000.00", img: "https://dummyimage.com/200x170/222/fff&text=ACCESSORY", category: "accessories" },
  { id: "socks", title: "RRQ SOCKS", price: "IDR 25,000.00", img: "https://dummyimage.com/200x170/333/fff&text=ACCESSORY", category: "accessories" },

   { id: "keychain", title: "RRQ KEYCHAIN", price: "IDR 35,000.00", img: "https://dummyimage.com/200x170/222/fff&text=ACCESSORY", category: "accessories" },
  { id: "socks", title: "RRQ SOCKS", price: "IDR 25,000.00", img: "https://dummyimage.com/200x170/333/fff&text=ACCESSORY", category: "accessories" },

   { id: "keychain", title: "RRQ KEYCHAIN", price: "IDR 35,000.00", img: "https://dummyimage.com/200x170/222/fff&text=ACCESSORY", category: "accessories" },
  { id: "socks", title: "RRQ SOCKS", price: "IDR 25,000.00", img: "https://dummyimage.com/200x170/333/fff&text=ACCESSORY", category: "accessories" },

   { id: "keychain", title: "RRQ KEYCHAIN", price: "IDR 35,000.00", img: "https://dummyimage.com/200x170/222/fff&text=ACCESSORY", category: "accessories" },
  { id: "socks", title: "RRQ SOCKS", price: "IDR 25,000.00", img: "https://dummyimage.com/200x170/333/fff&text=ACCESSORY", category: "accessories" },

   { id: "keychain", title: "RRQ KEYCHAIN", price: "IDR 35,000.00", img: "https://dummyimage.com/200x170/222/fff&text=ACCESSORY", category: "accessories" },
  { id: "socks", title: "RRQ SOCKS", price: "IDR 25,000.00", img: "https://dummyimage.com/200x170/333/fff&text=ACCESSORY", category: "accessories" },

  // Cap & Hat
  { id: "cap-signature", title: "RRQ SIGNATURE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/555/fff&text=CAP+%26+HAT", category: "cap" },
  
  { id: "cap-white", title: "RRQ WHITE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/aaa/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-signature", title: "RRQ SIGNATURE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/555/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-white", title: "RRQ WHITE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/aaa/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-signature", title: "RRQ SIGNATURE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/555/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-white", title: "RRQ WHITE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/aaa/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-signature", title: "RRQ SIGNATURE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/555/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-white", title: "RRQ WHITE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/aaa/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-signature", title: "RRQ SIGNATURE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/555/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-white", title: "RRQ WHITE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/aaa/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-signature", title: "RRQ SIGNATURE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/555/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-white", title: "RRQ WHITE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/aaa/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-signature", title: "RRQ SIGNATURE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/555/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-white", title: "RRQ WHITE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/aaa/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-signature", title: "RRQ SIGNATURE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/555/fff&text=CAP+%26+HAT", category: "cap" },
  { id: "cap-white", title: "RRQ WHITE CAP", price: "IDR 129,000.00", img: "https://dummyimage.com/200x170/aaa/fff&text=CAP+%26+HAT", category: "cap" }
];


function renderProducts(filterCat = "all") {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = "";
  const filtered = filterCat === "all" ? products : products.filter(p => p.category === filterCat);
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; width:100%; color:#888; text-align:center;">No product found.</div>`;
    return;
  }
  filtered.forEach(p => {
    grid.innerHTML += `
      <a class="shopall-card" href="product-detail.html?id=${p.id}">
        <div class="shopall-img"><img src="${p.img}" alt="${p.title}"></div>
        <div class="shopall-title">${p.title}</div>
        <div class="shopall-price">${p.price}</div>
        <div class="shopall-category">${capitalize(p.category)}</div>
      </a>
    `;
  });
}
function capitalize(txt) {
  return txt.charAt(0).toUpperCase() + txt.slice(1).replace('-', ' ');
}

// --- FILTER HANDLER
document.querySelectorAll('.shopall-filter').forEach(btn => {
  btn.onclick = function() {
    document.querySelectorAll('.shopall-filter').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const cat = this.dataset.filter;
    renderProducts(cat);
  };
});

// INIT
renderProducts("all");

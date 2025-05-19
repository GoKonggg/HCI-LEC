// Misal data produk, bisa dari file lain juga
const products = [
    {
  name: "RRQ Limited Jersey 2024",
    image: "./ASSET/prod-1.jpg",
    oldPrice: 499000,
    price: 349000,
    discount: 30,
    category: "jersey",
    discountEnd: "2025-06-01T23:59:59" ,
    href : "discount-product-detail.html"
  },
  
    {
  name: "RRQ Limited Jersey 2024",
    image: "./ASSET/prod-1.jpg",
    oldPrice: 499000,
    price: 349000,
    discount: 30,
    category: "jersey",
    discountEnd: "2025-06-01T23:59:59" 
  },
    {
  name: "RRQ Limited Jersey 2024",
    image: "./ASSET/prod-1.jpg",
    oldPrice: 499000,
    price: 349000,
    discount: 30,
    category: "jersey",
    discountEnd: "2025-06-01T23:59:59" 
  },
    {
  name: "RRQ Limited Jersey 2024",
    image: "./ASSET/prod-1.jpg",
    oldPrice: 499000,
    price: 349000,
    discount: 30,
    category: "jersey",
    discountEnd: "2025-06-01T23:59:59" 
  },
    {
  name: "RRQ Limited Jersey 2024",
    image: "./ASSET/prod-1.jpg",
    oldPrice: 499000,
    price: 349000,
    discount: 30,
    category: "jersey",
    discountEnd: "2025-06-01T23:59:59" 
  },
    {
  name: "RRQ Limited Jersey 2024",
    image: "./ASSET/prod-1.jpg",
    oldPrice: 499000,
    price: 349000,
    discount: 30,
    category: "jersey",
    discountEnd: "2025-06-01T23:59:59" 
  },
    {
  name: "RRQ Limited Jersey 2024",
    image: "./ASSET/prod-1.jpg",
    oldPrice: 499000,
    price: 349000,
    discount: 30,
    category: "jersey",
    discountEnd: "2025-06-01T23:59:59" 
  },
    {
  name: "RRQ Limited Jersey 2024",
    image: "./ASSET/prod-1.jpg",
    oldPrice: 499000,
    price: 349000,
    discount: 30,
    category: "jersey",
    discountEnd: "2025-06-01T23:59:59" 
  },
    {
  name: "RRQ Limited Jersey 2024",
    image: "./ASSET/prod-1.jpg",
    oldPrice: 499000,
    price: 349000,
    discount: 30,
    category: "jersey",
    discountEnd: "2025-06-01T23:59:59" 
  },
    {
  name: "RRQ Limited Jersey 2024",
    image: "./ASSET/prod-1.jpg",
    oldPrice: 499000,
    price: 349000,
    discount: 30,
    category: "jersey",
    discountEnd: "2025-06-01T23:59:59" 
  },
    {
  name: "RRQ Limited Jersey 2024",
    image: "./ASSET/prod-1.jpg",
    oldPrice: 499000,
    price: 349000,
    discount: 30,
    category: "jersey",
    discountEnd: "2025-06-01T23:59:59" 
  },
    {
  name: "RRQ Limited Jersey 2024",
    image: "./ASSET/prod-1.jpg",
    oldPrice: 499000,
    price: 349000,
    discount: 30,
    category: "jersey",
    discountEnd: "2025-06-01T23:59:59" 
  },

];

// Filter diskon saja
const discountedProducts = products.filter(p => p.discount > 0);

const grid = document.getElementById('discountGrid');


grid.innerHTML = discountedProducts.map((p, idx) => `
  <div class="discount-card" data-idx="${idx}">
    <button class="wishlist-btn" data-idx="${idx}" title="Add to wishlist">
      <i class="fa-regular fa-heart"></i>
    </button>
    <a href="${p.href || 'discount-product-detail.html'}">
      <div class="discount-badge">-${p.discount}%</div>
      <img src="${p.image}" alt="${p.name}" class="discount-img">
      <h3>${p.name}</h3>
      <div>
        <span class="discount-price">Rp ${p.price.toLocaleString()}</span>
        <span class="discount-old">Rp ${p.oldPrice.toLocaleString()}</span>
      </div>
      <div class="discount-countdown" id="countdown-${idx}"></div>
    </a>
  </div>
`).join('');



// Setelah innerHTML produk, tambahkan untuk tiap card:
discountedProducts.forEach((p, idx) => {
  const countdownDiv = document.getElementById(`countdown-${idx}`);
  if (!p.discountEnd) return;

  function updateCountdown() {
    const end = new Date(p.discountEnd).getTime();
    const now = Date.now();
    let diff = end - now;

    if (diff <= 0) {
      countdownDiv.innerHTML = `<span style="color:red;">Discount ended</span>`;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= 1000 * 60 * 60 * 24;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= 1000 * 60 * 60;
    const minutes = Math.floor(diff / (1000 * 60));
    diff %= 1000 * 60;
    const seconds = Math.floor(diff / 1000);

    countdownDiv.innerHTML = `
      <span class="countdown-label">HURRY UP! SALE END IN</span>
      <div class="countdown-timer">
        <span class="timer-segment">
          <span class="timer-box">${String(days).padStart(2, '0')}</span>
          <span class="timer-unit">Days</span>
        </span>
        <span class="timer-colon">:</span>
        <span class="timer-segment">
          <span class="timer-box">${String(hours).padStart(2, '0')}</span>
          <span class="timer-unit">Hours</span>
        </span>
        <span class="timer-colon">:</span>
        <span class="timer-segment">
          <span class="timer-box">${String(minutes).padStart(2, '0')}</span>
          <span class="timer-unit">Minutes</span>
        </span>
        <span class="timer-colon">:</span>
        <span class="timer-segment">
          <span class="timer-box">${String(seconds).padStart(2, '0')}</span>
          <span class="timer-unit">Seconds</span>
        </span>
      </div>
    `;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// Local Storage for wishlist (pakai idx string supaya konsisten)
const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

// Fungsi update icon heart
function updateWishlistIcons() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const idx = btn.getAttribute('data-idx');
    const isWishlisted = wishlist.includes(idx);
    btn.innerHTML = isWishlisted
      ? '<i class="fa-solid fa-heart yellow"></i>'
      : '<i class="fa-regular fa-heart"></i>';
  });
}

// Render icon pertama kali
updateWishlistIcons();

// Toggle wishlist saat heart di-click
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    const idx = btn.getAttribute('data-idx');
    const i = wishlist.indexOf(idx);
    if (i === -1) {
  wishlist.push(idx);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  btn.innerHTML = '<i class="fa-solid fa-heart yellow"></i>';  // <-- tambah yellow!
  toast("Added to wishlist!", { link: "wishlist.html" });
} else {
  wishlist.splice(i, 1);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
  toast("Removed from wishlist", { type: "error", link: "wishlist.html" });
}

    // Optional: update icon di navbar
    // updateNavbar && updateNavbar();
  });
});





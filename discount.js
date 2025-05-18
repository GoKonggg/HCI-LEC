// Misal data produk, bisa dari file lain juga
const products = [
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
grid.innerHTML = discountedProducts.map(p => `
  <div class="discount-card">
    <div class="discount-badge">-${p.discount}%</div>
    <img src="${p.image}" alt="${p.name}" class="discount-img">
    <h3>${p.name}</h3>
    <div>
      <span class="discount-price">Rp ${p.price.toLocaleString()}</span>
      <span class="discount-old">Rp ${p.oldPrice.toLocaleString()}</span>
    </div>
  </div>
`).join('');

grid.innerHTML = discountedProducts.map((p, idx) => `
  <div class="discount-card">
    <div class="discount-badge">-${p.discount}%</div>
    <img src="${p.image}" alt="${p.name}" class="discount-img">
    <h3>${p.name}</h3>
    <div>
      <span class="discount-price">Rp ${p.price.toLocaleString()}</span>
      <span class="discount-old">Rp ${p.oldPrice.toLocaleString()}</span>
    </div>
    <div class="discount-countdown" id="countdown-${idx}"></div>
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


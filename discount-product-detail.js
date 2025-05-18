// ===== COUNTDOWN DISKON =====
const discountEndTime = new Date();
discountEndTime.setHours(discountEndTime.getHours() + 3); // Atur 3 jam dari sekarang

function pad(n) { return n < 10 ? '0' + n : n; }
function updateCountdown() {
  const now = new Date();
  const diff = Math.max(0, discountEndTime - now);
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const mins = Math.floor((diff / 1000 / 60) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  const timerElem = document.getElementById('countdown-timer');
  if (timerElem) {
    if (diff > 0) {
      timerElem.textContent = `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    } else {
      timerElem.textContent = 'EXPIRED';
      document.querySelector('.discount-countdown').style.opacity = 0.5;
    }
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();


// ====== TOAST NOTIFIKASI (versi kamu, pusat layar) ======
function toast(msg, opts = {}) {
  const {type = "success", link = null, linkText = "Your Wishlist"} = opts;
  const box = document.createElement("div");
  box.className = `toast-box ${type === "error" ? "error" : ""}`;
  box.innerHTML = `
    <i class="fa-solid fa-check icon"></i>
    <div class="msg">
      ${msg}${link ? `<br><a href="${link}">${linkText}</a>` : ""}
    </div>
  `;
  document.body.appendChild(box);
  setTimeout(() => box.classList.add("hide"), 3300);
  box.addEventListener("animationend", (e) => {
    if (e.animationName === "toastOut") box.remove();
  });
}

// ====== STORAGE HELPER (wishlist & cart) ======
const getWish = ()  => JSON.parse(localStorage.getItem("wishlist")||"[]");
const setWish = arr => localStorage.setItem("wishlist",JSON.stringify(arr));
const getCart = ()  => JSON.parse(localStorage.getItem("cart")||"[]");
const setCart = arr => localStorage.setItem("cart",JSON.stringify(arr));

// ====== SIZE CHART MODAL ======
const openSizeGuideBtn = document.getElementById('openSizeGuide');
const sizeGuideModal = document.getElementById('sizeGuideModal');
const closeSizeGuideBtn = document.getElementById('closeSizeGuide');

if (openSizeGuideBtn && sizeGuideModal && closeSizeGuideBtn) {
  openSizeGuideBtn.addEventListener('click', function(e){
    e.preventDefault();
    sizeGuideModal.classList.add('show');
  });
  closeSizeGuideBtn.addEventListener('click', function(){
    sizeGuideModal.classList.remove('show');
  });
  sizeGuideModal.addEventListener('click', function(e){
    if (e.target === sizeGuideModal) sizeGuideModal.classList.remove('show');
  });
}

// ====== REVIEW LOGIC ======
document.addEventListener('DOMContentLoaded', () => {
  const productId = "rrq-rosseau-tshirt"; // ganti id sesuai produk (HARUS UNIK)

  // --- Review Stars
  const reviewsList = document.getElementById('reviewsList');
  const reviewForm = document.getElementById('reviewForm');
  const reviewText = document.getElementById('reviewText');
  const reviewStarsInput = document.getElementById('reviewStarsInput');
  const productReviewKey = 'reviews_' + productId;
  let selectedStars = 0;

  if (reviewStarsInput) {
    [...reviewStarsInput.children].forEach(star => {
      star.addEventListener('mouseenter', function () {
        highlightStars(star.dataset.value);
      });
      star.addEventListener('mouseleave', function () {
        highlightStars(selectedStars);
      });
      star.addEventListener('click', function () {
        selectedStars = Number(star.dataset.value);
        highlightStars(selectedStars);
      });
    });
    reviewStarsInput.addEventListener('dblclick', function () {
      selectedStars = 0;
      highlightStars(0);
    });
    highlightStars(selectedStars);
  }
  function highlightStars(num) {
    [...reviewStarsInput.children].forEach(star => {
      if (Number(star.dataset.value) <= num) {
        star.classList.remove('fa-regular');
        star.classList.add('fa-solid');
        star.classList.add('selected');
      } else {
        star.classList.remove('fa-solid');
        star.classList.add('fa-regular');
        star.classList.remove('selected');
      }
    });
  }

  function loadReviews() {
    reviewsList.innerHTML = '';
    let reviews = JSON.parse(localStorage.getItem(productReviewKey) || '[]');
    if (!reviews.length) {
      reviewsList.innerHTML = '<p style="color:#888;margin:12px 0 0 0;">No reviews yet. Be the first!</p>';
      return;
    }
    reviews.forEach((rev) => {
      const reviewElem = document.createElement('div');
      reviewElem.className = 'review';
      reviewElem.innerHTML = `
        <div class="review-stars">
          ${'<i class="fa-solid fa-star"></i>'.repeat(rev.stars)}
          ${'<i class="fa-regular fa-star"></i>'.repeat(5 - rev.stars)}
        </div>
        <div class="review-content">
          <span class="review-user">by: ${rev.user}</span>
          <span class="review-text">${rev.text}</span>
        </div>
      `;
      reviewsList.appendChild(reviewElem);
    });
  }
  loadReviews();

  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const text = reviewText.value.trim();
      if (!text) return;
      const stars = selectedStars > 0 ? selectedStars : 4;
      const review = {
        user: 'Anonymous',
        text: text,
        stars: stars,
      };
      let reviews = JSON.parse(localStorage.getItem(productReviewKey) || '[]');
      reviews.unshift(review);
      if (reviews.length > 12) reviews = reviews.slice(0, 12);
      localStorage.setItem(productReviewKey, JSON.stringify(reviews));
      loadReviews();
      reviewForm.reset();
      selectedStars = 0;
      highlightStars(0);
      toast("Review added!");
    });
  }

  // ===== ADD TO CART LOGIC =====
  const addCartBtn = document.querySelector('.add-cart-btn');
  if (addCartBtn) {
    addCartBtn.addEventListener('click', function() {
      let cart = getCart();
      const exist = cart.find(item => item && item.id === productId);
      if (exist) {
        exist.qty += 1;
        toast("Quantity increased in cart!");
      } else {
        cart.push({ id: productId, name: "RRQ ROSSEAU T-SHIRT", qty: 1 });
        toast("Added to cart!");
      }
      setCart(cart);
    });
  }

  // ===== WISHLIST LOGIC =====
  const addWishlistBtn = document.querySelector('.add-wishlist-btn');
  if (addWishlistBtn) {
    addWishlistBtn.addEventListener('click', function() {
      let wl = getWish();
      const liked = wl.includes(productId);
      const icon = addWishlistBtn.querySelector('i');
      if (liked) {
        wl = wl.filter(id => id !== productId);
        icon.className = 'fa-regular fa-heart';
        toast("Removed from wishlist", {type: "error", link: "wishlist.html"});
      } else {
        wl.push(productId);
        icon.className = 'fa-solid fa-heart yellow';
        toast("Added to wishlist!", {link: "wishlist.html"});
      }
      setWish(wl);
    });

    // Render icon pas load
    const icon = addWishlistBtn.querySelector('i');
    let wl = getWish();
    if (wl.includes(productId)) {
      icon.className = 'fa-solid fa-heart yellow';
    } else {
      icon.className = 'fa-regular fa-heart';
    }
  }
});

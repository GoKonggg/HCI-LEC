// ===== MODAL OPEN/CLOSE LOGIC =====
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

// ===== ALL INTERACTIVE LOGIC INSIDE DOMContentLoaded =====
document.addEventListener('DOMContentLoaded', () => {
  // ===== RECENTLY VIEWED LOGIC =====
  const product = {
    id: new URLSearchParams(window.location.search).get('id') || 'prod-1',
    img: document.getElementById('mainImg').src,
    title: document.querySelector('.prod-title').textContent,
    price: document.querySelector('.prod-price').textContent,
  };
  let recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  recent = recent.filter(item => item.id !== product.id);
  recent.unshift(product);
  if (recent.length > 5) recent = recent.slice(0, 5);
  localStorage.setItem('recentlyViewed', JSON.stringify(recent));

  // ====== REVIEW STAR RATING + FORM LOGIC ======
  const reviewsList = document.getElementById('reviewsList');
  const reviewForm = document.getElementById('reviewForm');
  const reviewText = document.getElementById('reviewText');
  const reviewStarsInput = document.getElementById('reviewStarsInput');
  const productReviewKey = 'reviews_' + product.id;
  let selectedStars = 0;

  // --- Star Rating Interaction
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
        star.style.color = '#FFD700';
      } else {
        star.classList.remove('fa-solid');
        star.classList.add('fa-regular');
        star.style.color = '#888';
      }
    });
  }
  // --- Render Reviews (from localStorage)
  function loadReviews() {
    reviewsList.innerHTML = '';
    let reviews = JSON.parse(localStorage.getItem(productReviewKey) || '[]');
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

  // --- Review Form Submission
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const text = reviewText.value.trim();
      if (!text) return;
      const stars = selectedStars > 0 ? selectedStars : 4; // Default 4 if not selected
      const review = {
        user: 'Anonymous',
        text: text,
        stars: stars,
      };
      let reviews = JSON.parse(localStorage.getItem(productReviewKey) || '[]');
      reviews.unshift(review);
      if (reviews.length > 10) reviews = reviews.slice(0, 10);
      localStorage.setItem(productReviewKey, JSON.stringify(reviews));
      loadReviews();
      reviewForm.reset();
      selectedStars = 0;
      highlightStars(0);
    });
  }

// ===== ADD TO CART LOGIC =====
const addCartBtn = document.querySelector('.add-cart-btn');
if (addCartBtn) {
  addCartBtn.addEventListener('click', function() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let existing = cart.find(item => item.id === product.id);
    if (!existing) {
      cart.push({ ...product, qty: 1 });
      // Ganti alert jadi toast:
      toast('Added to cart!');
    } else {
      existing.qty++;
      toast('Quantity increased in cart!');
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    // Bisa update badge/cart ui disini juga
    console.log('Cart:', cart);
  });
}


  // ===== ADD TO WISHLIST LOGIC =====
// ===== ADD TO WISHLIST LOGIC =====
const addWishlistBtn = document.querySelector('.add-wishlist-btn');
if (addWishlistBtn) {
  addWishlistBtn.addEventListener('click', function() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let existing = wishlist.find(item => item.id === product.id);
    if (!existing) {
      wishlist.push(product);
      // Ganti alert jadi toast:
      addWishlistBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      toast('Added to wishlist!');
    } else {
      wishlist = wishlist.filter(item => item.id !== product.id);
      addWishlistBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
      toast('Removed from wishlist!', {type: "error"});
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    console.log('Wishlist:', wishlist);
  });

  // Set icon heart on page load
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  let isWish = wishlist.find(item => item.id === product.id);
  addWishlistBtn.innerHTML = isWish
    ? '<i class="fa-solid fa-heart"></i>'
    : '<i class="fa-regular fa-heart"></i>';
}
});

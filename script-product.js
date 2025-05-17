// --- Product Gallery Image Switch ---
const mainImg = document.getElementById("mainImg");
const thumbs = document.querySelectorAll(".thumb");
thumbs.forEach(thumb => {
  thumb.addEventListener("click", function() {
    thumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
    mainImg.src = thumb.src;
  });
});

// --- Size Guide Modal ---
const sizeGuideBtn = document.getElementById("openSizeGuide");
const sizeGuideModal = document.getElementById("sizeGuideModal");
const closeSizeGuide = document.getElementById("closeSizeGuide");
sizeGuideBtn.onclick = () => sizeGuideModal.classList.add("show");
closeSizeGuide.onclick = () => sizeGuideModal.classList.remove("show");
sizeGuideModal.onclick = (e) => { if (e.target === sizeGuideModal) sizeGuideModal.classList.remove("show"); };

// --- Add to Cart & Wishlist (Fake/Front-end only) ---
document.querySelector(".add-cart-btn").onclick = () => {
  alert("Added to cart!");
};
document.querySelector(".add-wishlist-btn").onclick = function() {
  this.classList.toggle("added");
  const icon = this.querySelector("i");
  icon.classList.toggle("fa-regular");
  icon.classList.toggle("fa-solid");
  alert(this.classList.contains("added") ? "Added to wishlist!" : "Removed from wishlist!");
};

// --- Review Form (Append to List) ---
const reviewsList = document.getElementById("reviewsList");
document.getElementById("reviewForm").onsubmit = function(e) {
  e.preventDefault();
  const val = document.getElementById("reviewText").value.trim();
  if (!val) return;
  const div = document.createElement("div");
  div.className = "review";
  div.innerHTML = `
    <div class="review-stars">
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-regular fa-star"></i>
    </div>
    <div class="review-content">
      <span class="review-user">by: You</span>
      <span class="review-text">${val}</span>
    </div>
  `;
  reviewsList.appendChild(div);
  this.reset();
};

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

document.addEventListener('DOMContentLoaded', () => {
  const product = {
    id: new URLSearchParams(window.location.search).get('id'),
    img: document.getElementById('mainImg').src,
    title: document.querySelector('.prod-title').textContent,
    price: document.querySelector('.prod-price').textContent,
  };
  let recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  recent = recent.filter(item => item.id !== product.id);
  recent.unshift(product);
  if (recent.length > 5) recent = recent.slice(0, 5);
  localStorage.setItem('recentlyViewed', JSON.stringify(recent));
});





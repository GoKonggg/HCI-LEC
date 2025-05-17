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

/* ===================== HERO CAROUSEL ===================== */
const slides = document.querySelectorAll(".slide"),
      dots   = document.querySelectorAll(".dot");
let curSlide = 0, HERO_DELAY = 5000, heroTimer;

if (slides.length && dots.length) {
  function goTo(i){
    slides[curSlide].classList.remove("active");
    dots[curSlide].classList.remove("active");
    curSlide = i;
    slides[curSlide].classList.add("active");
    dots[curSlide].classList.add("active");
  }
  function startHero(){
    heroTimer = setInterval(()=>goTo((curSlide+1)%slides.length), HERO_DELAY);
  }
  dots.forEach(d=>
    d.onclick = e=>{ clearInterval(heroTimer); goTo(+e.target.dataset.index); startHero(); }
  );
  startHero();
}

/* ================== PRODUCT CAROUSEL ================== */
const $  = s=>document.querySelector(s);
const $$ = s=>document.querySelectorAll(s);

const pcTabs   = $$(".pc-tab"),
      pcTracks = $$(".pc-track"),
      pcWrap   = $(".pc-track-wrapper");

if (pcTabs.length && pcTracks.length && pcWrap) {
  pcTabs.forEach(btn=>btn.onclick=()=>{
    pcTabs.forEach(t=>t.classList.remove("active"));
    btn.classList.add("active");
    pcTracks.forEach(tr=>{
      const show = tr.dataset.tabContent===btn.dataset.tab;
      tr.classList.toggle("active",show);
      tr.style.display = show?"flex":"none";
      tr.parentElement.scrollTo({left:0});
    });
    startPcAuto();
  });

  $$(".pc-arrows button").forEach(btn=>{
    btn.onclick=()=>{
      const dir = btn.classList.contains("pc-prev")?-1:1,
            tr  = $(".pc-track.active"),
            wrap= tr.parentElement,
            step= tr.querySelector(".pc-card").offsetWidth + parseInt(getComputedStyle(tr).gap);
      let next = wrap.scrollLeft + dir*step;
      next = Math.max(0,Math.min(next,tr.scrollWidth-wrap.clientWidth));
      wrap.scrollTo({left:next,behavior:"smooth"});
    };
  });

  let pcTimer;
  function startPcAuto(){
    clearInterval(pcTimer);
    const tr=$(".pc-track.active"), wrap=tr.parentElement,
          step=tr.querySelector(".pc-card").offsetWidth+parseInt(getComputedStyle(tr).gap);
    pcTimer=setInterval(()=>{
      if(wrap.scrollLeft+step>=tr.scrollWidth-wrap.clientWidth)
        wrap.scrollTo({left:0,behavior:"smooth"});
      else wrap.scrollBy({left:step,behavior:"smooth"});
    },4000);
  }
  startPcAuto();
  pcWrap.onmouseenter=()=>clearInterval(pcTimer);
  pcWrap.onmouseleave=startPcAuto;
}

/* ===================== STORAGE HELPERS ===================== */
const getUsers = ()  => JSON.parse(localStorage.getItem("users")||"[]");
const setUsers = arr => localStorage.setItem("users",JSON.stringify(arr));
const getWish  = ()  => JSON.parse(localStorage.getItem("wishlist")||"[]");
const setWish  = arr => localStorage.setItem("wishlist",JSON.stringify(arr));
const getCart  = ()  => JSON.parse(localStorage.getItem("cart")||"[]");
const setCart  = arr => localStorage.setItem("cart",JSON.stringify(arr));
const setCurrent = em=>localStorage.setItem("current",em);
const getCurrent = () => localStorage.getItem("current");

/* ===================== TOAST (pusat layar) ===================== */
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

  // auto close setelah 3.3 detik
  setTimeout(() => box.classList.add("hide"), 3300);
  box.addEventListener("animationend", (e) => {
    if (e.animationName === "toastOut") box.remove();
  });
}

/* ================= WISHLIST & CART HANDLER ================ */
document.querySelectorAll('.pc-like').forEach(like => {
  like.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const card = like.closest('.pc-card');
    const pid = card?.dataset.id;
    if (!pid) return;

    let wl = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const icon = like.querySelector('i');
    const liked = wl.includes(pid);
    if (liked) {
      wl = wl.filter(id => id !== pid);
      icon.className = 'fa-regular fa-heart';
      icon.classList.remove('yellow');
      toast("Removed from wishlist", {type: "error" ,link: "wishlist.html"});
    } else {
      wl.push(pid);
      icon.className = 'fa-solid fa-heart yellow';  // <-- kuning!
      toast("Added to wishlist!", {link: "wishlist.html"});
    }
    localStorage.setItem('wishlist', JSON.stringify(wl));
    updateNavbar && updateNavbar();
  });

  // Render icon saat load
  const card = like.closest('.pc-card');
  const pid = card?.dataset.id;
  if (pid) {
    let wl = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const icon = like.querySelector('i');
    if (wl.includes(pid)) {
      icon.className = 'fa-solid fa-heart yellow';
    } else {
      icon.className = 'fa-regular fa-heart';
      icon.classList.remove('yellow');
    }
  }
});



/* cart indicator */
const cartLabel = $(".header-icons a:last-child span");
function updateCartIndicator(){
  if (cartLabel) cartLabel.textContent=`Cart : ${getCart().length} Item`;
}
document.addEventListener("DOMContentLoaded",updateCartIndicator);

/* =================== AUTH & NAVBAR =================== */
const accWrap=$(".account-wrap"),
      accBtn = $(".account-btn"),
      authModal=$("#authModal"),
      authTabs=$$(".auth-tab"),
      authForms=$$(".auth-form");

if (accBtn && accWrap) {
  accBtn.onclick=()=>accWrap.classList.toggle("show");
  document.addEventListener("click",e=>{ if(!accWrap.contains(e.target))accWrap.classList.remove("show"); });
}

function openAuth(t){
  if(!authModal) return;
  authModal.classList.add("show");
  authTabs.forEach(tb=>tb.classList.toggle("active",tb.dataset.target===t));
  authForms.forEach(f=>f.classList.toggle("active",f.id.toLowerCase().includes(t)));
}

const linkSignin = $("#link-signin");
const linkRegister = $("#link-register");
if (linkSignin) linkSignin.onclick=e=>{e.preventDefault();openAuth("signin");};
if (linkRegister) linkRegister.onclick=e=>{e.preventDefault();openAuth("register");};
authTabs.forEach(t=>t.onclick=()=>openAuth(t.dataset.target));
const authClose = $(".auth-close");
if (authClose && authModal) authClose.onclick=()=>authModal.classList.remove("show");
if (authModal) authModal.onclick=e=>{if(e.target===authModal)authModal.classList.remove("show");};

/* demo user */
if(!localStorage.getItem("users")){
  setUsers([{first:"Test",last:"User",email:"test@demo.com",password:"123456"}]);
}

/* register */
const formRegister = $("#formRegister");
if(formRegister){
  formRegister.addEventListener("submit",e=>{
    e.preventDefault();
    const [first,last,em,pw]=e.target.querySelectorAll("input");
    if(!/^[\w.+-]+@\w+\.\w+$/.test(em.value)){toast("Invalid email");return;}
    if(pw.value.length<6){toast("Password ≥ 6 chars");return;}
    const users=getUsers();
    if(users.some(u=>u.email===em.value)){toast("Email already exists");return;}
    users.push({first:first.value,last:last.value,email:em.value,password:pw.value});
    setUsers(users); setCurrent(em.value);
    authModal.classList.remove("show"); toast("Welcome, "+first.value+"!"); updateNavbar();
  });
}

/* sign in */
const formSignin = $("#formSignin");
if(formSignin){
  formSignin.addEventListener("submit",e=>{
    e.preventDefault();
    const [em,pw]=e.target.querySelectorAll("input");
    const user=getUsers().find(u=>u.email===em.value && u.password===pw.value);
    if(!user){toast("Wrong email or password");return;}
    setCurrent(user.email); authModal.classList.remove("show");
    toast("Hello, "+user.first+"!"); updateNavbar();
  });
}

/* show/hide pwd */
$$(".show-btn").forEach(b=>{
  b.onclick=()=>{
    const inp=b.previousElementSibling;
    if(inp){
      inp.type = inp.type==="password"?"text":"password";
      b.textContent = inp.type==="password"?"SHOW":"HIDE";
    }
  };
});

// ============= RRQ MEGA MENU SIDEBAR =============
// Mega Menu logic
const megaMenuBtn = document.querySelector('.mega-menu-btn');
const megaMenuWrap = document.getElementById('megaMenu');

if (megaMenuBtn && megaMenuWrap) {
  let timeout;
  megaMenuBtn.addEventListener('mouseenter', () => {
    clearTimeout(timeout);
    megaMenuWrap.classList.add('show-mega');
  });
  megaMenuBtn.addEventListener('mouseleave', () => {
    timeout = setTimeout(()=> megaMenuWrap.classList.remove('show-mega'), 140);
  });
  megaMenuWrap.addEventListener('mouseenter', () => {
    clearTimeout(timeout);
    megaMenuWrap.classList.add('show-mega');
  });
  megaMenuWrap.addEventListener('mouseleave', () => {
    megaMenuWrap.classList.remove('show-mega');
  });
}

// Sidebar panel switching
const sidebarItems = document.querySelectorAll('.mega-sidebar li');
const panels = document.querySelectorAll('.mega-panel');
sidebarItems.forEach(item => {
  item.addEventListener('mouseenter', function() {
    sidebarItems.forEach(li => li.classList.remove('active'));
    panels.forEach(panel => panel.classList.remove('show'));
    item.classList.add('active');
    const target = item.getAttribute('data-panel');
    const panel = document.querySelector(`.mega-panel[data-panel="${target}"]`);
    if(panel) panel.classList.add('show');
  });
  item.addEventListener('click', function() {
    sidebarItems.forEach(li => li.classList.remove('active'));
    panels.forEach(panel => panel.classList.remove('show'));
    item.classList.add('active');
    const target = item.getAttribute('data-panel');
    const panel = document.querySelector(`.mega-panel[data-panel="${target}"]`);
    if(panel) panel.classList.add('show');
  });
});
// Aktifkan panel pertama by default
if(sidebarItems.length){
  sidebarItems[0].classList.add('active');
  const firstPanel = document.querySelector(`.mega-panel[data-panel="${sidebarItems[0].getAttribute('data-panel')}"]`);
  if(firstPanel) firstPanel.classList.add('show');
}


// Pastikan panel pertama aktif by default (jika reload dan user langsung hover nav)
//activateFirstPanel();

// ======= NAVBAR RENDER (wishlist dsb.) =======
function updateNavbar(){
  const email=getCurrent(), menu=$(".account-menu"), btn=$(".account-btn");
  if (!menu || !btn) return;
  menu.innerHTML="";
  if(email){
    const me=getUsers().find(u=>u.email===email)||{first:""};
    btn.innerHTML=`<i class="fa-regular fa-user"></i><span class="desktop-only"> ${me.first}</span><i class="fa-solid fa-caret-down caret"></i>`;
    menu.insertAdjacentHTML("beforeend",`
      <a href="dashboard.html">My Profile</a>
      <a href="wishlist.html">Wishlists (${getWish().length})</a>
      <a href="#" id="link-logout">Logout</a>`);
    const linkLogout = $("#link-logout");
    if (linkLogout) linkLogout.onclick=e=>{e.preventDefault();localStorage.removeItem("current");location.reload();};
  }else{
    btn.innerHTML=`<i class="fa-regular fa-user"></i><span class="desktop-only"> Account</span><i class="fa-solid fa-caret-down caret"></i>`;
    menu.insertAdjacentHTML("beforeend",`
      <a href="#" id="link-signin">Sign in</a>
      <a href="#" id="link-register">Register</a>
      <a href="#" id="link-wishlist">Wishlists (${getWish().length})</a>`);
    const linkSignin = $("#link-signin");
    const linkRegister = $("#link-register");
    if (linkSignin) linkSignin.onclick=e=>{e.preventDefault();openAuth("signin");};
    if (linkRegister) linkRegister.onclick=e=>{e.preventDefault();openAuth("register");};
  }
  updateCartIndicator();
}
document.addEventListener("DOMContentLoaded",updateNavbar);

// --- RECENT SEARCH HANDLER ---
const searchInput   = document.getElementById("searchInput");
const searchForm    = document.querySelector(".searchbar");
const searchBox     = document.getElementById("recentSearchBox");
const searchList    = document.getElementById("recentSearchList");
const searchClear   = document.getElementById("recentSearchClear");
const RECENT_KEY    = "recentSearchRRQ";
const MAX_RECENT    = 8;

// Helper: Ambil recent search dari localStorage
function getRecentSearch() {
  return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
}
function setRecentSearch(arr) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(arr.slice(0,MAX_RECENT)));
}
function renderRecentSearch() {
  const keyword = searchInput.value.trim().toLowerCase();
  let items = getRecentSearch();

  // FILTER by prefix (startsWith)
  if (keyword) {
    items = items.filter(item => item.toLowerCase().startsWith(keyword));
    // Atau pakai .includes(keyword) untuk contains, tinggal ganti aja
  }

  // DEBUG LOG
  console.log('Render recent search:', items);

  if (!items.length) {
    searchBox.style.display = "none";
    if (searchClear) searchClear.style.display = "none";
    return;
  }
  searchList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "recent-search-item";
    li.textContent = item;
    li.onclick = () => {
      searchInput.value = item;
      searchBox.style.display = "none";
      searchInput.focus();
      goToSearch(item); // langsung search ketika klik recent
    };
    searchList.appendChild(li);
  });
  if (searchClear) searchClear.style.display = items.length ? "block" : "none";
  searchBox.style.display = "block";
}

// Event handler tetap sama
searchInput.addEventListener("focus", renderRecentSearch);
searchInput.addEventListener("input", renderRecentSearch);
searchInput.addEventListener("blur", () => {
  setTimeout(()=>searchBox.style.display="none",150);
});

searchForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const val = searchInput.value.trim();
  if (!val) return;
  let items = getRecentSearch().filter(x => x.toLowerCase() !== val.toLowerCase());
  items.unshift(val);
  setRecentSearch(items);
  searchInput.value = "";
  searchBox.style.display = "none";
  goToSearch(val); // redirect ke search page
});

if (searchClear) {
  searchClear.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem(RECENT_KEY);
    renderRecentSearch();
    setTimeout(() => { searchBox.style.display = "none"; }, 100);
  });
}

// INIT
document.addEventListener("DOMContentLoaded", renderRecentSearch);

// Jangan lupa fungsi goToSearch-nya:
function goToSearch(query) {
  window.location.href = `search.html?query=${encodeURIComponent(query)}`;
}

// --- Product carousel tab toggle + tombol lihat semua ---
document.addEventListener("DOMContentLoaded", function() {
  const tabs = document.querySelectorAll('.pc-tab');
  const tracks = document.querySelectorAll('.pc-track');
  const seeAllBestseller = document.getElementById('seeAllBestseller');
  const seeAllFeatured = document.getElementById('seeAllFeatured');

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', function() {
      // Toggle tab active
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Toggle track
      tracks.forEach(t => t.classList.remove('active'));
      tracks[idx].classList.add('active');

      // Toggle see all button
      if (tab.dataset.tab === "bestseller") {
        seeAllBestseller.style.display = 'block';
        seeAllFeatured.style.display = 'none';
      } else {
        seeAllBestseller.style.display = 'none';
        seeAllFeatured.style.display = 'block';
      }
    });
  });
});

// ======= Collection Highlight Carousel =======
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.chc-slide');
  const dots = document.querySelectorAll('.chc-dot');
  const prevBtn = document.querySelector('.chc-prev');
  const nextBtn = document.querySelector('.chc-next');
  let cur = 0;
  let timer = null;
  const delay = 5500;

  function showSlide(idx) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    cur = idx;
  }

  function nextSlide() {
    showSlide((cur + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((cur - 1 + slides.length) % slides.length);
  }

  // Arrow events
  if (prevBtn) prevBtn.onclick = () => { prevSlide(); resetTimer(); }
  if (nextBtn) nextBtn.onclick = () => { nextSlide(); resetTimer(); }

  // Dot events
  dots.forEach((dot, i) => {
    dot.onclick = () => { showSlide(i); resetTimer(); }
  });

  // Auto slide
  function startTimer() {
    timer = setInterval(nextSlide, delay);
  }
  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  // Init
  showSlide(0);
  if (slides.length > 1) startTimer();
});

// Basic Carousel Logic
const track = document.getElementById('discountCarouselTrack');
const cards = Array.from(track.children);
const cardWidth = cards[0].offsetWidth + 24; // +gap (adjust if gap changes in css)
let position = 0;
const visibleCards = 3; // JUMLAH CARD YANG KELIHATAN (ubah sesuai layout kamu)

document.getElementById('discountPrev').onclick = () => {
  position = Math.max(position - 1, 0);
  track.style.transform = `translateX(-${position * cardWidth}px)`;
};

document.getElementById('discountNext').onclick = () => {
  position = Math.min(position + 1, cards.length - visibleCards);
  track.style.transform = `translateX(-${position * cardWidth}px)`;
};


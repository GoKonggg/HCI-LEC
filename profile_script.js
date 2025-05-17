// =============================
// PROFILE PAGE SCRIPT (FULL)
// =============================

/* ===== AUTH / STORAGE HELPERS ===== */
const getUsers   = () => JSON.parse(localStorage.getItem("users") || "[]");
const setUsers   = arr => localStorage.setItem("users", JSON.stringify(arr));
const getCurrent = () => localStorage.getItem("current");

/* ===== GUARD: REDIRECT JIKA BELUM LOGIN ===== */
const currentEmail = getCurrent();
const users   = getUsers();
const meIndex = users.findIndex(u => u.email === currentEmail);
if (meIndex === -1) {
  window.location.href = "index.html";
}
const me = users[meIndex];

/* ===== ELEMENTS ===== */
const firstInp  = document.getElementById("firstName");
const lastInp   = document.getElementById("lastName");
const birthInp  = document.getElementById("birthDate");
const emailInp  = document.getElementById("email");
// --- Foto Profil Elements
const photoInp  = document.getElementById("photoUpload");
const preview   = document.getElementById("preview");

/* ===== PREFILL DATA ===== */
firstInp.value  = me.first      || "";
lastInp.value   = me.last       || "";
emailInp.value  = me.email      || "";
birthInp.value  = me.birthDate  || "";
// Foto profil: default kalau kosong
preview.src     = me.photo || "https://cdn-icons-png.flaticon.com/512/847/847969.png";

/* ===== SHOW / HIDE PASSWORD ===== */
const showBtns = document.querySelectorAll('.show-btn');
showBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    input.type = input.type === 'password' ? 'text' : 'password';
    btn.textContent = input.type === 'password' ? 'SHOW' : 'HIDE';
  });
});

/* ===== FOTO UPLOAD (Ganti Foto Profil) ===== */
photoInp.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    me.photo = reader.result;        // simpan ke object user
    users[meIndex] = me;
    setUsers(users);                 // update localStorage
  };
  reader.readAsDataURL(file);
});

/* ===== SIMPAN FORM ===== */
const form = document.getElementById('profileForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  me.first     = firstInp.value;
  me.last      = lastInp.value;
  me.birthDate = birthInp.value;
  // Email biasanya tidak diubah di sini
  users[meIndex] = me;
  setUsers(users);
  alert('Profil berhasil disimpan!');
});

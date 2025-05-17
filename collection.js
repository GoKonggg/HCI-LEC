// Sample data: modify sesuai kebutuhanmu!
const categories = [
  {
    name: "Jersey",
    img: "asset/prod-2.png", // Ganti ke gambar kategori kamu
    count: 10,
    link: "collection-jersey.html"
  },
  {
    name: "Hoodie",
    img:"asset/prod-2.png",
    count: 7,
    link: "collection-hoodie.html"
  },
  {
    name: "Accessories",
    img: "asset/prod-2.png",
    count: 13,
    link: "collection-accessories.html"
  },
  {
    name: "Cap & Hat",
    img: "asset/prod-2.png",
    count: 6,
    link: "collection-cap.html"
  }
  // ...tambah kategori lain
];

function renderCollections() {
  const grid = document.getElementById("collectionsGrid");
  grid.innerHTML = "";
  categories.forEach(cat => {
    const card = document.createElement("div");
    card.className = "collection-card";
    card.onclick = () => window.location.href = cat.link;
    card.innerHTML = `
      <img src="${cat.img}" class="collection-img" alt="${cat.name}"/>
      <div class="collection-info">
        <div class="collection-name">${cat.name}</div>
        <div class="collection-count">${cat.count} products</div>
      </div>
    `;
    grid.appendChild(card);
  });
}
renderCollections();

const seeAllProducts = document.getElementById("seeAllProducts");
const productsGrid = document.getElementById("productsGrid");

seeAllProducts.addEventListener("click", (event) => {
  event.preventDefault();

  const isShowingAll = productsGrid.classList.toggle("show-all");
  seeAllProducts.textContent = isShowingAll ? "Sembunyikan" : "Lihat Semua";
  seeAllProducts.setAttribute("aria-expanded", String(isShowingAll));
});

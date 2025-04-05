// Sidebar toggle for mobile
document.querySelector(".sidebar-toggle").addEventListener("click", () => {
  document.querySelector(".admin-sidebar").classList.toggle("active");
});

// Modal logic
const addProductBtn = document.getElementById("addProductBtn");
const addProductModal = document.getElementById("addProductModal");
const modalClose = addProductModal.querySelector(".modal-close");

addProductBtn.addEventListener("click", () => {
  addProductModal.style.display = "flex";
});

modalClose.addEventListener("click", () => {
  addProductModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === addProductModal) {
    addProductModal.style.display = "none";
  }
});

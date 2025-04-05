document.addEventListener("DOMContentLoaded", function () {
  // Sidebar toggle (same as dashboard)
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  const sidebar = document.querySelector(".admin-sidebar");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Are you sure you want to logout?")) {
        window.location.href = "index.html";
      }
    });
  }

  // Add Product Modal
  const addProductBtn = document.getElementById("addProductBtn");
  const addProductModal = document.getElementById("addProductModal");
  const modalClose = document.querySelector(".modal-close");

  if (addProductBtn && addProductModal) {
    addProductBtn.addEventListener("click", function () {
      addProductModal.classList.add("active");
    });

    modalClose.addEventListener("click", function () {
      addProductModal.classList.remove("active");
    });

    // Close modal when clicking outside
    addProductModal.addEventListener("click", function (e) {
      if (e.target === addProductModal) {
        addProductModal.classList.remove("active");
      }
    });
  }

  // Product form submission
  const productForm = document.getElementById("productForm");
  if (productForm) {
    productForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(productForm);
      const productData = Object.fromEntries(formData.entries());

      console.log("New product:", productData);

      // Simulate save (replace with API call)
      alert("Product saved successfully!");
      addProductModal.classList.remove("active");
      productForm.reset();

      // In a real app, you would refresh the product list
    });
  }

  // Image upload preview (simplified)
  const imageUpload = document.querySelector(
    '.image-upload input[type="file"]'
  );
  if (imageUpload) {
    imageUpload.addEventListener("change", function (e) {
      if (e.target.files.length > 0) {
        console.log(`${e.target.files.length} files selected`);
      }
    });
  }

  // Product table actions
  document.querySelectorAll(".btn-action.delete").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this product?")) {
        const row = this.closest("tr");
        row.style.opacity = "0";
        setTimeout(() => row.remove(), 300);
      }
    });
  });
});

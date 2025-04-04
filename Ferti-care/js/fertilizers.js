// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize fertilizer filters
  initFertilizerFilters();

  // Load fertilizer products
  loadFertilizerProducts();

  // Initialize FAQ accordion
  initFAQAccordion();

  // Update cart count
  updateCartCount();
});

// Fertilizer Product Data
const fertilizerProducts = [
  {
    id: 1,
    name: "NPK 20-20-20 Balanced Fertilizer",
    type: "npk",
    form: "granular",
    crop: "cereals",
    price: 28.99,
    oldPrice: 32.99,
    image: "images/products/npk-20-20-20.jpg",
    rating: 4,
    weight: "50kg",
    suitability: "All crops",
    description:
      "Complete balanced fertilizer with equal parts Nitrogen, Phosphorus, and Potassium. Promotes overall plant health and vigorous growth.",
  },
  {
    id: 2,
    name: "Urea 46-0-0 Nitrogen Fertilizer",
    type: "nitrogen",
    form: "granular",
    crop: "cereals",
    price: 34.5,
    image: "images/products/urea.jpg",
    rating: 4,
    weight: "50kg",
    suitability: "Vegetative growth",
    description:
      "High nitrogen content fertilizer ideal for promoting lush, green vegetative growth in crops and lawns.",
  },
  {
    id: 3,
    name: "DAP 18-46-0 Fertilizer",
    type: "phosphate",
    form: "granular",
    crop: "all",
    price: 39.99,
    image: "images/products/dap.jpg",
    rating: 5,
    weight: "50kg",
    suitability: "Root development",
    description:
      "Diammonium Phosphate fertilizer with high phosphorus content for strong root development and flowering.",
  },
  {
    id: 4,
    name: "MOP 0-0-60 Potash Fertilizer",
    type: "potash",
    form: "granular",
    crop: "fruits",
    price: 42.75,
    image: "images/products/potash.jpg",
    rating: 4,
    weight: "50kg",
    suitability: "Fruit quality",
    description:
      "Muriate of Potash fertilizer enhances fruit quality, size, and shelf life while improving drought resistance.",
  },
  {
    id: 5,
    name: "Organic Vermicompost Fertilizer",
    type: "organic",
    form: "powder",
    crop: "all",
    price: 14.99,
    image: "images/products/vermicompost.jpg",
    rating: 5,
    weight: "20kg",
    suitability: "Soil health",
    description:
      "100% organic vermicompost improves soil structure, water retention, and provides slow-release nutrients.",
  },
  {
    id: 6,
    name: "Liquid NPK 10-10-10 Fertilizer",
    type: "npk",
    form: "liquid",
    crop: "vegetables",
    price: 22.5,
    oldPrice: 26.99,
    image: "images/products/liquid-npk.jpg",
    rating: 4,
    weight: "5L",
    suitability: "Foliar feeding",
    description:
      "Concentrated liquid fertilizer for foliar application or irrigation systems. Quickly absorbed by plants.",
  },
  {
    id: 7,
    name: "Citrus Special Fertilizer",
    type: "specialty",
    form: "granular",
    crop: "fruits",
    price: 29.99,
    image: "images/products/citrus-fertilizer.jpg",
    rating: 5,
    weight: "25kg",
    suitability: "Citrus trees",
    description:
      "Specially formulated for citrus trees with added micronutrients to prevent deficiencies and boost yield.",
  },
  {
    id: 8,
    name: "Starter Fertilizer 10-52-10",
    type: "phosphate",
    form: "granular",
    crop: "all",
    price: 36.25,
    image: "images/products/starter-fertilizer.jpg",
    rating: 4,
    weight: "50kg",
    suitability: "Seedlings",
    description:
      "High phosphorus starter fertilizer promotes rapid root establishment for transplants and seedlings.",
  },
];

// Initialize Fertilizer Filters
function initFertilizerFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filterGroup = this.parentElement;
      const filterType =
        filterGroup.parentElement.querySelector(".filter-title").textContent;

      // Remove active class from all buttons in this group
      filterGroup.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.remove("active");
      });

      // Add active class to clicked button
      this.classList.add("active");

      // Apply filters
      applyFertilizerFilters();
    });
  });
}

// Apply Fertilizer Filters
function applyFertilizerFilters() {
  const typeFilter = document.querySelector(
    ".filter-group:first-child .filter-btn.active"
  ).dataset.filter;
  const formFilter = document.querySelector(
    ".filter-group:nth-child(2) .filter-btn.active"
  ).dataset.filter;
  const cropFilter = document.querySelector(
    ".filter-group:last-child .filter-btn.active"
  ).dataset.filter;

  const productsContainer = document.getElementById("fertilizer-products");
  const productCards = productsContainer.querySelectorAll(".product-card");

  let visibleCount = 0;

  productCards.forEach((card) => {
    const cardType =
      card.classList.contains(typeFilter) || typeFilter === "all";
    const cardForm =
      card.classList.contains(formFilter) || formFilter === "all";
    const cardCrop =
      card.classList.contains(cropFilter) || cropFilter === "all";

    if (cardType && cardForm && cardCrop) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  // Show message if no products match filters
  if (visibleCount === 0) {
    productsContainer.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-box-open" style="font-size: 50px; color: var(--light-gray); margin-bottom: 20px;"></i>
                <h3>No products match your filters</h3>
                <p>Try adjusting your filter criteria to see more products.</p>
                <button class="btn btn-primary reset-all-filters" style="margin-top: 15px;">Reset All Filters</button>
            </div>
        `;

    // Add event listener to reset button
    document
      .querySelector(".reset-all-filters")
      ?.addEventListener("click", function () {
        document.querySelectorAll(".filter-btn").forEach((btn) => {
          if (
            btn.textContent === "All Types" ||
            btn.textContent === "All Forms" ||
            btn.textContent === "All Crops"
          ) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });

        loadFertilizerProducts();
      });
  }
}

// Load Fertilizer Products
function loadFertilizerProducts() {
  const productsContainer = document.getElementById("fertilizer-products");

  // Clear existing products
  productsContainer.innerHTML = "";

  if (fertilizerProducts.length === 0) {
    productsContainer.innerHTML =
      '<p class="no-products">No fertilizer products available at the moment.</p>';
    return;
  }

  // Display fertilizer products
  fertilizerProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = `product-card ${product.type} ${product.form} ${product.crop}`;
    productCard.setAttribute("data-id", product.id);
    productCard.innerHTML = `
            ${product.oldPrice ? '<div class="product-badge">Sale</div>' : ""}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="quick-view"><i class="far fa-eye"></i></button>
                    <button class="add-to-wishlist"><i class="far fa-heart"></i></button>
                    <button class="add-to-cart"><i class="fas fa-shopping-cart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${
                  product.type.charAt(0).toUpperCase() + product.type.slice(1)
                } Fertilizer</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-specs">
                    <span><i class="fas fa-weight-hanging"></i> ${
                      product.weight
                    }</span>
                    <span><i class="fas fa-seedling"></i> ${
                      product.suitability
                    }</span>
                </div>
                <div class="product-rating">
                    ${getRatingStars(product.rating)}
                    <span class="rating-count">(${
                      Math.floor(Math.random() * 20) + 5
                    })</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(
                      2
                    )}</span>
                    ${
                      product.oldPrice
                        ? `<span class="old-price">$${product.oldPrice.toFixed(
                            2
                          )}</span>`
                        : ""
                    }
                </div>
            </div>
        `;
    productsContainer.appendChild(productCard);
  });

  // Add event listeners to product buttons
  addProductEventListeners();
}

// Helper function to generate rating stars
function getRatingStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star"></i>';
    } else if (i - 0.5 <= rating) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;
}

// Add event listeners to product buttons
function addProductEventListeners() {
  // Quick view buttons
  document.querySelectorAll(".quick-view").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.closest(".product-card").getAttribute("data-id");
      // In a real app, this would open a quick view modal
      alert(`Quick view for product ID: ${productId}`);
    });
  });

  // Wishlist buttons
  document.querySelectorAll(".add-to-wishlist").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.closest(".product-card").getAttribute("data-id");
      addToWishlist(productId);
    });
  });

  // Add to cart buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.closest(".product-card").getAttribute("data-id");
      addToCart(productId);
    });
  });
}

// Add to wishlist function
function addToWishlist(productId) {
  // In a real app, this would be more complex
  // For now, we'll just show a notification
  showNotification("Product added to wishlist", "success");
}

// Add to cart function
function addToCart(productId, quantity = 1) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = fertilizerProducts.find((p) => p.id == productId);

  if (!product) return;

  // Check if product already in cart
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity: quantity,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification(`${product.name} added to cart`, "success");
}

// Update cart count in header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach((element) => {
    element.textContent = totalItems;
  });
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Initialize FAQ Accordion
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });
}

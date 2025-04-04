// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize product filters
  initPriceRange();

  // Load products based on URL parameters
  loadProducts();

  // Initialize view toggle
  initViewToggle();

  // Initialize sorting
  initSorting();

  // Initialize filter buttons
  initFilterButtons();

  // Update cart count
  updateCartCount();
});

// Product Data (would normally come from an API)
const productsData = [
  {
    id: 1,
    name: "NPK Fertilizer 20-20-20",
    category: "fertilizers",
    brand: "agroplus",
    price: 25.99,
    oldPrice: 29.99,
    image: "images/products/fertilizer1.jpg",
    rating: 4,
    stock: 15,
    description:
      "Balanced NPK fertilizer for all crops. Promotes healthy growth and high yield.",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Organic Compost 5kg",
    category: "organic",
    brand: "organicare",
    price: 12.5,
    image: "images/products/compost.jpg",
    rating: 5,
    stock: 8,
    description:
      "100% natural organic compost for soil enrichment and plant nutrition.",
    createdAt: "2023-03-10",
  },
  {
    id: 3,
    name: "Tomato Seeds Hybrid",
    category: "seeds",
    brand: "greenfield",
    price: 5.99,
    oldPrice: 7.5,
    image: "images/products/tomato-seeds.jpg",
    rating: 4,
    stock: 20,
    description:
      "High-yield hybrid tomato seeds with disease resistance. 50 seeds per pack.",
    createdAt: "2023-02-20",
  },
  {
    id: 4,
    name: "Premium Garden Hoe",
    category: "tools",
    brand: "farmerschoice",
    price: 18.75,
    image: "images/products/hoe.jpg",
    rating: 4,
    stock: 12,
    description:
      "Durable garden hoe with ergonomic handle for comfortable farming.",
    createdAt: "2023-01-05",
  },
  {
    id: 5,
    name: "Urea Fertilizer 46-0-0",
    category: "fertilizers",
    brand: "agroplus",
    price: 32.99,
    image: "images/products/urea.jpg",
    rating: 3,
    stock: 10,
    description: "High nitrogen fertilizer for vegetative growth. 50kg bag.",
    createdAt: "2023-04-12",
  },
  {
    id: 6,
    name: "Corn Seeds Hybrid",
    category: "seeds",
    brand: "greenfield",
    price: 8.5,
    image: "images/products/corn-seeds.jpg",
    rating: 5,
    stock: 18,
    description: "High-yield corn seeds with excellent drought resistance.",
    createdAt: "2023-03-25",
  },
  {
    id: 7,
    name: "Organic Pesticide Spray",
    category: "organic",
    brand: "organicare",
    price: 15.25,
    oldPrice: 18.99,
    image: "images/products/pesticide.jpg",
    rating: 4,
    stock: 7,
    description: "Natural pesticide safe for organic farming. 1 liter bottle.",
    createdAt: "2023-02-15",
  },
  {
    id: 8,
    name: "Pruning Shears",
    category: "tools",
    brand: "farmerschoice",
    price: 22.5,
    image: "images/products/shears.jpg",
    rating: 4,
    stock: 9,
    description:
      "Sharp pruning shears with comfortable grip for precise cutting.",
    createdAt: "2023-01-30",
  },
  {
    id: 9,
    name: "Potassium Fertilizer 0-0-60",
    category: "fertilizers",
    brand: "agroplus",
    price: 28.75,
    image: "images/products/potassium.jpg",
    rating: 4,
    stock: 11,
    description:
      "High potassium fertilizer for fruit development and plant health.",
    createdAt: "2023-04-05",
  },
  {
    id: 10,
    name: "Wheat Seeds",
    category: "seeds",
    brand: "greenfield",
    price: 6.99,
    image: "images/products/wheat-seeds.jpg",
    rating: 3,
    stock: 14,
    description: "High-quality wheat seeds for commercial farming. 1kg pack.",
    createdAt: "2023-03-15",
  },
  {
    id: 11,
    name: "Organic Neem Oil",
    category: "organic",
    brand: "organicare",
    price: 14.99,
    image: "images/products/neem-oil.jpg",
    rating: 5,
    stock: 6,
    description:
      "Pure neem oil for pest control and plant health. 500ml bottle.",
    createdAt: "2023-02-28",
  },
  {
    id: 12,
    name: "Digging Shovel",
    category: "tools",
    brand: "farmerschoice",
    price: 24.99,
    oldPrice: 29.99,
    image: "images/products/shovel.jpg",
    rating: 4,
    stock: 8,
    description:
      "Sturdy digging shovel with reinforced handle for heavy-duty work.",
    createdAt: "2023-01-20",
  },
];

// Initialize Price Range Slider
function initPriceRange() {
  const rangeInput = document.querySelectorAll(".range-input input");
  const priceInput = document.querySelectorAll(".price-input input");
  const progress = document.querySelector(".slider .progress");

  let priceGap = 20;
  let minVal = parseInt(rangeInput[0].value);
  let maxVal = parseInt(rangeInput[1].value);

  // Set initial progress
  progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
  progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";

  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeInput[0].value);
      let maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < priceGap) {
        if (e.target.className === "range-min") {
          rangeInput[0].value = maxVal - priceGap;
        } else {
          rangeInput[1].value = minVal + priceGap;
        }
      } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
        progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    });
  });

  priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(priceInput[0].value) || 0;
      let maxVal = parseInt(priceInput[1].value) || 100;

      if (maxVal - minVal >= priceGap && maxVal <= rangeInput[1].max) {
        if (e.target.className === "input-min") {
          rangeInput[0].value = minVal;
          progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxVal;
          progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });
}

// Load Products based on filters
function loadProducts() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const productsContainer = document.getElementById("products-container");
  const showingCount = document.getElementById("showing-count");
  const totalProducts = document.getElementById("total-products");

  // Clear existing products
  productsContainer.innerHTML = "";

  // Filter products based on URL parameters
  let filteredProducts = [...productsData];

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );

    // Highlight selected category in sidebar
    document.querySelectorAll(".category-link").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(category)) {
        link.classList.add("active");
      }
    });
  }

  // Update product counts
  totalProducts.textContent = productsData.length;
  showingCount.textContent = filteredProducts.length;

  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-box-open" style="font-size: 50px; color: var(--light-gray); margin-bottom: 20px;"></i>
                <h3>No products found</h3>
                <p>We couldn't find any products matching your criteria.</p>
                <a href="products.html" class="btn btn-primary" style="margin-top: 15px;">View All Products</a>
            </div>
        `;
    return;
  }

  // Display filtered products
  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
            ${product.oldPrice ? `<div class="product-badge">Sale</div>` : ""}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="quick-view" data-id="${product.id}">
                        <i class="far fa-eye"></i>
                    </button>
                    <button class="add-to-wishlist" data-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${
                  product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)
                }</span>
                <h3 class="product-title">${product.name}</h3>
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
      const productId = this.getAttribute("data-id");
      // In a real app, this would open a quick view modal
      alert(`Quick view for product ID: ${productId}`);
    });
  });

  // Wishlist buttons
  document.querySelectorAll(".add-to-wishlist").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      addToWishlist(productId);
    });
  });

  // Add to cart buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
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
  const product = productsData.find((p) => p.id == productId);

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

// Initialize view toggle (grid/list)
function initViewToggle() {
  const viewOptions = document.querySelectorAll(".view-option");
  const productsContainer = document.querySelector(".products-area");

  viewOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const view = this.getAttribute("data-view");

      viewOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      productsContainer.classList.remove("view-grid", "view-list");
      productsContainer.classList.add(`view-${view}`);
    });
  });
}

// Initialize product sorting
function initSorting() {
  const sortSelect = document.querySelector(".sort-select");

  sortSelect.addEventListener("change", function () {
    const value = this.value;
    sortProducts(value);
  });
}

// Sort products based on selected option
function sortProducts(sortBy) {
  const productsContainer = document.getElementById("products-container");
  const productCards = Array.from(
    productsContainer.querySelectorAll(".product-card")
  );

  productCards.sort((a, b) => {
    const priceA = parseFloat(
      a.querySelector(".current-price").textContent.replace("$", "")
    );
    const priceB = parseFloat(
      b.querySelector(".current-price").textContent.replace("$", "")
    );
    const titleA = a.querySelector(".product-title").textContent.toLowerCase();
    const titleB = b.querySelector(".product-title").textContent.toLowerCase();
    const ratingA = parseInt(
      a.querySelector(".product-rating").getAttribute("data-rating") || "0"
    );
    const ratingB = parseInt(
      b.querySelector(".product-rating").getAttribute("data-rating") || "0"
    );

    switch (sortBy) {
      case "price-low":
        return priceA - priceB;
      case "price-high":
        return priceB - priceA;
      case "name-asc":
        return titleA.localeCompare(titleB);
      case "name-desc":
        return titleB.localeCompare(titleA);
      case "rating":
        return ratingB - ratingA;
      case "newest":
        // Would normally use creation date
        return 0;
      default:
        return 0;
    }
  });

  // Re-append sorted products
  productCards.forEach((card) => productsContainer.appendChild(card));
}

// Initialize filter buttons
function initFilterButtons() {
  const applyBtn = document.querySelector(".apply-filters");
  const resetBtn = document.querySelector(".reset-filters");

  applyBtn.addEventListener("click", function () {
    // Get all filter values
    const minPrice = document.querySelector(".input-min").value;
    const maxPrice = document.querySelector(".input-max").value;
    const selectedBrands = Array.from(
      document.querySelectorAll('input[name="brand"]:checked')
    ).map((b) => b.value);
    const selectedRating = document.querySelector(
      'input[name="rating"]:checked'
    )?.value;

    // In a real app, this would filter the products
    alert(
      `Applying filters:\nPrice: $${minPrice} - $${maxPrice}\nBrands: ${
        selectedBrands.join(", ") || "Any"
      }\nRating: ${selectedRating ? selectedRating + " stars & up" : "Any"}`
    );
  });

  resetBtn.addEventListener("click", function () {
    // Reset all filters
    document.querySelector(".input-min").value = 0;
    document.querySelector(".input-max").value = 100;
    document.querySelector(".range-min").value = 0;
    document.querySelector(".range-max").value = 100;
    document.querySelector(".progress").style.left = "0%";
    document.querySelector(".progress").style.right = "0%";

    document
      .querySelectorAll('input[name="brand"]')
      .forEach((box) => (box.checked = false));
    document
      .querySelectorAll('input[name="rating"]')
      .forEach((radio) => (radio.checked = false));
  });
}

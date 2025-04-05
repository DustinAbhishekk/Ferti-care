// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Load cart items
  loadCartItems();

  // Load recently viewed products
  loadRecentlyViewed();

  // Update cart count
  updateCartCount();

  // Initialize event listeners
  initCartEventListeners();
});

// Load Cart Items from localStorage
function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const itemCountElement = document.getElementById("item-count");
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Update item count
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  itemCountElement.textContent = itemCount;

  if (cart.length === 0) {
    // Show empty cart message
    cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Browse our agricultural products to get started</p>
                <a href="products.html" class="btn btn-primary">Shop Now</a>
            </div>
        `;

    // Update totals
    subtotalElement.textContent = "$0.00";
    totalElement.textContent = "$0.00";

    // Disable checkout button
    checkoutBtn.disabled = true;
    return;
  }

  // Enable checkout button
  checkoutBtn.disabled = false;

  // Calculate subtotal
  let subtotal = 0;

  // Generate cart items HTML
  let cartItemsHTML = "";

  cart.forEach((item) => {
    // In a real app, we would fetch product details from database
    const product = getProductDetails(item.id);
    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;

    cartItemsHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="cart-item-details">
                    <div>
                        <h3 class="cart-item-title">${product.name}</h3>
                        <p class="cart-item-category">${product.category}</p>
                    </div>
                    <div>
                        <span class="cart-item-price">$${product.price.toFixed(
                          2
                        )}</span>
                        ${
                          product.oldPrice
                            ? `<span class="cart-item-old-price">$${product.oldPrice.toFixed(
                                2
                              )}</span>`
                            : ""
                        }
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="cart-item-remove">Remove</button>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" class="quantity-input" value="${
                          item.quantity
                        }" min="1">
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
            </div>
        `;
  });

  // Update DOM
  cartItemsContainer.innerHTML = cartItemsHTML;

  // Update totals
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  totalElement.textContent = `$${subtotal.toFixed(2)}`;
}

// Get Product Details (mock function - would normally fetch from database)
function getProductDetails(productId) {
  // Mock product database
  const products = [
    {
      id: 1,
      name: "NPK Fertilizer 20-20-20",
      category: "Fertilizers",
      price: 25.99,
      oldPrice: 29.99,
      image: "images/products/fertilizer1.jpg",
    },
    {
      id: 2,
      name: "Organic Compost 5kg",
      category: "Organic",
      price: 12.5,
      image: "images/products/compost.jpg",
    },
    {
      id: 3,
      name: "Tomato Seeds Hybrid",
      category: "Seeds",
      price: 5.99,
      oldPrice: 7.5,
      image: "images/products/tomato-seeds.jpg",
    },
    {
      id: 4,
      name: "Premium Garden Hoe",
      category: "Tools",
      price: 18.75,
      image: "images/products/hoe.jpg",
    },
  ];

  return products.find((p) => p.id == productId) || {};
}

// Load Recently Viewed Products
function loadRecentlyViewed() {
  const recentlyViewedContainer = document.getElementById("recently-viewed");
  // In a real app, this would come from localStorage or a database
  const recentlyViewed = [1, 3, 4]; // Example product IDs

  if (recentlyViewed.length === 0) {
    recentlyViewedContainer.innerHTML = "<p>No recently viewed items</p>";
    return;
  }

  let productsHTML = "";

  recentlyViewed.forEach((productId) => {
    const product = getProductDetails(productId);

    productsHTML += `
            <div class="product-card">
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
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
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
            </div>
        `;
  });

  recentlyViewedContainer.innerHTML = productsHTML;
}

// Initialize Event Listeners
function initCartEventListeners() {
  // Quantity buttons
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("quantity-btn")) {
      const input = e.target.parentElement.querySelector(".quantity-input");
      let value = parseInt(input.value);

      if (e.target.classList.contains("minus")) {
        value = Math.max(1, value - 1);
      } else if (e.target.classList.contains("plus")) {
        value += 1;
      }

      input.value = value;
      updateCartItemQuantity(input);
    }
  });

  // Quantity input changes
  document.addEventListener("change", function (e) {
    if (e.target.classList.contains("quantity-input")) {
      updateCartItemQuantity(e.target);
    }
  });

  // Remove item
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("cart-item-remove")) {
      const cartItem = e.target.closest(".cart-item");
      removeCartItem(cartItem);
    }
  });

  // Checkout Button Logic
  document
    .getElementById("checkout-btn")
    .addEventListener("click", function () {
      // 1. Validate Cart Contents
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        alert("Your cart is empty. Add products before checkout.");
        return;
      }

      // 2. Prepare Checkout Data
      const checkoutData = {
        items: cart,
        subtotal: calculateSubtotal(cart),
        timestamp: new Date().toISOString(),
      };

      // 3. Save Checkout Session (for persistence across pages)
      localStorage.setItem("checkoutSession", JSON.stringify(checkoutData));

      // 4. Redirect to Checkout Page
      window.location.href = "checkout.html";
    });

  // Helper: Calculate Cart Subtotal
  function calculateSubtotal(cartItems) {
    return cartItems
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);
  }
  // Recently viewed products
  document
    .getElementById("recently-viewed")
    .addEventListener("click", function (e) {
      if (e.target.closest(".add-to-cart")) {
        const productId = e.target
          .closest(".add-to-cart")
          .getAttribute("data-id");
        addToCart(productId);
      }
    });
}

// Update Cart Item Quantity
function updateCartItemQuantity(input) {
  const cartItem = input.closest(".cart-item");
  const productId = cartItem.getAttribute("data-id");
  const newQuantity = parseInt(input.value);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cart.findIndex((item) => item.id == productId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems(); // Refresh cart display
    updateCartCount();
  }
}

// Remove Cart Item
function removeCartItem(cartItem) {
  const productId = cartItem.getAttribute("data-id");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id != productId);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartItems(); // Refresh cart display
  updateCartCount();

  // Show notification
  showNotification("Item removed from cart", "success");
}

// Add to Cart
function addToCart(productId, quantity = 1) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = getProductDetails(productId);

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
  loadCartItems(); // Refresh cart display
  updateCartCount();

  // Show notification
  showNotification(`${product.name} added to cart`, "success");
}

// Update Cart Count in Header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach((element) => {
    element.textContent = totalItems;
  });
}

// Show Notification
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

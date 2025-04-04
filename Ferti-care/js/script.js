// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize hero slider
  initHeroSlider();

  // Load featured products
  loadFeaturedProducts();

  // Update cart count
  updateCartCount();

  // Initialize newsletter form
  initNewsletter();
});

// Hero Slider Functionality
function initHeroSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds

  // Show first slide
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");

  // Auto slide
  let slideTimer = setInterval(nextSlide, slideInterval);

  // Next slide function
  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  // Previous slide function
  function prevSlide() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  // Go to specific slide
  function goToSlide(n) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = n;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

    // Reset timer
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, slideInterval);
  }

  // Event listeners
  nextBtn.addEventListener("click", function () {
    nextSlide();
  });

  prevBtn.addEventListener("click", function () {
    prevSlide();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      goToSlide(index);
    });
  });

  // Pause on hover
  const hero = document.querySelector(".hero");
  hero.addEventListener("mouseenter", function () {
    clearInterval(slideTimer);
  });

  hero.addEventListener("mouseleave", function () {
    slideTimer = setInterval(nextSlide, slideInterval);
  });
}

// Load Featured Products
function loadFeaturedProducts() {
  // In a real app, this would come from an API
  // For now, we'll use mock data
  const products = [
    {
      id: 1,
      name: "NPK Fertilizer 20-20-20",
      category: "fertilizers",
      price: 25.99,
      oldPrice: 29.99,
      image: "images/products/fertilizer1.jpg",
      rating: 4,
      isFeatured: true,
    },
    {
      id: 2,
      name: "Organic Compost 5kg",
      category: "organic",
      price: 12.5,
      image: "images/products/compost.jpg",
      rating: 5,
      isFeatured: true,
    },
    {
      id: 3,
      name: "Tomato Seeds Hybrid",
      category: "seeds",
      price: 5.99,
      oldPrice: 7.5,
      image: "images/products/tomato-seeds.jpg",
      rating: 4,
      isFeatured: true,
    },
    {
      id: 4,
      name: "Premium Garden Hoe",
      category: "tools",
      price: 18.75,
      image: "images/products/hoe.jpg",
      rating: 4,
      isFeatured: true,
    },
  ];

  const productsGrid = document.querySelector(".products-grid");

  // Clear loading state if any
  productsGrid.innerHTML = "";

  // Filter featured products
  const featuredProducts = products.filter((product) => product.isFeatured);

  if (featuredProducts.length === 0) {
    productsGrid.innerHTML =
      '<p class="no-products">No featured products available at the moment.</p>';
    return;
  }

  // Create product cards
  featuredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
            <div class="product-badge">Featured</div>
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
                <div class="product-rating">
                    ${getRatingStars(product.rating)}
                    <span class="rating-count">(12)</span>
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
    productsGrid.appendChild(productCard);
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

  // Check if product already in cart
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity: quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("Product added to cart", "success");
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

// Initialize newsletter form
function initNewsletter() {
  const form = document.querySelector(".newsletter-form");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!email) {
      showNotification("Please enter your email address", "warning");
      return;
    }

    if (!validateEmail(email)) {
      showNotification("Please enter a valid email address", "warning");
      return;
    }

    // In a real app, this would send to a server
    // For now, we'll just store in localStorage
    let subscribers =
      JSON.parse(localStorage.getItem("newsletterSubscribers")) || [];

    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem(
        "newsletterSubscribers",
        JSON.stringify(subscribers)
      );
      showNotification("Thank you for subscribing!", "success");
    } else {
      showNotification("You are already subscribed", "info");
    }

    emailInput.value = "";
  });
}

// Validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

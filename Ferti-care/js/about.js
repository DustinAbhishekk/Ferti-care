// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize testimonial slider
  initTestimonialSlider();

  // Animate statistics counters
  animateStats();

  // Update cart count
  updateCartCount();
});

// Testimonial Slider
function initTestimonialSlider() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".slider-dots .dot");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  let currentSlide = 0;
  const slideInterval = 8000; // 8 seconds

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
  const slider = document.querySelector(".testimonials-slider");
  slider.addEventListener("mouseenter", function () {
    clearInterval(slideTimer);
  });

  slider.addEventListener("mouseleave", function () {
    slideTimer = setInterval(nextSlide, slideInterval);
  });
}

// Animate Statistics Counters
function animateStats() {
  const statItems = document.querySelectorAll(".stat-item");
  const animationDuration = 2000; // 2 seconds
  const frameDuration = 1000 / 60; // 60fps
  const totalFrames = Math.round(animationDuration / frameDuration);

  statItems.forEach((item) => {
    const numberElement = item.querySelector(".stat-number");
    const targetNumber = parseInt(numberElement.getAttribute("data-count"));
    let currentNumber = 0;
    const increment = targetNumber / totalFrames;

    // Check if element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
              clearInterval(counter);
              currentNumber = targetNumber;
            }
            numberElement.textContent = Math.floor(currentNumber);
          }, frameDuration);

          // Stop observing after animation starts
          observer.unobserve(item);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(item);
  });
}

// Update cart count in header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach((element) => {
    element.textContent = totalItems;
  });
}

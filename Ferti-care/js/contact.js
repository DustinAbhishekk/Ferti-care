// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize FAQ accordion
  initFAQAccordion();

  // Handle contact form submission
  initContactForm();

  // Update cart count
  updateCartCount();
});

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

// Handle Contact Form Submission
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData.entries());

    // In a real application, you would send this data to a server
    console.log("Form submitted:", formObject);

    // Show success message
    showNotification(
      "Your message has been sent! We'll respond within 24 hours.",
      "success"
    );

    // Reset form
    contactForm.reset();
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
  }, 5000);
}

// Update cart count in header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach((element) => {
    element.textContent = totalItems;
  });
}

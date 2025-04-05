document.addEventListener("DOMContentLoaded", function () {
  // Step Navigation
  const steps = document.querySelectorAll(".step");
  const forms = document.querySelectorAll(".checkout-form");
  const nextButtons = document.querySelectorAll(".next-step");
  const prevButtons = document.querySelectorAll(".prev-step");

  // Initialize first step
  showStep(1);

  // Next button click
  nextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentStep = parseInt(
        this.closest(".checkout-form").id.split("-")[1]
      );
      const nextStep = parseInt(this.dataset.next);

      // Validate form before proceeding
      if (validateForm(currentStep)) {
        showStep(nextStep);
        updateProgress(nextStep);
      }
    });
  });

  // Previous button click
  prevButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const prevStep = parseInt(this.dataset.prev);
      showStep(prevStep);
      updateProgress(prevStep);
    });
  });

  // Place Order button
  document.getElementById("place-order").addEventListener("click", function () {
    // Simulate order processing
    setTimeout(() => {
      document.getElementById("confirmation-modal").style.display = "flex";
    }, 1000);
  });

  // Close modal by clicking outside
  document
    .getElementById("confirmation-modal")
    .addEventListener("click", function (e) {
      if (e.target === this) {
        this.style.display = "none";
      }
    });

  // Helper: Show specific step
  function showStep(stepNumber) {
    forms.forEach((form) => form.classList.remove("active"));
    document.getElementById(`${getFormId(stepNumber)}`).classList.add("active");
  }

  // Helper: Update progress bar
  function updateProgress(stepNumber) {
    steps.forEach((step) => {
      step.classList.remove("active");
      if (parseInt(step.dataset.step) <= stepNumber) {
        step.classList.add("active");
      }
    });
  }

  // Helper: Get form ID from step number
  function getFormId(stepNumber) {
    switch (stepNumber) {
      case 1:
        return "shipping-form";
      case 2:
        return "payment-form";
      case 3:
        return "order-review";
      default:
        return "";
    }
  }

  // Helper: Validate form
  function validateForm(stepNumber) {
    let isValid = true;
    const form = document.getElementById(`${getFormId(stepNumber)}`);

    if (form) {
      const inputs = form.querySelectorAll("input[required], select[required]");
      inputs.forEach((input) => {
        if (!input.value) {
          input.style.borderColor = "var(--danger)";
          isValid = false;
        } else {
          input.style.borderColor = "";
        }
      });
    }

    return isValid;
  }

  // Load cart items (mock data)
  function loadCartItems() {
    // In a real app, fetch from localStorage/API
    const cartItems = [
      {
        id: 1,
        name: "Organic Fertilizer 5kg",
        price: 24.99,
        qty: 2,
        image: "images/fertilizer.jpg",
      },
    ];

    // Render in order review
    const orderItemsContainer = document.querySelector(".order-items");
    const summaryItemsContainer = document.querySelector(".summary-items");

    if (orderItemsContainer && summaryItemsContainer) {
      orderItemsContainer.innerHTML = cartItems
        .map(
          (item) => `
                <div class="order-item">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>Qty: ${item.qty}</p>
                    </div>
                    <div class="item-price">$${(item.price * item.qty).toFixed(
                      2
                    )}</div>
                </div>
            `
        )
        .join("");

      summaryItemsContainer.innerHTML = cartItems
        .map(
          (item) => `
                <div class="summary-item">
                    <div class="item-name">${item.name} × ${item.qty}</div>
                    <div class="item-price">$${(item.price * item.qty).toFixed(
                      2
                    )}</div>
                </div>
            `
        )
        .join("");
    }
  }

  loadCartItems();
});

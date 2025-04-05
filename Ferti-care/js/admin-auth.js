document.addEventListener("DOMContentLoaded", function () {
  // Toggle password visibility
  const togglePassword = document.querySelector(".toggle-password");
  const passwordInput = document.getElementById("password");

  togglePassword.addEventListener("click", function () {
    const icon = this.querySelector("i");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      passwordInput.type = "password";
      icon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });

  // Form submission
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.querySelector('input[name="remember"]').checked;

    // Simple validation
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Show loading state
    const submitBtn = loginForm.querySelector(".login-btn");
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Authenticating...';

    // Simulate API call
    setTimeout(function () {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;

      // For demo purposes - always succeed
      // In a real app, you would handle the API response here
      window.location.href = "dashboard.html";

      console.log("Login attempt:", {
        username,
        password,
        rememberMe,
      });
    }, 1500);
  });

  // Forgot password functionality
  const forgotPasswordLink = document.querySelector(".forgot-password");

  forgotPasswordLink.addEventListener("click", function (e) {
    e.preventDefault();
    alert(
      "Please contact your system administrator to reset your password.\n\nEmail: admin@ferti-care.example\nPhone: +1 (555) 123-4567"
    );
  });
});

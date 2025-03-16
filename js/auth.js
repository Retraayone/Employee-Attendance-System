document.addEventListener("DOMContentLoaded", () => {
    console.log("Auth.js loaded") // Debug log
  
    // Check if user is already logged in
    fetch("api/check_session.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("Session check response:", data) // Debug log
        if (data.loggedIn) {
          // Redirect based on user role
          if (data.user.role === "admin") {
            console.log("Redirecting to admin dashboard") // Debug log
            window.location.href = "admin.html"
          } else {
            console.log("Redirecting to employee dashboard") // Debug log
            window.location.href = "employee.html"
          }
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error)
      })
  
    // Toggle between login and register forms
    const loginForm = document.getElementById("loginForm")
    const registerForm = document.getElementById("registerForm")
    const showRegisterBtn = document.getElementById("showRegisterBtn")
    const backToLoginBtn = document.getElementById("backToLoginBtn")
  
    if (showRegisterBtn) {
      showRegisterBtn.addEventListener("click", () => {
        loginForm.classList.add("hidden")
        registerForm.classList.remove("hidden")
        document.getElementById("loginError").classList.add("hidden")
      })
    }
  
    if (backToLoginBtn) {
      backToLoginBtn.addEventListener("click", () => {
        registerForm.classList.add("hidden")
        loginForm.classList.remove("hidden")
        document.getElementById("registerError").classList.add("hidden")
      })
    }
  
    // Handle login form submission
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log("Login form submitted") // Debug log
  
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const errorElement = document.getElementById("loginError")
  
        console.log("Attempting login with email:", email) // Debug log (don't log passwords)
  
        // Create form data
        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)
  
        // Send login request
        fetch("auth/login.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            console.log("Login response status:", response.status) // Debug log
            return response.json()
          })
          .then((data) => {
            console.log("Login response data:", data) // Debug log
  
            if (data.success) {
              console.log("Login successful, redirecting...") // Debug log
  
              // Redirect based on user role
              if (data.user.role === "admin") {
                window.location.replace("admin.html")
              } else {
                window.location.replace("employee.html")
              }
            } else {
              console.log("Login failed:", data.message) // Debug log
              errorElement.textContent = data.message
              errorElement.classList.remove("hidden")
            }
          })
          .catch((error) => {
            console.error("Error during login:", error)
            errorElement.textContent = "An error occurred. Please try again."
            errorElement.classList.remove("hidden")
          })
      })
    } else {
      console.error("Login form not found")
    }
  
    // Handle register form submission
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log("Register form submitted") // Debug log
  
        const name = document.getElementById("fullName").value
        const email = document.getElementById("registerEmail").value
        const password = document.getElementById("registerPassword").value
        const errorElement = document.getElementById("registerError")
  
        // Create form data
        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
  
        // Send register request
        fetch("auth/register.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Register response:", data) // Debug log
  
            if (data.success) {
              // Show success message and return to login
              registerForm.classList.add("hidden")
              loginForm.classList.remove("hidden")
  
              const loginErrorElement = document.getElementById("loginError")
              loginErrorElement.textContent = "Registration successful! Please login."
              loginErrorElement.classList.remove("hidden")
              loginErrorElement.classList.remove("error-message")
              loginErrorElement.classList.add("success-message")
  
              // Clear register form
              document.getElementById("fullName").value = ""
              document.getElementById("registerEmail").value = ""
              document.getElementById("registerPassword").value = ""
  
              // Reset message styling after 3 seconds
              setTimeout(() => {
                loginErrorElement.classList.add("hidden")
                loginErrorElement.classList.remove("success-message")
                loginErrorElement.classList.add("error-message")
              }, 3000)
            } else {
              errorElement.textContent = data.message
              errorElement.classList.remove("hidden")
            }
          })
          .catch((error) => {
            console.error("Error during registration:", error)
            errorElement.textContent = "An error occurred. Please try again."
            errorElement.classList.remove("hidden")
          })
      })
    }
  })
  
  
// Common functionality for dashboard pages
document.addEventListener("DOMContentLoaded", () => {
    console.log("Common.js loaded") // Debug log
  
    // Check if user is logged in
    function checkAuth() {
      fetch("api/check_session.php")
        .then((response) => response.json())
        .then((data) => {
          console.log("Session check response:", data) // Debug log
  
          if (!data.loggedIn) {
            console.log("User not logged in, redirecting to login page") // Debug log
            window.location.href = "index.html"
            return null
          }
          return data.user
        })
        .then((user) => {
          if (user) {
            // Display user info
            displayUserInfo(user)
            // Redirect based on role
            redirectBasedOnRole(user)
          }
        })
        .catch((error) => {
          console.error("Error checking session:", error)
          window.location.href = "index.html"
        })
    }
  
    // Display user name in the header
    function displayUserInfo(user) {
      const userNameElement = document.getElementById("userName")
      if (userNameElement) {
        userNameElement.textContent = user.name
        console.log("Displayed user name:", user.name) // Debug log
      }
    }
  
    // Redirect based on user role
    function redirectBasedOnRole(user) {
      const isAdminPage = window.location.href.includes("admin.html")
      const isEmployeePage = window.location.href.includes("employee.html")
  
      console.log("Current page - Admin:", isAdminPage, "Employee:", isEmployeePage) // Debug log
      console.log("User role:", user.role) // Debug log
  
      if (user.role === "admin" && isEmployeePage) {
        console.log("Admin on employee page, redirecting to admin page") // Debug log
        window.location.href = "admin.html"
      } else if (user.role === "employee" && isAdminPage) {
        console.log("Employee on admin page, redirecting to employee page") // Debug log
        window.location.href = "employee.html"
      }
    }
  
    // Handle logout
    const logoutBtn = document.getElementById("logoutBtn")
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        console.log("Logout button clicked") // Debug log
  
        fetch("auth/logout.php")
          .then((response) => response.json())
          .then((data) => {
            console.log("Logout response:", data) // Debug log
            window.location.href = "index.html"
          })
          .catch((error) => console.error("Error logging out:", error))
      })
    }
  
    // Initialize common functionality
    checkAuth()
  })
  
  
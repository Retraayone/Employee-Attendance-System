document.addEventListener("DOMContentLoaded", () => {
  console.log("Admin.js loaded") // Debug log

  // Load employees
  function loadEmployees() {
    console.log("Loading employees...") // Debug log

    fetch("admin/get_employees.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("Employees data:", data) // Debug log

        if (data.success) {
          renderEmployeeTable(data.employees)
        } else {
          console.error("Error loading employees:", data.message)
        }
      })
      .catch((error) => console.error("Error:", error))
  }

  // Load attendance records
  function loadAttendanceRecords() {
    console.log("Loading attendance records...") // Debug log

    fetch("admin/get_attendance.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("Attendance data:", data) // Debug log

        if (data.success) {
          renderAttendanceTable(data.records)
        } else {
          console.error("Error loading attendance:", data.message)
        }
      })
      .catch((error) => console.error("Error:", error))
  }

  // Render employee table
  function renderEmployeeTable(employees) {
    const tableBody = document.getElementById("employeeTableBody")
    tableBody.innerHTML = ""

    if (employees.length === 0) {
      // Show empty state if no employees
      const row = document.createElement("tr")
      const cell = document.createElement("td")
      cell.setAttribute("colspan", "3")
      cell.className = "empty-state"
      cell.textContent = "No employees found"
      row.appendChild(cell)
      tableBody.appendChild(row)
      return
    }

    // Create a row for each employee
    employees.forEach((employee) => {
      const row = document.createElement("tr")

      // Name cell
      const nameCell = document.createElement("td")
      nameCell.textContent = employee.name
      row.appendChild(nameCell)

      // Email cell
      const emailCell = document.createElement("td")
      emailCell.textContent = employee.email
      row.appendChild(emailCell)

      // Actions cell
      const actionsCell = document.createElement("td")

      // Delete button
      const deleteButton = document.createElement("button")
      deleteButton.className = "delete-btn"
      deleteButton.innerHTML = '<i class="ri-delete-bin-line"></i>'
      deleteButton.addEventListener("click", () => {
        handleDeleteEmployee(employee.id)
      })

      actionsCell.appendChild(deleteButton)
      row.appendChild(actionsCell)

      tableBody.appendChild(row)
    })

    console.log("Employee table rendered with", employees.length, "employees") // Debug log
  }

  // Render attendance table
  function renderAttendanceTable(records) {
    const tableBody = document.getElementById("attendanceTableBody")
    tableBody.innerHTML = ""

    if (records.length === 0) {
      // Show empty state if no attendance records
      const row = document.createElement("tr")
      const cell = document.createElement("td")
      cell.setAttribute("colspan", "4")
      cell.className = "empty-state"
      cell.textContent = "No attendance records found"
      row.appendChild(cell)
      tableBody.appendChild(row)
      return
    }

    // Create a row for each attendance record
    records.forEach((record) => {
      const row = document.createElement("tr")

      // Employee name cell
      const employeeCell = document.createElement("td")
      employeeCell.textContent = record.userName
      row.appendChild(employeeCell)

      // Date cell
      const dateCell = document.createElement("td")
      dateCell.textContent = record.date
      row.appendChild(dateCell)

      // Check in cell
      const checkInCell = document.createElement("td")
      checkInCell.textContent = record.checkIn
      row.appendChild(checkInCell)

      // Check out cell
      const checkOutCell = document.createElement("td")
      checkOutCell.textContent = record.checkOut || "-"
      row.appendChild(checkOutCell)

      tableBody.appendChild(row)
    })

    console.log("Attendance table rendered with", records.length, "records") // Debug log
  }

  // Handle delete employee
  function handleDeleteEmployee(employeeId) {
    if (confirm("Are you sure you want to delete this employee?")) {
      console.log("Deleting employee with ID:", employeeId) // Debug log

      // Create form data
      const formData = new FormData()
      formData.append("employee_id", employeeId)

      // Send delete request
      fetch("admin/delete_employee.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Delete response:", data) // Debug log

          alert(data.message)
          if (data.success) {
            // Refresh tables
            loadEmployees()
            loadAttendanceRecords()
          }
        })
        .catch((error) => console.error("Error:", error))
    }
  }

  // Initialize admin dashboard
  loadEmployees()
  loadAttendanceRecords()
})


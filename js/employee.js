document.addEventListener("DOMContentLoaded", () => {
  console.log("Employee.js loaded") // Debug log

  // Load attendance records
  function loadAttendanceRecords() {
    console.log("Loading attendance records...") // Debug log

    fetch("employee/get_attendance.php")
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

  // Render attendance table
  function renderAttendanceTable(records) {
    const tableBody = document.getElementById("attendanceTableBody")
    tableBody.innerHTML = ""

    if (records.length === 0) {
      const row = document.createElement("tr")
      const cell = document.createElement("td")
      cell.setAttribute("colspan", "3")
      cell.textContent = "No attendance records found"
      cell.className = "empty-state"
      row.appendChild(cell)
      tableBody.appendChild(row)
      return
    }

    records.forEach((record) => {
      const row = document.createElement("tr")

      const dateCell = document.createElement("td")
      dateCell.textContent = record.date
      row.appendChild(dateCell)

      const checkInCell = document.createElement("td")
      checkInCell.textContent = record.checkIn
      row.appendChild(checkInCell)

      const checkOutCell = document.createElement("td")
      checkOutCell.textContent = record.checkOut || "-"
      row.appendChild(checkOutCell)

      tableBody.appendChild(row)
    })

    console.log("Attendance table rendered with", records.length, "records") // Debug log
  }

  // Handle check in
  function handleCheckIn() {
    console.log("Check-in button clicked") // Debug log

    fetch("employee/check_in.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        console.log("Check-in response received:", response) // Debug log
        return response.json()
      })
      .then((data) => {
        console.log("Check-in data:", data) // Debug log
        alert(data.message)
        if (data.success) {
          loadAttendanceRecords()
        }
      })
      .catch((error) => {
        console.error("Error during check-in:", error)
        alert("An error occurred during check-in. Please try again.")
      })
  }

  // Handle check out
  function handleCheckOut() {
    console.log("Check-out button clicked") // Debug log

    fetch("employee/check_out.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        console.log("Check-out response received:", response) // Debug log
        return response.json()
      })
      .then((data) => {
        console.log("Check-out data:", data) // Debug log
        alert(data.message)
        if (data.success) {
          loadAttendanceRecords()
        }
      })
      .catch((error) => {
        console.error("Error during check-out:", error)
        alert("An error occurred during check-out. Please try again.")
      })
  }

  // Set up event listeners
  const checkInBtn = document.getElementById("checkInBtn")
  const checkOutBtn = document.getElementById("checkOutBtn")

  if (checkInBtn) {
    checkInBtn.addEventListener("click", handleCheckIn)
    console.log("Check-in event listener attached") // Debug log
  } else {
    console.error("Check-in button not found")
  }

  if (checkOutBtn) {
    checkOutBtn.addEventListener("click", handleCheckOut)
    console.log("Check-out event listener attached") // Debug log
  } else {
    console.error("Check-out button not found")
  }

  // Initialize employee dashboard
  loadAttendanceRecords()
  console.log("Employee dashboard initialized") // Debug log
})


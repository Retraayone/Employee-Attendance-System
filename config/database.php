<?php
// Database configuration
$host = "localhost";     // Database host (usually localhost for local development)
$username = "root";      // Database username (default is root for XAMPP)
$password = "";          // Database password (default is empty for XAMPP)
$database = "attendance_system";  // Database name

// Create database connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>


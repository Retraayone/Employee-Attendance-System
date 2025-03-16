<?php
// Start session
session_start();

// Include database connection
require_once '../config/database.php';

// Initialize response array
$response = array(
    'success' => false,
    'message' => ''
);

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];
    $role = "employee"; // Default role is employee
    
    // Validate input
    if (empty($name) || empty($email) || empty($password)) {
        $response['message'] = "All fields are required";
    } else {
        // Check if email already exists
        $check_query = "SELECT * FROM users WHERE email = '$email'";
        $check_result = mysqli_query($conn, $check_query);
        
        if (mysqli_num_rows($check_result) > 0) {
            $response['message'] = "Email already exists";
        } else {
            // Hash password
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            
            // Insert new user
            $insert_query = "INSERT INTO users (name, email, password, role) 
                            VALUES ('$name', '$email', '$hashed_password', '$role')";
            
            if (mysqli_query($conn, $insert_query)) {
                $response['success'] = true;
                $response['message'] = "Registration successful";
            } else {
                $response['message'] = "Error: " . mysqli_error($conn);
            }
        }
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>


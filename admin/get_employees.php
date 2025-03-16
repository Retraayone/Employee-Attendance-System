<?php
// Start session
session_start();

// Include database connection
require_once '../config/database.php';

// Initialize response array
$response = array(
    'success' => false,
    'message' => '',
    'employees' => array()
);

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    $response['message'] = "Unauthorized access";
} else {
    // Get all employees (users with role 'employee')
    $query = "SELECT id, name, email, role FROM users WHERE role = 'employee'";
    $result = mysqli_query($conn, $query);
    
    if ($result) {
        $employees = array();
        
        while ($row = mysqli_fetch_assoc($result)) {
            $employees[] = array(
                'id' => $row['id'],
                'name' => $row['name'],
                'email' => $row['email'],
                'role' => $row['role']
            );
        }
        
        $response['success'] = true;
        $response['employees'] = $employees;
    } else {
        $response['message'] = "Error: " . mysqli_error($conn);
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>


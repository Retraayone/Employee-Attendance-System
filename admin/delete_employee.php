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

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    $response['message'] = "Unauthorized access";
} else {
    // Check if employee ID is provided
    if (!isset($_POST['employee_id'])) {
        $response['message'] = "Employee ID is required";
    } else {
        // Get employee ID
        $employee_id = mysqli_real_escape_string($conn, $_POST['employee_id']);
        
        // Start transaction
        mysqli_begin_transaction($conn);
        
        try {
            // Delete attendance records for this employee
            $delete_attendance = "DELETE FROM attendance WHERE user_id = '$employee_id'";
            mysqli_query($conn, $delete_attendance);
            
            // Delete employee
            $delete_employee = "DELETE FROM users WHERE id = '$employee_id' AND role = 'employee'";
            mysqli_query($conn, $delete_employee);
            
            // Commit transaction
            mysqli_commit($conn);
            
            $response['success'] = true;
            $response['message'] = "Employee deleted successfully";
        } catch (Exception $e) {
            // Rollback transaction on error
            mysqli_rollback($conn);
            $response['message'] = "Error: " . $e->getMessage();
        }
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>


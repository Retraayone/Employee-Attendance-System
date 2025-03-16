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

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    $response['message'] = "User not logged in";
} else {
    // Get user ID from session
    $user_id = $_SESSION['user_id'];
    
    // Get current date and time
    $date = date('Y-m-d');
    $time = date('h:i:s A'); // 12-hour format with AM/PM
    
    // Check if checked in today
    $check_query = "SELECT * FROM attendance 
                    WHERE user_id = '$user_id' 
                    AND date = '$date' 
                    AND check_out IS NULL";
    $check_result = mysqli_query($conn, $check_query);
    
    if (mysqli_num_rows($check_result) == 0) {
        $response['message'] = "You need to check in first";
    } else {
        // Update check-out time
        $update_query = "UPDATE attendance 
                        SET check_out = '$time' 
                        WHERE user_id = '$user_id' 
                        AND date = '$date' 
                        AND check_out IS NULL";
        
        if (mysqli_query($conn, $update_query)) {
            $response['success'] = true;
            $response['message'] = "Check-out successful at $time";
        } else {
            $response['message'] = "Error: " . mysqli_error($conn);
        }
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>


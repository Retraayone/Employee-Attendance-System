<?php
// Start session
session_start();

// Include database connection
require_once '../config/database.php';

// Initialize response array
$response = array(
    'success' => false,
    'message' => '',
    'records' => array()
);

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    $response['message'] = "User not logged in";
} else {
    // Get user ID from session
    $user_id = $_SESSION['user_id'];
    
    // Get attendance records for this user
    $query = "SELECT * FROM attendance 
              WHERE user_id = '$user_id' 
              ORDER BY date DESC, check_in DESC";
    $result = mysqli_query($conn, $query);
    
    if ($result) {
        $records = array();
        
        while ($row = mysqli_fetch_assoc($result)) {
            // Format the date to be more readable
            $formatted_date = date('M d, Y', strtotime($row['date']));
            
            $records[] = array(
                'id' => $row['id'],
                'userId' => $row['user_id'],
                'date' => $formatted_date,
                'checkIn' => $row['check_in'],
                'checkOut' => $row['check_out']
            );
        }
        
        $response['success'] = true;
        $response['records'] = $records;
    } else {
        $response['message'] = "Error: " . mysqli_error($conn);
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>


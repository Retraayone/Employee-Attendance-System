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

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    $response['message'] = "Unauthorized access";
} else {
    // Get all attendance records with user names
    $query = "SELECT a.*, u.name as user_name 
              FROM attendance a 
              JOIN users u ON a.user_id = u.id 
              ORDER BY a.date DESC, a.check_in DESC";
    $result = mysqli_query($conn, $query);
    
    if ($result) {
        $records = array();
        
        while ($row = mysqli_fetch_assoc($result)) {
            $records[] = array(
                'id' => $row['id'],
                'userId' => $row['user_id'],
                'userName' => $row['user_name'],
                'date' => $row['date'],
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


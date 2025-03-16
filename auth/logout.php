<?php
// Start session
session_start();

// Initialize response array
$response = array(
    'success' => true,
    'message' => 'Logout successful'
);

// Destroy session
session_unset();
session_destroy();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>


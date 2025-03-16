<?php
// Start session
session_start();

// Initialize response array
$response = array(
    'loggedIn' => false,
    'user' => null
);

// Check if user is logged in
if (isset($_SESSION['user_id'])) {
    $response['loggedIn'] = true;
    $response['user'] = array(
        'id' => $_SESSION['user_id'],
        'name' => $_SESSION['user_name'],
        'email' => $_SESSION['user_email'],
        'role' => $_SESSION['user_role']
    );
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>


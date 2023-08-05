<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once('../connect.php');

    $userMessage = isset($_POST['userMessage']) ? sanitize_text_field($_POST['userMessage']) : '';
    $botResponse = isset($_POST['botResponse']) ? sanitize_text_field($_POST['botResponse']) : '';

    if($_COOKIE['chatBot']){
        $cookieId = sanitize_text_field($_COOKIE['chatBot']);
    } else {
        $cookieId = uniqid("chat_", true); // Create unique id
        setcookie("chatBot", $cookieId, time() + (60 * 60 * 24 * 30), "/"); // Set cookie for a month
    }

    if (!empty($cookieId)) {
        $sql = "INSERT INTO db_name (cookie_id, user_message, system_answer) VALUES (?, ?, ?)";
        
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("sss", $cookieId, $userMessage, $botResponse);
    
            if ($stmt->execute()) {
                echo "Successful.";
            } else {
                echo "Error: " . $stmt->error;
            }
        }
        
        $stmt->close();
    }
}

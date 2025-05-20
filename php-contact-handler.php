<?php
ini_set('max_execution_time', 60); // Limit execution time for better performance

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Explicitly load the `.env` file from the current directory
use Dotenv\Dotenv;

require 'vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad(); // Use `safeLoad()` instead of `load()` to prevent crashes

// Load environment variables securely
$SMTP_HOST = $_ENV['SMTP_HOST'] ?? null;
$EMAIL_USERNAME = $_ENV['EMAIL_USERNAME'] ?? null;
$EMAIL_PASSWORD = $_ENV['EMAIL_PASSWORD'] ?? null;
$SMTP_PORT = $_ENV['SMTP_PORT'] ?? null;

// Prevent execution if not an HTTP POST request (allow CLI check)
if (php_sapi_name() !== 'cli' && $_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("Invalid request.");
}

// Retrieve and sanitize form data
$name = htmlspecialchars($_POST['name'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');
$message = htmlspecialchars($_POST['message'] ?? '');

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    die("Error: All fields are required.");
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Error: Invalid email address.");
}

try {
    // Create PHPMailer instance
    $mail = new PHPMailer(true);

    // Configure SMTP settings
    $mail->isSMTP();
    $mail->Host = $SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = $EMAIL_USERNAME;
    $mail->Password = $EMAIL_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $SMTP_PORT;

    // Set email headers & message
    $mail->setFrom($EMAIL_USERNAME, 'Website Contact Form');
    $mail->addAddress('worldwideijawbrotherhood@gmail.com'); // Replace with recipient email
    $mail->isHTML(true);
    $mail->Subject = "New Message from Website Contact Form";
    $mail->Body = "<strong>Name:</strong> $name<br>
                   <strong>Email:</strong> $email<br>
                   <strong>Message:</strong> <p>$message</p>";


    // Attempt to send email & provide feedback
    if ($mail->send()) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Message could not be sent. Error: " . $mail->ErrorInfo;
    }

} catch (Exception $e) {
    echo "Mailer Error: {$e->getMessage()}";
}

?>

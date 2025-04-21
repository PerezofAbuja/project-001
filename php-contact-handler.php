<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include PHPMailer library files
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Path to PHPMailer files on your server
require '/public_html/PHPMailer-master/src/Exception.php';
require '/public_html/PHPMailer-master/src/PHPMailer.php';
require '/public_html/PHPMailer-master/src/SMTP.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $tel = htmlspecialchars(string: $_POST['tel']);
    $message = htmlspecialchars($_POST['message']);

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);
    try {
        // SMTP server settings
        $mail->isSMTP();
        $mail->Host = 'mail.domain_name';  // Replace with your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'username@domain_name';  // Replace with your email address
        $mail->Password = 'domain_password';        // Replace with your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // Encryption method (TLS or SSL)
        $mail->Port = 587;  // SMTP port (587 for TLS, 465 for SSL)

        // Email headers and body
        $mail->setFrom('username@domain_name', 'sender_name');  // Replace with your email and sender name
        $mail->addAddress('receiver_mail');  // Replace with the email where you want to receive messages
        $mail->Subject = "Message from Website Contact Form";
        $mail->Body = "Name: $name\nEmail: $email\nTel: $tel\nMessage:\n$message";

        // Send email
        $mail->send();
        echo "Thank you! Your message has been sent.";
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>

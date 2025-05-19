<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__)->load();
// load environment variables
$mail->Host = $smtpHost;
$mail->Username = $emailUser;
$mail->Password = $emailPass;
$mail->Port = $smtpPort;



// Include PHPMailer library files
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Path to PHPMailer files on your server
require __DIR__ . '/PHPMailer-master/src/Exception.php';
require __DIR__ . '/PHPMailer-master/src/PHPMailer.php';
require __DIR__ . '/PHPMailer-master/src/SMTP.php';



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    


    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);
    try {
        // SMTP server settings
        $mail->isSMTP();
        $mail->Host = $SMTP_HOST;  // Replace with your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = $EMAIL_USERNAME;  // Replace with your email address
        $mail->Password = $EMAIL_PASSWORD;        // Replace with your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // Encryption method (TLS or SSL)
        $mail->Port = $SMTP_PORT;  

        // Email headers and body
        $mail->setFrom('contact@ijawbrotherhoodworldwide.info', 'sender_name');  // Replace with your email and sender name
        $mail->addAddress('worldwideijawbrotherhood@gmail.com');  // Replace with the email where you want to receive messages
        $mail->Subject = "Message from Website Contact Form";
        $mail->Body = "Name: $name\nEmail: $email\nMessage:\n$message";

        // Send email
        $mail->send();
        echo "Thank you! Your message has been sent.";
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

$mail->SMTPDebug = 2;
$mail->Debugoutput = 'html';

?>

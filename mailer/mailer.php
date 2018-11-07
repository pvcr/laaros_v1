<?php 
/*
 * Mailer Script
 * Author: Venkat
 * 
*/

//$to = 'your_email@domain.com';			// TODO: Replace with your email
$to = 'hello@laaros.com';

/* ============================================ SMTP SETTINGS ============================================ */

$smtp = false;							// Set TRUE if you want use a custom smtp server
$smtp_username = '';					// Add your smtp username
$smtp_password = '';					// Add your smtp password
$smtp_host = '';						// Set the hostname of the mail server (ex. smtp.gmail.com)
$smtp_port = '';						// Set the SMTP port number - likely to be 25, 465 or 587
$smtp_secure = '';						// Set the encryption system to use. Accepted values: 'ssl' or 'tls'

/* ============================================ SMTP SETTINGS ============================================ */

if ( isset( $_POST['email'] ) ) {

	// Function to strip html tags from form data
	function cleanFields( $elem ) {
		return strip_tags( $elem );
	}

	extract( array_map( 'cleanFields', $_POST ) );

	// Check if all fields are valid (It's an additional check if the javascript validation has failed)
	if ( empty( $name ) || empty( $email ) || empty( $subject ) || empty( $message ) ) {

		echo 'fail';

	} else {

		date_default_timezone_set('Etc/UTC');

		require 'PHPMailer/PHPMailerAutoload.php';

		$mail = new PHPMailer;

		if ( $smtp ) {
			// SMTP configuration
			$mail->isSMTP();
			$mail->Host = $smtp_host;
			$mail->Port = $smtp_port;
			$mail->SMTPSecure = $smtp_secure;
			$mail->SMTPAuth = true;
			$mail->Username = $smtp_username;
			$mail->Password = $smtp_password;
		}

		$mail->setFrom( $email, '=?UTF-8?B?' . base64_encode( $name ) . '?=' );
		$mail->addReplyTo( $email );
		$mail->addAddress( $to );
		$mail->Subject = '=?UTF-8?B?' . base64_encode( $subject ) . '?=';
		$mail->isHTML( true );
		$mail->Body = $message;
		$mail->CharSet = 'UTF-8';

		if ( $mail->send() ) {
		    echo 'success';
		} else {
		    echo 'fail';
		}

	}

}
<?php
/*
 * Newsletter Subscriber Script
 * Author: Venkat
 * 
 */


/* ========================== SETTINGS - Edit ONLY this section ========================== */


/* Mailchimp Settings */
$mailchimp          = true;            // Set to TRUE to use Mailchimp
$mailchimpApiKey    = '60d0928f77ac53cde1bdea5f6188be0f-us19';               // Your Mailchimp Api Key
$mailchimpIDList    = 'fb5fa82868';               // Your Mailchimp ID list
$double_optin       = false;            // Set to TRUE to conrol whether a double opt-in confirmation message is sent
$send_welcome       = true;            // Set to TRUE to send a welcome message when the subscription is successful. NOTE: $double_optin must be set to FALSE

/* File Storage Setting */
$csv = true;                            // Set to TRUE to save emails in a csv file. Otherwise in a txt file.


/* ======================================================================================= */


if ( isset( $_POST['email'] ) ) {

    $email = $_POST['email'];

    if ( $mailchimp ) {

        require_once 'MailChimp.class.php';

        $MailChimpObj = new MailChimp( $mailchimpApiKey );

        $result = $MailChimpObj->call( 'lists/subscribe', array(
                'id'                => $mailchimpIDList,
                'email'             => array('email' => $email),
                'double_optin'      => $double_optin,
                'send_welcome'      => $send_welcome,
            ));

        if ( array_key_exists( 'status', $result ) ) {

            if ( $result['code'] == 214 ) {
                echo 'duplicate';
            } else {
                echo 'fail';
            }

        } else {

            echo 'success';
        }

    } else {

        $double = false;

        if ( $csv ) {

            $file = fopen( 'list.csv', 'a+' );

            while ( $row = fgetcsv( $file ) ) {
                if ( $row[0] == $email ) {
                    $double = true;
                    break;
                }
            }

        } else {

            $file = fopen( 'list.txt', 'a+' );
            
            while ( ( $buffer = fgets( $file, 4096 ) ) !== false ) {
                if ( $buffer == $email . "\n" ) {
                    $double = true;
                    break;
                }
            }

        }

        if ( ! $double ) {

            if ( $csv ) {
                fputcsv( $file, array($email) ); 
            } else {
                fwrite( $file, $email . "\n" );
            }

            echo 'success';

        } else {

            echo 'duplicate';
        }

        fclose( $file );

    }   

}
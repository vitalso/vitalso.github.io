<?php
ob_start();
error_log();
if(isset($_POST['name']) && isset($_POST['email'])){

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$industry = $_POST['industry'];
$message = $_POST['message'];

$mailHeading = 'MyFreeOnlineTools Contact Form';
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From: MyFreeOnlineTools <mailmyfreeonlinetools.com>' . PHP_EOL .
'Reply-To: MyFreeOnlineTools <mailmyfreeonlinetools.com>' . PHP_EOL .
'X-Mailer: PHP/' . phpversion();

$to = 'lgphone.vs@gmail.com';


$messageSent = '<div>Name Sender : '.$name .'</div><div> Name Email : '.$email.' </div><div>Mail Subject : '.$subject.'</div><div> Message : <br/> '.$message.'</div>';

if( $name != '' || $message != '' || $email != ''){
mail($to,$subject,$messageSent,$headers);
echo 'Mail Send I Will Get Back to You....';
}
}

?>

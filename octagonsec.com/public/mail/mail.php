<?
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")){ //Checking if our name fields were sent and if they are not empty

$service = $_POST["service"];
$listService = implode(',', $service);


        $to = 'info@octagonsec.com';
        $subject = 'Message from Contact Form';
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Name: '.$_POST['name'].'</p>
                        <p>E-mail: '.$_POST['email'].'</p>
                        <p>Phone: '.$_POST['phone'].'</p>
                        <p>Company: '.$_POST['company'].'</p>
                        <p>Service: '.$listService.'</p>
                        <p>Message: '.$_POST['message'].'</p>
                    </body>
                </html>';
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: sales@octagonsec.com\r\n";
        $headers .= 'Reply-To: '. $_POST['email'] . "\r\n" ;

        mail($to, $subject, $message, $headers);
}
?>

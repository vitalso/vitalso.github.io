<?php
  $toEmail = "lgphone.vs@gmail.com";
  $mailHeaders = "From: " . $_POST["name"] . "<". $_POST["email"] .">\r\n";
  if(mail($toEmail, $_POST["industry"], $_POST["message"], $mailHeaders)) {
      print "<p class='success'>Mail Sent.</p>";
  } else {
      print "<p class='Error'>Problem in Sending Mail.</p>";
  }
?>

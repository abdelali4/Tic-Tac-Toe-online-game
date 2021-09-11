<?php
    session_start();
    require_once("connexion.php");
    include_once("format_time.php");
    $rq=$pdo->prepare("insert into chat(transmitter,receiver,message,message_time) values(?,?,?,?)");
    $rq->execute(array($_SESSION["user_id"],md5(0),$_POST["message"],time()));
    echo '{"time":"'.time().'"}';   
?>
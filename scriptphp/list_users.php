<?php
    session_start();
    require_once("connexion.php");
    $rq=$pdo->prepare("select md5(id) as id,profile_image,username,status from users where(md5(id)!=?);");
    $rq->setFetchMode(PDO::FETCH_ASSOC);
    $rq->execute(array($_SESSION["user_id"]));
    $users=$rq->fetchAll();
    echo json_encode($users);
?>
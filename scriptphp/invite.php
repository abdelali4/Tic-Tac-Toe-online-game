<?php
    session_start();
    require_once("connexion.php");
    $rq=$pdo->prepare("insert into invitation(transmitter,receiver,status,invitation_time) values(?,?,?,?);");
    $rq->execute(array($_SESSION["user_id"],$_POST["id"],"pending",time()));
    $rq=$pdo->prepare("select id from invitation where(transmitter=? and receiver=? and invitation_time>=?) limit 1;");
    $rq->setFetchMode(PDO::FETCH_ASSOC);
    $rq->execute(array($_SESSION["user_id"],$_POST["id"],time()));
    $invitation_id=$rq->fetchAll();
    echo json_encode($invitation_id[0]);
?>
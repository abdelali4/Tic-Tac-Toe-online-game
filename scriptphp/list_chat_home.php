<?php
    require_once("connexion.php");
    $rq=$pdo->prepare("
    select message,message_time,B.username from chat as A
    inner join users as B on A.transmitter=md5(B.id); where(receiver=?)");
    $rq->setFetchMode(PDO::FETCH_ASSOC);
    $rq->execute(array(md5(0)));
    $messages=$rq->fetchAll();
    echo json_encode($messages);
?>
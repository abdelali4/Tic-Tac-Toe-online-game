<?php
    session_start();
    $user_id=$_SESSION["user_id"];
    $last_time=$_POST["last_time"];
    session_abort();
    require_once("connexion.php");
    $rq=$pdo->prepare("select transmitter,message_time,message,B.username from chat as A 
    inner join users as B on transmitter=md5(B.id) where(message_time>? and transmitter!=?);");
    $rq->setFetchMode(PDO::FETCH_ASSOC);
    $k=1;
    while(1){
        $rq->execute(array($last_time,$user_id));
        $messages=$rq->fetchAll();
        if(sizeof($messages)){
            echo json_encode($messages);
            break;
        }
        elseif($k>=6){
            echo "[]";
            break;        
        }
        $k++;
        sleep(1);
    }
?>
<?php
    session_start();
    $user_id=$_SESSION["user_id"];
    session_abort();
    require_once("connexion.php");
    $rq=$pdo->prepare("select A.id,A.transmitter,B.username from invitation as A
    inner join users as B on A.transmitter=md5(B.id) where(receiver=? and A.status=?) limit 1;");
    $rq->setFetchMode(PDO::FETCH_ASSOC);
    $k=1;
    while(1){
        $rq->execute(array($user_id,"pending"));
        $invitation=$rq->fetchAll();
        if(sizeof($invitation)){
            echo json_encode($invitation[0]);
            break;
        }
        else if($k>=6){
            echo "{}";
            break;
        }
        $k++;
        sleep(1);
    }
?>
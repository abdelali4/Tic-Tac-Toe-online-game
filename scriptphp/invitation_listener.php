<?php
    require_once("connexion.php");
    $rq=$pdo->prepare("select receiver,status from invitation where(id=? and status!=?) limit 1;");
    $rq->setFetchMode(PDO::FETCH_ASSOC);
    $k=1;
    while(1){
        $rq->execute(array($_POST["invitation_id"],"pending"));
        $result=$rq->fetchAll();
        if(sizeof($result)){
            if($result[0]["status"]=="accepted"){
                setcookie("game_id",md5($_POST["invitation_id"]),time()+1500,"/");
            }
            else{
                $rq=$pdo->prepare("select username from users where(md5(id)=?) limit 1;");
                $rq->setFetchMode(PDO::FETCH_ASSOC);
                $rq->execute(array($result[0]["receiver"]));
                $user=$rq->fetchAll();
                $result[0]["user"]=$user[0]["username"];
            }
            echo json_encode($result[0]);
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
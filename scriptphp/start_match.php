<?php
    session_start();
    $game_id=$_SESSION["game_id"];
    $user_id=$_SESSION["user_id"];
    session_abort();
    require_once("connexion.php");
    $rq=$pdo->prepare("select first_player from game where(game_id=? and player_1_status=? and player_2_status=?) limit 1");
    $rq->setFetchMode(PDO::FETCH_ASSOC);
    $k=1;
    while(1){
        $rq->execute(array($game_id,"ready","ready"));
        $game=$rq->fetchAll();
        if(sizeof($game)){
            $first_player_id=$game[0]["first_player"];
            $rq=$pdo->prepare("select id from users where(md5(id)=?) limit 1;");
            $rq->setFetchMode(PDO::FETCH_ASSOC);
            $rq->execute(array($first_player_id));
            $first_player=$rq->fetchAll();
            $first_player=$first_player[0];
            $i_play_first=($first_player_id==$user_id)?true:false;
            $first_player["play_first"]=$i_play_first;
            echo json_encode($first_player);
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
<?php
    session_start();
    require_once("connexion.php");
    if(isset($_COOKIE["game_id"])){
        $rq=$pdo->prepare("update game set player_1_status=? where(game_id=?) limit 1;");
    }
    else{
        $rq=$pdo->prepare("update game set player_2_status=? where(game_id=?) limit 1; ");
    }
    $rq->execute(array("ready",$_SESSION["game_id"]));
    echo json_encode($_COOKIE);
?>
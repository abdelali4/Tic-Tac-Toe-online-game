<?php
    session_start();
    require_once("connexion.php");
    $rq=$pdo->prepare("update invitation set status=? where(id=?)");
    $rq->execute(array($_POST["response"],$_POST["invitation_id"]));
    if($_POST["response"]=="accepted"){
        $rq=$pdo->prepare("select transmitter,receiver from invitation where(id=?) limit 1 ");
        $rq->setFetchMode(PDO::FETCH_ASSOC);
        $rq->execute(array($_POST["invitation_id"]));
        $invitation=$rq->fetchAll();
        $invitation=$invitation[0];
        $rq=$pdo->prepare("insert into game(game_id,player_1,player_2,game_status,game_time,first_player,player_1_status,player_2_status) values(?,?,?,?,?,?,?,?);");
        $first_player=rand(0,1)?$invitation["transmitter"]:$invitation["receiver"];
        $rq->execute(array(md5($_POST["invitation_id"]),$invitation["transmitter"],$invitation["receiver"],"pending",time(),$first_player,"not ready","not ready"));
        $_SESSION["game_id"]=md5($_POST["invitation_id"]);
    }
?>
<?php
    require_once("connexion.php");
    $rq=$pdo->prepare("select player_1,player_2 from game where(game_id=?) limit 1; ");
    $rq->setFetchMode(PDO::FETCH_ASSOC);
    $rq->execute(array($_SESSION["game_id"]));
    $game_players=$rq->fetchAll();
    $game_players=$game_players[0];
    $rq=$pdo->prepare("select md5(id) as id,username,profile_image from users where(md5(id)=?) limit 1");
    $rq->execute(array($game_players["player_1"]));
    $player_1=$rq->fetchAll();
    $player_1=$player_1[0];
    $rq->execute(array($game_players["player_2"]));
    $player_2=$rq->fetchAll();
    $player_2=$player_2[0];
?>
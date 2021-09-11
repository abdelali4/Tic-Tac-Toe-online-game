<?php
    session_start();
    if(!isset($_SESSION["game_id"])){
        $_SESSION["game_id"]=$_COOKIE["game_id"];
    }
    include_once("scriptphp/fetch_players_data.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/background.css" />
    <link rel="stylesheet" href="style/font.css" />
    <link rel="stylesheet" href="style/loading.css" />
    <link rel="stylesheet" href="style/offline.css" />
    <link rel="stylesheet" href="style/online.css" />
    <script defer src="javascript/game_online.js"></script>
    <title>Gameplay</title>
</head>
<body>
    <div id="background"></div>
    <div id="versus">
        <div class="player_container" id="player_1_container">
            <div class="player_image" style="background-image:url('users_profile/<?php echo $player_1["profile_image"] ?>')"></div>
            <div class="player_name"><?php echo $player_1["username"]?></div>
        </div>
        <div id="vs">VS</div>
        <div class="player_container" id="player_2_container">
            <div class="player_image" style="background-image:url('users_profile/<?php echo $player_2["profile_image"] ?>')"></div>
            <div class="player_name"><?php echo $player_2["username"]?></div>
        </div>
    </div>
</body>
</html>
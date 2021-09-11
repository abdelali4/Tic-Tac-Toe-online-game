<?php
    session_start();
    if(isset($_SESSION["user_id"])){
        setcookie("game_id","",time()-3600,"/");
        require_once("scriptphp/connexion.php");
        $rq=$pdo->prepare("select username,profile_image from users where(md5(id)=?) limit 1;");
        $rq->setFetchMode(PDO::FETCH_ASSOC);
        $rq->execute(array($_SESSION["user_id"]));
        $profile=$rq->fetchAll();
        $profile=$profile[0];
        if(isset($_SESSION["game_id"])){
            unset($_SESSION["game_id"]);
        }
    }
    else{
        header("location: index.php");
        exit();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/background.css">
    <link rel="stylesheet" href="style/font.css">
    <link rel="stylesheet" href="style/homepage.css">
    <link rel="stylesheet" href="assets/icons/style.css">
    <script defer src="javascript/homepage.js" type="module"></script>
    <script defer src="javascript/invite.js"></script>
    <title>Home</title>
</head>
<body>
    <div id="background">
    </div>
    <header>
        <div id="profile">
            <div id="profile_image" style="background-image:url('users_profile/<?php echo $profile["profile_image"]?>')"></div>
            <div id="profile_username"><?php echo $profile["username"]?></div>
        </div>
        <nav>
            <a href="offline.php" class="nav_element">Play offline</a>
            <a class="nav_element">Edit profile</a>
        </nav>
    </header>
    <div id="window">
        <div id="users_container">
            <div id="list_players">List of players</div>
            <div id="users">            
            </div>
        </div>
        <div id="chat">
            <div id="messages">
            </div>
            <div id="input_container">
                <input id="chat_input" type="text" name="chat_input">
                <div id="send">
                    <span class="icon-paper-plane"></span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
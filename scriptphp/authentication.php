<?php
    session_start();
    function unique_username($username,$pdo){
        $rq=$pdo->prepare("select * from users where (username=?) limit 1;");
        $rq->execute(array($username));
        $user=$rq->fetchAll();
        return !sizeof($user);
    }
    require_once("connexion.php");
    if(unique_username($_POST["username"],$pdo)){
        require_once("compression.php");
        compress_image($_FILES["image"]["tmp_name"],"../users_profile/".$_FILES["image"]["name"],50);
        $rq=$pdo->prepare("insert into users(username,profile_image,status) values(?,?,?)");
        $rq->execute(array($_POST["username"],$_FILES["image"]["name"],"En ligne"));
        $user_rq=$pdo->prepare("select id from users where(username=?) limit 1;");
        $user_rq->setFetchMode(PDO::FETCH_ASSOC);
        $user_rq->execute(array($_POST["username"]));
        $user_id=$user_rq->fetchAll();
        $_SESSION["user_id"]=md5($user_id[0]["id"]);
    }
    else{
        echo '{"error":"This username is already used"}';
    }
?>
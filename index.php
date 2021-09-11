<?php
    session_start();
    if(isset($_SESSION["user_id"])){
        header("location:homepage.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/background.css" />
    <link rel="stylesheet" href="style/page_one.css" />
    <link rel="stylesheet" href="style/font.css" />
    <link rel="shortcut icon" type="image/x-icon" href="Icons/logo.png"/>
    <script defer src="javascript/page_one.js" type="module"></script>
    <title>Tic Tac Toe</title>
</head>
<body>
    <div id="background"></div>
    <div id="play_now" class="button_hover">Play now</div>
</body>
</html>
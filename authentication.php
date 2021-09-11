<?php
    session_start();
    if(isset($_SESSION["user_id"])){
        header("location: homepage.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/background.css" />
    <link rel="stylesheet" href="style/authentication.css" />
    <link rel="stylesheet" href="style/font.css" />
    <link rel="stylesheet" href="style/loading.css" />
    <script defer src="javascript/auth.js"></script>
    <title>Authentication</title>
</head>
<body>
    <div id="background"></div>
    <form name="fo" method="post">
        <label>Username:</label>
        <input type="text" name="username" class="input" placeholder="Enter a username">
        <div id="username_error" class="error"></div>
        <label>Profile image:</label>
        <input type="file" name="image">
        <div id="image_error" class="error error_image"></div>
        <div id="progress">
            <div id="fill"></div>
        </div>
        <input type="submit" name="submit" value="connect">
    </form>
</body>
</html>
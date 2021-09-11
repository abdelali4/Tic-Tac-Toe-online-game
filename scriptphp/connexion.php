<?php
    try{
        $pdo=new PDO("mysql:hostname=localhost;dbname=tictactoe","root","");
    }
    catch(PDOException $e){
        echo $e->getMessage();
    }
?>
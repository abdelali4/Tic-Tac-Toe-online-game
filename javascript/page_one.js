import {children_animation} from "./mouvement_animation.js";

document.querySelector("#play_now").onclick=function(){
    this.remove();
    document.body.insertAdjacentHTML("beforeend",
    `<div id="container">
        <a href="authentication.php" class="mode hover_effect">Online</a>
        <a href="offline.php" class="mode hover_effect">Offline</a>
    </div>`
    );
    children_animation(document.querySelectorAll(".mode"));
}
document.body.onload=versus_animation();
function versus_animation(){
    setTimeout(()=>{
        document.querySelectorAll(".player_container").forEach(container=>{
            container.style.transform="translate(0)";
        });
    },250);
    setTimeout(()=>{
        im_ready();
    },3250);
}
async function im_ready(){
    var data= await fetch("scriptphp/player_ready.php");
    start_match();
}
async function start_match(){
    var data=await fetch("scriptphp/start_match.php");
    var first_player=await data.json();
    my_turn=first_player.play_first;
}
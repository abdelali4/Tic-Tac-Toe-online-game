
async function list_users(){
    var data=await fetch("scriptphp/list_users.php");
    var users=await data.json();
    var users_container=document.querySelector("#users");
    users.forEach(user=>{
        users_container.insertAdjacentHTML("beforeend",
        list_user(user));
    });
}
async function send_invitation(){
    var data=new FormData();
    data.append("id",event.currentTarget.getAttribute("name"));
    var invite=await fetch("scriptphp/invite.php",
    {method:"POST",body:data});
    var invitation=await invite.json();
    send_invitation_listener(invitation.id);
}
async function send_invitation_listener(invitation_id){
    var data= new FormData();
    data.append("invitation_id",invitation_id);
    var result=await fetch("scriptphp/invitation_listener.php",
    {method:"POST",body:data});
    var invitation_result = await result.json();
    if(invitation_result.status!=null){
        if(invitation_result.status=="accepted"){
            window.location.href="game.php";
        }
        else{
            var invitation_container=document.createElement("div");
            invitation_container.setAttribute("id","invitation");
            invitation_container.insertAdjacentHTML("beforeend",
            `<div>
                <span class="invitation_transmitter">${invitation_result.user}</span> has declined your invitation
            </div>`);
            document.querySelector("#users_container").prepend(invitation_container);
            setTimeout(()=>{
                invitation_container.style.transform="scale(1)";
            },150);
            setTimeout(()=>{
                invitation_container.remove();
            },2000);
            return;
        }
    }
    else{
        setTimeout(()=>{
            send_invitation_listener(invitation_id);
        },1000);
    }
}
async function random_invitation_listener(){
    var data=await fetch("scriptphp/random_invitation.php");
    var invitation=await data.json();
    if(invitation.id!=null){
        var invitation_container=document.createElement("div");
        invitation_container.setAttribute("id","invitation");
        invitation_container.insertAdjacentHTML("beforeend",
        `<div>
            <span class="invitation_transmitter">${invitation.username}</span> invite you for a match 
            </div>
            <div id="buttons_container">
                <div class="accept_decline" name="accepted">Accept</div>
                <div class="accept_decline" name="declined">Decline</div>
        </div>`);
        document.querySelector("#users_container").prepend(invitation_container);
        invitation_container.addEventListener("click",()=>{
            accept_or_decline(event,invitation.id);
        });
        setTimeout(()=>{
            invitation_container.style.transform="scale(1)";
        },150);
    }
    else{
        setTimeout(()=>{random_invitation_listener()},1000);
    }
}
function list_user(user){
    return `<div class="user">
        <div class="user_image" style="background-image:url('users_profile/${user.profile_image}')"></div>
        <div class="username">${user.username}</div>
        <div class="user_status">${user.status}</div>
        <div class='invite' onclick='send_invitation()' name='${user.id}' >Invite</div>
    </div>`;
}
async function accept_or_decline(e,invitation_id){
    target_name=e.target.getAttribute("name");
    if(target_name=="accepted" || target_name=="declined"){
        var data=new FormData();
        data.append("response",target_name);
        data.append("invitation_id",invitation_id);
        document.querySelector("#invitation").remove();
        var response=await fetch("scriptphp/accept_or_decline.php",
        {method:"POST",body:data});
        if(target_name=="accepted"){
            window.location.href="game.php";
        }
        else{
            setTimeout(()=>{random_invitation_listener()},1000);
        }
    }    
}
list_users();
random_invitation_listener();

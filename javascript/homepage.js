import {list_message,scroll_down_chat} from "./chat.js";


document.querySelector("#send").addEventListener("click",send_message);

async function send_message(){
    var input=document.querySelector("#chat_input");
    if(input.value == ""){
        return ;
    }
    else{
        var data=new FormData();
        data.append("message",input.value);
        var message= await fetch(
            "scriptphp/sendmessage.php",{
                method:"POST",
                body:data
            }
        );
        var responseText=await message.json();
        list_message({message:input.value,username:"Me",message_time:responseText.time},
        document.querySelector("#messages"));
        scroll_down_chat(document.querySelector("#messages"));
        input.value="";
    }
}

window.onkeydown=function(e){
    if(e.keyCode==13){
        send_message();
    }
}

async function list_chat(){
    var data=await fetch("scriptphp/list_chat_home.php");
    var messages=await data.json();
    if(messages.length){
        var last_time=messages[messages.length-1].message_time;
    }
    else{
        var last_time= 0;
    }
    var chat_container=document.querySelector("#messages");
    messages.forEach(msg=>{
        list_message(msg,chat_container);
    });
    scroll_down_chat(chat_container);
    setTimeout(
        ()=>{update_chat(last_time);}
        ,1000
    );
}
async function update_chat(last_time){
    var data=new FormData();
    var chat_container=document.querySelector("#messages");
    data.append("last_time",last_time);
    var update=await fetch("scriptphp/update_chat_home.php",
    {method:"POST",body:data});
    var messages= await update.json();
    if(messages.length){
        messages.forEach(msg=>{
            list_message(msg,chat_container);
        });
        scroll_down_chat(chat_container);
        last_time=messages[messages.length-1].message_time;
    }
    setTimeout(()=>{
        update_chat(last_time);
    },1000);
    
}

document.body.onload=list_chat();





 export function format_date(date){
    var time=new Date(date*1);   
    return `${time.getFullYear()}-${zero_before(time.getMonth()+1)}-${zero_before(time.getDay()+1)} | ${zero_before(time.getHours())}:${zero_before(time.getMinutes())}`;
}
export function zero_before(element){
    if(element<=9){
        return "0"+element;
    }
    else{
        return element;
    }
}

export function list_message(msg,chat_container){
    chat_container.insertAdjacentHTML("beforeend",
        `<div class="message">
         <span class="transmitter">${msg.username}: </span>
            ${msg.message}
            <span class="message_date">${format_date(msg.message_time*1000)}</span>
         </div>`);
}

export function scroll_down_chat(chat_container){
    setTimeout(
        ()=>{
            chat_container.scrollTo(0,chat_container.scrollHeight);
        },100
    );
}


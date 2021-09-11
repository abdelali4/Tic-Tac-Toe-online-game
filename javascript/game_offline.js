
var dimension=0;
var vs_computer=true;
document.body.onload=function(){
    listing_opponent(); 
}
function children_animation(children){
    var j=1;
    children.forEach(child=>{
        setTimeout(
            ()=>{
                child.style.transform="translate(0)";
            }
            ,j*150
        );
        j++;
    });
}
function listing_opponent(){
    var j=1;
    document.body.insertAdjacentHTML("beforeend",`
    <div id="modes">
        <div class="mode" id="vs_human">
            <img src="assets/images/human_vs_human.png" class="opponent_image"/>
        </div>
        <div class="mode" id="vs_ai">
            <img src="assets/images/human_vs_ai.png" class="opponent_image"/>
        </div>
    </div>`);
    document.querySelector("#vs_human").addEventListener("click",
    (e)=>{
        vs_computer=false;
        listing_modes();
    });
    document.querySelector("#vs_ai").addEventListener("click",
    (e)=>{
        vs_computer=true;
        listing_modes();
    });
    children_animation(document.querySelectorAll(".mode"));
}
function listing_modes(){
    var j=1;
    document.querySelector("#modes").remove();
    document.body.insertAdjacentHTML("beforeend",`
    <div id="modes">
        <div class="mode" id="mode_3">
            <img src="assets/images/3_3.png" class="mode_image"/>
        </div>
        <div class="mode" id="mode_5">
            <img src="assets/images/5_5.png" class="mode_image"/>
        </div>
    </div>
    `);
    document.querySelector("#modes").addEventListener("click",
    (e)=>{
        select_mode(e);
    });
    children_animation(document.querySelectorAll(".mode"));
}
function select_mode(e){
    if(e.target.className=="mode"){
        var a=(e.target.getAttribute("id")).split("_");
        dimension=a[1];
    }
    else if(e.target.className=="mode_image"){
        var a=(e.target.parentElement.getAttribute("id")).split("_");
        dimension=a[1];
    }
    if (dimension!=0){
        nbr_ofelement=0;
        play_x_turn=true;
        X_coordonates=[];
        O_coordonates=[];
        document.querySelector("#modes").remove();
        nbr_ofelement=dimension;
        if(dimension==5){
            nbr_ofelement=4;
        }
        draw_board();
    }
}
function draw_board(){
    document.body.insertAdjacentHTML("beforeend","<div id='window'></div>");
    board=document.querySelector("#window");
    board.style.gridTemplateColumns=`repeat(${dimension},auto)`;
    for(var i=1;i<=dimension;i++){
        for(var j=1;j<=dimension;j++){
            square=document.createElement("div");
            square.classList.add("square");
            if(i==dimension){
                square.classList.add("bottom");
            }
            if(j==1){
                square.classList.add("left");
            }
            square.style.gridColumn=`${j}/${j+1}`;
            square.style.gridRow=`${i}/${i+1}`;
            square.setAttribute("id",`${j-1}_${i-1}`);
            board.append(square);
        }
    }
    document.body.append(board);
    setTimeout(()=>{
        board.style.transform="translate(0) rotateZ(720deg)";
    },10);
    if(vs_computer){
        board.onclick=function(e){
            if(play_x_turn){
                play_turn(e.target);
            }
        }
    }
    else{
        board.onclick=function(e){
            play_turn(e.target);
        }
    }
}
function computer_turn(){
    var board= document.querySelector("#window");
    play_turn(easy_computer());
}
function easy_computer(){
    var squares=document.querySelectorAll(".square");
    var empty_squares=[];
    squares.forEach(square=>{
        if(!square.className.includes("used")){
            empty_squares.push(square);
        }
    });
    var random_nbr=Math.round(Math.random()*(empty_squares.length-1));
    return empty_squares[random_nbr];
}
function verify_ifthereis_awinner(coordonates,player){
    var horizontal=new Map();
    var vertical=new Map();
    var diagonal=new Map();
    for(var i=0;i<coordonates.length;i++){
        a=coordonates[i];
        var value=horizontal.get(`${a.y}`);
        if(value==null){
            horizontal.set(`${a.y}`,1);
        }
        else{
            horizontal.set(`${a.y}`,value+1);
        }
        var value=vertical.get(`${a.x}`);
        if(value==null){
            vertical.set(`${a.x}`,1);
        }
        else{
            vertical.set(`${a.x}`,value+1);
        }
        if(a.x==a.y ||(dimension-a.x)-1==a.y){
            if(a.x==a.y){
                var value=diagonal.get("diagonal_1");
                if(value!=null){
                    diagonal.set("diagonal_1",value+1);
                }
                else{
                    diagonal.set("diagonal_1",1);
                }
                if(a.x==Math.floor(dimension/2)){
                    var value=diagonal.get("diagonal_2");
                    if(value!=null){
                        diagonal.set("diagonal_2",value+1);
                    }
                    else{
                        diagonal.set("diagonal_2",1);
                    }
                }
            }    
            else{
                var value=diagonal.get("diagonal_2");
                if(value!=null){
                    diagonal.set("diagonal_2",value+1);
                }
                else{
                    diagonal.set("diagonal_2",1);
                }
            }
        } 
    }
    for(var j=0;j<dimension;j++){
        var value=horizontal.get(`${j}`);
        if(value>=nbr_ofelement){
            if(dimension>3){
                var verify=true;
                var array=[];
                for(var k=0;k<coordonates.length;k++){
                    var c = coordonates[k];
                    if(c.y==j){
                        array.push((c.x)*1);
                    }
                }
                verify=verify_array(array);
                if(verify){
                    return {direction:"horizontal",y:j,name:player};
                }
            }
            else{
                return {direction:"horizontal",y:j,name:player};
            }
        }
        var value=vertical.get(`${j}`);
        if(value>=nbr_ofelement){
            if(dimension>3){
                var verify=true;
                var array=[];
                for(var k=0;k<coordonates.length;k++){
                    var c = coordonates[k];
                    if(c.x==j){
                        array.push((c.y)*1);
                    }
                }
                verify=verify_array(array);
                if(verify){
                    return {direction:"vertical",x:j,name:player};
                }
            }
            else{
                return {direction:"vertical",x:j,name:player};
            }
        }
    }
    if(diagonal.get("diagonal_1")>=nbr_ofelement){
        if(dimension>3){
            var verify=true;
            var array=[];
            for(var k=0;k<coordonates.length;k++){
                var c = coordonates[k];
                if(c.x==c.y){
                    array.push((c.y)*1);
                }
            }
            verify=verify_array(array);
            if(verify){
                return {direction:"diagonal",diagonal_nbr:1,name:player};
            }
        }
        else{
            return {direction:"diagonal",diagonal_nbr:1,name:player};
        }
    }
    if(diagonal.get("diagonal_2")>=nbr_ofelement){
        if(dimension>3){
            var verify=true;
            var array=[];
            for(var k=0;k<coordonates.length;k++){
                var c = coordonates[k];
                if(dimension-c.x-1==c.y){
                    array.push((c.y)*1);
                }
            }
            verify=verify_array(array);
            if(verify){
                return {direction:"diagonal",diagonal_nbr:2,name:player};
            }
        }
        else{
            return {direction:"diagonal",diagonal_nbr:2,name:player};
        }
    }
    return false;
}
function winning(winner){
    document.querySelector("#window").onclick=function(){};
    if(winner!="none"){
        var squares=document.querySelectorAll(".square");
        var nbr=1;
        squares.forEach(square=>{
            var coordonates=square.getAttribute("id").split("_");
            switch(winner.direction){
                case "horizontal":{
                    if(coordonates[1]==winner.y){
                        if(winner.name=="X"){
                            var x_o=square.querySelector(".icon-x");
                        }
                        else if(winner.name=="O"){
                            var x_o=square.querySelector(".icon-circle-o");
                        }
                        if(x_o!=null){
                            if(nbr>nbr_ofelement){
                                break;
                            }
                            square.classList.add("winner_square");           
                            nbr++;
                        }
                    }
                    break;
                }
                case "vertical":{
                    if(coordonates[0]==winner.x){
                        if(winner.name=="X"){
                            var x_o=square.querySelector(".icon-x");
                        }
                        else if(winner.name=="O"){
                            var x_o=square.querySelector(".icon-circle-o");
                        }
                        if(x_o!=null){
                            if(nbr>nbr_ofelement){
                                break;
                            }
                            square.classList.add("winner_square");  
                            nbr++;
                        }
                    }
                    break;
                }
                case "diagonal":{
                    if(winner.name=="X"){
                        var x_o=square.querySelector(".icon-x");
                    }
                    else if(winner.name=="O"){
                        var x_o=square.querySelector(".icon-circle-o");
                    }
                    if(x_o!=null){
                        if(winner.diagonal_nbr==1){
                            if(coordonates[0]==coordonates[1]){ 
                                if(nbr>nbr_ofelement){
                                    break;
                                }
                                square.classList.add("winner_square"); 
                                nbr++;
                            }
                        }
                        else{
                            if((dimension-coordonates[0])-1==coordonates[1]){
                                if(nbr>nbr_ofelement){
                                    break;
                                }
                                square.classList.add("winner_square");
                                nbr++;
                            }
                        }
                    }
                    break;
                }
                default:{
                    break;
                }          
            }
            });
    }
    setTimeout(()=>{play_again(winner)},750);
}
function play_turn(element){
    if(element.className.includes("square") && !element.className.includes("used")){
        element.classList.add("used");    
        var span=document.createElement('span');
        var coordonates=element.getAttribute("id").split("_");
        if(play_x_turn){
            span.className="icon-x icon";
            X_coordonates.push({x:coordonates[0],y:coordonates[1]});
        }
        else{
            span.className="icon-circle-o icon";
            O_coordonates.push({x:coordonates[0],y:coordonates[1]});
        }
        element.append(span);
        scale=0;
        scale_animation(span);
        if(play_x_turn){
            var winner=verify_ifthereis_awinner(X_coordonates,"X");
            if(winner!=false){
                winning(winner);
                return true;
            }            
        }
        else{
            var winner=verify_ifthereis_awinner(O_coordonates,"O");
            if(winner!=false){
                winning(winner);
                play_x_turn=true;
                return true;
            }
        }
        nbr_icons=document.querySelectorAll(".icon").length;
        if(nbr_icons==Math.pow(dimension,2)){
            winning("none");
            return ;
        }
        play_x_turn=!play_x_turn;
        if(vs_computer&&!play_x_turn){
            setTimeout(()=>{
                computer_turn();
            },300);
        }
    }
}
function scale_animation(span){
    t=setTimeout(()=>{
        scale+=0.1;
        scale_animation(span);
    },20);
    span.style.transform=`scale(${scale})`;
    if(scale>=1){
        clearTimeout(t);
        return;
    }
}
function play_again(winner){
    if(winner!="none"){
        play_again_container(`The winner is Player "${winner.name}"`)
    }
    else{
        play_again_container(`No winner for this round`);
    }
    div.querySelectorAll(".button")[0].onclick=function(){
        div.style.transform="scale(0)";
        setTimeout(()=>{
            div.remove();
            document.querySelector("#window").remove();
            play_x_turn=true;
            X_coordonates=[];
            O_coordonates=[];
            draw_board();
        },250);

    }
    div.querySelectorAll(".button")[1].onclick=function(){
        div.style.transform="scale(0)";
        setTimeout(()=>{
            div.remove();
            document.querySelector("#window").remove();
            listing_opponent();
        },250);
    }
}
function play_again_container(text){
    document.body.insertAdjacentHTML("beforeend",
    `<div id='play_again'>
        <div id='play_again_text'>${text}</div>
        <div id='container'>
            <div class='button button_hover'>Play again</div>
            <div class='button button_hover'>Change mode</div>
        </div>
    </div>`);
    div=document.querySelector("#play_again");
    setTimeout(
        ()=>{
            div.style.transform="scale(1)";
        },100
    );
}
function verify_array(array){
    var verified = true;
    array=sort_array(array);
    var cte= array[0];
    for(var h=0;h<array.length;h++){
        if(array[h]!=cte+h){
            verified=false;
            break;
        }
    }
    if(verified){
        return true;
    }
    else{
        return false;
    }
}
function sort_array(array){
    for(var m=0;m<array.length;m++){
        var index=m;
        for(var n=m;n<array.length;n++){
            if(array[n]<array[index]){
                index=n;
            }
        }
        var c= array[index];
        array[index]=array[m];
        array[m]=c;
    }
    return array;
}
function set_winning_combinaison(){
    winning_combinaison=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    if(0){
        return
    }
    else{
        tab=[];
        winning_combinaison.forEach(combinaison=>{
            var comb_1=combinaison;
            comb_1.push(combinaison[combinaison.length-1]+combinaison[1]-combinaison[0]);
            comb_2=[];
            comb_1.forEach(c=>{
                comb_2.push(c+combinaison[1]-combinaison[0]);
            })
            tab.push(comb_1,comb_2);
        });
    }
    winning_combinaison=tab;
}
set_winning_combinaison();
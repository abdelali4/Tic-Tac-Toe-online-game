
document.fo.onsubmit=function(e){
    e.preventDefault();
    var username_input=this.username;
    var image=this.image.files[0];
    if(form_validity(username_input.value,image)){
        try{
            xhr=new XMLHttpRequest();
        }
        catch(e){
            xhr=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open("POST","scriptphp/authentication.php",true);
        var data=new FormData();
        data.append("username",username_input.value);
        data.append("image",image);
        var progress=document.querySelector("#progress");
        progress.style.display="block";
        var fill=document.querySelector("#fill");
        xhr.upload.onprogress=function(e){
            if(e.lengthComputable){
                fill.style.width=Math.round((e.loaded/e.total)*100)+"%";
            }
            else{
                fill.style.width="0%";
            }
        }
        xhr.send(data);
        xhr.onreadystatechange=function(){
            if(xhr.status=200 && xhr.readyState==4){
                if(xhr.responseText==""){
                    window.location.href="homepage.php";
                }
                else{
                    data=JSON.parse(xhr.responseText);
                    show_error("username",data.error);
                    progress.style.display="none";
                }
            }
        }
    }
}
function form_validity(username,image){
    var username_valid=username_validity(username);
    var image_valid=image_validity(image);
    return username_valid&&image_valid;
}
function show_error(input,error){
    input_error=document.getElementById(input+"_error");
    input_error.innerText=error;
    input_error.style.display="block";
}
function hide_error(input){
    document.getElementById(input+"_error").style.display="none";
}
function username_validity(username){
    if(username.length==0){
        show_error("username","Empty field");
        return false;
    }
    else if(username.length<3){
        show_error("username","The username must contains more than three caracteres");
        return false;
    }
    hide_error("username");
    return true;
}
function image_validity(image){
    regexp=new RegExp("\.(jpe?g$)|(png$)");
    if(image==null){
        show_error("image","Empty Field");
        return false;
    }
    else if(!regexp.test(image.name)){
        show_error("image","Invalid image(we provide only jpg,jpeg,png)");
        return false;
    }
    hide_error("image");
    return true;
}
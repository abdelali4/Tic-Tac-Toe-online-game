
export function parent_animation(parent){
    setTimeout(
        ()=>{
            parent.style.transform="translate(0)";
        }
        ,150
    );
}
export function children_animation(children){
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
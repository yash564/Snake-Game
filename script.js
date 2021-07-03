let element=document.querySelector(".button");
let win;


element.addEventListener("click",function(e){
    e.target.style.transform="scale(0.8)";
    win=window.open('game.html','_blank');
})
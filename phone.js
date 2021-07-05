let upButton=document.querySelector(".top-button");
let leftButton=document.querySelector(".left-button");
let rightButton=document.querySelector(".right-button");
let bottomButton=document.querySelector(".bottom-button");

let mq=window.matchMedia('(max-width:600px)');

mq.addEventListener("change",(e)=>{
  if(e.matches){
    console.log("hello");
    directions = { x: 0, y: 1 };
    moveSound.play();
    upButton.addEventListener("click",function(e){
      console.log("click");
      directions.x = 0;
      directions.y = -1;
    });
    leftButton.addEventListener("click",function(e){
      directions.x = -1;
      directions.y = 0;
    });
    rightButton.addEventListener("click",function(e){
      directions.x = 1;
      directions.y = 0;
    });
    bottomButton.addEventListener("click",function(e){
      directions.x = 0;
      directions.y = 1;
    });
  }
});
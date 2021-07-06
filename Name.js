let playButton = document.querySelector(".button");
let details=document.querySelector(".details");
let playerName = document.querySelector(".details input");
let playerN;

playerName.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    let value=e.target.value;
    localStorage.setItem("Player",value);
    details.style.display="none";
    playButton.classList.remove("hide");
  }
});

let player=localStorage.getItem("Player");
if(player==null){
    playerN="";
    localStorage.setItem("Player",playerN);
}else{
    playerN=JSON.stringify(player);
}

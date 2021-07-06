let exitButton = document.querySelector(".exit");
let board = document.querySelector(".background");
let scoreValue = document.querySelector(".scoreValue");
let popUpContainer = document.querySelector(".popupcontainer");


exitButton.addEventListener("click", function (e) {
  window.close();
});

let directions = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let score = 0;
let speed = 5;
let snakeArr = [{ x: 14, y: 15 }];
let lastTime = 0;
let foodObj = { x: 6, y: 7 };
let highscoreVal;

function main(ctime) {
  window.requestAnimationFrame(main);

  if ((ctime - lastTime) / 1000 < 1 / speed) {
    return;
  }

  lastTime = ctime;
  gameEngine();
}

function isCollide(snakeArr) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x == snakeArr[0].x && snakeArr[0].y == snakeArr[i].y) {
      return true;
    }
  }

  if (
    snakeArr[0].y <= 0 ||
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18
  ) {
    return true;
  } else {
    return false;
  }
}

function gameEngine() {
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    directions = { x: 0, y: 0 };
    alert("Game over. Press any key to play again!!");
    if (score > highscoreVal) {
      let HighScorePopUp = document.createElement("div");
      HighScorePopUp.classList.add("highscore-container");
      HighScorePopUp.innerHTML = `<div class="highscore">
                <div>Congratulations ${localStorage.getItem("Player")}!!</div>
                <div>You Beat The High Score</div>
                <div class="score">
                  <div>High Score:</div>
                  <div>${score}</div>
                </div>
                <div class="close">
                <button>Close</button>
                </div>
              </div>`;
      popUpContainer.appendChild(HighScorePopUp);
      let closeButton=HighScorePopUp.querySelector(".close");
      closeButton.addEventListener("click",function(e){
        popUpContainer.removeChild(HighScorePopUp);
      })
    }
    snakeArr = [{ x: 14, y: 15 }];
    score = 0;
    scoreValue.textContent = 0;
  }

  if (snakeArr[0].y == foodObj.y && snakeArr[0].x == foodObj.x) {
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + directions.x,
      y: snakeArr[0].y + directions.y,
    });
    score += 1;
    if (score > highscoreVal) {
      localStorage.setItem("HiScore", JSON.stringify(score));
    }
    scoreValue.textContent = score;
    let a = 2;
    let b = 16;
    foodObj = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += directions.x;
  snakeArr[0].y += directions.y;

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    let snake = document.createElement("div");
    snake.style.gridRowStart = e.y;
    snake.style.gridColumnStart = e.x;
    if (index == 0) {
      snake.classList.add("snake");
    }
    snake.classList.add("head");
    board.appendChild(snake);
  });

  let food = document.createElement("div");
  food.style.gridRowStart = foodObj.y;
  food.style.gridColumnStart = foodObj.x;
  food.classList.add("food");
  board.appendChild(food);
}

let highscore = localStorage.getItem("HiScore");
if (highscore == null) {
  highscoreVal = 0;
  localStorage.setItem("HiScore", JSON.stringify(highscoreVal));
} else {
  highscoreVal = JSON.parse(highscore);
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", function (e) {
  musicSound.play();
  directions = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      directions.x = 0;
      directions.y = -1;
      break;
    case "ArrowDown":
      directions.x = 0;
      directions.y = 1;
      break;
    case "ArrowRight":
      directions.x = 1;
      directions.y = 0;
      break;
    case "ArrowLeft":
      directions.x = -1;
      directions.y = 0;
      break;
    default:
      break;
  }
});

let upButton=document.querySelector(".top-button");
let leftButton=document.querySelector(".left-button");
let rightButton=document.querySelector(".right-button");
let bottomButton=document.querySelector(".bottom-button");

if(window.innerWidth<600){
    // directions = { x: 0, y: 1 };
    // moveSound.play();
    upButton.addEventListener("click",function(e){
      moveSound.play();
      musicSound.play();
      directions.x = 0;
      directions.y = -1;
    });
    leftButton.addEventListener("click",function(e){
      moveSound.play();
      musicSound.play();
      directions.x = -1;
      directions.y = 0;
    });
    rightButton.addEventListener("click",function(e){
      moveSound.play();
      musicSound.play();
      directions.x = 1;
      directions.y = 0;
    });
    bottomButton.addEventListener("click",function(e){
      moveSound.play();
      musicSound.play();
      directions.x = 0;
      directions.y = 1;
    });
}


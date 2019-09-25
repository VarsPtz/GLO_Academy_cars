const score = document.querySelector(".score"),
  bestScore = document.querySelector(".best-score"),
  start = document.querySelector(".start"),
  gameArea = document.querySelector(".gameArea"),
  audioTrack = document.querySelector("#audio__main__theme"),
  car = document.createElement("div"),
  menuLevels = document.querySelector(".menu-levels"),
  easyLevel = document.querySelector("#easy-level"),
  normalLevel = document.querySelector("#normal-level"),
  hardLevel = document.querySelector("#hard-level");
   
const divGEBC = document.getElementsByClassName('div');

car.classList.add('car');

window.onload = function() {
  audioTrack.play();
};

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
easyLevel.addEventListener('click', setLevelEasy);
normalLevel.addEventListener("click", setLevelNormal);
hardLevel.addEventListener("click", setLevelHard);


const keys = {
 'ArrowUp': false,
 'ArrowDown': false,
 'ArrowRight': false,
 'ArrowLeft': false
};

const setting = {
 start: false,
 score: 0,
 speed: 5,
 traffic: 5
};

function setLevelEasy() {  
  setting.speed = 10;
  newGame();
}

function setLevelNormal() {
  setting.speed = 15;
  newGame();
}

function setLevelHard() {
  setting.speed = 25;
  newGame();
}

function newGame() {
  menuLevels.classList.add("hide");
  start.classList.remove("hide");
  bestScore.classList.add("hide");
}



function getQuantityElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
 start.classList.add('hide');
 gameArea.innerHTML = '';
 for (let i = 0; i  < getQuantityElements(100); i++) {
   const line = document.createElement('div');
   line.classList.add('line');
   line.style.top = (i*100) + 'px';
   line.y = i * 100;
   gameArea.appendChild(line);
 }

 for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
   const enemy = document.createElement('div');
   let enemyImg = Math.floor(Math.random() * 2) + 1;
   enemy.classList.add('enemy');
   enemy.y = -100 * setting.traffic * (i + 1);
   enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px'; 
   enemy.style.top = enemy.y + 'px';
   enemy.style.background = `transparent url(../image/enemy${enemyImg}.png) center / cover no-repeat`;
   gameArea.appendChild(enemy);
 }
 setting.score = 0;
 setting.start = true; 
 gameArea.appendChild(car); 
 car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2 + "px";
 car.style.top = "auto";
 car.style.bottom = "50px";
 setting.x = car.offsetLeft;
 setting.y = car.offsetTop;
 audioTrack.src='../audio/riders.mp3';
 requestAnimationFrame(playGame); 
}

function playGame() { 
 if (setting.start) {
  setting.score += setting.speed; 
  score.innerText = "SCORE: " + setting.score;
  moveRoad();
  moveEnemy();
  if (keys.ArrowLeft && setting.x > 0) {
    setting.x -= setting.speed;
  }
  if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth - 10)) {
    setting.x += setting.speed;
  }
  if (keys.ArrowUp && setting.y > 10) {
    setting.y -= setting.speed;
  }
  if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight - 10)) {
    setting.y += setting.speed;
  }
  car.style.left = setting.x + 'px';
  car.style.top = setting.y + "px";
  requestAnimationFrame(playGame);
 }
}

function startRun(event) {
 event.preventDefault(); 
 if (keys.hasOwnProperty(event.key)) {
  keys[event.key] = true;
 }
}

function stopRun(event) {
 event.preventDefault();
 if (keys.hasOwnProperty(event.key)) {  
  keys[event.key] = false;
 }
}

function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(function(line) {
    line.y += setting.speed;
    line.style.top = line.y + 'px';

    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
}

function moveEnemy() {
  let enemy = document.querySelectorAll('.enemy');
  enemy.forEach(function(item) {
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();
    if (carRect.top <= enemyRect.bottom &&
      carRect.right >= enemyRect.left && 
      carRect.left <= enemyRect.right &&
      carRect.bottom >= enemyRect.top) {
        setting.start = false;
        menuLevels.classList.remove('hide');
        if (localStorage.getItem("bestResult") < setting.score) {
          localStorage.setItem("bestResult", setting.score);
          bestScore.innerHTML = `Congratulations! <br> You have the best score: ${setting.score}`;
          bestScore.classList.remove('hide');
        }
    }
    item.y += setting.speed / 2;
    item.style.top = item.y + 'px';
    if (item.y >= document.documentElement.clientHeight) {
      item.y = -100 * setting.traffic;
      item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    }
  });
}
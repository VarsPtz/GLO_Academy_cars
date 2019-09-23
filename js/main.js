const score = document.querySelectorAll(".score"),
  start = document.querySelector(".start"),
  gameArea = document.querySelector(".gameArea"),
  audioTrack = document.querySelector("#audio__main__theme"),
  car = document.createElement("div");
   
const divGEBC = document.getElementsByClassName('div');

car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
 'ArrowUp': false,
 'ArrowDown': false,
 'ArrowRight': false,
 'ArrowLeft': false
};

const setting = {
 start: false,
 score: 0,
 speed: 3
};


function startGame() {
 start.classList.add('hide');
 setting.start = true;
 gameArea.appendChild(car);
 audioTrack.src='../audio/riders.mp3';
 requestAnimationFrame(playGame); 
}

function playGame() { 
 if (setting.start) {
  requestAnimationFrame(playGame);
 }
}

function startRun(event) {
 event.preventDefault(); 
 if (keys.hasOwnProperty(event.key)) {
  console.log("startRun"); 
  keys[event.key] = true;
 }
}

function stopRun(event) {
 event.preventDefault();
 if (keys.hasOwnProperty(event.key)) {
  console.log("stoptRun");
  keys[event.key] = false;
 }
}
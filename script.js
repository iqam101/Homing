let player = document.getElementById("player");
let missile = document.getElementById("missile");
let obstacle = document.getElementById("obstacle");
let explosion = document.getElementById("explosion");
let gameMessage = document.getElementById("game-message");
let replayButton = document.getElementById("replay-button");

let playerX = 280;
let missileX = 280;
let moveDirection = 0;
let playerSpeed = 4;
let obstacleSpeed = 2;
let missileFollowDelay = 0.05;
let gameOver = false;

function movePlayer() {
  playerX += moveDirection * playerSpeed;
  playerX = Math.max(0, Math.min(560, playerX));
  player.style.left = playerX + "px";
}

function moveMissile() {
  missileX += (playerX - missileX) * missileFollowDelay;
  missile.style.left = missileX + "px";
}

function moveObstacle() {
  let obstacleTop = parseInt(obstacle.style.top || "-50");
  obstacleTop += obstacleSpeed;

  if (obstacleTop > 300) {
    obstacleTop = -50;
    let randomX = Math.floor(Math.random() * 560);
    obstacle.style.left = randomX + "px";
  }

  obstacle.style.top = obstacleTop + "px";
  checkCollision(obstacleTop);
}

function checkCollision(obstacleTop) {
  if (obstacleTop > 140 && obstacleTop < 220) {
    let playerLeft = playerX;
    let playerRight = playerX + 40;
    let obstacleLeft = parseInt(obstacle.style.left);
    let obstacleRight = obstacleLeft + 40;

    if (playerLeft < obstacleRight && playerRight > obstacleLeft) {
      gameOver = true;

      // Show explosion
      explosion.style.display = "block";
      explosion.style.left = playerX + "px";
      explosion.style.top = "160px";

      player.style.display = "none";
      missile.style.display = "none";
      obstacle.style.display = "none";

      

      // Auto-restart after 2 seconds
      setTimeout(() => {
        startGame();
      }, 1000);
    }
  }
}

function gameLoop() {
  if (!gameOver) {
    movePlayer();
    moveMissile();
    moveObstacle();

    requestAnimationFrame(gameLoop);
  }
}

function startGame() {
  playerX = 280;
  missileX = 280;
  gameOver = false;
  replayButton.style.display = "none";


  player.style.display = "block";
  missile.style.display = "block";
  obstacle.style.display = "block";
  explosion.style.display = "none";

  player.style.left = playerX + "px";
  missile.style.left = missileX + "px";
  obstacle.style.top = "-50px";
  obstacle.style.left = "100px";

  gameLoop();
}

function handleKeyDown(e) {
  if (e.key === "ArrowLeft") moveDirection = -1;
  if (e.key === "ArrowRight") moveDirection = 1;
}

function handleKeyUp(e) {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") moveDirection = 0;
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

startGame();

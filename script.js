const canvas = document.querySelector("canvas");
const menu = document.getElementById("menu");
const scoreElement = document.getElementById("score");
const text = document.getElementById("text");
const gameOverText = document.getElementById("game-over");
const c = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 940;

const gravity = 0.5;
let score = 0;
let speed = 1;
let xspeed = 0.3;
let platforms = [];
let gameStarted = false;
let canJump = true;

const startGame = () => {
  speed = 1;
  xspeed = 0.3;
  score = 0;
  background.position.y = 0;
  gameStarted = true;
  menu.style.display = "none";
  text.innerText = 'Press "space" to reset';
  createPlatforms();
  animate();
};

const gameOver = () => {
  gameStarted = false;
  removePlatforms();
  menu.style.display = "block";
  gameOverText.style.display = "block";
};

const checkGameOver = () => {
  if (
    score > 1 &&
    player.position.y + player.height + player.velocity.y > canvas.height
  ) {
    gameOver();
  }
};

const player = new Player({
  position: {
    x: 0,
    y: canvas.height - 100,
  },
  imageSrc: "./assets/player.png",
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const createPlatforms = () => {
  const platformGap = 188;
  const platformCount = 4;
  for (let i = 0; i <= platformCount; i++) {
    const platformY = i * platformGap;
    const platform = new Platform({
      position: {
        x: Math.min(Math.random() * canvas.width, canvas.width / 4),
        y: platformY,
      },
      move: Math.random() > 0.5,
      moveRight: Math.random() > 0.5,
      imageSrc: "./assets/platform.png",
    });
    platforms.push(platform);
  }
};

const removePlatforms = () => {
  platforms = [];
};

const background = new Background({
  position: {
    x: 0,
    y: canvas.height * 8,
  },
  imageSrc: "./assets/gamebackground.png",
});

const animate = () => {
  if (gameStarted) {
    window.requestAnimationFrame(animate);
    background.update();
    platforms.forEach((platform) => platform.update());
    player.update();
    player.velocity.x = 0;
    scoreElement.innerText = `Score ${score}`;
    if (keys.d.pressed) {
      player.velocity.x = 5;
    } else if (keys.a.pressed) {
      player.velocity.x = -5;
    }
    switch (score) {
      case 3:
        speed = 2;
        xspeed = 0.3;
        break;
      case 65:
        speed = 2.2;
        xspeed = 0.7;
        break;
      case 235:
        speed = 2.5;
        xspeed = 0.8;
        break;
      case 440:
        speed = 3;
        xspeed = 1;
        break;
    }
    checkGameOver();
  }
};

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      if (canJump) {
        player.velocity.y = -14;
        canJump = false;
      }
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
  }
});
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
window.addEventListener("keydown", (e) => {
  if (!gameStarted && e.key === " ") {
    startGame();
  }
});

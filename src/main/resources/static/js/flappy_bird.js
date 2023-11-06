const canvas = document.getElementById('canvas');
screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;

const ctx = canvas.getContext('2d');
const img = new Image();
img.src = "/images/game/flappy-bird-set_7.png";

var gameFont = new FontFace('Unbounded', 'url(fonts/Unbounded-Medium.ttf)');
gameFont.load().then(function(font){
    document.fonts.add(font);
    console.log('Font Unbounded was loaded');
});

const coinImg = new Image();
coinImg.src = "/images/game/coin.png";

// general settings
let gamePlaying = false;
const gravity = 0.3;
const speed = 1.2;
const size = [54, 36];
const sizeKoef = 1.5;
const resize = [size[0] * sizeKoef, size[1] * sizeKoef];
const jump = -8.5;
const cTenth = (canvas.width / 10);

let index = 0,
    bestScore = 0,
    flight,
    flyHeight,
    currentScore,
    pipe,
    coinFlag,
    currentSpeed;

// pipe settings
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth;

const coinSize = 40;
const coinLocX = () => Math.random() * coinSize;
const coinLocY = () => Math.random() * canvas.height/2 + canvas.height/4;


const setup = () => {
  currentSpeed = speed;
  currentScore = 0;
  coinFlag = false;
  flight = jump;

  // set initial flyHeight (middle of screen - size of the bird)
  flyHeight = (canvas.height / 2) - (resize[1] / 2);

  // setup first 3 pipes
  pipes = Array(3).fill().map((a, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]);
  coins = Array(3).fill().map((a, i) => [canvas.width + pipeWidth + pipeGap/2 - coinSize/2 + (i * (pipeGap + pipeWidth)), coinLocY()]);
}

const render = () => {
  // make the pipe and bird moving
  index++;

  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background first part
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
  // background second part
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -(index * (speed / 2)) % canvas.width, 0, canvas.width, canvas.height);

  // pipe display
  if (gamePlaying){
    pipes.map(pipe => {
      // pipe moving
      pipe[0] -= currentSpeed;

      // top pipe
      ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
      // bottom pipe
      ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

      // give 1 point & create new pipe
      if(pipe[0] <= -pipeWidth){
        currentScore++;
        currentSpeed += 0.1;
        // check if it's the best score
        bestScore = Math.max(bestScore, currentScore);

        // remove & create new pipe
        pipes = [...pipes.slice(1), [pipes[pipes.length-1][0] + pipeGap + pipeWidth, pipeLoc()]];
        console.log(pipes);
      }

      // if hit the pipe, end
      if ([
        pipe[0] <= cTenth + resize[0],
        pipe[0] + pipeWidth >= cTenth,
        pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + resize[1]
      ].every(elem => elem)) {
        gamePlaying = false;
        setup();
      }
    })
  }

  // draw coins
  if (gamePlaying) {
    coins.map(coin => {
      coin[0] -= currentSpeed;
      ctx.drawImage(coinImg, coin[0], coin[1], coinSize, coinSize);
      if ([
        cTenth + resize[0] >= coin[0],
        cTenth <= coin[0] + coinSize,
        coin[1] + coinSize >= flyHeight,
        coin[1] <= flyHeight + resize[1],
        !coinFlag
        ].every(elem => elem)) {
          currentScore++;
          coins = [...coins.slice(1), [coins[coins.length-1][0] + pipeGap + pipeWidth, coinLocY()]];
          bestScore = Math.max(bestScore, currentScore);
          console.log(coins);
        }
      if (coin[0] + coinSize < 0) {
        coins = [...coins.slice(1), [coins[coins.length-1][0] + pipeGap + pipeWidth, coinLocY()]];
      }
    })
  }

  // draw bird
  if (gamePlaying) {
    ctx.drawImage(img, 432, Math.floor((index % 108) / 36) * size[1], ...size, cTenth, flyHeight, ...resize);
    flight += gravity;
    flyHeight = Math.min(flyHeight + flight, canvas.height - resize[1]);
  } else {
    ctx.drawImage(img, 432, Math.floor((index % 108) / 36) * size[1], ...size, ((canvas.width / 2) - resize[0] / 2), flyHeight, ...resize);
    flyHeight = (canvas.height / 2) - (resize[1] / 2);
    ctx.font = "30px Unbounded";
    ctx.fillStyle = 'white';
    ctx.fillText(`Best score : ${bestScore}`, 85, 245);
    ctx.fillText('Click to play', 90, 535);
  }

  document.getElementById('bestScore').innerHTML = `Best : ${bestScore}`;
  document.getElementById('currentScore').innerHTML = `Current : ${currentScore}`;

  // tell the browser to perform anim
  window.requestAnimationFrame(render);
}

// launch setup
setup();
img.onload = render;

// start game
document.addEventListener('click', () => gamePlaying = true);
window.onclick = () => flight = jump;
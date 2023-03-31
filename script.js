let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

const gap = 90;

bird.src = 'img/bird.png';
bg.src = 'img/bg.png';
fg.src = 'img/fg.png';
pipeUp.src = 'img/pipeUp.png';
pipeBottom.src = 'img/pipeBottom.png';

//press button
document.addEventListener('keydown', moveUp);
function moveUp() {
  yPos -= 20;
}

//bird position
let xPos = 10;
let yPos = 150;
let grav = 1;

function draw() {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(pipeUp, 100, 0);
  ctx.drawImage(pipeBottom, 100, 0 + pipeUp.height + gap);
  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;
  requestAnimationFrame(draw);
}

pipeBottom.onload = draw;

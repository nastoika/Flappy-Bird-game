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
  yPos -= 25;
}

//create blocks
let pipe = [];
pipe[0] = {
  x: canvas.width,
  y: 0,
};

//bird position
let xPos = 10;
let yPos = 150;
let grav = 1.5;
let score = 0;

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    //create new pipes
    if (pipe[i].x == 90) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    //touch traking
    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeUp.width &&
        (yPos <= pipe[i].y + pipeUp.height ||
          yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      yPos + bird.height >= canvas.height - fg.height
    ) {
      location.reload();
    }

    if (pipe[i].x == 5) {
      score++;
    }
  }

  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = '#000';
  ctx.font = '24px Verdana';
  ctx.fillText('Score:' + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

pipeBottom.onload = draw;

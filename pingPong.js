//variables
//ball
let xBall = 300;
let yBall = 200;
let diameter = 15;
let radius = diameter / 2;

//speed ball
let speedBallX = 6;
let speedBallY = 6;


//racket player 01
let xRacket = 585;
let yRacket = 150;
let wRacket = 10;
let hRacket = 90;

//racket computador
let xRacketPC = 5;
let yRacketPC = 150;
let wRacketPC = 10;
let hRacketPC = 90;
let speedYPC

let collided = false;
let chanceError = 0;

//score
let pointsP1 = 0;
let pointsPC = 0;

//song
let shot;
let point;
let music;
/////////////////////////////////////////////////////////

//execute
function setup() {
  createCanvas(600, 400);
  music.loop();
}

//run the game
function draw() {
  background(65);
  showTheBall();
  moveTheBall();
  verifyTheBorder();
  showTheRacket(xRacket, yRacket);
  showTheRacket(xRacketPC, yRacketPC);
  moveRacket();
  //verifyCollision();
  verifyCollisionLibrary(xRacket, yRacket);
  verifyCollisionLibrary(xRacketPC, yRacketPC);
  moveRacketPC();
  score();
  checkScore();
  //preload();
  waterMark();
  decor()
  mute()
}

//moves ball
function showTheBall() {
  circle(xBall, yBall, diameter);
}

function moveTheBall() {
  xBall += speedBallX;
  yBall += speedBallY;
}

function verifyTheBorder() {
  if (xBall + radius > width || xBall - radius < 0) {
    speedBallX *= -1;
  }

  if (yBall + radius > height || yBall - radius < 0) {
    speedBallY *= -1;
  }
}

//racket player 01
function showTheRacket(x, y) {
  rect(x, y, wRacket, hRacket);
}

function moveRacket() {
  if (keyIsDown(UP_ARROW)) {
    yRacket -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRacket += 10;
  }
}

//collision ball with racket
function verifyCollision() {
  let cond01 = xBall - radius < xRacket + wRacket;
  let cond02 = yBall - radius < yRacket + hRacket;
  let cond03 = yBall + radius > yRacket;

  if (cond01 && cond02 && cond03) {
    speedBallX *= -1;
  }
}

//collision library p5
function verifyCollisionLibrary(x, y) {
  collided = collideRectCircle(x, y, wRacket, hRacket, xBall, yBall, radius);
  if (collided) {
    speedBallX *= -1;
    shot.play();
  }
}

//racket computador
function moveRacketPC() {
  speedYPC = (yBall - yRacketPC - wRacket) / 2 - 30;
  yRacketPC += speedYPC + chanceError;
  calculateChanceError()
}

function calculateChanceError() {
  if (pointsPC >= pointsP1) {
    chanceError += 1
    if (chanceError >= 39) {
      chanceError = 40
    }
  } else {
    chanceError -= 1
    if (chanceError <= 35) {
      chanceError = 35
    }
  }
}

//score
function score() {
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(250, 128, 114);
  rect(200, 10, 40, 20);
  fill(255);
  text(pointsPC, 220, 26);
  fill(250, 128, 114);
  rect(400, 10, 40, 20);
  fill(255);
  text(pointsP1, 420, 26);
}

function checkScore() {
  if (xBall > 590) {
    pointsPC += 1;
    point.play();
  } else if (xBall < 10) {
    pointsP1 += 1;
    point.play();
  }
}

//song
function preload() {
  shot = loadSound("shot.mp3");
  point = loadSound("point.mp3");
  music = loadSound("music.mp3");
}

// water mark
function waterMark() {
  noStroke();
  textSize(9);
  textFont('Times New Roman');
  text('Dev Camila', 570, 10);
}

//decor 
function decor() {
  rect(300, 0, 3, 400)
}
  
//mute the songs
function mute() {
    if(keyCode === LEFT_ARROW) {
      music.stop();
      shot.stop();
      point.stop();   
    }
  }
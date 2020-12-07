// const backgroundColor = [230,220,190];
const myCanvas = { width: 1340, height: 600};
const backgroundColor = [24, 25, 30];
const lineColor = [24, 25, 30];
const activeLineColor = [183, 135, 39];
const lineWidth = 3;
const activelineWidth = 9;
const sounds = Array.from({ length: 6 });

const ball1 = {
    x: 650,
    y: 300,
    size: 100,
    speed: 1,
    fillColor: [0,50,98],
    strokeColor: [183, 135, 39],
    ballStrokeWeight: 2,
    rightSound: sounds[0],
    leftSound: sounds[1],
    soundLength: 2000,
} 

const ball2 = {
    x: 650,
    y: 100,
    size: 50,
    speed: 2,
    fillColor: [0,50,98],
    strokeColor: [183, 135, 39],
    ballStrokeWeight: 2,
    rightSound: sounds[2],
    leftSound: sounds[3],
    soundLength: 1000,
} 

const ball3 = {
    x: 650,
    y: 200,
    size: 80,
    speed: 2,
    fillColor: [0,50,98],
    strokeColor: [183, 135, 39],
    ballStrokeWeight: 2,
    rightSound: sounds[4],
    leftSound: sounds[5],
    soundLength: 500,
} 

const leftEdge = {
    x1: 364,
    y1: 0,
    x2: 300,
    y2: 70,
    color: lineColor,
    width: lineWidth,

}

const rightEdge = {
    x1: 1000,
    y1: 0,
    x2: 300,
    y2: 10,
    color: lineColor,
    width: lineWidth,
}


const balls = [ball1, ball2, ball3];



function preload(){

    sounds.forEach((sound, i) => {
        sounds[i] = loadSound(`sounds/${i}.mp3`)
    })

    console.log(sounds);

    ball1.rightSound = sounds[0];
    ball1.leftSound = sounds[1];
    ball2.rightSound = sounds[2];
    ball2.leftSound = sounds[3];
    ball3.rightSound = sounds[4];
    ball3.leftSound = sounds[5];

    // for(let i = 0; i < sounds.length; i++){
    //     sounds[i] = loadSound(`sounds/${i}.mp3`)
    // }
}

function setup(){
    createCanvas(myCanvas.width, myCanvas.height);
    background(backgroundColor);
}



function draw(){
    
    background(backgroundColor);

    balls.forEach((ball) => {
        updateBall(ball);
        displayBall(ball);
    })
    drawLine(leftEdge);
    drawLine(rightEdge);

    quad(1000, 0, 900, 0, 900, 500, 1000, 500);
    quad(1000, 0, 1050, 50, 1050, 550, 1000, 500);

    push();
    translate(width * 0.2, height * 0.5);
    rotate(frameCount / 200.0);
    star(40, 40, 40, 50, 46);
    pop();
  
    push();
    translate(width * 0.5, height * 0.5);
    rotate(frameCount / 50.0);
    star(0, 20, 80, 0, 46);
    pop();
  
    push();
    translate(width * 0.8, height * 0.5);
    rotate(frameCount / -100.0);
    star(100, 100, 0, 10, 5);
    pop();
}

function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

function updateBall(ball){
    console.log(ball.x);
    if(ball.x + ball.size/2 > rightEdge.x1 ){
        ball.speed *= -1;
        ball.rightSound.play();
        activateLine(rightEdge);
    } else if(ball.x - ball.size/2 < leftEdge.x1 ){
        ball.speed *= -1;
        ball.leftSound.play();
        activateLine(leftEdge);
    }
    ball.x+= ball.speed;
}


const displayBall = ({x, y, size, strokeColor, fillColor, ballStrokeWeight}) => {
        stroke(strokeColor);
        fill(fillColor);
        strokeWeight(ballStrokeWeight);
        ellipse(x, y, size);
}

function drawLine({x1, y1, x2, y2, color, width}){
    stroke(color);
    strokeWeight(width);
    line(x1, y1, x2, y2);
}



function activateLine(line){

    line.color = activeLineColor;
    line.width = activelineWidth;

    setTimeout(() => resetLines(line), 500);
}


function resetLines(line){
    line.color = lineColor;
    line.width = lineWidth;
}
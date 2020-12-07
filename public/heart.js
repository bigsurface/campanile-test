let heart, img;
// let graphics;
let myShader;
let theta = 0;

function preload(){
    heart = loadModel('heart.obj');
    img = loadImage('abstract.jpg');
    myShader = loadShader('basic.vert', 'basic.frag');
}

function setup(){
    createCanvas(140, 140, WEBGL);
    // noStroke();
    // graphics = createGraphics(128, 512);
    // graphics.img(img, 0, 0, 128, 512);
}

function draw(){

    // background(255, 192, 203);
    // ambientLight(200);
    // scale(10);
    // push();
    rotateX(theta);
    rotateY(theta/2);
    texture(img);
    model(heart);
    // shader(myShader);
    // rect(10,10,width,height);
    // pop();

    theta+=0.01;
}
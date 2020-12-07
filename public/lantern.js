// const imgPaths = []
const hearts = [];
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
    createCanvas(120, 300, WEBGL);
    // translate(-200, -200, 0);
    noStroke();
    // graphics = (128, 512);
    // graphics.img(img, 0, 0, 128, 512);
}

function draw(){
    // background(200, 80, 200);
    background(4, 30, 66);
    // background(134, 129, 125);
    hearts.forEach(heart => {
        heart.update();
        heart.display();
    })
}
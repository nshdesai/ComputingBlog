/**
 * Sets the environment up and draws the animation
 * @return none
 * @author Nishkrit Desai
 * @version 07-12-2018
 */

var numRows;
var y;
var water;
var water_triangle;

initTriangle();

console.log(water_triangle);

function setup(){
    numRows = 6;
    y = 40;

    createCanvas(800, 400);
    background(51);
    frameRate(15);
    drawTriangle();
}

function draw(){
    numRows = 6;

    for (var row = 0; row < numRows; row++){
        var numWhite = (numRows - row) / 2;

        for (var b = 1; b <= row + 1; b++ ){
            fillBucket(40 + ((b + numWhite)* 80) , 40 + (row * 50), y);
        }
    }
    y--;

    if (y <= 0) {
        clear();
        setup();
    }
}

/**
 * draws a single bucket
 * @param  {int} x1 x-coord of the upper left point
 * @param  {int} y1 y-coord of the upper left point
 * @return {none}
 */
function drawBucket(x1, y1) {
    fill(255);
    stroke(255);
    quad(x1, y1, x1+50, y1, x1+40, y1 + 40, x1+10, y1 + 40);
    noFill();
    arc(x1+25, y1, 50, 10, -PI, 0, OPEN);
}

/**
 * Fills a bucket with water
 * @param  {int} x1 x-coord of the upper left point
 * @param  {int} y1 y-coord of the upper left point
 * @return {none}
 */
function fillBucket(x1, y1, y){
    fill(23, 99, 215);
    var w_y = y1 + y;
    var w_x = x1 + 0.25 * y; // Using similar triangles
    noStroke();
    quad(w_x, w_y, ((x1 + 50) - 0.25 * y), w_y, x1 + 40, y1 + 40, x1+10, y1 + 40);
}


function initTriangle(){
    water_triangle = [];
    for (var i = 0; i < numRows; i++){
        var temp_array = [];
        for (j = 0; j < i+1; j++){
            append(temp_array, 0);
        }
        append(water_triangle, temp_array);
    }
}

function drawTriangle() {
    for (var row = 0; row < numRows; row++){
        var numWhite = (numRows - row) / 2;

        for (var b = 1; b <= row + 1; b++){
            drawBucket(40 + ((b + numWhite)* 80) , 40 + (row * 50));
        }
    }
}

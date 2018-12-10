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
var flow_rates;
var slider;

function setup(){
    numRows = 6;
    y = 40;
    water = 0;
    water_triangle = initTriangle();
    flow_rates = flowRate();
    createCanvas(800, 600);
    resizeCanvas(800*numRows/10, 600*numRows/10);
    background(51);
    frameRate(60);
    drawTriangle();
    slider = createSlider(1, 15, 14, 1);
    slider.value(3);
    slider.position(700, 50);
}
function draw(){

    numRows = 6;//slider.value();
    textSize(32);
    fill(0, 102, 153);
    scale(0.5, 0.5);
    for (var row = 0; row < numRows; row++){
        var numWhite = (numRows - row) / 2;
        for (var b = 0; b <= row; b++ ){
            fillBucket(40 + ((b+1 + numWhite)* 80) , 40 + (row * 50), (40 - 20*water_triangle[row][b]));
        }
    }

    y--;

    for (var i = 0; i < numRows; i++){
        for (j = 0; j < i+1; j++){
            if (water_triangle[numRows - 1].indexOf(2)>= 0){
                break;
            }
            if (water_triangle[i][j] < 2){
                water_triangle[i][j] += 0.0125*flow_rates[i][j];
                if (water_triangle[i][j] > 2){
                    water_triangle[i][j] = 2;
                }
                if (water_triangle[i][j] == 2){
                    if (i+1 != numRows){
                        flow_rates[i+1][j] += flow_rates[i][j]/2;
                        flow_rates[i+1][j+1] += flow_rates[i][j]/2;
                        water_triangle[i][j] = 2.01;
                    }
                }
            }
        }
    }
    if (y <= 0) {
        y = 40;
        //setup();
    }
    water = calculateWater();
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
    fill(103, 103, 103);
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
    return water_triangle;
}

function drawTriangle() {
    for (var row = 0; row < numRows; row++){
        var numWhite = (numRows - row) / 2;

        for (var b = 1; b <= row + 1; b++){
            drawBucket(40 + ((b + numWhite)* 80) , 40 + (row * 50));
        }
    }
}

function isBucketFull(row, col) {
    return water_triangle[row][col] == 0;
}

function flowRate(){
    flow_rates = [];
    for(var i = 0; i < numRows; i++){
        var temp_array = [];
        for (j = 0; j < i+1; j++){
            append(temp_array, 0);
        }
        append(flow_rates, temp_array);
    }
    flow_rates[0][0] = 1;
    return flow_rates;
}

function calculateWater(){
    water = 0;
    for (var i = 0; i < numRows; i++){
        for (j = 0; j < i+1; j++){
            if (water_triangle[i][j] == 2.01){
                water += 2;
                continue;
            }
            water += water_triangle[i][j];
        }
    }
    return water;
}
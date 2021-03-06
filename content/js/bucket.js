/**
* Sets the environment up and draws the animation
* @return none
* @author Nishkrit Desai, Lord of Galaxy
* @version 07-12-2018
*/


var numRows;
var y;
var water;
var water_triangle;
var flow_rates;
var slider;
var s = 1.0;
var water_max;
var mark_num, mark_dist, mark_vol;
var wc;

function setup() {
    createCanvas(800, 400);
    background(0);
    frameRate(60);
    wc = color(70, 130, 220);
    slider = createSlider(2, 12, 5, 1);
    slider.position(550, 50);
    slider.size(180)
    reset();
}

function reset() {
    numRows = slider.value();
    s = min(6.0 / (numRows), 3.0);
    water_max = numRows * numRows + 2.0;
    y = 40;
    water = 0;
    water_triangle = initTriangle();
    flow_rates = flowRate();

    // to calculate this is a problem
    // number should be such that mark_num*volume = water_max where volume = 0.1, 0.2, 0.4, 1, 2, 4, 10, 20, 40...
    // but it should also be small enough but not too small, between 21 and 42 here
    var v = 0.1;
    var c = 1;
    do {
        mark_num = water_max / v;
        mark_vol = v;
        v *= 2;
        if (c % 3 == 0) v *= 1.25;
        c++;
    } while (mark_num > 42)

    mark_dist = 210.0 / mark_num;
    background(0);
    drawTriangle();
}

function draw() {

    if (slider.value() != numRows) {
        numRows = slider.value();
        reset();
    }

    background(0);
    textSize(30);
    fill(60, 182, 103);
    textFont('Helvetica');
    text("Water used: " + water.toPrecision(3) + "L", 520, 100);
    
    textSize(20);
    fill(125, 227, 190);
    text("Number of Rows: " + numRows, 550, 35);

    fill(230, 109, 72);
    text(2, 520, 62);
    text(12, 730, 62);

    water = calculateWater();
    drawFlask(water);
    scale(s);
    drawTriangle();

    for (var row = 0; row < numRows; row++) {
        var numWhite = (numRows - row) / 2;
        for (var b = 0; b <= row; b++) {
            fillBucket(((b + numWhite) * 80), 40 + (row * 50), (water_triangle[row][b]));
        }
    }

    y--;

    for (var i = 0; i < numRows; i++) {

        for (j = 0; j < i + 1; j++) {

            if (water_triangle[numRows - 1].indexOf(2) >= 0) {
                break;
            }

            if (water_triangle[i][j] < 2) {
                water_triangle[i][j] += 0.0125 * flow_rates[i][j];
                if (water_triangle[i][j] > 2) {
                    water_triangle[i][j] = 2;
                }

                if (water_triangle[i][j] == 2) {
                    if (i + 1 != numRows) {
                        flow_rates[i + 1][j] += flow_rates[i][j] / 2;
                        flow_rates[i + 1][j + 1] += flow_rates[i][j] / 2;
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
}

/**
* draws main flask
* @param {float} water amount of water
* @return {none}
*/
function drawFlask(water) {
    fill(255);
    stroke(255);
    quad(565, 150, 735, 150, 720, 360, 580, 360);
    fill(103, 103, 103);
    arc(650, 150, 170, 20, -PI, 0, OPEN);
    fill(wc);
    stroke(wc);

    var t = 360 - (water * 210.0 / water_max);
    var tx = (water * 15 / water_max);

    quad(580 - tx, t, 720 + tx, t, 720, 360, 580, 360);
    strokeWeight(2);
    stroke(0);
    line(733, 150, 718, 360);
    strokeWeight(1);
    textSize(14);
    fill(0);

    var n = water_max > 10 ? 0 : 1

    for (var i = 1; i < mark_num; i++) {
        let y1 = 360 - i * mark_dist;
        let x1 = 718 + i * 15.0 / mark_num;
        let l = (i % 5 == 0) ? 15 : 7;
        if (i % 5 == 0) {
            txt = (mark_vol * i).toFixed(n);
            text(txt, x1 - l - textWidth(txt) - 2, y1 + 5);
        }
        line(x1, y1, x1 - l, y1);
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
    quad(x1, y1, x1 + 50, y1, x1 + 40, y1 + 40, x1 + 10, y1 + 40);
    fill(103, 103, 103);
    arc(x1 + 25, y1, 50, 10, -PI, 0, OPEN);
}


/**
* Fills a bucket with water
* @param  {int} x1 x-coord of the upper left point
* @param  {int} y1 y-coord of the upper left point
* @return {none}
*/

function fillBucket(x1, y1, f) {
    fill(wc);
    y = 40 - 20 * f;
    var w_y = y1 + y;
    var w_x = x1 + 0.25 * y; // Using similar triangles
    noStroke();

    quad(w_x, w_y, ((x1 + 50) - 0.25 * y), w_y, x1 + 40, y1 + 40, x1 + 10, y1 + 40);
    var c = color(210, 170, 0);

    if (f >= 1.5) {
        c = color(255, 255, 0);
    } else if (f < 1.0) {
        c = color(140, 60, 0);
    }

    fill(c);
    textSize(20);
    text(f.toFixed(1), x1 + 10, y1 + 20);
}


function initTriangle() {
    water_triangle = [];
    
    for (var i = 0; i < numRows; i++) {
        var temp_array = [];
        for (j = 0; j < i + 1; j++) {
            append(temp_array, 0);
        }
        append(water_triangle, temp_array);
    }

    return water_triangle;
}


function drawTriangle() {
    for (var row = 0; row < numRows; row++) {
        var numWhite = (numRows - row) / 2;

        for (var b = 0; b <= row; b++) {
            drawBucket(((b + numWhite) * 80), 40 + (row * 50));
        }
    }
}


function isBucketFull(row, col) {
    return water_triangle[row][col] == 0;
}


function flowRate() {
    flow_rates = [];

    for (var i = 0; i < numRows; i++) {
        var temp_array = [];
        for (j = 0; j < i + 1; j++) {
            append(temp_array, 0);
        }

        append(flow_rates, temp_array);
    }

    flow_rates[0][0] = ceil(numRows * numRows / 20);

    return flow_rates;

}


function calculateWater() {
    water = 0;

    for (var i = 0; i < numRows; i++) {
        for (j = 0; j < i + 1; j++) {
            if (water_triangle[i][j] == 2.01) {
                water += 2;
                continue;
            }
            water += water_triangle[i][j];
        }
    }
    return water;
}
title: Visualizing Patterns in the Pascal Triangle using JavaScript
subtitle: Saving water used in a Pascal Triangle
date: 2018-12-07
author: Nishkrit Desai
image: post-bg.jpg
embed: bucket.html
embed_type: html

### Introduction
----
In this article we will attempt to visualize, and justify, 
the answers to a question involving Permutations and the Pascal's triangle.

#Setting up the environment
----
I will use `p5.js` for this visualizations.

First let's create a function to draw each bucket.

    function drawBucket(x1, y1){
        fill(255);
        quad(x1, y1, x1+50, y1, x1+40, y1 + 40, x1+10, y1 + 40);
        stroke(255);
        noFill();
        arc(x1+25, y1, 50, 10, -PI, 0, OPEN);    
    }

The above function will draw a bucket at some point `(x, y)`.

Now, create a function to generate a pascal's triangle containing 6 rows.

    function generateTriangle(){
        var numRows = 6; // Later make this dynamic
        var buckets = 1

        for (var row = 0; row < numRows; row++){
            var numWhite = (numRows - row) / 2;

            for (var b = 1; b <= buckets; b++ ){
                drawBucket(40 + ((b + numWhite)* 80) , 40 + (row * 50));
            }
            buckets++;
        }
    }

The above function should generate the sought after pattern of buckets.

### Filling the buckets
----

To fill each of the buckets we will write a function called
`fillBucket()`. It looks something like this:

    function fillBucket(x1, y1, y){
        fill(23, 99, 215);
        var w_y = y1 + y;
        var w_x = x1 + 0.25 * y; // Using similar triangles
        noStroke();
        quad(w_x, w_y, ((x1 + 50) - 0.25 * y), w_y, x1 + 40, y1 + 40, x1+10, y1 + 40);
    }

This function can be used within the `draw()` function in
p5 to animate the filling of the buckets.


### Doing the math
----

Now we will create an array that stores the amount of water
within each bucket and use that to make our calculations.

    function draw(){

    numRows = 6;
    
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
        setup();
    }
    water = calculateWater();
}

This function should allow us to draw each frame of the animation

----
These functions should simply how the triangle is constructed

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


The above functions should allow us to draw the pascal triangle properly

### Doing the real math
----

This part involves doing the calculations required to compute the total amount of water used

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


### What does the simulation look like?
----

title: Visualizing Patterns in the Pascal Triangle using JavaScript
subtitle: Saving water used in a Pascal Triangle
date: 2018-12-07
author: Nishkrit Desai
image: post-image.jpg

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


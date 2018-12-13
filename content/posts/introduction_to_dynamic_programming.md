title: An introduction to Dynamic Programming
subtitle: How memoization can change the way your code behaves
author: Nishkrit Desai
date: 2018-12-13
image: post-bg.jpg


###Why is Dynamic Programming Important?
----

Whether you are cluelessly gazing at a problem statement on a contest or if you are stuck trying to increase the performance of a large-scale platform,
Dynamic Programming is probably the reason you are stuck. Understanding Dyanamic Programming can be hard, but all that effort may be worth it.
Remembering three simple concepts that encapsulate the basics of Dynamic Programming can help you solve seemingly complex algorithmic problems.

_Takeaway_: Dynamic programming gives you wizard like powers.

### What is Dynamic Programming?
----

Dynamic Programming is _basically_ recursion. Atleast every dynamic programming problem starts off as a problem in Recursion.

The only two additional concepts that Dynamic Programming introduces into the mix are:

* Memoization
* Tabulation

These above methods individually constitute the two branches of Dynamic Programming: The **top-down approach** and the **bottom-up approach**.

![alt text](https://www.cs.utah.edu/~draperg/cartoons/dynamic.png  \"Logo Title Text 1\")

### Let's look at a simple example
-----

By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

       3
      7 4
     2 4 6
    8 5 9 3

That is, 3 + 7 + 4 + 9 = 23.

Find the maximum total from top to bottom of the triangle below:

                          75
                         95 64
                        17 47 82
                       18 35 87 10
                      20 04 82 47 65
                     19 01 23 75 03 34
                    88 02 77 73 07 63 67
                   99 65 04 28 06 16 70 92
                  41 41 26 56 83 40 80 70 33
                41 48 72 33 47 32 37 16 94 29
               53 71 44 65 25 43 91 52 97 51 14
              70 11 33 28 77 73 17 78 39 68 17 57
             91 71 52 38 17 14 91 43 58 50 27 29 48
            63 66 04 68 89 53 67 30 73 16 69 87 40 31
          04 62 98 27 23 09 70 98 73 93 38 53 60 04 23


The programmer inside you should already be screaming recursion. So let's do that. Let's use recursion to solve this problem.

I'm not going to put the solution here, but if your stuck here is a hint: try to see how you can maximise the sum at every step.


### But this solution is not dynamic ...
----
Yes, you are right. Plain recursion may work for this test case, but it breaks very easily.
To make this solution dynamic we have to do something else. We have to save the computed states above somewhere.

In python we will create a memoize function to decorate our original recursive function.


### How can I apply this to other problems?
----

Three steps:

* Find a recursive relationship
* Look for overlapping subproblems (More on this later)
* Figure out the right way to populate your table

These steps should help you solve any basic Dynamic Progamming problem.

### Now let's practice
----

These problems should help you understand this concept better:

* Fibonacci-Dynamic style
* [ZigZag](https://community.topcoder.com/stat?c=problem_statement&pm=1259&rd=4493)(TCCC 2003)

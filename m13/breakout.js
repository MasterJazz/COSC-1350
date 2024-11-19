/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author: Matthew Sleight
 * Date: November 18, 2024
 * Project for COSC 1350
 *
 */

// get the canvas element from the DOM.
const canvas = document.getElementById("myCanvas");

/*  create a "2d rendering context".
 *  I suggest looking up and reading about the canvas.getContext function.
 *  You don't have to understand everything about canvas rendering contexts,
 *  but it help you get to know what the ctx object can and can't draw.
 */

const ctx = canvas.getContext("2d");

//drawing a ball requires the x position, y position, and radius.
let ballRadius = 15;
let xPos = canvas.width / 2;
let yPos = canvas.height / 2;

//xy move distance. These values are used to move the ball around.
let xMoveDist = 3;
let yMoveDist = 3;

// Track paddle position
let xPaddle = canvas.width / 2.5;

//function that draws the ball on the canvas
ballRender=()=>{
  ctx.beginPath();
  //arc creates circular arc starting at 0, ending at 2pi (360 degrees)
  ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
  //fill in the circular path with default color
  ctx.fill();
  ctx.closePath();
}

/*
* draw() can be thought of as our main function.
* We execute draw every few milliseconds to give our
* canvas the appearance of being animated. Notice how in the draw function
* the first thing done is ctx.clearRect(), which clears the whole canvas
* before drawing the next frame of animation.
*
* Right now, it only calls ballRender() over and over again.
* Changing the xPos and yPos will cause the ball to be drawn somewhere else
* next time the function is called.
*/
draw=()=> {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ballRender();
  paddle();

  xPos += xMoveDist;
  yPos += yMoveDist;

  if (xPos > canvas.width - ballRadius || xPos < ballRadius) {
    xMoveDist = -xMoveDist;
  }

  if (yPos > canvas.height - ballRadius || yPos < ballRadius) {
    yMoveDist = -yMoveDist;
  }

  // Handle left paddle movement
  if (moveLeft && xPaddle > 0) {
    xPaddle -= 3;
  }

  // Handle right paddle movement
  if (moveRight && xPaddle < canvas.width - 100) {
    xPaddle += 3;
  }
};

function paddle() {
  const myCanvas = document.getElementById("myCanvas");
  const ctx = myCanvas.getContext("2d");
  
  ctx.fillStyle = "#00008B";
  ctx.fillRect(xPaddle, 325, 100, 15);
}

// 'keydown' and 'keyup' event listeners
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

// Boolean variables to track if keys are pressed or not
let moveLeft = false;
let moveRight = false;

function onKeyDown(event) {
  // Check if the left arrow key is pressed
  if (event.key === "ArrowLeft") {
    moveLeft = true; // Set moveLeft to true
  }

  // Check if the right arrow key is pressed
  if (event.key === "ArrowRight") {
    moveRight = true; // Set moveRight to true
  }
}

function onKeyUp(event) {
  // Check if the left arrow key is released
  if (event.key === "ArrowLeft") {
    moveLeft = false; // Set moveLeft to false
  }

  // Check if the right arrow key is released
  if (event.key === "ArrowRight") {
    moveRight = false; // Set moveRight to false
  }
}

/*
 * setInterval(func, delay)
 * this built-in global JavaScript function executes 'func' function every
 * 'delay' milliseconds, and returns an interval ID. We won't really use intervalID
 * so don't worry to much about that for now.
 *
 * Try playing around with the refreshRate value.
 */
const refreshRate = 30;
const intervalID = setInterval(draw, refreshRate);
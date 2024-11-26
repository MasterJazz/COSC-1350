/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author: Matthew Sleight
 * Date: November 25, 2024
 * Project for COSC 1350
 *
 */

// Get the canvas element from the DOM.
const canvas = document.getElementById("myCanvas");

/*  Create a "2d rendering context".
 *  I suggest looking up and reading about the canvas.getContext function.
 *  You don't have to understand everything about canvas rendering contexts,
 *  but it help you get to know what the ctx object can and can't draw.
 */

const ctx = canvas.getContext("2d");

// Drawing a ball requires the x position, y position, and radius.
let ballRadius = 15;
let xPos = canvas.width / 2;
let yPos = canvas.height / 2;

// xy move distance. These values are used to move the ball around.
let xMoveDist = 3;
let yMoveDist = 3;

// Track paddle position
let xPaddle = canvas.width / 2.5;

// Declare paddle width and height
const paddleHeight = 15;
const paddleWidth = 100;
const paddleLocation = 325;

// Brick Properties
const brickRows = 4;
const brickColumns = 6;
const brickWidth = 90;
const brickHeight = 25;
const brickPadding = 10;
const brickTopOffset = 40;
const brickLeftOffset = 5;

// Brick array
let bricks = [];

for (let col = 0; col < brickColumns; col++) {
  bricks[col] = [];
  for (let row = 0; row < brickRows; row++) {
    bricks[col][row] = { x: 0, y: 0, status: 1 };
  }
}

// Boolean variables to track if keys are pressed or not
let moveLeft = false;
let moveRight = false;

// 'keydown' and 'keyup' event listeners
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

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

// Handle brick collision
function collisionDetection() {
  for (let col = 0; col < brickColumns; col++) {
    for (let row = 0; row < brickRows; row++) {
      const b = bricks[col][row];
      if (b.status === 1) {
        // Brick coordinates
        const brickX = b.x;
        const brickY = b.y;

        // Check for collision on the left and right sides of the brick
        if (
          xPos + ballRadius > brickX &&
          xPos - ballRadius < brickX + brickWidth && 
          yPos + ballRadius > brickY &&
          yPos - ballRadius < brickY + brickHeight
        ) {
          // Ball hit the brick, bounce and update the brick's status
          yMoveDist = -yMoveDist;
          b.status = 0; // Set brick as "hit"
        }
      }
    }
  }
}

// Function that draws the ball on the canvas
ballRender=()=>{
  ctx.beginPath();
  // Arc creates circular arc starting at 0, ending at 2pi (360 degrees)
  ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
  // Fill in the circular path with default color
  ctx.fill();
  ctx.closePath();
}

// Function that draws the paddle on the canvas
function paddle() {
  const myCanvas = document.getElementById("myCanvas");
  const ctx = myCanvas.getContext("2d");
  
  ctx.fillStyle = "#00008B";
  ctx.fillRect(xPaddle, paddleLocation, paddleWidth, paddleHeight);
}

// Function that draws the bricks on the canvas
function drawBricks() {
  for (let col = 0; col < brickColumns; col++) {
    for (let row = 0; row < brickRows; row++) {
      if (bricks[col][row].status === 1) {

        const brickX = col * (brickWidth + brickPadding) + brickLeftOffset;
        const brickY = row * (brickHeight + brickPadding) + brickTopOffset;
  
        bricks[col][row].x = brickX;
        bricks[col][row].y = brickY;
  
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#00008B";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// Create a gameOver flag to prevent further game actions
let gameOver = false;

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
  // If the game is over, stop the game loop and reload the page
  if (gameOver) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ballRender();
  paddle();
  drawBricks();

  collisionDetection();

  // Ball movement
  xPos += xMoveDist;
  yPos += yMoveDist;

  // Ball wall collision detection
  if (xPos + xMoveDist > canvas.width - ballRadius || xPos + xMoveDist < ballRadius) {
    xMoveDist = -xMoveDist // Bounce off the walls
  }

  // Bounce off the top wall
  if (yPos + yMoveDist < ballRadius) {
    yMoveDist = -yMoveDist;
  }
  // Ball collision with the bottom (paddle area)
  else if (yPos + yMoveDist > paddleLocation - ballRadius) {
    // Check if the ball is within the paddle's horizontal bounds
    if (xPos > xPaddle && xPos < xPaddle + paddleWidth) {
      // Ball hits the paddle, reverse vertical direction (bounce effect)
      yMoveDist = -yMoveDist; // Bounce off the paddle

      // // Add a small random horizontal offset to make the bounce feel more natural
      // let paddleCenter = xPaddle + paddleWidth / 2;
      // let ballCenter = xPos;

      // let offset = (ballCenter - paddleCenter) / paddleWidth; // Calculate offset
      // xMoveDist += offset * 2; // Adjust horizontal direction based on the hit location
    } 
    // Ball missed the paddle, trigger game over
    else if (yPos + yMoveDist > canvas.height - ballRadius) {
      gameOver = true; // Set the gameOver flag to true
      alert("Game Over!");
      clearInterval(intervalID); // Stop the game loop
      document.location.reload(); // Reload the page
    }
  }

  // Handle left paddle movement
  if (moveLeft && xPaddle > 0) {
    xPaddle -= 7;
  }

  // Handle right paddle movement
  if (moveRight && xPaddle < canvas.width - paddleWidth) {
    xPaddle += 7;
  }
};

/*
 * setInterval(func, delay)
 * this built-in global JavaScript function executes 'func' function every
 * 'delay' milliseconds, and returns an interval ID. We won't really use intervalID
 * so don't worry to much about that for now.
 *
 * Try playing around with the refreshRate value.
 */

// Start the game
let intervalID;
function startGame() {
  // Hide the start button
  document.getElementById("runButton").style.display = "none";
  // Start the game loop
  setInterval(draw, 25);
}

// Event listener for button click
document.getElementById("runButton").addEventListener("click", function () {
  startGame();
  this.disabled = true; // Disable the button to prevent clicking again
});
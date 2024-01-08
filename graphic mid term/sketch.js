//start of variable\\\
//matter.js engine
var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var engine;
//cue ball
var cueBall;
//wall
var walls;
//ball
var balls;
var balls = [];
//pocket
var pockets = [];
//score
var score = 0;
//recording
var isRecording = false;
var lines = []; // Array to store line bodies

function preload() {
    //for audio
  soundFormats("mp3");
  collectSound = loadSound("assets/falling.mp3");
    movingSound=loadSound("assets/ball.mp3");
}

function setup() {
  var canvas = createCanvas(1000, 500);
  var canvasX = (windowWidth - width) / 2;
  var canvasY = (windowHeight - height) / 2;
  canvas.position(canvasX, canvasY);

  engine = Engine.create();
  engine.world.gravity.y = 0;
  ball = [];
  walls = [];
  setupWalls();
  generateCueBall();
  setupPockets();
  setupBalls(); // Call the ball setup function
   //start of button codes// 
    //reset
  var resetButton = createButton('Reset Game');
  resetButton.position(canvasX + 400, canvasY + height + 10); // Adjust the position as needed
  resetButton.mousePressed(resetGame);
    //start to take screenshot
  var startButton = createButton('click to take screenshot');
  startButton.position(canvasX + 10, canvasY + height + 10);
  startButton.mousePressed(startRecording);
 //start to take screenshot
  var stopButton = createButton('Stop to screenshot ');
  stopButton.position(canvasX + 200, canvasY + height + 10);
  stopButton.mousePressed(stopRecording);
     //end of button codes// 
    // Add this line in the setup function
var shuffleButton = createButton('Shuffle Balls');
shuffleButton.position(canvasX + 600, canvasY + height + 10);
shuffleButton.mousePressed(shuffleBalls);
    
var shuffleRedButton = createButton('Shuffle Red Balls');
shuffleRedButton.position(canvasX + 800, canvasY + height + 10);
shuffleRedButton.mousePressed(shuffleRedBalls);

}

function draw() {
  background(1, 50, 32);
  Engine.update(engine);
  //calling tge function
  drawWalls();
  drawCueBall();
  drawForceLine();
  drawPockets();
  drawBalls(); 
  checkBallPocketCollisions();

   //start of score
  fill(255);
  textSize(20);
  text("Score: " + score, 900, 20);
// end of score
    
    
  if (isRecording) {
    var frameName = 'frame_' + frameCount;
    saveCanvas(frameName, 'png');
  }
    
    // Draw baulk line
  stroke(255);
  line(width / 5, height, width / 5, 0);


  // Draw semi-circle for D
  noFill();
  stroke(255);
  arc(width / 5, height / 2, 120, 120, PI / 2, -PI / 2); 
}

//wall setup
function setupWalls() {
  var wall1 = Bodies.rectangle(500, height, 1000, 20, { isStatic: true });
  var wall2 = Bodies.rectangle(500, 0, 1000, 20, { isStatic: true });
  var wall3 = Bodies.rectangle(0, height / 2, 20, height, { isStatic: true });
  var wall4 = Bodies.rectangle(1000, height / 2, 20, height, { isStatic: true });

  walls.push(wall1);
  walls.push(wall2);
  walls.push(wall3);
  walls.push(wall4);
  World.add(engine.world, [wall1, wall2, wall3, wall4]);
}

//draw wall function
function drawWalls() {
  fill(125);
  for (var i = 0; i < walls.length; i++) {
    var vertices = walls[i].vertices;
    beginShape();
    for (var j = 0; j < vertices.length; j++) {
      vertex(vertices[j].x, vertices[j].y);
    }
    endShape(CLOSE);
  }
}

//generate cue ball
function generateCueBall() {
  cueBall = Bodies.circle(width -900, height / 2, 15, { restitution: 0.1, friction: 0.1 });
  World.add(engine.world, cueBall);
}

function drawCueBall() {
  fill(255);
  drawVertices(cueBall.vertices);
}

function drawForceLine() {
  stroke(255);
  line(mouseX, mouseY, cueBall.position.x, cueBall.position.y);
}

function setupPockets() {
  var pocket1 = Bodies.circle(30, 30, 10, { isStatic: true });
  var pocket2 = Bodies.circle(500, 30, 10, { isStatic: true });
  var pocket3 = Bodies.circle(970, 30, 10, { isStatic: true });
  var pocket4 = Bodies.circle(30, 470, 10, { isStatic: true });
  var pocket5 = Bodies.circle(500, 470, 10, { isStatic: true });
  var pocket6 = Bodies.circle(970, 470, 10, { isStatic: true });
//  var pocket7 = Bodies.circle(600, 470, 10, { isStatic: true });

  pockets.push(pocket1);
  pockets.push(pocket2);
  pockets.push(pocket3);
  pockets.push(pocket4);
  pockets.push(pocket5);
  pockets.push(pocket6);
//  pockets.push(pocket7);

  World.add(engine.world, [pocket1, pocket2, pocket3, pocket4]);
}

function drawPockets() {
  fill(0);
  for (var i = 0; i < pockets.length; i++) {
    ellipse(pockets[i].position.x, pockets[i].position.y, 20, 20);
  }
}

function setupBalls() {
  // Create the colored balls (existing code for colored balls)

  // Create the red balls forming a custom triangular pattern with a different alignment
  var numRows = 5; // Number of rows in the custom triangle
  var triangleBaseX = width - 40; // X-coordinate for the base of the triangle on the right side

  // Change the Y-coordinate calculation for a different alignment
  var triangleBaseY = height / 2 - numRows * 20;

  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < i + 1; j++) {
      // Adjust the X-coordinate calculation for a different alignment
      var xPos = triangleBaseX + j * 35 - i * 20;
      var yPos = triangleBaseY + i * 14;
var redBall = Bodies.circle(xPos - 150, yPos + 70, 10, { restitution: 0.1, friction: 0.1, label: "red" });
      balls.push(redBall);
      World.add(engine.world, redBall);
    }
  }
 // Create and add the yellow ball
  var yellowBall = Bodies.circle(width / 5, height - 190, 10, { restitution: 0.1, friction: 0.1 });
  yellowBall.label = "yellow"; // Set a custom label for the yellow ball
  balls.push(yellowBall);
  World.add(engine.world, yellowBall);

  // Debugging output
  console.log("Yellow ball added:", yellowBall);
    
    
    
 // Create and add the brown ball
  var brownBall = Bodies.circle(width / 5, height - 245, 10, { restitution: 0.1, friction: 0.1 });
  brownBall.label = "brown"; // Set a custom label for the yellow ball
  balls.push(brownBall);
  World.add(engine.world, brownBall);

  // Debugging output
  console.log("brown ball added:", brownBall);
    
  var greenBall = Bodies.circle(width / 5, height - 310, 10, { restitution: 0.1, friction: 0.1 });
  greenBall.label = "green"; // Set a custom label for the yellow ball
  balls.push(greenBall);
  World.add(engine.world, greenBall);

  // Debugging output
  console.log("green ball added:", greenBall);
    
     var blueBall = Bodies.circle(width -450, height - 230, 10, { restitution: 0.1, friction: 0.1 });
  blueBall.label = "blue"; // Set a custom label for the yellow ball
  balls.push(blueBall);
  World.add(engine.world, blueBall);

  // Debugging output
  console.log("blue ball added:", blueBall);
    
    
     var pinkBall = Bodies.circle(width -310, height - 230, 10, { restitution: 0.1, friction: 0.1 });
  pinkBall.label = "pink"; // Set a custom label for the yellow ball
  balls.push(pinkBall);
  World.add(engine.world, pinkBall);

  // Debugging output
  console.log("pinkBall ball added:", pinkBall);
    
    
     var blackBall = Bodies.circle(width -100, height - 230, 10, { restitution: 0.1, friction: 0.1 });
  blackBall.label = "black"; // Set a custom label for the yellow ball
  balls.push(blackBall);
  World.add(engine.world, blackBall);

  // Debugging output
  console.log("black ball added:", blackBall);
}

function drawBalls() {
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].label === "red") {
      fill(255, 0, 0); // Change to Red color
    } else if (balls[i].label === "yellow") {
      fill(255, 255, 0); // Change to Yellow color
    }
    else if (balls[i].label === "brown") {
      fill(139, 69, 19);  // Change to Yellow color
    }
       else if (balls[i].label === "green") {
      fill(0, 128, 0)  // Change to Yellow color
    }
       else if (balls[i].label === "blue") {
      fill(0, 0, 255);  // Change to Yellow color
    }
      else if (balls[i].label === "pink") {
          fill(255, 182, 193);  // Change to Yellow color
    }
      else if (balls[i].label === "black") {
          	fill(53, 57, 53)  // Change to Yellow color
    }
    // Draw the vertices of the current ball
    drawVertices(balls[i].vertices);
  }
}



function mousePressed() {
  var force = 10000;
  var forceX = (cueBall.position.x - mouseX) / force;
  var forceY = (cueBall.position.y - mouseY) / force;
  var appliedForce = { x: forceX, y: forceY };
  Body.applyForce(cueBall, { x: cueBall.position.x, y: cueBall.position.y }, appliedForce);
movingSound.play();
}

function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
    
  endShape(CLOSE);
}

function checkBallPocketCollisions() {
  for (var i = balls.length - 1; i >= 0; i--) {
    for (var j = pockets.length - 1; j >= 0; j--) {
      if (balls[i] && pockets[j] && isColliding(balls[i], pockets[j])) {
        var ballColor = balls[i].label;

        switch (ballColor) {
          case "red":
            score += 1;
            break;
          case "yellow":
            score += 2;
            break;
          case "green":
            score += 3;
            break;
          case "brown":
            score += 4;
            break;
          case "blue":
            score += 5;
            break;
          case "pink":
            score += 6;
            break;
          case "black":
            score += 7;
            break;
          // Add more cases if needed for additional ball colors

          default:
            console.error("Unknown ball color:", ballColor);
            break;
        }

        removeBallAtIndex(i);
        collectSound.play();
        console.log("Score: " + score);
      }
    }
  }
}


function removeBallAtIndex(index) {
  if (index >= 0 && index < balls.length) {
    World.remove(engine.world, balls[index]);
    balls.splice(index, 1);
            console.log('ball removed ');
  }
}

function isColliding(ball, pocket) {
  if (!ball || !pocket) {
    console.error("Ball or pocket is undefined");
    return false;
  }

  var distance = dist(ball.position.x, ball.position.y, pocket.position.x, pocket.position.y);
  var combinedRadius = ball.circleRadius + pocket.circleRadius;
  return distance < combinedRadius;


}


function resetGame() {
  score = 0;
  for (var i = 0; i < balls.length; i++) {
    World.remove(engine.world, balls[i]);
      
  }
  balls = [];
  generateCueBall();
  setupBalls();
  localStorage.removeItem('startTime');
  console.log('Game reset');
}

function startRecording() {
  isRecording = true;
    console.log('Record started');
}

function stopRecording() {
  isRecording = false;
        console.log('Record stop');

}

function shuffleBalls() {
  for (var i = 0; i < balls.length; i++) {
    var newX = random(50, width - 50);
    var newY = random(50, height - 50);
    Body.setPosition(balls[i], { x: newX, y: newY });
  }
}
function shuffleRedBalls() {
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].label === "red") {
      var newX = random(50, width - 50);
      var newY = random(50, height - 50);
      Body.setPosition(balls[i], { x: newX, y: newY });
    }
  }
}
////////////////////////////////////////////////////////////
//**********************commentry**************************
/*inside of this code i have used javascript that uses the p5.js library to create  graphics program to create an existing pool game where the player has the ability use clu ball to hit-colored balls into pockets where each color has different points.
1.	Matter.js
2.	the code uses physics engine matter.js to simulate physics that belongs to an existing existing snooker table. That happens to be going to create an existing existing engine, define objects such during the same time that wall ,balls during the same time that well during the same time that pockets during the same time that well during the same time that handle their interaction.
3.	Sound
The code uses the ‘preload’ function to load the sound  using ‘loadSound’  by using function from p5.js .The sound plays sound only specific events , such as when shooting cue ball (fallsound.play()) or when the ball falls onto the pockets(collectsound.play())
3.Button 
the code has button to rest the game  as well as starting /stopping recording. These button happen to be position on top of the   canvas by using ‘createbutton’ function that happens to be linked to ‘resetgame’ ,    ‘stratrecroding’ as well as ‘stoprecording’) that is going to exist as a only executed only at the time where clicked.

 4.Game objects
The game object like cue ball , colored balls, walls and pockets. The cue ball  usually a white one used by a player strikes with cue in the snooker table ,colored ball that will be used to strike the points ,pocket that will collect the ball and wall to prevent the ball moving out

5.Recording features
The code has a feature recording feature that will capture the screan and saves them as PNG image . This will be done by ‘isRecording ‘ function and ‘saveCanvas’ .

6.Force and shooting
at the time where the mouse happens to be pressed by the use(‘mousepressed ‘function) an existing force is going to exist as a applied on top of the cue ball..The force is going to exist as a created on top of mouse position.

7.Collision detection
The code will check if there is a collision between balls and pockets  by using ‘isColliding’ function. In the case if the ball the ball collides with the pocket it will remove the ball and add add the score according with color of the ball.

8.game reset
there happens to be an existing code is going to have reset function inside of the game to reset the game position,score as well as cue ball.
9.draw function

  ‘drawwalls’, ‘drawcueball’ , ‘drawcuseball’,’drawballs’ , ‘drawpockets’ happen to exist as a responsible that happens to be going to belong to drawing the game on top of top that belongs to the canvas

////////////////////////////////////////////////////////////
*/
# snoker-table-graphics-programing

inside of this code i have used javascript that uses the p5.js library to create  graphics program to create an existing pool game where the player has the ability use clu ball to hit-colored balls into pockets where each color has different points.
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

## Table of contents
* [General Info](#general-info)
* [How To Run](#how-to-run)
* [Project Details](#details)

## General info
This project emulates how a robot direction controller would work.
The input consists of 2 parts:
1. Two integers to set the dimensions of the rectangle
2. Robots positions and Instructions
The output is simply the las position of the robot plus whether it was lost.
	
## How to run

1. Make sure to have installed nodeJS and NPM. 
2. Having those, proceed to set up the project. 
```
$ cd NODE-MartianRobots/
$ npm install prompt-sync
$ node main.js
```
That should get the program running!
	
## Details
To develop this program, I have used several functions to break up the problem in smaller tasks. 

1. The purpose of ```getBoardCoordinates``` and ```getRobotCoordinates``` is merely to parse the input into something my program can read and work with. 

2. As its name tells, ```isRobotLost``` takes the current position of the robot and compares it to the dimensions of the rectangle. If it's outside the rectangle, it goes back to the closest point inside the rectangle and finishes the instructions. 

3. The function ```wereRobotsLostHere``` makes sure that when a robot gets lost, if other one is going to follow that very same path, the robot ignores the instruction and keeps reading the other ones. Here I just check the current position and orientation with those that got lost and I put in an array. 

4. Finally, ```printFinalPositions``` does everything else: it reads the string with the robot instructions, and for each case does diferent things. It calls all the other functions I have mentioned before and then it prints the final position. 



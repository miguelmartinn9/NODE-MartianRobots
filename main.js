//INPUT: 
/*
	1. Upper right rectangle coordinates, i,e: 5 3
	2. Robot position and orientation, i,e:  1 1 E
	3. Robot instruction set, i,e: FRFRFRFRFRL
*/

//OUTPUT: 
/*
	1. Final position and orientation of the robot followed by orientation, i,e: 1 4 N
	2. In case the robot goes off the grid, write the final in-boundaries position and the word "LOST"ie: 1 4 N LOST
*/

//Here we are using prompt, which requires node and NPM to be installed.
// To run this shit properly, you should do "npm install prompt-sync"

const prompt = require('prompt-sync')({sigint: true});

//Input 1: board upper corner
const upperRightCoordinatesString = prompt("");
var boardCoordinatesArray = getBoardCoordinates(upperRightCoordinatesString);

//Input 2: Robot position and instructions
var robotString = "garbage value"
var robotsPosition = []; //This will be an array of array's
var instructionsSet = []; //This will be an array with the instructions
var robotCounter = 0;
var instructionsCounter = 0;

while(robotString !== '\n' || robotString !== '') {
	robotString = prompt("");
	if (robotString === '\n' || robotString === '')
		break;
	robotsPosition[robotCounter++] = getRobotPosition(robotString);

	instructionsSet[instructionsCounter++] = prompt("");
}

for (var i = 0; i < robotCounter; i++) {
	printFinalPositions(robotsPosition[i], instructionsSet[i]);
}

function printFinalPositions (robotPosition, robotInstruction) {
	var currentOrientation = robotPosition[2];
	var wasLostString = "";
	for (var i = 0; i < robotInstruction.length; i++) {
		console.log("Evaluating instruction "+ i +": " + robotInstruction[i] + "\nWith orientation: " + currentOrientation + "\n");
		switch(robotInstruction[i]) {
			case 'F':
				if (currentOrientation === 'N')
					robotPosition[1]++;
				if (currentOrientation === 'S')
					robotPosition[1]--;
				if (currentOrientation === 'E')
					robotPosition[0]++;
				if (currentOrientation === 'W')
					robotPosition[0]--;
				if (isRobotLost(robotPosition)) {
					console.log("Entra en el IF DE LOST");
					i = robotInstruction.length;
					wasLostString = "LOST";
				}
				break;
			case 'R':
				if (currentOrientation === 'N') {
					currentOrientation = 'E'
					break;
				}
				if (currentOrientation === 'E') {
					currentOrientation = 'S';
					break;
				}
				if (currentOrientation === 'S') {
					currentOrientation = 'W'
					break;
				}
				if (currentOrientation === 'W') {
					currentOrientation = 'N'
					break;
				}
				break;
			case 'L':
				if (currentOrientation === 'N'){
					currentOrientation = 'W'
					break;
				}
				if (currentOrientation === 'W') {
					currentOrientation = 'S';
					break;
				}
				if (currentOrientation === 'S') {
					currentOrientation = 'E'
					break;
				}
				if (currentOrientation === 'E') {
					currentOrientation = 'N'
					break;
				}
				break;
		}
	}
	console.log(robotPosition[0] + " " + robotPosition[1] + " " + currentOrientation + " " + wasLostString);
}

function isRobotLost (robotPosition) {
	if (robotPosition[0] > boardCoordinatesArray[0]) {
		console.log("Entra1");
		robotPosition[0]--;
		return true;
	}
	if (robotPosition[0] < 0) {
		console.log("Entra2");
		robotPosition[0] = 0;
		return true;
	}

	if (robotPosition[1] > boardCoordinatesArray[1]) {
		console.log("Entra3");
		robotPosition[1]--;
		return true;
	}
	if (robotPosition[1] < 0) {
		console.log("Entra4");
		robotPosition[1] = 0;
		return true;
	}

	console.log("Coordenada X1: " + robotPosition[0]);
	console.log("Coordenada Y1: " + robotPosition[1]);
	return false;
}

function getRobotPosition (string) {
	var robotsPosition = [];
	var counter = 0;

	if(string.length !== 5) { 
		console.log("Robot position too long/short");
		return;
	}

	for (var i = 0; i<string.length; i++){
		if (string[i] === ' ')
			continue;
		if (Number(string[i]))
			robotsPosition[counter++] = Number(string[i]);
		else
			robotsPosition[counter++] = (string[i]);
	}

	return robotsPosition;
}

function getBoardCoordinates (string) {
	var boardCooradinates = [];
	var counter = 0;
	if (string.length !== 3) { 
		console.log("Board coordinates too long/short");
		return;
	}
	for (var i = 0; i<string.length; i++){
		if (string[i] === ' ')
			continue;
		boardCooradinates[counter++] = Number(string[i]);
	}

	return boardCooradinates;
}

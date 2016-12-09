`
LINK: http://adventofcode.com/day/6
INPUT: http://adventofcode.com/day/6/input

--- Day 6: Probably a Fire Hazard ---

Because your neighbors keep defeating you in the holiday house decorating contest year after year, you've decided to deploy one million lights in a 1000x1000 grid.

Furthermore, because you've been especially nice this year, Santa has mailed you instructions on how to display the ideal lighting configuration.

Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include whether to turn on, turn off, or toggle various inclusive ranges given as coordinate pairs. Each coordinate pair represents opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers to 9 lights in a 3x3 square. The lights all start turned off.

To defeat your neighbors this year, all you have to do is set up your lights by doing the instructions Santa sent you in order.

For example:

turn on 0,0 through 999,999 would turn on (or leave on) every light.
toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.
turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.
After following the instructions, how many lights are lit?

Your puzzle answer was 543903.`

var input = document.body.textContent;
var data = input.split("\n");
//var data = ["toggle 461,550 through 564,900", "turn off 370,39 through 425,839", "turn on 599,989 through 806,993"];

var instructions = []; //301

for(var i = 0; i < data.length; i++){
var instruction = data[i].match(/\d+/g);
    if(data[i].match(/on/)) instruction.splice(0, 0, "on")
    else if(data[i].match(/off/)) instruction.splice(0, 0, "off")
    else if(data[i].match(/toggle/)) instruction.splice(0, 0, "toggle")

    instructions.push(instruction);
    console.log("Instructions populated.");
}

function Light(x, y, s) { // Constructor
    this.x = x;
    this.y = y;
    this.s = s;
}

var lights = []; // The grid

for(var x = 0; x < 1000; x++) {// Populates the grid
    for(y = 0; y < 1000; y++) {
        lights.push(new Light(x, y, false));
    }
    console.log("Grid populated.");
}

function turnOn(x1, y1, x2, y2) {
    for (var i = 0; i < lights.length; i++) {
        if(lights[i].x >= x1 && lights[i].x <= x2 
        && lights[i].y >= y1 && lights[i].y <= y2) {
            lights[i].s = true;
        }
        //console.log(lights[i]);
    }
    console.log("Turning on DONE");
}

function turnOff(x1, y1, x2, y2) {
    for (var i = 0; i < lights.length; i++) {
        if(lights[i].x >= x1 && lights[i].x <= x2 
        && lights[i].y >= y1 && lights[i].y <= y2) {
            lights[i].s = false;
        }
    }
    console.log("Turning off DONE");
}

function toggle(x1, y1, x2, y2) {
    for (var i = 0; i < lights.length; i++) {
        if(lights[i].x >= x1 && lights[i].x <= x2 
        && lights[i].y >= y1 && lights[i].y <= y2) {
            lights[i].s = !lights[i].s;
        }
    }
    console.log("Toggling DONE");
}

function countOn() {
    var count = 0;
    for(var i = 0; i < lights.length; i++){
        if(lights[i].s == true) count += 1;
    }
    console.log("Lights on: " + count);
}

console.log("For Loop start");
for(var z = 0; z < instructions.length; z++){
    var action = instructions[z][0];
    var x1 = instructions[z][1];
    var y1 = instructions[z][2];
    var x2 = instructions[z][3];
    var y2 = instructions[z][4];
    console.log(action, x1, y1, x2, y2);
    switch(action){
        case "on": 
            turnOn(x1, y1, x2, y2); 
            break;
        case "off": 
            turnOff(x1, y1, x2, y2); 
            break;
        case "toggle": 
            toggle(x1, y1, x2, y2); 
            break;
    }
    var progress = z / instructions.length;
    console.log(z + ". " + progress + "%");
    countOn();
}

countOn();

`--- Part Two ---

You just finish implementing your winning light pattern when you realize you mistranslated Santa's message from Ancient Nordic Elvish.

The light grid you bought actually has individual brightness controls; each light can have a brightness of zero or more. The lights all start at zero.

The phrase turn on actually means that you should increase the brightness of those lights by 1.

The phrase turn off actually means that you should decrease the brightness of those lights by 1, to a minimum of zero.

The phrase toggle actually means that you should increase the brightness of those lights by 2.

What is the total brightness of all lights combined after following Santa's instructions?

For example:

turn on 0,0 through 0,0 would increase the total brightness by 1.
toggle 0,0 through 999,999 would increase the total brightness by 2000000.
Your puzzle answer was 14687245.`

var input = document.body.textContent;
var data = input.split("\n");
//var data = ["toggle 23,54 through 56,78", "turn off 21,58 through 67,84", "turn on 19,51 through 60,72"];

var instructions = []; //301

for(var i = 0; i < data.length; i++){
var instruction = data[i].match(/\d+/g);
    if(data[i].match(/on/)) instruction.splice(0, 0, "on")
    else if(data[i].match(/off/)) instruction.splice(0, 0, "off")
    else if(data[i].match(/toggle/)) instruction.splice(0, 0, "toggle")

    instructions.push(instruction);
    console.log("Instructions populated.");
}

function Light(x, y, s, b) { // Constructor
    this.x = x; // x coordinate
    this.y = y; // y coordinate
    this.s = s; // status on/off
    this.b = b; // brightness
}

var lights = []; // The grid

for(var x = 0; x < 1000; x++) {// Populates the grid
    for(y = 0; y < 1000; y++) {
        lights.push(new Light(x, y, false, 0));
    }
    console.log("Grid populated.");
}

function turnOn(x1, y1, x2, y2) {
    for (var i = 0; i < lights.length; i++) {
        if(lights[i].x >= x1 && lights[i].x <= x2 
        && lights[i].y >= y1 && lights[i].y <= y2) {
            lights[i].s = true;
            lights[i].b += 1;
        }
    }
    console.log("Turning on DONE");
}

function turnOff(x1, y1, x2, y2) {
    for (var i = 0; i < lights.length; i++) {
        if(lights[i].x >= x1 && lights[i].x <= x2 
        && lights[i].y >= y1 && lights[i].y <= y2) {
            lights[i].s = false;
            lights[i].b -= lights[i].b == 0 ? 0 : 1 ;
        }
    }
    console.log("Turning off DONE");
}

function toggle(x1, y1, x2, y2) {
    for (var i = 0; i < lights.length; i++) {
        if(lights[i].x >= x1 && lights[i].x <= x2 
        && lights[i].y >= y1 && lights[i].y <= y2) {
            lights[i].s = !lights[i].s;
            lights[i].b += 2;
        }
    }
    console.log("Toggling DONE");
}

function countOn() {
    var count = 0;
    for(var i = 0; i < lights.length; i++){
        if(lights[i].s == true) count += 1;
    }
    console.log("Lights on: " + count);
}

function checkBrightness() {
    var brightness = 0;
    for(var i = 0; i < lights.length; i++){
        brightness += lights[i].b;
    }
    console.log("Total Brightness: " + brightness);
}

console.log("For Loop start");
for(var z = 0; z < instructions.length; z++){
    var action = instructions[z][0];
    var x1 = instructions[z][1];
    var y1 = instructions[z][2];
    var x2 = instructions[z][3];
    var y2 = instructions[z][4];
    console.log(action, x1, y1, x2, y2);
    switch(action){
        case "on": turnOn(x1, y1, x2, y2); break;
        case "off": turnOff(x1, y1, x2, y2); break;
        case "toggle": toggle(x1, y1, x2, y2); break;
    }
    countOn(); checkBrightness();
}


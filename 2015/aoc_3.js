`
LINK: http://adventofcode.com/day/3
INPUT: http://adventofcode.com/day/3/input

--- Day 3: Perfectly Spherical Houses in a Vacuum ---

Santa is delivering presents to an infinite two-dimensional grid of houses.

He begins by delivering a present to the house at his starting location, and then an elf at the North Pole calls him via radio and tells him where to move next. Moves are always exactly one house to the north (^), south (v), east (>), or west (<). After each move, he delivers another present to the house at his new location.

However, the elf back at the north pole has had a little too much eggnog, and so his directions are a little off, and Santa ends up visiting some houses more than once. How many houses receive at least one present?

For example:

> delivers presents to 2 houses: one at the starting location, and one to the east.
^>v< delivers presents to 4 houses in a square, including twice to the house at his starting/ending location.
^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2 houses.
Your puzzle answer was 2081.`;

var input = document.body.textContent;

var data = input.split("");

function getCoordinates(array) {
    var x = 0;
    var y = 0;
    var coordinates = [];
    for (i = 0; i < array.length; i++) {
        switch (array[i]) {
            case "^": // ^
                y += 1;
                break;
            case ">": // >
                x += 1;
                break;
            case "<": // <
                x -= 1;
                break;
            case "v": // v
                y -= 1;
                break;
        }
        coordinates.push([x, y]);
    }
    return coordinates;
}

function getCounts(coordinates) {
    var counts = {};
    for (var i = 0; i < coordinates.length; i++) {
        var num = coordinates[i];
        counts[num] = (counts[num] || 0) + 1;
        // counts[num] = counts[num] ? counts[num]+1 : 1;
    }
    return counts;
}

function numberOfHouses(array) {
    var houses = getCounts(getCoordinates(array));
    var occ = Object.keys(houses).map(function (key) {
        return houses[key];
    });
    return occ.length + 1;
}

console.log(numberOfHouses(data));

`Day 3 - Part 1 - Without functions ---------------------------------------------------------------------`;

//var input = document.getElementById("text").innerHTML;
var input = document.body.textContent;

var data = input.split("");

var x = 0;
var y = 0;

var houses = [];

for (i = 0; i < data.length; i++) {
    switch (data[i]) {
        case "^": // ^
            y += 1;
            break;
        case ">": // >
            x += 1;
            break;
        case "<": // <
            x -= 1;
            break;
        case "v": // v
            y -= 1;
            break;
    }
    houses.push([x, y]);
}

var counts = {};

for (var i = 0; i < houses.length; i++) {
    var num = houses[i];
    counts[num] = (counts[num] || 0) + 1;
    // counts[num] = counts[num] ? counts[num]+1 : 1;
}

console.log(counts);

var occ = Object.keys(counts).map(function (key) {
    return counts[key];
});

console.log(occ.length + 1); // +1 is the starting house 0,0

`--- Part Two ---

The next year, to speed up the process, Santa creates a robot version of himself, Robo-Santa, to deliver presents with him.

Santa and Robo-Santa start at the same location (delivering two presents to the same starting house), then take turns moving based on instructions from the elf, who is eggnoggedly reading from the same script as the previous year.

This year, how many houses receive at least one present?

For example:

^v delivers presents to 3 houses, because Santa goes north, and then Robo-Santa goes south.
^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back where they started.
^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction and Robo-Santa going the other.
Your puzzle answer was 2341.`;

//var input = document.getElementById("text").innerHTML;
var input = document.body.textContent;

var data = input.split("");

var santa = [];

for (i = 0; i < data.length; i += 2) {
    santa.push(data[i]);
}

var robo = [];

for (i = 1; i < data.length; i += 2) {
    robo.push(data[i]);
}

function getCoordinates(array) {
    var x = 0;
    var y = 0;
    var coordinates = [];
    for (i = 0; i < array.length; i++) {
        switch (array[i]) {
            case "^": // ^
                y += 1;
                break;
            case ">": // >
                x += 1;
                break;
            case "<": // <
                x -= 1;
                break;
            case "v": // v
                y -= 1;
                break;
        }
        coordinates.push([x, y]);
    }
    return coordinates;
}

var both = getCoordinates(santa).concat(getCoordinates(robo)); // The coordinates are merged, which is different from simply adding adding the results of numberOfHouses because there are overlaps.

function getCounts(coordinates) {
    var counts = {};
    for (var i = 0; i < coordinates.length; i++) {
        var num = coordinates[i];
        counts[num] = (counts[num] || 0) + 1;
        // counts[num] = counts[num] ? counts[num]+1 : 1;
    }
    return counts;
}

console.log(getCounts(both));

function numberOfHouses(array) {
    var houses = getCounts(getCoordinates(array));
    var occ = Object.keys(houses).map(function (key) {
        return houses[key];
    });
    return occ.length + 1; // +1 is the starting house 0,0
}

function numberOfHousesBoth(array) {
    var houses = getCounts(array);
    var occ = Object.keys(houses).map(function (key) {
        return houses[key];
    });
    return occ.length + 1; // +1 is the starting house 0,0
}

console.log(numberOfHousesBoth(both) - 1); //-1 because they start from the same place i.e. two 0,0 coordinates.

`console.log("Data: " + numberOfHouses(data));

console.log("Santa: " + numberOfHouses(santa));
console.log("Robo: " + numberOfHouses(robo));
var total = numberOfHouses(santa) + numberOfHouses(robo); 
console.log("Total: " + total);`;

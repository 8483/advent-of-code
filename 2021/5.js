// first part: 1 hour 30 min
// second part: 1 hour 30 min

let fs = require("fs");

let inputFile = `5.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

// data = ["0,9 -> 5,9", "8,0 -> 0,8", "9,4 -> 3,4", "2,2 -> 2,1", "7,0 -> 7,4", "6,4 -> 2,0", "0,9 -> 2,9", "3,4 -> 1,4", "0,0 -> 8,8", "5,5 -> 8,2"];

let xMax = 0,
    yMax = 0;

let coordinates = data.map((item) => {
    let coords = item.split(" -> ");
    let left = coords[0].split(",");
    let right = coords[1].split(",");

    let x1 = +left[0];
    let y1 = +left[1];

    let x2 = +right[0];
    let y2 = +right[1];

    // determine grid
    xMax = x1 > xMax ? x1 : xMax;
    yMax = y1 > yMax ? y1 : yMax;

    xMax = x2 > xMax ? x2 : xMax;
    yMax = y2 > yMax ? y2 : yMax;

    // direction
    let direction = null;
    if (x1 == x2) direction = "vertical";
    if (y1 == y2) direction = "horizontal";
    if (Math.abs(x1 - x2) == Math.abs(y1 - y2)) direction = "diagonal";

    let xDirection = x1 < x2 ? "right" : "left";
    let yDirection = y1 < y2 ? "down" : "up";

    let xFrom = x1 < x2 ? x1 : x2;
    let xTo = x1 > x2 ? x1 : x2;

    let yFrom = y1 < y2 ? y1 : y2;
    let yTo = y1 > y2 ? y1 : y2;

    return {
        direction,
        x1,
        x2,
        xDirection,
        xFrom,
        xTo,
        y1,
        y2,
        yDirection,
        yFrom,
        yTo,
    };
});

let hvPoints = []; // horizontal, vertical
let dPoints = []; // diagonal

coordinates.forEach((item) => {
    if (item.direction == "horizontal") {
        for (let x = item.xFrom; x <= item.xTo; x++) {
            hvPoints.push(`x${x}y${item.yFrom}`);
        }
    }

    if (item.direction == "vertical") {
        for (let y = item.yFrom; y <= item.yTo; y++) {
            hvPoints.push(`x${item.xFrom}y${y}`);
        }
    }

    if (item.direction == "diagonal") {
        for (let i = 0; i < Math.abs(item.xFrom - item.xTo) + 1; i++) {
            if (item.xDirection == "right") {
                if (item.yDirection == "down") {
                    dPoints.push(`x${item.x1 + i}y${item.y1 + i}`);
                } else {
                    dPoints.push(`x${item.x1 + i}y${item.y1 - i}`);
                }
            } else {
                if (item.yDirection == "down") {
                    dPoints.push(`x${item.x1 - i}y${item.y1 + i}`);
                } else {
                    dPoints.push(`x${item.x1 - i}y${item.y1 - i}`);
                }
            }
        }
    }
});

// SLOW AF
// let uniqueHVPoints = [...new Set(hvPoints)];
// let dangerHVPoints = 0;
// uniqueHVPoints.forEach((point) => {
//     if (hvPoints.filter((p) => p == point).length >= 2) dangerHVPoints++;
// });
// console.log(dangerHVPoints);

let hvCounts = {};
hvPoints.forEach((p) => {
    if (hvCounts[p]) {
        hvCounts[p]++;
    } else {
        hvCounts[p] = 1;
    }
});

let hvCount = 0;
Object.keys(hvCounts).forEach((k) => {
    if (hvCounts[k] >= 2) hvCount++;
});

console.log(hvCount);

// SLOW AF
// let points = [...hvPoints, ...dPoints];
// let uniquePoints = [...new Set(points)];
// let dangerPoints = 0;
// uniquePoints.forEach((point) => {
//     if (points.filter((p) => p == point).length >= 2) dangerPoints++;
// });
// console.log(dangerPoints);

let hvdPoints = [...hvPoints, ...dPoints];
let hvdCounts = {};
hvdPoints.forEach((p) => {
    if (hvdCounts[p]) {
        hvdCounts[p]++;
    } else {
        hvdCounts[p] = 1;
    }
});

let hvdCount = 0;
Object.keys(hvdCounts).forEach((k) => {
    if (hvdCounts[k] >= 2) hvdCount++;
});

console.log(hvdCount);

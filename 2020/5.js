let fs = require("fs");

let inputFile = `5.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let raw = input.split(/\r?\n/);

// let raw = [
//     "FBFBBFFRLR", // row 44, column 5, seat ID 357
//     "BFFFBBFRRR", // row 70, column 7, seat ID 567
//     "FFFBBBFRRR", // row 14, column 7, seat ID 119
//     "BBFFBBFRLL", // row 102, column 4, seat ID 820
// ];

let seatIds = [];

raw.map((item) => {
    let rowStartIndex = 0;
    let rowEndIndex = 127;
    let seatLowerIndex = 0;
    let seatUpperIndex = 7;

    item.split("").map((instruction) => {
        switch (instruction) {
            case "F":
                rowEndIndex = Math.ceil(rowEndIndex - (rowEndIndex - rowStartIndex) / 2);
                break;

            case "B":
                rowStartIndex = Math.ceil(rowEndIndex - (rowEndIndex - rowStartIndex) / 2);
                break;

            case "L":
                seatUpperIndex = seatUpperIndex - Math.ceil((seatUpperIndex - seatLowerIndex) / 2);
                break;

            case "R":
                seatLowerIndex = seatUpperIndex - Math.floor((seatUpperIndex - seatLowerIndex) / 2);
                break;
        }
    });
    let seatId = parseInt(rowStartIndex * 8 + seatUpperIndex);
    seatIds.push(seatId);
});

console.log(`Max seat ID: ${Math.max(...seatIds)}`);

let sortedSeatIds = seatIds.sort((a, b) => a - b);
sortedSeatIds.map((seatId, i) => {
    let nextSeatId = sortedSeatIds[i + 1];
    if (nextSeatId - seatId > 1) {
        console.log(`Missing seat ID: ${seatId + 1}`);
    }
});

console.log("reading: 11 min, first: 36 min, second: 10 min, total: 57 min");

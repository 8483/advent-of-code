// 45 min
let fs = require("fs");

let inputFile = `11.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let raw = input.split(/\r?\n/);

// let raw = ["L.LL.LL.LL", "LLLLLLL.LL", "L.L.L..L..", "LLLL.LL.LL", "L.LL.LL.LL", "L.LLLLL.LL", "..L.L.....", "LLLLLLLLLL", "L.LLLLLL.L", "L.LLLLL.LL"];

// console.log(raw);

let seats = raw;
let round = 0;

function occupy(seats) {
    console.log("\n");
    console.log("round", round);
    console.log("seats");
    console.log(seats);

    let newSeats = [];
    for (let i = 0; i < seats.length; i++) {
        let row = seats[i];
        let newRow = "";
        for (let j = 0; j < row.length; j++) {
            let seat = seats[i][j];
            if (seat == ".") {
                newRow += ".";
            } else {
                let state = freeAdjacentSeats(seats, i, j);

                if (seat == "L" && state.free == state.seats) {
                    newRow += "#";
                } else if (seat == "#" && state.occupied >= 4) {
                    newRow += "L";
                } else {
                    newRow += seat;
                }
            }
        }
        newSeats.push(newRow);
    }
    // seats = newSeats
    round++;

    if (isSameArray(seats, newSeats)) {
        let occupiedSeats = seats
            .join("")
            .split("")
            .filter((seat) => seat == "#");
        console.log("occupied seats: ", occupiedSeats.length);
    } else {
        occupy(newSeats);
    }
}

occupy(seats);

function freeAdjacentSeats(seats, row, column) {
    let state = {
        seats: 0,
        free: 0,
        occupied: 0,
    };

    function checkAdjacentSeat(row, column) {
        if (seats[row]) {
            if (seats[row][column]) {
                let adjacentSeat = seats[row][column];
                // console.log(seat, row, column);
                if (adjacentSeat == "L") {
                    state.seats++;
                    state.free++;
                } else if (adjacentSeat == "#") {
                    state.seats++;
                    state.occupied++;
                }
            }
        }
    }

    checkAdjacentSeat(row, column - 1); // w
    checkAdjacentSeat(row, column + 1); // e
    checkAdjacentSeat(row - 1, column); // n
    checkAdjacentSeat(row + 1, column); // s
    checkAdjacentSeat(row - 1, column - 1); // nw
    checkAdjacentSeat(row - 1, column + 1); // ne
    checkAdjacentSeat(row + 1, column - 1); // sw
    checkAdjacentSeat(row + 1, column + 1); // se

    // console.log(state);
    return state;
}

function isSameArray(oldSeats, newSeats) {
    let isSame = true;
    for (let i = 0; i < oldSeats.length; i++) {
        if (oldSeats[i] !== newSeats[i]) {
            isSame = false;
            break;
        }
    }
    return isSame;
}

// first part: 1 hour 15 min
// second part: 26 min

let fs = require("fs");

let inputFile = `4.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

let numbers = data.shift().split(",");
data.shift(); // remove first empty row

// prepare boards
let boards = [];
let temp = [];
for (let i = 0; i < data.length; i++) {
    let item = data[i];

    if (i == data.length - 1) boards.push(temp); // last board

    if (!item == "") {
        temp.push(item.split(" ").filter((char) => char != ""));
    } else {
        boards.push(temp);
        temp = [];
    }
}

function drawNumber(number) {
    boards.forEach((board, b) => {
        board.forEach((row, r) => {
            row.forEach((n, i) => {
                if (n == number) {
                    boards[b][r][i] = `@${n}`;
                }
            });
        });
    });
}

function checkBoards() {
    let winningBoards = [];
    for (let i = 0; i < boards.length; i++) {
        let board = boards[i];
        if (isBoardWinner(board)) {
            winningBoards.push(board);
            boards.splice(i, 1); // remove winning board
        }
    }
    return winningBoards;
}

function isBoardWinner(board) {
    let i = 0;
    while (i < 5) {
        let row = board[i];
        let column = [board[0][i], board[1][i], board[2][i], board[3][i], board[4][i]];

        let isRowWinner = isArrayWinner(row);
        let isColumnWinner = isArrayWinner(column);

        if (isColumnWinner || isRowWinner) return true;

        i++;
    }
}

function isArrayWinner(arr) {
    return arr.every((char) => char.includes("@"));
}

function getUnmarkedSumForBoard(board) {
    return board
        .join()
        .split(",")
        .filter((char) => !char.includes("@"))
        .map((char) => +char)
        .reduce((acc, num) => {
            return acc + num;
        });
}

let i = 0,
    winners = [];

while (i < numbers.length) {
    let number = numbers[i];

    drawNumber(number);
    let boards = checkBoards();

    if (boards.length > 0) {
        boards.forEach((board) => {
            winners.push({
                number,
                board,
            });
        });
    }

    i++;
}

let firstWinner = winners[0];
console.log(firstWinner);
console.log(firstWinner.number * getUnmarkedSumForBoard(firstWinner.board));

let lastWinner = winners[winners.length - 1];
console.log(lastWinner);
console.log(lastWinner.number * getUnmarkedSumForBoard(lastWinner.board));

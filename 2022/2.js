// first: 23 min
// second: 26 min
// total: 49

let fs = require("fs");

let inputFile = `2.txt`;
let input = fs.readFileSync(inputFile, "utf8");

let data = input.split(/\r?\n/);

console.log(data);

let outcomes = {
    rock: { points: 1, beats: "scissors", loses: "paper" },
    paper: { points: 2, beats: "rock", loses: "scissors" },
    scissors: { points: 3, beats: "paper", loses: "rock" },
};

let firstTotal = 0;
let secondTotal = 0;

data = data.forEach((item) => {
    let parts = item.split(" ");

    let opponent = parts[0] == "A" ? "rock" : parts[0] == "B" ? "paper" : "scissors";
    let you = parts[1] == "X" ? "rock" : parts[1] == "Y" ? "paper" : "scissors";
    let outcome = parts[1] == "X" ? "lose" : parts[1] == "Y" ? "draw" : "win";

    let first = outcomes[you].points;

    if (you == opponent) {
        first += 3; // draw
    } else if (outcomes[you].beats == opponent) {
        first += 6; // win
    }

    firstTotal += first;

    let second = 0;

    if (outcome == "win") {
        second = 6 + outcomes[outcomes[opponent].loses].points;
    } else if (outcome == "draw") {
        second = 3 + outcomes[opponent].points;
    } else {
        second = outcomes[outcomes[opponent].beats].points;
    }

    secondTotal += second;

    // console.log(first);
    // console.log(second);
    // console.log("\n");
});

console.log(firstTotal);
console.log(secondTotal);

// first part: 20 min
// second part: 5 min

let fs = require("fs");

let inputFile = `7.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

data = data[0].split(",").map((n) => +n);

// data = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

let max = Math.max(...data);

let positions = [];

for (let i = 1; i <= max; i++) {
    positions.push(i);
}

let moves = [];

positions.forEach((position) => {
    let fuel = 0;
    let fuel2 = 0;

    data.forEach((crab) => {
        let distance = Math.abs(position - crab);
        fuel += distance;
        fuel2 += (distance * (distance + 1)) / 2; // triangle number i.e. factorial but with addition
    });

    moves.push({ position, fuel, fuel2 });
});

moves.sort((a, b) => {
    if (a.fuel < b.fuel) return -1;
    return a.fuel > b.fuel ? 1 : 0;
});

console.log(moves[0].fuel);

moves.sort((a, b) => {
    if (a.fuel2 < b.fuel2) return -1;
    return a.fuel2 > b.fuel2 ? 1 : 0;
});

console.log(moves[0].fuel2);

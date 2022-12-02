// first: 6 min
// second: 3 min
// total: 9 min

let fs = require("fs");

let inputFile = `1.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

data = data.map((item) => parseInt(item));

let calories = [];

let sum = 0;

for (let i = 0; i < data.length; i++) {
    let currentRow = data[i];

    if (currentRow) {
        sum += currentRow;
    } else {
        calories.push(sum);
        sum = 0;
    }
}

console.log(calories);

console.log(Math.max(...calories));

let sortedByHighest = calories.sort((a, b) => {
    return b - a;
});

console.log(sortedByHighest[0] + sortedByHighest[1] + sortedByHighest[2]);

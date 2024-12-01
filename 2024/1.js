// first: 07:46 - 07:59 = 13 min
// second: 07:59 - 08:04 = 5 min
// total: 18 min

let fs = require("fs");

let inputFile = `1.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

console.log(data);

let leftColumn = [],
    rightColumn = [];

for (let i = 0; i < data.length; i++) {
    let line = data[i];

    let [left, right] = line.split("   ");

    leftColumn.push(+left);
    rightColumn.push(+right);
}

leftColumn.sort((a, b) => {
    return a - b;
});

rightColumn.sort((a, b) => {
    return a - b;
});

console.log(leftColumn, rightColumn);

let totalDistance = 0;
let similarityScore = 0;

for (let i = 0; i < leftColumn.length; i++) {
    let left = leftColumn[i];

    totalDistance += Math.abs(left - rightColumn[i]);
    similarityScore += left * rightColumn.filter((n) => n === left).length;
}

console.log(totalDistance);
console.log(similarityScore);

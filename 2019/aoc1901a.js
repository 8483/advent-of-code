let fs = require("fs");

let inputFile = `aoc1901.txt`
let input = fs.readFileSync(inputFile, 'utf8');
let data = input.split(/\r?\n/);

data = data.map(item => parseInt(item))

let total = 0;

data.map(item => {
    total += Math.floor(item / 3) - 2;
})

console.log(total);
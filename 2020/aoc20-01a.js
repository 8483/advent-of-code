// 7 min
let fs = require("fs");

let inputFile = `aoc2001.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

data = data.map((item) => parseInt(item));

data.map((a) => {
    data.map((b) => {
        if (a + b === 2020) {
            console.log(a * b);
        }
    });
});

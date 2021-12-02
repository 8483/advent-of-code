// 10 min
let fs = require("fs");

let inputFile = `1.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

data = data.map((item) => parseInt(item));

let count = 0;
let windowCount = 0;

for (let i = 0; i < data.length; i++) {
    let previous = data[i - 1];
    let current = data[i];

    if (current > previous) {
        count++;
    }

    let windowOne = current + data[i + 1] + data[i + 2];
    let windowTwo = data[i + 1] + data[i + 2] + data[i + 3];

    if (windowTwo > windowOne) {
        windowCount++;
    }
}

console.log(count);
console.log(windowCount);

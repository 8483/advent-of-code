let fs = require("fs");

let inputFile = `aoc1902.txt`
let input = fs.readFileSync(inputFile, 'utf8');
let data = input.split(/\r?\n/);

data = data[0].split(",").map(item => parseInt(item))

// data = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]
// data = [2, 4, 4, 5, 99, 0
// data = [1, 1, 1, 4, 99, 5, 6, 0, 99]

// console.log(data)

data[1] = 12
data[2] = 2

let i = 0;
let result = null;

while (data[i] !== 99) {

    let a = data[i + 1]
    let b = data[i + 2]
    let c = data[i + 3]

    // console.log(`i: ${i} - op: ${data[i]} - ${a}, ${b}, ${c}`)

    if (data[i] == 1) {
        data[c] = data[a] + data[b];
        result = data[c]
    } else {
        data[c] = data[a] * data[b];
        result = data[c]
    }
    // console.log(data)
    i += 4;
}

console.log(data[0])
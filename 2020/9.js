// 45 min
let fs = require("fs");

let inputFile = `9.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let raw = input.split(/\r?\n/);

let data = raw.map((number) => parseInt(number));

function decrypt(data, preambleLength) {
    let i = preambleLength;

    while (i < data.length) {
        let number = data[i];
        let preamble = data.slice(i - preambleLength, i);
        let sums = getArraySums(preamble);
        if (sums.includes(number)) {
            i++;
        } else {
            console.log(`part one: ${number}`);
            console.log(`part two: ${findNumbersResultingInSum(number)}`);
            break;
        }
    }
}

function getArraySums(array) {
    let sums = [];
    array.map((a) => {
        array.map((b) => {
            if (a != b) {
                sums.push(a + b);
            }
        });
    });
    return sums;
}

function findNumbersResultingInSum(sum) {
    for (let i = 0; i < data.length; i++) {
        let accumulator = data[i];
        for (let j = i + 1; j < data.length; j++) {
            accumulator += data[j];
            if (accumulator == sum) {
                let range = data.slice(i, j + 1);
                return Math.min(...range) + Math.max(...range);
            }
        }
    }
}

decrypt(data, 25);

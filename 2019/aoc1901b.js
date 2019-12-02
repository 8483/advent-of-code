let fs = require("fs");

let inputFile = `aoc1901.txt`
let input = fs.readFileSync(inputFile, 'utf8');
let data = input.split(/\r?\n/);

// let data = [14, 1969, 100756]

data = data.map(item => parseInt(item))

let total = 0;

data.map(item => {
    console.log(item)
    let tempValue = item;
    let tempTotal = 0;
    while (tempValue > 0) {
        let newTempValue = Math.floor(tempValue / 3) - 2;
        tempTotal += newTempValue > 0 ? newTempValue : 0;
        console.log(`tempValue: ${tempValue}, newTempValue: ${newTempValue}, tempTotal: ${tempTotal}`)
        tempValue = newTempValue;
    }
    console.log(`Final tempTotal: ${tempTotal} \n`);
    total += tempTotal;
})

console.log(total);
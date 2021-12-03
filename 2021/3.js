// 1 hour
let fs = require("fs");

let inputFile = `3.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

// data = ["00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010"];

let gamma = "";
let epsilon = "";

// 15 min
for (let i = 0; i < data[0].length; i++) {
    let count1 = 0,
        count0 = 0;

    for (let j = 0; j < data.length; j++) {
        let bit = data[j][i];

        if (bit == "1") {
            count1++;
        } else {
            count0++;
        }
    }

    if (count1 > count0) {
        gamma += "1";
        epsilon += "0";
    } else {
        gamma += "0";
        epsilon += "1";
    }
}

gamma = parseInt(gamma, 2);
epsilon = parseInt(epsilon, 2);
console.log(gamma * epsilon);

// 45 min

let generator = data;

for (let i = 0; i < generator[0].length; i++) {
    if (generator.length == 1) break;
    let count1 = 0,
        count0 = 0;

    for (let j = 0; j < generator.length; j++) {
        let bit = generator[j][i];

        if (bit == "1") {
            count1++;
        } else {
            count0++;
        }
    }

    if (count1 > count0 || count1 == count0) {
        generator = generator.filter((item) => item[i] == "1");
    } else {
        generator = generator.filter((item) => item[i] == "0");
    }
}

let scrubber = data;

for (let i = 0; i < scrubber[0].length; i++) {
    if (scrubber.length == 1) break;
    let count1 = 0,
        count0 = 0;

    for (let j = 0; j < scrubber.length; j++) {
        let bit = scrubber[j][i];

        if (bit == "1") {
            count1++;
        } else {
            count0++;
        }
    }

    if (count1 > count0 || count1 == count0) {
        scrubber = scrubber.filter((item) => item[i] == "0");
    } else {
        scrubber = scrubber.filter((item) => item[i] == "1");
    }
}

let generatorRating = parseInt(generator[0], 2);
let scrubberRating = parseInt(scrubber[0], 2);

console.log(generatorRating * scrubberRating);

// first: 24 min
// second: 21 min
// total: 45 min

let fs = require("fs");

let inputFile = `4.txt`;
let input = fs.readFileSync(inputFile, "utf8");

let data = input.split(/\r?\n/);

let foo = 0;
let bar = 0;

data.forEach((row) => {
    let [first, second] = row.split(",");

    // ff = firstFrom, ft = firstTo
    let [ff, ft] = first.split("-");

    // sf = secondFrom, st = secondTo
    let [sf, st] = second.split("-");

    let linr = +ff >= +sf && +ft <= +st;
    let rinl = +sf >= +ff && +st <= +ft;

    if (linr || rinl) {
        foo++;
    }

    let one = +sf >= +ff && +sf <= +ft;
    let two = +st >= +ff && +st <= +ft;
    let three = +ff >= +sf && +ff <= +st;
    let four = +ft >= +sf && +ft <= +st;

    if (one || two || three || four) {
        bar++;
    }
});

console.log(foo);
console.log(bar);

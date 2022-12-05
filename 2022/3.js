// first: 36 min
// second: 24 min
// total: 60 min

let fs = require("fs");

let inputFile = `3.txt`;
let input = fs.readFileSync(inputFile, "utf8");

let data = input.split(/\r?\n/);

let pairs = data.map((item) => {
    return [item.substring(0, item.length / 2), item.substring(item.length / 2, item.length)];
});

console.log(data);

let lower = "abcdefghijklmnopqrstuvwxyz";
let alpha = lower + lower.toUpperCase();

console.log(alpha);

let priority = 0;

pairs.forEach((item) => {
    for (let i = 0; i < item[0].length; i++) {
        let char = item[0][i];

        if (item[1].includes(char)) {
            priority += alpha.indexOf(char) + 1;

            break;
        }
    }
});

console.log(priority);

let badgePriority = 0;

while (data.length > 0) {
    let elves = [data.shift(), data.shift(), data.shift()];

    for (let i = 0; i < elves[0].length; i++) {
        let char = elves[0][i];

        if (elves[1].includes(char) && elves[2].includes(char)) {
            badgePriority += alpha.indexOf(char) + 1;
            break;
        }
    }
}

console.log(badgePriority);

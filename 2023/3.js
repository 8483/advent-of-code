// first: 10:58 - 12:46 = 1 hr 48 min
// second: 12:46 - 13:31 = 45 min
// total: 2 hr 33 min

let fs = require("fs");

let inputFile = `3.txt`;
let input = fs.readFileSync(inputFile, "utf8");

// input = `
// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..
// `;

let data = input.split(/\r?\n/).filter((item) => item != "");

// console.log(data);

function getValueAtCoordinates(y, x) {
    return [data[y] && data[y][x] ? data[y][x] : ".", y, x];
}

function getNeighbors(y, x) {
    let n = getValueAtCoordinates(y - 1, x);
    let ne = getValueAtCoordinates(y - 1, x + 1);
    let e = getValueAtCoordinates(y, x + 1);
    let se = getValueAtCoordinates(y + 1, x + 1);
    let s = getValueAtCoordinates(y + 1, x);
    let sw = getValueAtCoordinates(y + 1, x - 1);
    let w = getValueAtCoordinates(y, x - 1);
    let nw = getValueAtCoordinates(y - 1, x - 1);

    let neighbors = [n, ne, e, se, s, sw, w, nw];

    return neighbors;
}

function checkNeighborsForSymbol(neighbors) {
    return neighbors.filter((n) => n[0] != "." && isNaN(n[0]))[0];
}

let parts = [];

data.forEach((string, y) => {
    let num = "",
        symbol = "";

    console.log(string, string.length);

    string.split("").forEach((char, x) => {
        let neighbors = getNeighbors(y, x);

        // console.log(`${y}${x} - ${char} - ${neighbors.join("")}`);

        let isLast = x + 1 == string.length;

        if (isNaN(char) || isLast) {
            if (!isNaN(char)) {
                num += char;
            }

            if (num && symbol) {
                parts.push([y, x, parseInt(num), symbol]);
            }
            num = "";
            symbol = "";
        } else {
            num += char;
            let sym = checkNeighborsForSymbol(neighbors)?.join("");
            if (sym) {
                symbol = sym;
            }
        }
    });
});

parts.forEach((item) => console.log(item));

let sum = 0;
parts.forEach((item) => (sum += item[2]));

console.log(sum);

let partsWithGears = parts.filter((item) => item[3].includes("*"));

let gearIds = [...new Set(partsWithGears.map((item) => item[3]))];

console.log(gearIds);

let sum2 = 0;

gearIds.forEach((gearId) => {
    let [part1, part2] = partsWithGears.filter((part) => part[3] == gearId);

    if (part1 && part2) {
        sum2 += part1[2] * part2[2];
    }
});

console.log(sum2);

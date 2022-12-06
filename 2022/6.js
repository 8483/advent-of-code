// first: 06:15 - 06:32 = 16 min
// second: 06:32 - 06:50 = 18 min
// total: 34 min

let fs = require("fs");

let inputFile = `6.txt`;
let input = fs.readFileSync(inputFile, "utf8");

let data = input.split(/\r?\n/);

data = data[0];

function findMarker(stringLength) {
    let charFromIndex = 0,
        charToIndex = stringLength;

    while (charToIndex <= data.length) {
        let string = data.substring(charFromIndex, charToIndex);

        if (areAllCharsUnique(string)) {
            console.log(charToIndex);
            break;
        }

        charFromIndex++, charToIndex++;
    }
}

function areAllCharsUnique(string) {
    let bool = true;

    let chars = string.split("");

    let graph = {};

    chars.forEach((char) => {
        if (!graph[char]) {
            graph[char] = 1;
        } else {
            graph[char]++;
        }
    });

    let keys = Object.keys(graph);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (graph[key] > 1) {
            bool = false;
            break;
        }
    }

    return bool;
}

findMarker(4);
findMarker(14);

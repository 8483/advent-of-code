// first part: 20 min
// second part: 1 hour 20 min

let fs = require("fs");

let inputFile = `6.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

data = data[0].split(",").map((n) => +n);

function getFish(days) {
    //        [3, 4, 3, 1, 2]
    //        [1, 2, 3, 3, 4]
    //        [0, 1, 1, 2, 1, 0, 0]
    let fishCounts = [0, 0, 0, 0, 0, 0, 0];
    let counter = [0, 1, 2, 3, 4, 5, 6];
    let bornCounts = [0, 0, 0];

    // initialize fishCounts
    data.forEach((n) => {
        fishCounts[n]++;
    });

    let day = 0;
    let total = 0;

    while (day < days) {
        for (let j = 0; j < counter.length; j++) {
            if (counter[j] == 6) {
                fishCounts[j] += bornCounts[0];
            }
        }

        bornCounts[0] = bornCounts[1];
        bornCounts[1] = bornCounts[2];

        for (let i = 0; i < counter.length; i++) {
            if (counter[i] == 0) {
                counter[i] = 6;

                bornCounts[2] = fishCounts[i];
            } else {
                counter[i]--;
            }
        }

        total = fishCounts.reduce((a, b) => a + b) + bornCounts.reduce((a, b) => a + b);
        console.log(day + 1, "fishCounts", fishCounts, "counter", counter, "bornCounts", bornCounts, "total", total);

        day++;
    }
}

getFish(80);
getFish(256);

// 45 min
let fs = require("fs");

let inputFile = `10.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let raw = input.split(/\r?\n/);

// let raw = ["16", "10", "15", "5", "1", "11", "7", "19", "6", "12", "4"];

// let raw = ["28", "33", "18", "42", "31", "14", "46", "20", "48", "47", "24", "23", "49", "45", "19", "38", "39", "11", "1", "32", "25", "35", "8", "17", "7", "9", "4", "2", "34", "10", "3"];

let adaptersTemp = raw.map((adapter) => parseInt(adapter));
let adapters = adaptersTemp.sort((a, b) => a - b);

let deviceAdapter = Math.max(...adapters) + 3;
adapters.push(deviceAdapter);
adapters.unshift(0);

function joltDifferencesCount(adapters) {
    console.log(adapters);

    let oneJoltDifferences = 0;
    let twoJoltDifferences = 0;
    let threeJoltDifferences = 0;
    let output = 0;

    for (let i = 0; i < adapters.length; i++) {
        adapter = adapters[i];

        // console.log(`adapter: ${adapter}`);

        let difference = adapter - output;

        // console.log("output", output, "adapter", adapter, "difference", difference);

        switch (difference) {
            case 1:
                oneJoltDifferences++;
                break;
            case 2:
                twoJoltDifferences++;
                break;
            case 3:
                threeJoltDifferences++;
                break;
        }

        output = adapter;
    }

    // console.log(oneJoltDifferences, twoJoltDifferences, threeJoltDifferences);
    console.log("part one: ", oneJoltDifferences * threeJoltDifferences); // 1820
}

joltDifferencesCount(adapters); // one 7, three 5

function getArrangements(adapters) {
    console.log(adapters);
    let ranges = [];
    let holes = [];
    // let arrangements = 0;

    // arrangements++;

    let i = 0;

    while (i < adapters.length) {
        adapter = adapters[i];

        if (adapters.includes(adapter + 1) && adapters.includes(adapter + 2) && !adapters.includes(adapter + 3)) {
            console.log("adapter", adapter);
            ranges.push([adapters[i], adapters[i + 1], adapters[i + 2]]);
            holes.push([adapters[i + 1]]);
            console.log("ranges", ranges);
            console.log("holes", holes);
            console.log("\n");
            i += 2;
        } else if (adapters.includes(adapter + 1) && adapters.includes(adapter + 2) && adapters.includes(adapter + 3)) {
            console.log("adapter", adapter);
            ranges.push([adapters[i], adapters[i + 1], adapters[i + 2], adapters[i + 3]]);
            holes.push([adapters[i + 1], adapters[i + 2]]);
            console.log("ranges", ranges);
            console.log("holes", holes);
            console.log("\n");
            i += 3;
        } else {
            i++;
        }
    }

    // console.log("arrangements", arrangements);
}

getArrangements(adapters);

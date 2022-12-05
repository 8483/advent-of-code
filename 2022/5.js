// first: 1 hr 17 min
// second: 40 min
// total: 1 hr 57 min

let fs = require("fs");

let inputFile = `5.txt`;
let input = fs.readFileSync(inputFile, "utf8");

let data = input.split(/\r?\n/);

let crates = [];
let moves = [];

let activeArray = crates;
while (data.length > 0) {
    let item = data.shift();

    if (item == "") {
        activeArray = moves;
    } else {
        activeArray.push(item);
    }
}

crates.pop();
crates = crates.map((item) => {
    return item
        .replace(/[ ]{4}/g, " [] ")
        .trim()
        .replace(/ /g, "")
        .replace(/\]\[/g, "].[");
});

crates = crates.map((item) => {
    return item.split(".").map((char) => char.replace(/[[\]]/g, ""));
});

let graph = {};

crates.forEach((row) => {
    row.forEach((crate, i) => {
        if (crate != "") {
            if (!graph[i]) {
                graph[i] = [crate];
            } else {
                graph[i].push(crate);
            }
        }
    });
});

Object.keys(graph).forEach((key) => {
    graph[key] = graph[key].reverse();
});

moves = moves.map((move) => {
    let parts = move.split(" ");

    return {
        numberOfCrates: +parts[1],
        fromIndex: +parts[3] - 1,
        toIndex: +parts[5] - 1,
    };
});

// =================================================================

function moveCrates(model, graph, moves) {
    let internalGraph = structuredClone(graph);

    moves.forEach((move) => {
        let crates = internalGraph[move.fromIndex];

        let buffer = [];

        if (model == 9000) {
            for (let i = 0; i < move.numberOfCrates; i++) {
                let crate = crates.pop();
                buffer.push(crate);
            }
        } else if (model == 9001) {
            buffer.push(...crates.splice(move.numberOfCrates * -1));
        }

        internalGraph[move.toIndex].push(...buffer);
    });

    let message = "";
    Object.keys(internalGraph).forEach((key) => {
        message += internalGraph[key].pop();
    });

    console.log(message);
}

moveCrates(9000, graph, moves);
moveCrates(9001, graph, moves);

// first: 07:05 - 07:35 = 30 min
// second:
// total:

let fs = require("fs");

let inputFile = `10.txt`;
let input = fs.readFileSync(inputFile, "utf8");

let data = input.split(/\r?\n/);

let commands = data.map((item) => item.split(" "));

console.log(commands);

let x = 1;
let cycles = [];

let crt = ["........................................", "........................................", "........................................", "........................................", "........................................", "........................................"];

let pixels = [0, 1, 2];

commands.forEach((item) => {
    let command = item[0];

    let cycle = cycles.length + 1;

    cycles.push({
        cycle,
        before: x,
        after: x,
        signal: cycle * x,
    });

    if (command !== "noop") {
        cycle = cycle + 1;
        cycles.push({
            cycle,
            before: x,
            after: x + parseInt(item[1]),
            signal: cycle * x,
        });
        x = x + parseInt(item[1]);
    }

    pixels = [x - 1, x, x + 1];
});

console.log(cycles);

let sum = cycles[20 - 1].signal + cycles[60 - 1].signal + cycles[100 - 1].signal + cycles[140 - 1].signal + cycles[180 - 1].signal + cycles[220 - 1].signal;

console.log(sum);

// 12 min
let fs = require("fs");

let inputFile = `2.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

// data = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"];

data = data.map((item) => {
    let parts = item.split(" ");
    return {
        direction: parts[0],
        value: +parts[1],
    };
});

let x = 0,
    y = 0,
    depth = 0;

data.forEach((item) => {
    switch (item.direction) {
        case "forward":
            x += item.value;
            depth += y * item.value;

            break;

        case "down":
            y += item.value;
            break;

        case "up":
            y -= item.value;
            break;

        default:
            break;
    }
});

console.log("one:", x * y, "two:", depth * x);

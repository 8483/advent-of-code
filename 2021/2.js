// 12 min
let fs = require("fs");

let inputFile = `2.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

// data = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"];

let x = 0,
    y = 0,
    depth = 0;

data.forEach((item) => {
    let parts = item.split(" ");
    let direction = parts[0];
    let value = +parts[1];

    switch (direction) {
        case "forward":
            x += value;
            depth += y * value;
            break;

        case "down":
            y += value;
            break;

        case "up":
            y -= value;
            break;

        default:
            break;
    }
});

console.log("one:", x * y, "two:", depth * x);

// first: 05:20 - 07:05...
// second:
// total:

let fs = require("fs");

let inputFile = `9.txt`;
let input = fs.readFileSync(inputFile, "utf8");

let data = input.split(/\r?\n/);

let commands = data.map((item) => item.split(" "));

// console.log(commands);

// head x, head y, tail x, tail y
let x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0;

let graph = {
    "00": 0,
};

let arr = [];

commands.forEach((command) => {
    let direction = command[0];
    let steps = command[1];

    // console.log("\n");
    // console.log(direction, steps);

    for (let i = 0; i < steps; i++) {
        switch (direction) {
            case "R":
                x1++;
                break;

            case "U":
                y1++;
                break;

            case "L":
                x1--;
                break;

            case "D":
                y1--;
                break;
        }

        // console.log("x1:", x1, "y1", y1);

        let x = Math.abs(x1 - x2);
        let y = Math.abs(y1 - y2);

        if (x == 2 && y == 0) {
            if (direction == "R") {
                x2++;
            } else {
                x2--;
            }
        }

        if (x == 0 && y == 2) {
            if (direction == "U") {
                y2++;
            } else {
                y2--;
            }
        }

        if (x == 1 && y == 2) {
            if (x1 > 0) {
                if (x1 > x2) {
                    x2++;
                } else {
                    x2--;
                }
            } else {
                if (x1 > x2) {
                    x2--;
                } else {
                    x2++;
                }
            }

            if (direction == "U") {
                y2++;
            } else {
                y2--;
            }
        }

        if (x == 2 && y == 1) {
            if (y1 > 0) {
                if (y1 > y2) {
                    y2++;
                } else {
                    y2--;
                }
            } else {
                if (y1 > y2) {
                    y2--;
                } else {
                    y2++;
                }
            }

            if (direction == "R") {
                x2++;
            } else {
                x2--;
            }
        }

        // console.log("x2:", x2, "y2", y2);
        // console.log("------------");

        let coords = `${x2}${y2}`;

        if (!graph[coords]) {
            graph[coords] = 1;
        } else {
            graph[coords]++;
        }

        // console.log(graph);

        if (!arr.includes(coords)) {
            arr.push(coords);
        }
    }
});

console.log(graph);
console.log(Object.keys(graph).length);

console.log(arr);
console.log(arr.length);

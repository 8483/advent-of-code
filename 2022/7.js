// first: 05:00 - 06:09 = 1 hr 9 min
// second: 06:09 - 06:22 = 13 min
// total: 1 hr 22 min

let fs = require("fs");

let inputFile = `7.txt`;
let input = fs.readFileSync(inputFile, "utf8");

let data = input.split(/\r?\n/);

let files = data
    .filter((line) => {
        let [type] = line.split(" ");
        if (type != "$" && type != "dir") {
            return line;
        }
    })
    .map((file, i) => {
        let [size, name] = file.split(" ");
        return {
            raw: file,
            size: +size,
            name,
        };
    });

let graph = {};

files.forEach((item, i) => {
    let indexOfFileInData = data.indexOf(item.raw);

    let jumps = 0;

    for (let j = indexOfFileInData; j >= 0; j--) {
        let parts = data[j].split(" ");

        let name = parts[2] + j;

        if (parts[0] == "$" && parts[1] == "cd" && parts[2] != "..") {
            if (jumps == 0) {
                // if (!files[i].dirs) {
                //     files[i].dirs = [parts[2] + j];
                // } else {
                //     files[i].dirs.push(parts[2] + j);
                // }

                if (!graph[name]) {
                    graph[name] = item.size;
                } else {
                    graph[name] += item.size;
                }
            } else {
                jumps--;
            }
        } else if (parts[2] == "..") {
            jumps++;
        }
    }
});

console.log(graph);

let sizes = [];
let sum = 0;
Object.keys(graph).forEach((key) => {
    let size = graph[key];
    sizes.push(size);
    if (size <= 100000) {
        sum += size;
    }
});

console.log(sum);

let totalDiskSpace = 70000000;

let minFreeSpace = 30000000;

let currentSpace = graph["/0"];

let currentFreeSpace = totalDiskSpace - currentSpace;

let spaceNeeded = minFreeSpace - currentFreeSpace;

console.log(spaceNeeded);

console.log(sizes);

sizes.sort((a, b) => {
    return a - b;
});

console.log(sizes);

for (let i = 0; i < sizes.length; i++) {
    let size = sizes[i];

    if (size > spaceNeeded) {
        console.log(size);
        break;
    }
}

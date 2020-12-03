// 20 min
let fs = require("fs");

let inputFile = `3.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

// let data = [
//     "..##.........##.........##.........##.........##.........##.......",
//     "#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..",
//     ".#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.",
//     "..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#",
//     ".#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.",
//     "..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....",
//     ".#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#",
//     ".#........#.#........#.#........#.#........#.#........#.#........#",
//     "#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...",
//     "#...##....##...##....##...##....##...##....##...##....##...##....#",
//     ".#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#",
// ];

let block = data.map((item) => {
    return item.split("");
});

let slope = [[...block]];

/*
slope
    block
        row = real data 31 chars, 32 indices, test data = 66 chars, 67 indices
    block
        row
*/

function slide(right, down) {
    let jump = block[0].length;
    let blockIndex = 0;
    let rowIndex = 0;
    let columnIndex = 0;
    let treeCount = 0;
    // console.log(rowIndex, columnIndex, data[rowIndex]);
    while (rowIndex < block.length - 1) {
        //block.length - 1
        let futureChar = slope[blockIndex][rowIndex + down][columnIndex + right];
        // console.log("before", blockIndex, rowIndex, columnIndex, treeCount);
        // console.log(data[rowIndex]);
        // console.log("future char", futureChar);
        if (!futureChar) {
            slope.push(block);
            blockIndex++;
            columnIndex -= jump;
        }

        rowIndex += down;
        columnIndex += right;
        let char = slope[blockIndex][rowIndex][columnIndex];

        // console.log("after", blockIndex, rowIndex, columnIndex, treeCount);
        // console.log(data[rowIndex]);
        // console.log("current char", char);

        if (char === "#") {
            treeCount++;
        }
        // console.log("\n");
    }
    // console.log(treeCount);
    return treeCount;
}

let a = slide(1, 1);
let b = slide(3, 1);
console.log("part one", b);
let c = slide(5, 1);
let d = slide(7, 1);
let e = slide(1, 2);

console.log("part two", a * b * c * d * e);

// ...#.....#..#..#...#.#....##...
//                               ^ index 30, char 31
// ...#.....#..#..#...#.#....##...
//   ^ index 33 (2), char (3)

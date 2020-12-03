// 2 hours
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

let slope = data.map((item) => {
    return item.split("");
});

function slide(right, down) {
    let jump = slope[0].length;
    let rowIndex = 0;
    let columnIndex = 0;
    let treeCount = 0;

    while (rowIndex < slope.length - 1) {
        let futureChar = slope[rowIndex + down][columnIndex + right];
        if (!futureChar) {
            columnIndex -= jump;
        }

        rowIndex += down;
        columnIndex += right;
        let char = slope[rowIndex][columnIndex];

        if (char === "#") {
            treeCount++;
        }
    }
    return treeCount;
}

let a = slide(1, 1);
let b = slide(3, 1);
console.log("part one", b);
let c = slide(5, 1);
let d = slide(7, 1);
let e = slide(1, 2);

console.log("part two", a * b * c * d * e);

// 10 min
let fs = require("fs");

let inputFile = `2.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

// let data = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

let passwords = data.map((item) => {
    let obj = {};
    let parts = item.split(" ");
    let limits = parts[0].split("-");
    obj.lower = parseInt(limits[0]);
    obj.upper = parseInt(limits[1]);
    obj.letter = parts[1].substring(0, 1);
    obj.password = parts[2];
    return obj;
});

let valid = [];

passwords.map((obj) => {
    let isLower = obj.password[obj.lower - 1] === obj.letter;
    let isUpper = obj.password[obj.upper - 1] === obj.letter;
    if ((isLower || isUpper) && !(isLower && isUpper)) {
        // console.log(obj);
        valid.push(obj);
    }
});

console.log(valid.length);

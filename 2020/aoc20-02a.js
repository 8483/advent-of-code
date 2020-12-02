// 20 min
let fs = require("fs");

let inputFile = `aoc20-02.txt`;
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
    let password = obj.password;
    let count = 0;
    for (let i = 0; i < password.length; i++) {
        let passwordLetter = password[i];
        if (passwordLetter === obj.letter) {
            count++;
        }
    }

    if (count >= obj.lower && count <= obj.upper) {
        // console.log(obj, count);
        valid.push(obj);
    }
});

console.log(valid.length);

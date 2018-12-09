let fs = require("fs");
let input_file = './aoc_18_02.txt'
let input = fs.readFileSync(input_file, 'utf8');

let data = input.split(/\r?\n/);

let test = [
    'abcdef',
    'bababc',
    'abbcde',
    'abcccd',
    'aabcdd',
    'abcdee',
    'ababab',
    'azxouxxypx'
]

// console.log(data)

let totalTwo = 0;
let totalThree = 0;

function checkString(string) {
    let str = string.split("").sort();
    // console.log(str.join())
    let two = 0;
    let three = 0;

    for (let i = 0; i < str.length; i++) {
        // If the sequence is not in the middle and it's not over 3 consecutive letters.
        if (str[i] != str[i - 1] && str[i] != str[i + 3]) {
            if (str[i] == str[i + 2]) {
                // console.log(`${i} - ${i + 2}, ${str[i]} == ${str[i + 2]}, ${str[i] == str[i + 2]}`)
                three++;
                // console.log("three++")
            } else if (str[i] == str[i + 1] && str[i] != str[i + 2]) {
                // console.log(`${i} - ${i + 1}, ${str[i]} == ${str[i + 1]}, ${str[i] == str[i + 1]}`)
                two++;
                // console.log("two++")
            }
        }
    }

    if (two > 0) totalTwo++;
    if (three > 0) totalThree++;
    // console.log(`two: ${two}, three: ${three}`)
    // console.log(`totalTwo: ${totalTwo}, totalThree: ${totalThree}`)
    // console.log(`\n`)
}

data.map(item => checkString(item));

console.log(totalTwo, totalThree)
console.log(totalTwo * totalThree)

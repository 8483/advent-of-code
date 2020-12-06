let fs = require("fs");

let inputFile = `6.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let raw = input.split(/\r?\n/);

// prepare data
let data = [];
let temp = [];
raw.map((item, i) => {
    if (item !== "") {
        temp.push(item);
    } else {
        data.push(temp);
        temp = [];
    }
    if (i == raw.length - 1) {
        data.push(temp);
    }
});

let questionsWithYesAnswersCount = 0;
let questionsWhereEveryoneAnsweredYesCount = 0;
data.map((group) => {
    let letters = group.join("").split("");
    var uniqueLetters = new Set(letters);

    questionsWithYesAnswersCount += uniqueLetters.size;

    // initialize counts
    let counts = {};
    [...uniqueLetters].map((letter) => {
        counts[letter] = 0;
    });

    // count questions with yes answers
    for (let key of Object.keys(counts)) {
        letters.map((letter) => {
            if (key == letter) {
                counts[letter]++;
            }
        });
    }

    // count questions where everyone answered yes
    [...uniqueLetters].map((letter) => {
        if (counts[letter] == group.length) {
            questionsWhereEveryoneAnsweredYesCount++;
        }
    });
});

console.log("Questions with yes answers:", questionsWithYesAnswersCount);
console.log("Questions where everyone answered yes:", questionsWhereEveryoneAnsweredYesCount);
console.log("reading: 10 min, first: 16 min, second: 54 min, total: 80 min");

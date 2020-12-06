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

let questionsWithYesAnswers = 0;
let questionsWhereEveryoneAnsweredYes = 0;
data.map((group) => {
    let lettersString = group.join("");
    let letters = lettersString.split("");
    var uniqueLetters = new Set(letters);

    questionsWithYesAnswers += uniqueLetters.size;

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
            questionsWhereEveryoneAnsweredYes++;
        }
    });
});

console.log("Questions with yes answers:", questionsWithYesAnswers);
console.log("Questions where everyone answered yes:", questionsWhereEveryoneAnsweredYes);
console.log("reading: 10 min, first: 16 min, second: 54 min, total: 80 min");

// first part:
// second part:

let fs = require("fs");

let inputFile = `8.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

data = [
    "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
    "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
    "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
    "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
    "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
    "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
    "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
    "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
    "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
    "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
];

console.log(data);

data = data.map((item) => {
    let parts = item.split("|");
    let patterns = parts[0].split(" ");
    let output = parts[1].split(" ").filter((n) => n != "");

    return {
        patterns,
        output,
    };
});

// console.log(data);

let count = 0;

// 1 (2), 4 (4), 7 (3), and 8 (7)
data.forEach((item) => {
    item.output.forEach((el) => {
        if (el.length == 2 || el.length == 4 || el.length == 3 || el.length == 7) count++;
    });
});

// console.log(count);

function decodeNumber(decoder, pattern) {
    let number;

    let code = [0, 0, 0, 0, 0, 0, 0];

    decoder.forEach((char, i) => {
        if (pattern.includes(char)) {
            code[i] = 1;
        }
    });

    code = code.join("");

    switch (code) {
        case "1110111":
            number = 0;
            break;

        case "0010010":
            number = 1;
            break;

        case "1011101":
            number = 2;
            break;

        case "1011011":
            number = 3;
            break;

        case "0111010":
            number = 4;
            break;

        case "1101011":
            number = 5;
            break;

        case "1101111":
            number = 6;
            break;

        case "1010010":
            number = 7;
            break;

        case "1111111":
            number = 8;
            break;

        case "1111011":
            number = 9;
            break;

        default:
            break;
    }

    console.log("pattern", pattern, "code", code, " - ", number);
    return number;
}

data.forEach((item) => {
    // 0, 1, 2, 3, 4, 5, 6
    // a, b, c, d, e, f, g
    let decoder = ["", "", "", "", "", "", ""];

    let one = item.patterns.filter((p) => p.length == 2)[0];
    decoder[2] = one[0];
    decoder[5] = one[1];
    console.log(one);

    let seven = item.patterns.filter((p) => p.length == 3)[0];
    decoder[0] = seven.split("").filter((char) => !decoder.includes(char))[0];
    console.log(seven);

    let four = item.patterns.filter((p) => p.length == 4)[0];
    let fourChars = four.split("").filter((char) => !decoder.includes(char));
    decoder[1] = fourChars[0];
    decoder[3] = fourChars[1];

    let zeroSixNine = item.patterns.filter((p) => p.length == 6);
    let mash = zeroSixNine.join("");
    let foo = mash.split("").filter((char) => !decoder.includes(char));
    console.log(zeroSixNine, "foo", foo);

    let obj = {};
    foo.forEach((el) => {
        obj[el] = (obj[el] || 0) + 1;
    });

    for (const key in obj) {
        if (obj[key] == 2) {
            decoder[4] = key;
        }

        if (obj[key] == 3) {
            decoder[6] = key;
        }
    }

    let num = "";
    console.log("patterns", item.patterns);
    console.log("output", item.output);
    console.log("decoder", decoder);

    item.output.forEach((pattern) => {
        num += decodeNumber(decoder, pattern);
    });

    console.log(num);
    console.log("\n");
});

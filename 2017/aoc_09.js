// http://adventofcode.com/2017/day/9

var fs = require("fs");
var input_file = './aoc_09.txt'
var input = fs.readFileSync(input_file, 'utf8');

// console.log(input);

function remove_ignored(string) {
    // console.log("Removing ingored-----------------");
    // console.log(string);
    while (string.includes("!")) {
        var array = string.split("");
        array.map((item, i) => item == "!" ? array.splice(i, 2) : null);
        string = array.join("");
        // console.log(string);
    }
    // console.log("\n");
    return string;
}

function remove_garbage(string) {
    // console.log("Removing garbage-----------------");
    var i = 0
    while (string.includes(">")) {
        var open = string.indexOf("<");
        var close = string.indexOf(">");

        if (close < open) {
            string = string.replace(">", "");
        } else {
            var word = string.substring(open, close + 1);
            // console.log(word);
            string = string.replace(word, "g");
            // console.log(i);
            // console.log(string.substring(0, 300));
        }
        i++;
    }
    // console.log("\n");
    return string;
}

function clean(string) {
    // console.log(string);
    var clean1 = remove_ignored(string);
    var clean2 = remove_garbage(clean1);
    var clean3 = clean2.replace(/([A-Za-z,"'])/g, "");
    console.log(clean3, "\n");
}

// function inception(string) {
//     var i = 0;
//     var j = string.length - 1;
//     var count = 0;
//     while (string[i] == "{" && string[j] == "}") {
//         console.log("match");
//         i++; j--; count++;
//     }
//     console.log(count);
// }

inception("{}"); // 1
inception("{{{}}}"); // 1 + 2 + 3 = 6
inception("{{}{}}"); // 1 + 2 + 2 = 5
inception("{{{}{}{{}}}}"); // 1 + 2 + 3 + 3 + 3 + 4 = 16

// clean(input);
// inner(clean(input));


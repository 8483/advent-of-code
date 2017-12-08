// http://adventofcode.com/2017/day/7
// Only part 1

var fs = require("fs");
var input_file = './aoc_07.txt'
var input = fs.readFileSync(input_file, 'utf8');

// Converts fwft (72) -> ktlj, cntj, xhth
// into [ 'fwft', 'ktlj,cntj,xhth' ]
function extract(string) {
    var array = [];
    var program = string.substring(0, string.indexOf(" "));

    array.push(program);

    if (string.indexOf(">") != -1) {
        var subs = string.substring(string.indexOf(">") + 2, string.length).replace(/ /g, "");
        array.push(subs);
    }
    //array.unshift(Number(string.substring(string.indexOf("(") + 1, string.indexOf(")") - 1))); // Extract the program weight.
    return array;
}

var data = input.split("\r\n").map(extract);

function match(array) {
    while (array.length > 1) { // Run until no matches can be made.
        start: for (var i = 0; i < array.length; i++) { // Starting loop.
            var string = array[i][1];
            if (string) { // If there are sub-programs...
                for (var j = 0; j < string.split(",").length; j++) { // ...Iterate over them.

                    words = string.split(",");
                    word = words[j];

                    for (var k = 0; k < array.length; k++) { // Search if the sub-program has sub-programs.
                        if (array[k][0] == word && array[k][1]) { // If it does...
                            var replacement = array[k][1];
                            var new_string = string.replace(word, replacement);
                            array[i][1] = new_string; // Make the replacement.

                            array.splice(k, 1); // Remove the array holding the replacement.
                            break start; // Start from the top to avoid infinite loop @ j.
                        }
                    }
                }
            } else { // If no sub-programs, remove the array.
                array.splice(i, 1);
            }
        }
    }
    console.log(array[0][0]);
}

match(data);
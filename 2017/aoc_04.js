// http://adventofcode.com/2017/day/4

var fs = require("fs");
var input_file = './aoc_04.txt'
var input = fs.readFileSync(input_file, 'utf8');

var data = input.split("\r\n").map(row => row.split(" "));                              // Line = array. Word = nested array.
var sorted_data = data.map(row => row.map(item => item.split("").sort().join("")));     // Sort nested word letters.

function valid(data) {
    var valid =
        data
            .map(row =>
                row.length === row.filter((word, i, row) =>     // If array size = filtered size = no duplicates.
                    row.indexOf(word) === i                     // If index of word != to current index = word is a duplicate i.e. remove.
                ).length
            )
            .filter(row => row);                                // Filter only true values.
    console.log(valid.length);
}

valid(data);
valid(sorted_data);
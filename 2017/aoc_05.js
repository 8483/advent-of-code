// http://adventofcode.com/2017/day/5

var fs = require("fs");
var input_file = './aoc_05.txt'
var input = fs.readFileSync(input_file, 'utf8');

function escape(part) {
    var data = input.split("\r\n").map(item => Number(item));
    var index = 0;
    var count = 0;

    while (index < data.length) {
        var i = index;               // Temp.
        value = data[index];         // Get current value.

        if (value < 0) {
            i -= Math.abs(value);    // Future jump back.
        } else if (value > 0) {
            i += value;              // Future jump forward.
        }

        if (part == 1) {
            data[index] += 1;            // Part 1: Increase value by 1 after jump.
        } else if (part == 2) {
            if (value >= 3) {
                data[index] -= 1;        // Part 2: Decrease value by 1 after jump.
            } else if (value <= -3) {
                data[index] += 1;        // Part 2: Increase negative value by 1 after jump i.e. "decrease".
            } else {
                data[index] += 1;        // Part 2: Regular increase like Part 1.
            }
        }

        index = i;        // Jump by making new index the current one.
        count++;          // Register step.
    }
    console.log(count);
}

// All of this can be replaced with:
// var i = 0; var s = 0; while (typeof data[i] !== 'undefined') { i += data[i]++; s++ }; return s;
// var i = 0; var s = 0; while (typeof data[i] !== 'undefined') { i += (list[i] > 2 ? list[i]-- : list[i]++); s++ }; return s;

escape(1);
escape(2);

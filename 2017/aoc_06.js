// http://adventofcode.com/2017/day/6

var fs = require("fs");
var input_file = './aoc_06.txt'
var input = fs.readFileSync(input_file, 'utf8');

function distribute(input, n) {
    var log = [];
    var array = input.split("\t").map((item) => Number(item));
    var count = 0;
    // Checks if the array was not encountered before i.e. < 1 occurrence.
    while(log.filter((item) => item == array.toString()).length < n) {
        log.push(array.toString());
        var max = Math.max.apply(null, array);
        var i = array.iOf(max);;

        array[i] = 0;         // Reduce max to 0;

        while (max > 0) {                    // Left for distribution?
            if (i == array.length - 1) {
                i = 0;                       // Looping around if at end.
                array[i]++;                  // Increase by 1 due to distribution.
            } else {
                i++;                         // Move to next item.
                array[i]++;                  // Increase by 1 due to distribution.
            }
            max--;           // Iterations.
        }
        count++;             // Register cycle.
    }
    return count;
}

var cycles = distribute(input, 1);
var loop = distribute(input, 2) - cycles;

console.log("cycles:", cycles, "\nloop size:", loop);

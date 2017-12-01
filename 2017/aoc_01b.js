// http://adventofcode.com/2017/day/1

var fs = require("fs");

var input_file = './aoc_01a.txt'
var input = fs.readFileSync(input_file, 'utf8');

function get_digit(n){
    var digit = parseInt(input.substring(n, n+1));
    return digit;
}

var sum = 0;
var jump = input.length / 2;

for(var i = 0; i < input.length - 1; i++){
    var n = get_digit(i);
    if (n == get_digit(i + jump)){
        sum += n * 2;
        console.log(i + ". " + n + " " + sum);
    } else {
        console.log(i + ". " + n);
    }
}

console.log(sum);

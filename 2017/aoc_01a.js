// http://adventofcode.com/2017/day/1

var fs = require("fs");

var input_file = './aoc_01a.txt'
var input = fs.readFileSync(input_file, 'utf8');

function get_digit(n){
    var digit = parseInt(input.substring(n, n+1));
    return digit;
}

var sum = 0;

for(var i = 0; i < input.length - 1; i++){
    var n = get_digit(i);
    if(i == input.length - 2 && n == get_digit(0)){
        sum += n;
        console.log(i + ". " + n + " " + sum + " END");
    } else if (n == get_digit(i+1)){
        sum += n;
        console.log(i + ". " + n + " " + sum);
    } else {
        console.log(i + ". " + n);
    }
}

console.log(sum);

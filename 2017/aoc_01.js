// http://adventofcode.com/2017/day/1

var fs = require("fs");

var input_file = './aoc_01.txt'
var data = fs.readFileSync(input_file, 'utf8');

function get_digit(n){
    var digit = parseInt(data.substring(n, n+1));
    return digit;
}

function sum1(input){
    var sum = 0;
    for(var i = 0; i < input.length - 1; i++){
        var n = get_digit(i);
        if(i == input.length - 2 && n == get_digit(0)){
            sum += n;
        } else if (n == get_digit(i+1)){
            sum += n;
        }
    }
    return sum;
}

function sum2(input){
    var sum = 0;
    var jump = input.length / 2;
    for(var i = 0; i < input.length - 1; i++){
        var n = get_digit(i);
        if (n == get_digit(i + jump)){
            sum += n * 2;
        }
    }
    return sum;
}

console.log(sum1(data));
console.log(sum2(data));

// http://adventofcode.com/2017/day/2

var fs = require("fs");
var input_file = './aoc_02.txt'
var input = fs.readFileSync(input_file, 'utf8');

var data =
    input
        .split("\r\n") // Make an array with each line as an array.
        .map(row => row.replace(/\t/g, ",")) // Replace tabs with commas.
        .map(row => row.split(",")) // Make each nested line an array of characters.
        .map(row => row.map(string => parseInt(string))) // Convert those characters into numbers.

var sum1 =
    data
        .map(min_max_difference)    // Find the difference for each array.
        .reduce(add);               // Find the sum of the resulting differences array.

var sum2 =
    data
        .map(even_divide)           // Find the even divisions.
        .reduce(add);               // Add the array values.

function min_max_difference(array){
    var max = Math.max.apply(null, array);
    var min = Math.min.apply(null, array);
    return max - min;
}

function add(a, b){
    return a + b;
}

function even_divide(array){
    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < array.length; j++){
            var n1 = array[i];
            var n2 = array[j];
            if(n1 % n2 === 0 && n1 / n2 != 1){
                return n1 / n2;
            }
        }
    }
}

console.log(sum1);
console.log(sum2);

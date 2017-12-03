var fs = require("fs");

var input_file = './aoc_02.txt'
var input = fs.readFileSync(input_file, 'utf8');

var data =
    input
        .replace(/\t/g, ",") // Replace tabs with commas.
        .split(/\r\n/) // Make an array with each line as an array.
        .filter(not_empty) // Remove the last empty array.
        .map(string_to_array) // Make each nested line an array of characters.
        .map(string_to_int); // Convert those characters into numbers.

var sum1 =
    data
        .map(min_max_difference) // Find the difference for each array.
        .reduce(add); // Find the sum of the resulting differences array.

var sum2 =
    data
        .map(sort_asc) // Sort by ascension.
        .map(even_divide) // Find the division leaving no remainder.
        .map(inner_extract) // Extract values from the inner most array.
        .map(extract) // Extract the values from the result.
        .reduce(add); // Add the array values.

function not_empty(string){
    return string != '';
}

function string_to_array(string){
    return string.split(",");
}

function string_to_int(array){
    return array.map(function(string){
        return parseInt(string);
    })
}

function min_max_difference(array){
    var max = Math.max.apply(null, array);
    var min = Math.min.apply(null, array);
    return max - min;
}

function add(a, b){
    return a + b;
}

function sort_asc(array){
    return array.sort(function(a, b){
        return b - a;
    });
}

function even_divide(array){
    return array.map(function(number1){
        return array.map(function(number2){
            if(number1 % number2 === 0){
                if(number1 / number2 > 1){
                    return number1 / number2;
                } else return 0;
            } else return 0;
        })
    })
}

function max_number(total, num){
    return total + num;
}

function inner_extract(array){
    return array.map(function(array2){
        return array2.reduce(max_number);
    })
}

function extract(array){
    return array.reduce(max_number);
}

console.log(sum1);
console.log(sum2);

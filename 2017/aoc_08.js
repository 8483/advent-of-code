// http://adventofcode.com/2017/day/8

var fs = require("fs");
var input_file = './aoc_08.txt'
var input = fs.readFileSync(input_file, 'utf8');

// b inc 5 if a > 1 becomes [ 'b', 'inc', 5, 'if', 'a', '>', 1 ]
var data =
    input
        .split("\r\n")
        .map((row) => row.split(" "))
        .map((row) => row.map((item) => item == Number(item) ? Number(item) : item ));

// Registers with their values.
var registers =
    data
        .map((row) => row[0])
        .filter((value, index, array) => array.indexOf(value) == index)
        .sort()
        .map((item) => [ item, 0 ]); // Initialize all with 0.

var max = 0;

function solve(array) {
    for (var i = 0; i < array.length; i++) {
        var row = array[i];        // [ 'b', 'inc', 5, 'if', 'a', '>', 1 ]

        var register = row[0];     // 'b'
        var action = row[1];       // 'inc'
        var value = row[2];        // 5

        var reg_key = row[4];      // 'a'
        var sign = row[5];         // '>'
        var reg_val = row[6];      // 1

        expression(register, action, value, reg_key, sign, reg_val);
    }
}

// Evaluates if the expression is true, and if so, calls the update function on the specific register.
// item[0] == reg_key && item[1] > reg_val are both needed in order to find the right reg_key reg_val pair.
function expression(register, action, value, reg_key, sign, reg_val) {
    switch (sign) {
        case ">":
            registers.map((item) => item[0] == reg_key && item[1] > reg_val ? update_register(register, action, value) : null);
            break;
        case "<":
            registers.map((item) => item[0] == reg_key && item[1] < reg_val ? update_register(register, action, value) : null);
            break;
        case ">=":
            registers.map((item) => item[0] == reg_key && item[1] >= reg_val ? update_register(register, action, value) : null);
            break;
        case "<=":
            registers.map((item) => item[0] == reg_key && item[1] <= reg_val ? update_register(register, action, value) : null);
            break;
        case "==":
            registers.map((item) => item[0] == reg_key && item[1] == reg_val ? update_register(register, action, value) : null);
            break;
        case "!=":
            registers.map((item) => item[0] == reg_key && item[1] != reg_val ? update_register(register, action, value) : null);
            break;
    }
}

// Finds the register to be updated and changes the value based on the type (increase or decrease)
function update_register(register, action, value) {
    switch (action) {
        case "inc": // Regular increase.
            registers.map((item) => item[0] == register ? [item[0], item[1] += value] : item ) // Update the register value.
            break;
        case "dec":
            if (value > 0) { // Regular decrease.
                registers.map((item) => item[0] == register ? [item[0], item[1] -= value] : item ) // Update the register value.
            } else if (value < 0) { // This one actuall increases the value since -(-x) = +x
                registers.map((item) => item[0] == register ? [item[0], item[1] += Math.abs(value)] : item ) // Update the register value.
            }
            break;
    }
    var candidate = Math.max(...registers.map((item) => item[1])); // Potential new max.
    candidate > max ? max = candidate : null; // Replace old max if new is larger.
}

solve(data)
var largest = Math.max(...registers.map((item) => item[1])); // Find the largest register value.

console.log(largest);
console.log(max);
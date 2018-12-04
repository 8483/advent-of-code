let fs = require("fs");
let input_file = './aoc_18_01.txt'
let input = fs.readFileSync(input_file, 'utf8');

let data = input.split(/\r?\n/);

let freq = 0;

console.time("A");
data.map(item => {
    item.substring(0, 1) == "+" ? freq += parseInt(item.substring(1)) : freq -= parseInt(item.substring(1));
})
console.timeEnd("A"); // 0.268ms

console.log(freq);

console.time("B");
let freq2 = 0;
let freqs = [];
let i = 0;
let state = true;
let count = 0;

while (state) {
    data[i].substring(0, 1) == "+" ? freq2 += parseInt(data[i].substring(1)) : freq2 -= parseInt(data[i].substring(1));

    // If encountered, stop. If end reached start over, else increment index.
    freqs.includes(freq2) ? state = false : i == data.length - 1 ? i = 0 : i++;
    freqs.push(freq2);

    // Count numbers of starting over
    i == 0 ? count++ : null;
}
console.timeEnd("B"); // 12329.121ms

console.log(freq2);
console.log(count);
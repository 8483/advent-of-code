// first: 17:09 - 17:17 = 8 min
// second: 17:17 - 17:47 = 30 min
// total: 38 min

let fs = require("fs");

let inputFile = `1.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let data = input.split(/\r?\n/);

function sum(array) {
    let numbers = array.map((item) => {
        let arr = item.split("").filter((char) => !isNaN(char));

        let string = "";

        if (arr.length > 1) {
            string = `${arr[0]}${arr.at(-1)}`;
        } else {
            string = `${arr[0]}${arr[0]}`;
        }

        return parseInt(string);
    });

    // console.log(numbers);

    let result = 0;

    numbers.forEach((num) => {
        result += num;
    });

    console.log(result);
}

sum(data);

function replace(string) {
    return string.replace(/one/g, "1").replace(/two/g, "2").replace(/three/g, "3").replace(/four/g, "4").replace(/five/g, "5").replace(/six/g, "6").replace(/seven/g, "7").replace(/eight/g, "8").replace(/nine/g, "9");
}

let replaced = data.map((item) => {
    let i = 0;
    let string = "";

    while (i < item.length) {
        let char = item[i];
        string += char;
        string = replace(string);

        i++;
    }

    return string;
});

sum(replaced);

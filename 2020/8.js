// 2 hours
let fs = require("fs");

let inputFile = `8.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let raw = input.split(/\r?\n/);

// let raw = ["nop +0", "acc +1", "jmp +4", "acc +3", "jmp -3", "acc -99", "acc +1", "jmp -4", "acc +6"]; // INFINITE
// let raw = ["nop +0", "acc +1", "jmp +4", "acc +3", "jmp -3", "acc -99", "acc +1", "nop -4", "acc +6"]; // FINITE

let instructions = raw.map((item) => {
    let parts = item.split(" ");
    let operation = parts[0];
    let value = parseInt(parts[1]);
    return [operation, value];
});

function checkInfinite(instructions) {
    let accumulator = 0;
    let index = 0;
    let isInfinite = false;
    let indices = [];

    while (!isInfinite && index < instructions.length) {
        let instruction = instructions[index];

        let operation = instruction[0];
        let value = instruction[1];

        switch (operation) {
            case "acc":
                accumulator += value;
                break;
            case "jmp":
                index += value - 1;
                break;
        }

        indices.push(index);

        index++;

        if (indices.includes(index) || index == 0) {
            isInfinite = true;
        }
    }
    return {
        status: isInfinite,
        accumulator: accumulator,
    };
}

let first = checkInfinite(instructions);
console.log("first: ", first.accumulator);

let alteredInstructions = instructions;
let found = false;
for (let i = 0; i < alteredInstructions.length; i++) {
    if (!found) {
        let instruction = alteredInstructions[i];
        let operation = instruction[0];

        if (operation != "acc") {
            switch (operation) {
                case "nop":
                    alteredInstructions[i][0] = "jmp";
                    if (checkInfinite(alteredInstructions).status) {
                        alteredInstructions[i][0] = "nop";
                    } else {
                        found = true;
                    }
                    break;
                case "jmp":
                    alteredInstructions[i][0] = "nop";
                    if (checkInfinite(alteredInstructions).status) {
                        alteredInstructions[i][0] = "jmp";
                    } else {
                        found = true;
                    }
                    break;
            }
        }
    }
}

let second = checkInfinite(alteredInstructions);
console.log("second: ", second.accumulator);

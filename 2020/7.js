let fs = require("fs");

let inputFile = `7.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let raw = input.split(/\r?\n/);

// let raw = [
//     "light red bags contain 1 bright white bag, 2 muted yellow bags.",
//     "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
//     "bright white bags contain 1 shiny gold bag.",
//     "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
//     "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
//     "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
//     "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
//     "faded blue bags contain no other bags.",
//     "dotted black bags contain no other bags.",
// ];

let rules = raw.map((item) => {
    let foo = item.split(" bags contain ");
    foo[1] = foo[1].split(", ");
    let temp = [];
    foo[1].map((bar) => {
        let parts = bar.split(" ");
        let count = parseInt(parts[0]);
        let bag = `${parts[1]} ${parts[2]}`;

        let index = 1;
        function addItem(item, array, times) {
            array.push(item);
            if (index < times) {
                index++;
                addItem(item, array, times);
            }
        }
        if (!isNaN(count)) {
            addItem(bag, temp, count);
        }
    });
    foo[1] = temp;
    return foo;
});

function checkInnerBagsHaveGold(mainBag) {
    innerBagsCount++;
    if (mainBag == "shiny gold" || bagsWithNoInnerGold.includes(mainBag)) return;

    let innerBags = rules.filter((item) => item[0] == mainBag)[0][1];

    if (innerBags.length > 0) {
        let hasGold = innerBags.includes("shiny gold");
        if (hasGold) {
            return true;
        } else {
            for (let i = 0; i < innerBags.length; i++) {
                if (checkInnerBagsHaveGold(innerBags[i])) {
                    return true;
                }
            }
        }
    } else {
        bagsWithNoInnerGold.push(mainBag);
    }
}

let totalChecks = 0;
let bagsWithNoInnerGold = [];
let innerBagsCount = 0;
function countBagsWithInnerGold() {
    console.time("Execution time");
    let count = 0;
    rules.map((item, i) => {
        let bag = item[0];
        if (checkInnerBagsHaveGold(bag)) {
            count++;
        } else {
            bagsWithNoInnerGold.push(bag);
        }
        // console.log("bagsWithNoInnerGold", bagsWithNoInnerGold);
        totalChecks += innerBagsCount;
        console.log(`${i}/${rules.length} - count: ${count} - bag: ${bag} - # of inner bags: ${innerBagsCount.toLocaleString()} - total checks: ${totalChecks.toLocaleString()}`);
        // console.log("\n");
        innerBagsCount = 0;
    });

    console.log(`Number of bags with shiny gold inside: ${count}`);
    console.log(`Total checks: ${totalChecks.toLocaleString()}`);
    console.timeEnd("Execution time");
}

countBagsWithInnerGold();

function countInnerBags(mainBag) {
    innerBagsCount++;
    let innerBags = rules.filter((item) => item[0] == mainBag)[0][1];
    if (innerBags.length > 0) {
        for (let i = 0; i < innerBags.length; i++) {
            if (countInnerBags(innerBags[i])) {
                return true;
            }
        }
    }
}

function countShinyGoldBagInnerBags() {
    isCheckingGoldBag = true;
    innerBagsCount = 0;
    let shinyBag = rules.filter((item) => item[0] == "shiny gold")[0];
    let innerBags = shinyBag[1];
    innerBags.map((bag) => {
        countInnerBags(bag);
    });
    console.log(`Number of shiny gold inner bags: ${innerBagsCount.toLocaleString()}`);
}

countShinyGoldBagInnerBags();

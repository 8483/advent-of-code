// first: 17:49 - 18:23 = 24 min
// second: 18:24 - 18:35 = 9 min
// total: 33 min

let fs = require("fs");

let inputFile = `2.txt`;
let input = fs.readFileSync(inputFile, "utf8");

// input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

let data = input.split(/\r?\n/);

let games = {};

data.forEach((item) => {
    let game = item.split(":");
    let gameId = game[0].split(" ")[1];

    games[gameId] = {};

    let picks = game[1].trim().split(";");

    gameObj = {
        red: [],
        green: [],
        blue: [],
    };

    picks.forEach((string) => {
        let colors = string.split(",");

        colors.forEach((string) => {
            let [count, color] = string.trim().split(" ");

            gameObj[color].push(parseInt(count));
        });
    });

    games[gameId] = gameObj;
});

let possible = {
    red: 12,
    green: 13,
    blue: 14,
};

let possibleIds = [];

for (const gameId in games) {
    let game = games[gameId];

    let isRed = game["red"].every((count) => count <= possible["red"]);
    let isGreen = game["green"].every((count) => count <= possible["green"]);
    let isBlue = game["blue"].every((count) => count <= possible["blue"]);

    if (isRed && isGreen && isBlue) {
        possibleIds.push(gameId);
    }
}

let sum = 0;

possibleIds.forEach((n) => (sum += parseInt(n)));

console.log(sum);

let totalPower = 0;

for (const gameId in games) {
    let red = Math.max(...games[gameId]["red"]);
    let green = Math.max(...games[gameId]["green"]);
    let blue = Math.max(...games[gameId]["blue"]);

    let power = red * green * blue;
    totalPower += power;
}

console.log(totalPower);

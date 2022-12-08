// first: 06:23 - 07:36 = 1 hr 13 min
// second: 07:36 - 08:13 = 37 min
// total: 1 hr 50 min

let fs = require("fs");

let inputFile = `8.txt`;
let input = fs.readFileSync(inputFile, "utf8");

let data = input.split(/\r?\n/);

let edgeTreesCount = data.length * 2 + data[0].length * 2 - 4;

data = data.map((item) => {
    return item.split("");
});

// console.log(edgeTreesCount);

let visibleTrees = 0;

let vertical = 1,
    horizontal = 1;

let maxScore = 0;

for (let v = vertical; v <= data.length - 2; v++) {
    let row = data[v];

    for (let h = horizontal; h <= row.length - 2; h++) {
        let tree = data[v][h];
        let isVisible = false;

        // console.log(data);
        // console.log(v, h, tree);

        let t = v - 1;
        let l = h - 1;
        let r = h + 1;
        let b = v + 1;

        let st = 0,
            sl = 0,
            sr = 0,
            sb = 0;

        while (t >= 0) {
            // console.log("top", t, h, data[t][h]);
            if (t == 0 && data[t][h] < tree) {
                isVisible = true;
                st = v - t;
            }

            if (data[t][h] >= tree) {
                // console.log("not visible...");
                st = v - t;
                break;
            }

            t--;
        }

        while (l >= 0) {
            // console.log("left", v, l, data[v][l]);
            if (l == 0 && data[v][l] < tree) {
                isVisible = true;
                sl = h - l;
            }

            if (data[v][l] >= tree) {
                // console.log("not visible...");
                sl = h - l;
                break;
            }

            l--;
        }

        while (r <= row.length - 1) {
            // console.log("right", v, r, data[v][r]);
            if (r == row.length - 1 && data[v][r] < tree) {
                isVisible = true;
                sr = r - h;
            }

            if (data[v][r] >= tree) {
                // console.log("not visible...");
                sr = r - h;
                break;
            }

            r++;
        }

        while (b <= data.length - 1) {
            // console.log("bottom", b, h, data[b][h]);
            if (b == data.length - 1 && data[b][h] < tree) {
                isVisible = true;
                sb = b - v;
            }

            if (data[b][h] >= tree) {
                // console.log("not visible...");
                b = b - v;
                break;
            }

            b++;
        }

        if (isVisible) {
            visibleTrees++;
        }

        // console.log("score:", st, sl, sr, sb, "=", st * sl * sr * sb);

        let score = st * sl * sr * sb;

        if (score > maxScore) maxScore = score;

        // console.log("visibleTrees", visibleTrees);
        // console.log("\n");
    }
}

console.log(visibleTrees);
console.log(edgeTreesCount);
console.log(edgeTreesCount + visibleTrees);

console.log(maxScore);

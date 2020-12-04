// 2 hours
let fs = require("fs");

let inputFile = `4.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let raw = input.split(/\r?\n/);

let passports = [];

let temp = [];
raw.map((item, i) => {
    if (item !== "") {
        temp.push(item);
    } else {
        passports.push(temp.join(" "));
        temp = [];
    }
    if (i == raw.length - 1) {
        passports.push(item);
    }
});

let validPassports = [];
let validPassportsWithGoodValues = [];

passports.map((passport) => {
    let fields = passport.split(" ");
    let isValid = fields.length === 8 || (fields.length === 7 && !passport.includes("cid"));

    if (isValid) {
        validPassports.push(passport);
    }

    let byr, iyr, eyr, hgt, hcl, ecl, pid;
    let byrValid, iyrValid, eyrValid, hgtValid, hclValid, eclValid, pidValid;

    fields.map((field) => {
        let key = field.substr(0, 3);
        let value = field.split(":")[1];

        switch (key) {
            case "byr":
                byr = parseInt(value);
                byrValid = byr >= 1920 && byr <= 2002;
                break;
            case "iyr":
                iyr = parseInt(value);
                iyrValid = iyr >= 2010 && iyr <= 2020;
                break;
            case "eyr":
                eyr = parseInt(value);
                eyrValid = eyr >= 2020 && eyr <= 2030;
                break;
            case "hgt":
                hgt = parseInt(value);
                let hgtUnit = value.substr(value.length - 2, value.length);

                if (hgtUnit == "cm") {
                    hgtValid = hgt >= 150 && hgt <= 193;
                } else if (hgtUnit == "in") {
                    hgtValid = hgt >= 59 && hgt <= 76;
                }
                break;
            case "hcl":
                hcl = value;
                hclValid = value.match(/^#(?:[0-9a-f]{3}){1,2}$/g) != null;
                break;
            case "ecl":
                ecl = value;
                eclValid = "amb blu brn gry grn hzl oth".includes(value);
                break;
            case "pid":
                pid = value;
                pidValid = value.match(/^[0-9]{9}$/g) != null;
                break;
        }
    });

    let hasGoodValues = byrValid && iyrValid && eyrValid && hgtValid && hclValid && eclValid && pidValid;

    // console.log(fields);
    // console.log(`
    //     valid: ${hasGoodValues ? "YES" : "NO ----------------------"}
    //     byr: ${byr} ${byrValid}
    //     iyr: ${iyr} ${iyrValid}
    //     eyr: ${eyr} ${eyrValid}
    //     hgt: ${hgt} ${hgtValid}
    //     hcl: ${hcl} ${hclValid}
    //     ecl: ${ecl} ${eclValid}
    //     pid: ${pid} ${pidValid}
    // `);

    if (isValid && hasGoodValues) {
        validPassportsWithGoodValues.push(passport);
    }
});

console.log(validPassports.length);
console.log(validPassportsWithGoodValues.length);

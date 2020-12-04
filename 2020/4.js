// 2 hours
let fs = require("fs");

let inputFile = `4.txt`;
let input = fs.readFileSync(inputFile, "utf8");
let raw = input.split(/\r?\n/);

// let raw = [
//     "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd",
//     "byr:1937 iyr:2017 cid:147 hgt:183cm",
//     "",
//     "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884",
//     "hcl:#cfa07d byr:1929",
//     "",
//     "hcl:#ae17e1 iyr:2013",
//     "eyr:2024",
//     "ecl:brn pid:760753108 byr:1931",
//     "hgt:179cm",
//     "",
//     "hcl:#cfa07d eyr:2025 pid:166559648",
//     "iyr:2011 ecl:brn hgt:59in",
// ];

// let raw = [
//     "eyr:1972 cid:100",
//     "hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926",
//     "",
//     "iyr:2019",
//     "hcl:#602927 eyr:1967 hgt:170cm",
//     "ecl:grn pid:012533040 byr:1946",
//     "",
//     "hcl:dab227 iyr:2012",
//     "ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277",
//     "",
//     "hgt:59cm ecl:zzz",
//     "eyr:2038 hcl:74454a iyr:2023",
//     "pid:3556412378 byr:2007",
//     "",
//     "pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980",
//     "hcl:#623a2f",
//     "",
//     "eyr:2029 ecl:blu cid:129 byr:1989",
//     "iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm",
//     "",
//     "hcl:#888785",
//     "hgt:164cm byr:2001 iyr:2015 cid:88",
//     "pid:545766238 ecl:hzl",
//     "eyr:2022",
//     "",
//     "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719",
// ];

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

// console.dir(passports, { maxArrayLength: null });

let validPassports = [];
let validPassportsWithGoodValues = [];
passports.map((passport) => {
    let fields = passport.split(" ");
    let isValid = fields.length === 8 || (fields.length === 7 && !passport.includes("cid"));

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
                pidValid = value.match(/^[0-9]{9}$/g) != null && value.length == 9;
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

    if (isValid) {
        validPassports.push(passport);
    }

    if (isValid && hasGoodValues) {
        validPassportsWithGoodValues.push(passport);
    }
});

console.log(validPassports.length);
console.log(validPassportsWithGoodValues.length);

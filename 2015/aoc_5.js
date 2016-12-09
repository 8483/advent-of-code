`
LINK: http://adventofcode.com/day/5
INPUT: http://adventofcode.com/day/5/input

--- Day 5: Doesn't He Have Intern-Elves For This? ---

Santa needs help figuring out which strings in his text file are naughty or nice.

A nice string is one with all of the following properties:

It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
For example:

ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.
aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.
jchzalrnumimnmhp is naughty because it has no double letter.
haegwjzuvuyypxyu is naughty because it contains the string xy.
dvszwmarrgswjxmb is naughty because it contains only one vowel.
How many strings are nice?

Your puzzle answer was 238.`

var input = document.body.textContent;

var data = input.split("\n");

function check(data){
    var arr = [];
    for(i=0;i<data.length;i++){
        var string = data[i];
        if(string.match(/([aeiou].*){3,}/) && string.match(/(.)\1/) && string.match(/ab|cd|pq|xy/)) {
            arr.push(string);
        }
    }
    return arr;
}

console.log(check(data).length);
//-----------------------------------------------------------------------------------
// SEXY SOLUTION
document.body.textContent.split('\n')
.filter(s => {
  return s.match(/([aeiou].*){3,}/) && s.match(/(.)\1/) && !s.match(/ab|cd|pq|xy/);
}).length

//-----------------------------------------------------------------------------------
// THIS ONE IS BUGGED, DONT KNOW WHY. THE COUNTVOWELS RETURNS A WRONG COUNT.*************
var input = document.body.textContent;

var data = input.split("\n");
var vowels = "aeiou".split("");
var not = ["ab", "cd", "pq", "xy"];
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function countVowels(string) {
    var count = 0;
    for (var i = 0; i < vowels.length; i++) {
        if(string.indexOf(vowels[i]) > -1) {
            count += 1;
        }
    }  
    return count;
}

function checkDouble(string) {
    var count = 0;
    for (var i = 0; i < alphabet.length; i++) {
        var condition = alphabet[i] + alphabet[i];
        if (string.indexOf(condition) > -1) {
            count += 1;
        }
    }
    return count;
}

function checkNot(string) {
    var count = 0;
    for (var i = 0; i < not.length; i++) {
        if (string.indexOf(not[i]) > -1) {
            count += 1;
        }
    }
    return count;
}

function check(data){
    var arr = [];
    for(i=0;i<data.length;i++){
        var string = data[i];
        if(countVowels(string) >= 3 && checkDouble(string) > 0 && checkNot(string) == 0) {
            arr.push(string);
        }
    }
    return arr;
}

console.log(check(data));
console.log(check(data).length);

var input = document.body.textContent;

var data = input.split("\n");
var vowels = "aeiou".split("");
var not = ["ab", "cd", "pq", "xy"];
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function check(data){
    var arr = [];
    for(i=0;i<data.length;i++){
        var string = data[i];
        if(string.match(/([aeiou].*){3,}/) && string.match(/(.)\1/) && string.match(/ab|cd|pq|xy/)) {
            arr.push(string);
        }
    }
    return arr;
}

console.log(check(data).length);

`--- Part Two ---

Realizing the error of his ways, Santa has switched to a better model of determining whether a string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.

Now, a nice string is one with all of the following properties:

It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
For example:

qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).
xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.
uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.
ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.
How many strings are nice under these new rules?

Your puzzle answer was 69.`

var input = document.body.textContent;

var data = input.split("\n");

function check(data){
    var arr = [];
    for(i=0;i<data.length;i++){
        var string = data[i];
        if(string.match(/(\w{2}).*?\1/) && string.match(/(\w).\1/)) {
            arr.push(string);
        }
    }
    return arr;
}

console.log(check(data).length);






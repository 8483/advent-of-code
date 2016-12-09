`
LINK: http://adventofcode.com/day/4
INPUT: iwrupvqb

--- Day 4: The Ideal Stocking Stuffer ---

Santa needs help mining some AdventCoins (very similar to bitcoins) to use as gifts for all the economically forward-thinking little girls and boys.

To do this, he needs to find MD5 hashes which, in hexadecimal, start with at least five zeroes. The input to the MD5 hash is some secret key (your puzzle input, given below) followed by a number in decimal. To mine AdventCoins, you must find Santa the lowest positive number (no leading zeroes: 1, 2, 3, ...) that produces such a hash.

For example:

If your secret key is abcdef, the answer is 609043, because the MD5 hash of abcdef609043 starts with five zeroes (000001dbbfa...), and it is the lowest such number to do so.
If your secret key is pqrstuv, the lowest number it combines with to make an MD5 hash starting with five zeroes is 1048970; that is, the MD5 hash of pqrstuv1048970 looks like 000006136ef....
Your puzzle answer was 346386.`

// Console in https://blueimp.github.io/JavaScript-MD5/

var key = "iwrupvqb"; // Took 3 min in Chrome Console
var num = 0; //609043. 000001dbbfa3a5c83a2d506429c7b00e
var str = "";

while (str != "00000") {
    str = md5(key + num).substring(0, 5);
    //console.log(num + ". " + str); This slows the whole thing by a fuckton.
    num++;
}

`Now find one that starts with six zeroes.

Your puzzle answer was 9958218.`

// My code takes 2 min, which is 30 seconds slower than this one.

i = 0;while(!(md5('iwrupvqb' + ++i).startsWith('0')));i




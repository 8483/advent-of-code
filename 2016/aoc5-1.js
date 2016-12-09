var md5 = require("md5");

// var doorId = "abc";
var doorId = "ffykfhsq";
var passLength = 0;
var i = 0;
var password = "";

while(passLength < 8){
    var hash = md5(doorId + i);
    if(hash.substring(0, 5) == "00000"){
        console.log(doorId + i + " " + hash);
        password += hash.substring(5,6);
        i++;
        passLength++;
    } else {
        i++;
    }
}

console.log(password);

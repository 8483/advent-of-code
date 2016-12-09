var md5 = require("md5");

// var doorId = "abc";
var doorId = "ffykfhsq";
var passLength = 0;
var i = 0;
// var password = "";
var password = ["","","","","","","",""]
var index = 0;

while(passLength < 8){
    var hash = md5(doorId + i);
    if(hash.substring(0, 5) == "00000"){
        index = parseInt(hash.substring(5,6));
        if(index < 8){
            var char = hash.substring(6,7);
            if(password[index] == ""){
                console.log(index + " " + char + " " + doorId + i + " " + hash);
                password[index] = char;
                passLength++;
                i++;
            } else {
                console.log("    " + index + " " + char + " " + doorId + i + " " + hash);
                i++;
            }
        } else {
            console.log("        " + index + " " + char + " " + doorId + i + " " + hash);
            i++;
        }
    } else {
        i++;
    }
}

console.log(password);

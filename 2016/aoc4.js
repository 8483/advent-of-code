var test = `aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]`
var raw = test.split("\n");
// var raw2 = raw.map(function(item){
//     var result = item.replace("[","-");
//     var result2 = result.replace("]","");
//     return result2;
// })
// var data = raw2.map(function(item){
//     return item.split("-");
// })
// var sumCheck = data.map(function(item){
//     return item.splice(item.length-2,2);
// })
// console.log(data);
// console.log(sumCheck);

var left = raw.map(function(item){
    return item.substring(0, item.length-10)
})

var right = raw.map(function(item){
    return item.substring(item.length-10, item.length)
})
console.log(left);
console.log(right);
// Try to solve with substring the last 10 characters insted of splitting. Use regex to count the letters.

var testString = "aaaaa-bbb-z-y-x-123[abxyz]"

function countLetters(string) {
    var alphabet = ["abcdefghijklmnopqrstuvwxyz"]
    for(var i = 0; i < 26; i++){
        countLetter(alphabet[0][i], string);
    }
}

function countLetter(letter, string){
    var regex = new RegExp(letter,"g");
    console.log(letter + " = " + (string.match(regex) || []).length);
}

countLetters(testString);

var input = "L1, L3, L5, L3, R1, L4, L5, R1, R3, L5, R1, L3, L2, L3, R2, R2, L3, L3, R1, L2, R1, L3, L2, R4, R2, L5, R4, L5, R4, L2, R3, L2, R4, R1, L5, L4, R1, L2, R3, R1, R2, L4, R1, L2, R3, L2, L3, R5, L192, R4, L5, R4, L1, R4, L4, R2, L5, R45, L2, L5, R4, R5, L3, R5, R77, R2, R5, L5, R1, R4, L4, L4, R2, L4, L1, R191, R1, L1, L2, L2, L4, L3, R1, L3, R1, R5, R3, L1, L4, L2, L3, L1, L1, R5, L4, R1, L3, R1, L2, R1, R4, R5, L4, L2, R4, R5, L1, L2, R3, L4, R2, R2, R3, L2, L3, L5, R3, R1, L4, L3, R4, R2, R2, R2, R1, L4, R4, R1, R2, R1, L2, L2, R4, L1, L2, R3, L3, L5, L4, R4, L3, L1, L5, L3, L5, R5, L5, L4, L2, R1, L2, L4, L2, L4, L1, R4, R4, R5, R1, L4, R2, L4, L2, L4, R2, L4, L1, L2, R1, R4, R3, R2, R2, R5, L1, L2"

// PART 1 =================================================

var locations = [];

function find(input){
    var data = input.split(", ");
    var direction = 0; // 0 = North, 1 = East, 2 = South, 3 = West
    var facing = "N";
    function turnLeft(){
        switch(facing){
            case "N":
                facing = "W";
                break;
            case "W":
                facing = "S";
                break;
            case "S":
                facing = "E";
                break;
            case "E":
                facing = "N";
                break;
        }
    }

    function turnRight(){
        switch(facing){
            case "N":
                facing = "E";
                break;
            case "E":
                facing = "S";
                break;
            case "S":
                facing = "W";
                break;
            case "W":
                facing = "N";
                break;
        }
    }

    function turn(dir){
        if(dir.includes("L")){
            turnLeft();
        } else {
            turnRight();
        }
    }

    function getDistance(dis){
        return parseInt(dis.substring(1, dis.length));
    }

    var x = 0;
    var y = 0;

    for(var i = 0; i < data.length; i++){
        turn(data[i]);
        var distance = getDistance(data[i]);
        switch (facing) {
            case "N":
                for( var j = 0; j < distance; j++){
                    y += 1;
                    locations.push([x, y])
                }
                break;
            case "E":
                for( var j = 0; j < distance; j++){
                    x += 1;
                    locations.push([x, y])
                }
                break;
            case "S":
                for( var j = 0; j < distance; j++){
                    y -= 1;
                    locations.push([x, y])
                }
                break;
            case "W":
                for( var j = 0; j < distance; j++){
                    x -= 1;
                    locations.push([x, y])
                }
                break;
        }
    }

    var result = Math.abs(x) + Math.abs(y);

    console.log("The rabbit HQ is " + result + " blocks away.");
    return result;
}

// PART 2 =================================================

var trail = [];

function findVisited(locations){
    for(var k = 0; k < locations.length; k++){
        var item = locations[k].toString();
        if(trail.indexOf(item) > -1){
            var sum = Math.abs(locations[k][0]) + Math.abs(locations[k][1]);
            console.log("Same location is " + sum + " blocks away.");
            break;
        } else {
            trail.push(item);
        }
    }
}

find(input);
findVisited(locations);

import { main } from './main/main.js';
import { render } from './main/render.js';

import { UserInput } from './main/input/userInput.js';
import { KeyboardInput } from './main/input/devices/keyboardInput.js';
import { MouseInput } from './main/input/devices/mouseInput.js';


const update = new Worker('./scripts/main/update.js', {type: 'module'});
const userInput = new UserInput({
    keyboard: new KeyboardInput,
    // mouse: new MouseInput
});

main.init(userInput, update, render);

// 4 per row
// 3 rows -- arr.length / 4

/*
    newX = y
    newY = 
*/

/*
01 02 03 04
05 06 07 08
09 10 11 12
13 14 15 16

CC
04 08 12 16
03 07 11 15
02 06 10 14
01 05 09 13

C
13 09 05 01
14 10 06 02
15 11 07 03
16 12 08 04

12 + y - (x + 4)
*/

var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

var rotateClockWise = arr => {
    var rotated = [];

    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < arr.length / 4; x++) {
            var index = arr[(y * 4) + x];

            rotated[3 - y + (x * 4)] = index;
        }
    }

    return rotated;
};



var rotateCounterClockwise = arr => {
    var rotated = [];

    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < arr.length / 4; x++) {
            var index = arr[(y * 4) + x];

            rotated[y + ((3 - x) * 4)] = index;
        }
    }

    return rotated;
};



console.log(rotateClockWise(rotateClockWise(arr)));
console.log(rotateCounterClockwise(rotateCounterClockwise(arr)));
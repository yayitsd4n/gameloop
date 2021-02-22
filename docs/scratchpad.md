```javascript

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
```
const moveCommand = function(direction) {
    return function(actor) {
        if (actor) {
            actor.move(direction);
        }
        console.log(`Move ${direction}`);
    }
};

const rotateCommand = function(direction) {
    return function(actor) {
        if (actor) {
            actor.rotate(direction);
        }
        console.log(`Rotate ${direction}`);
    }
};

const commands = {
    left: moveCommand('left'),
    right: moveCommand('right'),
    down: moveCommand('down'),
    rotateClockwise: rotateCommand('clockwise'),
    rotateCounterClockwise: rotateCommand('counterClockwise')
};

export { commands };
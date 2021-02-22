const backward = function() {
    return function(actor) {
        if (actor) {
            actor.backward();
        }
    }
};

const forward = function() {
    return function(actor) {
        if (actor) {
            actor.forward();
        }
    }
};

const togglePlay = function() {
    return function(actor) {
        if (actor) {
            actor.togglePlay();
        }
    }
};

const toggleDebug = function() {
    return function(actor) {
        if (actor) {
            actor.toggleDebug();
        }
    }
}

const commands = {
    toggleDebug: toggleDebug(),
    togglePlay: togglePlay(),
    backward: backward(),
    forward: forward()
};

export { commands };
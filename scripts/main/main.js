const noop = function(){};

class Main {
    constructor(gameWorld = noop, userInput = noop, update = noop, render = noop, begin = noop, end = noop) {
        this.gameWorld = gameWorld;
        this.userInput = userInput;
        this.update = update;
        this.render = render;
        this.begin = begin;
        this.end = end;

        this.running = false;
    }

    init() {
        // Start listening for user input
        this.userInput.init();
        // Start the worker
        this.update.postMessage(['init', this.gameWorld]);
        this.update.onmessage = e => {
            var event = e.data[0];
            var data = e.data[1];
 
            if (event == 'initalized') {
                this.update.postMessage(['run']);
                this.run();
            }

            if (event == 'updateFrameEnd') {
                this.gameWorld = data;

                // Get new user inputs
                var inputs = this.userInput.getInputEvents()
                if (inputs.length) {
                    this.update.postMessage(['updateUserInput', inputs]);
                }
            }
        }
    }

    run() {
        if (! this.render.running) {
            this.render.start();
        }
    }

    stop() {
        this.render.stop();
        this.update.postMessage(['stop']);
    }
};

export { Main };
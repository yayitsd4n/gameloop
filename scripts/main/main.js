const noop = function(){};

var messages = {
    initalized() {
        this.update.postMessage(['run']);
        this.running = true;
        this.run();
    },
    updateFrameEnd(data) {
        //this.render.update(data);
        
        // Get new user inputs
        var inputs = this.userInput.getInputEvents();
        if (inputs.length) {
            this.update.postMessage(['updateUserInput', inputs]);
        }
    }
};

const main = {
    init(userInput = noop, update = noop, render = noop, begin = noop, end = noop) {
        this.setComponents(userInput, update, render, begin, end);
        // Start listening for user input
        this.userInput.init();
        // Start the worker
        this.update.postMessage(['init']);
        
        // Process messages from update function
        this.update.onmessage = e => {
            var message = e.data[0];
            var data = e.data[1];

            if (message in messages) {
                messages[message].call(this, data);
            }
        }
    },

    setComponents(userInput, update, render, begin, end) {
        this.userInput = userInput;
        this.update = update;
        this.render = render;
        this.begin = begin;
        this.end = end;

        this.running = false;
    },

    run() {
        this.render.start();
    },
};

export { main };
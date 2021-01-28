import { entityFactory } from '../shared/entities/entityFactory.js';
import { spacesFactory } from '../shared/spaces/spacesFactory.js';
import { DebugInstance } from '../shared/debug/debugInstance.js';



const noop = function(){};

var messages = {

    initalized() {
        this.update.postMessage(['run']);
        this.running = true;
        this.run();
    },
    updateFrameEnd(data) {
        if (data) {

            // // rewire entities
            // data.gameWorld.entities.forEach((entity, index) => {
            //     data.gameWorld.entities[index] = entities.restore(entity);
            // });
            // rewire debug
            if (data.debugData) {
                var debugData = data.debugData;
                data.debugData = new DebugInstance(debugData);
            }
           
            this.render.update(data);
        }
        
        
        // Get new user inputs
        var inputs = this.userInput.getInputEvents();
        if (inputs.length) {
            this.update.postMessage(['updateUserInput', inputs]);
        }
    },
    toggleDebugRender(state) {
        this.render.toggleDebug();
        console.log(`debugRender is ${state}`);
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
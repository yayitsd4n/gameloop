import { update as updateExt } from '../game/update/update.js';

import { commands } from './input/commands.js';
import { bindings } from './input/keyBindings.js';

import { debug } from '../shared/debug.js';

/*
    Inputs can have different bindings and commands depending on the context
        * General gameplay
        * Menus
        * Interacting with objects
        * Dialogue choice
        * etc
    
    Input combinations can also generate commands (buffered input)
    Holding an input down can generate a command
    The current state of a thing can change what commands are available
    
    import playerStates;

    Player {
        x,
        y,
        state: playerStates.ducking,
        inputHandler = new InputHandler(),
        update() {
            var inputsThisFrame = this.inputHandler.getInputs();
            state.update();
        }
    }

    Main listens for events and passes them to update as raw inputs
    Update has an inputhandler to catch global events
        * Open menu
        * Debug?
    Entities can have an inputhandler (usually only one does)
        * Main gameplay control
    Inputhandler
        * Performs binding between game default controls and user config
        * Consumes the raw input if it's in the bindings. Leaves it if it's not.
        * Returns default key binding or null
    Entites
        * Have state.
            * Track how long they've been in a state (replaces active keys)

    

*/

var updateMessages = {
    init() {
        this.init();
        postMessage(['initalized']);
    },
    updateUserInput(data) {
        this.playerInputs.set(data);
    },
    run() {
        this.running = true;
        this.run();
    }
};

onmessage = e => {
    var message = e.data[0];
    var data = e.data[1];

    if (message in updateMessages) {
        updateMessages[message].call(updateProps, data);
    }
};

var updateProps = {
    stores: {},
    time: {
        currentTimeMS: null,
        lastTimeMS: null,
        elapsedMS: null,
        lag: 0,
        ticksPerSecond: 1000 / 120
    },
    playerInputs: {
        inputs: [],
        get(bindings) {
            if (! this.inputs) return;

            if (!bindings) {
                return this.inputs.splice(0);
            }

            var inputs;
            for (var device in bindings) {
                inputs = 
                    this.inputs.filter(input => {
                        return input.device == device;
                    }).filter(input => {
                        return input.key in bindings[device];
                    });
            };

            return inputs.sort((a,b) => a.timeStamp - b.timeStamp);
        },
        set(inputs) {
            this.inputs = inputs;
        },
        clear() {
            this.inputs.length = 0;
        }
    },
    running: false,
    debug: {
        history: [],
        position: 0,
        running: false,
        on: false
    }
};

var update = {
    init() {
        // Call shadowed init methods. Works, but feels like a hack.
        var proto = Object.getPrototypeOf(update);
        while (proto) {
            if ('init' in proto) {
                proto.init.call(this);
            }

            proto = Object.getPrototypeOf(proto);
        }
    },

    update(ticksPerSecond) {
        var proto = Object.getPrototypeOf(update);
        while (proto) {
            if ('update' in proto) {
                proto.update.call(this);
            }

            proto = Object.getPrototypeOf(proto);
        }
    },

    run() {
        this.running = true;

        this.updateLoop = setInterval(() => {

            var inputs = this.playerInputs.get(bindings);
            
            inputs.filter(input => input.eventType == 'keydown').forEach(input => {
                var command = bindings[input.device][input.key];
                
                if (command != 'toggleDebug') {
                    if (this.debug.on == true) {
                        commands[command](this);
                    }
                } else {
                    commands[command](this);
                }
            });
            

            if (this.running) {
                if (this.time.lastTimeMS === null) this.time.lastTimeMS = performance.now();
                this.time.currentTimeMS = performance.now();
                this.time.elapsedMS = this.time.currentTimeMS - this.time.lastTimeMS;
                this.time.lastTimeMS = this.time.currentTimeMS;
                this.time.lag += this.time.elapsedMS;

                this.simulateFrame();
            } else {
                this.debugFrame();
            }
            
            this.playerInputs.clear();
        });
    },

    debugFrame() {
        if (this.debug.running) {
            switch(Math.sign(this.debug.position)) {
                case -1:
                case 0:
                    postMessage(['updateFrameEnd', this.debug.history[this.debug.history.length + this.debug.position]]);
                    this.debug.running = false;
                break;
    
                case 1:
                    this.time.lag += this.time.ticksPerSecond * this.debug.position;
                    this.simulateFrame();
                    this.debug.position = 0;
                    this.debug.running = false;
                break;  
            }
        } else {
            postMessage(['updateFrameEnd']);
        }
        
    },

    simulateFrame() {
        while (this.time.lag >= this.time.ticksPerSecond) {
            this.stores.debug = new debug();

            this.update(this.time.ticksPerSecond);
            this.time.lag -= this.time.ticksPerSecond;

            this.debug.history.push(JSON.parse(JSON.stringify(this.stores)));
            
            postMessage(['updateFrameEnd', this.stores]);
        }
    },

    toggleDebug() {
        this.debug.on = !this.debug.on;
        console.log(`Debug is ${this.debug.on}`);
    },

    togglePlay() {
        if (this.running == true) {
            this.pause();
        } else {
            this.play();
        }
    },

    pause() {
        this.running = false;

        if (this.time.currentTimeMS) {
            for (var prop in this.time) {
                if (prop != 'ticksPerSecond') {
                    this.time[prop] = null;
                }
            }
        }
    },

    play() {
        if (this.debug.position != 0) {
            this.debug.history = this.debug.history .slice(0, this.debug.history .length - this.debug.position);
            this.debug.position = 0;
            this.debug.running = false;
        }
        
        this.running = true;
    },

    backward(frames = 1) {
        if (this.running) this.pause();
        if (! this.debug.running) this.debug.running = true;
        this.debug.position -= frames;
    },

    forward(frames = 1) {
        if (this.running) this.pause();
        if (! this.debug.running) this.debug.running = true;
        this.debug.position += frames;
    }
};

if (updateExt) Object.setPrototypeOf(update, updateExt);
Object.setPrototypeOf(updateProps, update);
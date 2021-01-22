import { updateExt } from '../game/update/update.js';
import { Spaces } from '../shared/spaces/spaces.js';
import { Debug } from '../shared/debug.js';
import { ServiceLocator } from '../shared/serviceLocator.js';
import { UserInput } from './input/userInput.js';
import { commands } from './input/commands.js';
import { bindings } from './input/keyBindings.js';


var spaces = new Spaces();
var userInput = new UserInput();
var debug = new Debug();

var serviceLocator = new ServiceLocator();
serviceLocator.register('spaces', spaces);
serviceLocator.register('userInput', userInput);
serviceLocator.register('debug', debug);

var updateMessages = {
    init() {
        this.init();
        postMessage(['initalized']);
    },
    updateUserInput(data) {
        userInput.set(data);
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
    time: {
        currentTimeMS: null,
        lastTimeMS: null,
        elapsedMS: null,
        lag: 0,
        ticksPerSecond: 1000 / 120
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
        // I should refactor this since there's only going to be one thing to init
        var proto = Object.getPrototypeOf(update);
        while (proto) {
            if ('init' in proto) {
                proto.init.call(this, serviceLocator);
            }

            proto = Object.getPrototypeOf(proto);
        }
    },

    update(ticksPerSecond) {
        var proto = Object.getPrototypeOf(update);
        while (proto) {
            if ('update' in proto) {
                proto.update.call(this, serviceLocator);
            }

            proto = Object.getPrototypeOf(proto);
        }
    },

    run() {
        this.running = true;

        this.updateLoop = setInterval(() => {

            var inputs = userInput.get(bindings);
            
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
            
            userInput.clear();
        });
    },

    debugFrame() {
        if (this.debug.running) {
            switch(Math.sign(this.debug.position)) {
                case -1:
                case 0:
                    this.frameEnd(this.debug.history[this.debug.history.length + this.debug.position]);
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
            this.frameEnd()
        }
        
    },

    simulateFrame() {
        while (this.time.lag >= this.time.ticksPerSecond) {

            this.update(this.time.ticksPerSecond);
            this.time.lag -= this.time.ticksPerSecond;

            this.debug.history.push(JSON.parse(JSON.stringify(spaces)));
            
            this.frameEnd(spaces);
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
    },

    frameEnd(updateData) {
        postMessage(['updateFrameEnd', updateData || null]);
        debug.clear();
    }
};

if (updateExt) Object.setPrototypeOf(update, updateExt);


Object.setPrototypeOf(updateProps, update);
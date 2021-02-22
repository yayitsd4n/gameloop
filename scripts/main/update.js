import { updateExt } from '../ext/update';
import { Spaces } from '../spaces/spaces';
import { Debug } from '../debug/debug';
import { ServiceLocator } from '../misc/serviceLocator';
import { UserInput } from './input/userInput';
import { default as workerLink } from '../misc/workerLink';


var spaces = new Spaces();
var userInput = new UserInput();
var debug = new Debug();
workerLink.init();

var serviceLocator = new ServiceLocator();
serviceLocator.register('workerLink', workerLink);
serviceLocator.register('userInput', userInput);
serviceLocator.register('spaces', spaces);
serviceLocator.register('debug', debug);



var update = {
    time: {
        running: false,
        currentTimeMS: null,
        lastTimeMS: null,
        elapsedMS: null,
        lag: 0,
        ticksPerSecond: 1000 / 120,
        position: 0
    }
};

var updateFns = {
    init() {
        // Call shadowed init methods. Works, but feels like a hack.
        var proto = Object.getPrototypeOf(updateFns);
        while (proto) {
            if ('init' in proto) {
                proto.init.call(this, serviceLocator);
            }

            proto = Object.getPrototypeOf(proto);
        }

        return 'init';
    },

    update() {
        var proto = Object.getPrototypeOf(updateFns);
        while (proto) {
            if ('update' in proto) {
                proto.update.call(this, serviceLocator);
            }

            proto = Object.getPrototypeOf(proto);
        }
    },

    start() {
        this.time.running = true;
        console.log('update running');

        this.updateLoop = setInterval(() => {

            if (this.time.lastTimeMS === null) this.time.lastTimeMS = performance.now();
            this.time.currentTimeMS = performance.now();
            this.time.elapsedMS = this.time.currentTimeMS - this.time.lastTimeMS;
            this.time.lastTimeMS = this.time.currentTimeMS;
            this.time.lag += this.time.elapsedMS;

            this.simulateFrame();
        });
    },

    simulateFrame() {
        while (this.time.lag >= this.time.ticksPerSecond) {
            if (this.time.position > 1) {
                while (this.time.position) {
                    this.update(this.time.ticksPerSecond);

                    console.log('debug forward');
                    this.time.position--;
                }

                this.time.currentTimeMS = null;
                this.time.lastTimeMS = null;
                this.time.elapsedMS = null;
                this.time.lag = null;
            }

            if (this.time.position <= 0) {
                this.update(this.time.ticksPerSecond);
                this.time.lag -= this.time.ticksPerSecond;
            }
        }
    },

    getUpdateFrame() {
        return {
            spaces: spaces.get(this.time.position),
            debug: debug.get(this.time.position),
            lag: this.time.lag / this.time.ticksPerSecond
        };
    }
};

if (updateExt) Object.setPrototypeOf(updateFns, updateExt);


Object.setPrototypeOf(update, updateFns); 

workerLink.register('initUpdate', update.init.bind(update));
workerLink.register('startUpdate', update.start.bind(update));
workerLink.register('getUpdateFrame', update.getUpdateFrame.bind(update));
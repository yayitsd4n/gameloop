import { update as updateExt } from '../game/update/update.js';
import { updateMessages as updateMessagesExt } from '../game/update/updateMessages.js';

var updateMessages = {
    init(data) {
        this.init(data);
        postMessage(['initalized']);
    },
    run() {
        this.run();
    },
    stop() {
        this.stop();
    }
};
updateMessages = Object.assign(updateMessages, updateMessagesExt);


onmessage = e => {
    var message = e.data[0];
    var data = e.data[1];

    if (message in updateMessages) {
        updateMessages[message].call(update, data);
    }
};

var update = {
    gameWorld: null,

    currentTimeMS: null,
    lastTimeMS: null,
    elapsedMS: null,
    lag: 0,
    ticksPerSecond: 1000/120
};

var updateProto = {
    init(gameWorld) {
        this.gameWorld = gameWorld;

        // Call shadowed init methods. Works, but feels like a hack.
        var proto = Object.getPrototypeOf(updateProto);
        while (proto) {
            if ('init' in proto) {
                proto.init.call(this);
            }

            proto = Object.getPrototypeOf(proto);
        }

        this.lastTimeMS = performance.now();
    },

    run() {
        this.running = true;

        this.updateLoop = setInterval(()=> {
            this.currentTimeMS = performance.now();
            this.elapsedMS = this.currentTimeMS - this.lastTimeMS;
            this.lastTimeMS = this.currentTimeMS;
            this.lag += this.elapsedMS;

            while (this.lag >= this.ticksPerSecond) {
                this.update(this.ticksPerSecond);
                this.lag -= this.ticksPerSecond;
                postMessage(['updateFrameEnd', this.gameWorld]);
            }
        });
    },

    stop() {
        clearInterval(this.updateLoop);
    }
};

Object.setPrototypeOf(updateProto, updateExt);
Object.setPrototypeOf(update, updateProto);
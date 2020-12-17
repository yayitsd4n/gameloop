import { update as updateExt } from '../game/update/update.js';
import { updateMessages as updateMessagesExt } from '../game/update/updateMessages.js';

class debug {
    constructor() {
        this.misc = []
    }
    add(section = 'misc', data) {
        if ((section in this) == false) {
            this[section] = [];
        }

        this[section].push(data);
    }
}

var updateMessages = {
    init() {
        this.init();
        postMessage(['initalized']);
    },
    updateUserInput(data) {

    },
    run() {
        this.run();
    }
};

if (updateMessagesExt) updateMessages = Object.assign(updateMessages, updateMessagesExt);

onmessage = e => {
    var message = e.data[0];
    var data = e.data[1];

    if (message in updateMessages) {
        updateMessages[message].call(update, data);
    }
};


var update = {
    stores: {},
    time: {
        currentTimeMS: null,
        lastTimeMS: null,
        elapsedMS: null,
        lag: 0,
        ticksPerSecond: 1000 / 120
    },
    context: null,
    historyPosition: 0
};

var updateProto = {
    init() {
        // Call shadowed init methods. Works, but feels like a hack.
        var proto = Object.getPrototypeOf(updateProto);
        while (proto) {
            if ('init' in proto) {
                proto.init.call(this);
            }

            proto = Object.getPrototypeOf(proto);
        }

        this.time.lastTimeMS = performance.now();
    },

    run() {
        this.updateLoop = setInterval(() => {
            this.time.currentTimeMS = performance.now();
            this.time.elapsedMS = this.time.currentTimeMS - this.time.lastTimeMS;
            this.time.lastTimeMS = this.time.currentTimeMS;

            if (this.context == 'game') {

                if (this.historyPosition == 0) {
                    this.simulateGameFrame();

                } else if (this.historyPosition > 0) {

                    for (var prop in this.time) {
                        if (prop != 'ticksPerSecond') {
                            this.time[prop] = 0;
                        }
                    }

                    this.time.lag += this.time.ticksPerSecond * this.historyPosition;
                    this.simulateGameFrame();

                    this.historyPosition = 0;
                    this.pause();

                } else if (this.historyPosition < 0) {
                    postMessage(['updateFrameEnd', updateHistory[updateHistory.length + this.historyPosition]]);
                    this.pause();

                }
            } else if (this.context == 'debug') {
                this.simulateDebug();
            }
        });
    },

    simulateDebugframe() {
        this.time.lag += this.time.elapsedMS;

        while (this.time.lag >= this.time.ticksPerSecond) {
            this.update(this.time.ticksPerSecond);
            this.time.lag -= this.time.ticksPerSecond;

            postMessage(['updateFrameEnd', {debug: this.stores.debug}]);
        }
    },

    simulateGameFrame() {
        this.time.lag += this.time.elapsedMS;

        while (this.time.lag >= this.time.ticksPerSecond) {
            this.stores.debug = new debug();

            this.update(this.time.ticksPerSecond);
            this.time.lag -= this.time.ticksPerSecond;

            updateHistory.push(JSON.parse(JSON.stringify(this.stores)));
            postMessage(['updateFrameEnd', this.stores]);
        }
    },

    pause() {
        this.context = 'debug';
    },

    play() {
        if (this.historyPosition != 0) {
            updateHistory = updateHistory.slice(0, updateHistory.length - this.historyPosition);
            this.historyPosition = 0;
        }
        
        this.context = 'game';
    },

    backward(frames) {
        this.historyPosition -= frames;
        this.context = 'game';
    },

    forward(frames) {
        this.historyPosition += frames;
        this.context = 'game';
    }
};

var updateHistory = [];

if (updateExt) Object.setPrototypeOf(updateProto, updateExt);
Object.setPrototypeOf(update, updateProto);
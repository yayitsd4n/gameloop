import { GameRender } from '../game/render/gameRender.js';
import { debugRender } from '../game/render/debugRender.js';

var render = {
    running: false,
    stores: {
        gameWorld: null,
        debug: null
    }
};

var renderProto = {
    update({gameWorld, debug}) {
        this.stores.gameWorld = gameWorld;
        if (debug) this.stores.debug = debug;
    },

    render() {
        if (this.stores.debug) {
            debugRender.data = this.stores.debug;
            debugRender.update();
        }

        this.running = window.requestAnimationFrame(this.render.bind(this));
    },

    start() {
        this.running = window.requestAnimationFrame(this.render.bind(this));
    },

    stop() {
        window.cancelAnimationFrame(this.running);
    }
};

Object.setPrototypeOf(render, renderProto);

export { render };
//import { GameRender } from '../game/render/gameRender.js';
import { debugRender } from '../game/render/debugRender.js';

var render = {
    running: false,
    spaces: null,
    debug: null
};

var renderProto = {
    update({spaces, debug}) {
        this.spaces = spaces;
        if (debug) this.debug = debug;
    },

    render() {
        if (this.debug) {
            debugRender.data = this.debug;
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
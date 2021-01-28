var render = {
    running: false,
    debug: false,
    views: {
        spaces: null,
        debug: null
    }
};

var renderProto = {
    update({spacesData, debugData}) {
        if (spacesData) {
            this.views.spaces = spacesData;
        }
        if (debugData) {
            this.views.debug = debugData;
        }
    },

    render() {
        if (this.debug) {
            this.views.debug.render();
        }
        
        this.running = window.requestAnimationFrame(this.render.bind(this));
    },

    toggleDebug() {
        this.debug = !this.debug;

        if (this.debug) {
            this.views.debug.createView();
        } else {
            this.views.debug.removeView();
        }
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
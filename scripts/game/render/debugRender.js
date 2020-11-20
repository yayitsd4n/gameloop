class DebugRender {
    constructor() {
        this.debugData;
        this.running = false;
        this.canvas = document.querySelector('#debug');
    }

    update(debugData) {
        this.debugData = debugData;
    }

    execute() {
        this.running = window.requestAnimationFrame(this.execute.bind(this));
    }

    stop() {
        window.cancelAnimationFrame(this.running);
        this.running = false;
    }

    start() {
        this.running = window.requestAnimationFrame(this.execute.bind(this));;
    }
}

export { DebugRender }
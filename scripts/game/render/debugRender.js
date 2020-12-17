class DebugRender {
    constructor() {
        this.renderData = null;
        this.running = false;
        this.canvas = document.querySelector('#debug');
    }

    start() {
        this.running = window.requestAnimationFrame(this.execute.bind(this));;
    }

    stop() {
        window.cancelAnimationFrame(this.running);
        this.running = false;
    }

    update(renderData) {
        this.renderData = renderData;
    }

    execute() {
        
        this.running = window.requestAnimationFrame(this.execute.bind(this));
    }
}

export { DebugRender }
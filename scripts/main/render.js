class Render {
    constructor(...renderers) {
        this.renderers = renderers;
    }

    start() {
        this.renderers.forEach(renderer => {
            renderer.start();
        });
    }

    stop() {
        this.renderers.forEach(renderer => {
            renderer.stop();
        });
    }
}

export { Render };
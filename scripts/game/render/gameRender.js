class Render {
    constructor(gameWorld) {
        this.gameWorld = gameWorld;
        this.running = false;
        this.canvas = document.querySelector('#game');
    }

    update(gameWorld) {
        this.gameWorld = gameWorld;
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
};

export { Render };
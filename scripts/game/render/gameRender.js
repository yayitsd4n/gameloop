class GameRender {
    constructor() {
        this.gameWorld = [];
        this.running = false;
        this.canvas = document.querySelector('#game');
    }

    start() {
        //this.running = window.requestAnimationFrame(this.execute.bind(this));;
    }

    stop() {
        window.cancelAnimationFrame(this.running);
        this.running = false;
    }

    update(renderData) {
        //this.gameWorld = renderData.gameWorld;
    }

    execute() {
        // Only render if update has sent new frames
        if (this.gameWorld == null) return;
        
        /*
            Render the game
        */

        this.gameWorld = null;
    }
};

export { GameRender };
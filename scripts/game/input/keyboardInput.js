class KeyboardInput {
    constructor() {
        this.keyEvents = [];
    }

    init() {
        window.addEventListener('keydown', e => {
            this.addKeyEvent(e);
        });

        window.addEventListener('keyup', e => {
            this.addKeyEvent(e);
        });
    }

    addKeyEvent(key) {
        if (key.repeat) return;

        var keyEvent = {
            key: key.key,
            keyCode: key.keyCode,
            eventType: key.type
        };

        this.keyEvents.push(keyEvent);
    }

    getInputEvents() {
        return this.keyEvents.splice(0);
    }
}

export { KeyboardInput };
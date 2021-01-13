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
        
        this.keyEvents.push({
            key: key.key,
            eventType: key.type,
            timeStamp: key.timeStamp,
            device: 'keyboard'
        });
    }

    getInputEvents() {
        return this.keyEvents.splice(0);
    }
}

export { KeyboardInput };
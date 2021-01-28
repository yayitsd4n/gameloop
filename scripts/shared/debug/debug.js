import { DebugInstance } from './debugInstance.js';

class Debug {
    constructor() {
        this.current = new DebugInstance();
        this.history = [];
    }

    clear() {
        this.current = new DebugInstance();
    }
};

export { Debug };
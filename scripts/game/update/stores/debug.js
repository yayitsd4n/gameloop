var Debug = {
    currentTimeMS: null,
    updateFrameMS: null
};

var proto = {
    update(gameWorld) {
        this.currentTimeMS = performance.now();
        this.updateFrameMS = gameWorld.time.endTimeMS;
    }
};

Object.setPrototypeOf(Debug, proto);

export { Debug };
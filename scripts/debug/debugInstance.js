class DebugInstance {
    constructor(data) {
        for (var key in data) {
            this[key] = data[key];
        }
    }

    add(section = 'misc', data) {
        if ((section in this) == false) {
            this[section] = [];
        }
        this[section].push(data);
    }

    // render(debugState) {
    //     render.update(this, debugState);
    // }

    // createView() {
    //     render.createView();
    // }

    // removeView() {
    //     render.removeView();
    // }
}

export { DebugInstance };
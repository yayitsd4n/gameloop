import { render } from './render.js';


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

    render() {
        render.update(this);
    }

    createView() {
        render.createView();
    }

    removeView() {
        render.removeView();
    }
}

export { DebugInstance };
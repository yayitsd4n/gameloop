import { spacesFactory } from '../spaces/spacesFactory.js';

class Spaces {
    constructor() {
        this.current = [];
        this.history = [];
    }

    add(name, options) {
        var space = spacesFactory.create(name, options);
        space.type = name;

        this.current.unshift(space);

        return space;
    }

    update(lag) {
        this.saveToHistory();

        for (var i = 0; i < this.current.length; i++) {
            var space = this.current[i];
            space.update(lag);
        }
    }

    saveToHistory() {
        if (this.history.length >= 120) {
            this.history.splice(0, 1, this.current.splice(0));
        } else {
            this.history.push(this.current.slice(0));
        }
    }

    get(num) {
        return this.history[this.history.length - 1 + num];
    }

    remove(space) {
        for (var i = 0; i < this.current.length; i++ ) {
            if (space == this.current[i]) {
                this.current.splice(i, 1);
                break;
            }
        }
    }
};

export { Spaces };
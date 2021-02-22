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

    update() {
        //this.history.push(Object.assign({}, this.current));
        this.history.push(this.current.slice(0));

        for (var i = 0; i < this.current.length; i++) {
            var space = this.current[i];
            space.update();
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
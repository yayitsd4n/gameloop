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
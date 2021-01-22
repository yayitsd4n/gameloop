import { spacesFactory } from '../spaces/spacesFactory.js';

class Spaces {
    constructor() {
        this.list = []
    }

    add(name, options) {
        var space = spacesFactory.create(name, options);
        space.type = name;

        this.list.unshift(space);
    }

    remove(space) {
        for (var i = 0; i < this.list.length; i++ ) {
            if (space == this.list[i]) {
                this.list.splice(i, 1);
                break;
            }
        }
    }
};

export { Spaces };
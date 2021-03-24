import { DebugInstance } from '../debug/debugInstance';
import { spacesFactory } from '../spaces/spacesFactory';
import { entityFactory } from '../entities/entityFactory';

var render = {
    workerLink: null,
};


var renderProto = {
    init(workerLink) {
        this.workerLink = workerLink;
    },

    render() {    
        this.workerLink.callLinked('getUpdateFrame').then(({spaces, debug, lag}) => {
            debug = new DebugInstance(debug);
            if (spaces) {
                spaces.forEach((space, index) => {
                    for (var state in space.state) {
                        space.state[state].entities.forEach((entity, index) => {
                            state.entities[index] = entityFactory(entity.type, entity);
                        });
                    }
                    spaces[index] = spacesFactory.create(space.type, space);
                });
            };
            
            // debug.render();
            // spaces.render(lag);
            this.running = window.requestAnimationFrame(this.render.bind(this));  
        });
    },

    start() {
        this.running = window.requestAnimationFrame(this.render.bind(this));
    }
};

Object.setPrototypeOf(render, renderProto);

export default render;
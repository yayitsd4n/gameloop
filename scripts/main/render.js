import { DebugInstance } from '../debug/debugInstance';
import { spacesFactory } from '../spaces/spacesFactory.js';

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
                    spaces[index] = spacesFactory.create(space.type, space);
                });
            };
            

            this.running = window.requestAnimationFrame(this.render.bind(this));  
        });

              
    },

    start() {
        this.running = window.requestAnimationFrame(this.render.bind(this));
    }
};

Object.setPrototypeOf(render, renderProto);

export default render;
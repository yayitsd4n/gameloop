import { entities } from '../../../shared/entities/entities.js'


var GameWorld = {
    world: new Array(400).fill('.'),
    score: 0,
    time: 0,
    level: 1,
    entities: []
};

var proto = {
    init() {
        
    },
    update(update) {
        var gameWorld = this;

        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            
            entity.udpate();

            if (entity.exclusive) break;
        }

    },
    addEntity(entity) {
        this.entities.push(entity);
    }
};

Object.setPrototypeOf(GameWorld, proto);

export {GameWorld};
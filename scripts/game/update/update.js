import { GameWorld } from './stores/gameWorld.js';
import { entities } from '../../shared/entities/entities.js';

/*
    * entity.add creates a restore property that points to it's 'class'
    * each entity has a restore function that takes state and returns a new 'class'
    

    // Entities returns an object of all entities: {name: entity} 
    import { entities } from './entities/entities.js';

    function entityFactory(name, options) {
        var entity = new entities[name](options);
        entity.restore = name;

        return entity;
    }
*/

var update = {
    init() {
        this.stores.gameWorld = GameWorld;
        //this.stores.gameWorld.addEntity(Player(this.playerInput));
    },

    update() {
        var frameStartMs = performance.now();

        this.stores.gameWorld.update(this);
        
        this.stores.debug.add('Time', {
            type: 'keyValue',
            data: {
                key: 'Update Time MS',
                value: performance.now() - frameStartMs
            }
        });
        
    }
};

export { update }
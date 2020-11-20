import { PlayerInputHandler } from './input/playerInputHandler.js';
import { keyBindings } from './input/keyBindings.js';
import { commands } from './commands.js';
import { Player } from './entities/Player.js';

var gameWorldFns = {
    playerInput: null,
    update(ticksPerSecond) {  
        this.entities.forEach(entity => {
            entity.update(ticksPerSecond);
        });
    },
    addEntity(entity) {
        this.entities.push(entity);
    }
};

var update = {
    init() {
        Object.setPrototypeOf(this.gameWorld, gameWorldFns);
        this.playerInput = new PlayerInputHandler(keyBindings, commands);
        this.gameWorld.addEntity(Player(this.playerInput));
    },

    update(ticksPerSecond) {
        this.gameWorld.update(ticksPerSecond);
    }

};

export { update }
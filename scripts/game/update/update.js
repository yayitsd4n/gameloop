import { GameWorld } from './stores/gameWorld.js';

import { PlayerInputHandler } from './input/playerInputHandler.js';
import { keyBindings } from './input/keyBindings.js';
import { commands } from './commands.js';
import { Player } from './entities/Player.js';

var update = {
    init() {
        this.stores.gameWorld = GameWorld;
        this.context = 'game';
        this.gameContext = 'game';

        
        this.playerInput = new PlayerInputHandler(keyBindings, commands);
        this.stores.gameWorld.addEntity(Player(this.playerInput));
    },

    update(ticksPerSecond) {
        switch (this.context) {
            case 'game':
                var frameStartMs = performance.now();


                /*
                    * Pull input
                    * gameContext is used in gameWorld
                    * If gameWorld doens't use the input, let the input bubble up to
                      the main update. Main update will (probably) be configured to 
                      switch between debug and game contexts where these inputs could
                      do things.
                */

                this.stores.gameWorld.update(ticksPerSecond);



                this.stores.debug.add('Time', {
                    type: 'keyValue',
                    data: {
                        key: 'Update Time MS',
                        value: performance.now() - frameStartMs
                    }
                });
            break;
        }
        
    }
};

export { update }
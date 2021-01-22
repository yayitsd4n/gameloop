import { entityFactory } from '../../entities/entityFactory.js';
import { inputHandler } from './inputHandler.js';
import { update } from './update.js';


class mainMenu {
    constructor() {
        this.world = [
            ['play'],
            ['controls']
        ];
        this.entities = [
            entityFactory.create('menuButton', {
                text: 'Play',
                id: 'play',
                css: {
                    color: 'red'
                },
                selected: true
            }),
            entityFactory.create('menuButton', {
                text: 'Controls',
                id: 'Controls',
                css: {
                    color: 'orange'
                },
                selected: false
            })
        ];
        this.inputHandler = inputHandler;
        this.exclusive = true;
        this.fullscreen = true;
    }

    update(serviceLocator) {
        
        // this.inputHandler.update(this);
        // this.entities.forEach(entity => {
        //     entity.update(this);
        // });

        
    }
};

export { mainMenu };
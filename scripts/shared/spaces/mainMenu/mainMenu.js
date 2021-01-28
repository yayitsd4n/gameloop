import { entityFactory } from '../../entities/entityFactory.js';
import { inputHandler } from './inputHandler.js';
import { update } from './update.js';
import { render } from './render.js';


class mainMenu {
    constructor() {
        this.world = [
            ['play'],
            ['controls']
        ];
        this.entities = [];
        this.inputHandler = inputHandler;
        this.exclusive = true;
        this.fullscreen = true;
    }

    init() {
        this.entities.push(
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
        );
    }

    update(serviceLocator) {
        
        // this.inputHandler.update(this);
        // this.entities.forEach(entity => {
        //     entity.update(this);
        // });

        
    }
};

export { mainMenu };
import { entityFactory } from '../../entities/entityFactory';
import { inputHandler } from './inputHandler';


class mainMenu {
    constructor() {
        this.state = {
            current: {
                world: [
                    ['play'],
                    ['controls']
                ],
                entities: [],
                exclusive: true,
                fullscreen: true,
                count: 0
            },
            last: null
        };
        this.inputHandler = inputHandler;
    }

    init() {

    }

    update(serviceLocator) {
        this.state.last = Object.assign({}, this.state.current);
        this.state.current.count++;
        // this.inputHandler.update(this);
        // this.entities.forEach(entity => {
        //     entity.update(this);
        // });

        
    }
};

export { mainMenu };
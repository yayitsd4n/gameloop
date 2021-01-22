import { tetromino } from './tetromino/tetromino.js';
import { menuButton } from './menuButton/menuButton.js';

var entityFactory = {
    "tetromino": tetromino,
    "menuButton": menuButton
};

var entityFactoryFns = {
    create(name, options) {
        var entity = new this[name]();
        entity.restore = name;

        for (var prop in options) {
            entity[prop] = options[prop];
        }

        return entity;
    },
    restore(entityObj) {
        var entity = new this[entityObj.restore]();

        for (var prop in entityObj) {
            entity[prop] = entityObj[prop];
        }

        return entity;
    }
};

Object.setPrototypeOf(entityFactory, entityFactoryFns);
export { entityFactory };
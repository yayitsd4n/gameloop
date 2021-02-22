import { tetromino } from './tetromino/tetromino.js';

var entityFactory = {
    "tetromino": tetromino
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
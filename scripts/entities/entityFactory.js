import { tetromino } from './tetromino/tetromino.js';

var entityFactory = {
    "tetromino": tetromino
};

var entityFactoryFns = {
    create(name, options) {
        var entity = new this[name]();
        entity.type = name;

        for (var prop in options) {
            entity[prop] = options[prop];
        }

        return entity;
    }
};

Object.setPrototypeOf(entityFactory, entityFactoryFns);
export { entityFactory };
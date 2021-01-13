import { tetromino } from './tetromino/tetromino.js';

var entities = {
    tetromino: tetromino
};

var entityFns = {
    create(name, options) {
        var entity = new this[name](options);
        entity.restore = name;

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

Object.setPrototypeOf(entities, entityFns);
export { entities };
import { mainMenu } from './mainMenu/mainMenu.js';
import { tetrisBoard } from './tetrisBoard/tetrisBoard.js';

var spacesFactory = {
    "mainMenu": mainMenu,
    "TetrisBoard": tetrisBoard
};

var spacesFactoryFns = {
    create(name, options) {
        var spaces = new this[name]();
        spaces.restore = name;

        for (var prop in options) {
            spaces[prop] = options[prop];
        }

        return spaces;
    },
    restore(space) {
        var spaces = new this[space.restore]();

        for (var prop in space) {
            spaces[prop] = space[prop];
        }

        return spaces;
    }
};

Object.setPrototypeOf(spacesFactory, spacesFactoryFns);

export { spacesFactory };
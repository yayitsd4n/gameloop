import { Main } from './main/main.js';
import { Render } from './main/render.js';
import { UserInput } from './main/userInput.js';


import { Render as GameRenderer } from './game/render/gameRender.js'
import { DebugRender } from './game/render/debugRender.js';
import { KeyboardInput } from './game/input/keyboardInput.js';
import { GameWorld } from './game/gameWorld.js';

const update = new Worker('./scripts/main/update.js', {type: 'module'});

const noop = function(){};

const userInput = new UserInput(new KeyboardInput);
const render = new Render(new GameRenderer, new DebugRender);
const gameLoop = new Main(GameWorld, userInput, update, render, noop, noop); 

gameLoop.init();


/*
    Things to keep track of
        * Game world
            * 2d array
        * Components
            * Players
            * Enemies
        * Game world state
            * Timers
            * Scores
            * Etc
*/

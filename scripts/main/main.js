import { default as userInput } from './input/userInputRecorder';
import { default as render } from './render';
import { default as workerLink } from '../misc/workerLink';
const update = new Worker('./scripts/main/update.js', {type: 'module'});

workerLink.init(update);
workerLink.register('getUserInput', userInput.getInputEvents.bind(userInput));

render.init(workerLink);
workerLink.callLinked('initUpdate').then(() => {
    workerLink.callLinked('startUpdate');
    render.start();
});
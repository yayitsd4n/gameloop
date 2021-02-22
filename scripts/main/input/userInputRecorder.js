import { default as KeyboardInput } from './devices/keyboardInput';
import { default as DomEvents } from './devices/domEvents';

class UserInputRecorder {
    constructor(inputDevices) {
        this.keyboard = KeyboardInput;
        this.dom = DomEvents;

        for (var inputDevice in this) {
            this[inputDevice].init();
        }
    }

    getInputEvents() {

        var inputEvents = [];
        for (var inputDevice in this) {
            inputEvents = inputEvents.concat(this[inputDevice].getInputEvents());
        }
        
        return inputEvents.sort((a,b) => a.timeStamp - b.timeStamp);
    }
}

export default new UserInputRecorder();
import { DebugInstance } from './debugInstance.js';
import { bindings } from './input/keyBindings.js';

class Debug {
    constructor() {
        this.current = new DebugInstance();
        this.history = [];

        this.state = {
            visible: false,
            forward: 100,
            backward: 1
        };
    }

    update(time) {
        var userInput = this.serviceLocator.get('userInput');
        var inputs = userInput.get(bindings);
    
        inputs.filter(input => input.eventType == 'keydown').forEach(input => {
            var command = bindings[input.device][input.key];

            switch(command) {
                case 'toggleDebug':
                    this.state.visible = !this.state.visible;
                break;
                case 'togglePlay':
                    time.position = 0;
                    time.running = !time.running;
                break;
                case 'forward':
                    time.running = false;
                    time.position += this.state.forward;
                break;
                case 'backward':
                    time.position -= this.state.backward;
                break;
            }
        });

        this.history.push(Object.assign({}, this.current));
        this.clear();
    }

    get(num) {
        return {
            state: this.state,
            logs: this.history[this.history.length - 1 + num]
        }
    }

    clear() {
        this.current = new DebugInstance();
    }
};

export { Debug };
import { DebugInstance } from './debugInstance.js';
import { bindings } from './keyBindings.js';

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
            
            if (command == 'toggleDebug') {
                this.state.visible = !this.state.visible;
            }

            if (command == 'togglePlay') {
                time.position = 0;
                time.running = !time.running;
            }

            if (command == 'forward') {
                time.running = false;
                time.position += this.state.forward;
            }

            if (command == 'backward') {
                time.position -= this.state.backward;
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
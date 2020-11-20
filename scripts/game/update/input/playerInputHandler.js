class PlayerInputHandler {
    constructor(keyBindings = {}, commands = {}) {
        // Inputs recieved this frame
        this.incomingInputs = [];
        // Keys in a down state from previous frames
        this.activeKeys = new Map();
        // Holds keys to commands mappings
        this.actions = {};
        // Player commands this frame
        this.activeCommands = [];
        
        this.bindKeys(keyBindings, commands);
    }

    addIncomingInputs(...inputs) {
        this.incomingInputs = this.incomingInputs.concat(inputs);
    }

    bindKeys(keyBindings, commands) {
        for (var key in keyBindings) {
            this.actions[key] = commands[keyBindings[key]];
        }
    }

    execute(currentTimeMS) {
        this.activeCommands = [];

        this.activeKeys.forEach((value, key) => {
            if (value.eventType == 'keyup') {
                this.activeKeys.delete(key);
            } else {
                value.downMS += currentTimeMS;
            }
        });

        for (var input in this.incomingInputs) {
            var inputObj = this.incomingInputs[input];

            if (inputObj.eventType == 'keydown') {
                inputObj.downMS = 0;
            }
            this.activeKeys.set(inputObj.key, inputObj);
        }

        this.activeKeys.forEach((value, key) => {
            if (value.downMS == 0) {
                if (key in this.actions) {
                    this.activeCommands.push(this.actions[key]);
                } 
            } else {
                if (key in this.actions) {
                    if (Math.round(value.downMS) >= 400) {
                        if (Math.round(value.downMS) % 100) {
                            this.activeCommands.push(this.actions[key]);
                        }
                    }
                }
            }
        });

        this.incomingInputs = [];

        return this.activeCommands;
    }
}

export { PlayerInputHandler };
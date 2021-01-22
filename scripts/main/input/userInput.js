class UserInput {
    constructor() {
        this.inputs = []
    }

    get(bindings) {
        if (! this.inputs) return;

        if (!bindings) {
            return this.inputs.splice(0);
        }

        var inputs;
        for (var device in bindings) {
            inputs = 
                this.inputs.filter(input => {
                    return input.device == device;
                }).filter(input => {
                    return input.key in bindings[device];
                });
        };

        return inputs.sort((a,b) => a.timeStamp - b.timeStamp);
    }

    set(inputs) {
        this.inputs = inputs;
    }

    clear() {
        this.inputs.length = 0;
    }
};

export { UserInput };
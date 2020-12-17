class UserInput {
    constructor(...inputs) {
        this.inputs = inputs;
    }

    init() {
        this.inputs.forEach(input => {
            input.init();
        });
    }

    getInputEvents() {
        return this.inputs.reduce((a, b) => {
            return a.concat(b.getInputEvents());
        }, []);
    }
}

export { UserInput };
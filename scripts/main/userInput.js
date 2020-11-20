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
        var test = this.inputs.reduce((a, b) => {
            return a.concat(b.getInputEvents());
        }, []);

        return test;
    }
}

export { UserInput };
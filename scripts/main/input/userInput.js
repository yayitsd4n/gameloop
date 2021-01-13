class UserInput {
    constructor(inputDevices) {
        this.inputDevices = inputDevices;
    }

    init() {
        for (var inputDevice in this.inputDevices) {
            this.inputDevices[inputDevice].init();
        }
    }

    getInputEvents() {

        var inputEvents = [];
        for (var inputDevice in this.inputDevices) {
            inputEvents = inputEvents.concat(this.inputDevices[inputDevice].getInputEvents());
        }

        return inputEvents.sort((a,b) => a.timeStamp - b.timeStamp);
    }
}

export { UserInput };
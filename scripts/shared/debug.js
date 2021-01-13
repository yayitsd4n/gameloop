class debug {
    constructor() {
        this.misc = []
    }
    add(section = 'misc', data) {
        if ((section in this) == false) {
            this[section] = [];
        }
        this[section].push(data);
    }

    /* 
        Render and Update have their own debug objects. This function is used to merge both objects before rendering
        the debug data to the screen. It's a bandaid for not being able to send functions between webworkers
        and I hate it.
    */
    restore(debugData) {
        for (var section in debugData) {
            if (section in this) {
                this[section].concat(debugData[section]);
            } else {
                this[section] = debugData[section];
            }
        }
    }
};

export { debug };
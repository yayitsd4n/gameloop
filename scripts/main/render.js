var debugProto = {
    add(key, value) {
        this[key] = value;
    }
}
var debug = Object.create(null);
Object.setPrototypeOf(debug, debugProto);
//Object.freeze(debug);

debug.add('test', Math.floor(Math.random() * 100));

class Render {
    constructor (renderers) {
        this.renderers = renderers,
        this.running = false,
        this.debug = {}
    }

    update(stores, debug) {

        if (! this.running) return;
        /*for (var renderer in this.renderers) {
            if (renderer in stores) {
                this.renderers[renderer].update(stores[renderer]);
            }
        }*/
    }

    start() {
        this.running = true;
        for (var renderer in this.renderers) {
            this.renderers[renderer].start();
        }
    }

    pause() {
        this.running = false;
    }

    play() {
        this.running = true;
    }
}

export { Render };
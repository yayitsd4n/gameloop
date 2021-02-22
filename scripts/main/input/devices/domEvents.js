class DomEvents {
    constructor() {
        this.events = [];
    }

    init() {
        window.addEventListener('input', e => {
            this.addEvent(e);
        });
    }

    addEvent(e) {
        this.events.push({
            device: 'dom',
            eventType: e.type,
            value: e.target.value,
            id: e.target.id
        });
    }

    getInputEvents() {
        return this.events.splice(0);
    }
}

export default new DomEvents();
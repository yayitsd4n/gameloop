class MouseInput {
    constructor() {
        this.mouseEvents = [];
    }

    init() {
        window.addEventListener('mousedown', e => {
            this.addMouseEvent(e, 'mousedown');
        });

        window.addEventListener('mouseup', e => {
            this.addMouseEvent(e, 'mouseup');
        });
    }

    addMouseEvent(mouse, eventType) {

        var mouseEvent = {
            button: mouse.button,
            eventType: eventType,
            x: mouse.clientX,
            y: mouse.clientY
        };

        this.mouseEvents.push(mouseEvent);
    }

    getInputEvents() {
        return this.mouseEvents.splice(0);
    }
}

export { MouseInput };
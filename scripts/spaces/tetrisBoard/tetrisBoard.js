class tetrisBoard {
    constructor() {
        world = new Array(400).fill('.');
        entities = [];
    }

    init() {
        
    }

    update(update) {

    }

    addEntity(entity) {
        this.entities.push(entity);
    }
}

export { tetrisBoard };
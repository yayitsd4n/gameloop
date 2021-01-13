var GameWorld = {
    world: new Array(400).fill('.'),
    score: 0,
    time: 0,
    level: 1,
    entities: []
};

var proto = {
    update(update) {
        
        this.entities.forEach(entity => {
            entity.update(update);
        });

    },
    addEntity(entity) {
        this.entities.push(entity);
    }
};

Object.setPrototypeOf(GameWorld, proto);

export {GameWorld};
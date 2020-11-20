var Player = (inputHandler = null, actor = null) => {
    var playerObj = {

    };

    var playerProto = {
        actor: actor,
        inputHandler: inputHandler,
        update(ticksPerSecond) {
            var commands = this.inputHandler.execute(ticksPerSecond);

            if (commands.length) {
                commands.forEach(command => {
                    command(this.actor);
                });
            }
        }
    };

    Object.setPrototypeOf(playerObj, playerProto);

    return playerObj;
};

export { Player };
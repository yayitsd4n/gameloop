var updateExt = {
    init(serviceLocator) {
        serviceLocator.get('spaces').add('mainMenu');
    },

    update(serviceLocator) {
        var spaces = serviceLocator.get('spaces');
        var frameStartMs = performance.now();

        for (var i = 0; i < spaces.list.length; i++) {
            var space = spaces.list[i];

            space.update(serviceLocator);
            if (space.exclusive) break;
        }
        
        serviceLocator.get("debug").add('Time', {
            type: 'keyValue',
            data: {
                key: 'Update Time MS',
                value: performance.now() - frameStartMs
            }
        });
        
    }
};

export { updateExt }; 

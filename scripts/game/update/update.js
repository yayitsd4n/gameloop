var count = 0;

var updateExt = {
    init(serviceLocator) {
        serviceLocator.get('spaces').add('mainMenu').init();
    },

    update(serviceLocator) {
        var spaces = serviceLocator.get('spaces');
        var debug = serviceLocator.get('debug');

        var frameStartMs = performance.now();

        for (var i = 0; i < spaces.current.length; i++) {
            var space = spaces.current[i];

            space.update(serviceLocator);
            if (space.exclusive) break;
        }

        debug.current.add('Time', {
            type: 'keyValue',
            data: {
                key: 'Counter',
                value: count++
            }
        });
        
        debug.current.add('Time', {
            type: 'keyValue',
            data: {
                key: 'Update Time MS',
                value: performance.now() - frameStartMs
            }
        });
    }
};

export { updateExt }; 

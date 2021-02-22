
var count = 0;
var updateExt = {
    init(serviceLocator) {
        var spaces = serviceLocator.get('spaces');
        
        spaces.add('mainMenu').init();
    },

    update(serviceLocator) {
        var spaces = serviceLocator.get('spaces');
        var debug = serviceLocator.get('debug');
        var userInput = serviceLocator.get('userInput');
        var workerLink = serviceLocator.get('workerLink');

        workerLink.callLinked('getUserInput').then(data => {
            userInput.set(data);

            var frameStartMs = performance.now();

            if (this.time.running) {
                spaces.update();
                //console.log('simulate forward');
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

            debug.update(this.time);
            userInput.clear();
        });
        
    }
};

export { updateExt }; 

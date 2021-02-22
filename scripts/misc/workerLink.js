class WorkerLink {
    constructor() {
        this.worker = null;

        this.selfFns = {};
        this.linkedFns = {};
        this.deferreds = {};
    }

    callLinked(name, args) {
        if (name in this.linkedFns) {

            if (typeof this.linkedFns[name] == 'object') {
                var deferred = createDeferred(args);
                this.linkedFns[name].push(deferred);

                return deferred.value;
            } else {
                return this.linkedFns[name](args);
            }
            
        } else {
            this.linkedFns[name] = [];

            var deferred = createDeferred(args);
            this.linkedFns[name].push(deferred);

            return deferred.value;
        }
    }

    init(worker) {
        if (worker) {
            this.worker = worker; 
        } else {
            this.worker = self;
        }

        this.worker.addEventListener('message', e => {
            var message, data;
            [message, data] = e.data;

            switch(message) {
                case 'register':
                    this.registerLinked(data);
                break;
                case 'fnForward':
                    this.fnForward(data);
                break;
                case 'fnBack':
                    this.fnBack(data);
                break;
            }
        });
    }

    fnBack({id, result}) {
        this.deferreds[id].resolver(result);
        delete this.deferreds[id];
    }

    fnForward({name, id, args}) {
        var result = this.selfFns[name](args);

        this.worker.postMessage(['fnBack', {
            id: id,
            result: result,
            args: args
        }]);
    }

    registerLinked(name) {
        var deferredWrapper = (args) => {
            var deferred = createDeferred(args);

            var id = creatID();
            
            while (id in this.linkedFns) {
                id = creatID();
            }

            this.deferreds[id] = deferred;
            this.worker.postMessage(['fnForward', {
                name: name,
                id: id,
                args: args
            }]);

            return deferred.value;
        }

        if (this.linkedFns[name] && typeof this.linkedFns[name] == 'object') {
            this.linkedFns[name].forEach(deferred => {
                deferred.resolver(deferredWrapper(deferred.args));
            });
        }

        this.linkedFns[name] = deferredWrapper;
    }

    register(name, fn) {
        this.selfFns[name] = fn;
        this.worker.postMessage(['register', name]);
    }
};

var createDeferred = (args) => {
    var resolver;
    return {
        value: new Promise((res, rej) => {
            resolver = res;
        }),
        resolver: resolver,
        args: args
    };
};
var creatID = () => {
    var result = '';

    for (var i = 0; i <= 5; i++) {
        result += Math.floor(Math.random() * 9);
    }

    return result;
};

export default new WorkerLink();
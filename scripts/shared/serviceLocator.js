/*
    Things that most game objects might need access to

    * Player input
    * Debugger
    * Spaces
    * Audio
    
    Service locator exists give game objects access to data or functions that are outside of their scope.
    This might be a sign that I should be doing things differently.
*/

class ServiceLocator {
    constructor() {
        this.services = {};
    }

    register(key, service) {
        this.services[key] = service;
    }

    get(key) {
        return this.services[key];
    }

};

export { ServiceLocator };
import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';

var render = {
    controls: {
        tree: null,
        rootNood: null
    },
    debugData: {
        tree: null,
        rootNode: null,
    },
    state: {
        backward: 1,
        forward: 1,
        position: 0,
        on: false
    }
};

var renderFns = {
    controlsView(data) {
        return h('div#debugControls', {}, [
            h('input#backInput', {value: data.backward}),
            h('button#back', {}, 'Back'),
            h('button#pausePlay', {}, 'Pause/Play'),
            h('input#forwardInput', {value: data.forward}),
            h('button#forward', {}, 'Forward')
        ]);
    },

    keyValue(debugData) {
        return h('div#debug', {
                style:{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'scroll',
                    height: '100%',
                    padding: '10px',
                    background: '#000',
                    color: '#fff'
                }
            },  Object.keys(debugData).map(section => {
                    return h('div', {}, [
                        h('h2', {}, String(section)),
                        Object.keys(debugData[section]).map(data => {
                            return h('div', {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }
                                
                            }, [
                                h('div', {}, debugData[section][data].data.key),
                                h('div', {}, debugData[section][data].data.value)
                            ]);
                        })
                    ])
                })
            
        );
    },
    updateControls(data) {
        var newTree = this.controlsView(data);
        var patches = diff(this.controls.tree, newTree);
        this.controls.rootNode = patch(this.controls.rootNode, patches);
        this.controls.tree = newTree;
    },
    updateDebugData(data) {
        var newTree = this.keyValue(data);
        var patches = diff(this.debugData.tree, newTree);
        this.debugData.rootNode = patch(this.debugData.rootNode, patches);
        this.debugData.tree = newTree;
    },
    update(debugData) {
        if (! this.state.on  && debugData.state.visible) {
            this.createView();
        }

        if (this.state.on  && !debugData.state.visible) {
            this.removeView();
        }
        this.state = debugData.controls;

        
        if (this.state.on) {
            this.updateControls(debugData.controls);
            this.updateDebugData(debugData.logs);
        }
        
    },
    createView() {
        var node = h('div');

        this.controls.tree = node;
        this.controls.rootNode = createElement(this.controls.tree);
        document.querySelector('#root').appendChild(this.controls.rootNode);

        this.debugData.tree = node;
        this.debugData.rootNode = createElement(this.debugData.tree);
        document.querySelector('#root').appendChild(this.debugData.rootNode);

    },
    removeView() {
        this.tree = null;
        this.rootNode = null;

        document.querySelector('#debug').remove();
        document.querySelector('#debugControls').remove();
    }
};

Object.setPrototypeOf(render, renderFns);

export { render };
import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';

var render = {
    tree: null,
    rootNode: null
};

var renderFns = {
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
            },
                Object.keys(debugData).map(section => {
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
    update(debugData) {
        var newTree = this.keyValue(debugData);
        var patches = diff(this.tree, newTree);
        this.rootNode = patch(this.rootNode, patches)
        this.tree = newTree;
    },
    createView() {
        var debugContainer = h('div');

        this.tree = debugContainer;
        this.rootNode = createElement(this.tree);
        document.querySelector('#root').appendChild(this.rootNode);
    },
    removeView() {
        this.tree = null;
        this.rootNode = null;

        document.querySelector('#debug').remove();
    }
};

Object.setPrototypeOf(render, renderFns);

export { render };
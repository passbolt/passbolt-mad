'use strict';

/**
 *
 * @signature `set(obj, path, value)`
 * @param  {Object} obj the object to use as the root for property based navigation
 * @param  {String} path a String of dot-separated keys, representing a path of properties
 * @param {*} the value to set
 *
 * A *path* is a dot-delimited sequence of zero or more property names, such that "foo.bar" means "the property
 * 'bar' of the object at the property 'foo' of the root."
 *
 * ```js
 * var set = require("passbolt-mad/util/set/set");
 * var root = {a: {b: "foo"}};
 * set(root, "a.b", "bar");
 * console.log(root.a.b); // -> bar
 * ```
 */
function set(obj, name, value) {
    // The parts of the name we are looking up
    // `['App','Models','Recipe']`
    let parts = typeof name !== 'undefined' ? (name + '').replace(/\[/g,'.')
    		.replace(/]/g,'').split('.') : [];
    let length = parts.length;
    let current, i;

    if (!length) {
        return obj;
    }

    current = obj;
    for (i = 0; i < length - 1; i++) {
        if (current[parts[i]] == undefined) {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
    current[parts[length - 1]] = value;
}

export default set;

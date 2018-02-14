'use strict';

var glbl = typeof window !== "undefined" ? window : global;

/**
 * Set a global variable.
 *
 * @signature `global(name, value)`
 * @param  {Object} name the name of the variable to set as global
 * @param {*} the value to set
 *
 * ```js
 * import global from("passbolt-mad/util/global/global");
 * global('APP_URL', 'https//127.0.0.1');
 * console.log(APP_URL); // -> https//127.0.0.1
 * ```
 */
function global(name, value) {
    glbl[name] = value;
}

export default global;

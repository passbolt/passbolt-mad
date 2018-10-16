/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SARL (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SARL (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 */

const glbl = typeof window !== "undefined" ? window : global;

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

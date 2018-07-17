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
import Construct from 'can-construct';
const glbl = typeof window !== "undefined" ? window : global;

/**
 * Translate a string.
 *
 * @param {string} str The string to translate
 * @param {...} arguments Add as many variable as they are hooks in the variable
 * to translate
 * @return {string} The translated string
 */
const __ = function(str) {
  // Extract variables from arguments.
  const args = Array.prototype.slice.call(arguments, 1);
  return I18n.translate(str, args);
};
glbl.__ = __;

/**
 * @parent Mad.core_api
 * @inherits mad.Construct
 *
 * The aim of the object I18n is to provide an internationalization layer
 *
 * It provides a function __() to translate your string
 * ```
 * __('Hello %s boy', 'mad')
 * ```
 *
 */
const I18n = Construct.extend('mad.I18n', /** @static */ {

  /**
   * The dictionary in use.
   * @type {array}
   */
  dico: {},

  /**
   * Translate a string.
   *
   * @param {string} str The string to translate
   * @param {array} vars The array of variables to inject in the string
   * @return {string} The translated string
   */
  translate: function(str, vars) {
    vars = typeof vars != 'undefined' ? vars : [];
    return I18n.replaceHooks(this.getEntry(str), vars);
  },

  /**
   * Load a dictionary.
   *
   * @param {array} dico The dictionary to use
   */
  loadDico: function(dico) {
    for (const i in dico) {
      I18n.dico[i] = dico[i]; //make a copy of the data to be sure there will be existing in the app scope
    }
  },

  /**
   * Replace the variables' hooks in a string.
   *
   * @param {string} str The string to work on
   * @param {array} vars The variables to inject in the string
   * @return {string}
   */
  replaceHooks: function(str, vars) {
    let returnValue = '';
    let split = [];

    // Split the string regarding the variable's hooks.
    split = str.split('%s');

    // No hook found in the string.
    if (split.length < 2) {
      return str;
    }
    // Replace string's hooks with the variables.
    for (const i in split) {
      returnValue += split[i];
      if (vars[i] && vars[i] != null && (typeof vars[i] == 'string' || typeof vars[i] == 'number' || typeof vars[i] == 'boolean')) {
        returnValue += vars[i];
      }
    }

    return returnValue;
  },

  /**
   * Get an entry in the dictionary.
   *
   * @param {string} str The dictionary key
   * @return {string}
   */
  getEntry: function(str) {
    if (typeof I18n.dico[str] != 'undefined' && this.dico[str] != '') {
      return I18n.dico[str];
    }
    return str;
  }

}, /** @prototype */ {});

export default I18n;

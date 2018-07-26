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
import $ from 'jquery';
import CanControl from 'can-control';
import uuid from 'uuid/v4';
import 'can-construct-super';

/**
 * @parent Mad.core_api
 * @inherits can.Control
 *
 * A specialisation of the can.Control class to manage specific behaviors of the mad framework.
 *
 * @demo demo.html#control/control
 *
 * @body
 * ## Section 1
 * ### Sub section 1
 * This is just an example of section.
 *
 * @demo demo.html#control/control
 *
 * ## Section 2
 * ### Sub section 2
 * This is just another example of section.
 *
 */
const Control = CanControl.extend('mad.Control', /** @prototype */ {

  /**
   * Constructor.
   *
   * @signature `new mad.Control( element, options )`
   * @param {HTMLElement|can.NodeList|CSSSelectorString} el The element the control will be created on
   * @param {Object} options Option values merged with the class defaults and set as this.options
   * @return {Control} A new instance of the constructor function extending Control.
   *
   * @body
   * ## Options
   *
   * ### options.id
   * All controllers instantiated by the app should have an identifier.
   *
   * The identifier can be defined either with the optional parameters of the Controller or it can be
   * defined by the id attribute of the HTML element for which the controller will be created for.
   *
   * Note that if the identifier has been twice in the optional parameters and in the template, the one
   * defined in the optional parameters will override the one defined on the HTML Element.
   */
  init: function(el, options) {
    // Crash if no element selector is given.
    if (!el || !$(el).length) {
      throw new Error(`The parameter "el" (${el}) should refer to an existing DOM node.`);
    }

    // The identifier has not been defined in the option parameters.
    if (!options.id || options.id == null || options.id == '') {
      // If one defined on the DOM element used it, otherwise create a new one.
      const elId = $(this.element).attr('id');
      if (elId && elId != '') {
        options.id = elId;
      } else {
        options.id = uuid();
        $(this.element).attr('id', options.id);
      }
    } else {
      // On element id is defined in the component options, update the DOM with it.
      $(this.element).attr('id', options.id);
    }

    this.id = options.id;
  },

  /**
   * Get the controller class.
   * @return {Control.prototype}
   */
  getClass: function() {
    return this.constructor;
  },

  /**
   * Get the controller's identifier.
   *
   * @return {String} Controller's Identifier
   */
  getId: function() {
    return this.options.id;
  },

  /**
   * Destroy the controller
   * @todo is this function still in use.
   */
  remove: function() {
    $(this.element).remove();
  }

});

export default Control;

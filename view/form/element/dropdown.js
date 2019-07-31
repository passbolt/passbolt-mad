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
import domEvents from 'can-dom-events';
import FormElementView from '../element';

/**
 * @inherits mad.view.form.Element
 */
const Dropdown = FormElementView.extend('mad.view.form.Dropdown', /* @static */ {}, /** @prototype */ {

  /**
   * Get the value of the dropdown form element
   * @return {mixed} The value of the component
   */
  getValue: function() {
    let value = $(this.element).val();
    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }
    return value;
  },

  /**
   * Set the value of the dropdown form element
   * @param {mixed} value The value to set
   */
  setValue: function(value) {
    if (value === true) {
      value = 'true';
    } else if (value === false) {
      value = 'false';
    }
    $(this.element).val(value);
  },

  /* ************************************************************** */
  /* LISTEN TO THE VIEW EVENTS */
  /* ************************************************************** */

  /**
   * Listen to the view event change
   * @param {HTMLElement} el The element the event occured on
   */
  '{element} change': function(el) {
    domEvents.dispatch(el, {type: 'changed', data: {
      value: this.getValue()
    }});
  }
});

export default Dropdown;

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
import domEvents from 'can-dom-events';
import FormElementView from 'passbolt-mad/view/form/element';

/**
 * @inherits mad.view.form.Element
 */
const ToggleButton = FormElementView.extend('mad.view.form.ToggleButton', /* @static */ {

}, /** @prototype */ {

  /**
   * Set the value of the toggle button form element
   * @param {boolean} value The value to set
   */
  setValue: function(value) {
    const $checkbox = $('input', this.element);
    $checkbox.prop('checked', value);
  },

  /**
   * Listen to the view event click
   */
  '{element} .toggle-switch-button click': function() {
    if (this.getController().state.disabled) { return; }
    const $checkbox = $('input', this.element);
    const isChecked = $checkbox.is(':checked');
    domEvents.dispatch(this.element, {type: 'changed', data: {
      value: !isChecked
    }});
  }
});

export default ToggleButton;

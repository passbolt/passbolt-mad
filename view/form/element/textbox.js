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
const Textbox = FormElementView.extend('mad.view.form.Textbox', /* @static */ {

}, /** @prototype */ {

  /**
   * Store here the last reference of a setTimeout call.
   * see: changed event handler.
   */
  _changeTimeout: null,

  /**
   * Get the value from the associated HTML Element.
   * @return {mixed} The value of the component
   */
  getValue: function() {
    return $(this.element).val();
  },

  /**
   * Set the value of the associated HTML Element.
   * @param {mixed} value The value to set
   */
  setValue: function(value) {
    $(this.element).val(value);
  },

  /**
   * The value of the HTML Element changed.
   */
  '{element} input': function() {
    const newValue = this.getValue();

    if (newValue.length >= this.getController().options.onChangeAfterLength) {
      // If a trigger of changed event is already schedule, remove it.
      if (this._changeTimeout != null) {
        clearTimeout(this._changeTimeout);
      }
      this._changeTimeout = setTimeout(() => {
        domEvents.dispatch(this.element, {type: 'changed', data: {
          value: this.getValue()
        }});
      }, this.getController().options.onChangeTimeout);
    }
  }

});

export default Textbox;

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
import Component from 'passbolt-mad/component/component';

/**
 * @parent Mad.components_api
 * @inherits mad.Component
 *
 * The Button component is a simple button implementation.
 *
 * ## Example
 * @demo demo.html#button/button
 *
 * @constructor
 * Create a new Button Component.
 * @signature `new mad.Component.Button( element, options )`
 * @param {HTMLElement|can.NodeList|CSSSelectorString} el The element the control will be created on
 * @param {Object} [options] option values for the component.  These get added to
 * this.options and merged with defaults static variable
 *   * value : value of the button
 *   * events : object that can contain
 *      * click : callback to be executed at click.
 *   * tag : html tag to use.
 * @return {Button}
 */
const Button = Component.extend('mad.component.Button', {

  defaults: {
    label: 'Button Component',
    template: null,
    value: null,
    events: {
      click: null
    },
    tag: 'button'
  }

}, /** @prototype */ {

  /**
   * @inheritdoc
   */
  init: function(el, options) {
    this._super(el, options);
    this.value = options.value;
  },

  /**
   * Observe when the component is enable / disable
   * @param {boolean} disabled Disable the component. Enable it otherwise.
   */
  onDisabledChange: function(disabled) {
    if (disabled) {
      $(this.element).attr('disabled', 'disabled');
    } else {
      $(this.element).removeAttr('disabled');
    }
    this._super(disabled);
  },

  /**
   * Update the DOM wrapper element.
   */
  updateWrapperElement: function() {
    if (this.state.disabled) {
      $(this.element).attr('disabled', 'disabled');
    } else {
      $(this.element).removeAttr('disabled');
    }
    this._super();
  },

  /**
   * Get the value of the button
   * @return {mixed} value The value of the button
   */
  getValue: function() {
    return this.value;
  },

  /**
   * Set the value of the button
   * @param {mixed} value The value to set
   * @return {Button}
   */
  setValue: function(value) {
    this.value = value;
    return this;
  },

  /* ************************************************************** */
  /* LISTEN TO THE VIEW EVENTS */
  /* ************************************************************** */

  /**
   * Listen to the event click on the DOM button element
   */
  '{element} click': function(el, ev) {
    // if the component is disabled, stop the propagation
    if (this.state.disabled) {
      ev.stopImmediatePropagation();
    } else {
      if (this.options.events.click) {
        this.options.events.click(this.element, ev, this.value);
      }
    }
  }

});

export default Button;

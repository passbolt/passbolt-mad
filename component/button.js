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
 * @group mad.component.Button.view_events 0 View Events
 * @group mad.component.Button.state_changes 1 State Listeners
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
 * @return {mad.component.Button}
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
   * Value of the button.
   * This value will be released as event parameter when an event occured
   * @type {string}
   */
  value: null,

  /**
   * @inheritdoc
   */
  init: function(el, options) {
    this._super(el, options);
    this.value = options.value;
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
   * @return {mad.controller.component.ButtonController}
   */
  setValue: function(value) {
    this.value = value;
    return this;
  },

  /* ************************************************************** */
  /* LISTEN TO THE VIEW EVENTS */
  /* ************************************************************** */

  /**
   * @function mad.component.Button.click
   * @parent mad.component.Button.view_events
   * Listen to the event click on the DOM button element
   * @return {void}
   */
  click: function(el, ev) {
    // if the component is disabled, stop the propagation
    if (this.state.is('disabled')) {
      ev.stopImmediatePropagation();
    } else {
      // if callbacks associated to the button
      if (this.options.events.click) {
        this.options.events.click(this.element, ev, this.value);
      }
    }
  },

  /* ************************************************************** */
  /* LISTEN TO THE STATE CHANGES */
  /* ************************************************************** */

  /**
   * @function mad.component.Button.stateDisabled
   * @parent mad.component.Button.state_changes
   * Listen to the change relative to the state Disabled
   * @param {boolean} go Enter or leave the state
   * @return {void}
   */
  stateDisabled: function(go) {
    if (go) {
      $(this.element).attr('disabled', 'disabled')
        .addClass('disabled');
    } else {
      $(this.element).removeAttr('disabled')
        .removeClass('disabled');
    }
  }
});

export default Button;

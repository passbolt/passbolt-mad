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
import ButtonComponent from 'passbolt-mad/component/button';
import ToggleButtonState from 'passbolt-mad/model/state/toggleButtonState';

/**
 * @parent Mad.components_api
 * @inherits mad.component.Button
 * @group mad.component.ToggleButton.view_events 0 View Events
 * @group mad.component.ToggleButton.state_changes 1 State Changes
 *
 * The Toggle Button class Controller is our implementation of the UI component toggle button.
 *
 * ## Example
 * @demo demo.html#toggle_button/toggle_button
 *
 * @constructor
 * Create a new Button Component.
 * @signature `new mad.Component.ToggleButton( element, options )`
 * @param {HTMLElement|can.NodeList|CSSSelectorString} el The element the control will be created on
 * @param {Object} [options] option values for the component.  These get added to
 * this.options and merged with defaults static variable
 * @return {ToggleButton}
 */
const ToggleButton = ButtonComponent.extend('mad.component.ToggleButton', /** @static */ {

  defaults: {
    stateClass: ToggleButtonState,
    selected: false
  }

}, /** @prototype */ {

  /**
   * @inheritdoc
   */
  init: function(el, options) {
    this._super(el, options);
    this.state.on('selected', (ev, selected) => this.onSelectedChange(selected));
  },

  /**
   * Observe when the component is selected / unselected
   * @param {boolean} selected True if selected, false otherwise
   */
  onSelectedChange: function(selected) {
    if (selected) {
      $(this.element).addClass('selected');
    } else {
      $(this.element).removeClass('selected');
    }
  },

  /**
   * Update the DOM wrapper element.
   */
  updateWrapperElement: function() {
    this._super();
    if (this.state.selected) {
      this.view.addClass('selected');
    } else {
      this.view.removeClass('selected');
    }
  },

  /**
   * Listen to the event click on the DOM toggle button element
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event which occurred
   */
  '{element} click': function(el, ev) {
    this._super(el, ev);
    if (this.state.disabled) {
      return;
    }
    this.state.selected = !this.state.selected;
  }
});

export default ToggleButton;

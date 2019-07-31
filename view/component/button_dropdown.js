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
import View from '../view';

/**
 * @inherits mad.View
 */
const ButtonDropdown = View.extend('mad.view.component.ButtonDropdown', /** @static */{

}, /** @prototype */ {

  /**
   * Get the dropdown element for the current dropdown button.
   */
  getDropdownContentElement: function() {
    const contentElement = this.getController().options.contentElement;
    // a custom dropdown content element has been defined
    if (contentElement != null) {
      return $(contentElement);
    } else {
      // otherwise the element next to this element is the dropdown content element
      return $(this.element).next();
    }
  },

  /**
   * Open an item
   */
  open: function() {
    $(this.element).addClass('pressed');
    const $contentElement = this.getDropdownContentElement();
    $contentElement.addClass('visible');
    this.getController().state.open = true;
  },

  /**
   * Close an item
   */
  close: function() {
    $(this.element).removeClass('pressed');
    const $contentElement = this.getDropdownContentElement();
    $contentElement.removeClass('visible');
    this.getController().state.open = false;
  },

  /**
   * Observe when the component is clicked
   * @return {bool}
   */
  '{element} click': function() {
    const controller = this.getController();
    if (controller.state.disabled) {
      return false;
    }
    if (!controller.state.open) {
      this.open();
    } else {
      this.close();
    }

    return false;
  },

  /**
   * Observe when a click occurred on the document.
   * If the click does not target the component or its content, close the dropdown.
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event which occurred
   */
  '{document} click': function(el, ev) {
    const componentSelector = `#${this.getController().getId()}`;
    const dropdownIsSrc = this.element.id == ev.target.id;
    const dropdownIsParent = $(ev.target).parents(componentSelector).length;
    if (!dropdownIsSrc && !dropdownIsParent) {
      this.close();
    }
  }

});

export default ButtonDropdown;

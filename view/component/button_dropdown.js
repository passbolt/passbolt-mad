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
import View from 'passbolt-mad/view/view';
import $ from 'jquery';

/**
 * @inherits mad.View
 */
const ButtonDropdown = View.extend('mad.view.component.ButtonDropdown', /** @static */{

}, /** @prototype */ {

  /**
   * Get the dropdown element for the current dropdown button.
   * @return {jQuery}
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
   * @param {DefineMap} item The target item to open
   */
  open: function() {
    $(this.element).addClass('pressed');
    const $contentElement = this.getDropdownContentElement();
    $contentElement.addClass('visible');
    this.getController().state.addState('open');
  },

  /**
   * Close an item
   * @param {DefineMap} item The target item to close
   */
  close: function() {
    $(this.element).removeClass('pressed');
    const $contentElement = this.getDropdownContentElement();
    $contentElement.removeClass('visible');
    if (this.getController().state.is('open')) { this.getController().state.removeState('open'); }
  },

  /* ************************************************************** */
  /* LISTEN TO THE VIEW EVENTS */
  /* ************************************************************** */

  /**
   * @function mad.component.ButtonDropdown.click
   * @parent mad.component.ButtonDropdown.view_events
   * Listen to the event click on the DOM button element
   * @return {bool}
   */
  '{element} click': function() {
    // If state is disabled, do not do anything on click.
    if (this.getController().state.is('disabled')) {
      return false;
    }

    /*
     * If state is not disabled,
     * manage opening and closing of button dropdown.
     */
    if (!this.getController().state.is('open')) {
      this.open();
    } else {
      this.close();
    }

    return false;
  },

  /**
   * Intercept global click event and close menu if open.
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

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
import View from '../view';

/**
 * @inherits mad.view.View
 */
const Dialog = View.extend('mad.view.component.Dialog', /* @static */ {}, /** @prototype */ {

  /**
   * Set the title
   * @param {string} title The new title
   */
  setTitle: function(title) {
    $('.dialog-header h2 .dialog-header-title', this.element).text(title);
  },

  /**
   * Set the subtitle
   * @param {string} subtitle The new subtitle
   */
  setSubtitle: function(subTitle) {
    $('.dialog-header h2 .dialog-header-subtitle', this.element).text(subTitle);
  },

  /* ************************************************************** */
  /* LISTEN TO THE VIEW EVENTS */
  /* ************************************************************** */

  /**
   * Listen to the user interaction click with the close button
   * @param {HTMLElement} el The element the event occured on
   * @param {HTMLEvent} ev The event which occured
   */
  '{element} .dialog-close click': function(el, ev) {
    ev.preventDefault();
    $(this.element).remove();
  },

  /**
   * Listen to the user interaction keyboard press
   * @param {HTMLElement} el The element the event occured on
   * @param {HTMLEvent} ev The event which occured
   */
  '{window} keyup': function(el, ev) {
    if (ev.keyCode == 27) {
      $(this.element).remove();
    }
  },

  /**
   * Listen to click on the cancel link
   */
  '{element} .js-dialog-cancel click': function() {
    $(this.element).remove();
  }
});

export default Dialog;

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
import DropdownMenuView from 'passbolt-mad/view/component/dropdown_menu';

/**
 * @inherits mad.view.component.DropdownMenu
 *
 * Our representation of the contexual menu
 *
 * @constructor
 * Instantiate a new Contextual Menu view
 * @return {mad.view.component.ContextualMenu}
 */
const ContextualMenu = DropdownMenuView.extend('mad.view.component.ContextualMenu', /* @static */ {}, /** @prototype */ {

  /**
   * Intercept global click event.
   *
   * Intercept global click event and close menu if open.
   *
   * @param {HTMLElement} el The element the event occured on
   * @param {HTMLEvent} ev The event which occured
   */
  '{document} mouseup': function(el, ev) {
    const controller = this.getController();
    const menuIsSrc = this.element.id == ev.target.id;
    const menuIsParent = $(ev.target).parents(`#${controller.getId()}`).length;
    if (!menuIsSrc && !menuIsParent) {
      controller.destroyAndRemove();
    }
  },

  /**
   * Intercept contextmenu event.
   *
   * A bit of history : this event was introduced here because we were having issues on some systems (like windows)
   * after triggering the contextual menu on mousedown, the contextual menu was appearing and was covering the source element,
   * resulting in contextual menu component catching the contextmenu event.
   * We don't want that to happen, so we simply preventDefault here.
   *
   * @param {HTMLElement} el The element the event occured on
   * @param {HTMLEvent} ev The event which occured
   */
  '{element} contextmenu': function(el, ev) {
    ev.preventDefault();
  }
});

export default ContextualMenu;

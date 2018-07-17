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
import DomData from 'can-dom-data';
import TreeView from 'passbolt-mad/view/component/tree';

/**
 * @inherits mad.view.component.Tree
 *
 * Our representation of the drop down menu
 *
 * @constructor
 * Instanciate a new Drop Down Menu view
 * @return {mad.view.component.DropdownMenu}
 */
const DropdownMenu = TreeView.extend('mad.view.component.DropdownMenu', /* @static */ {}, /** @prototype */ {

  /**
   * Open an item
   * @param {DefineMap} item The target item to open
   */
  open: function(item) {
    const li = $(`#${item.id}`, this.element);
    li.removeClass('closed').addClass('opened');
    const control = $('.control:first', li);
    control.removeClass('open').addClass('close');
  },

  /**
   * Close an item
   * @param {DefineMap} item The target item to close
   */
  close: function(item) {
    const li = $(`#${item.id}`, this.element);
    li.removeClass('opened').addClass('closed');
    const control = $('.control:first', li);
    control.removeClass('close').addClass('open');
  },

  /* ************************************************************** */
  /* LISTEN TO THE VIEW EVENTS */
  /* ************************************************************** */

  /**
   * Uncollapse an item
   * @param {HTMLElement} el The element the event occured on
   * @param {HTMLEvent} ev The event which occured
   */
  '{element} li mouseover': function(el, ev) {
    ev.stopPropagation();
    ev.preventDefault();

    let data = null;
    const itemClass = this.getController().getItemClass();

    if (this.getController().getItemClass()) {
      data = DomData.get(el, itemClass.shortName);
    } else {
      data = el.id;
    }

    $(this.element).trigger('item_opened', data);
  },

  /**
   * Uncollapse an item
   * @param {HTMLElement} el The element the event occured on
   * @param {HTMLEvent} ev The event which occured
   */
  '{element} li mouseleave': function(el, ev) {
    ev.stopPropagation();
    ev.preventDefault();

    let data = null;
    const itemClass = this.getController().getItemClass();

    if (this.getController().getItemClass()) {
      data = DomData.get(el, itemClass.shortName);
    } else {
      data = el.id;
    }
    $(this.element).trigger('item_closed', data);
  }

});

export default DropdownMenu;

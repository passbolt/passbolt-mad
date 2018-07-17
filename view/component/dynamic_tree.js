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
import domEvents from 'can-dom-events';
import TreeView from 'passbolt-mad/view/component/tree';

/**
 * @inherits mad.view.component.Tree
 *
 * Our representation of the dynamic tree view (such as the jquery plugin jstree)
 *
 * @constructor
 * Instanciate a new Dynamic Tree view
 * @return {mad.view.component.tree.DynamicTree}
 */
const DynamicTree = TreeView.extend('mad.view.component.DynamicTree', /** @static */ {

}, /** @prototype */ {

  /**
   * Open an item
   * @param {DefineMap} item The target item to open
   */
  open: function(item) {
    const li = $(`#${item.id}`, this.element);
    li.removeClass('close')
      .addClass('open');
  },

  /**
   * Close an item
   * @param {DefineMap} item The target item to close
   */
  close: function(item) {
    const li = $(`#${item.id}`, this.element);
    li.removeClass('open')
      .addClass('close');
  },

  /* ************************************************************** */
  /* LISTEN TO THE VIEW EVENTS */
  /* ************************************************************** */

  /**
   * Collapse / Uncollapse an item
   * @param {HTMLElement} el The element the event occured on
   * @param {HTMLEvent} ev The event which occured
   */
  '{element} .node-ctrl a click': function(el, ev) {
    ev.stopPropagation();
    ev.preventDefault();
    let data = null;
    const li = $(el).parents('li');
    const itemClass = this.getController().getItemClass();

    if (this.getController().getItemClass()) {
      data = DomData.get(li[0], itemClass.shortName);
    } else {
      data = li[0].id;
    }

    // if the element is closed, open it
    if (li.hasClass('close')) {
      domEvents.dispatch(this.element, {type: 'item_opened', data: {item: data, srcEv: ev}});
    } else {
      // otherwise close it
      domEvents.dispatch(this.element, {type: 'item_closed', data: {item: data, srcEv: ev}});
    }
  },

  /**
   * Contextual menu
   * @param {HTMLElement} el The element the event occured on
   * @param {HTMLEvent} ev The event which occured
   */
  '{element} .more-ctrl a click': function(el, ev) {
    ev.stopPropagation();
    ev.preventDefault();
    let data = null;
    const li = $(el).parents('li');
    const itemClass = this.getController().getItemClass();

    if (this.getController().getItemClass()) {
      data = DomData.get(li[0], itemClass.shortName);
    } else {
      data = li[0].id;
    }

    domEvents.dispatch(this.element, {type: 'item_right_selected', data: {item: data, srcEv: ev}});
  }
});

export default DynamicTree;

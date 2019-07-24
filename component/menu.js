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
import Action from '../model/map/action';
import MadMap from '../util/map/map';
import TreeComponent from './tree';

import itemTemplate from '../view/template/component/menu/menu_item.stache!';

/**
 * @parent Mad.components_api
 * @inherits {mad.component.Tree}
 * @group mad.component.Menu.view_events 0 View Events
 *
 * The menu component is a simple implementation of a menu composed of a list of items.
 *
 * ## Example
 * @demo demo.html#menu/menu
 *
 * @constructor
 * Instantiate a new Menu Component.
 * @param {HTMLElement|can.NodeList|CSSSelectorString} el The element the control will be created on
 * @param {Object} [options] option values for the component.  These get added to
 * this.options and merged with defaults static variable
 *   * itemClass : class to be used for the items composing the menu
 *   * map : mapping object. (See mad.Map)
 * @return {mad.component.Menu}
 */
const Menu = TreeComponent.extend('mad.component.Menu', {

  defaults: {
    label: 'Menu',
    cssClasses: ['menu'],
    // The template to use to render each action.
    itemTemplate: itemTemplate,
    // The class which represent the item.
    itemClass: Action,
    // Mapping of the items for the view.
    map: new MadMap({
      id: 'id',
      label: 'label',
      cssClasses: 'cssClasses',
      enabled: 'enabled',
      children: {
        key: 'children',
        func: MadMap.mapObjects
      }
    })
  }

}, /** @prototype */ {

  /**
   * Disable an item
   * @param {string} id The item id.
   */
  enableItem: function(id) {
    const item = this.options.items.filter({id: id}).pop();
    if (item) {
      item.enabled = true;
      this.refreshItem(item);
    }
  },

  /**
   * Disable an item
   * @param {string} id The item id.
   */
  disableItem: function(id) {
    const item = this.options.items.filter({id: id}).pop();
    if (item) {
      item.enabled = false;
      this.refreshItem(item);
    }
  },

  /* ************************************************************** */
  /* LISTEN TO THE VIEW EVENTS */
  /* ************************************************************** */

  /**
   * An item has been selected
   * @parent mad.component.Menu.view_events
   * @param {HTMLElement} el The element the event occured on
   * @param {HTMLEvent} ev The event which occured
   */
  '{element} item_selected': function(el, ev) {
    const item = ev.data.item;
    this._super(el, ev, item);

    // If this item is not disabled, try to execute the item action.
    if (item.enabled) {
      item.execute(this);
    }
  }
});

export default Menu;

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
import Action from 'passbolt-mad/model/map/action';
import MadMap from 'passbolt-mad/util/map/map';
import TreeComponent from 'passbolt-mad/component/tree';
import TreeView from 'passbolt-mad/view/component/tree';

import itemTemplate from 'passbolt-mad/view/template/component/menu/menu_item.stache!';

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
var Menu = TreeComponent.extend('mad.component.Menu', {

    defaults: {
        label: 'Menu',
        cssClasses: ['menu'],
        // View class.
        viewClass: TreeView,
        // The template to use to render each action.
        itemTemplate: itemTemplate,
        // The class which represent the item.
        itemClass: Action,
        // Mapping of the items for the view.
        map: new MadMap({
            id: 'id',
            label: 'label',
            // @todo : be carefull, for now if no cssClasses defined while creating the action.
            // @todo : this mapping is not done, and the state is not added to css classes.
            cssClasses: {
                key: 'cssClasses',
                func: function (value, map, item, mappedValues) {
                    var mappedValue = $.merge([], value);
                    // If a state is defined for the given item.
                    // Add the state to the css classes.
                    if (typeof item.state != 'undefined') {
                        mappedValue = $.merge(mappedValue, item.state.current);
                    }
                    return mappedValue.join(' ');
                }
            },
            children: {
                key: 'children',
                func: MadMap.mapObjects
            }
        })
    }

}, /** @prototype */ {

    /**
     * Set the item state.
     * @param id The item id.
     * @param stateName The state to set.
     */
    setItemState: function (id, stateName) {
        for (var i in this.options.items) {
            if (this.options.items[i].id == id) {
                this.options.items[i].state.setState(stateName);
                this.refreshItem(this.options.items[i]);
                return
            }
        }
        throw mad.Exception.get('The item [%0] is not an item of the menu', [id]);
    },

    /* ************************************************************** */
    /* LISTEN TO THE VIEW EVENTS */
    /* ************************************************************** */

    /**
     * An item has been selected
     * @parent mad.component.Menu.view_events
     * @param {HTMLElement} el The element the event occured on
     * @param {HTMLEvent} ev The event which occured
     * @param {string} item The selected item
     * @return {void}
     */
    ' item_selected': function (el, ev, item) {
        this._super(el, ev, item);

        // If this item is not disabled, try to execute the item action.
        if (!item.state.is('disabled')) {
            item.execute(this);
        }
    }
});

export default Menu;

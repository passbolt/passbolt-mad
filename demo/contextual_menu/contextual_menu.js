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
import $ from "jquery";
import mad from "passbolt-mad/passbolt-mad";
import ContextualMenu from "passbolt-mad/component/contextual_menu";
import Action from "passbolt-mad/model/action";

/**
 * Show Contextual menu.
 * @param x
 * @param y
 * @returns {mad.controller.component.ContextualMenuController}
 */
function showContextualMenu($item) {
    var item_offset = $item.offset();

    // Instantiate the contextual menu menu.
    var contextualMenu = new mad.component.ContextualMenu(null, {
        'state': 'hidden',
        'source': $item[0],
        'coordinates': {
            x: item_offset.left,
            y: item_offset.top
        }
    });
    contextualMenu.start();

    // Add a link to filter on all items as first item.
    var menuItems = [];
    var menuItem = new mad.model.Action({
        id: 'el1',
        label: 'item 1',
        action: function () {
            alert('item 1 clicked');
        }
    });
    contextualMenu.insertItem(menuItem);
    var menuItem = new mad.model.Action({
        id: 'el2',
        label: 'item 2',
        action: function () {
            alert('item 2 clicked');
        }
    });
    contextualMenu.insertItem(menuItem);
    // Display the menu.
    contextualMenu.setState('ready');
    return contextualMenu;
}

var menuSelector = 'a#contextual-menu-trigger';
var $menuSelector = $(menuSelector);

$menuSelector.click(function() {
    showContextualMenu($menuSelector);
    return false;
})
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
import mad from "../../src/mad";
import Menu from "../../src/component/dropdown_menu";
import Action from "../../src/model/action";

// Add a link to filter on all items as first item.
var menuItems = [];
var menuItem = new mad.model.Action({
    id: 'el1',
    label: 'item 1',
    action: function () {
        alert('item 1 clicked');
    }
});
menuItems.push(menuItem);
var menuItem = new mad.model.Action({
    id: 'el2',
    label: 'item 2',
    action: function () {
        alert('item 2 clicked');
    }
});
menuItems.push(menuItem);


var menuSelector = 'ul#dropdown-menu';
var menu = new mad.component.DropdownMenu(menuSelector);
menu.start();
menu.load(menuItems);
menu.close(menuItem);

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
import $ from 'can-jquery';
import mad from "passbolt-mad/passbolt-mad";
import Menu from "passbolt-mad/component/menu";
import Action from "passbolt-mad/model/map/action";

var menuSelector = 'ul#menu';
var menu = new mad.component.Menu(menuSelector);
menu.start();

// Add a link to filter on all items as first item.
var menuItems = [];
var menuItem = new mad.model.Action({
    id: '1',
    label: 'item 1',
    action: function () {
        alert('item 1 clicked');
    }
});
menuItems.push(menuItem);
var menuItem = new mad.model.Action({
    id: '2',
    label: 'item 2',
    action: function () {
        alert('item 2 clicked');
    }
});
menuItems.push(menuItem);
menu.load(menuItems);

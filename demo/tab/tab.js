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
import $ from 'jquery';
import can from "can/can";
import 'can/construct/super/super';
import mad from "passbolt-mad/passbolt-mad";
import Tree from "passbolt-mad/component/tab";
import FreeComposite from "passbolt-mad/component/component";
import Button from "passbolt-mad/component/button";

// Instantiate the main tabs controller
var tabs = new mad.component.Tab('#tab', {
    autoMenu: true,
    menu: new can.Control('body')
});
tabs.start();

// Tab 1.
var tab1 = tabs.addComponent(mad.Component, {
    id: 'free-composite-1',
    label: 'tab1',
    templateBased: false
});

// Tab2.
var tab2 = tabs.addComponent(mad.Component, {
    id: 'free-composite-2',
    label: 'tab2',
    templateBased: false
});
tabs.enableTab('free-composite-2');
tabs.enableTab('free-composite-1');

// Add text inside the tabs.
$('<p class="txt1">this is the content of tab 1</p>').appendTo('#free-composite-1 .component');
$('<p class="txt2">this is the content of tab 2</p>').appendTo('#free-composite-2 .component');


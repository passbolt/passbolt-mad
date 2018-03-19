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
import "passbolt-mad/test/bootstrap";
import Action from "passbolt-mad/model/map/action";
import CanControl from "can-control";
import Component from "passbolt-mad/component/component";
import MadControl from 'passbolt-mad/control/control';
import MenuComponent from 'passbolt-mad/component/menu';

describe("mad.component.Menu", function () {

    // The HTMLElement which will carry the button component.
    var $menu = null;
    var $debugOutput = null;

    // Insert a <ul> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $menu = $('<ul id="menu"></ul>').appendTo($('#test-html'));
        $debugOutput = $('<div id="test-output"></div>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit mad.component.Tree & the inherited parent classes", function () {
        var menu = new MenuComponent('#menu');

        // Basic control of classes inheritance.
        expect(menu).to.be.instanceOf(CanControl);
        expect(menu).to.be.instanceOf(MadControl);
        expect(menu).to.be.instanceOf(Component);
        expect(menu).to.be.instanceOf(MenuComponent);

        menu.start();
        menu.destroy();
    });

    it("item_selected() should execute the menu item action on click", function () {
        var menu = new MenuComponent('#menu');
        menu.start();

        expect($menu.text()).to.not.contain('Item 1');

        var menuItems = [];
        var menuItem = new Action({
            id: 'i1',
            label: 'Item 1',
            action: function () {
                $debugOutput.html('item 1 clicked');
            }
        });
        menuItems.push(menuItem);
        var menuItem = new Action({
            id: 'i2',
            label: 'Item 2',
            action: function () {
                $debugOutput.html('item 2 clicked');
            }
        });
        menuItems.push(menuItem);
        menu.load(menuItems);

        expect($menu.text()).to.contain('Item 1');
        expect($menu.text()).to.contain('Item 2');

        // Click on an Item and observe that it triggers the action.
        $('#i1 a').click();
        expect($debugOutput.text()).to.contain('item 1 clicked');
    });

    it("setItemState() should change the state of a menu item", function () {
        var menu = new MenuComponent('#menu');
        menu.start();

        var menuItems = [];
        var menuItem1 = new Action({
            id: 'i1',
            label: 'Item 1',
            action: function () {
                $debugOutput.html('item 1 clicked');
            }
        });
        menuItems.push(menuItem1);
        var menuItem2 = new Action({
            id: 'i2',
            label: 'Item 2',
            action: function () {
                $debugOutput.html('item 2 clicked');
            }
        });
        menuItems.push(menuItem2);
        menu.load(menuItems);

        expect(menuItem1.state.is('ready')).to.be.true;
        expect(menuItem2.state.is('ready')).to.be.true;

        menu.setItemState('i1', 'disabled');

        expect(menuItem1.state.is('ready')).to.be.false;
        expect(menuItem1.state.is('disabled')).to.be.true;
        expect(menuItem2.state.is('ready')).to.be.true;

        expect($('#i1.disabled').length).to.be.not.equal(0);
    });
});
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
import "passbolt-mad/test/bootstrap";
import Action from "passbolt-mad/model/action";
import CanControl from "can-control";
import Component from "passbolt-mad/component/component";
import ContextualMenuComponent from "passbolt-mad/component/contextual_menu";
import DropdownMenuComponent from 'passbolt-mad/component/dropdown_menu';
import MadControl from 'passbolt-mad/control/control';
import MenuComponent from 'passbolt-mad/component/menu';
import HtmlHelper from 'passbolt-mad/helper/html';

describe("mad.component.ContextualMenu", function () {

    // The HTMLElement which will carry the button component.
    var $menu = null;
    var $debugOutput = null;

    // Insert a <ul> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $menu = $('<a id="menu">Test Contextual Menu</a>').appendTo($('#test-html'));
        $debugOutput = $('<div id="test-output"></div>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    function showContextualMenu($item) {
        var item_offset = $item.offset();
        var contextualMenu = ContextualMenuComponent.instantiate({
            state: 'hidden',
            source: $item[0],
            coordinates: {
                x: item_offset.left,
                y: item_offset.top
            }
        });
        contextualMenu.start();

        var menuItem = new Action({
            id: 'el1',
            label: 'Item 1',
            action: function () {
                $debugOutput.html('item 1 clicked');
            }
        });
        contextualMenu.insertItem(menuItem);
        var menuItem = new Action({
            id: 'el2',
            label: 'Item 2',
            action: function () {
                $debugOutput.html('item 2 clicked');
            }
        });
        contextualMenu.insertItem(menuItem);

        contextualMenu.setState('ready');

        return contextualMenu;
    }

    it("constructed instance should inherit mad.component.DropdownMenu & the inherited parent classes", function () {
        // Create an HTMLElement for the contextual menu.
        var menu = ContextualMenuComponent.instantiate({
            state: 'hidden',
            source: '#menu',
            coordinates: {
                x: 0,
                y: 0
            }
        });

        // Basic control of classes inheritance.
        expect(menu).to.be.instanceOf(CanControl);
        expect(menu).to.be.instanceOf(MadControl);
        expect(menu).to.be.instanceOf(Component);
        expect(menu).to.be.instanceOf(MenuComponent);
        expect(menu).to.be.instanceOf(DropdownMenuComponent);

        menu.start();
        menu.destroy();
    });

    it("Contextual menu should be displayed on a click", function () {
        var menu = null;
        $menu.click(function() {
            menu = showContextualMenu($menu);
        });

        expect($('#js_contextual_menu').length).to.equal(0);
        $menu.click();
        expect($('#js_contextual_menu').length).to.not.equal(0);

        expect($('#js_contextual_menu').html()).to.contain('Item 1');
        expect($('#js_contextual_menu').html()).to.contain('Item 2');

        menu.destroy();
    });

    it("Contextual menu should trigger actions while clicking on subitems", function () {
        var menu = null;
        $menu.click(function() {
            menu = showContextualMenu($menu);
        });

        // Click On main menu to display contextual menu.
        $menu.click();

        //// Click on an Item and observe that it triggers the action.
        $('#el1 a', $('#js_contextual_menu')).click();
        expect($debugOutput.text()).to.contain('item 1 clicked');

        menu.destroy();
    });

    it("Contextual menu should be removed by calling remove static function", function () {
        // Show contextual menu
        showContextualMenu($menu);

        // Remove contextual menu.
        ContextualMenuComponent.remove();

        // Expect contextual menu to have been removed.
        expect($('#js_contextual_menu').length).to.equal(0);
    });
});
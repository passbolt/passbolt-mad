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
import Action from "passbolt-mad/model/map/action";
import ButtonComponent from "passbolt-mad/component/button";
import ButtonDropdownComponent from "passbolt-mad/component/button_dropdown"
import CanControl from "can-control";
import Component from "passbolt-mad/component/component";
import domEvents from 'can-dom-events';
import MadControl from 'passbolt-mad/control/control';

describe("mad.component.ButtonDropdown", function () {

    // The HTMLElement which will carry the button component.
    var $buttonDropdown = null;
    var $debugOutput = null;

    // Insert a <ul> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $buttonDropdown = $('<button id="button-dropdown"></ul>').appendTo($('#test-html'));
        $debugOutput = $('<div id="test-output"></div>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit mad.component.Button & the inherited parent classes", function () {
        var buttonDropdown = new ButtonDropdownComponent('#button-dropdown');

        // Basic control of classes inheritance.
        expect(buttonDropdown).to.be.instanceOf(CanControl);
        expect(buttonDropdown).to.be.instanceOf(MadControl);
        expect(buttonDropdown).to.be.instanceOf(Component);
        expect(buttonDropdown).to.be.instanceOf(ButtonComponent);

        buttonDropdown.start();
        buttonDropdown.destroy();
    });

    it("buttonDropdown items should be in the dom after instantiation of the buttonDropdown only", function () {
        expect($buttonDropdown.parent().text()).to.not.contain('Item 1');

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
        var buttonDropdown = new ButtonDropdownComponent('#button-dropdown', {
            items:menuItems
        });
        buttonDropdown.start();

        expect($buttonDropdown.parent().text()).to.contain('Item 1');
        expect($buttonDropdown.parent().html()).to.contain('Item 2');
    });

    it("buttonDropdown items should be visible after the button is clicked", function () {
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
        var buttonDropdown = new ButtonDropdownComponent('#button-dropdown', {
            items:menuItems
        });
        buttonDropdown.start();

        // Check whether elements are visible after clicking on the button.
        expect($('.dropdown-content').hasClass('visible')).to.equal(false);

        // Click on the button and observer that it opens the dropdown content.
        domEvents.dispatch($buttonDropdown[0], 'click');
        expect($('.dropdown-content').hasClass('visible')).to.equal(true);

        // Click on an Item and observe that it triggers the action.
        domEvents.dispatch($('#i1 a')[0], 'click');
        expect($debugOutput.text()).to.contain('item 1 clicked');
    });

    it("buttonDropdown disabled item should not close dialog when clicked", function () {
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
        var buttonDropdown = new ButtonDropdownComponent('#button-dropdown', {
            items:menuItems
        });
        buttonDropdown.start();

        // Set action state to disabled.
        buttonDropdown.setItemState('i2', 'disabled');

        // Click on the button to open the content.
        domEvents.dispatch($buttonDropdown[0], 'click');
        expect($('.dropdown-content').hasClass('visible')).to.equal(true);

        // Check whether the element is disabled.
        expect($('#i2').hasClass('disabled')).to.equal(true);

        // Click on disabled element.
        domEvents.dispatch($('#i2 a')[0], 'click');

        // Observe that the dropdown content is still visible.
        expect($('.dropdown-content').hasClass('visible')).to.equal(true);
    });
});
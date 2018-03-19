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
import CanControl from "can-control";
import Component from "passbolt-mad/component/component";
import CompositeComponent from 'passbolt-mad/component/composite';
import MadControl from 'passbolt-mad/control/control';
import TabComponent from "passbolt-mad/component/tab";

describe("mad.component.Tab", function () {

    // The HTMLElement which will carry the tab component.
    var $tab = null;

    // Insert a <ul> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $tab = $('<div id="tab"></div>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });


    it("constructed instance should inherit TabComponent & the inherited parent classes", function () {
        var tabs = new TabComponent('#tab');

        // Basic control of classes inheritance.
        expect(tabs).to.be.instanceOf(CanControl);
        expect(tabs).to.be.instanceOf(MadControl);
        expect(tabs).to.be.instanceOf(Component);
        expect(tabs).to.be.instanceOf(CompositeComponent);
        expect(tabs).to.be.instanceOf(TabComponent);

        tabs.start();
        //tabs.destroy();
    });

    it("Tabs should appear and disappear on click", function () {
        var tabs = new TabComponent('#tab', {
            autoMenu: true
        });
        tabs.start();

        // Tab 1.
        var tab1 = tabs.addComponent(Component, {
            id: 'free-composite-1',
            label: 'tab1'
        });

        // Tab2.
        var tab2 = tabs.addComponent(Component, {
            id: 'free-composite-2',
            label: 'tab2'
        });
        tabs.enableTab('free-composite-2');
        tabs.enableTab('free-composite-1');

        // Add text inside the tabs.
        $('<p class="txt1">this is the content of tab 1</p>').appendTo('#free-composite-1');
        $('<p class="txt2">this is the content of tab 2</p>').appendTo('#free-composite-2');

        expect($('.tabs-content p:visible').text()).to.equal('this is the content of tab 1');
        $('#js_tab_nav_free-composite-2 a').click();
        expect($('.tabs-content p:visible').text()).to.equal('this is the content of tab 2');
    });

});
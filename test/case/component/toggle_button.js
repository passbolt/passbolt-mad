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
import ButtonComponent from 'passbolt-mad/component/button';
import CanControl from "can-control";
import Component from "passbolt-mad/component/component";
import domEvents from 'can-dom-events';
import MadControl from 'passbolt-mad/control/control';
import ToggleButtonComponent from "passbolt-mad/component/toggle_button";

describe("mad.component.ToggleButton", function () {

    // The HTMLElement which will carry the button component.
    var $button = null;

    // Insert a <ul> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $button = $('<div id="button"></div>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit mad.component.Button & the inherited parent classes", function () {
        var button = new ToggleButtonComponent('#button');

        // Basic control of classes inheritance.
        expect(button).to.be.instanceOf(CanControl);
        expect(button).to.be.instanceOf(MadControl);
        expect(button).to.be.instanceOf(Component);
        expect(button).to.be.instanceOf(ButtonComponent);
        expect(button).to.be.instanceOf(ToggleButtonComponent);

        button.start();
        button.destroy();
    });

    it("a click on button should put it in pressed position", function () {
        var button = new ToggleButtonComponent('#button', {});
        button.start();

        domEvents.dispatch($button[0], 'click');
        expect($button.hasClass('selected')).to.be.true;
        domEvents.dispatch($button[0], 'click');
        expect($button.hasClass('selected')).to.be.false;

        button.destroy();
    });
});
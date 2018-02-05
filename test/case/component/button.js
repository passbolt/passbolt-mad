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
import ButtonComponent from "passbolt-mad/component/button";
import CanControl from "can-control";
import Component from "passbolt-mad/component/component";
import MadControl from 'passbolt-mad/control/control';
import $ from "can-jquery";

describe("mad.component.Button", function () {

    // The HTMLElement which will carry the button component.
    var $button = null;
    var $debugOutput = null;

    // Insert a <ul> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $button = $('<div id="button"></div>').appendTo($('#test-html'));
        $debugOutput = $('<div id="test-output"></div>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit mad.Grid & the inherited parent classes", function () {
        var button = new ButtonComponent('#button');

        // Basic control of classes inheritance.
        expect(button).to.be.instanceOf(CanControl);
        expect(button).to.be.instanceOf(MadControl);
        expect(button).to.be.instanceOf(Component);
        expect(button).to.be.instanceOf(ButtonComponent);

        button.start();
        button.destroy();
    });

    it("a click on button should trigger the associated function", function () {
        var valueTest = 'k3d';
        var button = new ButtonComponent('#button', {
            value: valueTest,
            events: {
                'click': function (el, ev, value) {
                    $debugOutput.html(value);
                }
            }
        });
        button.start();

        $button.click();
        expect($debugOutput.text()).to.contain(valueTest);

        button.destroy();
    });

    it("state disabled should be intercepted", function () {
        var button = new ButtonComponent('#button');
        button.start();

        button.setState('disabled');
        expect($button.attr('class')).to.contain('disabled');

        button.destroy();
    });

    it("click should not be executed if the state is disabled", function () {
        var valueTest = 'k3d';
        var button = new ButtonComponent('#button', {
            value: valueTest,
            events: {
                'click': function (el, ev, value) {
                    $debugOutput.html(value);
                }
            }
        });
        button.start();

        button.setState('disabled');
        $button.click();
        expect($debugOutput.text()).to.not.contain(valueTest);

        button.destroy();
    });
});
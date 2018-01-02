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
import CanControl from "can/control/control";
import Component from 'passbolt-mad/component/component';
import FormElement from 'passbolt-mad/form/element';
import MadControl from 'passbolt-mad/control/control';

describe("mad.form.Element", function () {

    // The HTMLElement which will carry the textbox component.
    var $element = null;

    // Insert a <ul> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $element = $('<input type="text" id="element"/>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit FormElement & the inherited parent classes", function () {
        var element = new FormElement($element, {});

        // Basic control of classes inheritance.
        expect(element).to.be.instanceOf(CanControl);
        expect(element).to.be.instanceOf(Component);
        expect(element).to.be.instanceOf(FormElement);

        element.destroy();
    });

    it("setValue() should change the value of the form element", function () {
        var element = new FormElement($element, {});
        element.start();

        expect(element.getValue()).to.be.null;
        element.setValue('abc');
        expect(element.getValue()).to.be.equal('abc');

        element.destroy();
    });

    it("Switching the form element state to disabled should add a disabled attribute", function () {
        var element = new FormElement($element, {});
        element.start();

        expect($element.attr('disabled')).to.be.undefined;
        element.setState('disabled');
        expect($element.attr('disabled')).to.be.equal('disabled');

        element.destroy();
    });

});
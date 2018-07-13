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
import ChoiceFormElement from 'passbolt-mad/form/choice_element';
import domEvents from 'can-dom-events';
import DropdownFormElement from "passbolt-mad/form/element/dropdown"
import Component from 'passbolt-mad/component/component';
import FormElement from 'passbolt-mad/form/element';
import MadControl from 'passbolt-mad/control/control';

describe("mad.form.element.Dropdown", function () {

    // The HTMLElement which will carry the dropdown component.
    var $dropdown = null;

    // Insert a <input> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $dropdown = $('<select id="dropdown" />').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit mad.form.Element & the inherited parent classes", function () {
        var dropdown = new DropdownFormElement('#dropdown', {});

        // Basic control of classes inheritance.
        expect(dropdown).to.be.instanceOf(CanControl);
        expect(dropdown).to.be.instanceOf(Component);
        expect(dropdown).to.be.instanceOf(FormElement);
        expect(dropdown).to.be.instanceOf(ChoiceFormElement);

        dropdown.destroy();
    });

    it("getValue() should return the value of the dropdown", function (done) {
        var dropdown = new DropdownFormElement('#dropdown', {
                availableValues: {
                    ID_1: 'VALUE 1',
                    ID_2: 'VALUE 2',
                    ID_3: 'VALUE 3'
                },
                value: 'ID_1'
            }).start();

        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(dropdown.getValue()).to.be.equal('ID_1');
            dropdown.destroy();
            done();
        }, 0);
    });

    it("Changing the value of the dropdown should fire the changed event", function (done) {
        var firedChanged = false,
            dropdown = new DropdownFormElement('#dropdown', {
            availableValues: {
                ID_1: 'VALUE 1',
                ID_2: 'VALUE 2',
                ID_3: 'VALUE 3'
            },
            value: 'ID_1'
        }).start();

        // While the dropdown value change.
        $dropdown.on('changed', function () {
            firedChanged = true;
        });
        expect(firedChanged).to.be.false;

        // Simulate a keypress and check after the timeout
        $dropdown.val('ID_2');
        domEvents.dispatch($dropdown[0], 'change');

        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(dropdown.getValue()).to.be.equal('ID_2');
            expect(firedChanged).to.be.true;
            dropdown.destroy();
            done();
        }, 0);
    });

});

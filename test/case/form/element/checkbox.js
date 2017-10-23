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
import "passbolt-mad/form/element/checkbox"

describe("mad.form.element.Checkbox", function () {

    // The HTMLElement which will carry the checkbox component.
    var $checkbox = null;

    // Insert a <div> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $checkbox = $('<div id="checkbox" type="text"></div>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit mad.form.Element & the inherited parent classes", function () {
        var checkbox = new mad.form.Checkbox($checkbox, {});

        // Basic control of classes inheritance.
        expect(checkbox).to.be.instanceOf(can.Control);
        expect(checkbox).to.be.instanceOf(mad.Component);
        expect(checkbox).to.be.instanceOf(mad.form.Element);

        checkbox.destroy();
    });

    it("Changing the value of the checkbox should fire the changed event", function () {
        var firedChanged = false,
            checkbox = new mad.form.Checkbox($checkbox, {
                availableValues: {
                    'option_1': 'Option 1',
                    'option_2': 'Option 2',
                    'option_3': 'Option 3'
                }
            });

        // While the checkbox value change.
        $checkbox.on('changed', function () {
            firedChanged = true;
        });
        expect(firedChanged).to.be.false;

        // Start the checkbox.
        checkbox.start();

        // Simulate a click on an option
        $('input[value=option_1]').click();

        // Check that the option is well selected.
        expect(checkbox.getValue()).to.eql(['option_1']);
        expect(firedChanged).to.be.true;

        // Unselect the option
        firedChanged = false;
        $('input[value=option_1]').click();
        expect(checkbox.getValue()).to.eql([]);
        expect(firedChanged).to.be.true;

        // Select all options
        firedChanged = false;
        $('input').click();
        expect(checkbox.getValue()).to.eql(['option_1', 'option_2', 'option_3']);
        expect(firedChanged).to.be.true;

        checkbox.destroy();
    });

});

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
import TextboxFormElement from "passbolt-mad/form/element/textbox"
import Component from 'passbolt-mad/component/component';
import FormElement from 'passbolt-mad/form/element';
import MadControl from 'passbolt-mad/control/control';

describe("mad.form.element.Textbox", function () {

    // The HTMLElement which will carry the textbox component.
    var $textbox = null;

    // Insert a <input> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $textbox = $('<input id="textbox" type="text" />').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit mad.form.Element & the inherited parent classes", function () {
        var textbox = new TextboxFormElement('#textbox', {});

        // Basic control of classes inheritance.
        expect(textbox).to.be.instanceOf(CanControl);
        expect(textbox).to.be.instanceOf(Component);
        expect(textbox).to.be.instanceOf(FormElement);

        textbox.destroy();
    });

    it("getValue() should return the value of the textbox", function (done) {
        var firedChanged = false,
            textbox = new TextboxFormElement('#textbox', {});

        textbox.start();

        // Simulate a keypress
        $textbox.val('abc').trigger('input');

        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(textbox.getValue()).to.be.equal('abc');
            textbox.destroy();
            done();
        }, 0);
    });

    it("getValue() should return the value of the textbox for several textboxes", function (done) {
        var firedChanged = false,
            $textbox2 = $('<input id="textbox2" type="text" />').appendTo($('#test-html')),
            textbox = new TextboxFormElement('#textbox', {}).start(),
            textbox2 = new TextboxFormElement('#textbox2', {}).start();

        // Simulate a keypress
        $textbox.val('abc').trigger('input');
        $textbox2.val('xyz').trigger('input');

        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(textbox.getValue()).to.be.equal('abc');
            expect(textbox2.getValue()).to.be.equal('xyz');
            textbox.destroy();
            textbox2.destroy();
            done();
        }, 0);
    });

    it("Changing the value of the textbox should fire the changed event", function (done) {
        var firedChanged = false,
            textbox = new TextboxFormElement('#textbox', {});

        // While the textbox value change.
        $textbox.on('changed', function () {
            firedChanged = true;
        });
        expect(firedChanged).to.be.false;

        // Start the textbox.
        textbox.start();

        // Simulate a keypress and check after the timeout
        $textbox.val('abc').trigger('input');

        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(textbox.getValue()).to.be.equal('abc');
            expect(firedChanged).to.be.true;
            textbox.destroy();
            done();
        }, 0);
    });

    it("With onChangeAfterLength changing the value of the textbox should fire the changed event after the value length limit has been reached", function (done) {
        var firedChanged = false,
            textbox = new TextboxFormElement('#textbox', {
                onChangeAfterLength: 3
            });

        // While the textbox value change.
        $textbox.on('changed', function () {
            firedChanged = true;
        });
        expect(firedChanged).to.be.false;

        // Start the textbox.
        textbox.start();

        // Simulate a keypress and check after the timeout
        $textbox.val('ab').trigger('input');

        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(textbox.getValue()).to.be.null;
            expect(firedChanged).to.be.false;
        }, 0);

        $textbox.val('abc').trigger('input');

        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(textbox.getValue()).to.be.equal('abc');
            expect(firedChanged).to.be.true;
            textbox.destroy();
            done();
        }, 0);
    });

    it("With onChangeTimeout changing the value of the textbox should fire the changed event after a period of time", function (done) {
        var firedChanged = false,
            textbox = new TextboxFormElement('#textbox', {
                onChangeTimeout: 100
            });

        // While the textbox value change.
        $textbox.on('changed', function () {
            firedChanged = true;
        });
        expect(firedChanged).to.be.false;

        // Start the textbox.
        textbox.start();

        // Simulate a keypress
        $textbox.val('a').trigger('input');

        // Simulate a keypress and check after the timeout
        setTimeout(function () {
            expect(textbox.getValue()).to.be.null;
            expect(firedChanged).to.be.false;
        }, 0);

        // Simulate a keypress
        $textbox.val('b').trigger('input');

        // Simulate a keypress and check after the timeout
        setTimeout(function () {
            expect(textbox.getValue()).to.be.null;
            expect(firedChanged).to.be.false;
        }, 0);

        // Simulate a keypress and check after the timeout
        $textbox.val('c').trigger('input');

        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(textbox.getValue()).to.be.equal('c');
            expect(firedChanged).to.be.true;
            textbox.destroy();
            done();
        }, 150);
    });
});

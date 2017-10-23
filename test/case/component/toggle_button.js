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
import "passbolt-mad/component/toggle_button";

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

    it("constructed instance should inherit mad.Grid & the inherited parent classes", function () {
        var button = new mad.component.ToggleButton($button);

        // Basic control of classes inheritance.
        expect(button).to.be.instanceOf(can.Control);
        expect(button).to.be.instanceOf(mad.Control);
        expect(button).to.be.instanceOf(mad.Component);
        expect(button).to.be.instanceOf(mad.component.Button);
        expect(button).to.be.instanceOf(mad.component.ToggleButton);

        button.start();
        button.destroy();
    });

    it("a click on button should put it in pressed position", function () {
        var button = new mad.component.ToggleButton($button, {});
        button.start();

        $button.click();
        expect($button.hasClass('selected')).to.be.true;
        $button.click();
        expect($button.hasClass('selected')).to.be.false;

        button.destroy();
    });
});
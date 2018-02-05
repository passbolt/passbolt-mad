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
import CanControl from 'can-control';
import MadBus from "passbolt-mad/control/bus";
import MadControl from 'passbolt-mad/control/control';

describe("mad.Bus", function(){

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("should inherit can.Control & mad.Control", function(){
        $('<div id="bus"></div>').prependTo('#test-html');
        var bus = MadBus.singleton('#bus');
        expect(bus).to.be.instanceOf(CanControl);
        expect(bus).to.be.instanceOf(MadControl);
        MadBus.destroy();
    });

    it("trigger() & bind(): should help to broadcast & intercept message on the bus", function() {
        var caught = false;
        $('<div id="bus"/>').prependTo('#test-html');
        MadBus.singleton('#bus');
        MadBus.bind('event_name', function() {
            caught = true;
        });
        MadBus.trigger('event_name');
        expect(caught).to.be.true;
        MadBus.destroy();
    });
});

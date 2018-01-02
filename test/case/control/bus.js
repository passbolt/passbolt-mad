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
import MadBus from "passbolt-mad/control/bus";

describe("mad.Bus", function(){

    it("should inherit can.Control & mad.Control", function(){
        var $busElement = $('<div/>').prepend('#test-html');
        var bus = MadBus.singleton($busElement);
        expect(bus).to.be.instanceOf(can.Control);
        expect(bus).to.be.instanceOf(mad.Control);
        MadBus.destroy();
    });

    it("trigger() & bind(): should help to broadcast & intercept message on the bus", function() {
        var caught = false;
        var $busElement = $('<div/>').prepend('#test-html');
        MadBus.singleton($busElement);
        MadBus.bind('event_name', function() {
            caught = true;
        });
        MadBus.trigger('event_name');
        expect(caught).to.be.true;
        MadBus.destroy();
    });
});

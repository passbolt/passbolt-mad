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
import "../../bootstrap";
import "../../../src/control/bus";

describe("mad.Bus", function(){

    it("should inherit can.Control & mad.Control", function(){
        var bus = new mad.Bus($('#test-html'));
        expect(bus).to.be.instanceOf(can.Control);
        expect(bus).to.be.instanceOf(mad.Control);
        bus.destroy();
    });

    it("trigger() & bind(): should help to broadcast & intercept message on the bus", function() {
        var caught = false;
        var bus = new mad.Bus($('#test-html'));
        bus.bind('event_name', function() {
            caught = true;
        });
        bus.trigger('event_name');
        expect(caught).to.be.true;
        bus.destroy();
    });
});

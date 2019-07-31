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
import $ from 'jquery';
import "passbolt-mad/test/bootstrap";
import CanControl from 'can-control';
import MadBus from "passbolt-mad/control/bus";
import MadControl from 'passbolt-mad/control/control';

describe("Bus", () => {
  afterEach(() => {
    $('#test-html').empty();
  });

  describe("Constructor", () => {
    it("should inherit can.Control & mad.Control", () => {
      $('<div id="bus"></div>').prependTo('#test-html');
      const bus = MadBus.singleton('#bus');
      expect(bus).to.be.instanceOf(CanControl);
      expect(bus).to.be.instanceOf(MadControl);
      MadBus.destroy();
    });
  });

  describe("bind() and trigger()", () => {
    it("sends and listens to message on the application bus", () => {
      let caught = false;
      $('<div id="bus"/>').prependTo('#test-html');
      MadBus.singleton('#bus');
      MadBus.bind('event_name', () => {
        caught = true;
      });
      MadBus.trigger('event_name');
      expect(caught).to.be.true;
      MadBus.destroy();
    });
  });
});

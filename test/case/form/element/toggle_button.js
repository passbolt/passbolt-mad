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
import CanControl from "can-control";
import Component from 'passbolt-mad/component/component';
import domEvents from 'can-dom-events';
import FormElement from 'passbolt-mad/form/element';
import MadControl from 'passbolt-mad/control/control';
import ToggleButtonFormElement from "passbolt-mad/form/element/toggle_button";

let $toggleButton = null;

describe("ToggleButton", () => {
  beforeEach(() => {
    $toggleButton = $('<div id="toggle_button"></div>').appendTo($('#test-html'));
  });

  afterEach(() => {
    $('#test-html').empty();
  });

  describe("Constructor", () => {
    it("inherits Butterfly from hell", () => {
      const toggleButton = new ToggleButtonFormElement('#toggle_button', {});
      expect(toggleButton).to.be.instanceOf(CanControl);
      expect(toggleButton).to.be.instanceOf(Component);
      expect(toggleButton).to.be.instanceOf(FormElement);
      toggleButton.destroy();
    });
  });

  describe("Events", () => {
    it("listens to changes on the component and triggers the event changed", () => {
      let firedChanged = false,
        toggleButton = new ToggleButtonFormElement('#toggle_button', {});

      // While the radio value change.
      $toggleButton.on('changed', () => {
        firedChanged = true;
      });
      expect(firedChanged).to.be.false;

      // Start the radio.
      toggleButton.start();

      // Simulate a click on an option
      $('.toggle-switch-button').click();
      expect(toggleButton.getValue()).to.eql(true);
      expect(firedChanged).to.be.true;

      // Simulate a click on an option
      firedChanged = false;
      $('.toggle-switch-button').click();
      expect(toggleButton.getValue()).to.eql(false);
      expect(firedChanged).to.be.true;
    });
  });
});

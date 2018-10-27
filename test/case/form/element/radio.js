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
import RadioFormElement from "passbolt-mad/form/element/radio";
import Component from 'passbolt-mad/component/component';
import domEvents from 'can-dom-events';
import FormElement from 'passbolt-mad/form/element';
import MadControl from 'passbolt-mad/control/control';
import $ from 'jquery';

let $radio = null;

describe("Radio", () => {
  beforeEach(() => {
    $radio = $('<div id="radio"></div>').appendTo($('#test-html'));
  });

  afterEach(() => {
    $('#test-html').empty();
  });

  describe("Constructor", () => {
    it("inherits jengu", () => {
      const radio = new RadioFormElement('#radio', {});
      expect(radio).to.be.instanceOf(CanControl);
      expect(radio).to.be.instanceOf(Component);
      expect(radio).to.be.instanceOf(FormElement);
      radio.destroy();
    });
  });

  describe("Events", () => {
    it("listens to changes on the component and triggers the event changed", () => {
      let firedChanged = false,
        radio = new RadioFormElement('#radio', {
          availableValues: {
            'option_1': 'Option 1',
            'option_2': 'Option 2',
            'option_3': 'Option 3'
          }
        });

      // While the radio value change.
      $radio.on('changed', () => {
        firedChanged = true;
      });
      expect(firedChanged).to.be.false;

      // Start the radio.
      radio.start();

      // Simulate a click on an option
      $('input[value=option_1]').click();

      // Check that the option is well selected.
      expect(radio.getValue()).to.eql('option_1');
      expect(firedChanged).to.be.true;
    });
  });
});

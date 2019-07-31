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
import Button from 'passbolt-mad/component/button';
import CanControl from "can-control";
import Component from "passbolt-mad/component/component";
import domEvents from 'can-dom-events';
import MadControl from 'passbolt-mad/control/control';
import ToggleButton from "passbolt-mad/component/toggle_button";

describe("ToggleButton", () => {
  let $button = null;
  let $debugOutput = null;

  beforeEach(() => {
    $button = $('<div id="button"></div>').appendTo($('#test-html'));
    $debugOutput = $('<div id="test-output"></div>').appendTo($('#test-html'));
  });

  afterEach(() => {
    $('#test-html').empty();
  });

  describe("Constructor", () => {
    it("inherits manticore", () => {
      const button = new ToggleButton('#button');
      expect(button).to.be.instanceOf(CanControl);
      expect(button).to.be.instanceOf(MadControl);
      expect(button).to.be.instanceOf(Component);
      expect(button).to.be.instanceOf(Button);
      expect(button).to.be.instanceOf(ToggleButton);
      button.start();
      button.destroy();
    });
  });

  describe("Events", () => {
    it("listen to click", () => {
      const button = new ToggleButton('#button', {});
      button.start();

      expect(button.state.selected).to.be.false;
      domEvents.dispatch($button[0], 'click');
      expect(button.state.selected).to.be.true;
      expect($button.hasClass('selected')).to.be.true;
      domEvents.dispatch($button[0], 'click');
      expect(button.state.selected).to.be.false;
      expect($button.hasClass('selected')).to.be.false;

      button.destroy();
    });

    it("does not listen to click when disabled", () => {
      const valueTest = 'werewolf';
      const button = new ToggleButton('#button', {
        value: valueTest,
        events: {
          'click': function(el, ev, value) {
            $debugOutput.html(value);
          }
        }
      });
      button.start();

      button.state.disabled = true;
      expect($button.hasClass('disabled')).to.be.true;
      expect($button.attr('disabled')).to.be.equal('disabled');
      $button.click();
      expect($debugOutput.text()).to.not.contain(valueTest);
      expect(button.state.selected).to.be.false;

      button.state.disabled = false;
      expect($button.hasClass('disabled')).to.be.false;
      expect($button.attr('disabled')).to.be.undefined;
      $button.click();
      expect($debugOutput.text()).to.contain(valueTest);
      expect(button.state.selected).to.be.true;

      button.destroy();
    });
  });
});

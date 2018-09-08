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
import "../../bootstrap.js";
import Button from "../../../component/button";
import CanControl from "can-control";
import Component from "../../..//component/component";
import MadControl from '../../..//control/control';
import $ from 'jquery';

describe("Button", () => {
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
    it("inherits werewolf", () => {
      const button = new Button('#button');
      expect(button).to.be.instanceOf(CanControl);
      expect(button).to.be.instanceOf(MadControl);
      expect(button).to.be.instanceOf(Component);
      expect(button).to.be.instanceOf(Button);
      button.destroy();
    });
  });

  describe("Event click", () => {
    it("executes callback on click", () => {
      const valueTest = 'werewolf';
      const button = new Button('#button', {
        value: valueTest,
        events: {
          'click': function(el, ev, value) {
            $debugOutput.html(value);
          }
        }
      });
      button.start();

      $button.click();
      expect($debugOutput.text()).to.contain(valueTest);

      button.destroy();
    });

    it("does not execute callback on click if disabled", () => {
      const valueTest = 'werewolf';
      const button = new Button('#button', {
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

      button.state.disabled = false;
      expect($button.hasClass('disabled')).to.be.false;
      expect($button.attr('disabled')).to.be.undefined;
      $button.click();
      expect($debugOutput.text()).to.contain(valueTest);

      button.destroy();
    });
  });
});

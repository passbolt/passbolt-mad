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
import Component from 'passbolt-mad/component/component';
import FormElement from 'passbolt-mad/form/element';
import MadControl from 'passbolt-mad/control/control';

let $element = null;

describe("Element", () => {
  beforeEach(() => {
    $element = $('<input type="text" id="element"/>').appendTo($('#test-html'));
  });

  afterEach(() => {
    $('#test-html').empty();
  });

  describe("Constructor", () => {
    it("inherits firedrake", () => {
      const element = new FormElement('#element', {});
      expect(element).to.be.instanceOf(CanControl);
      expect(element).to.be.instanceOf(Component);
      expect(element).to.be.instanceOf(FormElement);
      element.destroy();
    });
  });

  describe("setValue()", () => {
    it("updates the value", () => {
      const element = new FormElement('#element', {});
      element.start();

      expect(element.getValue()).to.be.null;
      element.setValue('abc');
      expect(element.getValue()).to.be.equal('abc');

      element.destroy();
    });
  });

  describe("Events", () => {
    it("adds/removes a disabled attribute when the state property disabled is updated", () => {
      const element = new FormElement('#element');
      element.start();

      expect($element.attr('disabled')).to.be.undefined;
      element.state.disabled = true;
      expect($element.attr('disabled')).to.be.equal('disabled');
      element.state.disabled = false;
      expect($element.attr('disabled')).to.be.undefined;

      element.destroy();
    });

    it("adds/removes an error class when the state property error is updated", () => {
      const element = new FormElement('#element');
      element.start();

      expect($element.hasClass('error')).to.be.false;
      element.state.error = true;
      expect($element.hasClass('error')).to.be.true;
      element.state.error = false;
      expect($element.hasClass('error')).to.be.false;

      element.destroy();
    });
  });
});

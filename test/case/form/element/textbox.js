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
import TextboxFormElement from "passbolt-mad/form/element/textbox";
import Component from 'passbolt-mad/component/component';
import domEvents from 'can-dom-events';
import FormElement from 'passbolt-mad/form/element';
import MadControl from 'passbolt-mad/control/control';

let $textbox = null;

describe("Textbox", () => {
  beforeEach(() => {
    $textbox = $('<input id="textbox" type="text" />').appendTo($('#test-html'));
  });

  afterEach(() => {
    $('#test-html').empty();
  });

  describe("Constructor", () => {
    it("inherits jinn", () => {
      const textbox = new TextboxFormElement('#textbox', {});
      expect(textbox).to.be.instanceOf(CanControl);
      expect(textbox).to.be.instanceOf(Component);
      expect(textbox).to.be.instanceOf(FormElement);
      textbox.destroy();
    });
  });

  describe("getValue()", () => {
    it("returns the value of the element", done => {
      const textbox = new TextboxFormElement('#textbox', {});
      textbox.start();

      // Simulate a keypress
      $textbox.val('abc');
      domEvents.dispatch($textbox[0], 'input');

      // After all event handlers have done their treatment.
      setTimeout(() => {
        expect(textbox.getValue()).to.be.equal('abc');
        textbox.destroy();
        done();
      }, 0);
    });

    it("returns the value of the element (several elements on the page)", done => {
      let $textbox2 = $('<input id="textbox2" type="text" />').appendTo($('#test-html')),
        textbox = new TextboxFormElement('#textbox', {}).start(),
        textbox2 = new TextboxFormElement('#textbox2', {}).start();

      // Simulate a keypress
      $textbox.val('abc');
      domEvents.dispatch($textbox[0], 'input');
      $textbox2.val('xyz');
      domEvents.dispatch($textbox2[0], 'input');

      // After all event handlers have done their treatment.
      setTimeout(() => {
        expect(textbox.getValue()).to.be.equal('abc');
        expect(textbox2.getValue()).to.be.equal('xyz');
        textbox.destroy();
        textbox2.destroy();
        done();
      }, 0);
    });
  });

  describe("Events", () => {
    it("listens to changes on the component and triggers the event changed", done => {
      let firedChanged = false;
      const textbox = new TextboxFormElement('#textbox', {});

      // While the textbox value change.
      $textbox.on('changed', () => {
        firedChanged = true;
      });
      expect(firedChanged).to.be.false;

      // Start the textbox.
      textbox.start();

      // Simulate a keypress and check after the timeout
      $textbox.val('abc');
      domEvents.dispatch($textbox[0], 'input');

      // After all event handlers have done their treatment.
      setTimeout(() => {
        expect(textbox.getValue()).to.be.equal('abc');
        expect(firedChanged).to.be.true;
        textbox.destroy();
        done();
      }, 0);
    });

    it("triggers a changed event only when the value reached a threshold defined in the options", done => {
      let firedChanged = false;
      const textbox = new TextboxFormElement('#textbox', {
        onChangeAfterLength: 3
      });

      // While the textbox value change.
      $textbox.on('changed', () => {
        firedChanged = true;
      });
      expect(firedChanged).to.be.false;

      // Start the textbox.
      textbox.start();

      // Simulate a keypress and check after the timeout
      $textbox.val('ab');
      domEvents.dispatch($textbox[0], 'input');

      // After all event handlers have done their treatment.
      setTimeout(() => {
        expect(textbox.getValue()).to.be.null;
        expect(firedChanged).to.be.false;
      }, 0);

      $textbox.val('abc');
      domEvents.dispatch($textbox[0], 'input');

      // After all event handlers have done their treatment.
      setTimeout(() => {
        expect(textbox.getValue()).to.be.equal('abc');
        expect(firedChanged).to.be.true;
        textbox.destroy();
        done();
      }, 0);
    });

    it("triggers a changed event only when the waiting period is reached defined in the options", done => {
      let firedChanged = false;
      const textbox = new TextboxFormElement('#textbox', {
        onChangeTimeout: 100
      });

      // While the textbox value change.
      $textbox.on('changed', () => {
        firedChanged = true;
      });
      expect(firedChanged).to.be.false;

      // Start the textbox.
      textbox.start();

      // Simulate a keypress
      $textbox.val('a');
      domEvents.dispatch($textbox[0], 'input');

      // Simulate a keypress and check after the timeout
      setTimeout(() => {
        expect(textbox.getValue()).to.be.null;
        expect(firedChanged).to.be.false;
      }, 0);

      // Simulate a keypress
      $textbox.val('b');
      domEvents.dispatch($textbox[0], 'input');

      // Simulate a keypress and check after the timeout
      setTimeout(() => {
        expect(textbox.getValue()).to.be.null;
        expect(firedChanged).to.be.false;
      }, 0);

      // Simulate a keypress and check after the timeout
      $textbox.val('c');
      domEvents.dispatch($textbox[0], 'input');

      // After all event handlers have done their treatment.
      setTimeout(() => {
        expect(textbox.getValue()).to.be.equal('c');
        expect(firedChanged).to.be.true;
        textbox.destroy();
        done();
      }, 150);
    });
  });
});

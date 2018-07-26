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
import Component from "passbolt-mad/component/component";
import CompositeComponent from "passbolt-mad/component/composite";
import ConfirmComponent from "passbolt-mad/component/confirm";
import DialogComponent from "passbolt-mad/component/dialog";
import domEvents from 'can-dom-events';
import FreeCompositeComponent from "passbolt-mad/component/free_composite";
import MadControl from 'passbolt-mad/control/control';
import contentTemplate from 'passbolt-mad/test/case/component/confirm_content_template.stache!';

describe("Confirm", () => {
  afterEach(() => {
    $('.dialog-wrapper').remove();
  });

  describe("Constructor", () => {
    it("inherits jackalope", () => {
      const confirm = ConfirmComponent.instantiate({label: 'Confirm Test'});
      expect(confirm).to.be.instanceOf(CanControl);
      expect(confirm).to.be.instanceOf(MadControl);
      expect(confirm).to.be.instanceOf(Component);
      expect(confirm).to.be.instanceOf(CompositeComponent);
      expect(confirm).to.be.instanceOf(FreeCompositeComponent);
      expect(confirm).to.be.instanceOf(DialogComponent);
      confirm.start();
    });
  });

  describe("start()", () => {
    it("displays the confirm dialog", () => {
      expect($('.dialog-wrapper').length).to.equal(0);
      ConfirmComponent.instantiate({label: 'Confirm Test'}).start();
      expect($('.dialog').length).to.not.equal(0);
      expect($('.dialog').html()).to.contain('Confirm Test');
      expect($('.dialog').html()).to.contain('close');
    });
  });

  describe("render()", () => {
    it("displays custom content", () => {
      const confirm = ConfirmComponent.instantiate({
        label: 'Confirm Test',
        content: 'Content of the confirm box'
      });
      confirm.start();
      expect($('.dialog').length).to.not.equal(0);
      expect($('.dialog-content').text()).to.contain('Content of the confirm box');
    });

    it("displays template as content", () => {
      const confirm = ConfirmComponent.instantiate({
        content: contentTemplate
      });
      confirm.setViewData('confirm_content_template_var', 'custom template variable');
      confirm.start();
      expect($('.dialog').length).to.not.equal(0);
      expect($('.dialog-content').text()).to.contain('custom template variable');
    });
  });

  describe("execute()", () => {
    it("keeps the confirm dialog open after it executes the action when the option closerAfterAction is set to false", () => {
      $('body').append('<p class="feedback"></p>');
      const confirm = ConfirmComponent.instantiate({
        label: 'Confirm Test',
        action: function() {
          $('p.feedback').text('action1 is executed');
        },
        closeAfterAction: false
      }).start();
      expect($('.dialog').length).to.not.equal(0);
      domEvents.dispatch($('#confirm-button')[0], 'click');
      expect($('.dialog').length).to.not.equal(0);
      expect($('p.feedback').html()).to.equal('action1 is executed');
      $('p.feedback').remove();
    });
  });

  describe("Events", () => {
    it("listens to click on the close button and closes the confirm dialog", () => {
      ConfirmComponent.instantiate({label: 'Confirm Test'}).start();
      expect($('.dialog').length).to.not.equal(0);
      domEvents.dispatch($('a.dialog-close')[0], 'click');
      expect($('.dialog').length).to.equal(0);
    });

    it("listens to click on the cancel button and closes the confirm dialog", () => {
      ConfirmComponent.instantiate({label: 'Confirm Test'}).start();
      expect($('.dialog').length).to.not.equal(0);
      domEvents.dispatch($('a.js-dialog-cancel')[0], 'click');
      expect($('.dialog').length).to.equal(0);
    });

    it("listens to click on the ok button and execute the callback action", () => {
      $('body').append('<p class="feedback"></p>');
      const confirm = ConfirmComponent.instantiate({
        label: 'Confirm Test',
        action: function() {
          $('p.feedback').text('action is executed');
        }
      }).start();
      expect($('.dialog').length).to.not.equal(0);
      domEvents.dispatch($('#confirm-button')[0], 'click');
      expect($('.dialog').length).to.equal(0);
      expect($('p.feedback').html()).to.equal('action is executed');
      $('p.feedback').remove();
    });
  });
});

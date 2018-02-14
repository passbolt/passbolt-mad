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
import DialogComponent from "passbolt-mad/component/dialog"
import FreeCompositeComponent from "passbolt-mad/component/free_composite";
import MadControl from 'passbolt-mad/control/control';
import contentTemplate from 'passbolt-mad/test/case/component/confirm_content_template.stache!';

describe("mad.component.Confirm", function () {

    //// Clean the DOM after each test.
    afterEach(function () {
        $('.dialog-wrapper').remove();
    });

    it("constructed instance should inherit mad.component.FreeComposite & the inherited parent classes", function () {
        var confirm = ConfirmComponent.instantiate({label: 'Confirm Test'});
        confirm.start();

        // Basic control of classes inheritance.
        expect(confirm).to.be.instanceOf(CanControl);
        expect(confirm).to.be.instanceOf(MadControl);
        expect(confirm).to.be.instanceOf(Component);
        expect(confirm).to.be.instanceOf(CompositeComponent);
        expect(confirm).to.be.instanceOf(FreeCompositeComponent);
        expect(confirm).to.be.instanceOf(DialogComponent);

        confirm.start();
    });

    it("Confirm should be visible in the dom after start", function () {
        expect($('.dialog-wrapper').length).to.equal(0);
        var configm = ConfirmComponent.instantiate({label: 'Confirm Test'}).start();
        expect($('.dialog').length).to.not.equal(0);

        expect($('.dialog').html()).to.contain('Confirm Test');
        expect($('.dialog').html()).to.contain('close');
    });

    it("Confirm should be hidden after clicking on close", function () {
        var confirm = ConfirmComponent.instantiate({label: 'Confirm Test'}).start();
        expect($('.dialog').length).to.not.equal(0);
        $('a.dialog-close').click();
        expect($('.dialog').length).to.equal(0);
    });

    it("Confirm should be hidden after clicking on cancel button", function () {
        var confirm = ConfirmComponent.instantiate({label: 'Confirm Test'}).start();
        expect($('.dialog').length).to.not.equal(0);
        $('a.js-dialog-cancel').click();
        expect($('.dialog').length).to.equal(0);
    });

    it("Action should be executed after clicking on Ok button", function () {
        $('body').append('<p class="feedback"></p>');
        var confirm = ConfirmComponent.instantiate({
            label: 'Confirm Test',
            action: function() {
                $('p.feedback').text('action is executed');
            }
        }).start();
        expect($('.dialog').length).to.not.equal(0);
        $('#confirm-button').click();
        expect($('.dialog').length).to.equal(0);
        expect($('p.feedback').html()).to.equal('action is executed');
        $('p.feedback').remove();
    });

    it("Confirm dialog should not be closed after action if closeAfterAction is set to false", function () {
        $('body').append('<p class="feedback"></p>');
        var confirm = ConfirmComponent.instantiate({
            label: 'Confirm Test',
            action: function() {
                $('p.feedback').text('action1 is executed');
            },
            closeAfterAction: false
        }).start();
        expect($('.dialog').length).to.not.equal(0);
        $('#confirm-button').click();
        expect($('.dialog').length).to.not.equal(0);
        expect($('p.feedback').html()).to.equal('action1 is executed');
        $('p.feedback').remove();
    });

    it("Content should be displayed as per what is given in the variables", function () {
        var confirm = ConfirmComponent.instantiate({
            label: 'Confirm Test',
            content: 'Content of the confirm box'
        }).start();
        expect($('.dialog').length).to.not.equal(0);
        expect($('.dialog-content').text()).to.contain('Content of the confirm box');
    });

    it("Content could be a template", function () {
        var confirm = ConfirmComponent.instantiate({
            content: contentTemplate
        });
        confirm.setViewData('confirm_content_template_var', 'custom template variable');
        confirm.start();
        expect($('.dialog').length).to.not.equal(0);
        expect($('.dialog-content').text()).to.contain('custom template variable');
    });
});
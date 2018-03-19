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
import $ from 'can-jquery';
import DialogComponent from 'passbolt-mad/component/dialog';
import ConfirmView from 'passbolt-mad/view/component/confirm';
import HtmlHelper from 'passbolt-mad/helper/html';
import template from 'passbolt-mad/view/template/component/confirm/confirm.stache!';

var Confirm = DialogComponent.extend('mad.component.Confirm', /** @static */ {

    defaults: {
        label: 'Confirm component',
        viewClass: ConfirmView,
        template: template,
        subtitle: null,
        submitButton: {
            label: __('OK'),
            cssClasses: [
                // Extra css classes.
                // Will be added to button, primary, js-dialog-confirm
            ]
        },
        content: 'default content',
        closeAfterAction: true,
        action: null,
        viewData: {}
    },

    /**
     * Instantiate a new confirm dialog.
     *
     * @param {Object} [options] option values for the component.  These get added to
     * this.options and merged with defaults static variable
     * @return {mad.component.Dialog}
     */
    instantiate: function(options) {
        // Create the DOM entry point for the dialog
        var refElt = $('body'),
            position = 'first';

        // If a dialog already exist, position the new one right after.
        var $existingDialog = $('.dialog-wrapper:last');
        if ($existingDialog.length) {
            refElt = $existingDialog;
            position = 'after';
        }

        // Insert the element in the page DOM.
        var $el = HtmlHelper.create(refElt, position, '<div/>');

        return new Confirm($el[0], options);
    }

}, /** @prototype */ {

    /**
     * @inheritdoc
     */
    beforeRender: function() {
        this.setViewData('content', this.options.content);
        this.setViewData('subtitle', this.options.subtitle);
        this.setViewData('submitButton', this.options.submitButton);
        for (var name in this.options.viewData) {
            this.setViewData(name, this.options.viewData[name]);
        }
        this._super();
    },

    /**
     * confirm_clicked event
     * thrown when the user has clicked on confirm.
     */
    '{element} confirm_clicked': function() {
        if (typeof this.options.action !== 'undefined') {
            this.options.action();
        }
        if (this.options.closeAfterAction === true) {
            Confirm.closeLatest();
        }
    }
});

export default Confirm;
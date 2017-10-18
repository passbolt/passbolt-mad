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
import './dialog';
import '../view/component/confirm';
import template from '../view/template/component/confirm/confirm.ejs!';

var Confirm = mad.component.Confirm = mad.component.Dialog.extend('mad.component.Confirm', /** @static */ {

    defaults: {
        label: 'Confirm component',
        viewClass: mad.view.component.Confirm,
        template: template,
        subtitle: null,
        submitButton: {
            label: __('OK'),
            cssClasses: [
                // Extra css classes.
                // Will be added to button, primary, js-dialog-confirm
            ]
        },
        content: '',
        closeAfterAction: true,
        action: null
    }


}, /** @prototype */ {

    /**
     * Init.
     * @param el
     * @param options
     */
    init: function(el, options) {
        this._super(el, options);
        this.setViewData('content', this.options.content);
        this.setViewData('subtitle', this.options.subtitle);
        this.setViewData('submitButton', this.options.submitButton);
    },

    /**
     * Set the content
     * @param {string} content the new Content
     */
    setContent: function(content) {
        this.view.setContent(content);
    },

    /**
     * confirm_clicked event
     * thrown when the user has clicked on confirm.
     */
    ' confirm_clicked': function() {
        if (typeof this.options.action !== 'undefined') {
            this.options.action();
        }
        if (this.options.closeAfterAction === true) {
            mad.component.Confirm.closeLatest();
        }
    }
});

export default Confirm;
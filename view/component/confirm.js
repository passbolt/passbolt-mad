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

/**
 * @inherits mad.view.View
 */
var ConfirmView = mad.view.component.Confirm = mad.view.component.Dialog.extend('mad.view.component.Confirm', /* @static */ {}, /** @prototype */ {

    /**
     * Set the content
     * @param {string} title The new content
     */
    setContent: function (content) {
        $('.dialog-content .form-content', this.element).html(content);
    },

    /**
     * Listen to click on the confirm link
     * @param {HTMLElement} el The element the event occured on
     * @param {HTMLEvent} ev The event which occured
     * @return {void}
     */
    ' .js-dialog-confirm click': function (el, ev) {
        ev.preventDefault();
        this.element.trigger('confirm_clicked');
    }
});

export default ConfirmView;

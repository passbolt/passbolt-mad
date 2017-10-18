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
var Dialog = mad.view.component.Dialog = mad.View.extend('mad.view.component.Dialog', /* @static */ {}, /** @prototype */ {

    /**
     * Set the title
     * @param {string} title The new title
     */
    setTitle: function (title) {
        $('.dialog-header h2', this.element).html(title);
    },

    /* ************************************************************** */
    /* LISTEN TO THE VIEW EVENTS */
    /* ************************************************************** */

    /**
     * Listen to the user interaction click with the close button
     * @param {HTMLElement} el The element the event occured on
     * @param {HTMLEvent} ev The event which occured
     * @return {void}
     */
    '.dialog-close click': function (el, ev) {
        ev.preventDefault();
        this.element.remove();
    },

    /**
     * Listen to the user interaction keyboard press
     * @param {HTMLElement} el The element the event occured on
     * @param {HTMLEvent} ev The event which occured
     * @return {void}
     */
    '{window} keyup': function (el, ev) {
        if (ev.keyCode == 27) {
            this.element.remove();
        }
    },

    /**
     * Listen to click on the cancel link
     * @param {HTMLElement} el The element the event occured on
     * @param {HTMLEvent} ev The event which occured
     * @return {void}
     */
    ' .js-dialog-cancel click': function (el, ev) {
        this.element.remove();
    }
});

export default Dialog;

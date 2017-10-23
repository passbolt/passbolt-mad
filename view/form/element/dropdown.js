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
import 'passbolt-mad/view/form/element';

/**
 * @inherits mad.view.form.Element
 */
var Dropdown = mad.view.form.Dropdown = mad.view.form.Element.extend('mad.view.form.Dropdown', /* @static */ {}, /** @prototype */ {

    /**
     * Get the value of the dropdown form element
     * @return {mixed} The value of the component
     */
    getValue: function (value) {
        return this.element.val();
    },

    /**
     * Set the value of the dropdown form element
     * @param {mixed} value The value to set
     */
    setValue: function (value) {
        this.element.val(value);
    },

    /* ************************************************************** */
    /* LISTEN TO THE VIEW EVENTS */
    /* ************************************************************** */

    /**
     * Listen to the view event change
     * @param {HTMLElement} el The element the event occured on
     * @param {HTMLEvent} ev The event which occured
     */
    change: function (el, event) {
        el.trigger('changed', {
            value: this.getValue()
        });
    }
});

export default Dropdown;

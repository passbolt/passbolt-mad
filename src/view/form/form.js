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
import '../view';

// Initialize the view form namespaces.
mad.view.form = mad.view.form || {};

/**
 * @inherits mad.View
 */
var Form = mad.view.Form = mad.View.extend('mad.view.Form', /* @static */ {}, /** @prototype */ {

    /**
     * Set the state of an embedded element.
     *
     * @param element
     * @param state
     */
    setElementState: function (element, state) {
        // Element's id.
        var eltId = element.getId(),
            $label = $('label[for="' + eltId + '"]'),
            $wrapper = element.element.parent('.js_form_element_wrapper');

        switch (state) {
            case 'success':
                if ($label) {
                    $label.removeClass('error');
                }
                if ($wrapper) {
                    $wrapper.removeClass('error');
                }
                break;
            case 'error':
                if ($label) {
                    $label.addClass('error');
                }
                if ($wrapper) {
                    $wrapper.addClass('error');
                }
                break;
        }
    }
});

export default Form;

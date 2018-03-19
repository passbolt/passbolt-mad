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
import mad from "passbolt-mad/passbolt-mad";
import Checkbox from "passbolt-mad/form/element/checkbox";

var checkbox = new mad.form.Checkbox($('#checkbox'), {
    availableValues: {
        1: 'Option 1',
        2: 'Option 2',
        3: 'Option 3'
    }
});
checkbox.start();

$('#checkbox').on('changed', function() {
    $('li.count .value').html(checkbox.getValue().length);
    $('li.values .value').html(checkbox.getValue().join(', '));
});

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
import mad from "passbolt-mad/passbolt-mad";
import Textbox from "passbolt-mad/form/element/textbox";

var textbox = new mad.form.Textbox($('#textbox'), { });
textbox.start();

$('#textbox').on('changed', function() {
    $('li.count .value').html(textbox.getValue().length)
});

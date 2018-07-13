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
import Confirm from "passbolt-mad/component/confirm";

$(function() {
    $('#show-confirm-dialog').click(function() {
        var confirm = new mad.component.Confirm(
            null, {
                label: 'Do you want to delete the password ?',
                content: 'This is a content test',
                action:function() {
                    alert('action is performed');
                }
            }).start();
        return false;
    });
});
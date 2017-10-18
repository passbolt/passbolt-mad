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
var url = url.substring(0, url.indexOf('#'));
var demos = [
    'control'
];
for (var i in demos) {
    $('#demo-html').append('<a href="' + url + '#' + demos[i] + '" target="_self">' + demos[i] + '</a>')
}
$('a').on('click', function(){
    location.href = $(this).attr('href');
    location.reload();
});
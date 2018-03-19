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
import stache from 'can-stache';
import string from 'can-util/js/string/string';
import isString from 'can-util/js/is-string/is-string';

// Register a stache helper to help to capitalize a string
stache.registerHelper('capitalize', function() {
    return string.capitalize.apply(this, arguments);
});

// Register a stache helper to help to check that a variable is a string.
stache.registerHelper('isString', function() {
    return isString.apply(this, arguments);
});

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

// Initialize the error namespaces.
mad.error = mad.error || {};
mad.error.WRONG_PARAMETER = "Wrong parameter [%0]";
mad.error.MISSING_OPTION = "The option [%0] should be defined";
mad.error.ELEMENT_NOT_FOUND = "The element [%0] could not be found";
mad.error.MISSING_CONFIG = "The config [%0] has to be defined";

const MadException = mad.Exception = function() {
};

MadException.get = function(exception_message) {
  const reps = Array.prototype.slice.call(arguments, 1);
  const message = exception_message.replace(/%(\d+)/g, (s, key) => reps[key] || s);
  return new Error(message);
};

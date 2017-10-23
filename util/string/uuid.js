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

/*
Usage 1: define the default prefix by using an object with the property prefix as a parameter which contains a string value; {prefix: 'id'}
Usage 2: call the function uuid() with a string parameter p to be used as a prefix to generate a random uuid;
Usage 3: call the function uuid() with no parameters to generate a uuid with the default prefix; defaul prefix: '' (empty string)
*/

/* Generate fragment of random numbers */
_uuidlet = function () {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
/* Generates random uuid */
uuid = function () {
	return (_uuidlet() + _uuidlet() + "-" + _uuidlet() + "-" + _uuidlet() + "-" + _uuidlet() + "-" + _uuidlet() + _uuidlet() + _uuidlet());
};
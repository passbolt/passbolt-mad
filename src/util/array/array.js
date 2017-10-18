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
import mad from '../util';

/**
 * Our array utilities.
 */
mad.array = mad.array || {};

/**
 * Return the intersection of two arrays given in parameter
 *
 * @param arr1
 * @param arr2
 * @return {[]} The intersection of the two arrays.
 */
mad.array.intersect = function(arr1, arr2) {
	return arr1.filter(function(n) {
		return arr2.indexOf(n) > -1;
	});
};

export default mad.array;

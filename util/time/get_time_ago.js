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

import Config from 'passbolt-mad/config/config';
import moment from 'moment/moment';
import 'moment-timezone/builds/moment-timezone-with-data-2012-2022';

/**
 * Convert a datetime string into a time ago value.
 * @signature `getTimeAgo(dateTime)`
 * @param  {Object} date The date to convert
 * @param {*} the converted value
 *
 * ```js
 * var getDatetimeAgo = require("passbolt-mad/util/time/get_time_ago");
 * var date = "1970-01-01T00:00:00";
 * var ago = getDatetimeAgo(date);
 * console.log(ago); // -> 2039 years ago (javascript conquered the world)
 * ```
 */
function getTimeAgo(date) {
  return moment.tz(date, Config.read('app.server_timezone')).fromNow();
}

export default getTimeAgo;

'use strict';

import Config from 'passbolt-mad/config/config';
import moment from 'moment/moment';
import 'moment-timezone/builds/moment-timezone-with-data';

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

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
import Construct from 'can-construct';

/**
 * @inherits jQuery.Class
 * @parent mad.core
 *
 * Common error handler.
 * Use the console as logger.
 */
var ErrorHandler = Construct.extend('mad.error.ErrorHandler', /** @static */ {

    /**
     * Log the error or exception
     * @return {void}
     */
    _log: function (status, title, message, data) {
        var log = status.toUpperCase() + ' ' +
            title + ' ' +
            '(' + message + ')';

        steal.dev.warn(log);
        if (data) {
            steal.dev.warn(data);
        }
    },

    /**
     * Handle Exception
     * @param {Exception} ex
     * @return {void}
     */
    handleException: function (exception) {
        mad.error.ErrorHandler._log(
            'exception',
            exception.name,
            exception.message,
            exception.stack || null
        );
        throw exception;
    },

    /**
     * Handle Error
     * @param {string} status Error status
     * @param {string} title Error title
     * @param {string} message Error message
     * @param {mixed} data Error associated data
     * @return {void}
     */
    handleError: function (status, title, message, data) {
        mad.error.ErrorHandler._log(
            status,
            title,
            message || '',
            data || null
        );
    }
},

/** @prototype */ {});

export default ErrorHandler;

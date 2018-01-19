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
import Model from 'passbolt-mad/model/model';

/**
 * @inherits can.Model
 * @parent mad.net
 *
 * Our ajax response model
 *
 * @constructor
 * Creates a new ajax response
 * @return {mad.net.Response}
 */
var Response = Model.extend('mad.net.Response', /** @static */ {

    attributes: {
        /**
         * Passbolt response Header
         * @type {object}
         */
        header: 'json',
        /**
         * Passbolt response Body
         * @type {mixed}
         */
        body: 'json'
    },

    /**
     * Status error
     * @type {string}
     */
    STATUS_ERROR: 'error',
    /**
     * Status notice
     * @type {string}
     */
    STATUS_NOTICE: 'notice',
    /**
     * Status success
     * @type {string}
     */
    STATUS_SUCCESS: 'success',
    /**
     * Status warning
     * @type {string}
     */
    STATUS_WARNING: 'warning',

    /**
     * Not response id defined
     * @type {string}
     */
    RESPONSE_ID_UNDEFINED: 'undefined',
    /**
     * Not response controller defined
     * @type {string}
     */
    RESPONSE_CONTROLLER_UNDEFINED: 'undefined',
    /**
     * Not response action defined
     * @type {string}
     */
    RESPONSE_ACTION_UNDEFINED: 'undefined',

    /**
     * Response function factory. Build a response function of a predefined type
     * the response factory is able to build
     * @param {string} type The desired type of response (server
     * @param {object} data The server response
     * @param {object} jqXHR The request raw object
     * @return {mad.net.Response}
     */
    getResponse: function (type, data) {
        var header = {},
            body = null,
            code = null;

        switch (type) {
            case 'unreachable':
                header = {
                    id: Response.RESPONSE_ID_UNDEFINED,
                    status: Response.STATUS_ERROR,
                    controller: Response.RESPONSE_CONTROLLER_UNDEFINED,
                    action: Response.RESPONSE_ACTION_UNDEFINED,
                    title: __('Unable to reach the server'),
                    message: __('The url is probably incorrectly formatted')
                };
                code = 0;
                body = data;
            break;
        }

        return new Response({
            header: header,
            body: body,
            code: code
        });
    },

    /**
     * Check that bulk data is formated as a ajax server response
     * @return {boolean}
     */
    isResponse: function (data) {
        var returnValue = false;

        // A response cannot be empty.
        if(typeof data != 'undefined' && data != null) {
            // A response should carry a header.
            if (data.header) {
                returnValue = true
            }
        }

        return returnValue;
    },

    /**
     * Get data in an ajax server response
     * @return {mixed} The meaningfull server response data
     */
    getData: function (data) {
        return data.body;
    }

}, /** @prototype */ {

    /**
     * Get the reponse code
     * @return {string}
     */
    getCode: function () {
        return this.attr('code');
    },

    /**
     * Get the response' status
     * @return {string}
     */
    getStatus: function () {
        return this.attr('header').status;
    },

    /**
     * Get the response' title
     * @return {string}
     */
    getTitle: function () {
        return this.attr('header').title;
    },

    /**
     * Get the response' message
     * @return {string}
     */
    getMessage: function () {
        return this.attr('header').message;
    },

    /**
     * Get the response' action
     * @return {string}
     */
    getAction: function () {
        return this.attr('header').action;
    },

    /**
     * Get the response' controller
     * @return {string}
     */
    getController: function () {
        return this.attr('header').controller;
    },

    /**
     * Get the response' data
     * @return {string}
     */
    getData: function () {
        return this.attr('body');
    }
});

export default Response;

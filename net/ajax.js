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
import $ from 'can-jquery';
import canAjax from 'can-ajax';
import Construct from 'can-construct';
import Config from 'passbolt-mad/config/config';
import MadBus from 'passbolt-mad/control/bus';
import Response from 'passbolt-mad/net/response';
import StringUtil from 'can-util/js/string/string';

/**
* @inherits can.Construct
* @see Response
* @parent mad.net
*
* ## Simple Request Example
*
* ```
mad.net.Ajax.request({
    'type': Request.METHOD_POST,
    'url': 'resources/viewByCategory',
    'async': false
});
* ```
 *
**/
var Ajax = Construct.extend('mad.net.Ajax', /** @static */ {

    /**
     * Perform an ajax request
     * @param {Array} request The ajax request settings (almost similar to the
     * jQuery ajax function)
     * @return {jQuery.deferred}
     */
    request: function (request) {
        // Keep the original parameters.
        request.originParams = $.extend({}, request.params);
        // Treat templated uris (e.g. /control/action/{id}).
        request.url = StringUtil.sub(request.url, request.params, true);
        if (/^\//.test(request.url) && typeof APP_URL != 'undefined') {
            request.url = APP_URL + request.url.slice(1);
        }
        // By default we expect the request to return json.
        request.dataType = request.dataType || 'json';
        // Treat the request params as data
        // @todo #Refactor data/params wtf 2 different names for the same variable
        request.data = request.params;
        // Treat the request method. By default GET.
        request.type = request.type ? request.type.toUpperCase() : 'GET';

        // The request will not display a loading feedback, default true.
        if (typeof request.silentLoading == 'undefined') {
            request.silentLoading = true;
            if (request.type == 'POST' || request.type == 'DELETE' || request.type == 'PUT') {
                request.silentLoading = false;
            }
        }

        this._triggerAjaxStartEvent(request);

        return canAjax(request)
            .then((data) => this.handleSuccess(request, data),
                (jqXHR) => this.handleError(request, jqXHR));
    },

    /**
     * Handle success.
     *
     * @param request
     * @param data
     * @returns {*}
     */
    handleSuccess: function(request, data) {
        var response = null;
        if (Response.isResponse(data)) {
            response = new Response(data);
        } else {
            response = data;
        }

        this._triggerAjaxCompleteEvent(request);

        if (response instanceof Response) {
            return response.body;
        }

        return response;
    },

    /**
     * Handle error.
     *
     * @param request
     * @param jqXHR
     * @returns {Promise}
     */
    handleError: function(request, jqXHR) {
        var response = null;
        try {
            if(jqXHR.responseText) {
                var jsonData = $.parseJSON(jqXHR.responseText);
                if (Response.isResponse(jsonData)) {
                    jsonData.code = jqXHR.status;
                    response = new Response(jsonData);
                }
            } else {
                response = Response.getResponse(jqXHR.status);
            }
        } catch(e) { }

        this._triggerAjaxCompleteEvent(request);

        return Promise.reject(response);
    },

    /**
     * Trigger a complete event.
     *
     * @param request The request to trigger an event for
     * @private
     */
    _triggerAjaxCompleteEvent: function(request) {
        if (typeof(mad.bus) != 'undefined') {
            MadBus.trigger('mad_ajax_request_complete', request);
        }
    },

    /**
     * Trigger a start event.
     *
     * @param request The request to trigger an event for
     * @private
     */
    _triggerAjaxStartEvent: function(request) {
        if (typeof(mad.bus) != 'undefined') {
            MadBus.trigger('mad_ajax_request_start', request);
        }
    }

}, /** @prototype */ {

});

export default Ajax;
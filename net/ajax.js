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
import canAjax from 'can-ajax';
import Construct from 'can-construct';
import Config from 'passbolt-mad/config/config';
import MadBus from 'passbolt-mad/control/bus';
import Response from 'passbolt-mad/net/response';
import ResponseHandler from 'passbolt-mad/net/response_handler'
import StringUtil from 'can-util/js/string/string';
import $ from 'can-jquery';

/**
* @inherits can.Construct
* @see mad.net.Response
* @see mad.net.ResponseHandler
* @parent mad.net
*
* ## Simple Request Example
*
* ```
mad.net.Ajax.request({
    'type': mad.net.Request.METHOD_POST,
    'url': APP_URL + '/resources/viewByCategory',
    'async': false,
    'dataType': 'passbolt.model.Resource.models',
    'success': function (request, response, body) {
        ...
    },
    'error': function (request, response) {
        ...
    }
});
* ```
*
* *dataType* The dataType options allow you to define the format of the server result.
* It gets the standart jQuery ajax setting option : xml, html, script, json, jsonp, test.
* Or a javascriptMVC model reference. This model will be used to map  the server result to
* a ready to use object by the client application. Here we are expecting an array of Resources.
*
* *success* The success callback function gets the following parameters
*
* * request (<a href="#!mad.net.Request">mad.net.Request</a>) : The original request setting
* * response (<a href="#!mad.net.Response">mad.net.Response</a>) : The server answer
* * body (<a href="#!mad.net.Response.body">mad.net.Response.body</a>) : The server body answer
*
* *error* The error callback functions gets the following parameters
*
* * request (<a href="#!mad.net.Request">mad.net.Request</a>) : The original request setting
* * response (<a href="#!mad.net.Response">mad.net.Response</a>) : The server answer
*
**/
var Ajax = Construct.extend('mad.net.Ajax', /** @static */ {

    defaults : {
        defaultResponseHandlerClass : 'mad.net.ResponseHandler'
    },

    _getResponseHandlerClass: function() {
        var ResponseHandlerClass = this.defaults.defaultResponseHandlerClass;
        var configHandler = Config.read('net.ResponseHandlerClassName');
        if (configHandler !== undefined) {
            ResponseHandlerClass = configHandler;
        }
        return ResponseHandlerClass;
    },

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
        // @todo #Refactor
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

        // Notify other components that an ajax request has been fired.
        if (typeof(mad.bus) != 'undefined') {
            MadBus.trigger('mad_ajax_request_start', request);
        }

        // Perform the request.
        return canAjax(request)
            .then((data) => Ajax._handleSuccess(data),
                (jqXHR) => Ajax._handleError(jqXHR, request));
    },

    _handleSuccess: function(data) {
        return data;
    },

    _handleError: function(jqXHR, request) {
        var response = null;
        try {
            if(jqXHR.responseText) {
                var jsonData = $.parseJSON(jqXHR.responseText);
                if (Response.isResponse(jsonData)) {
                    jsonData.code = jqXHR.status;
                    response = new Response(jsonData);
                }
            } else {
                response = Response.getResponse('unreachable');
            }
        } catch(e) { }

        return new Promise((resolve, reject) => {
            reject(response);
            //rejectWith(this, [jqXHR, response.getStatus(), response, request]);
        });
    }
        //    // pipe it to intercept server before any other treatments
        //    .then(
        //        // the request has been performed sucessfully
        //        function (data, textStatus, jqXHR) {
        //           console.log(data, textStatus, jqXHR);
        //            data.code = jqXHR.status;
        //            var response = new Response(data),
        //                // the deferred to return
        //                deferred = null;
        //            console.log('Ah bon');
        //            // @todo check the response format is valid
        //
        //            // the server returns an error
        //            if (response.getStatus() == Response.STATUS_ERROR) {
        //                deferred = $.Deferred();console.log('HEADER 8');
        //                deferred.rejectWith(this, [jqXHR, 'error', response]);
        //                return deferred;
        //            }
        //            // @todo treat notice, warning & success
        //            console.log('HEADER 16');
        //            // everything fine, continue
        //            // override the deferred to pass the desired data
        //            // findOne, findAll get this deffered, but create seems to have
        //            // its own, it return only the bulk server response (treat it there)
        //            deferred = $.Deferred();
        //            deferred.resolveWith(this, [data.body, response, request]);
        //            return deferred;
        //        },
        //
        //        // the request has not been performed
        //        function (jqXHR, textStatus, data) {
        //            console.log('HEADER ERROR');
        //            var jsonData = null;console.log('HEADER 12');
        //            var response = null;
        //            // In case of error the reponse is not automatically parsed.
        //            // Try to parse it, in case the server return an understable message.
        //            try {
        //                if(typeof jqXHR.responseText != undefined) {
        //                    jsonData = $.parseJSON(jqXHR.responseText);
        //                }
        //            } catch(e) {
        //                // @todo do something!
        //            }
        //            console.log('HEADER 21');
        //            // In case we've been able to parse the server answer.
        //            if (Response.isResponse(jsonData)) {console.log('HEADER fd');
        //                jsonData.code = jqXHR.status;
        //                response = new Response(jsonData);
        //            }
        //            // Otherwise treat a default unreacheable server answer.
        //            else {console.log('HEADER 1qsd');
        //                response = Response.getResponse('unreachable');
        //            }
        //
        //            var deferred = $.Deferred();console.log('HEADER azezavdsbgr1');
        //            deferred.rejectWith(this, [jqXHR, response.getStatus(), response, request]);
        //            return deferred;
        //        }
        //
        //    ); // end of pipe
        //
        //var self = this;
        //// Handle the server success response with the default response handler
        //returnValue.then(function (data, response, request) {console.log('HEADER END');
        //    // Notify other components that the ajax request has been completed.
        //    if (typeof(mad.bus) != 'undefined') {
        //        MadBus.trigger('mad_ajax_request_complete', request);
        //    }
        //    var ResponseHandlerClass = self._getResponseHandlerClass();
        //    var ResponseHandlerClass = can.getObject(ResponseHandlerClass);
        //    var responseHandler = new ResponseHandlerClass(response, request);
        //    responseHandler.handle();
        //});
        //
        //// Handle the server fail response with the default response handler
        //returnValue.then(null, function (jqXHR, textStatus, response) {
        //    console.log('ERRRORR');
        //    // Notify other components that the ajax request has been completed.
        //    if (typeof(mad.bus) != 'undefined') {
        //        MadBus.trigger('mad_ajax_request_complete', request);
        //    }
        //    var ResponseHandlerClass = self._getResponseHandlerClass();
        //    var ResponseHandlerClass = can.getObject(ResponseHandlerClass);
        //    var responseHandler = new ResponseHandlerClass(response, request);
        //    responseHandler.handle();
        //});
        //
        //return returnValue;
}, /** @prototype */ {

});

export default Ajax;
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
import $ from 'jquery';
import canAjax from 'can-ajax';
import Construct from 'can-construct';
import DefineList from '../model/list/list';
import Response from './response';
import StringUtil from 'can-util/js/string/string';
import uuid from 'uuid/v4';

/**
 * @inherits can.Construct
 * @see Response
 * @parent mad.net
 *
 * ## Simple Request Example
 *
 * ```
 * mad.net.Ajax.request({
 * 'type': Request.METHOD_POST,
 * 'url': 'resources/viewByCategory',
 * 'async': false
 * });
 * ```
 */
const Ajax = Construct.extend('mad.net.Ajax', /** @static */ {
  /**
   * Registered of requests.
   */
  _requests: new DefineList(),

  /**
   * Perform an ajax request
   * @param {object} request The ajax request settings (almost similar to the jQuery ajax function)
   * @return {jQuery.deferred}
   */
  request: function(request) {
    request.id = uuid();
    // Keep the original parameters.
    request.originParams = $.extend({}, request.params);
    // Treat templated uris (e.g. /control/action/{id}).
    request.url = StringUtil.sub(request.url, request.params, true);
    if (/^\//.test(request.url) && typeof APP_URL != 'undefined') {
      request.url = APP_URL + request.url.slice(1);
    }
    // By default we expect the request to return json.
    request.dataType = request.dataType || 'json';
    /*
     * Treat the request params as data
     * @todo #Refactor data/params wtf 2 different names for the same variable
     */
    request.data = request.params;
    // Treat the request method. By default GET.
    request.type = request.type ? request.type.toUpperCase() : 'GET';

    // The request will not display a loading feedback, default true.
    if ((typeof request.silentLoading) == 'undefined') {
      request.silentLoading = true;
      if (request.type == 'POST' || request.type == 'DELETE' || request.type == 'PUT') {
        request.silentLoading = false;
      }
    }

    // Associate the xhr request to the original request object.
    if (!request.beforeSend) {
      request.beforeSend = function(xhr) {
        request._xhr = xhr;
      };
    }

    this._registerRequest(request);
    return canAjax(request)
      .then(data => this.handleSuccess(request, data),
        data => this.handleError(request, data));
  },

  /**
   * Register the request.
   * @param {object} The request to register
   * @private
   */
  _registerRequest: function(request) {
    if (request.register === false) {
      return;
    }
    Ajax._requests.push(request);
  },

  /**
   * Unregister the request.
   * @param {object} The request to register
   * @private
   */
  _unregisterRequest: function(request) {
    if (request.register === false) {
      return;
    }
    const id = request.id;
    const index = Ajax._requests.indexOf({id: id});
    if (index != -1) {
      Ajax._requests.splice(index, 1);
    }
  },

  /**
   * Handle success.
   *
   * @param request
   * @param data
   * @returns {Promise}
   */
  handleSuccess: function(request, data) {
    let response = null;
    if (Response.isResponse(data)) {
      response = new Response(data);
    } else {
      response = data;
    }
    request._response = response;
    this._unregisterRequest(request);

    if (response instanceof Response) {
      return Promise.resolve(response.body);
    }

    return Promise.resolve(response);
  },

  /**
   * Handle error.
   *
   * @param request
   * @param data
   * @returns {Promise}
   */
  handleError: function(request, data) {
    let response = null;
    if (Response.isResponse(data)) {
      data.code = request._xhr.status;
      response = new Response(data);
    } else {
      response = Response.getResponse(request._xhr.status);
    }
    request._response = response;
    this._unregisterRequest(request);

    return Promise.reject(response);
  }

}, /** @prototype */ {

});

export default Ajax;

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
import DefineMap from '../model/map/map';

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
const Response = DefineMap.extend('mad.net.Response', /** @static */ {
  header: {
    type: 'any',
    value: {}
  },
  body: {
    type: 'any',
    value: {}
  },
  code: 'integer'
});

// Allowed response status.
Response.STATUS_ERROR = 'error';
Response.STATUS_NOTICE = 'notice';
Response.STATUS_SUCCESS = 'success';
Response.STATUS_WARNING = 'warning';

// Undefined response id.
Response.RESPONSE_ID_UNDEFINED = 'undefined';
// Undefined response controller.
Response.RESPONSE_CONTROLLER_UNDEFINED = 'undefined';
// Undefined response action.
Response.RESPONSE_ACTION_UNDEFINED = 'undefined';

/**
 * Check that bulk data is formated as a ajax server response
 * @return {boolean}
 */
Response.isResponse = function(data) {
  let returnValue = false;

  // A response cannot be empty.
  if (typeof data != 'undefined' && data != null) {
    // A response should carry a header.
    if (data.header) {
      returnValue = true;
    }
  }

  return returnValue;
};

/**
 * Response function factory. Build a response function of a predefined type
 * the response factory is able to build
 * @param {string} type The desired type of response (server
 * @param {object} data The server response
 * @param {object} jqXHR The request raw object
 * @return {Response}
 */
Response.getResponse = function(type, data) {
  const header = {
    id: Response.RESPONSE_ID_UNDEFINED,
    status: Response.STATUS_ERROR,
    controller: Response.RESPONSE_CONTROLLER_UNDEFINED,
    action: Response.RESPONSE_ACTION_UNDEFINED,
    title: __('Something went wrong sparkly'),
    message: __('Check your request')
  };
  let body = null;
  let code = null;

  switch (type) {
    case 413:
      header.title = __('Request entity too large');
      header.message = __('Request entity too large');
      code = type;
      break;
    case 0:
      header.title = __('Something went wrong sparkly');
      header.message = __('Check your request');
      code = type;
      body = data;
      break;
  }

  return new Response({
    header: header,
    body: body,
    code: code
  });
};

export default Response;

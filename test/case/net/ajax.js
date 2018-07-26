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
import 'passbolt-mad/test/bootstrap';
import 'passbolt-mad/net/ajax';
import "passbolt-mad/test/fixture/ajax";
import Ajax from 'passbolt-mad/net/ajax';
import Response from 'passbolt-mad/net/response';
import uuid from 'uuid/v4';

describe("mad.net.Ajax", () => {
  it("A successful ajax query should return a success status", done => {
    const request = {
      type: 'POST',
      url: '/ajax/success',
      params: {}
    };
    Ajax.request(request).then(data => {
      expect(request._response).to.be.instanceOf(Response);
      expect(request._response.header.status).to.be.equal(Response.STATUS_SUCCESS);
      done();
    });
  });

  it("An ajax query to an unreachable url should return an error", done => {
    const request = {
      type: 'POST',
      url: '/ajax/not_reachable',
      params: {}
    };
    Ajax.request(request).then(null, data => {
      const response = request._response;
      const unreachableResponse = Response.getResponse(0);

      expect(response).to.be.instanceOf(Response);
      expect(response.header.status).to.be.equal(Response.STATUS_ERROR);
      expect(response.header.title).to.be.equal(unreachableResponse.header.title);
      expect(response.header.action).to.be.equal(unreachableResponse.header.action);
      expect(response.header.controller).to.be.equal(unreachableResponse.header.controller);
      expect(response.body).to.be.null;
      done();
    });
  });

  it("An ajax query to a url returning an error should return an error status", done => {
    const request = {
      type: 'POST',
      url: '/ajax/error',
      params: {}
    };
    Ajax.request(request)
      .then(data => { // The promise is rejected in normal condition, it cannot be tested with can-fixture.
        expect(request._response).to.be.instanceOf(Response);
        expect(request._response.header.status).to.be.equal(Response.STATUS_ERROR);
        done();
      });
  });
});

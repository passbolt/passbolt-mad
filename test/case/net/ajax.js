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
import Ajax from 'passbolt-mad/net/ajax';
import canFixture from 'can-fixture';
import Response from 'passbolt-mad/net/response';
import uuid from 'uuid/v4';

describe("mad.net.Ajax", function() {

    canFixture({
        type: 'POST',
        url: '/ajax/request'
    }, function (original, settings, headers) {
        return {
            header: {
                id: uuid(),
                status: Response.STATUS_SUCCESS,
                title: 'Ajax Unit Test fixture title',
                message: 'Ajax Unit Test fixture message',
                controller: 'controllerName',
                action: 'actionName'
            },
            body: 'RESULT REQUEST 1'
        };
    });

    canFixture({
        type: 'POST',
        url: '/ajax/server_error'
    }, function (original, settings, headers) {
        return {
            header: {
                id: uuid(),
                status: Response.STATUS_ERROR,
                title: 'Ajax Unit Test fixture title',
                message: 'Ajax Unit Test fixture message',
                controller: 'controllerName',
                action: 'actionName'
            },
            body: 'RESULT REQUEST 1'
        };
    });

    it.only("A successful ajax query should return a success status", function(done) {
        Ajax.request({
            type: 'POST',
            url: '/ajax/request',
            async: true,
            dataType: 'json'
        }).then(function (data, response, request) {
            expect(response.header.status).to.contain('success');
            done();
        });
    });

    it("An ajax query to an unreachable url should return an error", function(done) {
        Ajax.request({
            type: 'POST',
            url: '/ajax/not_reachable',
            async: false,
            dataType: 'json'
        }).then(function (data, response, request) {
            expect(false).to.be.ok;
            done();
        }).fail(function(jqXHR, status, response, request) {
            var unreachableResponse = Response.getResponse('unreachable');
            expect(true).to.be.ok;
            expect(response).to.be.instanceOf(Response);
            expect(response.getStatus()).to.be.equal(Response.STATUS_ERROR);
            expect(response.getTitle()).to.be.equal(unreachableResponse.getTitle());
            expect(response.getAction()).to.be.equal(unreachableResponse.getAction());
            expect(response.getController()).to.be.equal(unreachableResponse.getController());
            expect(response.getData()).to.be.equal(unreachableResponse.getData());
            done();
        });
    });

    it("An ajax query to a url returning an error should return an error status", function(done) {
        Ajax.request({
            type: 'POST',
            url: '/ajax/server_error',
            async: false,
            dataType: 'json'
        }).then(function (data, response, request) {
            expect(false).to.be.ok;
            done();
        }).fail(function(jqXHR, status, response, request) {
            expect(true).to.be.ok;
            expect(response).to.be.instanceOf(Response);
            expect(response.getStatus()).to.be.equal(Response.STATUS_ERROR);
            done();
        });
    });
});
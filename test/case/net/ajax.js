import "test/bootstrap";
import 'mad/net/ajax';
import 'can/util/fixture/fixture';

describe("mad.net.Ajax", function() {

    can.fixture({
        type: 'POST',
        url: '/ajax/request'
    }, function (original, settings, headers) {
        return {
            'header': {
                'id': uuid(),
                'status': mad.net.Response.STATUS_SUCCESS,
                'title': 'Ajax Unit Test fixture title',
                'message': 'Ajax Unit Test fixture message',
                'controller': 'controllerName',
                'action': 'actionName'
            },
            'body': 'RESULT REQUEST 1'
        };
    });

    can.fixture({
        type: 'POST',
        url: '/ajax/server_error'
    }, function (original, settings, headers) {
        return {
            'header': {
                'id': uuid(),
                'status': mad.net.Response.STATUS_ERROR,
                'title': 'Ajax Unit Test fixture title',
                'message': 'Ajax Unit Test fixture message',
                'controller': 'controllerName',
                'action': 'actionName'
            },
            'body': 'RESULT REQUEST 1'
        };
    });

    it("test ajax", function(done) {
        mad.net.Ajax.request({
            'type': 'POST',
            'url': '/ajax/request',
            'async': true,
            'dataType': 'json'
        }).then(function (data, response, request) {
            expect(response.header.status).to.contain('success');
            done();
        });
    });

    it("test ajax server not reachable", function(done) {
        mad.net.Ajax.request({
            'type': 'POST',
            'url': '/ajax/not_reachable',
            'async': false,
            'dataType': 'json'
        }).then(function (data, response, request) {
            expect(false).to.be.ok;
            done();
        }), function(jqXHR, status, response, request) {
            console.log('got ajax');
        };
    });

});
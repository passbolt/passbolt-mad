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
import Ajax from 'passbolt-mad/net/ajax';
import CakeSerializer from 'passbolt-mad/model/serializer/cake_serializer';
import Model from "passbolt-mad/model/model";

var UserTestModel = Model.extend('mad.test.model.UserTestModel', {
    /**
     * Attributes.
     */
    attributes: {
        id: 'string',
        username: 'string',
        email: 'string',
        active: 'string',
        Profile: 'mad.test.model.ProfileTestModel'
    },
    findAll: function (params, success, error) {
        var url = '/testusers';
        if (params && params.url) {
            url = params.url;
        }
        return Ajax.request({
            url: url,
            type: 'GET',
            params: params,
            success: success,
            error: error
        });
    },
    findOne: function (params, success, error) {
        var url = '/testusers/{id}';
        if (params && params.url) {
            url = params.url;
        }
        return Ajax.request({
            url: url,
            type: 'GET',
            params: params,
            success: success,
            error: error
        });
    },
    create : function (attrs, success, error) {
        var url = '/testusers';
        var self = this;
        var params = CakeSerializer.to(attrs, this);
        return Ajax.request({
            url: url,
            type: 'POST',
            params: params,
            success: success,
            error: error
        }).pipe(function (data, textStatus, jqXHR) {
            // pipe the result to convert cakephp response format into can format
            // else the new attribute are not well placed
            var def = $.Deferred();
            def.resolveWith(this, [CakeSerializer.from(data, self)]);
            return def;
        });
    },
    update: function (id, attrs, success, error) {
        var url = '/testusers/' + id;
        // format data as expected by cakePHP
        var params = CakeSerializer.to(attrs, this);
        return Ajax.request({
            url: url,
            type: 'PUT',
            params: params,
            success: success,
            error: error
        });
    },
    destroy : function (id, success, error) {
        var params = {id:id};
        var url = '/testusers/' + id;
        return Ajax.request({
            url: url,
            type: 'DELETE',
            params: params,
            success: success,
            error: error
        });
    },
    findCustom: function (params, success, error) {
        var self = this;
        return Ajax.request({
            url: '/testusers/custom/0',
            type: 'GET',
            params: params,
            success: success,
            error: error
        }).pipe(function (data, textStatus, jqXHR) {
            // pipe the result to convert cakephp response format into can format
            var def = $.Deferred();
            var instance = self.model(data);
            def.resolveWith(this, [instance]);
            return def;
        });
    }
}, {});

var ProfileTestModel = Model.extend('mad.test.model.ProfileTestModel', {
    /**
     * Attributes.
     */
    attributes: {
        'id': 'string',
        'first_name': 'string',
        'last_name': 'string'
    }

}, {});

var TestModel2 = Model.extend('mad.test.model.TestModel2', {
    attributes: {
        testModel2Attribute: 'string'
    }
}, {});

var TestModel1 = Model.extend('mad.test.model.TestModel1', {
    attributes: {
        TestModel2: 'mad.test.model.TestModel2.model',
        TestModel2s: 'mad.test.model.TestModel2.models',
        testModel1Attribute: 'string'
    },
    validationRules: {
        'testModel1Attribute': {
            'alphaNumeric': {
                'rule': '/^[a-zA-Z0-9\-_]*$/',
                'message': 'testModel1Attribute should only contain alphabets, numbers only and the special characters : - _'
            },
            'size': {
                'rule': ['lengthBetween', 3, 8],
                'message': 'testModel1Attribute should be between %s and %s characters long'
            }
        },
        'TestModel2s': {
            'size': {
                'rule': ['lengthBetween', 1, 2],
                'message': 'TestModel2s should be between %s and %s selected element'
            }
        }
    }
}, {});

var TestModel = Model.extend('mad.test.model.TestModel', {
    attributes: {
        TestModel1: 'mad.test.model.TestModel1.model',
        TestModel1s: 'mad.test.model.TestModel1.models',
        testModelAttribute: 'string'
    },
    validationRules: {
        'testModelAttribute': {
            'alphaNumeric': {
                'rule': '/^[a-zA-Z0-9\-_]*$/',
                'message': 'testModelAttribute should only contain alphabets, numbers only and the special characters : - _'
            },
            'size': {
                'rule': ['lengthBetween', 3, 8],
                'message': 'testModelAttribute should be between %s and %s characters long'
            }
        }
    }
}, {});

export default {
    ProfileTestModel: ProfileTestModel,
    TestModel: TestModel,
    UserTestModel: UserTestModel
};

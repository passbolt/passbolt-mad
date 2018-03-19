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
import "passbolt-mad/net/ajax";
import fixture from "can-fixture";
import Response from 'passbolt-mad/net/response';
import uuid from 'uuid/v4';

var data = [
    {
        id: '50cdea9c-aa88-46cb-a09b-2f4fd7a10fce',
        username: 'betty@passbolt.com',
        email: 'betty@passbolt.com',
        role_id: '0208f57a-c5cd-11e1-a0c5-080027796c4c',
        active: 1,
        profile: {
            id: 'cbce5d22-46c1-51d1-b851-36b174e40611',
            user_id: '50cdea9c-aa88-46cb-a09b-2f4fd7a10fce',
            first_name: 'Betty',
            last_name: 'Holberton'
        }
    },
    {
        id: '50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce',
        username: 'carol@passbolt.com',
        email: 'carol@passbolt.com',
        role_id: '0208f57a-c5cd-11e1-a0c5-080027796c4c',
        active: 1,
        profile: {
            id: '48bcd9ac-a520-53e0-b3a4-9da7e57b91aa',
            user_id: '50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce',
            first_name: 'Carol',
            last_name: 'Shaw'
        }
    },
    {
        id: 'bbd56042-c5cd-11e1-a0c5-080027796c4e',
        username: 'edith@passbolt.com',
        email: 'edith@passbolt.com',
        role_id: '0208f57a-c5cd-11e1-a0c5-080027796c4c',
        active: 1,
        profile: {
            id: '08710a74-8996-5f60-b5db-ffabfa85bfe6',
            user_id: 'bbd56042-c5cd-11e1-a0c5-080027796c4e',
            first_name: 'Edith',
            last_name: 'Clarke'
        }
    }
];

var getData = function(scenario) {
    switch(scenario){
        case 'carol-email-updated':
            var user = data.filter(item => item.username == 'carol@passbolt.com')[0];
            user.email = 'carol-updated@passbolt.com';
            user.active = 0;
            break;
        case 'carol-profile-updated':
            var user = data.filter(item => item.username == 'carol@passbolt.com')[0];
            user.profile.first_name = 'Carol updated';
            break;
        case 'ada-created':
            var user = {
                id: 'f848277c-5398-58f8-a82a-72397af2d450',
                username: 'ada@passbolt.com',
                email: 'ada@passbolt.com',
                role_id: '0208f57a-c5cd-11e1-a0c5-080027796c4c',
                active: 1,
                profile: {
                    id: '99522cc9-0acc-5ae2-b996-d03bded3c0a6',
                    user_id: 'f848277c-5398-58f8-a82a-72397af2d450',
                    first_name: 'Ada',
                    last_name: 'Lovelace'
                }
            };
            data.push(user);
            break;
    }
    return data;
};

// GET ALL
fixture({
    type: 'GET',
    url: '/test/users'
}, function (params) {
    var scenario = params.data && params.data.scenario ? params.data.scenario : null;
    var body = getData(scenario);
    return {
        header: {
            id: uuid(),
            status: Response.STATUS_SUCCESS,
            title: 'success',
            message: '',
            controller: 'Users',
            action: 'index'
        },
        body: body
    };
});

// DELETE
fixture({
    type: 'DELETE',
    url: '/test/users/{id}'
}, function (id, settings, headers) {
    return {};
});








// Fixture for UserTestModel findOne.
fixture({
    type: 'GET',
    url: '/testusers/{id}'
}, function (original, settings, headers) {
    var data = mad.Model.searchOne(store, 'UserTestModel.id', original.params.id);
    return {
        'header': {
            'id': uuid(),
            'status': mad.net.Response.STATUS_SUCCESS,
            'title': 'success',
            'message': '',
            'controller': 'Users',
            'action': 'view'
        },
        'body': data
    };
});

// Fixture for UserTestModel created.
fixture({
    type: 'POST',
    url: '/testusers'
}, function (attrs, settings, headers) {
    var data = attrs.data;
    data['UserTestModel']['id'] = uuid();
    store.push(data);
    return {
        header: {
            id: uuid(),
            status: mad.net.Response.STATUS_SUCCESS,
            title: 'success',
            message: '',
            controller: 'Users',
            action: 'add'
        },
        'body': data
    };
});

// Fixture for UserTestModel updated.
fixture({
    type: 'PUT',
    url: '/testusers/{id}'
}, function (request, response, headers, ajaxSettings) {
    var instance = store.filter(user => user.UserTestModel.id == request.data.id)[0],
        instanceCopy = $.extend(true, [], instance);

    for (var param in request.data) {
        if (instanceCopy[param] && instanceCopy[param] != request.data[param]) {
            instanceCopy[param] = request.data[param];
        }
    }
    return {
        'header': {
            'id': uuid(),
            'status': Response.STATUS_SUCCESS,
            'title': 'success',
            'message': '',
            'controller': 'Users',
            'action': 'view'
        },
        'body': instanceCopy
    };
});

// Fixture for UserTestModel findOne.
fixture({
    type: 'GET',
    url: '/testusersupdated/{id}'
}, function (request, response, headers, ajaxSettings) {
    var id = request.data.id;
    var instance = store.filter(user => user.UserTestModel.id == id)[0];
    var instanceCopy = $.extend(true, {}, instance);
    instanceCopy.UserTestModel.email = 'carol_updated_email@passbolt.com';
    return {
        'header': {
            'id': uuid(),
            'status': Response.STATUS_SUCCESS,
            'title': 'success',
            'message': '',
            'controller': 'Users',
            'action': 'view'
        },
        'body': instanceCopy
    };
});

// Fixture for UserTestModel findCustom.
fixture({
    type: 'GET',
    url: '/testusers/custom/0'
}, function (original, settings, headers) {
    var instance = mad.Model.searchOne(store, 'UserTestModel.username', 'carol@passbolt.com'),
        instanceCopy = $.extend(true, [], instance);
    instanceCopy.UserTestModel.email = 'carol_updated_email@passbolt.com';
    return {
        'header': {
            'id': uuid(),
            'status': mad.net.Response.STATUS_SUCCESS,
            'title': 'success',
            'message': '',
            'controller': 'Users',
            'action': 'view'
        },
        'body': instanceCopy
    };
});

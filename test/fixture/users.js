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
import Model from 'passbolt-mad/model/model';
import Response from 'passbolt-mad/net/response';
import uuid from 'uuid/v4';

var store = [
    {
        'UserTestModel': {
            'id': '50cdea9c-aa88-46cb-a09b-2f4fd7a10fce',
            'username': 'betty@passbolt.com',
            'email': 'betty@passbolt.com',
            'role_id': '0208f57a-c5cd-11e1-a0c5-080027796c4c',
            'active': 1
        }
    },
    {
        'UserTestModel': {
            'id': '50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce',
            'username': 'carol@passbolt.com',
            'email': 'carol@passbolt.com',
            'role_id': '0208f57a-c5cd-11e1-a0c5-080027796c4c',
            'active': 1
        }
    },
    {
        'UserTestModel': {
            'id': 'bbd56042-c5cd-11e1-a0c5-080027796c4e',
            'username': 'edith@passbolt.com',
            'email': 'edith@passbolt.com',
            'role_id': '0208f57a-c5cd-11e1-a0c5-080027796c4c',
            'active': 1
        }
    }
];

// Fixture for UserTestModel findAll.
fixture({
    type: 'GET',
    url: '/testusers'
}, function (request, response, headers, ajaxSettings) {
    return {
        'header': {
            'id': uuid(),
            'status': Response.STATUS_SUCCESS,
            'title': 'success',
            'message': '',
            'controller': 'Users',
            'action': 'index'
        },
        'body': store
    };
});

// Fixture for UserTestModel findAll with a change on Carol.
fixture({
    type: 'GET',
    url: '/testuserscarolupdated'
}, function (original, settings, headers) {
    var storeCopy = $.extend(true, [], store),
        instance = storeCopy.filter(user => user.UserTestModel.username == 'carol@passbolt.com')[0];
    instance.UserTestModel.email = 'carol_updated_email@passbolt.com';

    return {
        'header': {
            'id': uuid(),
            'status': Response.STATUS_SUCCESS,
            'title': 'success',
            'message': '',
            'controller': 'Users',
            'action': 'index'
        },
        'body': storeCopy
    };
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
        'header': {
            'id': uuid(),
            'status': mad.net.Response.STATUS_SUCCESS,
            'title': 'success',
            'message': '',
            'controller': 'Users',
            'action': 'add'
        },
        'body': data
    };
});

// Fixture for UserTestModel destroyed.
fixture({
    type: 'DELETE',
    url: '/testusers/{id}'
}, function (id, settings, headers) {
    // @todo We don't really maintain a local storage. So we do nothin.
    //       That means after a findAll the destroy item will appear again
    return {
        header: {
            id: uuid(),
            status: Response.STATUS_SUCCESS,
            title: 'success',
            message: '',
            controller: 'Users',
            action: 'delete'
        },
        body: {}
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

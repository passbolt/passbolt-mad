// Fixture for UserTestModel findAll.
can.fixture({
    type: 'GET',
    url: '/usertests'
}, function (original, settings, headers) {
    return {
        'header': {
            'id': uuid(),
            'status': mad.net.Response.STATUS_SUCCESS,
            'title': 'success',
            'message': '',
            'controller': 'Users',
            'action': 'index'
        },
        'body': [
            {
                'UserTestModel' : {
                    'id' : '533d37a0-bc80-4945-9b11-1663c0a895dc',
                    'username' : 'kevin@passbolt.com',
                    'email' : 'kevin@passbolt.com',
                    'active' : '1'
                }
            },
            {
                'UserTestModel' : {
                    'id' : '533d34a0-bc80-4945-9b11-1663c0a895dc',
                    'username' : 'cedric@passbolt.com',
                    'email' : 'cedric@passbolt.com',
                    'active' : '1'
                }
            }
        ]
    };
});

// Fixture for UserTestModel findOne.
can.fixture({
    type: 'GET',
    url: '/usertests/view/0'
}, function (original, settings, headers) {
    return {
        'header': {
            'id': uuid(),
            'status': mad.net.Response.STATUS_SUCCESS,
            'title': 'success',
            'message': '',
            'controller': 'Users',
            'action': 'view'
        },
        'body': [
            {
                'UserTestModel' : {
                    'id' : '533d37a0-bc80-4945-9b11-1663c0a895dc',
                    'username' : 'kevin@passbolt.com',
                    'email' : 'kevinchanged@passbolt.com',
                    'active' : '1'
                }
            }
        ]
    };
});
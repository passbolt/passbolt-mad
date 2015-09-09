import "mad/mad";

var UserTestModel = mad.Model.extend('mad.test.model.UserTestModel', {
    /**
     * Attributes.
     */
    attributes: {
        'id': 'string',
        'username': 'string',
        'email': 'string',
        'active': 'string',
        'Profile': 'mad.test.model.ProfileTestModel'
    },

    findAll: function (params, success, error) {
        return mad.net.Ajax.request({
            url: '/usertests',
            type: 'GET',
            params: params,
            success: success,
            error: error
        });
    },
    findOne: function (params, success, error) {
        return mad.net.Ajax.request({
            url: '/usertests/view/0',
            type: 'GET',
            params: params,
            success: success,
            error: error
        });
    }
}, {});

var ProfileTestModel = mad.Model.extend('mad.test.model.ProfileTestModel', {
    /**
     * Attributes.
     */
    attributes: {
        'id': 'string',
        'first_name': 'string',
        'last_name': 'string'
    }

}, {});

var TestModel2 = mad.Model.extend('mad.test.model.TestModel2', {
    attributes: {
        testModel2Attribute: 'string'
    }
}, {});

var TestModel1 = mad.Model.extend('mad.test.model.TestModel1', {
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
                'rule': ['between', 3, 8],
                'message': 'testModel1Attribute should be between %s and %s characters long'
            }
        },
        'TestModel2s': {
            'size': {
                'rule': ['between', 1, 2],
                'message': 'TestModel2s should be between %s and %s selected element'
            }
        }
    }
}, {});

var TestModel = mad.Model.extend('mad.test.model.TestModel', {
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
                'rule': ['between', 3, 8],
                'message': 'testModelAttribute should be between %s and %s characters long'
            }
        }
    }
}, {});

export default TestModel;

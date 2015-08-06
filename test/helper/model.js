import "mad/mad";

var TestModel2 = mad.Model.extend('mad.test.model.TestModel2', {
    attributes: {
        testModel2Attribute: 'string'
    }
}, {});
var TestModel1 = mad.Model.extend('mad.test.model.TestModel1', {
    attributes: {
        TestModel2: 'mad.test.model.TestModel2.model',
        testModel1Attribute: 'string'
    }
}, {});
var TestModel = mad.Model.extend('mad.test.model.TestModel', {
    attributes: {
        TestModel1: 'mad.test.model.TestModel1.model',
        TestModel1s: 'mad.test.model.TestModel1.models',
        testModelAttribute: 'string'
    }
}, {});

export default TestModel;

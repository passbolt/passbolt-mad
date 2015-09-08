import "test/bootstrap";
import "test/helper/model";

describe("mad.Model", function () {

    it("should inherit can.Model", function () {
        var model = new mad.Model();
        expect(model).to.be.instanceOf(can.Model);
    });

    it("isModelAttribute() check if an attribute is a model attribute", function () {
        var MyModel = mad.Model.extend('mad.test.model.MyModel', {
            attributes: {
                AssociatedModel: 'mad.AssociatedModel.model',
                AssociatedModels: 'mad.AssociatedModel.models',
                classicAttribute: 'string'
            }
        }, {});
        expect(MyModel.isModelAttribute('AssociatedModel')).to.be.true;
        expect(MyModel.isModelAttribute('AssociatedModels')).to.be.true;
        expect(MyModel.isModelAttribute('classicAttribute')).to.be.false;
        delete mad.test.model.MyModel;
    });

    it("isMultipleAttribute() check if an attribute is a model attribute with a multiple cardinality", function () {
        var MyModel = mad.Model.extend('mad.test.model.MyModel', {
            attributes: {
                AssociatedModel: 'mad.AssociatedModel.model',
                AssociatedModels: 'mad.AssociatedModel.models',
                classicAttribute: 'string'
            }
        }, {});
        expect(MyModel.isMultipleAttribute('AssociatedModel')).to.be.false;
        expect(MyModel.isMultipleAttribute('AssociatedModels')).to.be.true;
        expect(MyModel.isMultipleAttribute('classicAttribute')).to.be.false;
        delete mad.test.model.MyModel;
    });

    it("getModelAttributes() extracts the model attributes from a string", function () {
        var attributes = [],
            instance = null;

        // Check simple model attribute
        attributes = mad.Model.getModelAttributes('mad.test.model.TestModel.testModelAttribute');

        expect(attributes[0].isMultiple()).to.be.false;
        expect(attributes[0].getName()).to.be.equal('mad.test.model.TestModel');
        instance = new (attributes[0].getModelReference())();
        expect(instance).to.be.instanceof(mad.test.model.TestModel);

        expect(attributes[1].isMultiple()).to.be.false;
        expect(attributes[1].getName()).to.be.equal('testModelAttribute');
        expect(attributes[1].getModelReference()).to.be.undefined;

        // Check nested model attribute
        attributes = mad.Model.getModelAttributes('mad.test.model.TestModel.TestModel1.myModel1Attribute');

        expect(attributes[0].isMultiple()).to.be.false;
        expect(attributes[0].getName()).to.be.equal('mad.test.model.TestModel');
        instance = new (attributes[0].getModelReference())();
        expect(instance).to.be.instanceof(mad.test.model.TestModel);

        expect(attributes[1].isMultiple()).to.be.false;
        expect(attributes[1].getName()).to.be.equal('TestModel1');
        instance = new (attributes[1].getModelReference())();
        expect(instance).to.be.instanceof(mad.test.model.TestModel1);

        expect(attributes[2].isMultiple()).to.be.false;
        expect(attributes[2].getName()).to.be.equal('myModel1Attribute');
        expect(attributes[2].getModelReference()).to.be.undefined;

        // Check nested models attribute
        attributes = mad.Model.getModelAttributes('mad.test.model.TestModel.TestModel1s.myModel1Attribute');

        expect(attributes[0].isMultiple()).to.be.false;
        expect(attributes[0].getName()).to.be.equal('mad.test.model.TestModel');
        instance = new (attributes[0].getModelReference())();
        expect(instance).to.be.instanceof(mad.test.model.TestModel);

        expect(attributes[1].isMultiple()).to.be.true;
        expect(attributes[1].getName()).to.be.equal('TestModel1s');
        instance = new (attributes[1].getModelReference())();
        expect(instance).to.be.instanceof(mad.test.model.TestModel1);

        expect(attributes[2].isMultiple()).to.be.false;
        expect(attributes[2].getName()).to.be.equal('myModel1Attribute');
        expect(attributes[2].getModelReference()).to.be.undefined;

        // Check multiple nested models attribute
        attributes = mad.Model.getModelAttributes('mad.test.model.TestModel.TestModel1.TestModel2.myModel2Attribute');

        expect(attributes[0].isMultiple()).to.be.false;
        expect(attributes[0].getName()).to.be.equal('mad.test.model.TestModel');
        instance = new (attributes[0].getModelReference())();
        expect(instance).to.be.instanceof(mad.test.model.TestModel);

        expect(attributes[1].isMultiple()).to.be.false;
        expect(attributes[1].getName()).to.be.equal('TestModel1');
        instance = new (attributes[1].getModelReference())();
        expect(instance).to.be.instanceof(mad.test.model.TestModel1);

        expect(attributes[2].isMultiple()).to.be.false;
        expect(attributes[2].getName()).to.be.equal('TestModel2');
        instance = new (attributes[2].getModelReference())();
        expect(instance).to.be.instanceof(mad.test.model.TestModel2);

        expect(attributes[3].isMultiple()).to.be.false;
        expect(attributes[3].getName()).to.be.equal('myModel2Attribute');
        expect(attributes[3].getModelReference()).to.be.undefined;
    });

    it("getModelAttributeValue() extracts the model attributes value of an instance from a string path", function () {
        var instance = new mad.test.model.TestModel({
            testModelAttribute: 'testModelAttributeValue',
            TestModel1: new mad.test.model.TestModel1({
                myModel1Attribute: 'myModel1AttributeValue'
            }),
            TestModel1s: new mad.test.model.TestModel1.List([{
                myModel1Attribute: 'myModel1sAttributeValue1'
            }, {
                myModel1Attribute: 'myModel1sAttributeValue2'
            }])
        }),
            value = null;

        // Test a simple value in a simple object.
        value = mad.Model.getModelAttributeValue('mad.test.model.TestModel.testModelAttribute', instance);
        expect(value).to.be.equal('testModelAttributeValue');

        // Test a simple value in a nested object.
        value = mad.Model.getModelAttributeValue('mad.test.model.TestModel.TestModel1.myModel1Attribute', instance);
        expect(value).to.be.equal('myModel1AttributeValue');

        // Test a multiple value in a nested object.
        value = mad.Model.getModelAttributeValue('mad.test.model.TestModel.TestModel1s.myModel1Attribute', instance);
        var expectedArray = ['myModel1sAttributeValue1', 'myModel1sAttributeValue2'];
        expect(_.difference(value, expectedArray)).to.be.empty;
    });

    it("validateAttribute() should validate an attribute regarding the defined validation rules", function () {
        var instance = new mad.test.model.TestModel({
            testModelAttribute: 'testModelAttributeValue',
            TestModel1: new mad.test.model.TestModel1({
                myModel1Attribute: 'myModel1AttributeValue'
            }),
            TestModel1s: new mad.test.model.TestModel1.List([{
                myModel1Attribute: 'myModel1sAttributeValue1'
            }, {
                myModel1Attribute: 'myModel1sAttributeValue2'
            }])
        }),
            value = null,
            isValid = null,
            testModelValidationRules = mad.test.model.TestModel.validationRules;

        //// The attribute can be empty.
        value = '';
        isValid = mad.test.model.TestModel.validateAttribute('testModelAttribute', value);
        expect(isValid).to.be.true;

        // The attribute accept ASCII character.
        value = 'ABCDE';
        isValid = mad.test.model.TestModel.validateAttribute('testModelAttribute', value);
        expect(isValid).to.be.true;

        // The textbox doesn't accept special character.
        value = 'ABCDE&';
        isValid = mad.test.model.TestModel.validateAttribute('testModelAttribute', value);
        expect(isValid).to.be.not.equal(true);
        expect(isValid).to.contain(testModelValidationRules.testModelAttribute.alphaNumeric.message);

        // The textbox value length cannot be smaller than 3.
        value = 'AB';
        isValid = mad.test.model.TestModel.validateAttribute('testModelAttribute', value);
        expect(isValid).to.be.not.equal(true);
        expect(isValid).to.contain(testModelValidationRules.testModelAttribute.size.message);

        // The textbox value length cannot be smaller than 3.
        value = 'ABCDEFGHI';
        isValid = mad.test.model.TestModel.validateAttribute('testModelAttribute', value);
        expect(isValid).to.be.not.equal(true);
        expect(isValid).to.contain(testModelValidationRules.testModelAttribute.size.message);
    });

});

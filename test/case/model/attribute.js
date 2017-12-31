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
import "passbolt-mad/test/bootstrap";
import "passbolt-mad/test/helper/model";
import "passbolt-mad/test/fixture/users";

describe("mad.model.Attribute", function () {

    it("should inherit mad.model.Attribute", function () {
        var attribute = new mad.model.Attribute();
        expect(attribute).to.be.instanceOf(mad.model.Attribute);
        expect(attribute).to.be.instanceOf(mad.Model);
    });

    it("getModelAttributes() extracts the model attributes from a string", function () {
        var attributes = [],
            instance = null;

        // Check simple model attribute
        attributes = mad.model.Attribute.getModelAttributes('mad.test.model.TestModel.testModelAttribute');

        expect(attributes[0].isMultiple()).to.be.false;
        expect(attributes[0].getName()).to.be.equal('mad.test.model.TestModel');
        instance = new (attributes[0].getModelReference())();
        expect(instance).to.be.instanceof(mad.test.model.TestModel);

        expect(attributes[1].isMultiple()).to.be.false;
        expect(attributes[1].getName()).to.be.equal('testModelAttribute');
        expect(attributes[1].getModelReference()).to.be.undefined;

        // Check nested model attribute
        attributes = mad.model.Attribute.getModelAttributes('mad.test.model.TestModel.TestModel1.myModel1Attribute');

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
        attributes = mad.model.Attribute.getModelAttributes('mad.test.model.TestModel.TestModel1s.myModel1Attribute');

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
        attributes = mad.model.Attribute.getModelAttributes('mad.test.model.TestModel.TestModel1.TestModel2.myModel2Attribute');

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
        value = mad.model.Attribute.getModelAttributeValue('mad.test.model.TestModel.testModelAttribute', instance);
        expect(value).to.be.equal('testModelAttributeValue');

        // Test a simple value in a nested object.
        value = mad.model.Attribute.getModelAttributeValue('mad.test.model.TestModel.TestModel1.myModel1Attribute', instance);
        expect(value).to.be.equal('myModel1AttributeValue');

        // Test a multiple value in a nested object.
        value = mad.model.Attribute.getModelAttributeValue('mad.test.model.TestModel.TestModel1s.myModel1Attribute', instance);
        var expectedArray = ['myModel1sAttributeValue1', 'myModel1sAttributeValue2'];
        expect(value.sort()).to.be.deep.equal(expectedArray.sort());
    });

});

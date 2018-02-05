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
import "passbolt-mad/test/fixture/users";
import CanList from 'can-list';
import CanModel from 'can-connect/can/model/';
import List from 'passbolt-mad/model/list';
import Model from 'passbolt-mad/model/model';
import TestModel from 'passbolt-mad/test/model/testModel';
import TestModel1 from 'passbolt-mad/test/model/testModel1';
import TestModel2 from 'passbolt-mad/test/model/testModel2';
import UserTestModel from 'passbolt-mad/test/model/user';

describe("mad.Model", function () {

    it("should inherit can.Model", function () {
        var model = new Model();
        expect(model).to.be.instanceOf(CanModel);
    });

    it("isModelAttribute() check if an attribute is a model attribute", function () {
        var MyModel = Model.extend('mad.test.model.MyModel', {
            attributes: {
                AssociatedModel: 'mad.AssociatedModel.model',
                AssociatedModels: 'mad.AssociatedModel.models',
                classicAttribute: 'string'
            }
        }, {});
        expect(MyModel.isModelAttribute('AssociatedModel')).to.be.true;
        expect(MyModel.isModelAttribute('AssociatedModels')).to.be.true;
        expect(MyModel.isModelAttribute('classicAttribute')).to.be.false;
    });

    it("isMultipleAttribute() check if an attribute is a model attribute with a multiple cardinality", function () {
        var MyModel = Model.extend('mad.test.model.MyModel', {
            attributes: {
                AssociatedModel: 'mad.AssociatedModel.model',
                AssociatedModels: 'mad.AssociatedModel.models',
                classicAttribute: 'string'
            }
        }, {});
        expect(MyModel.isMultipleAttribute('AssociatedModel')).to.be.false;
        expect(MyModel.isMultipleAttribute('AssociatedModels')).to.be.true;
        expect(MyModel.isMultipleAttribute('classicAttribute')).to.be.false;
    });

    it("validateAttribute() should validate an attribute regarding the defined validation rules", function () {
        var instance = new TestModel({
            testModelAttribute: 'testModelAttributeValue',
            TestModel1: new TestModel1({
                myModel1Attribute: 'myModel1AttributeValue'
            }),
            TestModel1s: new TestModel1.List([{
                myModel1Attribute: 'myModel1sAttributeValue1'
            }, {
                myModel1Attribute: 'myModel1sAttributeValue2'
            }])
        }),
            value = null,
            isValid = null,
            testModelValidationRules = TestModel.validationRules;

        //// The attribute can be empty.
        value = '';
        isValid = TestModel.validateAttribute('testModelAttribute', value);
        expect(isValid).to.be.empty;

        // The attribute accept ASCII character.
        value = 'ABCDE';
        isValid = TestModel.validateAttribute('testModelAttribute', value);
        expect(isValid).to.be.empty;

        // The textbox doesn't accept special character.
        value = 'ABCDE&';
        isValid = TestModel.validateAttribute('testModelAttribute', value);
		expect(isValid).to.not.be.eql([]);
        expect(isValid[0]).to.contain(testModelValidationRules.testModelAttribute.alphaNumeric.message);

        // The textbox value length cannot be smaller than 3.
        value = 'AB';
        isValid = TestModel.validateAttribute('testModelAttribute', value);
		expect(isValid).to.not.be.eql([]);

        // The textbox value length cannot be smaller than 3.
        value = 'ABCDEFGHI';
        isValid = TestModel.validateAttribute('testModelAttribute', value);
        expect(isValid).to.not.be.eql([]);
    });

    it("model's instances should be updated when findAll retrieves updated instances", function(done) {
        // It'll be used to store the list of users.
        var list = new CanList(),
            updatedEventCount = 0,
            updatedTarget = null;

        // Listen to changes on the list.
        list.bind('change', function(change) {
            updatedEventCount ++;
            updatedTarget = change.target;
        });

        UserTestModel.findAll().then(function(data) {
            // Store the retrieved instances in a list.
            list.push.apply(list, data);

            // A change on the list should have been caught.
            expect(updatedEventCount).to.be.equal(1);
            expect(updatedTarget.length).to.be.equal(3);

            // Check that all elements have been retrieved.
            var expectedItemsId = [
                '50cdea9c-aa88-46cb-a09b-2f4fd7a10fce',
                '50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce',
                'bbd56042-c5cd-11e1-a0c5-080027796c4e'
            ];
            expectedItemsId.forEach(function(expectItemId){
                expect(list.filter((item) => item.id == expectItemId)).to.be.not.empty;
            });

            // Check that all elements are well instances of mad.test.model.UserTestModel
            list.each(function(el){
                expect(el).to.be.instanceOf(UserTestModel);
            });

            // Check that the findAll update well the instances which are already in use by others.
            var updatedInstanceId = '50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce';
            UserTestModel.findAllUpdated()
            .then(function(data) {
                // A change on the list should have been caught.
                expect(updatedEventCount).to.be.equal(2);
                expect(updatedTarget.id).to.be.equal(updatedInstanceId);

                // The instance in the original list should be updated.
                var instance = list.filter((item) => item.id == updatedInstanceId)[0],
                    // The instance in the server response list should be updated.
                    serverInstance = data.filter((item) => item.id == updatedInstanceId)[0];

                expect(serverInstance.email).to.be.equal('carol_updated_email@passbolt.com');
                expect(instance.email).to.be.equal('carol_updated_email@passbolt.com');

                done();
            });
        }).then(null, function(data) {
            expect(false).to.be.true;
        });
    });

    it("model's instances should be updated when findOne retrieves updated instances", function(done) {
        // It'll be used to store the list of users.
        var list = new CanList(),
            updatedEventCount = 0,
            updatedTarget = null;

        // Listen to changes on the list.
        list.bind('change', function(change) {
            updatedEventCount ++;
            updatedTarget = change.target;
        });

        UserTestModel.findAll()
        .then(function(data) {
            // Store the retrieved instances in a list.
            //list = list.concat(data);
            list.push.apply(list, data);

            // A change on the list should have been caught.
            expect(updatedEventCount).to.be.equal(1);
            expect(updatedTarget.length).to.be.equal(3);

            // Check that all elements have been retrieved.
            var expectedItemsId = [
                '50cdea9c-aa88-46cb-a09b-2f4fd7a10fce',
                '50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce',
                'bbd56042-c5cd-11e1-a0c5-080027796c4e'
            ];
            expectedItemsId.forEach(function(expectItemId){
                expect(list.filter((item) => item.id == expectItemId)).to.be.not.empty;
            });

            // Check that all elements are well instances of mad.test.model.UserTestModel
            list.each(function(el){
                expect(el).to.be.instanceOf(UserTestModel);
            });

            // Check that the findAll update well the instances which are already in use by others.
            var updatedInstanceId = '50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce';
            UserTestModel.findOneUpdated(updatedInstanceId)
            .then(function(data) {
                // A change on the list should have been caught.
                expect(updatedEventCount).to.be.equal(2);
                expect(updatedTarget.id).to.be.equal(updatedInstanceId);

                // The instance in the original list should be updated.
                var instance = list.filter((item) => item.id == updatedInstanceId)[0];

                // Check that the instance of carol returned by the server has an updated email.
                expect(data.email).to.be.equal('carol_updated_email@passbolt.com');
                // Check that the instance of carol stored in the list has well been updated.
                expect(instance.email).to.be.equal('carol_updated_email@passbolt.com');

                done();
            });

        }).then(null, function(data) {
            expect(false).to.be.true;
        });
    });

    it("model's instances should be updated when an instance is updated.", function(done) {
        // It'll be used to store the list of users.
        var list = new CanList(),
            updatedEventCount = 0,
            updatedTarget = null;

        // Listen to changes on the list.
        list.bind('change', function(change) {
            updatedEventCount ++;
            updatedTarget = change.target;
        });

        UserTestModel.findAll().then(function(data) {
            // Store the retrieved instances in a list.
            list.push.apply(list, data);

            // A change on the list should have been caught.
            expect(updatedEventCount).to.be.equal(1);
            expect(updatedTarget.length).to.be.equal(3);

            // Check that all elements have been retrieved.
            var expectedItemsId = [
                '50cdea9c-aa88-46cb-a09b-2f4fd7a10fce',
                '50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce',
                'bbd56042-c5cd-11e1-a0c5-080027796c4e'
            ];
            expectedItemsId.forEach(function(expectItemId){
                expect(list.filter((item) => item.id == expectItemId)).to.be.not.empty;
            });

            // Check that all elements are well instances of mad.test.model.UserTestModel
            list.each(function(el){
                expect(el).to.be.instanceOf(UserTestModel);
            });

            // Retrieve the carol instance.
            var updatedInstanceId = '50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce';
            var instance = list.filter((item) => item.id == updatedInstanceId)[0];

            // Update the email attribute, and check that the event is bound.
            // Canjs triggers an event when an attribute of an instance is changed.
            instance.attr('email', 'carol_updated_email_from_update_func@passbolt.com');

            expect(updatedEventCount).to.be.equal(2);
            expect(updatedTarget.id).to.be.equal(updatedInstanceId);

            instance.save()
            .then(function(data) {
                // A change on the list should not be caught, the change is been catched once when
                // the property has been updated.
                expect(updatedEventCount).to.be.equal(2);
                expect(updatedTarget.id).to.be.equal('50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce');
                done();
            });
        }).then(null, function(data) {
            expect(false).to.be.true;
        });
    });

    it("model's instances should be updated when an instance is deleted.", function(done) {
        // It'll be used to store the list of users.
        var list = new UserTestModel.List(),
            updatedEventCount = 0,
            deletedInstance = null;

        // Listen to changes on the list.
        list.bind('change', function(event, attr, how, newVal, oldVal) {
            updatedEventCount ++;
            if (how == 'remove') {
                deletedInstance = oldVal[0];
            }
        });

        UserTestModel.findAll()
        .then(function(data) {
            // Store the retrieved instances in a list.
            list.push.apply(list, data);

            // Retrieve the carol instance.
            var instanceId = '50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce';
            var instance = list.filter((item) => item.id == instanceId)[0];

            // Delete the target instance
            // Canjs triggers an event when an attribute of an instance is changed.
            instance.destroy()
                .then(function() {
                    expect(updatedEventCount).to.be.equal(2);
                    expect(deletedInstance.id).to.be.equal(instanceId);
                    var searchInstance = list.filter((item) => item.id == instanceId)[0];
                    expect(searchInstance).to.be.undefined;
                    done();
                });
        }).then(null, function(data) {
            expect(false).to.be.true;
        });
    });
});

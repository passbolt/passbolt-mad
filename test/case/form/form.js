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
import CanControl from "can-control";
import CheckboxFormElement from 'passbolt-mad/form/element/checkbox';
import Component from "passbolt-mad/component/component";
import FeedbackFormElement from 'passbolt-mad/form/feedback';
import Form from "passbolt-mad/form/form"
import Model from 'passbolt-mad/model/model';
import TestModel from 'passbolt-mad/test/model/testModel';
import TestModel1 from 'passbolt-mad/test/model/testModel1';
import TestModel2 from 'passbolt-mad/test/model/testModel2';
import TextboxFormElement from 'passbolt-mad/form/element/textbox';
import Tree from "passbolt-mad/component/tree";
import TreeComponent from 'passbolt-mad/component/tree';

describe("mad.Form", function () {
    // The HTMLElement which will carry the form component.
    var $form = null;

    // Insert a <form> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $form = $('<form id="form"></form>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit Form & the inherited parent classes", function () {
        var form = new Form('#form', {});

        // Basic control of classes inheritance.
        expect(form).to.be.instanceOf(CanControl);
        expect(form).to.be.instanceOf(Component);
        expect(form).to.be.instanceOf(Form);

        form.destroy();
    });

    it("addElement() should not associate not form element to the form", function () {
        var form = new Form('#form', {});
        form.start();

        // Try to add a tree to the form.
        $form.append('<ul id="tree"></ul>');
        var tree = new TreeComponent('#tree', {
            itemClass: Model
        });
        expect(function () {
            form.addElement(tree.start());
        }).to.throw(Error);

        form.destroy();
    });

    it("addElement() should associate form elements to the form", function () {
        var form = new Form('#form', {});
        form.start();

        // Add a textbox to the form.
        var $textbox = $('<input id="textbox"/>').appendTo($form),
            textbox = new TextboxFormElement('#textbox', {});

        expect(function () {
            form.addElement(textbox.start());
        }).not.to.throw(Error);

        // Add a second textbox to the form.
        // This textbox is associated to a model reference.
        $('<input id="textbox-wth-model-ref"/>').appendTo($form);
        var textboxWthModelRef = new TextboxFormElement('#textbox-wth-model-ref', {
                modelReference: 'mad.test.model.TestModel.testModelAttribute'
            });

        expect(function () {
            form.addElement(textboxWthModelRef.start());
        }).not.to.throw(Error);
    });

    it("getElement() should return a form element based on its id", function () {
        var form = new Form('#form', {});
        form.start();

        // Add a textbox to the form.
        var $textbox = $('<input id="textbox"/>').appendTo('#form');
        var textbox = new TextboxFormElement('#textbox', {
            modelReference: 'mad.test.model.TestModel.testModelAttribute'
        });

        // Check that the element is not already added to the form.
        expect(form.getElement(textbox.getId())).to.be.undefined;

        // Add the element to the form and check that we can retrieve it in the form.
        form.addElement(textbox.start());
        var gotTextbox = form.getElement(textbox.getId());
        expect(gotTextbox).not.to.be.undefined;
        expect(Object.is(textbox, gotTextbox)).to.be.true;
    });

    it("removeElement() should remove an element from the form", function () {
        var form = new Form('#form', {});
        form.start();

        // Add a textbox to the form.
        var $textbox = $('<input id="textbox"/>').appendTo($form);
        var textbox = new TextboxFormElement('#textbox', {
            modelReference: 'mad.test.model.TestModel.testModelAttribute'
        });

        // Add & remove the element from the form, check that the element is not associated to the form.
        form.addElement(textbox.start());
        form.removeElement(textbox);
        var gotTextbox = form.getElement(textbox.getId());
        expect(gotTextbox).to.be.undefined;
    });

    it("getData() should return the data the form elements gathered", function (done) {
        var form = new Form('#form', {});
        form.start();

        // Add a textbox to the form.
        var $textbox = $('<input id="textbox"/>').appendTo($form);
        var textbox = new TextboxFormElement('#textbox', {
            modelReference: 'mad.test.model.TestModel.testModelAttribute'
        });
        form.addElement(textbox.start());

        // By default, if no data have been inserted.
        setTimeout(function () {
            // Get the data.
            var data = form.getData();
            expect(textbox.getValue()).to.be.null;
            expect(data['mad.test.model.TestModel'].testModelAttribute).to.be.null;
        }, 0);

        // Insert a value in the textbox.
        $textbox.val('abc');
        $textbox.focus().trigger('input');

        // After all event handlers have done their treatment.
        setTimeout(function () {
            // Get the data.
            var data = form.getData();
            expect(textbox.getValue()).to.be.equal('abc');
            expect(data['mad.test.model.TestModel'].testModelAttribute).to.be.equal('abc');
            done();
        }, 0);
    });

    it("getData() should return the data the form elements gathered for a complex nested model representation", function (done) {
        var form = new Form('#form', {});
        form.start();

        // Add a textbox to the form.
        var $textbox = $('<input id="textbox"/>').appendTo($form);
        var textbox = new TextboxFormElement('#textbox', {
            modelReference: 'mad.test.model.TestModel.testModelAttribute'
        });
        form.addElement(textbox.start());

        // Add a second textbox to the form.
        var $textbox2 = $('<input id="textbox2"/>').appendTo($form);
        var textbox2 = new TextboxFormElement('#textbox2', {
            modelReference: 'mad.test.model.TestModel.TestModel1.testModel1Attribute'
        });
        form.addElement(textbox2.start());

        // By default, if no data have been inserted.
        setTimeout(function () {
            // Get the data.
            var data = form.getData();
            expect(textbox.getValue()).to.be.null;
            expect(textbox2.getValue()).to.be.null;
            expect(data['mad.test.model.TestModel'].testModelAttribute).to.be.null;
            expect(data['mad.test.model.TestModel'].TestModel1.testModel1Attribute).to.be.null;

            // Simuate keypress on the textboxes.
            $textbox.val('abc').trigger('input');
            $textbox2.val('xyz').trigger('input');

            // After all event handlers have done their treatment.
            setTimeout(function () {
                // Get the data.
                var data = form.getData();
                expect(textbox.getValue()).to.be.equal('abc');
                expect(textbox2.getValue()).to.be.equal('xyz');
                expect(data['mad.test.model.TestModel'].testModelAttribute).to.be.equal('abc');
                expect(data['mad.test.model.TestModel'].TestModel1.testModel1Attribute).to.be.equal('xyz');
                done();
            }, 0);
        }, 0);
    });

    it("getData() should return the data the form elements gathered for a complex nested multiple model representation", function (done) {
        var form = new Form('#form', {});
        form.start();

        // Add a textbox to the form.
        var $textbox = $('<input id="textbox" type="text"/>').appendTo($form);
        var textbox = new TextboxFormElement('#textbox', {
            modelReference: 'mad.test.model.TestModel.testModelAttribute'
        });
        form.addElement(textbox.start());

        // Add a checkbox to the form.
        var $checkbox = $('<div id="checkbox"></div>').appendTo($form);
        var checkbox = new CheckboxFormElement('#checkbox', {
            availableValues: {
                'option_1': 'Option 1',
                'option_2': 'Option 2',
                'option_3': 'Option 3'
            },
            modelReference: 'mad.test.model.TestModel.TestModel1s.testModel1Attribute'
        });
        form.addElement(checkbox.start());

        // By default, if no data have been inserted.
        setTimeout(function () {
            // Get the data.
            var data = form.getData();

            expect(textbox.getValue()).to.be.null;
            expect(checkbox.getValue()).to.be.null;
            expect(data['mad.test.model.TestModel'].testModelAttribute).to.be.null;
            expect(data['mad.test.model.TestModel'].TestModel1s).to.be.empty;

            // Simulate inputs.
            $textbox.val('abc').trigger('input');
            $('input[value=option_1]', $checkbox).click();
            $('input[value=option_2]', $checkbox).click();

            // After all event handlers have done their treatment.
            setTimeout(function () {
                // Get the data.
                var data = form.getData();
                expect(textbox.getValue()).to.be.equal('abc');
                expect(checkbox.getValue()).to.be.eql(['option_1', 'option_2']);
                expect(data['mad.test.model.TestModel'].testModelAttribute).to.be.equal('abc');
                expect(data['mad.test.model.TestModel'].TestModel1s).to.be.eql([{testModel1Attribute: 'option_1'}, {testModel1Attribute: 'option_2'}]);
                done();
            }, 0);
        }, 0);
    });

    it("load() should load the form with an instance of Model object", function () {
        var form = new Form('#form', {});
        form.start();

        // Add a textbox to the form.
        var $textbox = $('<input id="textbox" type="text"/>').appendTo($form);
        var textbox = new TextboxFormElement('#textbox', {
            modelReference: 'mad.test.model.TestModel.testModelAttribute'
        });
        form.addElement(textbox.start());

        // Add a checkbox to the form.
        var $checkbox = $('<div id="checkbox"></div>').appendTo($form);
        var checkbox = new CheckboxFormElement('#checkbox', {
            availableValues: {
                'option_1': 'Option 1',
                'option_2': 'Option 2',
                'option_3': 'Option 3'
            },
            modelReference: 'mad.test.model.TestModel.TestModel1s.testModel1Attribute'
        });
        form.addElement(checkbox.start());

        var testInstance = new TestModel({
            testModelAttribute: 'test model attribute value',
            TestModel1s: new TestModel1.List([{
                testModel1Attribute: 'option_1'
            }, {
                testModel1Attribute: 'option_2'
            }])
        });
        form.load(testInstance);

        var data = form.getData();
        expect(textbox.getValue()).to.be.equal('test model attribute value');
        expect(checkbox.getValue()).to.be.eql(['option_1', 'option_2']);
        expect(data['mad.test.model.TestModel'].testModelAttribute).to.be.not.null;
        expect(data['mad.test.model.TestModel'].TestModel1s).to.be.eql([{testModel1Attribute: 'option_1'}, {testModel1Attribute: 'option_2'}]);
    });

    it("validateElement() should validate an element", function() {
        var testModelValidationRules = TestModel.validationRules;
        var form = new Form('#form', {});
        form.start();

        // Add a textbox to the form.
        var $textbox = $('<input id="textbox" type="text"/>').appendTo($form);
        var textbox = new TextboxFormElement('#textbox', {
            modelReference: 'mad.test.model.TestModel.testModelAttribute'
        });
        var $feedbackTxtBox = $('<span id="feedback_txtbox" for="textbox" />').appendTo($form);
        var feedbackTxtBox = new FeedbackFormElement('#feedback_txtbox', {});
        form.addElement(textbox.start(), feedbackTxtBox.start());

        // Add a checkbox to the form.
        var $checkbox = $('<div id="checkbox"></div>').appendTo($form);
        var checkbox = new CheckboxFormElement('#checkbox', {
            availableValues: {
                'option_1': 'Option 1',
                'option_2': 'Option 2',
                'option_3': 'Option 3'
            },
            modelReference: 'mad.test.model.TestModel.TestModel1s.testModel1Attribute'
        });
        form.addElement(checkbox.start());

        // The textbox can be empty.
        expect(form.validateElement(textbox)).to.be.true;
        // The checkbox can also be empty (@todo for now it is impossible to test the cardinality of a multiple model reference)
        expect(form.validateElement(checkbox)).to.be.true;

        // The textbox accept ASCII character
        textbox.setValue('ABCDE');
        expect(form.validateElement(textbox)).to.be.true;

        // The textbox doesn't accept special character.
        textbox.setValue('ABCDE&');
        expect(form.validateElement(textbox)).to.be.not.equal(true);
        expect($feedbackTxtBox.html()).to.contain(testModelValidationRules.testModelAttribute.alphaNumeric.message);

        // The textbox value length cannot be smaller than 3.
        textbox.setValue('AB');
        expect(form.validateElement(textbox)).to.be.not.equal(true);

        // The textbox value length cannot be smaller than 8.
        textbox.setValue('ABCDEFGHI');
        expect(form.validateElement(textbox)).to.be.not.equal(true);
    });

});

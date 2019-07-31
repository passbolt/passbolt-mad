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
import $ from 'jquery';
import "passbolt-mad/test/bootstrap";
import CanControl from "can-control";
import CheckboxFormElement from 'passbolt-mad/form/element/checkbox';
import Component from "passbolt-mad/component/component";
import domEvents from 'can-dom-events';
import FeedbackFormElement from 'passbolt-mad/form/feedback';
import Form from "passbolt-mad/form/form";
import Role from 'passbolt-mad/test/model/map/role';
import TextboxFormElement from 'passbolt-mad/form/element/textbox';
import Tree from "passbolt-mad/component/tree";
import TreeComponent from 'passbolt-mad/component/tree';
import User from 'passbolt-mad/test/model/map/user';

let $form = null;

describe("Form", () => {
  beforeEach(() => {
    $form = $('<form id="form"></form>').appendTo($('#test-html'));
  });

  afterEach(() => {
    $('#test-html').empty();
  });

  it("constructed instance should inherit Form & the inherited parent classes", () => {
    const form = new Form('#form', {});

    // Basic control of classes inheritance.
    expect(form).to.be.instanceOf(CanControl);
    expect(form).to.be.instanceOf(Component);
    expect(form).to.be.instanceOf(Form);

    form.destroy();
  });

  it("addElement() should associate form elements to the form", () => {
    const form = new Form('#form', {});
    form.start();

    // Add a textbox to the form.
    let $textbox = $('<input id="textbox"/>').appendTo($form),
      textbox = new TextboxFormElement('#textbox', {});

    expect(() => {
      form.addElement(textbox.start());
    }).not.to.throw(Error);

    /*
     * Add a second textbox to the form.
     * This textbox is associated to a model reference.
     */
    $('<input id="textbox-wth-model-ref"/>').appendTo($form);
    const textboxWthModelRef = new TextboxFormElement('#textbox-wth-model-ref', {
      modelReference: 'User.username'
    });

    expect(() => {
      form.addElement(textboxWthModelRef.start());
    }).not.to.throw(Error);
  });

  it("getElement() should return a form element based on its id", () => {
    const form = new Form('#form', {});
    form.start();

    // Add a textbox to the form.
    const $textbox = $('<input id="textbox"/>').appendTo('#form');
    const textbox = new TextboxFormElement('#textbox');

    // Check that the element is not already added to the form.
    expect(form.getElement(textbox.getId())).to.be.undefined;

    // Add the element to the form and check that we can retrieve it in the form.
    form.addElement(textbox.start());
    const gotTextbox = form.getElement(textbox.getId());
    expect(gotTextbox).not.to.be.undefined;
    expect(Object.is(textbox, gotTextbox)).to.be.true;
  });

  it("removeElement() should remove an element from the form", () => {
    const form = new Form('#form', {});
    form.start();

    // Add a textbox to the form.
    const $textbox = $('<input id="textbox"/>').appendTo($form);
    const textbox = new TextboxFormElement('#textbox');

    // Add & remove the element from the form, check that the element is not associated to the form.
    form.addElement(textbox.start());
    form.removeElement(textbox);
    const gotTextbox = form.getElement(textbox.getId());
    expect(gotTextbox).to.be.undefined;
  });

  it("getData() should return the data the form elements gathered", done => {
    const form = new Form('#form', {});
    form.start();

    // Add a textbox to the form.
    const $textbox = $('<input id="textbox"/>').appendTo($form);
    const textbox = new TextboxFormElement('#textbox', {
      modelReference: 'User.username'
    });
    form.addElement(textbox.start());

    // By default, if no data have been inserted.
    const data = form.getData();
    expect(textbox.getValue()).to.be.null;
    expect(data.User).to.be.undefined;

    // Insert a value in the textbox.
    $textbox.val('abc');
    domEvents.dispatch($textbox[0], 'input');

    /*
     * Check the value is as expected
     * Wrap it in setTimeout to ensure the events process are all completely treated.
     */
    setTimeout(() => {
      const data = form.getData();
      expect(textbox.getValue()).to.be.equal('abc');
      expect(data.User.username).to.be.equal('abc');
      done();
    });
  });

  it("getData() should return the data the form elements gathered for a complex nested model representation", done => {
    const form = new Form('#form', {});
    form.start();

    // Add a textbox to the form.
    const $textbox = $('<input id="textbox"/>').appendTo($form);
    const textbox = new TextboxFormElement('#textbox', {
      modelReference: 'User.username'
    });
    form.addElement(textbox.start());

    // Add a second textbox to the form.
    const $textbox2 = $('<input id="textbox2"/>').appendTo($form);
    const textbox2 = new TextboxFormElement('#textbox2', {
      modelReference: 'User.profile.first_name'
    });
    form.addElement(textbox2.start());

    // By default, if no data have been inserted.
    setTimeout(() => {
      // Get the data.
      const data = form.getData();
      expect(textbox.getValue()).to.be.null;
      expect(textbox2.getValue()).to.be.null;
      expect(data.User).to.be.undefined;

      // Simuate keypress on the textboxes.
      $textbox.val('abc');
      domEvents.dispatch($textbox[0], 'input');
      $textbox2.val('xyz');
      domEvents.dispatch($textbox2[0], 'input');

      // After all event handlers have done their treatment.
      setTimeout(() => {
        // Get the data.
        const data = form.getData();
        expect(textbox.getValue()).to.be.equal('abc');
        expect(textbox2.getValue()).to.be.equal('xyz');
        expect(data.User.username).to.be.equal('abc');
        expect(data.User.profile.first_name).to.be.equal('xyz');
        done();
      }, 0);
    }, 0);
  });

  it("getData() should return the data the form elements gathered for a complex nested multiple model representation", done => {
    const form = new Form('#form', {});
    form.start();

    // Add a textbox to the form.
    const $textbox = $('<input id="textbox" type="text"/>').appendTo($form);
    const textbox = new TextboxFormElement('#textbox', {
      modelReference: 'User.username'
    });
    form.addElement(textbox.start());

    // Add a checkbox to the form.
    const $checkbox = $('<div id="checkbox"></div>').appendTo($form);
    const checkbox = new CheckboxFormElement('#checkbox', {
      availableValues: {
        'option_1': 'Option 1',
        'option_2': 'Option 2',
        'option_3': 'Option 3'
      },
      modelReference: 'User.role[].name'
    });
    form.addElement(checkbox.start());

    // By default, if no data have been inserted.
    setTimeout(() => {
      // Get the data.
      const data = form.getData();

      expect(textbox.getValue()).to.be.null;
      expect(checkbox.getValue()).to.be.null;
      expect(data.User).to.be.undefined;

      // Simulate inputs.
      $textbox.val('abc');
      domEvents.dispatch($textbox[0], 'input');
      $('input[value=option_1]', $checkbox).click();
      $('input[value=option_2]', $checkbox).click();

      // After all event handlers have done their treatment.
      setTimeout(() => {
        // Get the data.
        const data = form.getData();

        expect(textbox.getValue()).to.be.equal('abc');
        expect(checkbox.getValue()).to.be.eql(['option_1', 'option_2']);
        expect(data.User.username).to.be.equal('abc');
        expect(data.User.role).to.be.eql([{name: 'option_1'}, {name: 'option_2'}]);
        done();
      }, 0);
    }, 0);
  });

  it("load() should load the form with an instance of Model object", () => {
    const form = new Form('#form', {});
    form.start();

    // Add a textbox to the form.
    const $textbox = $('<input id="textbox" type="text"/>').appendTo($form);
    const textbox = new TextboxFormElement('#textbox', {
      modelReference: 'User.username'
    });
    form.addElement(textbox.start());

    // Add a checkbox to the form.
    const $checkbox = $('<div id="checkbox"></div>').appendTo($form);
    const checkbox = new CheckboxFormElement('#checkbox', {
      availableValues: {
        'option_1': 'Option 1',
        'option_2': 'Option 2',
        'option_3': 'Option 3'
      },
      modelReference: 'User.role[].name'
    });
    form.addElement(checkbox.start());

    const testInstance = new User({
      User: {
        username: 'ada@passbolt.com',
        role: new Role.List([
          {name: 'admin'},
          {name: 'user'}
        ])
      }
    });
    form.load(testInstance);

    const data = form.getData();
    expect(textbox.getValue()).to.be.equal('ada@passbolt.com');
    expect(checkbox.getValue()).to.be.eql(['admin', 'user']);
    expect(data.User.username).to.be.equal('ada@passbolt.com');
    expect(data.User.role).to.be.eql([{name: 'admin'}, {name: 'user'}]);
  });

  it("validateElement() should validate an element", () => {
    const form = new Form('#form', {});
    form.start();

    // Add a textbox to the form that represents a User username
    const $usernameTextbox = $('<input id="username_textbox" type="text"/>').appendTo($form);
    const usernameTextbox = new TextboxFormElement('#username_textbox', {
      modelReference: 'User.username'
    });
    const $usernameFeedbackTextbox = $('<span id="feedback_username_textbox" for="username_textbox" />').appendTo($form);
    const usernameFeedbackTextbox = new FeedbackFormElement('#feedback_username_textbox', {});
    form.addElement(usernameTextbox.start(), usernameFeedbackTextbox.start());

    // Add a textbox to the form that represents a User email
    const $emailTextbox = $('<input id="email_textbox" type="text"/>').appendTo($form);
    const emailTextbox = new TextboxFormElement('#email_textbox', {
      modelReference: 'User.username'
    });
    const $emailFeedbackTextbox = $('<span id="feedback_email_textbox" for="email_textbox" />').appendTo($form);
    const emailFeedbackTextbox = new FeedbackFormElement('#feedback_email_textbox', {});
    form.addElement(emailTextbox.start(), emailFeedbackTextbox.start());

    // Add a checkbox to the form.
    const $checkbox = $('<div id="role_checkbox"></div>').appendTo($form);
    const checkbox = new CheckboxFormElement('#role_checkbox', {
      availableValues: {
        'option_1': 'Option 1',
        'option_2': 'Option 2',
        'option_3': 'Option 3',
        'op': 'Invalid option'
      },
      modelReference: 'User.role[].name'
    });
    const $roleFeedback = $('<span id="feedback_role" for="role_checkbox" />').appendTo($form);
    const roleFeedback = new FeedbackFormElement('#feedback_role', {});
    form.addElement(checkbox.start(), roleFeedback.start());

    /*
     * Test the required validation
     * The username is required
     */
    expect(form.validateElement(usernameTextbox)).to.be.false;
    expect($usernameFeedbackTextbox.html()).to.contain(User.validationRules.username.filter(item => item.rule == 'required')[0].message);
    // The role is not required
    expect(form.validateElement(checkbox)).to.be.true;

    /*
     * Test validation rule on single field
     * The username accept whatever utf8 characters.
     */
    usernameTextbox.setValue('傅傅傅傅傅傅傅傅');
    expect(form.validateElement(usernameTextbox)).to.be.true;

    /*
     * Test validation rule on multiple fields.
     * The role name should be at least 3 characters long.
     */
    checkbox.setValue(['op']);
    expect(form.validateElement(checkbox)).to.be.not.equal(true);
    expect($roleFeedback.html()).to.contain(Role.validationRules.name.filter(item => item.rule[0] == 'lengthBetween')[0].message);
  });
});

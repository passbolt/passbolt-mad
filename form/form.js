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
import Component from 'passbolt-mad/component/component';
import DefineMap from 'passbolt-mad/model/map/map';
import FormView from 'passbolt-mad/view/form/form';
import getObject from 'can-util/js/get/get';
import setObject from 'passbolt-mad/util/set/set';

/**
 * @parent Mad.form_api
 * @inherits mad.Component
 * @group mad.Form.view_events 0 View Events
 *
 * The Form Component as for aim to manage forms.
 * @todo TBD
 *
 * Tracks :
 * If the form element is driven by a model reference :
 * - The validation of the field will be automatically operated through the model reference
 *   validation rule
 * - The form will return its data formatted following the associated model reference. See
 * the function [mad.Form::getData() getData()] function.
 */
const Form = Component.extend('mad.Form', /* @static */ {

  defaults: {
    // Override the label option.
    label: 'Form Component',
    // Override the cssClasses option.
    cssClasses: ['form'],
    // Override the tag option.
    tag: 'form',
    // Override the viewClass option.
    viewClass: FormView,

    // The callbacks the component offers to the dev to bind their code.
    callbacks: {
      /*
       * An error occurred on submit.
       * @todo is it fired on auto-validate ?
       */
      error: null,
      // The form has been submitted
      submit: null
    },
    // Default action.
    action: null,
    /*
     * Whether the form should validate after a change in one of its field.
     * Available values : true, false, or afterFirstValidation
     */
    validateOnChange: 'afterFirstValidation'
  }

}, /** @prototype */ {

  // constructor like
  init: function(el, options) {
    /**
     * The form elements
     * @type mad.form.element.FormElement[]
     */
    this.elements = {};
    /**
     * The feedbacks elements associated to the form elements
     * @type mad.form.element.FeedbackInterface[]
     */
    this.feedbackElements = {};
    /**
     * The form data
     * @type {mad.Model}
     */
    this.data = {};

    /**
     * Total number of validations for this form.
     * @type {number}
     */
    this.validations = 0;

    this._super(el, options);
  },

  /**
   * Implements beforeRender hook.
   */
  beforeRender: function() {
    this.setViewData('action', this.options.action);
  },

  /**
   * Reset the form.
   * Reset the values inside the form, and remove error messages.
   * @return {void}
   */
  reset: function() {
    // Number of validations is back to zero.
    this.validations = 0;

    // Reset all the form elements value.
    for (const eltId in this.elements) {
      const element =  this.elements[eltId];
      const feedbackElement = this.feedbackElements[element.getId()];

      // Reset element value.
      element.setValue(this.options.defaultValue);

      // Reset feedback element if any.
      if (feedbackElement != undefined) {
        feedbackElement.reset();
      }
    }
  },

  /**
   * Load the form with the given data.
   *
   * @param {mixed} data The instance to use to initialize the form elements values with.
   */
  load: function(data) {
    for (const eltId in this.elements) {
      const element = this.elements[eltId];
      const modelReference = element.options.modelReference;
      let value = null;

      // If a model reference has been associated to the form element
      if (modelReference != null) {
        value = this._getModelPropValue(data, modelReference);
      } else {
        value = data[eltId];
      }

      // set the element value if exist
      if (typeof value !== 'undefined') {
        element.setValue(value);
      }
    }
  },

  /**
   * Retrieve a model property value.
   * @param data
   * @param modelReference
   * @returns {*}
   * @private
   */
  _getModelPropValue: function(data, modelReference) {
    let returnValue = null;
    const index = modelReference.indexOf('[].');

    // If multiple cardinality attribute in the list.
    if (index != -1) {
      returnValue = [];
      const subModelReference = modelReference.substr(0, index);
      const subData = getObject(data, subModelReference);
      subData.forEach(item => {
        const prop = modelReference.substr(index + 3);
        returnValue.push(getObject(item, prop));
      });
    } else {
      returnValue = getObject(data, modelReference);
    }

    return returnValue;
  },

  /**
   * Get a form element that has been added to the form based on its id.
   *
   * @param {string} eltId The form element Id
   *
   * @return {mad.form.Element} The form element.
   */
  getElement: function(eltId) {
    return this.elements[eltId];
  },

  /**
   * Add a form element to the form.
   * You can optionally associate a feedback element to this form element.
   * See the validate function to know more about the feedback controller.
   *
   * @param {mad.form.Element} element The form element to add.
   * @param {mad.form.Feedback} feedback The form feedback element to associate to the form element.
   */
  addElement: function(element, feedback) {
    const eltId = element.getId();
    this.elements[eltId] = element;
    if (typeof feedback != 'undefined') {
      this.feedbackElements[eltId] = feedback;
    }

    return element;
  },

  /**
   * Remove an element from the form.
   * The remove takes break the association between the form and the element, to remove the element
   * from the DOM use the $.remove() function.
   *
   * @param {mad.form.Element} element The element to remove from the form
   */
  removeElement: function(element) {
    // Check if the element has been added to the form.
    const eltId = element.getId();
    element = this.getElement(eltId);
    if (element == undefined) {
      throw mad.Exception.get(mad.error.ELEMENT_NOT_FOUND, eltId);
    }
    // Remove the association of the element with the form.
    delete this.elements[eltId];
    // Remove the feedback association with the form.
    delete this.feedbackElements[eltId];
  },

  /**
   * Extract the data gathered by the form's elements.
   *
   * For the given form :
   *
   * ```
   * <form id="form" class="mad_form form mad_view ready">
   * <input id="textbox" type="text">
   * <div id="checkbox"></div>
   * </form>
   * ```
   *
   * ```
   * var form = new mad.Form($('#form'), {});
   * form.start();
   *
   * // Add a textbox to the form.
   * var $textbox = $('<input id="textbox" type="text"/>').appendTo($form);
   * var textbox = new mad.form.Textbox($textbox, {
   * modelReference: 'mad.test.model.TestModel.testModelAttribute'
   * });
   * form.addElement(textbox.start());
   *
   * // Add a checkbox to the form.
   * var $checkbox = $('<div id="checkbox></div>').appendTo($form);
   * var checkbox = new mad.form.Checkbox($checkbox, {
   * availableValues: {
   * 'option_1': 'Option 1',
   * 'option_2': 'Option 2',
   * 'option_3': 'Option 3'
   * },
   * modelReference: 'mad.test.model.TestModel.TestModel1s.testModel1Attribute'
   * });
   * form.addElement(checkbox.start());
   * ```
   *
   * We expect get data to return values like :
   * ```
   * {
   * 'mad.test.model.TestModel' : {
   * 'testModelAttribute': VALUE,
   * 'TestModel1s': [
   * {
   * 'testModel1Attribute': VALUE
   * }, ...
   * ]
   * }
   * }
   * ```
   *
   * @return {array}
   */
  getData: function() {
    const data = {};

    for (const eltId in this.elements) {
      const element = this.elements[eltId];
      const modelReference = element.options.modelReference;
      const value = element.getValue();

      if (value == null) {
        continue;
      } else if (Array.isArray(value)) {
        const propName = modelReference.substr(modelReference.lastIndexOf('[].') + 3);
        const propValuePath = modelReference.substr(0, modelReference.lastIndexOf('[].'));
        const propValue = value.reduce((carry, item) => {
          const arr = {};
          arr[propName] = item;
          carry.push(arr);
          return carry;
        }, []);
        setObject(data, propValuePath, propValue);
      } else {
        setObject(data, modelReference, value);
      }
    }

    return data;
  },

  /**
   * Read and process server errors.
   * @param {array} errors
   */
  showErrors: function(errors) {
    for (const i in this.elements) {
      const element = this.elements[i];
      const modelReference = element.options.modelReference;
      const elementErrors = getObject(errors, modelReference);
      const eltId = element.getId();

      if (elementErrors) {
        element.state.error = true;
        if (this.feedbackElements[eltId]) {
          let error = '';
          for (const rule in elementErrors) {
            error += `${elementErrors[rule]} `;
          }
          this.feedbackElements[eltId].error(error);
        }
      }
    }
  },

  /**
   * Validate a form element.
   *
   * If the form element has been associated to a model, validate the value of the form element
   * with model attribute rule.
   *
   * If the form element has been associated to a custom validation function, use this function
   * to validate the value of the form element. This case is executed in priority.
   *
   * If the element is invalid :
   * * Switch the state of the element to error ;
   * * Switch the state of the associated feedback element to error ;
   * * Display an error message see [mad.Model.validateAttribute]
   *
   * @return {boolean}
   */
  validateElement: function(element, formData) {
    let returnValue = true;
    // The form element is driven by an associated model.
    const modelReference = element.options.modelReference;
    // By default the result value is true, if no rule found to validate the form element, the validation is a success.
    let validationResult = [];
    // The form element id.
    const eltId = element.getId();

    // The element requires a validation.
    if (element.requireValidation(formData)) {
      // Get the element value.
      const value = element.getValue();
      // The direct validate function associated to the form element.
      const validateFunction = element.getValidateFunction();

      // A direct validate function is defined.
      if (validateFunction != null) {
        const validateFuncResult = validateFunction(value, {});
        if (validateFuncResult !== true) {
          validationResult.push(validateFuncResult);
        }
      } else if (modelReference != null) {
        // If the element is referenced by a model reference.
        const split = modelReference.split('.');
        let Model = null;
        const prop = split[split.length - 1];

        /*
         * Follow the model reference to locate the validation rules.
         * ex: User.profile.first_name
         */
        for (let i = 0; i < split.length - 1; i++) {
          if (Model == null) {
            Model = DefineMap.getReference(split[i]);
          } else {
            const definitions = Model.prototype._define.definitions;
            let mapName = split[i];
            let isList = false;

            if (/\[\]$/.test(split[i])) {
              mapName = split[i].replace('[]', '');
              isList = true;
            }

            const definition = definitions[mapName];
            if (definition.Type) {
              if (isList) {
                Model = definition.Type.itemReference;
              } else {
                Model = definition.Type;
              }
            }
          }
        }

        validationResult = Model.validateAttribute(prop, value, {}, this.options.action);
      }

      // The validation of the element failed.
      if (validationResult.length > 0) {
        this.elements[eltId].state.error = true;
        if (this.feedbackElements[eltId]) {
          this.feedbackElements[eltId].error(validationResult[0]);
        }
        this.view.setElementState(this.elements[eltId], 'error');
        returnValue = false;
      } else {
        // otherwise the validation is successful
        this.elements[eltId].state.error = false;
        if (this.feedbackElements[eltId]) {
          this.feedbackElements[eltId].success('');
        }
        this.view.setElementState(this.elements[eltId], 'success');
      }
    }

    return returnValue;
  },

  /**
   * Validate the form.
   *
   * @return {boolean}
   */
  validate: function() {
    let returnValue = true;
    const formData = this.getData();

    for (const i in this.elements) {
      returnValue &= this.validateElement(this.elements[i], formData);
    }

    // Increment number of validations.
    this.validations++;

    return returnValue;
  },

  /* ************************************************************** */
  /* LISTEN TO THE VIEW EVENTS */
  /* ************************************************************** */

  /**
   * @function mad.Form.__submit
   * @parent mad.Form.view_events
   *
   * Listen to any submit events on the associated HTML element
   *
   * @param {HTMLElement} el The element the event occured on
   * @param {HTMLEvent} ev The event which occured
   */
  '{element} submit': function(el, ev) {
    ev.preventDefault();

    // Validate the form.
    if (this.validate()) {
      // if a submit callback is given, call it
      if (this.options.callbacks.submit) {
        this.options.callbacks.submit(this.getData());
      }
    } else {
      /*
       * Data are not valid
       * if an error callback is given, call it
       */
      if (this.options.callbacks.error) {
        this.options.callbacks.error();
      }
    }
  },

  /**
   * @function mad.Form.__changed
   * @parent mad.Form.view_events
   *
   * Listen to any changed event which occured on the form elements contained by
   * the form controller. If the validateOnChange option is set to true, validate
   * the target form element.
   *
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event that occurred
   */
  '{element} changed': function(el, ev) {
    // Should the form element be validated.
    const validateOnChange = this.options.validateOnChange === true
            || (this.options.validateOnChange === 'afterFirstValidation' && this.validations > 0);

    /*
     * If the form should validate on change.
     * Validate the element which has changed.
     */
    if (validateOnChange) {
      const formElement = this.getElement(ev.target.id);
      if (formElement) {
        this.validateElement(formElement);
      } else {
        throw mad.Exception.get('No form element found.');
      }
    }
  }

});

export default Form;

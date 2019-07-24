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
import Component from '../component/component';
import ElementView from '../view/form/element';
import FormElementState from '../model/state/formElementState';

/**
 * @parent Mad.form_api
 * @inherits mad.Component
 * @group mad.form.Element.view_events 0 View Events
 * @group mad.form.Element.states_changes 0 State changes
 *
 * The Form Element Component as for aim to manage form element.
 * @todo TBD
 */
const Element = Component.extend('mad.form.Element', /* @static */ {

  defaults: {
    // Override the label option.
    label: 'Form Element Component',
    // Override the cssClasses option.
    cssClasses: ['form-element'],
    // Override the tag option.
    tag: null,
    // Override the viewClass option.
    viewClass: ElementView,
    stateClass: FormElementState,
    // The model reference.
    modelReference: null,
    // The form element requires a validation.
    validate: true,
    /*
     * The form element should be validated with this function.
     * Priority max.
     */
    validateFunction: null,
    // The form element has a default value.
    defaultValue: null,
    // The current form element.
    value: null,
    // The callbacks the component offers to the dev to bind their code.
    callbacks: {
      // The value of the form element changed.
      // eslint-disable-next-line no-unused-vars
      changed: function(el, ev, value) {}
    }
  }

}, /** @prototype */ {

  /**
   * @inheritdoc
   */
  init: function(el, options) {
    this._super(el, options);
    this.defaultValue = options.value;
    this.value = options.value;
    this._initStateListener();
  },

  /**
   * Init state listener
   */
  _initStateListener: function() {
    this.state.on('error', (ev, error) => this.onErrorChange(error));
  },

  /**
   * Update the DOM wrapper element.
   */
  updateWrapperElement: function() {
    if (this.state.disabled) {
      $(this.element).attr('disabled', 'disabled')
        .addClass('disabled');
    } else {
      $(this.element).removeAttr('disabled')
        .removeClass('disabled');
    }
    this._super();
  },

  /**
   * @inheritdoc
   */
  afterStart: function() {
    this.setValue(this.options.value);
  },

  /**
   * @inheritdoc
   */
  onDisabledChange: function(disabled) {
    if (disabled) {
      $(this.element).attr('disabled', 'disabled')
        .addClass('disabled');
    } else {
      $(this.element).removeAttr('disabled')
        .removeClass('disabled');
    }
  },

  /**
   * Observer when the component has error or not
   * @param {boolean} error True if error, false otherwise
   */
  onErrorChange: function(error) {
    if (error) {
      $(this.element).addClass('error');
    } else {
      $(this.element).removeClass('error');
    }
  },

  /**
   * Get the value of the form element
   * @return {mixed} value The value of the form element
   */
  getValue: function() {
    return this.value;
  },

  /**
   * Set the value of the form element
   * @param {mixed} value The value to set
   * @return {FormElement}
   */
  setValue: function(value) {
    this.value = value;
    this.view.setValue(this.value);
    return this;
  },

  /**
   * Get the associated validate function
   * @return {func}
   */
  getValidateFunction: function() {
    return this.options.validateFunction;
  },

  /**
   * Check if the element has to be validated.
   * @param {object} formData The form data
   * @return {boolean}
   */
  requireValidation: function(formData) {
    if (typeof this.options.validate == 'function') {
      return this.options.validate(formData);
    }
    return this.options.validate;
  },

  /**
   * Switch the component to its initial state
   */
  reset: function() {
    this.setValue(this.options.value);
  },

  /**
   * Listen to the view event changed
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event that occurred
   */
  '{element} changed': function(el, ev) {
    this.value = ev.data.value;
    if (this.options.callbacks.changed) {
      this.options.callbacks.changed(this.value);
    }
  }

});

export default Element;

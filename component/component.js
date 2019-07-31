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
import Control from '../control/control';
import DefineList from '../model/list/list';
import ComponentState from '../model/state/componentState';
import View from '../view/view';

const Component = Control.extend('mad.Component', /* @static */{

  defaults: {
    // The component's icon.
    icon: null,
    // The component's label.
    label: 'ComponentController',
    // The classes to add to the HTML Element the component is created on.
    cssClasses: ['js_component'],
    // The component is considered loaded on start
    loadedOnStart: true,
    // The default HTML Element the component will be wrapped by. Used by the ComponentHelper to create the DOM element.
    tag: 'div',
    // Override the default template to use any other existing one.
    template: null,
    // The component's view controller used to drive the component's view.
    viewClass: View,
    stateClass: ComponentState,
    // The data used by the view
    viewData: {},
    // Should the component notify others while it's loading.
    silentLoading: true
  },

  /**
   * Register of components.
   */
  _components: new DefineList()

}, /** @prototype */ {

  /**
   * Constructor
   * @param {string} el The element selector
   * @param {object} options The component options
   */
  init: function(el, options) {
    this._super(el, options);
    this._initState(options);
    this._loadedDependencies = new DefineList();
    this._registerComponent();
  },

  /**
   * Init the component state
   */
  _initState: function(options) {
    const state = new this.options.stateClass(options.state);
    state.on('destroyed', (ev, destroyed) => this.onDestroyedChange(destroyed));
    state.on('disabled', (ev, disabled) => this.onDisabledChange(disabled));
    state.on('hidden', (ev, hidden) => this.onHiddenChange(hidden));
    state.on('loaded', (ev, loaded) => this.onLoadedChange(loaded));
    state.on('started', (ev, started) => this.onStartedChange(started));
    state.on('empty', (ev, empty) => this.onEmptyChange(empty));
    this.state = state;
  },

  /**
   * Register the component.
   * @private
   */
  _registerComponent: function() {
    Component._components.push(this);
  },

  /**
   * Unregister the component.
   * @private
   */
  _unregisterComponent: function() {
    const id = this.getId();
    const index = Component._components.indexOf({id: id});
    if (index != -1) {
      Component._components.splice(index, 1);
    }
  },

  /**
   * Add a loaded dependency. The component loaded state depend on its children.
   * @param {Component} The component to observe
   */
  addLoadedDependency: function(component) {
    this._loadedDependencies.push(component);
    if (component.state.loaded == false) {
      this.state.loaded = false;
    }
    component.state.on('loaded', () => {
      const loaded = this._loadedDependencies.reduce((carry, dependency) => carry && dependency.state.loaded, true);
      this.state.loaded = loaded;
    });
  },

  /**
   * Observe when the component is destroyed
   * @param {boolean} started True if destroyed. It cannot be false
   */
  onDestroyedChange: function(destroyed) {
    if (destroyed) {
      $(this.element).removeClass('ready');
    }
  },

  /**
   * Observe when the component is enable / disable
   * @param {boolean} disabled True if disabled, false otherwise
   */
  onDisabledChange: function(disabled) {
    if (disabled) {
      $(this.element).addClass('disabled');
    } else {
      $(this.element).removeClass('disabled');
    }
  },

  /**
   * Observe when the component is shown / hidden
   * @param {boolean} hidden True if hidden, false otherwise
   */
  onHiddenChange: function(hidden) {
    if (hidden) {
      $(this.element).addClass('hidden');
    } else {
      $(this.element).removeClass('hidden');
    }
  },

  /**
   * Observe when the component is loaded / loading
   * @param {boolean} loaded True if loaded, false otherwise
   */
  onLoadedChange: function(loaded) {
    if (loaded) {
      $(this.element).addClass('ready');
    } else {
      $(this.element).removeClass('ready');
    }
  },

  /**
   * Observe when the component is started / stopped
   * @param {boolean} started True if started, false otherwise
   */
  // eslint-disable-next-line no-unused-vars
  onStartedChange: function(started) {
  },

  /**
   * Observe when the component is empty / filled
   * @param {boolean} empty True if empty, false otherwise
   */
  onEmptyChange: function(empty) {
    const emptyFeedback = $('.empty-content', this.element);
    if (empty) {
      $(this.element).addClass('empty');
      emptyFeedback.removeClass('hidden');
    } else {
      $(this.element).removeClass('empty');
      emptyFeedback.addClass('hidden');
    }
  },

  /**
   * @inheritdoc
   */
  destroy: function() {
    // If the component has been destroyed, but the HTMLElement still exists.
    if (this.element && this.element != null) {
      // Remove the optional css classes from the HTMLElement.
      for (const i in this.options.cssClasses) {
        $(this.element).removeClass(this.options.cssClasses[i]);
      }
      // Remove the construct class name.
      $(this.element).removeClass(this.constructor.name);
    }

    // Destroy the view.
    if (this.view) {
      this.view.destroy();
    }

    this.state.destroyed = true;
    delete this._unregisterComponent();
    this._super();
  },

  /**
   * Destroy the component and remove the DOM element.
   */
  destroyAndRemove: function() {
    const element = this.element;
    this.destroy();
    if (element) {
      $(element).remove();
    }
  },

  /**
   * Pass a variable to the component's View & template.
   * @param {string|array} name The variable name or an array of variables.
   * @param {mixed} value (optional) The variable value if a variable name as been given.
   */
  setViewData: function(name, value) {
    if (typeof name == 'object') {
      const data = name;
      for (const i in data) {
        this.setViewData(i, data[i]);
      }
    } else {
      this.options.viewData[name] = value;
    }

    return this;
  },

  /**
   * Get a variable value that has been passed to the component's View & template.
   * @param {mixed} name (optional) The variable name. If null, returns all the variables passed
   * to the component's View & template.
   * @return {mixed}
   */
  getViewData: function(name) {
    if (typeof name == 'undefined') {
      return this.options.viewData;
    }
    return this.options.viewData[name];
  },

  /**
   * @inheritdoc
   */
  start: function() {
    this.beforeStart();
    this.initView();
    this.updateWrapperElement();
    this.render();
    this.afterStart();
    this.state.started = true;
    if (this.options.loadedOnStart) {
      this.state.loaded = true;
    }

    return this;
  },

  /**
   * Refresh the component.
   */
  refresh: function() {
    if (this.state.destroyed) {
      return;
    }
    $(this.element).empty();
    this.render();
    this.afterStart();
    return this;
  },

  /**
   * Called right before the component is started.
   * Override this function if you want add a specific behavior.
   */
  beforeStart: function() {
  },

  /**
   * Initialize the component's View.
   */
  initView: function() {
    this.view = new this.options.viewClass(this.element, {
      template: this.options.template,
      cssClasses: this.options.cssClasses,
      controller: this
    });
  },

  /**
   * Called right after the component has been started.
   * Override this function if you want add a specific behavior.
   * This hook is in other word your component main function.
   */
  afterStart: function() {
  },

  /**
   * Update the DOM wrapper element.
   */
  updateWrapperElement: function() {
    this.options.cssClasses.forEach(cssClass => $(this.element).addClass(cssClass));
    if (this.state.disabled) {
      this.view.addClass('disabled');
    } else {
      this.view.removeClass('disabled');
    }
    if (this.state.hidden) {
      this.view.addClass('hidden');
    } else {
      this.view.removeClass('hidden');
    }
  },

  /**
   * Render the component
   */
  render: function() {
    if (this.options.template) {
      this.setDefaultViewData();
      this.beforeRender();
      let render = this.view.render();
      render = this.afterRender(render);
      this.view.insertInDom(render);
    }
  },

  /**
   * Set the default view data
   */
  setDefaultViewData: function() {
    this.setViewData('control', this);
    this.setViewData('controller', this);
    this.setViewData('icon', this.options.icon);
    this.setViewData('label', this.options.label);
    this.setViewData('view', this.view);
    this.setViewData('id', this.id);
  },

  /**
   * Called right before the component is rendered.
   * Override this function if you want add a specific behavior.
   * This hook is commonly used to pass data to the component's View & template.
   */
  beforeRender: function() {
  },

  /**
   * Called right after the component has been rendered.
   * Override this function if you want add a specific behavior.
   * @param {string} render The render content
   * @return {string} The updated render content
   */
  afterRender: function(render) {
    return render;
  }

});

export default Component;

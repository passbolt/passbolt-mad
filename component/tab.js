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
import Action from 'passbolt-mad/model/map/action';
import ComponentHelper from 'passbolt-mad/helper/component';
import CompositeComponent from 'passbolt-mad/component/composite';
import MenuComponent from 'passbolt-mad/component/menu';
import TabView from 'passbolt-mad/view/component/tab';
import template from 'passbolt-mad/view/template/component/tab/tab.stache!';
import uuid from 'uuid/v4';

/**
 * @parent Mad.components_api
 * @inherits {mad.component.Composite}
 *
 * A component to manage different tabs, each of them containing a component.
 *
 * ## Example
 * @demo demo.html#tab/tab
 *
 * @constructor
 * Instantiate a new Tab Component.
 * @param {HTMLElement|can.NodeList|CSSSelectorString} el The element the control will be created on
 * @param {Object} [options] option values for the component.  These get added to
 * this.options and merged with defaults static variable
 *   * autoMenu : should the menu be generated automatically ?
 * @return {mad.component.Tab}
 */
const Tab = CompositeComponent.extend('mad.component.Tab',  /** @static */ {

  defaults: {
    label: 'Tab Controller',
    viewClass: TabView,
    template: template,
    // Generate a menu automatically.
    autoMenu: true
  }

}, /** @prototype */ {

  /**
   * @inheritdoc
   */
  init: function(el, options) {
    this._super(el, options);
    this._activeTab = null;
    this._tabSettings = {};
  },

  /**
   * @inheritdoc
   */
  beforeRender: function() {
    this.setViewData('autoMenu', this.options.autoMenu);
  },

  /**
   * @inheritdoc
   */
  afterStart: function() {
    // Instantiate the menu which will rule the tabs container
    if (this.options.autoMenu) {
      this.options.menu = new MenuComponent('.js_tabs_nav');
      this.options.menu.start();
    }
    this.on();
  },

  /**
   * @inheritdoc
   */
  '{menu.element} item_selected': function(el, ev) {
    const item = ev.data.item;
    // If the tab controller generate is own menu to drive itself
    if (this.options.autoMenu) {
      const tabId = item.id.replace('js_tab_nav_', '');
      this.enableTab(tabId);
    }
  },

  /**
   * Add a tab
   * @param {Component.prototype} ComponentClass The component class to use to instantiate the tab
   * @param {object} options The options to use to instantiate the tab
   */
  addTab: function(ComponentClass, options) {
    options.id = options.id || uuid();
    options.cssClasses = options.cssClasses || [];
    options.cssClasses.push('tab-content');
    this.addMenuEntry(options);
    this._tabSettings[options.id] = {ComponentClass: ComponentClass, options: options};
  },

  /**
   * Add a menu entry. If a menu is created automatically with the tabs.
   * @param {object} tabOptions
   */
  addMenuEntry: function(tabOptions) {
    if (!this.options.autoMenu) {
      return;
    }
    const menuEntry = new Action({
      id: `js_tab_nav_${tabOptions.id}`,
      label: tabOptions.label
    });
    this.options.menu.insertItem(menuEntry);
  },

  /**
   * Select menu entry
   * @param {string} tabId The tab identifier
   */
  selectMenuEntry: function(tabId) {
    if (this.options.autoMenu) {
      $(`#js_tab_nav_${tabId} a`).addClass('selected');
    }
  },

  /**
   * Select menu entry
   * @param {string} tabId The tab identifier
   */
  unselectMenuEntry: function(tabId) {
    if (this.options.autoMenu) {
      $(`#js_tab_nav_${tabId} a`).removeClass('selected');
    }
  },

  /**
   * Enable a tab
   * @param {string} tabId The tab identifier
   */
  enableTab: function(tabId) {
    if (this._activeTab) {
      const previousTabId = this._activeTab.getId();
      this.unselectMenuEntry(previousTabId);
      this._activeTab.destroyAndRemove();
    }

    this.selectMenuEntry(tabId);
    const tabSettings = this._tabSettings[tabId];
    const tabSelector = $('.js_tabs_content', this.element);
    const tab = ComponentHelper.create(tabSelector, 'last', tabSettings.ComponentClass, tabSettings.options);
    tab.start();
    this._activeTab = tab;
  }

});

export default Tab;

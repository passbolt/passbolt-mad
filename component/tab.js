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
import Action from 'passbolt-mad/model/action';
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
var Tab = CompositeComponent.extend('mad.component.Tab',  /** @static */ {

    defaults: {
        label: 'Tab Controller',
        viewClass: TabView,
        template: template,
        // Generate a menu automatically.
        autoMenu: true
    }

}, /** @prototype */ {

    /**
     * Constructor.
     * Instantiate a new Tab Component.
     * @param {HTMLElement|can.NodeList|CSSSelectorString} el The element the control will be created on
     * @param {Object} [options] option values for the component.  These get added to
     * this.options and merged with defaults static variable
     *   * autoMenu : should the menu be generated automatically ?
     * @return {mad.component.Tab}
     */
    init: function(el, options) {
        /**
         * The current enabled tab id
         * @type {string}
         */
        this.enabledId = null;

        this._super(el, options);

        // Set the view vars.
        this.setViewData('autoMenu', this.options.autoMenu);
    },

    /**
     * After start
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
     * A tab has been selected (in case of automenu = true).
     * @function mad.component.Tab.__item_selected
     * @return {void}
     */
    '{menu.element} item_selected': function (el, ev, item) {
        // If the tab controller generate is own menu to drive itself
        if(this.options.autoMenu) {
            var tabId = item.id.replace('js_tab_nav_', '');
            this.enableTab(tabId);
        }
    },

    /**
     * Enable a tab
     * @param {string} tabId id of the tab to enable
     * @return {void}
     */
    enableTab: function (tabId) {
        // if a previous tab is enabled
        // -> unselect it
        if (this.enabledTabId) {
            this.getComponent(this.enabledTabId).setState('hidden');
            this.view.unselectTab(this.enabledTabId);
        }

        // get the component defined by the tabId
        this.enabledTabId = tabId;
        var tab = this.getComponent(this.enabledTabId);

        // if the tab to select is not already started
        // -> start it
        if(tab.state.is(null)){
            tab.start();
        }
        // if the tab is hidden
        // -> display it
        else if(tab.state.is('hidden')) {
            tab.setState('ready');
        }

        this.view.selectTab(this.enabledTabId);
    },

    /**
     * Add a component to the container
     * @param {string} Class The component class to use to instantiate the component
     * @param {array} options The optional data to pass to the component constructor
     */
    addComponent: function (Class, options) {
        // default tab content css
        var defaultTabCss = ['tab-content'];
        // get the component if or create it
        if (typeof options.id != 'undefined') {
            options.id = options.id;
        } else {
            options.id = uuid();
        }

        // insert the associated menu entry
        if (this.options.autoMenu) {
            var menuEntry = new Action({
                id: 'js_tab_nav_' + options.id,
                label: options.label
            });
            this.options.menu.insertItem(menuEntry);
        }

        // Add the default css classes to the new tab
        if ($.isArray(options.cssClasses)) {
            $.merge(options.cssClasses, defaultTabCss);
        } else {
            options.cssClasses = defaultTabCss;
        }

        var component = ComponentHelper.create(
            $('.js_tabs_content', this.element),
            'last',
            Class,
            options
        );

        return this._super(component);
    }

});

export default Tab;

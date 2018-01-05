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
import DialogView from 'passbolt-mad/view/component/dialog';
import FreeCompositeComponent from 'passbolt-mad/component/free_composite';
import HtmlHelper from 'passbolt-mad/helper/html';
import template from 'passbolt-mad/view/template/component/dialog/dialog.ejs!';

/**
 * @parent Mad.components_api
 * @inherits {mad.component.FreeComposite}
 *
 * A dialog box implementation.
 *
 * ## Example
 * @demo demo.html#dialog/dialog
 *
 * @constructor
 * Instantiate a new Dialog Component.
 * @param {HTMLElement|can.NodeList|CSSSelectorString} el The element the control will be created on
 * @param {Object} [options] option values for the component.  These get added to
 * this.options and merged with defaults static variable
 * @return {mad.component.Dialog}
 */
var Dialog = FreeCompositeComponent.extend('mad.component.Dialog', /** @static */ {

    defaults: {
        label: 'Dialog Controller',
        viewClass: DialogView,
        template: template,
        cssClasses: ['dialog-wrapper'],
        tag: 'div'
    },

    /**
     * Close the latest dialog.
     */
    closeLatest: function() {
        $('.dialog-wrapper:last').remove();
    }

}, /** @prototype */ {

    /**
     * Constructor.
     * @param {HTMLElement|can.NodeList|CSSSelectorString} el The element the control will be created on
     * @param {Object} [options] option values for the component.  These get added to
     * this.options and merged with defaults static variable
     * @return {mad.component.Dialog}
     */
    init: function(el, options) {
        // Create the DOM entry point for the dialog
        var refElt =  mad.config.rootElement,
            position = 'first';

        // If a dialog already exist, position the new one right after.
        var $existingDialog = $('.dialog-wrapper:last');
        if ($existingDialog.length) {
            refElt = $existingDialog;
            position = "after";
        }

        // Insert the element in the page DOM.
        var $el = HtmlHelper.create(refElt, position, '<div/>');

        // Changing the element force us to recall the setup which is called before all init functions
        // and make the magic things (bind event ...)
        this.setup($el, options);
        this._super($el, options);
    },

    /**
     * Add a component to the dialog container
     * @param {mad.controller.ComponentController} Class The class of the component to add, or the html to
     *   display.
     * @param {Object} options Option of the component
     */
    add: function(Class, options) {
        if (typeof options == 'undefined' || options == null) {
            options = {};
        }

        var component = this.addComponent(Class, options, 'js_dialog_content');
        component.start();

        return component;
    },

    /**
     * Set the title
     * @param {string} title The new title
     */
    setTitle: function(title) {
        this.view.setTitle(title);
    },

    /**
     * Set the subtitle
     * @param {string} subtitle The new subtitle
     */
    setSubtitle: function(subtitle) {
        this.view.setSubtitle(subtitle);
    }
});

export default Dialog;

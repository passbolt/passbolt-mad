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
import View from 'passbolt-mad/view/view';

/**
 * @inherits mad.View
 * @group mad.component.ButtonDropdown.view_events 0 View Events
 */
var ButtonDropdown = View.extend('mad.view.component.ButtonDropdown', /** @static */{

}, /** @prototype */ {

    /**
     * Get the dropdown element for the current dropdown button.
     * @return {elt}
     */
    getDropdownContentElement: function() {
        var contentElement = this.getController().options.contentElement;

        // a custom dropdown content element has been defined
        if (contentElement != null) {
            return $(contentElement);
        }
        // otherwise the element next to this element is the dropdown content element
        else {
            return $(this.element).next();
        }
    },

    /**
     * Open an item
     * @param {mad.model.Model} item The target item to open
     * @return {void}
     */
    open: function () {
        $(this.element).addClass('pressed');
        var $contentElement = this.getDropdownContentElement();
        $contentElement.addClass('visible');
        this.getController().state.addState('open');
    },

    /**
     * Close an item
     * @param {mad.model.Model} item The target item to close
     * @return {void}
     */
    close: function () {
        $(this.element).removeClass('pressed');
        var $contentElement = this.getDropdownContentElement();
        $contentElement.removeClass('visible');
        if (this.getController().state.is('open'))
        this.getController().state.removeState('open');
    },

    /* ************************************************************** */
    /* LISTEN TO THE VIEW EVENTS */
    /* ************************************************************** */

    /**
     * @function mad.component.ButtonDropdown.click
     * @parent mad.component.ButtonDropdown.view_events
     * Listen to the event click on the DOM button element
     * @return {bool}
     */
    'click': function (el, ev) {
        // If state is disabled, do not do anything on click.
        if (this.getController().state.is('disabled')) {
            return false;
        }

        // If state is not disabled,
        // manage opening and closing of button dropdown.
        if(!this.getController().state.is('open')) {
            this.open();
        } else {
            this.close();
        }

        return false;
    },

    /**
     * @function mad.component.ButtonDropdown.__document_click
     * @parent mad.component.ButtonDropdown.view_events
     * Intercept global click event and close menu if open.
     *
     * @param el
     * @param ev
     */
    '{document} click': function (el, ev) {
        if (!$(this.element).is(el)) {
            this.close();
        }
    }

});

export default ButtonDropdown;
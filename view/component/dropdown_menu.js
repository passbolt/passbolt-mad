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
//import DomData from 'can-util/dom/data/data';
import TreeView from 'passbolt-mad/view/component/tree';

/**
 * @inherits mad.view.component.Tree
 *
 * Our representation of the drop down menu
 *
 * @constructor
 * Instanciate a new Drop Down Menu view
 * @return {mad.view.component.tree.Jstree}
 */
var DropdownMenu = TreeView.extend('mad.view.component.DropdownMenu', /* @static */ {}, /** @prototype */ {

    /**
     * Open an item
     * @param {mad.model.Model} item The target item to open
     * @return {void}
     */
    open: function (item) {
        var li = $('#' + item.id, this.element);
        li.removeClass('closed')
            .addClass('opened');
        var control = $('.control:first', li);
        control.removeClass('open')
            .addClass('close');
    },

    /**
     * Close an item
     * @param {mad.model.Model} item The target item to close
     * @return {void}
     */
    close: function (item) {
        var li = $('#' + item.id, this.element);
        li.removeClass('opened')
            .addClass('closed');
        var control = $('.control:first', li);
        control.removeClass('close')
            .addClass('open');
    },

    /* ************************************************************** */
    /* LISTEN TO THE VIEW EVENTS */
    /* ************************************************************** */

    /**
     * Uncollapse an item
     * @param {HTMLElement} el The element the event occured on
     * @param {HTMLEvent} ev The event which occured
     * @return {void}
     */
    'li mouseover': function (el, ev) {
        ev.stopPropagation();
        ev.preventDefault();

        var data = null,
            itemClass = this.getController().getItemClass();

        if (this.getController().getItemClass()) {
            //data = DomData.get.call(el, itemClass.shortName);
        } else {
            data = el.id;
        }

        $(this.element).trigger('item_opened', data);
    },

    /**
     * Uncollapse an item
     * @param {HTMLElement} el The element the event occured on
     * @param {HTMLEvent} ev The event which occured
     * @return {void}
     */
    'li mouseleave': function (el, ev) {
        ev.stopPropagation();
        ev.preventDefault();

        var data = null,
            itemClass = this.getController().getItemClass();

        if (this.getController().getItemClass()) {
            //data = DomData.get.call(el, itemClass.shortName);
        } else {
            data = el.id;
        }
        $(this.element).trigger('item_closed', data);
    }

});

export default DropdownMenu;
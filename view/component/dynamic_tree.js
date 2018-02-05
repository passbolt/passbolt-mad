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
import DomData from 'can-util/dom/data/data';
import TreeView from 'passbolt-mad/view/component/tree';

/**
 * @inherits mad.view.component.Tree
 *
 * Our representation of the dynamic tree view (such as the jquery plugin jstree)
 *
 * @constructor
 * Instanciate a new Dynamic Tree view
 * @return {mad.view.component.tree.Jstree}
 */
var DynamicTree = TreeView.extend('mad.view.component.DynamicTree', /** @static */ {

}, /** @prototype */ {

    /**
     * Open an item
     * @param {mad.model.Model} item The target item to open
     * @return {void}
     */
    'open': function (item) {
        var li = $('#' + item.id, this.element);
        li.removeClass('close')
            .addClass('open');
    },

    /**
     * Close an item
     * @param {mad.model.Model} item The target item to close
     * @return {void}
     */
    'close': function (item) {
        var li = $('#' + item.id, this.element);
        li.removeClass('open')
            .addClass('close');
    },

    /* ************************************************************** */
    /* LISTEN TO THE VIEW EVENTS */
    /* ************************************************************** */

    /**
     * Collapse / Uncollapse an item
     * @param {HTMLElement} el The element the event occured on
     * @param {HTMLEvent} ev The event which occured
     * @return {void}
     */
    '.node-ctrl a click': function (el, ev) {
        ev.stopPropagation();
        ev.preventDefault();
        var data = null,
            li = $(el).parents('li'),
            itemClass = this.getController().getItemClass();

        if (this.getController().getItemClass()) {
            data = DomData.get.call(li[0], itemClass.shortName);
        } else {
            data = li[0].id;
        }

        // if the element is closed, open it
        if (li.hasClass('close')) {
            $(this.element).trigger('item_opened', data);
        }
        // otherwise close it
        else {
            $(this.element).trigger('item_closed', data);
        }
    },

    /**
     * Contextual menu
     * @param {HTMLElement} el The element the event occured on
     * @param {HTMLEvent} ev The event which occured
     * @return {void}
     */
    '.more-ctrl a click': function (el, ev) {
        ev.stopPropagation();
        ev.preventDefault();
        var data = null,
            li = $(el).parents('li'),
            itemClass = this.getController().getItemClass();

        if (this.getController().getItemClass()) {
            data = DomData.get.call(li[0], itemClass.shortName);
        } else {
            data = li[0].id;
        }

        $(this.element).trigger('item_right_selected', [data, ev]);
    }
});

export default DynamicTree;

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
import View from 'passbolt-mad/view/view';
import HtmlHelper from 'passbolt-mad/helper/html';

/**
 * @inherits mad.View
 */
var Grid = View.extend('mad.view.component.Grid', /* @static */ {}, /** @prototype */ {

    /**
     * Flush the grid
     */
    reset: function () {
        $('tbody tr', this.element).remove();
    },

    /**
     * Hide a column
     * @param {string} columnName The column name to hide
     */
    hideColumn: function (columnName) {
        $('.js_grid_column_' + columnName, this.element).hide();
    },

    /**
     * Show a column
     * @param {string} columnName The column name to show
     */
    showColumn: function (columnName) {
        $('.js_grid_column_' + columnName, this.element).show();
    },

    /**
     * Select an item
     * @param {mixed} item The selected item instance or its id
     */
    selectItem: function (item) {
        var $item = this.getItemElement(item);
        $item.addClass('selected');
    },

    /**
     * Unselect an item
     * @param {mixed} item The unselected item instance or its id
     */
    unselectItem: function (item) {
        var $item = this.getItemElement(item);
        $item.removeClass('selected');
    },

    /**
     * Unselect all.
     */
    unselectAll: function () {
        $('tr.selected', this.element).removeClass('selected');
    },

    /**
     * An item has been right selected
     *
     * @param {mad.Model} item The selected item instance or its id
     */
    rightSelectItem: function (item) {
    },

    /**
     * An item has been hovered
     *
     * @param {mad.Model} item The selected item instance or its id
     */
    hoverItem: function (item, element, srcEvent) {
    },

    /**
     * Remove an item from the grid
     * @param {mad.model.Model} item The item to remove
     */
    removeItem: function (item) {
        var $item = this.getItemElement(item);
        $item.remove();
    },

    /**
     * Hide an item.
     *
     * @param {mad.Model} item The item to hide.
     */
    hideItem: function (item) {
        var $item = this.getItemElement(item);
        $item.hide();
    },

    /**
     * Show an item.
     *
     * @param {mad.Model} item The item to show.
     */
    showItem: function (item) {
        var $item = this.getItemElement(item);
        $item.show();
    },

    /*
     * Render a row for a given item
     * @param {mad.model.Model} item
     */
    _renderRow: function (item) {
        var control = this.getController(),
            columnModels = control.getColumnModel(),
            mappedItem = control.getMap().mapObject(item);

        // Render the row with the row data.
        return View.render(control.options.itemTemplate, {
            item: item,
            id: control.options.prefixItemId + mappedItem.id,
            columnModels: columnModels,
            mappedItem: mappedItem
        });
    },

    /**
     * Get the HtmlElement that has been drawn for an item.
     *
     * @param item The item to get the element for.
     * @return {jQuery}
     */
    getItemElement: function (item) {
        return $('#' + this.getController().options.prefixItemId + item.id, this.element);
    },

    /**
     * Insert an item into the grid
     *
     * @param {mad.model.Model} item The item to insert in the grid
     * @param {mad.Model} refItem (optional) The reference item to use to position the new item.
     * By default the item will be inserted as last element of the grid.
     * @param {string} position (optional) If the reference item has been defined. The position
     * of the item to insert, regarding the reference item.
     */
    insertItem: function (item, refItem, position) {
        // By default position the new element inside as final element
        position = position || 'last';
        var $item = null,
            $refElement = null,
            row = '',
            control = this.getController();

        // Adapt the insertion strategy regarding the reference element and the desired position.
        // By default the new item will be inserted as last elemement of the grid.
        switch (position) {
            case 'before':
            case 'after':
                // Get the HTML Element which represents the reference element.
                $refElement = this.getItemElement(refItem);
                if (!$refElement.length) {
                    throw new mad.Exception('No HTMLElement found for the given item.');
                }
                break;

            default:
            case 'first':
            case 'last':
                // By default retrieve the content HTML element of the grid as reference element.
                $refElement = $('tbody', this.element);
                break;
        }

        // Render the row.
        row = this._renderRow(item);

        // Insert the row html fragment in the grid.
        $item = HtmlHelper.create($refElement, position, row);
        // Associate to the item to the just created node
        DomData.set.call($item[0], control.getItemClass().shortName, item);

        return $item;
    },

    /**
     * Refresh an item.
     * @param {mad.model.Model} item The item to refresh
     */
    refreshItem: function (item) {
        // Get the HTML Element which represents the item.
        var $current = this.getItemElement(item);

        // Render the row with the new item values.
        var row = this._renderRow(item);

        // Replace the previous row with the new one.
        var $item = HtmlHelper.create($current, 'replace_with', row);
        // Associate to the item to the just created node
        DomData.set.call($item[0], this.getController().getItemClass().shortName, item);
    },

    /**
     * Move an item to another position in the grid.
     * @param item The item to move
     * @param position The position to move the item to
     */
    moveItem: function (item, position) {
        var $el = this.getItemElement(item),
            $detachedEl = $el.detach(),
            $refEl = $('tbody tr', this.element).eq(position);

        if ($refEl.length) {
            $refEl.before($detachedEl);
        } else {
            $('tbody', this.element).append($detachedEl);
        }
    },

    /**
     * Mark the column as sorted
     * @param columnModel
     * @param sortAsc
     */
    markColumnAsSorted: function (columnModel, sortAsc) {
        var cssClasses = 'sorted ';
        cssClasses += sortAsc ? 'sort-asc' : 'sort-desc';
        this.markAsUnsorted();
        $('.js_grid_column_' + columnModel.name, this.element).addClass(cssClasses);
    },

    /**
     * Mark the grid as unsorted.
     */
    markAsUnsorted: function() {
        $('.sortable.sorted', this.element).removeClass('sorted sort-asc sort-desc');
    },

    /* ************************************************************** */
    /* LISTEN TO THE VIEW EVENTS */
    /* ************************************************************** */

    /**
     * A sort is requested on a column
     * @param {HTMLElement} el The element the event occurred on
     * @param {HTMLEvent} ev The event that occurred
     */
    'thead th.sortable click': function (el, ev) {
        var columnModel = null,
            control = this.getController(),
            sortAsc = true;

        // If the column is already sorted.
        if ($(el).hasClass('sorted')) {
            if ($(el).hasClass('sort-desc')) {
                sortAsc = true;
            } else {
                sortAsc = false;
            }
        }

        columnModel = DomData.get.call(el, control.getColumnModelClass().shortName);
        $(this.element).trigger('column_sort', [columnModel, sortAsc, ev]);
    },

    /**
     * An item has been selected
     * @param {HTMLElement} el The element the event occurred on
     * @param {HTMLEvent} ev The event that occurred
     */
    'tbody tr click': function (el, ev) {
        var data = null,
            control = this.getController(),
            itemClass = control.getItemClass();

        if (itemClass) {
            data = DomData.get.call(el, itemClass.shortName);
        } else {
            data = el.id.replace(control.options.prefixItemId, '');
        }

        $(this.element).trigger('item_selected', [data, ev]);
    },

    /**
     * An item has been hovered
     *
     * @param {HTMLElement} el The element the event occurred on
     * @param {HTMLEvent} ev The event that occurred
     */
    'tbody tr hover': function (el, ev) {
        var data = null,
            control = this.getController(),
            itemClass = control.getItemClass();

        if (itemClass) {
            data = DomData.get.call(el, itemClass.shortName);
        } else {
            data = el.id.replace(control.options.prefixItemId, '');
        }

        $(this.element).trigger('item_hovered', [data, ev]);
    }

});

export default Grid;

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
import DomData from 'can-dom-data';
import domEvents from 'can-dom-events';
import View from 'passbolt-mad/view/view';
import HtmlHelper from 'passbolt-mad/helper/html';

/**
 * @inherits mad.View
 */
const Grid = View.extend('mad.view.component.Grid', /* @static */ {}, /** @prototype */ {

  /**
   * Flush the grid
   */
  reset: function() {
    $('tbody tr', this.element).remove();
  },

  /**
   * Hide a column
   * @param {string} columnName The column name to hide
   */
  hideColumn: function(columnName) {
    $(`.js_grid_column_${columnName}`, this.element).hide();
  },

  /**
   * Show a column
   * @param {string} columnName The column name to show
   */
  showColumn: function(columnName) {
    $(`.js_grid_column_${columnName}`, this.element).show();
  },

  /**
   * Select an item
   * @param {DefineMap} item The selected item instance or its id
   */
  selectItem: function(item) {
    const $item = this.getItemElement(item);
    $item.addClass('selected');
  },

  /**
   * Unselect an item
   * @param {DefineMap} item The unselected item instance or its id
   */
  unselectItem: function(item) {
    const $item = this.getItemElement(item);
    $item.removeClass('selected');
  },

  /**
   * Unselect all.
   */
  unselectAll: function() {
    $('tr.selected', this.element).removeClass('selected');
  },

  /**
   * An item has been right selected
   * @param {DefineMap} item The selected item instance or its id
   */
  // eslint-disable-next-line no-unused-vars
  rightSelectItem: function(item) {
  },

  /**
   * An item has been hovered
   * @param {DefineMap} item The selected item instance or its id
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event that occurred
   */
  // eslint-disable-next-line no-unused-vars
  hoverItem: function(item, el, ev) {
  },

  /**
   * Remove an item from the grid
   * @param {DefineMap} item The item to remove
   */
  removeItem: function(item) {
    const $item = this.getItemElement(item);
    $item.remove();
  },

  /**
   * Hide an item.
   * @param {DefineMap} item The item to hide.
   */
  hideItem: function(item) {
    const $item = this.getItemElement(item);
    $item.hide();
  },

  /**
   * Show an item.
   * @param {DefineMap} item The item to show.
   */
  showItem: function(item) {
    const $item = this.getItemElement(item);
    $item.show();
  },

  /**
   * Render a row for a given item
   * @param {DefineMap} item
   */
  _renderRow: function(item) {
    const control = this.getController();
    const columnModels = control.getColumnModel();
    const mappedItem = control.getMap().mapObject(item);

    // Render the row with the row data.
    return View.render(control.options.itemTemplate, {
      item: item,
      id: control.options.prefixItemId + mappedItem.id,
      columnModels: columnModels,
      mappedItem: mappedItem,
      cellTemplate: control.options.cellTemplate
    });
  },

  /**
   * Get the HtmlElement that has been drawn for an item.
   * @param {DefineMap} item The item to get the element for.
   * @return {jQuery}
   */
  getItemElement: function(item) {
    return $(`#${this.getController().options.prefixItemId}${item.id}`, this.element);
  },

  /**
   * Insert an item into the grid
   * @param {DefineMap} item The item to insert in the grid
   * @param {DefineMap} refItem (optional) The reference item to use to position the new item.
   * By default the item will be inserted as last element of the grid.
   * @param {string} position (optional) If the reference item has been defined. The position
   * of the item to insert, regarding the reference item.
   */
  insertItem: function(item, refItem, position) {
    // By default position the new element inside as final element
    position = position || 'last';
    let $item = null;
    let $refElement = null;
    let row = '';
    const control = this.getController();

    /*
     * Adapt the insertion strategy regarding the reference element and the desired position.
     * By default the new item will be inserted as last elemement of the grid.
     */
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
    DomData.set($item[0], control.getItemClass().shortName, item);

    return $item;
  },

  /**
   * Refresh an item.
   * @param {DefineMap} item The item to refresh
   */
  refreshItem: function(item) {
    const $current = this.getItemElement(item);
    const row = this._renderRow(item);
    const $item = HtmlHelper.create($current, 'replace_with', row);
    DomData.set($item[0], this.getController().getItemClass().shortName, item);
  },

  /**
   * Move an item to another position in the grid.
   * @param {DefineMap} item The item to move
   * @param {string} position The position to move the item to
   */
  moveItem: function(item, position) {
    const $el = this.getItemElement(item);
    const $detachedEl = $el.detach();
    const $refEl = $('tbody tr', this.element).eq(position);

    if ($refEl.length) {
      $refEl.before($detachedEl);
    } else {
      $('tbody', this.element).append($detachedEl);
    }
  },

  /**
   * Mark the column as sorted
   * @param {Column} columnModel
   * @param {boolean} sortAsc
   */
  markColumnAsSorted: function(columnModel, sortAsc) {
    let cssClasses = 'sorted ';
    cssClasses += sortAsc ? 'sort-asc' : 'sort-desc';
    this.markAsUnsorted();
    $(`.js_grid_column_${columnModel.name}`, this.element).addClass(cssClasses);
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
  '{element} thead th.sortable click': function(el, ev) {
    const control = this.getController();
    let sortAsc = true;
    const columnModel = DomData.get(el, control.getColumnModelClass().shortName);

    // If the column is already sorted.
    if ($(el).hasClass('sorted')) {
      if ($(el).hasClass('sort-desc')) {
        sortAsc = true;
      } else {
        sortAsc = false;
      }
    }

    domEvents.dispatch(this.element, {type: 'column_sort', data: {columnModel: columnModel, sort: sortAsc, srcEv: ev}});
  },

  /**
   * An item has been selected
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event that occurred
   */
  '{element} tbody tr click': function(el, ev) {
    let data;
    const control = this.getController();
    const itemClass = control.getItemClass();

    if (itemClass) {
      data = DomData.get(el, itemClass.shortName);
    } else {
      data = el.id.replace(control.options.prefixItemId, '');
    }

    domEvents.dispatch(this.element, {type: 'item_selected', data: {item: data, srcEv: ev}});
  },

  /**
   * An item has been hovered
   *
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event that occurred
   */
  '{element} tbody tr hover': function(el, ev) {
    let data;
    const control = this.getController();
    const itemClass = control.getItemClass();

    if (itemClass) {
      data = DomData.get(el, itemClass.shortName);
    } else {
      data = el.id.replace(control.options.prefixItemId, '');
    }

    domEvents.dispatch(this.element, {type: 'item_hovered', data: {item: data, srcEv: ev}});
  }

});

export default Grid;

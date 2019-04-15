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
import Component from 'passbolt-mad/component/component';
import DomData from 'can-dom-data';
import getObject from 'can-util/js/get/get';
import GridColumn from 'passbolt-mad/model/map/grid_column';
import GridState from 'passbolt-mad/model/state/gridState';
import GridView from 'passbolt-mad/view/component/grid';

import columnHeaderTemplate from 'passbolt-mad/view/template/component/grid/gridColumnHeader.stache!';
import template from 'passbolt-mad/view/template/component/grid/grid.stache!';
import itemTemplate from 'passbolt-mad/view/template/component/grid/gridItem.stache!';
import cellTemplate from 'passbolt-mad/view/template/component/grid/gridCell.stache!';

import 'passbolt-mad/view/helper/stache/grid/grid_cell.js';

/**
 * @parent Mad.components_api
 * @inherits mad.Component
 * @group mad.component.Grid.view_events 0 View Events
 *
 * The Grid Component as for aim to display a data grid.
 * @todo TBD
 */
const Grid = Component.extend('mad.component.Grid', {

  defaults: {
    // Override the label option.
    label: 'Grid Component',
    // Override the cssClasses option.
    cssClasses: ['tableview'],
    // Override the tag option.
    tag: 'div',
    // Override the template option.
    template: template,
    // The component header column template.
    columnHeaderTemplate: columnHeaderTemplate,
    // The component item template.
    itemTemplate: itemTemplate,
    // The component cell template.
    cellTemplate: cellTemplate,
    // Override the viewClass option.
    viewClass: GridView,
    stateClass: GridState,
    // Prefix the id of each row.
    prefixItemId: '',
    // The Model Class that defines the items displayed by the grud.
    itemClass: null,
    // The Map Class used to defined the column model.
    columnModelClass: GridColumn,
    // the grid column model
    columnModel: [],
    // The map used to transform the raw data into expected view format.
    map: null,
    // The callbacks the component offers to the dev to bind their code.
    callbacks: {
      // An item is left click selected.
      item_selected: null,
      // An item is hovered.
      item_hovered: null
    },
    // The items the grid works with.
    items: null,
    // Is the grid sorted.
    isSorted: false,
    // Paginate the items
    paginate: false,
    itemsByPage: 50,
    displayedPages: {
      first: 0,
      last: 0
    },
    // Fade in animation when rendering the first set of items
    fadeInTimeout: 250
  }

}, /** @prototype */ {

  /**
   * @inheritdoc
   */
  init: function(el, options) {
    options.items = new options.itemClass.List();
    options.sourceItems = new options.itemClass.List();
    this._super(el, options);
    this.mappedItems = {};
    this.on();
  },

  /**
   * @inheritdoc
   */
  _initState: function(options) {
    this._super(options);
    this.state.on('filtered', (ev, filtered) => this.onFilteredChange(filtered));
    this.state.on('filtering', (ev, filtering) => this.onFilteringChange(filtering));
  },

  /**
   * Observe when the component is filtered / unfiltered
   * @param {boolean} started True if filtered, false otherwise
   */
  onFilteredChange: function(filtered) {
    if (filtered) {
      $(this.element).addClass('filtered');
    } else {
      $(this.element).removeClass('filtered');
    }
  },

  /**
   * Observe when the component is filtering / stop the filtering
   * @param {boolean} started True if filtering, false otherwise
   */
  onFilteringChange: function(filtering) {
    if (filtering) {
      $(this.element).addClass('filtering');
    } else {
      $(this.element).removeClass('filtering');
    }
  },

  /**
   * @inheritdoc
   */
  start: function() {
    if (!this.options.map) {
      throw new Error('A map is required.');
    }
    this._super();
  },

  /**
   * @inheritdoc
   */
  afterStart: function() {
    this._afterColumnRender();
    this._initEventListener();
    this._super();
  },

  /**
   * Associate columnModel definitions to corresponding DOM elements th column header.
   * It will be used by the view to retrieve associated column model definition.
   * @private
   */
  _afterColumnRender: function() {
    const columnModel = this.getColumnModel();
    for (const i in columnModel) {
      const $el = $(`th.js_grid_column_${columnModel[i].name}`, this.element);
      DomData.set($el[0], this.getColumnModelClass().constructor.shortName, columnModel[i]);
    }
  },

  /**
   * Init the component event listener
   * @private
   */
  _initEventListener: function() {
    $('.tableview-content', this.element).scroll(ev => this._handleTableContentScroll(ev));
  },

  /**
   * Observe when the component is loaded
   * @param {boolean} loaded True if loaded, false otherwise
   */
  onLoadedChange: function(loaded) {
    this._super(loaded);
    // Hide the table while loading.
    const table = $('.tableview-content table', this.element);
    if (!loaded) {
      table.hide();
    } else {
      table.show();
    }
  },

  /**
   * @inheritdoc
   */
  beforeRender: function() {
    this.setViewData('columnModel', this.options.columnModel);
    this.setViewData('columnHeaderTemplate', this.options.columnHeaderTemplate);
    this.setViewData('items', []);
    this._super();
  },

  /**
   * Get a target column model of the grid.
   * If no target
   *
   * @param {string} name (optional) The name of the column model to retrieve, if not provided return all.
   * @return {Column}
   */
  getColumnModel: function(name) {
    let returnValue = null;
    if (name != undefined) {
      for (const i in this.options.columnModel) {
        if (this.options.columnModel[i].name == name) {
          return this.options.columnModel[i];
        }
      }
    } else {
      returnValue = this.options.columnModel;
    }
    return returnValue;
  },

  /**
   * Get the itemClass which represents the items managed by the component.
   *
   * @return {DefineMap.prototype}
   */
  getItemClass: function() {
    return this.options.itemClass;
  },

  /**
   * Get the column model class.
   *
   * @return {DefineMap.prototype}
   */
  getColumnModelClass: function() {
    return this.options.columnModelClass;
  },

  /**
   * Get the associated map, which will be used to map the model data to the
   * expected view format.
   *
   * @return {mad.object.Map}
   */
  getMap: function() {
    return this.options.map;
  },

  /**
   * Select an item.
   *
   * @param {DefineMap}
   */
  selectItem: function(item) {
    this.view.selectItem(item);
  },

  /**
   * Right select an item.
   * @param {DefineMap}
   */
  rightSelectItem: function(item) {
    this.view.rightSelectItem(item);
  },

  /**
   * Unselect an item.
   * @param {DefineMap}
   * @todo unselectItem calls the unselectAll view function, check where this function is used and correct this logic problem.
   */
  // eslint-disable-next-line no-unused-vars
  unselectItem: function(item) {
    this.view.unselectAll();
  },

  /**
   * Hover an item.
   * @param {DefineMap}
   */
  hoverItem: function(item) {
    this.view.hoverItem(item);
  },

  /**
   * Unselect all the previously selected items.
   */
  unselectAll: function() {
    this.view.unselectAll();
  },

  /**
   * Remove an item from the grid.
   * @param {DefineMap} item The item to remove
   */
  removeItem: function(item) {
    const items = this.options.items;
    let index = -1;
    items.forEach((_item, i) => {
      if (_item.id == item.id) {
        index = i;
      }
    });
    if (index != -1) {
      items.splice(index, 1);
      delete this.mappedItems[item.id];
      if (this.isItemDisplayed(item)) {
        this.view.removeItem(item);
      }
      this.state.empty = items.length == 0;
    }
  },

  /**
   * Assert an item is an instance of the ItemClass defined as option
   * @param {DefineMap} item
   * @private
   */
  _assertItemClass: function(item) {
    const itemClass = this.getItemClass();
    if (itemClass && !(item instanceof itemClass)) {
      throw new Error('Expect the item to be an instance of the ItemClass defined in optoin');
    }
  },

  /**
   * Insert an item into the grid.
   *
   * @param {DefineMap} item The item to insert
   * @param {DefineMap} refItem (optional) The reference item to use to position the new item.
   * By default the item will be inserted as last element of the grid.
   * @param {string} position (optional) If the reference item has been defined. The position of the item to insert,
   * regarding the reference item. Available values : before, after, first, last. By default last.
   * @param {boolean} render Render the row if true. By default true.
   * @param {object} options
   * - hidden: Render the item in the DOM, but hide it.
   */
  insertItem: function(item, refItem, position, render, options) {
    render = render != undefined ? render : true;
    this._assertItemClass(item);
    this.state.loaded = false;
    this.options.items.push(item);
    this._mapItem(item);
    if (render) {
      this._renderItem(item, refItem, position, options);
    }
    this.state.loaded = true;
    this.state.empty = false;
  },

  /**
   * Check if an item is displayed
   * @param {DefineMap} item
   * @return {boolean}
   */
  isItemDisplayed: function(item) {
    return this.view.getItemElement(item).length;
  },

  /**
   * Refresh an item.
   * @param {DefineMap} item The item to refresh
   */
  refreshItem: function(item) {
    this._assertItemClass(item);
    const options = {};
    const mappedItem = this.getMap().mapObject(item);
    this.mappedItems[item.id] = mappedItem;

    if (this.isItemDisplayed(item)) {
      const hidden = this.view.getItemElement(item).hasClass('hidden');
      options.hidden = hidden;
      this.view.refreshItem(item, options);
      this._afterRenderItem(item, mappedItem);
    }
  },

  /**
   * Load items in the grid. If the grid contain items, reset it.
   * @param {array<DefineMap>} data The list of items to insert in the grid
   * @param {object} options
   * - filter: Filter the items
   *   filter.keywords {string}: The keywords to filter on
   *   filter.fields {array}: The fields to filter on
   * @return {Promise}
   */
  load: function(data, options) {
    options = options || {};
    const sourceItems = this.options.sourceItems;
    const items = this.options.items;
    this.reset();
    data.forEach(item => items.push(item));
    data.forEach(item => sourceItems.push(item));
    this._mapItems(items);
    this.state.empty = items.length == 0;

    if (options.filter) {
      return this.filterByKeywords(options.filter.keywords, options.filter.fields);
    } else {
      this.state.loaded = false;
      return this._renderItems(options).then(() => {
        this.state.loaded = true;
      });
    }
  },

  /**
   * Render items.
   * @param {object} options The options
   * @returns {Promise}
   * @private
   */
  _renderItems: function(options) {
    options = options || {};
    const items = this.options.items;
    const paginate = this.options.paginate;
    const itemsByPage = this.options.itemsByPage;
    const table = $('.tableview-content table', this.element);
    let itemsToRender, page;

    table.hide();

    if (!paginate) {
      itemsToRender = items;
    } else {
      page = 1;
      const visibleItemId = options.visibleItemId;
      if (visibleItemId) {
        const visibleItemIndex = items.indexOf({id: visibleItemId});
        if (visibleItemIndex > 0) {
          page = Math.ceil((visibleItemIndex + 1) / itemsByPage);
        }
      }
      this.options.displayedPages.first = page;
      this.options.displayedPages.last = page;
      itemsToRender = items.slice((page - 1) * itemsByPage, (page) * itemsByPage);
    }

    return new Promise(resolve => {
      // The timeout makes the UX smoother.
      setTimeout(() => {
        itemsToRender.forEach(item => {
          this._renderItem(item);
        });
        table.fadeIn(this.options.fadeInTimeout, () => {
          // Scroll to 1 px, it will allow the infinite top pagination if any.
          this.bufferPreviousPage();
          this.bufferNextPage();
          // Allow the user to scroll to top by initializing the component with a scroll of 1px.
          const pageCount = Math.ceil(items.length / itemsByPage);
          // If last page is displayed, to prevent the case where there is not enough element in the page to scroll of 1px.
          if (page != 1 && pageCount == page) {
            this._handleTableContentScrollTop();
            this.scrollToItem(itemsToRender[0]);
          } else {
            $('.tableview-content').scrollTop(1);
          }
          resolve();
        });
      });
    });
  },

  /**
   * Scroll the grid to the given item
   * @param {DefineMap} item The item to scrollTo
   */
  scrollToItem: function(item) {
    const itemElement = this.view.getItemElement(item);
    $('.tableview-content', this.element).scrollTop($(itemElement).position().top);
  },

  /**
   * Buffer the previous page in the DOM.
   */
  bufferPreviousPage: function() {
    const items = this.options.items;
    const paginate = this.options.paginate;
    const pageToBuffer = this.options.displayedPages.first - 1;
    const itemsByPage = this.options.itemsByPage;

    // If pagination is disabled or there is nothing to buffer
    if (!paginate || pageToBuffer < 0) {
      return;
    }

    const itemsToBuffer = items.slice((pageToBuffer - 1) * itemsByPage, pageToBuffer * itemsByPage);
    let previousItem = DomData.get($('.tableview-content tr:first', this.element)[0], this.options.itemClass.shortName);
    itemsToBuffer.reverse().forEach(item => {
      this._renderItem(item, previousItem, 'before', {hidden: true, css: ['buffer-before']});
      previousItem = item;
    });
  },

  /**
   * Buffer the next page in the DOM.
   */
  bufferNextPage: function() {
    const items = this.options.items;
    const paginate = this.options.paginate;
    const itemsByPage = this.options.itemsByPage;
    const pageToBuffer = this.options.displayedPages.last + 1;
    const totalPage = Math.ceil(items.length / itemsByPage);

    // If pagination is disabled or there is nothing to buffer.
    if (!paginate || pageToBuffer > totalPage) {
      return;
    }

    const itemsToBuffer = items.slice((pageToBuffer - 1) * itemsByPage, pageToBuffer * itemsByPage);
    itemsToBuffer.forEach(item => {
      this._renderItem(item, null, null, {hidden: true, css: ['buffer-after']});
    });
  },

  /**
   * Render an item in the DOM
   * @param {DefineMap} item The item to insert
   * @param {DefineMap} refItem (optional) The reference item to use to position the new item.
   * By default the item will be inserted as last element of the grid.
   * @param {string} position (optional) If the reference item has been defined. The position of the item to insert,
   * regarding the reference item. Available values : before, after, first, last. By default last.
   * @param {object} options
   * - hidden: Render the item in the DOM, but hide it.
   * @private
   */
  _renderItem: function(item, refItem, position, options) {
    options = options || {};
    const mappedItem = this.mappedItems[item.id];
    this.view.insertItem(item, refItem, position, options);
    this._afterRenderItem(item, mappedItem);
  },

  /**
   * After an item has been rendered hook.
   * @param {DefineMap} item The item to insert
   * @param {object} mappedItem Mapped item values
   * @private
   */
  _afterRenderItem: function(item, mappedItem) {
    const columnModels = this.getColumnModel();
    for (const j in columnModels) {
      const columnModel = columnModels[j];

      // Execute post cell rendered function if any.
      if (columnModel.afterRender) {
        const itemId = this.options.prefixItemId + mappedItem.id;
        const $cell = $(`#${itemId} .js_grid_column_${columnModel.name} div`);
        const cellValue = mappedItem[columnModel.name];
        columnModel.afterRender($cell, cellValue, mappedItem, item, columnModel);
      }
    }
  },

  /**
   * Handle table content scroll
   * @private
   */
  _handleTableContentScroll: function() {
    if (!this.options.paginate) {
      return;
    }

    const tableElement = $('.tableview-content', this.element);
    const tableContentElement = $('.tableview-content table', this.element);
    const scrollPercent = (tableElement.scrollTop() / (tableContentElement.height() - tableElement.height())) * 100;

    if (scrollPercent == 0) {
      this._handleTableContentScrollTop();
    } else if (scrollPercent >= 100) {
      this._handleTableContentScrollBottom();
    }
  },

  /**
   * Handle infinite scroll top.
   */
  _handleTableContentScrollTop: function() {
    // If min page reach
    if (this.options.displayedPages.first == 1) {
      return;
    }
    const $topElement = $('.tableview-content tr:not(".hidden"):first', this.element);
    this._displayBufferedPage('before');
    $('.tableview-content', this.element).scrollTop($topElement.position().top);
    this.options.displayedPages.first--;

    // To ensure a nice experience, insert buffer in the DOM after 200ms.
    setTimeout(() => {
      this.bufferPreviousPage();
    }, 200);
  },

  /**
   * Handle infinite scroll bottom.
   */
  _handleTableContentScrollBottom: function() {
    const items = this.options.items;
    const itemsByPage = this.options.itemsByPage;
    const totalPage = Math.ceil(items.length / itemsByPage);
    const pageToDisplay = this.options.displayedPages.last + 1;

    // If max page reach.
    if (pageToDisplay > totalPage) {
      return;
    }

    this._displayBufferedPage('after');
    this.options.displayedPages.last++;

    // To ensure a nice experience, insert buffer in the DOM after 200ms.
    setTimeout(() => {
      this.bufferNextPage();
    }, 200);
  },

  /**
   * Reset the grid.
   * Remove all the displayed (and hidden) items.
   */
  reset: function() {
    this.options.items.splice(0, this.options.items.length);
    this.options.sourceItems.splice(0, this.options.sourceItems.length);
    this.mappedItems = {};
    this.state.filtered = false;
    this.options.isSorted = false;
    this.state.empty = false;
    this.view.reset();
  },

  /**
   * Map a list of items.
   * @param {DefineList} items The list of items to map
   * @private
   */
  _mapItems: function(items) {
    items.forEach(item => {
      this._mapItem(item);
    });
  },

  /**
   * Map an item
   * @param {DefineMap} item The item to map
   * @returns {*|Object}
   * @private
   */
  _mapItem: function(item) {
    const mappedItem = this.getMap().mapObject(item);
    this.mappedItems[item.id] = mappedItem;
    return mappedItem;
  },

  /**
   * Display the buffered page of items.
   * @param {string} position Which before should be displayed. Options: before, after.
   * @private
   */
  _displayBufferedPage: function(position) {
    $(`.tableview-content table tbody tr.hidden.buffer-${position}`, this.element)
      .removeClass(`hidden buffer-${position}`);
  },

  /**
   * Does the item exist
   * @param {DefineMap} item The item to check if it existing
   * @return {boolean}
   */
  itemExists: function(item) {
    return this.view.getItemElement(item).length > 0 ? true : false;
  },

  /**
   * Reset the filtering
   */
  resetFilter: function() {
    this.state.loaded = false;
    this.options.items = this.options.sourceItems;
    this.state.empty = this.options.items == 0;
    this.state.filtered = false;
    this.view.reset();
    return this._renderItems().then(() => {
      this.state.loaded = true;
    });
  },

  /**
   * Filter items in the grid by keywords
   * @param {string} needle The string to search in the grid
   * @param {array} fields The fields to search in
   * @return {Promise}
   */
  filterByKeywords: function(needle, fields) {
    this.state.filtering = true;
    this.state.loaded = false;
    this.view.reset();
    this.options.items = this.options.sourceItems.filterContain(needle, fields);
    this.state.empty = this.options.items.length == 0;
    return this._renderItems().then(() => {
      this.state.filtering = false;
      this.state.filtered = true;
      this.state.loaded = true;
    });
  },

  /**
   * Sort the grid functions of a given column.
   * @param {GridColumn} columnModel The column the grid should be sort in functions of.
   * @param {boolean} sortAsc Should the sort be ascending. True by default.
   * @return {Promise}
   */
  sort: function(columnModel, sortAsc) {
    const columnId = columnModel.sortOn ? columnModel.sortOn : columnModel.name;
    const items = this.options.items;

    this.state.loaded = false;
    this.view.reset();

    items.sort((itemA, itemB) => {
      const valueA = (getObject(itemA, columnId) || '').toUpperCase();
      const valueB = (getObject(itemB, columnId) || '').toUpperCase();
      if (valueA < valueB) {
        return sortAsc ? -1 : 1;
      } else if (valueA > valueB) {
        return sortAsc ? 1 : -1;
      }
      return 0;
    });

    return this._renderItems()
      .then(() => {
        this.options.isSorted = true;
        this.view.markColumnAsSorted(columnModel, sortAsc);
        this.state.loaded = true;
      });
  },

  /**
   * Move an item to another position in the grid.
   * @param item The item to move
   * @param position The position to move the item to
   */
  moveItem: function(item, position) {
    this.view.moveItem(item, position);
  },

  /* ************************************************************** */
  /* LISTEN TO THE MODEL EVENTS */
  /* ************************************************************** */

  /**
   * Observe when items are removed from the list of observed items and
   * remove it from the grid
   * @param {DefinedMap.prototype} model The model reference
   * @param {HTMLEvent} ev The event which occurred
   * @param {CanList} items The removed items
   */
  '{itemClass} destroyed': function(model, event, destroyedItem) {
    this.removeItem(destroyedItem);
  },

  /* ************************************************************** */
  /* LISTEN TO THE VIEW EVENTS */
  /* ************************************************************** */

  /**
   * Observe when a sort is requested on a column.
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event that occurred
   */
  '{element} column_sort': function(el, ev) {
    const columnModel = ev.data.columnModel;
    const sortAsc = ev.data.sortAsc;
    this.sort(columnModel, sortAsc);
  },

  /**
   * Observe when an item is selected.
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event that occurred
   */
  '{element} item_selected': function(el, ev) {
    const item = ev.data.item;
    const srcEv = ev.data.srcEv;

    // override this function, call _super if you want the default behavior processed
    if (this.options.callbacks.itemSelected) {
      this.options.callbacks.itemSelected(el, ev, item, srcEv);
    }
  },

  /**
   * Observe when an item has been hovered.
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event that occurred
   */
  '{element} item_hovered': function(el, ev) {
    const item = ev.data.item;
    const srcEv = ev.data.srcEv;

    // override this function, call _super if you want the default behavior processed
    if (this.options.callbacks.itemHovered) {
      this.options.callbacks.itemHovered(el, ev, item, srcEv);
    }
  }
});

export default Grid;

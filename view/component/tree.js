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
import View from '../view';
import HtmlHelper from '../../helper/html';

/**
 * @inherits mad.View
 */
const Tree = View.extend('mad.view.component.Tree', /** @static */ {}, /** @prototype */ {

  /**
   * Get the HtmlElement that has been drawn for an item.
   *
   * @param item The item to get the element for.
   * @return {jQuery}
   */
  getItemElement: function(item) {
    const control = this.getController();
    return $(`#${control.options.prefixItemId}${item.id}`, this.element);
  },

  /**
   * Insert an item into the tree.
   *
   * @param {mad.Model} item The item to insert.
   * @param {mad.Model} refItem (optional) The reference item to use to position the new item.
   * By default the item will be inserted at the end of the tree.
   * @param {string} position (optional) If the reference item has been defined. The position
   * of the item to insert, regarding the reference item.
   *
   * Available values : before, after, inside, first, last.
   *
   * By default last.
   *
   * @return {jQuery} The inserted HtmlElement.
   */
  insertItem: function(item, refItem, position) {
    position = position || 'last';
    let $item = null;
    let  $refElement = null;
    let itemRender = '';
    const control = this.getController();

    // Map the given item, and set view's data.
    const mappedItem = control.getMap().mapObject(item);
    if (control.options.prefixItemId != '' && control.options.prefixItemId != undefined) {
      mappedItem.id = control.options.prefixItemId +  mappedItem.id;
    }
    control.setViewData('mappedItem', mappedItem);

    // Does the item has children ?
    const hasChildren = mappedItem.children && mappedItem.children.length ? true : false;
    control.setViewData('hasChildren', hasChildren);

    // Retrieve custom item css classes.
    let cssClasses = [];
    if (typeof mappedItem['cssClasses'] != 'undefined') {
      cssClasses = cssClasses.concat(mappedItem['cssClasses']);
    }
    control.setViewData('cssClasses', cssClasses);

    // Find the HTML reference Element.
    if (refItem !== undefined && refItem !== null) {
      $refElement = this.getItemElement(refItem);
      if (!$refElement.length) {
        throw new mad.Exception.get('No HTMLElement found for the given item (%0).', [refItem.id]);
      }

      // Regarding the position and the reference element, define the reference list the item will be inserted in.
      switch (position) {
        case 'first':
        case 'last':
        case 'inside': {
          // Retrieve the first <ul> HTMLElement in the given reference element.
          const $refList = $refElement.find('ul:first');
          /*
           * The reference element doesn't have any <ul> HTMLElement. Create it.
           * It happened when the reference element was not a parent before that very moment ;) Good luck.
           */
          if (!$refList.length) {
            $refElement = $('<ul></ul>').appendTo($refElement);
          } else {
            $refElement = $refList;
          }
          break;
        }
        case 'before':
        case 'after': {
          /*
           * The HTML reference element is the one find based on the item given in parameter.
           * $refElement = $refElement
           */
          break;
        }
      }
    } else {
      /*
       * If no reference item given, the item will be inserted in the root <ul>.
       * The tree component is always associated to an <ul> HTMLElement. This is the root <ul>.
       */
      $refElement = this.element;
    }

    // Render the item.
    itemRender = View.render(control.options.itemTemplate, control.getViewData());
    // Insert it in the DOM and position it.
    $item = HtmlHelper.create($refElement, position, itemRender);
    // Associate to the item to the just created node
    DomData.set($item[0], control.getItemClass().shortName, item);

    return $item;
  },

  /**
   * Remove an item from the tree
   *
   * @param {mad.Model} item The target item to remove
   */
  removeItem: function(item) {
    this.getItemElement(item).remove();
  },

  /**
   * Refresh an item in the tree
   *
   * @param {mad.Model} item The item to refresh
   */
  refreshItem: function(item) {
    const self = this;
    let $item = this.getItemElement(item);
    const control = this.getController();

    // map the given data to the desired format
    const mappedItem = control.getMap().mapObject(item);
    mappedItem.id = control.options.prefixItemId +  mappedItem.id;
    control.setViewData('mappedItem', mappedItem);
    const hasChildren = mappedItem.children && mappedItem.children.length ? true : false;
    control.setViewData('hasChildren', hasChildren);

    // Retrieve custom item css classes.
    let cssClasses = [];
    if (typeof mappedItem['cssClasses'] != 'undefined') {
      cssClasses = cssClasses.concat(mappedItem['cssClasses']);
    }
    control.setViewData('cssClasses', cssClasses);

    // Render the item.
    const itemRender = View.render(control.options.itemTemplate, control.getViewData());
    // Replace the item row with its updated version.
    $item.replaceWith(itemRender);
    $item = this.getItemElement(item);
    // Associate to the item to the just created node.
    DomData.set($item[0], control.getItemClass().shortName, item);

    if (hasChildren) {
      item.children.forEach(item => {
        self.insertItem(item, mappedItem.id, 'last');
      });
    }

    return $item;
  },

  /**
   * Reset the view by removing all the items
   */
  reset: function() {
    if (!this.element) { return; }
    $('li', this.element).remove();
  },

  /**
   * An item has been selected
   *
   * @param {mad.Model} item The selected item instance or its id
   */
  selectItem: function(item) {
    this.unselectAll();
    const $item = this.getItemElement(item);
    $('.row:first', $item).addClass('selected');
  },

  /**
   * Unselect an item
   * @param {mixed} item The unselected item instance or its id
   */
  unselectItem: function(item) {
    const $item = this.getItemElement(item);
    $item.removeClass('selected');
  },

  /**
   * Unselect all.
   */
  unselectAll: function() {
    $('.row.selected', this.element).removeClass('selected');
  },

  /**
   * An item has been right selected
   *
   * @param {DefineMap|uuid} item The selected item instance or its id
   */
  // eslint-disable-next-line no-unused-vars
  rightSelectItem: function(item) {
  },

  /**
   * An item has been hovered
   *
   * @param {DefineMap|uuid} item The selected item instance or its id
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event that occurred
   */
  // eslint-disable-next-line no-unused-vars
  hoverItem: function(item, el, ev) {
  },

  /* ************************************************************** */
  /* LISTEN TO THE VIEW EVENTS */
  /* ************************************************************** */

  /**
   * An item has been selected
   *
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event that occurred
   */
  '{element} li .main-cell a click': function(el, ev) {
    ev.stopPropagation();
    ev.preventDefault();

    let data = null;
    const li = $(el).parents('li:first');
    const itemClass = this.getController().getItemClass();

    if (itemClass) {
      data = DomData.get(li[0], itemClass.shortName);
    } else {
      data = li[0].id;
    }

    domEvents.dispatch(this.element, {type: 'item_selected', data: {item: data, srcEv: ev}});
    return false;
  },

  /**
   * An item has been right selected
   *
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event that occurred
   */
  '{element} li a contextmenu': function(el, ev) {
    ev.stopPropagation();
    ev.preventDefault();

    if (ev.which == 3) {
      let data = null;
      const li = $(el).parents('li:first');
      const itemClass = this.getController().getItemClass();

      if (itemClass) {
        data = DomData.get(li[0], itemClass.shortName);
      } else {
        data = li[0].id;
      }

      domEvents.dispatch(this.element, {type: 'item_right_selected', data: {item: data, srcEv: ev}});
    }

    return false;
  },

  /**
   * An item has been hovered
   *
   * @param {HTMLElement} el The element the event occurred on
   * @param {HTMLEvent} ev The event that occurred
   */
  '{element} li a hover': function(el, ev) {
    ev.stopPropagation();
    ev.preventDefault();

    let data = null;
    const li = el.parents('li:first');
    const itemClass = this.getController().getItemClass();

    if (itemClass) {
      data = DomData.get(li[0], itemClass.shortName);
    } else {
      data = li[0].id;
    }

    domEvents.dispatch(this.element, {type: 'item_hovered', data: {item: data, srcEv: ev}});
    return false;
  }

});

export default Tree;

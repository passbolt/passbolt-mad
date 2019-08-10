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
import $ from 'jquery';
import "passbolt-mad/test/bootstrap";
import "passbolt-mad/test/fixture/users";
import CanControl from "can-control";
import Component from "passbolt-mad/component/component";
import DefineMap from 'passbolt-mad/model/map/map';
import getTimeAgo from 'passbolt-mad/util/time/get_time_ago';
import GridColumn from 'passbolt-mad/model/map/grid_column';
import GridComponent from "passbolt-mad/component/grid";
import HtmlHelper from 'passbolt-mad/helper/html';
import MadControl from 'passbolt-mad/control/control';
import MadMap from 'passbolt-mad/util/map/map';
import User from 'passbolt-mad/test/model/map/user';
import xss from 'passbolt-mad/test/fixture/xss';

let $grid = null;

const map = new MadMap({
  id: 'id',
  label: 'label',
  date: 'date',
  value: 'value',
  timeago: {
    key: 'date',
    func: function(value) {
      return getTimeAgo(value);
    }
  }
});

const generate_dummy_items = function(n) {
  n = n || 10;
  const items = [];
  for (let i = 0; i < n; i++) {
    items[i] = new DefineMap({
      id: `item_${i}`,
      label: `item label ${i}`,
      hiddenField: `hidden label ${i}`
    });
  }
  return items;
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const generate_alphabet_dummy_items = function() {
  const items = [];
  const alphabetCopy = alphabet.slice();
  let rand;
  let letter;

  for (var i = 0; i < alphabet.length; i++) {
    rand = Math.floor(Math.random() * alphabetCopy.length);
    letter = alphabetCopy.splice(rand, 1);

    items[i] = new DefineMap({
      id: `item_${letter}`,
      label: `item label ${letter}`
    });
  }

  return items;
};

const generate_boolean_dummy_items = function() {
  const items = [];

  for (let i = 0; i < 10; i++) {
    const boolean = (i % 2) === 0;
    const text = boolean ? 'true' : 'false';
    items[i] = new DefineMap({
      id: `item_${i}`,
      label: `item label ${text}`,
      value: boolean
    });
  }

  return items;
};

const generate_date_dummy_items = function(n) {
  const items = [];
  const start = new Date();
  start.setMonth(start.getMonth()-12);
  const end = new Date();
  for (var i = 0; i < n; i++) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const formatedDate = date.toISOString();
    const item = new DefineMap({
      id: `item_${i}`,
      label: `item label ${i}`,
      date: `${formatedDate}`
    });
    items.push(item);
  }

  return items;
};

const instantiateGrid = function(options) {
  const columnModel = [new GridColumn({
    name: 'id',
    index: 'id',
    label: 'id',
    css: ['id_custom_css']
  }), new GridColumn({
    name: 'label',
    index: 'label',
    label: 'label',
    css: ['label_custom_css']
  })];
  const _defaultOptions = {
    itemClass: DefineMap,
    map: map,
    columnModel: columnModel,
    fadeInTimeout: 0
  };
  const _options = $.extend({}, _defaultOptions, options);
  const grid = new GridComponent('#grid', _options);
  return grid;
};

describe("Grid", () => {
  beforeEach(() => {
    $grid = $('<div id="grid"></div>').appendTo($('#test-html'));
  });

  afterEach(() => {
    $('#test-html').empty();
  });

  describe("Constructor", () => {
    it("inherits phoenix", () => {
      const grid = new GridComponent('#grid', {
        itemClass: DefineMap,
        map: map
      });

      // Basic control of classes inheritance.
      expect(grid).to.be.instanceOf(CanControl);
      expect(grid).to.be.instanceOf(MadControl);
      expect(grid).to.be.instanceOf(Component);
      expect(grid).to.be.instanceOf(GridComponent);

      grid.start();
      grid.destroy();
    });
  });

  describe("start()", () => {
    it("requires a map to proceed", () => {
      const grid = new GridComponent('#grid', {
        itemClass: DefineMap
      });
      expect(() => {
        grid.start();
      }).to.throw(Error);
      grid.destroy();
    });
  });

  describe("insertItem()", () => {
    it("inserts an item into the grid", () => {
      const grid = instantiateGrid();
      grid.start();

      // Insert a first item.
      const itemInside = new DefineMap({
        id: 'item_inside',
        label: 'item inside label'
      });
      grid.insertItem(itemInside);
      expect($('#test-html').text()).to.contain(itemInside.label);

      // Insert an item before the first one.
      const itemBefore = new DefineMap({
        id: 'item_before',
        label: 'item before label'
      });
      grid.insertItem(itemBefore, itemInside, 'before');
      expect($grid.text()).to.contain(itemBefore.label);
      expect(grid.view.getItemElement(itemInside).prev().attr('id')).to.be.equal('item_before');

      // Insert an item after the before one.
      const itemAfter = new DefineMap({
        id: 'item_after',
        label: 'item after label'
      });
      grid.insertItem(itemAfter, itemBefore, 'after');
      expect($grid.text()).to.contain(itemInside.label);
      expect(grid.view.getItemElement(itemInside).prev().attr('id')).to.be.equal('item_after');
      expect(grid.view.getItemElement(itemBefore).next().attr('id')).to.be.equal('item_after');

      // Insert an item in first.
      const itemFirst = new DefineMap({
        id: 'item_first',
        label: 'item first label'
      });
      grid.insertItem(itemFirst, null, 'first');
      expect($grid.text()).to.contain(itemFirst.label);
      expect(grid.view.getItemElement(itemBefore).prev().attr('id')).to.be.equal('item_first');

      // Insert an item in last.
      const itemLast = new DefineMap({
        id: 'item_last',
        label: 'item DefineMap label'
      });
      grid.insertItem(itemLast, null, 'last');
      expect($grid.text()).to.contain(itemLast.label);
      expect(grid.view.getItemElement(itemInside).next().attr('id')).to.be.equal('item_last');

      grid.destroy();
    });

    it("inserts executes the after render function after inserting an item", () => {
      const columnModel = [new GridColumn({
        name: 'id',
        index: 'id',
        label: 'id'
      }), new GridColumn({
        name: 'label',
        index: 'label',
        label: 'label',
        afterRender: function(cellElement, cellValue, mappedItem, item, columnModel) {
          const html = `<p>Cell adapted applied : ${cellValue}</p>`;
          HtmlHelper.create(cellElement, 'inside_replace', html);
        }
      })];
      const grid = instantiateGrid({columnModel});
      grid.start();

      // Insert the item.
      const itemInside = new DefineMap({
        id: 'item',
        label: 'item label'
      });
      grid.insertItem(itemInside);
      expect($('#test-html').text()).to.contain(`Cell adapted applied : ${itemInside.label}`);

      grid.destroy();
    });
  });

  describe("load()", () => {
    it('inserts a batch of items', done => {
      const grid = instantiateGrid();
      grid.start();

      // Load items
      const items = generate_dummy_items(3);
      grid.load(items).then(() => {
        expect($grid.text()).to.contain('item label 0');
        expect($grid.text()).to.contain('item label 1');
        expect($grid.text()).to.contain('item label 2');

        grid.destroy();
        done();
      });
    });

    it('paginates the rows if the options paginate is defined to true', done => {
      const grid = instantiateGrid({paginate: true});
      grid.start();

      const items = generate_dummy_items(150);
      grid.load(items).then(() => {
        const visibleItems = $('.tableview-content tbody tr').not('.hidden');
        expect(visibleItems.length).to.be.equal(grid.options.itemsByPage);

        for (var i = 0; i<50; i++) {
          expect(visibleItems.find(`div[title="item_${i}"]`).length).to.be.not.equal(0);
        }
        const bufferItems = $('.tableview-content tbody tr.hidden');
        expect(bufferItems.length).to.be.equal(grid.options.itemsByPage);
        for (var i = 50; i<100; i++) {
          expect(bufferItems.find(`div[title="item_${i}"]`).length).to.be.not.equal(0);
        }
        for (var i = 100; i<150; i++) {
          expect($('.tableview-content tbody tr').find(`div[title="item_${i}"]`).length).to.be.equal(0);
        }

        grid.destroy();
        done();
      });
    });

    it('is able to paginates a big batch of items', done => {
      const grid = instantiateGrid({paginate: true});
      grid.start();

      const items = generate_dummy_items(20000);
      grid.load(items).then(() => {
        grid.destroy();
        done();
      });
    });
  });

  describe("refreshItem()", () => {
    it("refreshes an item row", () => {
      const grid = instantiateGrid();
      grid.start();

      // Insert a first item.
      const item = new DefineMap({
        id: 'item',
        label: 'item label'
      });
      grid.insertItem(item);
      expect($('#test-html').text()).to.contain(item.label);

      // Update the item and refresh the grid.
      item.label = 'updated item label';
      grid.refreshItem(item);
      expect($('#test-html').text()).to.contain('updated item label');

      grid.destroy();
    });

    it("refreshes a paginated & buffered item row", done => {
      const grid = instantiateGrid({
        paginate: true,
        itemsByPage: 1
      });
      grid.start();

      const items = generate_dummy_items(2);
      grid.load(items).then(() => {
        items[1].label = 'UPDATED LABEL';
        grid.refreshItem(items[1]);
        expect($('#item_1').text()).to.contain(items[1].label);
        expect($('#item_1').hasClass('hidden')).to.be.true;

        grid.destroy();
        done();
      });
    });

    it("refreshes a paginated but not yet buffered item row", done => {
      const grid = instantiateGrid({
        paginate: true,
        itemsByPage: 1
      });
      grid.start();

      const items = generate_dummy_items(3);
      grid.load(items).then(() => {
        items[2].label = 'UPDATED LABEL';
        grid.refreshItem(items[2]);
        expect($('#item_2').length).to.be.equal(0);
        grid.mappedItems['item_2'].label = items[2].label;

        grid.destroy();
        done();
      });
    });
  });

  describe("removeItem()", () => {
    it("removes item", done => {
      const grid = instantiateGrid();
      grid.start();

      // Load items.
      const items = generate_dummy_items(5);
      grid.load(items).then(() => {
        // Remove an item.
        grid.removeItem(items[2]);
        // Check that the item we removed is not present anymore, but the other are still there.
        expect($('#test-html').text()).not.to.contain(items[2].label);
        expect($('#test-html').text()).to.contain(items[0].label);
        expect($('#test-html').text()).to.contain(items[1].label);
        expect($('#test-html').text()).to.contain(items[3].label);
        expect($('#test-html').text()).to.contain(items[4].label);

        grid.destroy();
        done();
      });
    });

    it("removes a paginated & buffered item row", done => {
      const grid = instantiateGrid({
        paginate: true,
        itemsByPage: 1
      });
      grid.start();

      const items = generate_dummy_items(2);
      grid.load(items).then(() => {
        expect($('#test-html').text()).to.contain(items[1].label);
        grid.removeItem(items[1]);
        expect($('#test-html').text()).not.to.contain(items[1].label);

        grid.destroy();
        done();
      });
    });

    it("removes a paginated but not yet buffered item row", done => {
      const grid = instantiateGrid({
        paginate: true,
        itemsByPage: 1
      });
      grid.start();

      const items = generate_dummy_items(3);
      grid.load(items).then(() => {
        expect($('#test-html').text()).not.to.contain(items[2].label);
        grid.removeItem(items[2]);
        expect(grid.mappedItems[items[2]]).to.be.undefined;

        grid.destroy();
        done();
      });
    });
  });

  describe("model event listener", () => {
    it("{itemClass} destroyed: should catch when an items displayed by the grid is destroyed and remove it from the grid", done => {
      const map = new MadMap({
        id: 'id',
        label: 'username'
      });
      const grid = instantiateGrid({map: map, itemClass: User});
      grid.start();

      // Retrieve the items to insert into the grid.
      User.findAll()
        .then(items => {
          // Insert all the items into the grid
          items.forEach(item => {
            grid.insertItem(item);
            expect($('#test-html').text()).to.contain(item.username);
          });

          // Destroy an item.
          items[2].destroy()
            .then(() => {
              // Check that the item we removed is not present anymore, but the other are still there.
              expect($('#test-html').text()).not.to.contain(items[2].username);
              expect($('#test-html').text()).to.contain(items[0].username);
              expect($('#test-html').text()).to.contain(items[1].username);
              grid.destroy();
              done();
            });
        });
    });
  });

  describe("scroll event listener", () => {
    it('paginates the rows if the options paginate is defined to true', done => {
      const grid = instantiateGrid({paginate: true});
      grid.start();

      $('.tableview-content').css({'height': '300px', 'overflow': 'auto'});

      const items = generate_dummy_items(100);
      grid.load(items).then(() => {
        let visibleItems = $('.tableview-content tbody tr').not('.hidden').length;
        expect(visibleItems).to.be.equal(grid.options.itemsByPage);
        let paginatedItems = $('.tableview-content tbody tr.hidden').length;
        expect(paginatedItems).to.be.equal(grid.options.itemsByPage);

        $('.tableview-content').scrollTop($('.tableview-content table').height());
        setTimeout(() =>  {
          visibleItems = $('.tableview-content tbody tr').not('.hidden').length;
          expect(visibleItems).to.be.equal(grid.options.itemsByPage * 2);
          paginatedItems = $('.tableview-content tbody tr.hidden').length;
          expect(paginatedItems).to.be.equal(0);

          grid.destroy();
          done();
        }, 500);
      });
    });
  });

  describe("selectItem()", () => {
    it("selects an item in the grid", () => {
      const grid = instantiateGrid({callbacks: {
        itemSelected: function (el, ev, item, srcEvent) {
          grid.selectItem(item);
        }
      }});
      grid.start();

      // Insert a first item.
      const item = new DefineMap({
        id: 'item_inside',
        label: 'item inside label'
      });
      grid.insertItem(item);
      expect($('#test-html').text()).to.contain(item.label);

      // By default an item shouldn't be selected.
      const $item = $(`#test-html #${item.id}`);
      expect($item.hasClass('selected')).to.be.false;

      // Select an item by clicking on it.
      $item.trigger('click');
      expect($item.hasClass('selected')).to.be.true;

      // Unselect all items.
      grid.unselectItem(item);
      expect($item.hasClass('selected')).to.be.false;

      grid.destroy();
    });

    it("selects an item in the grid after refresh", () => {
      const grid = instantiateGrid({callbacks: {
        itemSelected: function (el, ev, item, srcEvent) {
          grid.selectItem(item);
        }
      }});
      grid.start();

      // Insert a first item.
      const item = new DefineMap({
        id: 'item_inside',
        label: 'item inside label'
      });
      grid.insertItem(item);
      item.label = 'item inside label updated';
      grid.refreshItem(item);
      expect($('#test-html').text()).to.contain(item.label);

      // By default an item shouldn't be selected.
      const $item = $(`#test-html #${item.id}`);
      expect($item.hasClass('selected')).to.be.false;

      // Select an item by clicking on it.
      $item.trigger('click');
      expect($item.hasClass('selected')).to.be.true;

      // Unselect all items.
      grid.unselectItem(item);
      expect($item.hasClass('selected')).to.be.false;

      grid.destroy();
    });
  });

  describe("filterByKeywords()", () => {
    it("filters the grid by keywords", done => {
      const grid = instantiateGrid();
      grid.start();

      const items = generate_dummy_items(5);
      const filterFields = ['id', 'label', 'hidden_label'];
      grid.load(items).then(() => {
        grid.filterByKeywords('_ item 2', filterFields).then(() => {
          let visibleItems = $('.tableview-content tbody tr').not('.hidden').length;
          expect(visibleItems).to.be.equal(1);
          let targetItem = $(`.tableview-content tbody tr#${items[2].id}`).length;
          expect(targetItem).to.be.equal(1);

          grid.destroy();
          done();
        });
      });
    });
  });

  describe("sort()", () => {
    it("marks a column as sorted", done => {
      const columnModel = [new GridColumn({
        name: 'id',
        index: 'id',
        label: 'id',
        sortable: true
      }), new GridColumn({
        name: 'label',
        index: 'label',
        label: 'label',
        sortable: true
      })];
      const grid = instantiateGrid({columnModel});
      grid.start();

      // Sortable columns should be marked as sortable.
      expect('sortable').to.be.oneOf($(`.js_grid_column_${columnModel[0].name}`, grid.element).attr('class').split(' '));
      expect('sortable').to.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));

      // Check that the grid is marked as sorted ascendingly when sorting ascendinly.
      grid.sort(columnModel[1], true).then(() => {
        expect('sorted').to.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));
        expect('sort-asc').to.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));

        // Check that the grid is marked as sorted ascendingly when sorting descendingly.
        grid.sort(columnModel[1], false).then(() => {
          expect('sorted').to.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));
          expect('sort-desc').to.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));
          expect('sort-asc').to.not.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));

          grid.sort(columnModel[0], true).then(() => {
            expect('sorted').to.be.oneOf($(`.js_grid_column_${columnModel[0].name}`, grid.element).attr('class').split(' '));
            expect('sort-asc').to.be.oneOf($(`.js_grid_column_${columnModel[0].name}`, grid.element).attr('class').split(' '));

            expect('sorted').to.not.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));
            expect('sort-desc').to.not.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));
            expect('sort-asc').to.not.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));
            done();
          });
        });
      });
    });

    it("marks the grid as unsorted after load", done => {
      const columnModel = [new GridColumn({
        name: 'id',
        index: 'id',
        label: 'id',
        sortable: true
      }), new GridColumn({
        name: 'label',
        index: 'label',
        label: 'label',
        sortable: true
      })];
      const grid = instantiateGrid({columnModel});
      grid.start();

      // Load items.
      const items = generate_dummy_items(5);
      grid.load(items).then(() => {
        // Check that the grid is marked as sorted ascendingly when sorting descendingly.
        grid.sort(columnModel[1], false).then(() => {
          expect('sorted').to.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));
          expect('sort-desc').to.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));

          // Reloading the grid should mark the grid as unsorted.
          grid.load(items);
          expect('sorted').to.not.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));
          expect('sort-desc').to.not.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));
          expect('sort-asc').to.not.be.oneOf($(`.js_grid_column_${columnModel[1].name}`, grid.element).attr('class').split(' '));
          done();
        });
      });
    });

    it("sorts content regarding a given column", done => {
      const columnModel = [new GridColumn({
        name: 'id',
        index: 'id',
        label: 'id',
        sortable: true
      }), new GridColumn({
        name: 'label',
        index: 'label',
        label: 'label',
        sortable: true
      })];
      const grid = instantiateGrid({columnModel});
      grid.start();

      // Insert items at root level.
      const items = generate_alphabet_dummy_items();
      grid.load(items).then(() => {
        // Check that the grid is sorted ascendantly.
        grid.sort(columnModel[1], true).then(() => {
          for (var i = 0; i < alphabet.length; i++) {
            expect($('tbody tr', grid.element).eq(i).html()).to.contain(`item label ${alphabet[i]}`);
          }
          // Check that the grid is sorted descendantly.
          grid.sort(columnModel[1], false).then(() => {
            for (var i = alphabet.length - 1, j = 0; i >= 0; i--, j++) {
              expect($('tbody tr', grid.element).eq(j).html()).to.contain(`item label ${alphabet[i]}`);
            }
            // Check that the grid is sorted ascendantly.
            grid.sort(columnModel[1], true).then(() => {
              for (var i = 0; i < alphabet.length; i++) {
                expect($('tbody tr', grid.element).eq(i).html()).to.contain(`item label ${alphabet[i]}`);
              }
              grid.destroy();
              done();
            });
          });
        });
      });
    });

    it("sorts content by boolean", done => {
      const columnModel = [new GridColumn({
        name: 'id',
        index: 'id',
        label: 'id',
        sortable: true
      }), new GridColumn({
        name: 'label',
        index: 'label',
        label: 'label',
        sortable: true
      }), new GridColumn({
        name: 'value',
        index: 'value',
        label: 'value',
        sortable: true
      })];
      const grid = instantiateGrid({columnModel: columnModel});
      grid.start();

      // Insert items at root level.
      const items = generate_boolean_dummy_items();
      grid.load(items).then(() => {
        // Check that the grid is in ascending order.
        grid.sort(columnModel[2], true).then(() => {
          const totalItemsCount = items.length;
          const halfItemsCount = items.length / 2;
          for (var i = 0; i < halfItemsCount; i++) {
            expect($('tbody tr', grid.element).eq(i).html()).to.contain(`item label false`);
          }
          for (var i = 5; i < totalItemsCount; i++) {
            expect($('tbody tr', grid.element).eq(i).html()).to.contain(`item label true`);
          }

          // Check that the grid is in descending order.
          grid.sort(columnModel[2], false).then(() => {
            for (var i = (totalItemsCount - 1), j = 0; i >= halfItemsCount; i--, j++) {
              expect($('tbody tr', grid.element).eq(j).html()).to.contain(`item label true`);
            }

            for (var i = (halfItemsCount - 1), j = halfItemsCount; i >= 0; i--, j++) {
              expect($('tbody tr', grid.element).eq(j).html()).to.contain(`item label false`);
            }

            // Check that the grid is sorted in ascending order.
            grid.sort(columnModel[2], true).then(() => {
              for (var i = 0; i < 5; i++) {
                expect($('tbody tr', grid.element).eq(i).html()).to.contain(`item label false`);
              }
              for (var i = 5; i < 10; i++) {
                expect($('tbody tr', grid.element).eq(i).html()).to.contain(`item label true`);
              }
              grid.destroy();
              done();
            });
          });
        });
      });
    });

    it("sorts content by dates", done => {
      const columnModel = [new GridColumn({
        name: 'id',
        index: 'id',
        label: 'id',
        sortable: true
      }), new GridColumn({
        name: 'label',
        index: 'label',
        label: 'label',
        sortable: true
      }), new GridColumn({
        name: 'date',
        index: 'date',
        label: 'date',
        sortable: true
      }), new GridColumn({
        name: 'timeago',
        index: 'timeago',
        label: 'timeago',
        sortable: true
      })];
      const grid = instantiateGrid({columnModel});
      grid.start();

      // Insert items at root level.
      const items = generate_date_dummy_items(200);
      grid.load(items).then(() => {
        // Check that the grid is sorted ascendantly.
        grid.sort(columnModel[2], true).then(() => {
          const dates = $('tbody tr td.js_grid_column_date div', grid.element);
          let previousDate = null;
          for (let i = 0; i<dates.length; i++) {
            const date = new Date($(dates[i]).html().trim());
            if (previousDate != null) {
              expect(previousDate<date).to.be.true;
            }
            previousDate = date;
          }
          done();
        });
      });
    }).timeout(10000);

    it("sorts paginated content regarding a given column", done => {
      const columnModel = [new GridColumn({
        name: 'id',
        index: 'id',
        label: 'id',
        sortable: true
      }), new GridColumn({
        name: 'label',
        index: 'label',
        label: 'label',
        sortable: true
      })];
      const grid = instantiateGrid({
        columnModel,
        paginate: true,
        itemsByPage: 5
      });
      grid.start();

      // Insert items at root level.
      const items = generate_alphabet_dummy_items();
      grid.load(items).then(() => {
        // Check that the grid is sorted ascendantly.
        grid.sort(columnModel[1], true).then(() => {
          for (var i = 0; i < 5; i++) {
            expect($('tbody tr', grid.element).eq(i).html()).to.contain(`item label ${alphabet[i]}`);
          }
          // Check that the grid is sorted descendantly.
          grid.sort(columnModel[1], false).then(() => {
            for (var i = alphabet.length - 1, j = 0; i >= 26-5; i--, j++) {
              expect($('tbody tr', grid.element).eq(j).html()).to.contain(`item label ${alphabet[i]}`);
            }
            // Check that the grid is sorted ascendantly.
            grid.sort(columnModel[1], true).then(() =>  {
              for (var i = 0; i < 5; i++) {
                expect($('tbody tr', grid.element).eq(i).html()).to.contain(`item label ${alphabet[i]}`);
              }
              grid.destroy();
              done();
            });
          });
        });
      });
    });

    it("sorts filtered items", done => {
      const columnModel = [new GridColumn({
        name: 'id',
        index: 'id',
        label: 'id',
        sortable: true
      }), new GridColumn({
        name: 'label',
        index: 'label',
        label: 'label',
        sortable: true
      })];
      const grid = instantiateGrid({
        columnModel,
        paginate: true,
        itemsByPage: 5
      });
      grid.start();

      const items = generate_dummy_items(5);
      const filterFields = ['id', 'label', 'hidden_label'];
      grid.load(items).then(() => {
        grid.filterByKeywords('_ item 2', filterFields).then(() => {
          grid.sort(columnModel[1], true).then(() => {
            let visibleItems = $('.tableview-content tbody tr').not('.hidden').length;
            expect(visibleItems).to.be.equal(1);
            let targetItem = $(`.tableview-content tbody tr#${items[2].id}`).length;
            expect(targetItem).to.be.equal(1);

            grid.destroy();
            done();
          });
        });
      });
    });
  });

  /*
   * Ensure the grid is not vulnerable to xss.
   * - When inserting an item, take care of:
   *   - The attribute id of the tr row which is given by the item id property
   *   - The cell value which is based on the mapped value, here the property exploit
   *   - The cell title which is based on the mapped column value, here the property exploit
   * - Check the row selection
   * - Check the cell selection
   */
  describe("security ", () => {
    it("is not vulnerable to XSS attack", () => {
      const columnModel = [new GridColumn({
        name: 'rule',
        index: 'rule',
        label: 'rule',
        css: ['test']
      }), new GridColumn({
        name: 'exploit',
        index: 'exploit',
        label: 'exploit'
      })];

      for (const rule in xss) {
        const grid = instantiateGrid({columnModel});
        grid.start();

        const item = new DefineMap({
          id: xss[rule],
          rule: rule,
          exploit: xss[rule]
        });

        // No Xss when inserting the item
        grid.insertItem(item);

        // No Xss when clicking on the row which as the id attribute
        $('#grid tr').trigger('click');

        // No Xss when clicking on the cell which contain the value
        $('#grid td.js_grid_column_exploit div').trigger('click');

        grid.destroy();
      }
    });
  });
});

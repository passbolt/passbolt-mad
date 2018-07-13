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
import "passbolt-mad/test/bootstrap";
import "passbolt-mad/test/fixture/users";
import CanControl from "can-control";
import Component from "passbolt-mad/component/component";
import DefineMap from 'passbolt-mad/model/map/map';
import GridColumn from 'passbolt-mad/model/grid_column';
import GridComponent from "passbolt-mad/component/grid";
import HtmlHelper from 'passbolt-mad/helper/html';
import MadControl from 'passbolt-mad/control/control';
import MadMap from 'passbolt-mad/util/map/map';
import User from 'passbolt-mad/test/model/map/user';
import xss from 'passbolt-mad/test/fixture/xss';

describe("mad.component.Grid", function () {

    // The HTMLElement which will carry the grid component.
    var $grid = null;

    // Insert a <ul> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $grid = $('<div id="grid"></div>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    /*
     * Generate dummy items
     */
    var generate_dummy_items = function(n) {
        n = n || 10;
        var items = [];
        for (var i = 0; i<n; i++) {
            items[i] = new DefineMap({
                id: 'item_' + i,
                label: 'item label ' + i,
                hiddenField: 'hidden label ' + i
            });
        }
        return items;
    };

    it("constructed instance should inherit mad.Grid & the inherited parent classes", function () {
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap
        });

        // Basic control of classes inheritance.
        expect(grid).to.be.instanceOf(CanControl);
        expect(grid).to.be.instanceOf(MadControl);
        expect(grid).to.be.instanceOf(Component);
        expect(grid).to.be.instanceOf(GridComponent);

        grid.start();
        grid.destroy();
    });

    it("insertItem() requires the map option to be defined", function () {
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap
        });
        grid.start();

        // Insert a first item.
        var itemInside = new DefineMap({
            id: 'item_inside',
            label: 'item inside label'
        });

        // Asserts.
        expect(function () {
            grid.insertItem(itemInside);
        }).to.throw(Error); // should work but doesn't : mad.Exception.get(mad.error.MISSING_OPTION, 'map')

        grid.destroy();
    });

    it("insertItem() should insert an item into the grid", function () {
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
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
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Insert a first item.
        var itemInside = new DefineMap({
            id: 'item_inside',
            label: 'item inside label'
        });
        grid.insertItem(itemInside);
        expect($('#test-html').text()).to.contain(itemInside.label);

        // Insert an item before the first one.
        var itemBefore = new DefineMap({
            id: 'item_before',
            label: 'item before label'
        });
        grid.insertItem(itemBefore, itemInside, 'before');
        expect($grid.text()).to.contain(itemBefore.label);
        expect(grid.view.getItemElement(itemInside).prev().attr('id')).to.be.equal('item_before');

        // Insert an item after the before one.
        var itemAfter = new DefineMap({
            id: 'item_after',
            label: 'item after label'
        });
        grid.insertItem(itemAfter, itemBefore, 'after');
        expect($grid.text()).to.contain(itemInside.label);
        expect(grid.view.getItemElement(itemInside).prev().attr('id')).to.be.equal('item_after');
        expect(grid.view.getItemElement(itemBefore).next().attr('id')).to.be.equal('item_after');

        // Insert an item in first.
        var itemFirst = new DefineMap({
            id: 'item_first',
            label: 'item first label'
        });
        grid.insertItem(itemFirst, null, 'first');
        expect($grid.text()).to.contain(itemFirst.label);
        expect(grid.view.getItemElement(itemBefore).prev().attr('id')).to.be.equal('item_first');

        // Insert an item in last.
        var itemLast = new DefineMap({
            id: 'item_last',
            label: 'item DefineMap label'
        });
        grid.insertItem(itemLast, null, 'last');
        expect($grid.text()).to.contain(itemLast.label);
        expect(grid.view.getItemElement(itemInside).next().attr('id')).to.be.equal('item_last');

        grid.destroy();
    });

    it("insertItem() should insert an item and execute the post rendering function", function () {
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new GridColumn({
            name: 'label',
            index: 'label',
            label: 'label',
            afterRender: function (cellElement, cellValue, mappedItem, item, columnModel) {
                var html = '<p>Cell adapted applied : ' + cellValue + '</p>';
                HtmlHelper.create(cellElement, 'inside_replace', html);
            }
        })];
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Insert the item.
        var itemInside = new DefineMap({
            id: 'item',
            label: 'item label'
        });
        grid.insertItem(itemInside);
        expect($('#test-html').text()).to.contain('Cell adapted applied : ' + itemInside.label);

        grid.destroy();
    });

    it('load() should insert several items in the grid', function () {
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Load items
        var items = generate_dummy_items(3);
        grid.load(items);

        expect($grid.text()).to.contain('item label 0');
        expect($grid.text()).to.contain('item label 1');
        expect($grid.text()).to.contain('item label 2');

        grid.destroy();
    });

    it("refreshItem() should refresh an item row with an updated items", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Insert a first item.
        var item = new DefineMap({
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

    it("removeItem() should remove an item from the grid", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Load items.
        var items = generate_dummy_items(5);
        grid.load(items);

        // Remove an item.
        grid.removeItem(items[2]);
        // Check that the item we removed is not present anymore, but the other are still there.
        expect($('#test-html').text()).not.to.contain(items[2].label);
        expect($('#test-html').text()).to.contain(items[0].label);
        expect($('#test-html').text()).to.contain(items[1].label);
        expect($('#test-html').text()).to.contain(items[3].label);
        expect($('#test-html').text()).to.contain(items[4].label);

        grid.destroy();
    });

    it("{itemClass} destroyed: should catch when an items displayed by the grid is destroyed and remove it from the grid", function(done){
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            label: 'username'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new GridComponent('#grid', {
            itemClass: User,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Retrieve the items to insert into the grid.
        User.findAll()
        .then(function(items) {
            // Insert all the items into the grid
            items.forEach(function(item) {
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

    it("selectItem() should select an item in the grid", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap,
            map: map,
            columnModel: columnModel,
            callbacks: {
                itemSelected: function(el, ev, item, srcEvent) {
                    grid.selectItem(item);
                }
            }
        });
        grid.start();

        // Insert a first item.
        var item = new DefineMap({
            id: 'item_inside',
            label: 'item inside label'
        });
        grid.insertItem(item);
        expect($('#test-html').text()).to.contain(item.label);

        // By default an item shouldn't be selected.
        var $item = $('#test-html #' + item.id);
        expect($item.hasClass('selected')).to.be.false;

        // Select an item by clicking on it.
        $item.trigger('click');
        expect($item.hasClass('selected')).to.be.true;

        // Unselect all items.
        grid.unselectItem(item);
        expect($item.hasClass('selected')).to.be.false;

        grid.destroy();
    });

    it("selectItem() should select an item in the grid after refresh", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap,
            map: map,
            columnModel: columnModel,
            callbacks: {
                itemSelected: function(el, ev, item, srcEvent) {
                    grid.selectItem(item);
                }
            }
        });
        grid.start();

        // Insert a first item.
        var item = new DefineMap({
            id: 'item_inside',
            label: 'item inside label'
        });
        grid.insertItem(item);
        item.label = 'item inside label updated';
        grid.refreshItem(item);
        expect($('#test-html').text()).to.contain(item.label);

        // By default an item shouldn't be selected.
        var $item = $('#test-html #' + item.id);
        expect($item.hasClass('selected')).to.be.false;

        // Select an item by clicking on it.
        $item.trigger('click');
        expect($item.hasClass('selected')).to.be.true;

        // Unselect all items.
        grid.unselectItem(item);
        expect($item.hasClass('selected')).to.be.false;

        grid.destroy();
    });

    it("filter() should filter the grid with the given items", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Load items.
        var items = generate_dummy_items(5);
        grid.load(items);

        // Check that the grid is not filtered.
        expect(grid.isFiltered()).to.be.false;

        // Filter the grid
        var filteredItems = new DefineMap.List([items[2], items[4]]);
        grid.filter(filteredItems);

        // Check that the grid is filtered.
        expect(grid.isFiltered()).to.be.true;

        // Check that the item we removed is not present anymore, but the other are still there.
        expect(grid.view.getItemElement(items[0]).css('display')).to.be.equal('none');
        expect(grid.view.getItemElement(items[1]).css('display')).to.be.equal('none');
        expect(grid.view.getItemElement(items[2]).css('display')).to.not.be.equal('none');
        expect(grid.view.getItemElement(items[3]).css('display')).to.be.equal('none');
        expect(grid.view.getItemElement(items[4]).css('display')).to.not.be.equal('none');

        grid.destroy();
    });

    it("filterByKeywords() should filter the grid by keywords", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Load items.
        var items = generate_dummy_items(5);
        grid.load(items);

        // Filter the grid on visible value
        grid.filterByKeywords('_ item 2');

        // Check that the item we removed is not present anymore, but the other are still there.
        expect(grid.view.getItemElement(items[0]).css('display')).to.be.equal('none');
        expect(grid.view.getItemElement(items[1]).css('display')).to.be.equal('none');
        expect(grid.view.getItemElement(items[2]).css('display')).to.not.be.equal('none');
        expect(grid.view.getItemElement(items[3]).css('display')).to.be.equal('none');
        expect(grid.view.getItemElement(items[4]).css('display')).to.be.equal('none');

        // Filter the grid on items hidden field
        var searchInFields = grid.options.map.getModelTargetFieldsNames()
            .concat(['hiddenField']);

        grid.filterByKeywords('hidden item 3', {
            searchInFields: searchInFields
        });

        // Check that the item we removed is not present anymore, but the other are still there.
        expect(grid.view.getItemElement(items[0]).css('display')).to.be.equal('none');
        expect(grid.view.getItemElement(items[1]).css('display')).to.be.equal('none');
        expect(grid.view.getItemElement(items[2]).css('display')).to.be.equal('none');
        expect(grid.view.getItemElement(items[3]).css('display')).to.not.be.equal('none');
        expect(grid.view.getItemElement(items[4]).css('display')).to.be.equal('none');

        grid.destroy();
    });

    it("sort() should mark a column as sorted", function() {
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
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
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Sortable columns should be marked as sortable.
        expect('sortable').to.be.oneOf($('.js_grid_column_' + columnModel[0].name, grid.element).attr('class').split(' '));
        expect('sortable').to.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));

        // Check that the grid is marked as sorted ascendingly when sorting ascendinly.
        grid.sort(columnModel[1], true);
        expect('sorted').to.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));
        expect('sort-asc').to.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));

        // Check that the grid is marked as sorted ascendingly when sorting descendingly.
        grid.sort(columnModel[1], false);
        expect('sorted').to.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));
        expect('sort-desc').to.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));
        expect('sort-asc').to.not.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));

        grid.sort(columnModel[0], true);
        expect('sorted').to.be.oneOf($('.js_grid_column_' + columnModel[0].name, grid.element).attr('class').split(' '));
        expect('sort-asc').to.be.oneOf($('.js_grid_column_' + columnModel[0].name, grid.element).attr('class').split(' '));

        expect('sorted').to.not.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));
        expect('sort-desc').to.not.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));
        expect('sort-asc').to.not.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));
    });

    it("sort() should sort the grid regarding a given column", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new GridColumn({
            name: 'label',
            index: 'label',
            label: 'label',
            sortable: true
        })];
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Insert items at root level.
        var items = [],
            alphabet = 'abcdefghijklmnopqrstuvwxyz'.split(''),
            alphabetCopy = alphabet.slice();

        for (var i = 0; i < alphabet.length; i++) {
            var rand = Math.floor(Math.random() * alphabetCopy.length),
                letter = alphabetCopy.splice(rand, 1);

            items[i] = new DefineMap({
                id: 'item_' + letter,
                label: 'item label ' + letter
            });
            grid.insertItem(items[i]);
        }

        // Check that the grid is sorted ascendingly.
        grid.sort(columnModel[1], true);
        for (var i = 0; i < alphabet.length; i++) {
            expect($('tbody tr', grid.element).eq(i).html()).to.contain('item label ' + alphabet[i]);
        }

        // Check that the grid is sorted descendingly.
        grid.sort(columnModel[1], false);
        for (var i = alphabet.length - 1, j=0; i >= 0; i--, j++) {
            expect($('tbody tr', grid.element).eq(j).html()).to.contain('item label ' + alphabet[i]);
        }

        // Check that the grid is sorted ascendingly.
        grid.sort(columnModel[1], true);
        for (var i = 0; i < alphabet.length; i++) {
            expect($('tbody tr', grid.element).eq(i).html()).to.contain('item label ' + alphabet[i]);
        }

        grid.destroy();
    });

    it("sort() reloading should mark the grid as unsorted", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new GridColumn({
            name: 'label',
            index: 'label',
            label: 'label',
            sortable: true
        })];
        var grid = new GridComponent('#grid', {
            itemClass: DefineMap,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Load items.
        var items = generate_dummy_items(5);
        grid.load(items);

        // Check that the grid is marked as sorted ascendingly when sorting descendingly.
        grid.sort(columnModel[1], false);
        expect('sorted').to.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));
        expect('sort-desc').to.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));

        // Reloading the grid should mark the grid as unsorted.
        grid.load(items);
        expect('sorted').to.not.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));
        expect('sort-desc').to.not.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));
        expect('sort-asc').to.not.be.oneOf($('.js_grid_column_' + columnModel[1].name, grid.element).attr('class').split(' '));

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
    it("Xss vulnerability check", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new MadMap({
            id: 'id',
            rule: 'rule',
            exploit: 'exploit'
        });
        // Set the grid columns model.
        var columnModel = [new GridColumn({
            name: 'rule',
            index: 'rule',
            label: 'rule',
            css: ['test']
        }), new GridColumn({
            name: 'exploit',
            index: 'exploit',
            label: 'exploit'
        })];

        for (var rule in xss) {
            var grid = new GridComponent('#grid', {
                itemClass: DefineMap,
                map: map,
                columnModel: columnModel
            });
            grid.start();

            var item = new DefineMap({
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

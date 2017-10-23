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
import "passbolt-mad/test/helper/model";
import "passbolt-mad/test/fixture/users";
import "passbolt-mad/component/grid";

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
            items[i] = new mad.Model({
                id: 'item_' + i,
                label: 'item label ' + i,
                hiddenField: 'hidden label ' + i
            });
        }
        return items;
    };

    it("constructed instance should inherit mad.Grid & the inherited parent classes", function () {
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model
        });

        // Basic control of classes inheritance.
        expect(grid).to.be.instanceOf(can.Control);
        expect(grid).to.be.instanceOf(mad.Control);
        expect(grid).to.be.instanceOf(mad.Component);
        expect(grid).to.be.instanceOf(mad.component.Grid);

        grid.start();
        grid.destroy();
    });

    it("insertItem() requires the map option to be defined", function () {
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model
        });
        grid.start();

        // Insert a first item.
        var itemInside = new mad.Model({
            id: 'item_inside',
            label: 'item inside label'
        });

        // Asserts.
        expect(function () {
            grid.insertItem(itemInside);
        }).to.throw(Error); // should work but doesn't : mad.Exception.get(mad.error.MISSING_OPTION, 'map')

        grid.element.empty();
        grid.destroy();
    });

    it("insertItem() should insert an item into the grid", function () {
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Insert a first item.
        var itemInside = new mad.Model({
            id: 'item_inside',
            label: 'item inside label'
        });
        grid.insertItem(itemInside);
        expect($('#test-html').text()).to.contain(itemInside.attr('label'));

        // Insert an item before the first one.
        var itemBefore = new mad.Model({
            id: 'item_before',
            label: 'item before label'
        });
        grid.insertItem(itemBefore, itemInside, 'before');
        expect($grid.text()).to.contain(itemBefore.attr('label'));
        expect(grid.view.getItemElement(itemInside).prev().attr('id')).to.be.equal('item_before');

        // Insert an item after the before one.
        var itemAfter = new mad.Model({
            id: 'item_after',
            label: 'item after label'
        });
        grid.insertItem(itemAfter, itemBefore, 'after');
        expect($grid.text()).to.contain(itemInside.attr('label'));
        expect(grid.view.getItemElement(itemInside).prev().attr('id')).to.be.equal('item_after');
        expect(grid.view.getItemElement(itemBefore).next().attr('id')).to.be.equal('item_after');

        // Insert an item in first.
        var itemFirst = new mad.Model({
            id: 'item_first',
            label: 'item first label'
        });
        grid.insertItem(itemFirst, null, 'first');
        expect($grid.text()).to.contain(itemFirst.attr('label'));
        expect(grid.view.getItemElement(itemBefore).prev().attr('id')).to.be.equal('item_first');

        // Insert an item in last.
        var itemLast = new mad.Model({
            id: 'item_last',
            label: 'item last label'
        });
        grid.insertItem(itemLast, null, 'last');
        expect($grid.text()).to.contain(itemLast.attr('label'));
        expect(grid.view.getItemElement(itemInside).next().attr('id')).to.be.equal('item_last');

        grid.element.empty();
        grid.destroy();
    });

    it("insertItem() should insert an item and apply a value adapter on its fields", function () {
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label',
            valueAdapter: function(value, mappedItem, item, columnModel) {
                return 'value adapted : ' + value;
            }
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Insert the item.
        var itemInside = new mad.Model({
            id: 'item',
            label: 'item label'
        });
        grid.insertItem(itemInside);
        expect($('#test-html').text()).to.contain('value adapted : ' + itemInside.attr('label'));

        grid.element.empty();
        grid.destroy();
    });

    it("insertItem() should insert an item and apply a cell adapter on the target cell", function () {
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label',
            cellAdapter: function (cellElement, cellValue, mappedItem, item, columnModel) {
                var html = '<p>Cell adapted applied : ' + cellValue + '</p>';
                mad.helper.Html.create(cellElement, 'inside_replace', html);
            }
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Insert the item.
        var itemInside = new mad.Model({
            id: 'item',
            label: 'item label'
        });
        grid.insertItem(itemInside);
        expect($('#test-html').text()).to.contain('Cell adapted applied : ' + itemInside.attr('label'));

        grid.element.empty();
        grid.destroy();
    });

    it('load() should insert several items in the grid', function () {
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
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


        grid.element.empty();
        grid.destroy();
    });

    it("refreshItem() should refresh an item row with an updated items", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Insert a first item.
        var item = new mad.Model({
            id: 'item',
            label: 'item label'
        });
        grid.insertItem(item);
        expect($('#test-html').text()).to.contain(item.attr('label'));

        // Update the item and refresh the grid.
        item.attr('label', 'updated item label');
        grid.refreshItem(item);
        expect($('#test-html').text()).to.contain('updated item label');

        grid.element.empty();
        grid.destroy();
    });

    it("removeItem() should remove an item from the grid", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
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
        expect($('#test-html').text()).not.to.contain(items[2].attr('label'));
        expect($('#test-html').text()).to.contain(items[0].attr('label'));
        expect($('#test-html').text()).to.contain(items[1].attr('label'));
        expect($('#test-html').text()).to.contain(items[3].attr('label'));
        expect($('#test-html').text()).to.contain(items[4].attr('label'));

        grid.element.empty();
        grid.destroy();
    });

    it("{items} remove() should catch when an items displayed by the list is destroyed and remove it from the grid", function(done){
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'username'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Insert items at root level.
        var items = [],
          savingDefs = [];

        // Retrieve the items to insert into the grid.
        mad.test.model.UserTestModel.findAll().then(function(items) {
            // Insert all the items into the grid
            can.each(items, function(item, i) {
                grid.insertItem(item);
                expect($('#test-html').text()).to.contain(item.attr('username'));
            });

            // Destroy an item.
            var destroyDef = items[2].destroy();
            $.when(destroyDef).then(function() {
                // Check that the item we removed is not present anymore, but the other are still there.
                expect($('#test-html').text()).not.to.contain(items[2].attr('username'));
                expect($('#test-html').text()).to.contain(items[0].attr('username'));
                expect($('#test-html').text()).to.contain(items[1].attr('username'));
                grid.element.empty();
                grid.destroy();
                done();
            });
        });
    });

    it("selectItem() should select an item in the grid", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
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
        var item = new mad.Model({
            id: 'item_inside',
            label: 'item inside label'
        });
        grid.insertItem(item);
        expect($('#test-html').text()).to.contain(item.attr('label'));

        // By default an item shouldn't be selected.
        var $item = $('#test-html #' + item.attr('id'));
        expect($item.hasClass('selected')).to.be.false;

        // Select an item by clicking on it.
        $item.trigger('click');
        expect($item.hasClass('selected')).to.be.true;

        // Unselect all items.
        grid.unselectItem(item);
        expect($item.hasClass('selected')).to.be.false;

        grid.element.empty();
        grid.destroy();
    });

    it("selectItem() should select an item in the grid after refresh", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
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
        var item = new mad.Model({
            id: 'item_inside',
            label: 'item inside label'
        });
        grid.insertItem(item);
        item.attr('item inside label updated');
        grid.refreshItem(item);
        expect($('#test-html').text()).to.contain(item.attr('label'));

        // By default an item shouldn't be selected.
        var $item = $('#test-html #' + item.attr('id'));
        expect($item.hasClass('selected')).to.be.false;

        // Select an item by clicking on it.
        $item.trigger('click');
        expect($item.hasClass('selected')).to.be.true;

        // Unselect all items.
        grid.unselectItem(item);
        expect($item.hasClass('selected')).to.be.false;

        grid.element.empty();
        grid.destroy();
    });

    it("filter() should filter the grid with the given items", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
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
        var filteredItems = new can.List([items[2], items[4]]);
        grid.filter(filteredItems);

        // Check that the grid is filtered.
        expect(grid.isFiltered()).to.be.true;

        // Check that the item we removed is not present anymore, but the other are still there.
        expect(grid.view.getItemElement(items[0])).to.be.$hidden;
        expect(grid.view.getItemElement(items[1])).to.be.$hidden;
        expect(grid.view.getItemElement(items[2])).to.be.$visible;
        expect(grid.view.getItemElement(items[3])).to.be.$hidden;
        expect(grid.view.getItemElement(items[4])).to.be.$visible;

        grid.element.empty();
        grid.destroy();
    });

    it("filterByKeywords() should filter the grid by keywords", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label'
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
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
        expect(grid.view.getItemElement(items[0])).to.be.$hidden;
        expect(grid.view.getItemElement(items[1])).to.be.$hidden;
        expect(grid.view.getItemElement(items[2])).to.be.$visible;
        expect(grid.view.getItemElement(items[3])).to.be.$hidden;
        expect(grid.view.getItemElement(items[4])).to.be.$hidden;

        // Filter the grid on items hidden field
        var searchInFields = grid.options.map.getModelTargetFieldsNames()
            .concat(['hiddenField']);

        grid.filterByKeywords('hidden item 2', {
            searchInFields: searchInFields
        });

        // Check that the item we removed is not present anymore, but the other are still there.
        expect(grid.view.getItemElement(items[0])).to.be.$hidden;
        expect(grid.view.getItemElement(items[1])).to.be.$hidden;
        expect(grid.view.getItemElement(items[2])).to.be.$visible;
        expect(grid.view.getItemElement(items[3])).to.be.$hidden;
        expect(grid.view.getItemElement(items[4])).to.be.$hidden;

        grid.element.empty();
        grid.destroy();
    });

    it("sort() should mark a column as sorted", function() {
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id',
            sortable: true
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label',
            sortable: true
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Sortable columns should be marked as sortable.
        expect($('.js_grid_column_' + columnModel[0].name, grid.element)).to.have.$class('sortable');
        expect($('.js_grid_column_' + columnModel[1].name, grid.element)).to.have.$class('sortable');

        // Check that the grid is marked as sorted ascendingly when sorting ascendinly.
        grid.sort(columnModel[1], true);
        expect($('.js_grid_column_' + columnModel[1].name, grid.element)).to.have.$class('sorted')
            .and.to.have.$class('sort-asc');

        // Check that the grid is marked as sorted ascendingly when sorting descendingly.
        grid.sort(columnModel[1], false);
        expect($('.js_grid_column_' + columnModel[1].name, grid.element)).to.have.$class('sorted')
            .and.to.have.$class('sort-desc')
            .and.to.not.have.$class('sort-asc');

        grid.sort(columnModel[0], true);
        expect($('.js_grid_column_' + columnModel[0].name, grid.element)).to.have.$class('sorted')
            .and.to.have.$class('sort-asc');
        expect($('.js_grid_column_' + columnModel[1].name, grid.element))
            .to.not.have.$class('sorted')
            .and.to.not.have.$class('sort-desc')
            .and.to.not.have.$class('sort-asc');
    });

    it("sort() should sort the grid regarding a given column", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label',
            sortable: true
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
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

            items[i] = new mad.Model({
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

        grid.element.empty();
        grid.destroy();
    });

    it("sort() reloading should mark the grid as unsorted", function(){
        // Set the grid map that will be used to transform the data for the view.
        var map = new mad.Map({
            id: 'id',
            label: 'label'
        });
        // Set the grid columns model.
        var columnModel = [new mad.model.GridColumn({
            name: 'id',
            index: 'id',
            label: 'id'
        }), new mad.model.GridColumn({
            name: 'label',
            index: 'label',
            label: 'label',
            sortable: true
        })];
        var grid = new mad.component.Grid($grid, {
            itemClass: mad.Model,
            map: map,
            columnModel: columnModel
        });
        grid.start();

        // Load items.
        var items = generate_dummy_items(5);
        grid.load(items);

        // Check that the grid is marked as sorted ascendingly when sorting descendingly.
        grid.sort(columnModel[1], false);
        expect($('.js_grid_column_' + columnModel[1].name, grid.element))
            .to.have.$class('sorted')
            .and.to.have.$class('sort-desc');

        // Reloading the grid should mark the grid as unsorted.
        grid.load(items);
        expect($('.js_grid_column_' + columnModel[1].name, grid.element))
            .to.not.have.$class('sorted')
            .and.to.not.have.$class('sort-desc')
            .and.to.not.have.$class('sort-asc');

    });

});

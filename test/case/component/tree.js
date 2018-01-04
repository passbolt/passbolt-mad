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
import CanControl from "can/control/control";
import Component from "passbolt-mad/component/component";
import MadControl from 'passbolt-mad/control/control';
import Model from 'passbolt-mad/model/model';
import TreeComponent from "passbolt-mad/component/tree"
import xss from 'passbolt-mad/test/fixture/xss';

describe("mad.component.Tree", function () {

    // The HTMLElement which will carry the tree component.
    var $tree = null;

    // Insert a <ul> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $tree = $('<ul id="tree"></ul>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit TreeComponent & the inherited parent classes", function () {
        var tree = new TreeComponent($tree, {
            itemClass: Model
        });

        // Basic control of classes inheritance.
        expect(tree).to.be.instanceOf(CanControl);
        expect(tree).to.be.instanceOf(MadControl);
        expect(tree).to.be.instanceOf(Component);
        expect(tree).to.be.instanceOf(TreeComponent);

        tree.start();
        tree.destroy();
    });

    it("insertItem() should insert an item into the tree", function () {
        var tree = new TreeComponent($tree, {
            itemClass: Model
        });
        tree.start();

        // Insert a first item.
        var itemInside = new Model({
            id: 'item_inside',
            label: 'item inside label'
        });
        tree.insertItem(itemInside);
        expect($('#test-html').text()).to.contain(itemInside.attr('label'));
        expect(tree.options.items.length).to.be.equal(1);

        // Insert an item before the first one.
        var itemBefore = new Model({
            id: 'item_before',
            label: 'item before label'
        });
        tree.insertItem(itemBefore, itemInside, 'before');
        expect(tree.options.items.length).to.be.equal(2);
        expect($tree.text()).to.contain(itemBefore.attr('label'));
        expect(tree.view.getItemElement(itemInside).prev().attr('id')).to.be.equal('item_before');

        // Insert an item after the before one.
        var itemAfter = new Model({
            id: 'item_after',
            label: 'item after label'
        });
        tree.insertItem(itemAfter, itemBefore, 'after');
        expect(tree.options.items.length).to.be.equal(3);
        expect($tree.text()).to.contain(itemInside.attr('label'));
        expect(tree.view.getItemElement(itemInside).prev().attr('id')).to.be.equal('item_after');
        expect(tree.view.getItemElement(itemBefore).next().attr('id')).to.be.equal('item_after');

        // Insert a child.
        var itemChildInside = new Model({
            id: 'item_child_inside',
            label: 'item child inside label'
        });
        tree.insertItem(itemChildInside, itemBefore, 'last');
        expect(tree.options.items.length).to.be.equal(4);
        expect($tree.text()).to.contain(itemChildInside.attr('label'));
        expect(tree.view.getItemElement(itemBefore).find('ul:first').children().attr('id')).to.be.equal('item_child_inside');

        // Insert a child in first position.
        var itemChildFirst = new Model({
            id: 'item_child_first',
            label: 'item child first label'
        });
        tree.insertItem(itemChildFirst, itemBefore, 'first');
        expect(tree.options.items.length).to.be.equal(5);
        expect($tree.text()).to.contain(itemChildFirst.attr('label'));
        expect(tree.view.getItemElement(itemChildInside).prev().attr('id')).to.be.equal('item_child_first');

        // Test inserting an element in first position without providing a refItem.
        var itemFirst = new Model({
            id: 'item_first',
            label: 'item first label'
        });
        tree.insertItem(itemFirst, null, 'first');
        expect(tree.options.items.length).to.be.equal(6);
        expect($tree.text()).to.contain(itemFirst.attr('label'));
        expect(tree.view.getItemElement(itemBefore).prev().attr('id')).to.be.equal('item_first');

        tree.element.empty();
        tree.destroy();
    });

    it('load() should insert several items in the tree', function () {
        var tree = new TreeComponent($tree, {
            itemClass: Model
        });
        tree.start();

        var items = new Model.List([{
            id: 'item_1',
            label: 'Item 1'
        }, {
            id: 'item_2',
            label: 'Item 2',
            children: new Model.List([{
                id: 'item_21',
                label: 'Item 21'
            }, {
                id: 'item_22',
                label: 'Item 22'
            }])
        }, {
            id: 'item_3',
            label: 'Item 3'
        }]);
        tree.load(items);
        expect(tree.options.items.length).to.be.equal(5);

        expect($tree.text()).to.contain('Item 1');
        expect($tree.text()).to.contain('Item 2');
        expect($tree.text()).to.contain('Item 21');
        expect($tree.text()).to.contain('Item 22');
        expect($tree.text()).to.contain('Item 3');
    });

    it("removeItem() should remove an item from the tree - root level", function () {
        var tree = new TreeComponent($tree, {
            itemClass: Model
        });
        tree.start();

        // Insert items at root level.
        var items = [];
        for (var i = 0; i < 5; i++) {
            items[i] = new Model({
                id: 'item_inside_' + i,
                label: 'item inside label ' + i
            });
            tree.insertItem(items[i]);
            expect($('#test-html').text()).to.contain(items[i].attr('label'));
            expect(tree.options.items.length).to.be.equal(i+1);
        }

        // Remove an item.
        tree.removeItem(items[2]);
        expect(tree.options.items.length).to.be.equal(4);
        // Check that the item we removed is not present anymore, but the other are still there.
        expect($('#test-html').text()).not.to.contain(items[2].attr('label'));
        expect($('#test-html').text()).to.contain(items[0].attr('label'));
        expect($('#test-html').text()).to.contain(items[1].attr('label'));
        expect($('#test-html').text()).to.contain(items[3].attr('label'));
        expect($('#test-html').text()).to.contain(items[4].attr('label'));

        tree.element.empty();
        tree.destroy();
    });

    it("removeItem() should remove an item from the tree - nested levels", function () {
        var tree = new TreeComponent($tree, {
            itemClass: Model
        });
        tree.start();

        // Insert items an child items.
        var items = [];
        var subItems = [];
        for (var i = 0; i < 5; i++) {
            items[i] = new Model({
                id: 'item_inside_' + i,
                label: 'item inside label ' + i
            });
            tree.insertItem(items[i]);
            expect($('#test-html').text()).to.contain(items[i].attr('label'));

            // Insert nested element.
            subItems[i] = [];
            for (var j = 0; j < 5; j++) {
                subItems[i][j] = new Model({
                    id: 'sub_item_inside_' + i + '_' + j,
                    label: 'sub item label ' + i + ' ' + j
                });
                tree.insertItem(subItems[i][j], items[i]);
                expect($('#test-html').text()).to.contain(subItems[i][j].attr('label'));
            }
        }

        var itemsCount = i + i * j;
        expect(tree.options.items.length).to.be.equal(itemsCount);

        // Remove an item.
        tree.removeItem(subItems[2][2]);
        expect(tree.options.items.length).to.be.equal(itemsCount - 1);
        // Check that the item we removed is not present anymore, but the other are still there.
        expect($('#test-html').text()).not.to.contain(subItems[2][2].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[2][0].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[2][1].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[2][3].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[2][4].attr('label'));
        expect($('#test-html').text()).to.contain(items[0].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[0][0].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[0][1].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[0][2].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[0][3].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[0][4].attr('label'));
        expect($('#test-html').text()).to.contain(items[1].attr('label'));
        expect($('#test-html').text()).to.contain(items[3].attr('label'));
        expect($('#test-html').text()).to.contain(items[4].attr('label'));

        // Remove an item.
        tree.removeItem(items[4]);
        expect(tree.options.items.length).to.be.equal(itemsCount - 2);
        // Check that the item we removed is not present anymore, but the other are still there.
        expect($('#test-html').text()).not.to.contain(subItems[2][2].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[2][0].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[2][1].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[2][3].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[2][4].attr('label'));
        expect($('#test-html').text()).to.contain(items[0].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[0][0].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[0][1].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[0][2].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[0][3].attr('label'));
        expect($('#test-html').text()).to.contain(subItems[0][4].attr('label'));
        expect($('#test-html').text()).to.contain(items[1].attr('label'));
        expect($('#test-html').text()).to.contain(items[3].attr('label'));
        expect($('#test-html').text()).not.to.contain(items[4].attr('label'));
        expect($('#test-html').text()).not.to.contain(subItems[4][0].attr('label'));
        expect($('#test-html').text()).not.to.contain(subItems[4][1].attr('label'));
        expect($('#test-html').text()).not.to.contain(subItems[4][2].attr('label'));
        expect($('#test-html').text()).not.to.contain(subItems[4][3].attr('label'));
        expect($('#test-html').text()).not.to.contain(subItems[4][4].attr('label'));

        tree.element.empty();
        tree.destroy();
    });

    it("refreshItem() should refresh an item in the tree", function () {
        var tree = new TreeComponent($tree, {
            itemClass: Model
        });
        tree.start();

        // Insert a first item.
        var item = new Model({
            id: 'item_inside',
            label: 'item inside label'
        });
        tree.insertItem(item);
        expect(tree.options.items.length).to.be.equal(1);
        expect($('#test-html').text()).to.contain(item.attr('label'));

        item.attr('label', 'item inside updated label');
        tree.refreshItem(item);
        expect(tree.options.items.length).to.be.equal(1);
        expect($('#test-html').text()).to.contain(item.attr('label'));

        tree.element.empty();
        tree.destroy();
    });

    it("selectItem() should select an item in the tree", function () {
        var tree = new TreeComponent($tree, {
            itemClass: Model
        });
        tree.start();

        // Insert an item.
        var item = new Model({
            id: 'item',
            label: 'item label'
        });
        tree.insertItem(item);

        // By default an item shouldn't be selected.
        var $item = $('#test-html #' + item.attr('id'));
        expect($('.row:first', $item).hasClass('selected')).to.be.false;

        // Select an item manually and test that it has been selected.
        tree.selectItem(item);
        expect($('.row:first', $item).hasClass('selected')).to.be.true;

        // Unselect all items.
        tree.unselectItem(item);
        expect($('.row:first', $item).hasClass('selected')).to.be.false;

        // Select an item by clicking on it.
        $('a', $item).trigger('click');
        expect($('.row:first', $item).hasClass('selected')).to.be.true;

        tree.element.empty();
        tree.destroy();
    });

    it("selectItem() should select an item in the tree after refresh", function () {
        var tree = new TreeComponent($tree, {
            itemClass: Model
        });
        tree.start();

        // Insert an item.
        var item = new Model({
            id: 'item',
            label: 'item label'
        });
        tree.insertItem(item);
        item.attr('label', 'item label updated');
        tree.refreshItem(item);

        // By default an item shouldn't be selected.
        var $item = $('#test-html #' + item.attr('id'));
        expect($('.row:first', $item).hasClass('selected')).to.be.false;

        // Select an item manually and test that it has been selected.
        tree.selectItem(item);
        expect($('.row:first', $item).hasClass('selected')).to.be.true;

        // Unselect all items.
        tree.unselectItem(item);
        expect($('.row:first', $item).hasClass('selected')).to.be.false;

        // Select an item by clicking on it.
        $('a', $item).trigger('click');
        expect($('.row:first', $item).hasClass('selected')).to.be.true;

        tree.element.empty();
        tree.destroy();
    });

    /*
     * Ensure the grid is not vulnerable to xss.
     * - When inserting an item, take care of:
     *   - The attribute id of the li row which is based by the item id property
     *   - The cell value which is based on the mapped value, here the property label
     * - Check the item selection
     */
    it.only("Xss vulnerability check", function(){
        for (var rule in xss) {
            var tree = new TreeComponent($tree, {
                itemClass: Model
            });
            tree.start();

            var item = new Model({
                id: xss[rule],
                label: xss[rule]
            });

            // No Xss when inserting the item
            tree.insertItem(item);

            // No Xss when clicking on the row which as the id attribute
            $('#tree li').trigger('click');

            tree.element.empty();
            tree.destroy();
        }
    });

});

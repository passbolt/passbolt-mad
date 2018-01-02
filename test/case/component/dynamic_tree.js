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
import DynamicTreeComponent from "passbolt-mad/component/dynamic_tree"
import MadControl from 'passbolt-mad/control/control';
import Model from 'passbolt-mad/model/model';
import TreeComponent from 'passbolt-mad/component/tree';

describe("mad.component.DynamicTree", function () {

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

    it("constructed instance should inherit mad.component.Tree & the inherited parent classes", function () {
        var tree = new DynamicTreeComponent($tree, {
            itemClass: Model
        });

        // Basic control of classes inheritance.
        expect(tree).to.be.instanceOf(CanControl);
        expect(tree).to.be.instanceOf(MadControl);
        expect(tree).to.be.instanceOf(Component);
        expect(tree).to.be.instanceOf(TreeComponent);
        expect(tree).to.be.instanceOf(DynamicTreeComponent);

        tree.start();
        tree.destroy();
    });

    it('open() and close() should open and close the corresponding sections of the tree', function () {
        var tree = new DynamicTreeComponent($tree, {
            itemClass: Model
        });
        tree.start();

        var items = new Model.List([{
            id: 'item_1',
            label: 'Item 1'
        }, {
            id: 'item_2',
            label: 'Item 2',
            'children': new Model.List([{
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

        expect($('#item_2').hasClass('close')).to.be.true;
        tree.open(items[1]);
        expect($('#item_2').hasClass('close')).to.be.false;
        expect($('#item_2').hasClass('open')).to.be.true;
        tree.close(items[1]);
        expect($('#item_2').hasClass('close')).to.be.true;
    });

    it('Clicking on the open/close trigger should open and close the corresponding section of the tree', function () {
        var tree = new DynamicTreeComponent($tree, {
            itemClass: Model
        });
        tree.start();

        var items = new Model.List([{
            id: 'item_1',
            label: 'Item 1'
        }, {
            id: 'item_2',
            label: 'Item 2',
            'children': new Model.List([{
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

        expect($('#item_2').hasClass('close')).to.be.true;
        $('#item_2 .left-cell.node-ctrl > a').click();
        expect($('#item_2').hasClass('close')).to.be.false;
        expect($('#item_2').hasClass('open')).to.be.true;
        $('#item_2 .left-cell.node-ctrl > a').click();
        expect($('#item_2').hasClass('close')).to.be.true;
    });
});
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
import "../../bootstrap.js";
import CanControl from "can-control";
import Component from "passbolt-mad/component/component";
import DefineMap from 'passbolt-mad/model/map/map';
import domEvents from 'can-dom-events';
import DynamicTreeComponent from "passbolt-mad/component/dynamic_tree";
import MadControl from 'passbolt-mad/control/control';
import TreeComponent from 'passbolt-mad/component/tree';

describe("DynamicTree", () => {
  let $tree = null;

  beforeEach(() => {
    $tree = $('<ul id="tree"></ul>').appendTo($('#test-html'));
  });

  afterEach(() => {
    $('#test-html').empty();
  });

  describe("Constructor", () => {
    it("inherits basilisks", () => {
      const tree = new DynamicTreeComponent('#tree', {
        itemClass: DefineMap
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
  });

  describe("open() / close()", () => {
    it('opens / closes tree sections', () => {
      const tree = new DynamicTreeComponent('#tree', {
        itemClass: DefineMap
      });
      tree.start();

      const items = new DefineMap.List([{
        id: 'item_1',
        label: 'Item 1'
      }, {
        id: 'item_2',
        label: 'Item 2',
        'children': new DefineMap.List([{
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
  });

  describe("Event click", () => {
    it('opens / closes tree sections ', () => {
      const tree = new DynamicTreeComponent('#tree', {
        itemClass: DefineMap
      });
      tree.start();

      const items = new DefineMap.List([{
        id: 'item_1',
        label: 'Item 1'
      }, {
        id: 'item_2',
        label: 'Item 2',
        'children': new DefineMap.List([{
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
      domEvents.dispatch($('#item_2 .left-cell.node-ctrl > a')[0], 'click');
      expect($('#item_2').hasClass('close')).to.be.false;
      expect($('#item_2').hasClass('open')).to.be.true;
      domEvents.dispatch($('#item_2 .left-cell.node-ctrl > a')[0], 'click');
      expect($('#item_2').hasClass('close')).to.be.true;
    });
  });
});

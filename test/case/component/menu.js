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
import "../../bootstrap.js";
import Action from "passbolt-mad/model/map/action";
import CanControl from "can-control";
import Component from "passbolt-mad/component/component";
import domEvents from 'can-dom-events';
import MadControl from 'passbolt-mad/control/control';
import MenuComponent from 'passbolt-mad/component/menu';

describe("Menu", () => {
  let $menu = null;
  let $debugOutput = null;

  beforeEach(() => {
    $menu = $('<ul id="menu"></ul>').appendTo($('#test-html'));
    $debugOutput = $('<div id="test-output"></div>').appendTo($('#test-html'));
  });

  afterEach(() => {
    $('#test-html').empty();
  });

  describe("Constructor", () => {
    it("inherits navarog", () => {
      const menu = new MenuComponent('#menu');
      expect(menu).to.be.instanceOf(CanControl);
      expect(menu).to.be.instanceOf(MadControl);
      expect(menu).to.be.instanceOf(Component);
      expect(menu).to.be.instanceOf(MenuComponent);
      menu.start();
      menu.destroy();
    });
  });

  describe("item_selected()", () => {
    it("executes the menu item action on click", () => {
      const menu = new MenuComponent('#menu');
      menu.start();

      expect($menu.text()).to.not.contain('Item 1');

      const menuItems = [];
      var menuItem = new Action({
        id: 'i1',
        label: 'Item 1',
        action: function() {
          $debugOutput.html('item 1 clicked');
        }
      });
      menuItems.push(menuItem);
      var menuItem = new Action({
        id: 'i2',
        label: 'Item 2',
        action: function() {
          $debugOutput.html('item 2 clicked');
        }
      });
      menuItems.push(menuItem);
      menu.load(menuItems);

      expect($menu.text()).to.contain('Item 1');
      expect($menu.text()).to.contain('Item 2');

      // Click on an Item and observe that it triggers the action.
      domEvents.dispatch($('#i1 a')[0], 'click');
      expect($debugOutput.text()).to.contain('item 1 clicked');
    });

    it("does not execute the menu item action on click of disabled item", () => {
      const menu = new MenuComponent('#menu');
      menu.start();

      expect($menu.text()).to.not.contain('Item 1');

      const menuItems = [];
      var menuItem = new Action({
        id: 'i1',
        label: 'Item 1',
        enabled: false,
        action: function() {
          $debugOutput.html('item 1 clicked');
        }
      });
      menuItems.push(menuItem);
      var menuItem = new Action({
        id: 'i2',
        label: 'Item 2',
        action: function() {
          $debugOutput.html('item 2 clicked');
        }
      });
      menuItems.push(menuItem);
      menu.load(menuItems);

      expect($menu.text()).to.contain('Item 1');
      expect($menu.text()).to.contain('Item 2');

      // Click on an Item and observe that it triggers the action.
      domEvents.dispatch($('#i1 a')[0], 'click');
      expect($debugOutput.text()).to.not.contain('item 1 clicked');
    });
  });

  describe("enableItem()", () => {
    it("enables an item", () => {
      const menu = new MenuComponent('#menu');
      menu.start();

      const menuItems = [];
      const menuItem1 = new Action({
        id: 'i1',
        label: 'Item 1',
        enabled: false,
        action: function() {
          $debugOutput.html('item 1 clicked');
        }
      });
      menuItems.push(menuItem1);
      const menuItem2 = new Action({
        id: 'i2',
        label: 'Item 2',
        enabled: false,
        action: function() {
          $debugOutput.html('item 2 clicked');
        }
      });
      menuItems.push(menuItem2);
      menu.load(menuItems);

      menu.enableItem('i1');
      expect(menuItem1.enabled).to.be.true;
      expect(menuItem2.enabled).to.be.false;
      expect($('#i1.disabled').length).to.be.equal(0);
    });
  });

  describe("disableItem()", () => {
    it("disables an item", () => {
      const menu = new MenuComponent('#menu');
      menu.start();

      const menuItems = [];
      const menuItem1 = new Action({
        id: 'i1',
        label: 'Item 1',
        action: function() {
          $debugOutput.html('item 1 clicked');
        }
      });
      menuItems.push(menuItem1);
      const menuItem2 = new Action({
        id: 'i2',
        label: 'Item 2',
        action: function() {
          $debugOutput.html('item 2 clicked');
        }
      });
      menuItems.push(menuItem2);
      menu.load(menuItems);

      expect(menuItem1.enabled).to.be.true;
      expect(menuItem2.enabled).to.be.true;

      menu.disableItem('i1');
      expect(menuItem1.enabled).to.be.false;
      expect(menuItem2.enabled).to.be.true;
      expect($('#i1.disabled').length).to.be.not.equal(0);
    });
  });
});

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
import Action from "passbolt-mad/model/map/action";
import CanControl from "can-control";
import Component from "passbolt-mad/component/component";
import ContextualMenuComponent from "passbolt-mad/component/contextual_menu";
import domEvents from 'can-dom-events';
import DropdownMenuComponent from 'passbolt-mad/component/dropdown_menu';
import MadControl from 'passbolt-mad/control/control';
import MenuComponent from 'passbolt-mad/component/menu';
import HtmlHelper from 'passbolt-mad/helper/html';

let $menu = null;
let $debugOutput = null;

describe("ContextualMenu", () => {
  beforeEach(() => {
    $menu = $('<a id="menu">Test Contextual Menu</a>').appendTo($('#test-html'));
    $debugOutput = $('<div id="test-output"></div>').appendTo($('#test-html'));
  });

  afterEach(() => {
    $('#test-html').empty();
  });

  function showContextualMenu($item) {
    const item_offset = $item.offset();
    const contextualMenu = ContextualMenuComponent.instantiate({
      state: 'hidden',
      source: $item[0],
      coordinates: {
        x: item_offset.left,
        y: item_offset.top
      }
    });
    contextualMenu.start();
    var menuItem = new Action({
      id: 'el1',
      label: 'Item 1',
      action: function() {
        $debugOutput.html('item 1 clicked');
      }
    });
    contextualMenu.insertItem(menuItem);
    var menuItem = new Action({
      id: 'el2',
      label: 'Item 2',
      action: function() {
        $debugOutput.html('item 2 clicked');
      }
    });
    contextualMenu.insertItem(menuItem);
    return contextualMenu;
  }

  describe("Constructor", () => {
    it("inherits zombie", () => {
      // Create an HTMLElement for the contextual menu.
      const menu = ContextualMenuComponent.instantiate({
        state: 'hidden',
        source: '#menu',
        coordinates: {
          x: 0,
          y: 0
        }
      });
      expect(menu).to.be.instanceOf(CanControl);
      expect(menu).to.be.instanceOf(MadControl);
      expect(menu).to.be.instanceOf(Component);
      expect(menu).to.be.instanceOf(MenuComponent);
      expect(menu).to.be.instanceOf(DropdownMenuComponent);
      menu.start();
      menu.destroyAndRemove();
    });
  });

  describe("destroyAndRemove()", () => {
    it("removes the contextual menu from the DOM", () => {
      showContextualMenu($menu);
      ContextualMenuComponent._instance.destroyAndRemove();
      expect($('#js_contextual_menu').length).to.equal(0);
    });
  });

  describe("Events", () => {
    it("listens to right click event and displays the component", () => {
      let menu = null;
      $menu.click(() => {
        menu = showContextualMenu($menu);
      });
      expect($('#js_contextual_menu').length).to.equal(0);
      $menu.click();
      expect($('#js_contextual_menu').length).to.not.equal(0);
      expect($('#js_contextual_menu').html()).to.contain('Item 1');
      expect($('#js_contextual_menu').html()).to.contain('Item 2');
      menu.destroyAndRemove();
    });

    it("listens to click on contextual menu items and executes items action", () => {
      let menu = null;
      $menu.click(() => {
        menu = showContextualMenu($menu);
      });
      $menu.click();
      domEvents.dispatch($('#el1 a', $('#js_contextual_menu'))[0], 'click');
      expect($debugOutput.text()).to.contain('item 1 clicked');
      menu.destroyAndRemove();
    });
  });
});

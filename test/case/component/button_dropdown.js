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
import Action from "passbolt-mad/model/map/action";
import ButtonComponent from "passbolt-mad/component/button";
import ButtonDropdown from "passbolt-mad/component/button_dropdown";
import CanControl from "can-control";
import Component from "passbolt-mad/component/component";
import domEvents from 'can-dom-events';
import MadControl from 'passbolt-mad/control/control';

let $buttonDropdown = null;
let $debugOutput = null;

const instantiateDummyComponent = function() {
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
  const buttonDropdown = new ButtonDropdown('#button-dropdown', {
    items: menuItems
  });
  buttonDropdown.start();

  return buttonDropdown;
};

describe("ButtonDropdown", () => {
  beforeEach(() => {
    $buttonDropdown = $('<button id="button-dropdown"></ul>').appendTo($('#test-html'));
    $debugOutput = $('<div id="test-output"></div>').appendTo($('#test-html'));
  });

  afterEach(() => {
    $('#test-html').empty();
  });

  describe("Constructor", () => {
    it("inherits cyclops", () => {
      const buttonDropdown = new ButtonDropdown('#button-dropdown');
      expect(buttonDropdown).to.be.instanceOf(CanControl);
      expect(buttonDropdown).to.be.instanceOf(MadControl);
      expect(buttonDropdown).to.be.instanceOf(Component);
      expect(buttonDropdown).to.be.instanceOf(ButtonComponent);
      buttonDropdown.start();
      buttonDropdown.destroy();
    });

    it("renders its content on start", () => {
      expect($buttonDropdown.parent().text()).to.not.contain('Item 1');
      instantiateDummyComponent();
      expect($buttonDropdown.parent().text()).to.contain('Item 1');
      expect($buttonDropdown.parent().html()).to.contain('Item 2');
    });
  });

  describe("Event", () => {
    it("displays its content on click", () => {
      instantiateDummyComponent();
      let hasVisibleClass = $('.dropdown-content').hasClass('visible');
      expect(hasVisibleClass).to.be.false;
      domEvents.dispatch($buttonDropdown[0], 'click');
      hasVisibleClass = $('.dropdown-content').hasClass('visible');
      expect(hasVisibleClass).to.be.true;
    });

    it("hides its displayed content on click", () => {
      instantiateDummyComponent();
      let hasVisibleClass = $('.dropdown-content').hasClass('visible');
      expect(hasVisibleClass).to.be.false;
      domEvents.dispatch($buttonDropdown[0], 'click');
      hasVisibleClass = $('.dropdown-content').hasClass('visible');
      expect(hasVisibleClass).to.be.true;
      domEvents.dispatch($buttonDropdown[0], 'click');
      hasVisibleClass = $('.dropdown-content').hasClass('visible');
      expect(hasVisibleClass).to.be.false;
      domEvents.dispatch($buttonDropdown[0], 'click');
      hasVisibleClass = $('.dropdown-content').hasClass('visible');
      expect(hasVisibleClass).to.be.true;
    });

    it("executes action of the content menu item", () => {
      instantiateDummyComponent();
      let hasVisibleClass = $('.dropdown-content').hasClass('visible');
      expect(hasVisibleClass).to.be.false;
      domEvents.dispatch($buttonDropdown[0], 'click');
      hasVisibleClass = $('.dropdown-content').hasClass('visible');
      expect(hasVisibleClass).to.be.true;
      domEvents.dispatch($('#i1 a')[0], 'click');
      expect($debugOutput.text()).to.contain('item 1 clicked');
    });
  });
});

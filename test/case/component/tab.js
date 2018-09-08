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
import Composite from 'passbolt-mad/component/composite';
import domEvents from 'can-dom-events';
import MadControl from 'passbolt-mad/control/control';
import Tab from "passbolt-mad/component/tab";
import $ from 'jquery';

import tab1Template from 'passbolt-mad/test/case/component/tab1_content.stache!';
import tab2Template from 'passbolt-mad/test/case/component/tab2_content.stache!';

const instantiateDummyTabs = function() {
  const tabs = new Tab('#tab', {
    autoMenu: true
  });
  tabs.start();
  const tab1 = tabs.addTab(Component, {
    id: 'free-composite-1',
    label: 'tab1',
    template: tab1Template
  });
  const tab2 = tabs.addTab(Component, {
    id: 'free-composite-2',
    label: 'tab2',
    template: tab2Template
  });
  return tabs;
};

describe("Tab", () => {
  let $tab = null;
  const tab1Id = 'free-composite-1';
  const tab2Id = 'free-composite-2';

  beforeEach(() => {
    $tab = $('<div id="tab"></div>').appendTo($('#test-html'));
  });

  afterEach(() => {
    $('#test-html').empty();
  });

  describe("Constructor", () => {
    it("inherits siletta", () => {
      const tabs = new Tab('#tab');
      expect(tabs).to.be.instanceOf(CanControl);
      expect(tabs).to.be.instanceOf(MadControl);
      expect(tabs).to.be.instanceOf(Component);
      expect(tabs).to.be.instanceOf(Composite);
      expect(tabs).to.be.instanceOf(Tab);
      tabs.start();
      tabs.destroy();
    });
  });

  describe("enableTab()", () => {
    it("enables a tab", () => {
      const tabs = instantiateDummyTabs();
      tabs.enableTab(tab1Id);
      expect($('.tabs-content p:visible').text()).to.equal('this is the content of tab 1');
      expect($(`#js_tab_nav_${tab1Id} a`).hasClass('selected')).to.be.true;
    });

    it("enables a tab and destroy the previous enabled one", () => {
      const tabs = instantiateDummyTabs();
      tabs.enableTab(tab1Id);
      expect($('.tabs-content p:visible').text()).to.equal('this is the content of tab 1');
      expect($(`#js_tab_nav_${tab1Id} a`).hasClass('selected')).to.be.true;
      expect($(`#js_tab_nav_${tab2Id} a`).hasClass('selected')).to.be.false;
      tabs.enableTab(tab2Id);
      expect($('.tabs-content p:visible').text()).to.equal('this is the content of tab 2');
      expect($(`#js_tab_nav_${tab1Id} a`).hasClass('selected')).to.be.false;
      expect($(`#js_tab_nav_${tab2Id} a`).hasClass('selected')).to.be.true;
    });
  });

  describe("Event click", () => {
    it("selects tab on click", () => {
      const tabs = instantiateDummyTabs();
      domEvents.dispatch($(`#js_tab_nav_${tab1Id} a`)[0], 'click');
      expect($('.tabs-content p:visible').text()).to.equal('this is the content of tab 1');
      expect($(`#js_tab_nav_${tab1Id} a`).hasClass('selected')).to.be.true;
      expect($(`#js_tab_nav_${tab2Id} a`).hasClass('selected')).to.be.false;
      domEvents.dispatch($(`#js_tab_nav_${tab2Id} a`)[0], 'click');
      expect($('.tabs-content p:visible').text()).to.equal('this is the content of tab 2');
      expect($(`#js_tab_nav_${tab1Id} a`).hasClass('selected')).to.be.false;
      expect($(`#js_tab_nav_${tab2Id} a`).hasClass('selected')).to.be.true;
    });
  });
});

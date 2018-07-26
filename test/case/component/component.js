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
import 'passbolt-mad/test/bootstrap';
import CanControl from 'can-control';
import Component from 'passbolt-mad/component/component';
import MadControl from 'passbolt-mad/control/control';
import $ from 'jquery';

import customTemplate from 'passbolt-mad/test/case/component/component_custom_template.stache!';

const MyComponent = Component.extend('MyComponent', {
  defaults: {
    cssClasses: ['js_test_component']
  }
}, {});

describe("Component", () => {
  afterEach(() => {
    $('#test-html').empty();
  });

  describe("Constructor", () => {
    it("inherits vampire", () => {
      const component = new Component('#test-html');
      expect(component).to.be.instanceOf(CanControl);
      expect(component).to.be.instanceOf(MadControl);
      expect(component).to.be.instanceOf(Component);
      component.destroy();
    });

    it("sets the cycle control properties as expected", () => {
      const component = new MyComponent('#test-html');
      expect(component.state.disabled).to.be.false;
      expect(component.state.destroyed).to.be.false;
      expect(component.state.hidden).to.be.false;
      expect(component.state.loaded).to.be.false;
      expect(component.state.started).to.be.false;
    });

    it("should use the state given in options as value", () => {
      const options = {
        state: {
          destroyed: true,
          disabled: true,
          hidden: true,
          loaded: true,
          started: true
        }
      };
      const component = new MyComponent('#test-html', options);
      expect(component.state.disabled).to.be.true;
      expect(component.state.destroyed).to.be.true;
      expect(component.state.hidden).to.be.true;
      expect(component.state.loaded).to.be.true;
      expect(component.state.started).to.be.true;
    });
  });

  describe("start()", () => {
    it("updates the state properties", () => {
      const component = new MyComponent('#test-html');
      component.start();
      expect(component.state.loaded).to.be.true;
      expect(component.state.started).to.be.true;
      component.destroy();
    });

    it("updates the DOM element css classes", () => {
      const component = new MyComponent('#test-html');
      const $elt = $(component.element);
      component.start();
      expect($elt.hasClass('MyComponent')).to.be.true;
      expect($elt.hasClass('js_test_component')).to.be.true;
      expect($elt.hasClass('ready')).to.be.true;
      component.destroy();
    });

    it("starts and does not set the loaded property to true if requested in options", () => {
      const MyComponentOverriddenState = Component.extend('MyComponentOverriddenState', {
        defaults: {
          loadedOnStart: false
        }
      }, {});
      const component = new MyComponentOverriddenState('#test-html');
      const $elt = $(component.element);
      expect(component.state.disabled).to.be.false;
      expect(component.state.destroyed).to.be.false;
      expect(component.state.loaded).to.be.false;
      expect(component.state.started).to.be.false;
      component.start();
      expect(component.state.disabled).to.be.false;
      expect(component.state.destroyed).to.be.false;
      expect(component.state.loaded).to.be.false;
      expect(component.state.started).to.be.true;
      expect($elt.hasClass('ready')).to.be.false;
      component.destroy();
    });
  });

  describe("render()", () => {
    it("renders a custom template", () => {
      const CustomComponent = Component.extend('MyComponentOverriddenTemplate', {
        defaults: {
          template: customTemplate
        }
      }, {
        beforeRender: function() {
          this.setViewData('variable', 'Mr. Wayne');
        }
      });
      const component = new CustomComponent('#test-html');
      const $elt = $(component.element);
      component.start();
      expect($elt.text()).to.contain('There\'s a storm coming, Mr. Wayne. You and your friends better batten down the hatches, because when it hits, you\'re all gonna wonder how you ever thought you could live so large and leave so little for the rest of us.');
      component.destroy();
    });
  });

  describe("destroy()", () => {
    it("updates the state properties", () => {
      const component = new MyComponent('#test-html');
      component.start();
      component.destroy();
      expect(component.state.destroyed).to.be.true;
    });

    it("updates the DOM element css classes", () => {
      const component = new MyComponent('#test-html');
      const $elt = $(component.element);
      component.start();
      component.destroy();
      expect($elt.hasClass('MyComponent')).to.be.false;
      expect($elt.hasClass('js_test_component')).to.be.false;
      expect($elt.hasClass('ready')).to.be.false;
    });
  });
});

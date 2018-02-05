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
import $ from 'can-jquery';

import customTemplate from 'passbolt-mad/test/case/component/component_custom_template.stache!'

describe("mad.Component", function(){

	// Extend Component for the needs of the tests.
	var MyComponent = Component.extend('MyComponent', {
		defaults: {
			cssClasses: ['js_test_component']
		}
	}, {});

	it("should inherit can.Control & mad.Control", function(){
		var component = new Component('#test-html');

		// Basic control of classes inheritance.
		expect(component).to.be.instanceOf(CanControl);
		expect(component).to.be.instanceOf(MadControl);
		expect(component).to.be.instanceOf(Component);

		component.destroy();
	});

	it("should be instantiated with the right properties & values", function(){
		var component = new MyComponent('#test-html'),
			$elt = $(component.element);

		// The state property should be empty.
		expect(component.state.previous.length).to.be.equal(0);
		expect(component.state.current.length).to.be.equal(0);

		// The associated HTML Element should have the Component fullName as css class.
		expect($elt.hasClass('MyComponent')).to.be.true;
		// The associated HTML Element should have the Component optional cssClasses as css classes.
		expect($elt.hasClass('js_test_component')).to.be.true;

		component.destroy();

		// After destroy, the associated HTML Element should not have the Component fullName as css class.
		expect($elt.hasClass('MyComponent')).to.be.false;
		// After destroy, the associated HTML Element should not have the Component optional cssClasses as css classes.
		expect($elt.hasClass('js_test_component')).to.be.false;
	});

	it("should be in the default state after being started", function() {
		var component = new MyComponent('#test-html'),
			$elt = $(component.element);

		component.start();

		// After start, the component' state is initialized with the Component default option.
		expect(component.state.is('loading')).to.be.false;
		expect(component.state.is('ready')).to.be.true;

		// After start, the associated HTML Element should have the Component current state name as css class.
		expect($elt.hasClass('ready')).to.be.true;

		component.destroy();

		// After destroy, the associated HTML Element should not have the Component current state name as css class.
		expect($elt.hasClass('ready')).to.be.false;
	});

	it("should be in the overridden default state after being started", function() {
		var MyComponentOverriddenState = Component.extend('MyComponentOverriddenState', {
			defaults: {
				state: 'disabled'
			}
		}, {});

		var component = new MyComponentOverriddenState('#test-html');
		component.start();

		// After start, the component' state is initialized with the Component overriden option.
		expect(component.state.is('loading')).to.be.false;
		expect(component.state.is('ready')).to.be.false;
		expect(component.state.is('disabled')).to.be.true;

		component.destroy();
	});

	it("should be rendered based on a custom template if defined", function() {
		var CustomComponent = Component.extend('MyComponentOverriddenTemplate', {
			defaults: {
				state: 'disabled',
				template: customTemplate
			}
		}, {
			beforeRender: function() {
				this.setViewData('variable', 'VARIABLE VALUE');
			}
		});

		var component = new CustomComponent('#test-html'),
			$elt = $(component.element);

		component.start();

		// I should see a trace of the rendered custom template on the page.
		expect($elt.text()).to.contain('look this is my custom template and my custom variable value VARIABLE VALUE');

		$elt.empty();
		component.destroy();
	});
});

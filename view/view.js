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
import Control from 'passbolt-mad/control/control';
import HtmlHelper from 'passbolt-mad/helper/html';
import 'passbolt-mad/view/helper/stache/i18n.js';
import 'passbolt-mad/view/helper/stache/hash.js';
import 'passbolt-mad/view/helper/stache/string.js';
import 'passbolt-mad/view/helper/stache/time.js';
import 'passbolt-mad/view/helper/stache/uuid.js';

/**
 * @parent Mad.core_api
 * @inherits mad.Control
 *
 * The view controller that will be used to drive component's view.
 * @todo complete the documentation
 * @todo a control variable should be available to the devs.
 */
var View = Control.extend('mad.View', /** @static */{

	defaults: {
		/**
		 * The associated template.
		 */
		template: null,
		/**
		 * The DOM element associated to this view controller
		 */
		element: null
	},

	/**
	 * Render a template. Prefer use this function instead of can.View.render or
	 * jQuery.View cause they are not working with steal mapping of JMVC 3.3. We
	 * do
	 * @param {function} renderer The render to use to render the data
	 * @param {array} data The data to pass to the renderer
	 * @return {string}
	 */
	render: function (renderer, data) {
		data = data || {};
		var documentFragment = renderer(data);
		// TODO: Alert of poo. Explain why please.
		var html = $('<div>').append(documentFragment).html();
		return html;
	}

}, /** @prototype */  {

	/**
	 * Return the controller the view is associated with
	 * @return {mad.controller.ComponentController}
	 */
	getController: function () {
		return this.options.controller;
	},

	/**
	 * Add	the given class
	 * @param {string} className The class to add
	 * @return {void}
	 */
	addClass: function (className) {
		$(this.element).addClass(className);
	},

	/**
	 * Hide the element
	 * @return {void}
	 */
	hide: function () {
		$(this.element).hide();
	},

	/**
	 * The component is loading
	 * @param {boolean} loading Display or not the loading
	 * @return {void}
	 */
	loading: function (loading) {
		if (loading) {
			$(this.element).prepend('<div class="js_loading" />');
		} else {
			$('.js_loading', $(this.element)).remove();
		}
	},

	/**
	 * Remove	the given class
	 * @param {string} className The class to remove
	 * @return {void}
	 */
	removeClass: function (className) {
		$(this.element).removeClass(className);
	},

	/**
	 * Position an element in absolute
	 * @param {array} options Array of options
	 * @param {array} options.coordinates (optional) Position the element functions of the given coordinates
	 * @param {integer} options.coordinates.x Position the element functions of the given x coordinates
	 * @param {integer} options.coordinates.y Position the element functions of the given y coordinates
	 * @param {array} options.reference (optional) Position the element functions of a reference element
	 * @param {HTMLElement} options.reference.element The reference element
	 * @param {array} options.reference.my As per Jquery position plugin, the target corner of my element ("top left" by instance)
	 * @param {array} option.reference.at As per Jquery position plugin, the target corner of the reference element ("bottom left" by instance)
	 * @return {void}
	 */
	position: function(options) {
		HtmlHelper.position($(this.element), options);
	},

	/**
	 * The render method renders the view based on its template.
	 *
	 * @return {string} The rendered view
	 */
	render: function () {
		return View.render(this.options.template, this.getController().getViewData());
	},

	/**
	 * Insert the given html in the dom.
	 * Ensure the provided html is safe.
	 *
	 * @param {string} html The html to insert in the DOM element the view is build upon
	 * @return {void}
	 */
	insertInDom: function(html) {
		$(this.element).html(html);
	},

	/**
	 * Show the element
	 * @return {void}
	 */
	show: function () {
		$(this.element).show();
	}
});

export default View;
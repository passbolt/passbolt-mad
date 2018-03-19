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
import $ from 'can-jquery';
import CanControl from 'can-control';
import uuid from 'uuid/v4';
import "can-construct-super";

/**
 * @parent Mad.core_api
 * @inherits can.Control
 *
 * A specialisation of the can.Control class to manage specific behaviors of the mad framework.
 *
 * @demo demo.html#control/control
 *
 * @body
 * ## Section 1
 * ### Sub section 1
 * This is just an example of section.
 *
 * @demo demo.html#control/control
 *
 * ## Section 2
 * ### Sub section 2
 * This is just another example of section.
 *
 */
var Control = CanControl.extend('mad.Control', /** @prototype */ {

	/**
	 * Constructor.
	 *
	 * @signature `new mad.Control( element, options )`
	 * @param {HTMLElement|can.NodeList|CSSSelectorString} el The element the control will be created on
	 * @param {Object} options Option values merged with the class defaults and set as this.options
	 * @return {mad.Control} A new instance of the constructor function extending mad.Control.
	 *
	 * @body
	 * ## Options
	 *
	 * ### options.id
	 * All controllers instantiated by the app should have an identifier.
	 *
	 * The identifier can be defined either with the optional parameters of the Controller or it can be
	 * defined by the id attribute of the HTML element for which the controller will be created for.
	 *
	 * Note that if the identifier has been twice in the optional parameters and in the template, the one
	 * defined in the optional parameters will override the one defined on the HTML Element.
	 */
	init: function (el, options) {
		// A controller is always associated to a DOM element.
		// If the element is null, or does not exist, throw an exception.
		if (!el || !$(el).length) {
			throw new mad.Exception('The parameter "el" (' + $(el).selector + ') should refer to an existing DOM node.');
		}

		// The identifier has not been defined in the option parameters.
		if (typeof options.id == 'undefined' || options.id == null || options.id == '') {
			var elId = $(this.element).attr('id');

			// If an identifier has been defined on the associated Controller's DOM Element.
			if (typeof elId != 'undefined' && elId != '') {
				options.id = elId;
			}
			// Otherwise generate a unique identifier.
			else {
				options.id = uuid();
				$(this.element).attr('id', options.id);
			}
		}
		// The id is given in the options.
		else {
			// Override the DOM element id by the one defined in the optional parameters.
			$(this.element).attr('id', options.id);
		}

		// Augment the default options with the one given in parameters.
		this.options = $.extend(true, {}, this.options, options);
	},

	/**
	 * Get controller alias
	 * ex: PasswordBrowserController -> password_browser
	 * @param {String} format The return format [camel, under], by default camel for camelcased
	 * @return {String}
	 */
	getAlias: function (type) {
		type = (typeof type == 'undefined') ? 'camel' : type;
		var returnValue = '';
		var alias = this.constructor.shortName.replace(/Controller$/, '');

		switch (type) {
			case 'under':
				returnValue = jQuery.String.underscore(alias);
				break;
			case 'camel':
			default:
				returnValue = alias;
				break;
		}

		return returnValue;
	},

	/**
	 * Get the controller class.
	 * @return {mad.Control}
	 */
	getClass: function () {
		return this.constructor;
	},

	/**
	 * Get the controller's identifier.
	 *
	 * @return {String} Controller's Identifier
	 */
	getId: function () {
		return this.options.id;
	},

	/**
	 * Destroy the controller
	 * @todo is this function still in use.
	 */
	remove: function () {
		$(this.element).remove();
	}

});

export default Control;

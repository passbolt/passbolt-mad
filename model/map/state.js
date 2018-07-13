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
import DefineList from 'can-define/list/list';
import MadMap from 'passbolt-mad/model/map/map';
import $ from 'jquery';

/**
 * @parent Mad.core_api
 * @inherits mad.Model
 *
 * The aim of the State model is to manage states of a component and its
 * transitions.
 *
 * This state model is used by the mad.Component.
 */
var State = MadMap.extend('mad.model.State', {

	/**
	 * Previous state values.
	 * @type {DefineList}
	 */
	previous: {
		Type: DefineList,
		Value: DefineList
	},

	/**
	 * Current state values.
	 * @type {DefineList}
	 */
	current: {
		Type: DefineList,
		Value: DefineList
	},

	/**
	 * Check if the state given in parameter was a current states.
	 *
	 * @param {string} state The state to check for
	 * @return {boolean}
	 */
	is: function (state) {
		// state is null, check that the current states list is null
		if(state == null && !this.current.length) {
			return true;
		}
		return this.current.indexOf(state) != -1 ? true : false;
	},

	/**
	 * Check if the state given in parameter was a previous states.
	 *
	 * @param {string} state The state to check for
	 * @return {boolean}
	 */
	was: function (state) {
		// state is null, check that the current states list is null
		if(state == null && !this.previous.length) {
			return true;
		}
		return this.previous.indexOf(state) != -1 ? true : false;
	},

	/**
	 * Switch the current states to the given state(s).
	 * Store the actual states in the previous states list.
	 * Without parameter the function can be used to reset the current states.
	 *
	 * @param {string|array} states (optional) the new state or an array of states.
	 * If no state given, the function will flush the current states list.
	 */
	setState: function (states) {
		// If no states have been given.
		// Flush the current states list.
		if (typeof states == 'undefined') {
			states = [];
		}
		states = $.isArray(states) ? states : [states];
		this.previous.replace(this.current);
		this.current.replace(states);
	},

	/**
	 * Add states to the current states.
	 * Store the actual states in the previous states list.
	 *
	 * @param {string|array} states the state name or an array of states name
	 */
	addState: function (states) {
		states = $.isArray(states) ? states : [states];
		this.previous.replace(this.current);
		this.current.forEach((item) => {
			states.push(item);
		});
		this.current.replace(states);
	},

	/**
	 * Remove states from the current states.
	 * Store the actual states in the previous states list.
	 *
	 * @param {string|array} states the state name or an array of states name
	 */
	removeState: function (states) {
		states = $.isArray(states) ? states : [states];
		var newStates = [];
		this.previous.replace(this.current.get());
		this.current.forEach((item) =>  {
			if (states.indexOf(item) == -1) {
				newStates.push(item);
			}
		});
		this.current.replace(newStates);
	},

	/**
	 * Transform the current states list into a string.
	 *
	 * @return {string} the string
	 */
	toString: function(separator) {
		if (typeof separator == 'undefined') {
			separator = ',';
		}
		return this.current.join(separator);
	}

});

export default State;

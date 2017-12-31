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

import 'can/model/model';
import 'can/map/attributes/attributes';
import CakeSerializer from 'passbolt-mad/model/serializer/cake_serializer';
import List from 'passbolt-mad/model/list';
import Validation from 'passbolt-mad/util/validation';

/**
 * @parent Mad.core_api
 * @inherits mad.Control
 *
 * A specialisation of the can.Model class to manage specific behaviors of the mad framework.
 *
 * @parent Mad.core_api
 * @constructor mad.Model
 * @inherits can.Model
 */
var Model = can.Model.extend('mad.Model', /** @static */ {

    /**
    * Force the storing of this model's instances.
    * @protected
    */
    forceStore: false,

    /**
    * Store all the instance of this model in the local store.
    * @protected
    */
    madStore: new can.Model.List(),

    /**
     * The model validation rules.
     * @protected
     */
    validationRules: {},

    /**
     * Check if an attribute is a model attribute.
     *
     * @param {string} name The attribute name
     * @return {boolean}
     */
    isModelAttribute: function (name) {
        return /model[s]?$/.test(this.attributes[name]);
    },

    /**
     * Check if an attribute is a model attribute with a multiple cardinality.
     *
     * @param {string} name The name of the attribute to test
     *
     * @return {boolean}
     * @todo Rename this function
     */
    isMultipleAttribute: function (name) {
        return /models$/.test(this.attributes[name]);
    },

    parseModel: function (data, xhr) {
        data = data || {};

        // if the provided data are formatted as an ajax server response
        if (typeof data.header != 'undefined') {
            data = data.body;
            // serialize the data from cake to can format
            data = CakeSerializer.from(data, this);
        } else if (data[this.shortName]) {
            // serialize the data from cake to can format
            data = CakeSerializer.from(data, this);
        }

        return data;
    },

    /**
     * Get the model validation rules
     *
     * @param {string} validationCase (optional) The target validation case.
     *
     * @return {array}
     */
    getValidationRules: function (validationCase) {
        // Validation case.
        // @todo not yet supported
        if (typeof validationCase == 'undefined'
            || validationCase == null) {
            validationCase = 'default';
        }

        return this.validationRules || {};
    },

    /**
     * Get an attribute rule.
     * @param {string} attrName The name of the attribute to check for
     * @param {string} ruleName The rule to search
     * @param {string} validationCase The validation case
     * @return {bool}
     */
    getAttributeRule: function (attrName, ruleName, validationCase) {
        var rules = this.getValidationRules(validationCase);
        var rule = null;

        // The rule is not define as "fieldName" => "ruleName"
        if ($.isArray(rules[attrName])) {
            for (var i in rules[attrName]) {
                if (rules[attrName][i].rule && rules[attrName][i].rule == 'required') {
                    rule = rules[attrName][i];
                }
            }
        }

        return rule;
    },

    /**
    * Get all model instances in an array which match the search parameters.
     *
    * @param {array} data The array to search in
    * @param {string} key The key to search
    * @param {string} value The value of the key to search
    * @return {array}
    */
    search: function (data, key, value) {
    	var returnValue = [],
    		split = key.split('.'),
    		modelName = split[0],
    		attrName = split[1];

    	for (var i in data) {
    		if ($.isArray(data[i][modelName])) {
    			for (var j in data[i][modelName]) {
    				if (data[i][modelName][j][attrName] == value) {
    					returnValue.push(data[i]);
    				}
    			}
    		} else {
    			if (data[i][modelName][attrName] == value) {
    				returnValue.push(data[i]);
    			}
    		}
    		// search in children
    		if (data[i].children) {
    			var childrenSearch = Model.search (data[i].children, key, value);
    			if (childrenSearch.length) {
    				returnValue = $.merge (returnValue, childrenSearch);
    			}
    		}
    	}
    	return returnValue;
    },

    /**
    * Get on model instance in an array which match the search parameters
    * and its value
    * @param {array} data The array to search in
    * @param {string} key The key to search
    * @param {string} value The value of the key to search
    * @return {mad.model.Model}
    */
    searchOne: function (data, key, value) {
    	var returnValue = null;
    	var searchResults = Model.search(data, key, value);
    	if (searchResults.length) {
    		returnValue = searchResults[0];
    	}
    	return returnValue;
    },

    /**
     * Validate an attribute value with a model attribute rule.
     *
     * @param {string} attrName The attribute name
     * @param {mixed} value The attribute value
     * @param {array} values The model attributes values
     * @param {string} case The case to validate the attribute for
     *
     * @return {array} list of error messages, or empty array if no validation error.
     */
    validateAttribute: function (attrName, value, values, validationCase) {
		var returnValue = [];

		if (typeof validationCase == 'undefined') {
			validationCase = 'default';
		}

		var rules = this.getValidationRules(validationCase);
		if (typeof rules[attrName] != 'undefined') {
			// Retrieve the required rule of the attribute if any.
			var requiredRule = this.getAttributeRule(attrName, 'required', validationCase);

            // If the field is required & doesn't pass the required validation return an error.
            if (requiredRule != null) {
                var requiredResult = Validation.validate(requiredRule, value);
                if (requiredResult !== true) {
                    returnValue.push(requiredResult);
                    return returnValue;
                }
            }
            // If the filed is not required and doesn't pass the required the validation
            // the system won't process the other constraints.
            else {
                var requiredResult = Validation.validate('required', value);
                if (requiredResult !== true) {
                    return returnValue;
                }
            }

			// Otherwise execute all the constraints.
			var attributeRules = rules[attrName];
			for (var i in attributeRules) {
				var validateResult = Validation.validate(attributeRules[i], value, values);
				if (validateResult !== true) {
					returnValue.push(validateResult);
				}
			}
		}

		return returnValue;
    }

}, /** @prototype */ {});

export default Model;

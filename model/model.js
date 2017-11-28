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
import mad from 'passbolt-mad/util/util';
// Plugin which will help to take care of the association between the models.
// Will be deprecated after canJs 3.0.
// see: http://canjs.com/docs/can.Map.attributes.html
import 'can/map/attributes/attributes';
import 'passbolt-mad/model/list';
import 'passbolt-mad/model/serializer/cake_serializer';

/**
 * The package that will contain all codes relative to Model.
 */
mad.model = mad.model || {};

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
var Model = mad.Model = can.Model.extend('mad.Model', /** @static */ {

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
     * Extract a model attribute value from a reference doted string.
     *
     * By instance for *mad.model.MyModel.MySubModel.myAttribute* the function will go through
     * each given instance attributes and will extract the leaf value.
     *
     * @param {string} modelRef
     * @param {mad.model.Model} instance
     *
     * @return {mixed}
     */
    getModelAttributeValue: function (modelRef, instance) {
        var returnValue = [],
            attributes = mad.Model.getModelAttributes(modelRef),
            pointer = instance;

        // Go trough the instance attributes and extract the vlaue pointed my the given reference.
        for (var i = 1; i < attributes.length; i++) {
            // If the attribute which owns this current attribute is a model and it is multiple.
            // Extract the attribute value of each instance of the list.
            // @todo this should be the latest attribute of the list.
            if (attributes[i - 1].isMultiple()) {
                returnValue = [];
                pointer.each(function (subInstance) {
                    returnValue.push(subInstance[attributes[i].getName()]);
                });
            } else {
                pointer = can.getObject(attributes[i].getName(), pointer);
                returnValue = pointer;
            }
        }

        return returnValue;
    },

    /**
     * Extract the model attributes from a reference doted string.
     *
     * By instance for *mad.model.MyModel.MySubModel.myAttribute* the function will return :
     * ```
     [ {
    name: 'mad.model.MyModel',
    modelReference: mad.model.MyModel,
    multiple: false
}, {
    name: 'MySubModel',
    modelReference: mad.model.MySubModel,
    multiple: true
}, {
    name: 'myAttribute',
    modelReference: undefined
    multiple: false
} ]
     * ```
     *
     * @param {string} str
     * @return {array|mad.model.Attribute}
     */
    getModelAttributes: function (str) {
        var returnValue = [];

        // Find the root model.
        var matches = str.match(/[\.]?[A-Z][^.]*/),
            modelName = str.substr(0, matches.index + matches[0].length),
            subAttributesStr = str.substr(modelName.length + 1),
            model = can.getObject(modelName);

        returnValue.push(new mad.model.Attribute({
            name: modelName,
            multiple: false,
            modelReference: model
        }));

        // Find the sub-models.
        var subsplit = subAttributesStr.split('.');
        for (var i in subsplit) {
            // Extract the attribute type of the chained attribute in the previously discovered model.
            var attributeType = model.attributes[subsplit[i]],
                name = '',
                multiple = false;

            // The attribute type is a reference to a model.
            if (/models?$/.test(attributeType)) {
                // Extract the model full name.
                var matches = attributeType.match(/(.*)\.models?$/);
                name = subsplit[i];
                model = can.getObject(matches[1]);
                multiple = /models$/.test(attributeType);
            }
            else {
                name = subsplit[i];
                model = undefined;
            }

            returnValue.push(new mad.model.Attribute({
                name: name,
                multiple: multiple,
                modelReference: model
            }));
        }

        return returnValue;
    },

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

        // if the provided data are formated as ajax server response
        if (mad.net.Response.isResponse(data)) {
            console.debug('mad.model.parseModel : mad.net.Response.isResponse == true');
            data = mad.net.Response.getData(data);
            // serialize the data from cake to can format
            data = mad.model.serializer.CakeSerializer.from(data, this);
        } else if (data[this.shortName]) {
            // serialize the data from cake to can format
            data = mad.model.serializer.CakeSerializer.from(data, this);
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
    			var childrenSearch = mad.model.Model.search (data[i].children, key, value);
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
    	var searchResults = mad.Model.search(data, key, value);
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
                var requiredResult = mad.Validation.validate(requiredRule, value);
                if (requiredResult !== true) {
                    returnValue.push(requiredResult);
                    return returnValue;
                }
            }
            // If the filed is not required and doesn't pass the required the validation
            // the system won't process the other constraints.
            else {
                var requiredResult = mad.Validation.validate('required', value);
                if (requiredResult !== true) {
                    return returnValue;
                }
            }

			// Otherwise execute all the constraints.
			var attributeRules = rules[attrName];
			for (var i in attributeRules) {
				var validateResult = mad.Validation.validate(attributeRules[i], value, values);
				if (validateResult !== true) {
					returnValue.push(validateResult);
				}
			}
		}

		return returnValue;
    }

}, /** @prototype */ {});

export default Model;

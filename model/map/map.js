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
 * @since         2.0.0
 */
import CanDefineMap from 'can-define/map/map';
import DefineList from 'passbolt-mad/model/list/list';
import getObject from 'can-util/js/get/get';
import setObject from 'passbolt-mad/util/set/set';
import Validation from 'passbolt-mad/util/validation';

var DefineMap = CanDefineMap.extend({
    /**
     * Should the data be filtered before being send to the server.
     * User when performing a create or an update request.
     */
    __FILTER_CASE__: 'string'
});
DefineMap.List = DefineList.extend({
    '#': DefineMap
});

DefineMap.validationRules = {};

DefineMap._references = {};

DefineMap.getReference = function(name) {
    return DefineMap._references[name];
};

DefineMap.setReference = function(name, ref) {
    DefineMap._references[name] = ref;
};

DefineMap.getValidationRules = function(validationCase) {
    return this.validationRules;
};

DefineMap.validateAttribute = function(attrName, value, values, validationCase) {
    var returnValue = [];

    if (typeof validationCase == 'undefined') {
        validationCase = 'default';
    }

    var rules = this.getValidationRules(validationCase);
    if (rules[attrName]) {
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
};

/**
 * Get an attribute rule.
 * @param {string} attrName The name of the attribute to check for
 * @param {string} ruleName The rule to search
 * @param {string} validationCase The validation case
 * @return {bool}
 */
DefineMap.getAttributeRule = function(attrName, ruleName, validationCase) {
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
};


/**
 * Return the fields to filter on regarding a case given in parameters.
 *
 * @param filteredCase
 * @returns {mixed} An array of fields to filter on, or false if the case doesn't require to be filtered.
 */
DefineMap.getFilteredFields = function(filteredCase) {
    return false;
};

/**
 * Filter the attributes regarding a given case.
 *
 * canjs doesn't allow to filter the save and update attributes send to the back-end.
 * We allow passbolt developers to filter the request by adding a __FILTER_CASE__
 * attribute. This case attribute will be used to get the fields to filter on (see the function
 * getFilteredFields).
 *
 * @param attrs
 * @returns {{}}
 */
DefineMap.filterAttributes = function(attrs) {
    var filteredAttrs = {};

    // If a filtered case has been given in parameter.
    if (typeof attrs.__FILTER_CASE__ != 'undefined') {
        var fields = this.getFilteredFields(attrs.__FILTER_CASE__);

        // If the case requires to filter the attributes.
        if (fields !== false) {
            for (var i in fields) {
                var value = getObject(attrs, fields[i]);
                setObject(filteredAttrs, fields[i], value);
            }
        } else {
            filteredAttrs = attrs;
            delete filteredAttrs.__FILTER_CASE__;
        }
    }
    // If no filter case has been given, return all the attributes.
    else {
        filteredAttrs = attrs;
    }

    return filteredAttrs;
};

export default DefineMap;
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
import DefineMap from 'can-define/map/map';
import Validation from 'passbolt-mad/util/validation';

var Map = DefineMap.extend({});

Map.validationRules = {};

Map._references = {};

Map.getReference = function(name) {
    return Map._references[name];
};

Map.setReference = function(name, ref) {
    Map._references[name] = ref;
};

Map.getValidationRules = function(validationCase) {
    return this.validationRules;
};

Map.validateAttribute = function(attrName, value, values, validationCase) {
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
Map.getAttributeRule = function(attrName, ruleName, validationCase) {
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

export default Map;
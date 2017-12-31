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
import Model from 'passbolt-mad/model/model';

/**
 * @parent Mad.core_api
 * @inherits mad.Model
 *
 * The aim of the Attribute model is to describe model attributes.
 */
var Attribute = Model.extend('mad.model.Attribute', /* @static */ {

    attributes: {
        name: 'string',
        type: 'string',
        modelReference: 'object',
        multiple: 'boolean'
    },

    /**
     * Extract a model attribute value from a reference doted string.
     *
     * By instance for *mad.model.MyModel.MySubModel.myAttribute* the function will go through
     * each given instance attributes and will extract the leaf value.
     *
     * @param {string} modelRef
     * @param {mad.model.Model} instance
     *
     * @return {array}
     */
    getModelAttributeValue: function (modelRef, instance) {
        var returnValue = [],
            attributes = Attribute.getModelAttributes(modelRef),
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
     * @return {array}
     */
    getModelAttributes: function (str) {
        var returnValue = [];

        // Find the root model.
        var matches = str.match(/[\.]?[A-Z][^.]*/),
            modelName = str.substr(0, matches.index + matches[0].length),
            subAttributesStr = str.substr(modelName.length + 1),
            model = can.getObject(modelName);

        returnValue.push(new Attribute({
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

            returnValue.push(new Attribute({
                name: name,
                multiple: multiple,
                modelReference: model
            }));
        }

        return returnValue;
    }

}, /** @prototype */ {

    /**
     * Get the associated model reference
     * @return {object}
     */
    getModelReference: function () {
        return this.modelReference;
    },

    /**
     * Get the module attribute name
     * @return {string}
     */
    getName: function() {
        return this.name;
    },

    /**
     * Is the attribute multiple
     * @return {boolean}
     */
    isMultiple: function() {
        return this.multiple;
    }

});

export default Attribute;

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
import './model';

/**
 * @parent Mad.core_api
 * @inherits mad.Model
 *
 * The aim of the Attribute model is to describe model attributes.
 */
var Attribute = mad.model.Attribute = mad.Model.extend('mad.model.Attribute', /* @static */ {

    attributes: {
        name: 'string',
        type: 'string',
        modelReference: 'object',
        multiple: 'boolean'
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

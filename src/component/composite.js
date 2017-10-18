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
import './component';

/**
 * @parent Mad.components_api
 * @inherits mad.Component
 *
 * The Composite component is a very simple component that allows to
 * use several components in the same component.
 */
var Composite = mad.component.Composite = mad.Component.extend('mad.component.Composite', /** @prototype */ {

    'defaults': {
        'label': 'Composite Component Controller'
    }

}, /** @prototype */ {

    /**
     * Constructor.
     *
     * @signature `new mad.Composite( element, options )`
     * @param {HTMLElement|can.NodeList|CSSSelectorString} el The element the control will be created on
     * @param {Object} options Option values merged with the class defaults and set as this.options
     * @return {mad.Composite} A new instance of the constructor function extending mad.Component.
     */
    init: function(el, options) {
        /**
         * Components carried by the composite
         * @type {Array}
         */
        this._components = [];

        this._super(el, options);
    },

    /**
     * Get a component
     * @param {string} id Id of the target component
     * @return {mad.controller.ComponentController}
     */
    getComponent: function (id) {
        return this._components[id];
    },

    /**
     * Add a component to the container
     * @param {mad.controller.ComponentController} component The component to add to the composite
     * @return {{mad.controller.ComponentController}} the added component
     */
    addComponent: function (component) {
        this._components[component.getId()] = component;
        return component;
    }
});

export default Composite;
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
import 'passbolt-mad/model/model';
import 'passbolt-mad/model/state';

/**
 * @inherits mad.model.Model
 * @parent mad.model
 *
 * The Action model will carry actions used by other component
 *
 * @constructor
 * Creates a new Action
 * @param {array} options
 * @return {mad.model.Action}
 */
var Action = mad.model.Action = mad.Model.extend('mad.model.Action', /** @static */{

    /**
     * Define attributes of the model
     * @type {Object}
     */
    attributes: {
        id: 'string',
        label: 'string',
        name: 'string',
        icon: 'string',
        action: 'function',
        cssClasses: 'array',
        initial_state: 'string',
        state: mad.model.State.model,
        active: 'boolean'
    }

}, /** @prototype */ {

    // Constructor like.
    init: function() {
        // Initialize the associated state instance. Byt default use the stateName defined in
        // the options.state
        if (typeof this.initial_state == 'undefined') {
            this.initial_state = 'ready';
        }
        this.state = new mad.model.State();
        this.state.setState(this.initial_state);

        // Instantiate the css classes variables if it has not been defined.
        // As the action is massively used by the
        if (typeof this.cssClasses == 'undefined' || this.cssClasses == null) {
            this.cssClasses = [];
        }
    },

    /**
     * Execute the associated callback action if any.
     * @param {mixed} data Data to pass to the callback if any
     * @return {function}
     */
    execute: function (data) {
        if(this.action) {
            this.action(data);
        }
    }
});

export default Action;
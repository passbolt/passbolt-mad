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
import DefineMap from 'passbolt-mad/model/map/map';

/**
 * @inherits mad.model.Model
 * @parent mad.model
 *
 * The Action model will carry actions used by other component
 *
 * @constructor
 * Creates a new Action
 * @param {array} options
 * @return {Action}
 */
const Action = DefineMap.extend('mad.model.Action', {

  /**
   * Identifier of the action
   * @type string
   */
  id: {
    type: 'string'
  },

  /**
   * Label of the action
   * @type string
   */
  label: {
    type: 'string'
  },

  /**
   * Name of the action
   * @type string
   */
  name: {
    type: 'string'
  },

  /**
   * Icon of the action
   * @type string
   */
  icon: {
    type: 'string'
  },

  /**
   * Callback associated to the action.
   * @type function
   */
  action: {
    type: '*'
  },

  /**
   * Css classes to associate to the action
   * @type array
   */
  cssClasses: {
    type: '*',
    default: () => []
  },

  /**
   * State of the action
   * @type boolean
   */
  enabled: {
    type: 'boolean',
    default: true
  },

  /**
   * Execute the associated callback action if any.
   * @param {mixed} data Data to pass to the callback if any
   * @return {function}
   */
  execute: function(data) {
    if (this.action) {
      this.action(data);
    }
  }
});

/**
 * @inherits DefineList
 *
 * List of actions.
 *
 * @constructor
 * Creates a new list of actions.
 * @param {array} items List of items to populate the list with
 * @return {DefineList}
 */
Action.List = DefineList.extend({
  "#": Action
});

export default Action;

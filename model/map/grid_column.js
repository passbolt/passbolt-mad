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
import DefineMap from './map';

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
const GridColumn = DefineMap.extend('mad.model.GridColumn', {

  /**
   * Name of the action
   * @type string
   */
  name: {
    type: 'string'
  },

  /**
   * Index of the action
   * @type string
   */
  index: {
    type: 'string'
  },

  /**
   * Label of the column
   * @type string
   */
  label: {
    type: '*'
  },

  /**
   * Template of the column
   * @type string
   */
  template: {
    type: '*',
    default: () => null
  },

  /**
   * Css classes to associate to the action
   * @type array
   */
  css: {
    type: '*',
    default: () => []
  },

  /**
   * Is the column sortable
   * @type boolean
   */
  sortable: {
    type: 'boolean',
    default: true
  }

});

export default GridColumn;

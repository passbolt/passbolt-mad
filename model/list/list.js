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
import DefineList from 'can-define/list/list';

const DefineMadList = DefineList.extend({

  /**
   * Find the position of a given element in the list
   * @param item
   * @param fromIndex
   * @returns {*}
   */
  indexOf: function(item, fromIndex) {
    for (let i = fromIndex || 0, len = this.length; i < len; i++) {
      if (this.get(i).id === item.id) {
        return i;
      }
    }
    return -1;
  },

  /**
   * Remove an item from the list
   * @param {DefineMap} item The item to remove
   */
  remove: function(item) {
    const index = this.indexOf(item);
    if (index != -1) {
      this.splice(index, 1);
    }
  }
});

export default DefineMadList;

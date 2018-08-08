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
import getObject from 'can-util/js/get/get';

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
   * Filter items in the grid by keywords
   * @param {string} needle The string to search in the grid
   * @param {array} fields The fields to search in
   */
  filterContain: function(needle, fields) {
    const keywords = needle.split(/\s+/);
    const filteredItems = new DefineMadList();

    this.forEach(item => {
      for (const j in keywords) {
        let found = false;
        let field = null;
        let i = 0;

        while (!found && (field = fields[i])) {
          // Is the field relative to a submodel with a multiple cardinality. Search only in the first level.
          if (/(\[\])+/.test(field)) {
            const crumbs = field.split('[].');
            const objects = getObject(item, crumbs[0]);
            objects.forEach(object => {
              if (!found) {
                const fieldValue = getObject(object, crumbs[1]);
                if (fieldValue) {
                  found = fieldValue.toLowerCase()
                    .indexOf(keywords[j].toLowerCase()) != -1;
                }
              }
            });
          } else {
            const object = getObject(item, field);
            if (object) {
              found = object.toLowerCase().indexOf(keywords[j].toLowerCase()) != -1;
            }
          }

          i++;
        }

        // If the keyword hasn't been found in any field. Does not need to search the other keywords in this item
        if (!found) {
          return;
        }
      }

      filteredItems.push(item);
    });

    return filteredItems;
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

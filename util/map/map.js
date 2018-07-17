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
import Construct from 'can-construct';

/**
 * @parent Mad.core_api
 * @inherits mad.Construct
 *
 * The aim of the object Map is to help developers to transform an object into another, by mapping
 * its fields following another structure.
 */
const MadMap = Construct.extend('mad.Map', /** @static */ {

  /**
   * @deprecated {0.0.2} Please call the function mapObject directly on the map object.
   */
  mapObject: function(object, map) {
    console.warn('Please call the function mapObject directly on the map object.');
    return map.mapObject(object);
  },

  /**
   * @deprecated {0.0.2} Please call the function mapObject directly on the map object.
   */
  mapObjects: function(arr, map) {
    console.warn('Please call the function mapObject directly on the map object.');
    return map.mapObjects(arr);
  }

}, /** @prototype */ {

  /**
   * The map setting to use for the mapping.
   */
  map: {},

  /**
   * Constructor.
   *
   * @param {object} map The map setting to use for the mapping.
   * @return {mad.object.Map}
   *
   * @body
   * TBD some example of map setting.
   */
  init: function(map) {
    this.map = map;
  },

  /**
   * Retrieve the value of a nested key (level1.level2.level3...) into an object.
   * @param {object} object The object to look into
   * @param {string} key The key to look for
   * @return {mixed}
   */
  _getObjFieldPointer: function(object, key) {
    let returnValue = object;
    const split = key.split('.');

    for (let i = 0; i < split.length; i++) {
      // Failed to find the subkey.
      if (returnValue[split[i]] === undefined) {
        return null;
      }
      returnValue = returnValue[split[i]];
    }
    return returnValue;
  },

  /**
   * Get the fields name the map targets in the model.
   * @return {array}
   */
  getModelTargetFieldsNames: function() {
    const returnValue = [];
    for (const key in this.map) {
      if (typeof this.map[key] == 'string') {
        returnValue.push(this.map[key]);
      }
    }
    return returnValue;
  },

  /**
   * Map an object into another.
   *
   * @param {Object} object The object to map
   * @return {Object} The mapped object
   */
  mapObject: function(object) {
    const returnValue = {};

    for (const key in this.map) {
      const mapKeyElts = key.split('.');
      // the map keys (targetKey || targetKeyLvl1.targetKeyLvl2)
      let current = returnValue;
      // the current position in the final object
      let position = 0; // position of the cursors in the mapKeyElts

      /*
       * foreach mapKeyElts we add add a level in the final object
       * at the leaf we insert the value
       */
      for (const i in mapKeyElts) {
        const mapKeyElt = mapKeyElts[i];

        // if the leaf is reached
        if (position == mapKeyElts.length - 1) {
          // if a transformation func is given
          if (typeof this.map[key] == 'object') {
            const func = this.map[key].func;
            const keyToMap = this.map[key].key;
            const objectFieldToMap = this._getObjFieldPointer(object, keyToMap);
            // @todo what to do if the key to map does not exist
            if (objectFieldToMap != null) {
              current[mapKeyElt] = func(objectFieldToMap, this, object, returnValue);
            }
          } else {
            const objectFieldToMap = this._getObjFieldPointer(object, this.map[key]);
            // @todo what to do if the key to map does not exist
            if (objectFieldToMap != null) {
              current[mapKeyElt] = objectFieldToMap;
            }
          }
        } else {
          // else we move the cursor in the mapKeyElts
          if (typeof current[mapKeyElt] == 'undefined') { current[mapKeyElt] = []; }
          current = current[mapKeyElt];
        }

        position++;
      }
    }

    return returnValue;
  },

  /**
   * Map an array of objects into an array of transformed objects.
   *
   * @param {mixed} data The array of objects to map.
   * @return {array} The array of mapped objects.
   */
  mapObjects: function(data) {
    const self = this;
    const returnValue = [];

    data.forEach((elt, i) => {
      returnValue[i] = self.mapObject(elt);
    });

    return returnValue;
  }

});

export default MadMap;

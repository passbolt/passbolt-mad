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
 * @inherits jQuery.Class
 * @parent mad.core
 */
var CakeSerializer = Construct.extend('mad.model.serializer.CakeSerializer', /** @static */ {
    from: function (data, Class) {
        var returnValue = {};
        var className = Class.shortName.substr(Class.shortName.lastIndexOf('.') + 1);
        returnValue = $.extend(true, {}, data, data[className]);
        delete returnValue[className];
        return returnValue;
    },
    to: function (data, Class) {
        var returnValue = {};
        var className = Class.shortName.substr(Class.shortName.lastIndexOf('.') + 1);
        returnValue[className] = {};
        for (var name in data) {
            if (Class.isModelAttribute(name)) {
                returnValue[name] = data[name];
            } else {
                returnValue[className][name] = data[name];
            }
        }
        return returnValue;
    }
}, /** @prototype */ {});

export default CakeSerializer;
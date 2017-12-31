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
import 'can/construct/construct';

/**
 * @inherits jQuery.Class
 * @parent mad.core
 */
var Serializer = can.Construct.extend('mad.model.serializer.Serializer', /** @static */ {
    from: function (data) {
        // override this function to support the format to serialize from
    },
    to: function (data) {
        // override this function to support the format to serialize to
    }
}, /** @prototype */ {});

export default Serializer;

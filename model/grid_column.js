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
import CanMap from 'can-map';
import List from 'can-list';

/**
 * @inherits mad.model.Model
 * @parent mad.model
 *
 * The GridColumn model will carry grid column settings
 *
 * @constructor
 * Creates a new GridColumn
 * @param {array} options
 * @return {mad.model.GridColumn}
 */
var GridColumn = CanMap.extend('mad.model.GridColumn', /** @prototype */ {

    // Constructor like
    init: function(options) {
        this._super(options);

        if (!this.css) {
            this.attr('css', new List());
        }

        // Add the class sortable to CSS classes.
        if (this.sortable) {
            this.css.push('sortable');
        }
    }

});

export default GridColumn;

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
import DefineList from 'passbolt-mad/model/list/list';
import I18n from "passbolt-mad/util/lang/i18n";
import MadMap from 'passbolt-mad/model/map/map';

const Role = MadMap.extend('mad.test.model.Role', {
  name: 'string',
  test: 'string'
});
MadMap.setReference('Role', Role);

Role.List = DefineList.extend({'#': {Type: Role}});
Role.List.itemReference = Role;

Role.validationRules = {
  name: [
    {rule: ['lengthBetween', 3, 255], message: __('The name should be between 3 and 254 characters length.')}
  ]
};

export default Role;

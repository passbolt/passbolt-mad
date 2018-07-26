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
import MadMap from 'passbolt-mad/model/map/map';

const Profile = MadMap.extend('mad.test.model.Profile', {
  first_name: 'string',
  last_name: 'string'
});

Profile.validationRules = {
  first_name: [
    {rule: 'required', message:  __('A first name is required.')},
    {rule: 'notEmpty', message:  __('A first name is required.')}
  ],
  last_name: [
    {rule: 'required', message:  __('A last name is required.')},
    {rule: 'notEmpty', message:  __('A last name is required.')}
  ]
};

export default Profile;

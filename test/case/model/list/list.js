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
import "passbolt-mad/test/bootstrap";
import DefineList from 'passbolt-mad/model/list/list';
import DefineMap from 'passbolt-mad/model/map/map';
import User from 'passbolt-mad/test/model/map/user';

describe("List", () => {
  describe("filterContain()", () => {
    it('filter a list by contain', () => {
      const fields = ['id', 'username', 'email', 'profile.first_name', 'profile.last_name'];
      const list = new User.List();
      const user0 = new User({
        id: 'id_0',
        username: 'ada',
        email: 'ada@passbolt.com',
        active: true,
        profile: {
          first_name: 'Ada',
          last_name: 'Lovelace'
        }
      });
      list.push(user0);
      const user1 = new User({
        id: 'id_1',
        username: 'betty',
        email: 'betty@passbolt.com',
        active: false,
        profile: {
          first_name: 'Betty',
          last_name: 'Holberton'
        }
      });
      list.push(user1);
      const user2 = new User({
        id: 'id_2',
        username: 'stranger',
        email: 'stranger@worldwide.com',
        active: false,
        profile: {
          first_name: 'Stranger',
          last_name: 'Stranger'
        }
      });
      list.push(user2);

      // Filter segregates
      let filteredList = list.filterContain('ada', fields);
      expect(filteredList.length).to.be.equal(1);

      // Filter segregates multiple
      filteredList = list.filterContain('passbolt', fields);
      expect(filteredList.length).to.be.equal(2);

      // Filter segregates first level submodel
      filteredList = list.filterContain('Stranger', fields);
      expect(filteredList.length).to.be.equal(1);
    });
  });
});

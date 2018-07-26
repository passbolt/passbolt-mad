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
import "passbolt-mad/test/fixture/users";
import CanList from 'can-list';
import CanReflect from 'can-reflect';
import MadMap from 'passbolt-mad/model/map/map';
import Profile from 'passbolt-mad/test/model/map/profile';
import User from 'passbolt-mad/test/model/map/user';
import uuid from 'uuid/v4';

describe("mad.Map", () => {
  it("should inherit MadMap", () => {
    const model = new MadMap();
    expect(model).to.be.instanceOf(MadMap);
  });

  it("findAll() should retrieve the data", done => {
    User.findAll()
      .then(users => {
        expect(users[0]).to.be.instanceOf(User);
        expect(users[0].profile).to.be.instanceOf(Profile);
        done();
      });
  });

  it("validateAttribute() should validate scalar attribute", () => {
    let isValid = null;
    const rules = User.validationRules;

    // By default, if no rule defined empty value is allowed
    isValid = User.validateAttribute('id', '');
    expect(isValid).to.be.empty;

    // Validation rule allow what it should
    isValid = User.validateAttribute('id', uuid());
    expect(isValid).to.be.empty;

    // Check that validation rule is well executed, and return a default message if nothing specified.
    isValid = User.validateAttribute('id', 'ABCDE');
    expect(isValid).to.not.be.empty;
    expect(isValid[0]).to.contain('Not valid uuid');

    // Validation rule with custom message.
    isValid = User.validateAttribute('username', '');
    expect(isValid).to.not.be.empty;
    expect(isValid[0]).to.contain(rules.username.filter(item => item.rule == 'notEmpty')[0].message);

    // Field is required
    isValid = User.validateAttribute('username', undefined);
    expect(isValid).to.not.be.empty;
    expect(isValid[0]).to.contain(rules.username.filter(item => item.rule == 'required')[0].message);
  });
});

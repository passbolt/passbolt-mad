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
import "../bootstrap.js";
import Config from '../../config/config';
import Construct from "can-construct";
import Bootstrap from "../../bootstrap";
import Component from "../../component/component";
import $ from 'jquery';

describe("mad.Bootstrap", () => {
  it("should inherit can.Construct", () => {
    const AppControl = Component.extend('mad.test.bootstrap.AppControl', {
      defaults: {}
    }, { });

    const bootstrap = new Bootstrap();
    expect(bootstrap).to.be.instanceOf(Construct);
  });
});

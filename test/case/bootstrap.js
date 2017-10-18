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
import "../bootstrap";
import "../../src/bootstrap";

describe("mad.Bootstrap", function () {

    it("should inherit can.Construct", function () {
        var AppControl = mad.Component.extend('mad.test.bootstrap.AppControl', {
            defaults: {}
        }, { });
        mad.Config.write('app.controllerElt', '#test-html');
        mad.Config.write('app.ControllerClassName', 'mad.test.bootstrap.AppControl');

        var bootstrap = new mad.Bootstrap();
        expect(bootstrap).to.be.instanceOf(can.Construct);
        mad.getControl('test-html', 'mad.test.bootstrap.AppControl').destroy();
    });

});

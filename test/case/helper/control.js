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
import Config from 'passbolt-mad/config/config';
import ControlHelper from 'passbolt-mad/helper/control';
import MadControl from 'passbolt-mad/control/control';

describe("mad.helper.Control", function(){

	beforeEach(function(){
		Config.write('app.namespace', 'testapp');
	});

	afterEach(function(){
		Config.flush();
	});

    it("getViewPath() should build the template path based on mad's Controls full name", function(){
        var Control1 = MadControl.extend('mad.test.helper.Control1', {}, {});
        var path = ControlHelper.getViewPath(Control1);
        expect(path).to.be.equal('mad/view/template/test/helper/control1.ejs');
    });

    it("getViewPath() should build the template path based on application's Controls full name", function(){
        var Control1 = MadControl.extend('testapp.control.Control1', {}, {});
        var path = ControlHelper.getViewPath(Control1);
        expect(path).to.be.equal('testapp/view/template/control/control1.ejs');
    });

    it("getViewPath() should build the template path based on out of context Controls name", function(){
        var Control1 = MadControl.extend('out_of_context.control.Control1', {}, {});
        var path = ControlHelper.getViewPath(Control1);
        expect(path).to.be.equal('testapp/view/template/out_of_context/control/control1.ejs');
    });

});

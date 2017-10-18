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
import "../../bootstrap";

describe("mad.Control", function(){

	it("should inherit can.Control & mad.Control", function(){
		var control = new mad.Control($('#test-html'));
		expect(control).to.be.instanceOf(can.Control);
		expect(control).to.be.instanceOf(mad.Control);
		control.destroy();
	});

	it("should be referenced on instantiation and unreferenced on destroy", function() {
		var control = new mad.Control($('#test-html'));
		assert.isDefined(mad._controls['test-html']['mad.Control']);
		var searchedControl = mad.getControl('test-html');
        expect(searchedControl).to.not.be.undefined;
		control.destroy();
		expect(mad._controls['test-html']['mad.Control']).to.be.undefined;
		var searchedControl = mad.getControl('test-html');
		assert.isUndefined(searchedControl);
	});
});

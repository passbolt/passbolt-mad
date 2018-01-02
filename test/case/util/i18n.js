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
import I18n from "passbolt-mad/util/lang/i18n";

// Sample of dictionary
var dico = {
    'my sentence without hook': 'ma phrase sans hook',
    'my sentence with a final hook %s': 'ma phrase avec un hook final %s',
    '%s my sentence with a start hook': '%s ma phrase avec un hook en début',
    '%s my sentence with a start and a final hooks %s': '%s ma phrase avec un hook en début et en fin %s',
    '%s': '%s'
};

describe("mad.I18n", function(){

	it("should inherit can.Construct", function() {
		var i18n = new I18n();
		expect(i18n).to.be.instanceOf(can.Construct);
	});

	it("loadDico() should load a dictionary of sentences", function() {
        I18n.loadDico(dico);
        for (var key in dico) {
            expect(dico[key]).to.be.equal(I18n.dico[key]);
        }
	});

    it("__() should translate a sentence", function() {
        expect(__('my sentence without hook')).to.be.equal('ma phrase sans hook');
        expect(__('my sentence with a final hook %s', 'HOOK_FINAL')).to.be.equal('ma phrase avec un hook final HOOK_FINAL');
        expect(__('%s my sentence with a start hook', 'HOOK_START')).to.be.equal('HOOK_START ma phrase avec un hook en début');
        expect(__('%s my sentence with a start and a final hooks %s', 'HOOK_START', 'HOOK_FINAL')).to.be.equal('HOOK_START ma phrase avec un hook en début et en fin HOOK_FINAL');
        expect(__('%s', 'HOOK')).to.be.equal('HOOK');
        expect(__('%s%s%s%s', 'HOOK1', 'HOOK2', 'HOOK3', 'HOOK4')).to.be.equal('HOOK1HOOK2HOOK3HOOK4');
    });

});

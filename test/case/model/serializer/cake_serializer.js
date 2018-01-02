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
import Ajax from 'passbolt-mad/net/ajax';
import "passbolt-mad/test/fixture/users";
import "passbolt-mad/test/helper/model";
import CakeSerializer from "passbolt-mad/model/serializer/cake_serializer";

describe("mad.model.serializer.CakeSerializer", function () {

    // Test CakeSerializer : From.
    it('test CakeSerializer : From', function (done) {
        Ajax.request({
            'type': 'GET',
            'url': '/testusers',
            'async': true,
            'dataType': 'json'
        }).then(function (data, response, request) {
            // Query is ok.
            expect(true).to.be.ok;

            // Test result.
            var user = data[0];
            var Class = mad.test.model.UserTestModel;
            var s = CakeSerializer.from(user, Class);

            for (var attrName in Class.attributes) {
                if (!Class.isModelAttribute(attrName)) {
                    expect(user.UserTestModel[attrName]).to.be.equal(s[attrName]);
                }
                else {
                    var subMdlAttr = Class.getAttribute(attrName);
                    if (subMdlAttr.multiple) {
                        can.each(user[attrName], function (item, i) {
                            for (var subMdlAttrName in subMdlAttr.modelReference.attributes) {
                                expect(user[attrName][i][subMdlAttrName]).to.be.equal(s[attrName][i][subMdlAttrName]);
                            }
                        });

                    } else {
                        for (var subMdlAttrName in subMdlAttr.modelReference.attributes) {
                            expect(user[attrName][i][subMdlAttrName]).to.be.equal(s[attrName][i][subMdlAttrName]);
                        }
                    }
                }
            }
            done();

        }).fail(function(jqXHR, status, response, request) {
            expect(false).to.be.ok;
            done();
        });
    });

    // Test CakeSerializer : To.
    it('test CakeSerializer : To', function (done) {
        Ajax.request({
            'type': 'GET',
            'url': '/testusers',
            'async': true,
            'dataType': 'json'
        }).then(function (data, response, request) {
            var user = data[0];
            var Class = mad.test.model.UserTestModel;
            var s = CakeSerializer.to(user, Class);

            expect(true).to.be.ok;

            for (var attrName in Class.attributes) {
                if (!Class.isModelAttribute(attrName)) {
                    expect(user[attrName]).to.be.equal(s['UserTestModel'][attrName]);
                } else {
                    var subMdlAttr = Class.getAttribute(attrName);
                    if (subMdlAttr.multiple) {
                        can.each(user[attrName], function (item, i) {
                            for (var subMdlAttrName in subMdlAttr.modelReference.attributes) {
                                expect(user[attrName][i][subMdlAttrName]).to.be.equal(s[attrName][i][subMdlAttrName]);
                            }
                        });

                    } else {
                        for (var subMdlAttrName in subMdlAttr.modelReference.attributes) {
                            expect(user[attrName][i][subMdlAttrName], s[attrName][i][subMdlAttrName]);
                        }
                    }
                }
            }
            done();

        }).fail(function(jqXHR, status, response, request) {
            expect(false).to.be.ok;
            done();
        });
    });
});
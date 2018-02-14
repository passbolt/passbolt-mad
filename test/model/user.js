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
import Ajax from 'passbolt-mad/net/ajax';
import CakeSerializer from 'passbolt-mad/model/serializer/cake_serializer';
import Model from 'passbolt-mad/model/model';

var UserTestModel = Model.extend('mad.test.model.UserTestModel', {
    /**
     * Attributes.
     */
    attributes: {
        id: 'string',
        username: 'string',
        email: 'string',
        active: 'string',
        Profile: 'mad.test.model.ProfileTestModel'
    },
    findAll: 'GET /testusers',
    findAllUpdated: function() {
        return Ajax.request({
            url: '/testuserscarolupdated'
        }).then(function(data) {
            return UserTestModel.connection.hydrateList(UserTestModel.parseModels(data));
        });
    },
    findOne: 'GET /testusers/{id}',
    findOneUpdated: function(id) {
        var params = {id: id};
        return Ajax.request({
            url: '/testusersupdated/{id}',
            params: params
        }).then(function(data) {
            return UserTestModel.connection.hydrateInstance(UserTestModel.parseModel(data.body));
        });
    },
    create : function (attrs) {
        var url = '/testusers';
        var self = this;
        var params = CakeSerializer.to(attrs, UserTestModel);
        return Ajax.request({
            url: url,
            type: 'POST',
            params: params
        }).pipe(function (data, textStatus, jqXHR) {
            // pipe the result to convert cakephp response format into can format
            // else the new attribute are not well placed
            var def = $.Deferred();
            def.resolveWith(this, [CakeSerializer.from(data, self)]);
            return def;
        });
    },
    update: function (data) {
        var params = CakeSerializer.to(data, UserTestModel);
        params.id = data.id;
        return Ajax.request({
            url: '/testusers/{id}',
            type: 'PUT',
            params: data
        });
    },
    destroy: '/testusers/{id}',
    findCustom: function (params) {
        var self = this;
        return Ajax.request({
            url: '/testusers/custom/0',
            type: 'GET',
            params: params
        }).pipe(function (data, textStatus, jqXHR) {
            // pipe the result to convert cakephp response format into can format
            var def = $.Deferred();
            var instance = self.model(data);
            def.resolveWith(this, [instance]);
            return def;
        });
    }
}, {});

export default UserTestModel;
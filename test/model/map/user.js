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
import connect from 'can-connect';
import connectDataUrl from 'can-connect/data/url/url';
import connectParse from 'can-connect/data/parse/parse';
import connectConstructor from 'can-connect/constructor/constructor';
import connectMap from 'can-connect/can/map/map';
import connectMerge from 'can-connect/can/merge/merge';
import connectStore from 'can-connect/constructor/store/store';
import connectConstructorHydrate from 'can-connect/can/constructor-hydrate/constructor-hydrate';
import connectRealTime from 'can-connect/real-time/real-time';
import DefineList from 'can-define/list/list';
import MadMap from 'passbolt-mad/model/map/map';
import Profile from 'passbolt-mad/test/model/map/profile';
import Role from 'passbolt-mad/test/model/map/role';
import superMap from 'can-define/map/map';
import set from 'can-set';

var User = MadMap.extend('mad.test.model.User', {
    id: 'string',
    username: 'string',
    email: 'string',
    active: 'boolean',
    Profile: Profile,
    Role: Role.List
});
MadMap.setReference('User', User);

User.List = DefineList.extend({'#': { Type: User }});

User.validationRules = {
    id: [
        {rule: 'uuid'}
    ],
    email: [
        {rule: 'email', message: __('The email should be a valid email address.')}
    ],
    username: [
        {rule: 'required', message:  __('A username is required.')},
        {rule: 'notEmpty', message:  __('A username is required.')},
        {rule: 'utf8', message:  __('The username should be a valid utf8 string.')},
        {rule: ['lengthBetween', 0, 255], message: __('The username length should be maximum 254 characters.')}
    ]
};

User.connection = connect([connectParse, connectDataUrl, connectConstructor, connectStore, connectMap, connectConstructorHydrate], {
    Map: User,
    List: User.List,
    url: {
        resource: '/',
        getListData: function(params) {
            return Ajax.request({
                url: '/test/users',
                type: 'GET',
                params: params
            });
        }
    },
    parseListData: function(data) {
        if (data.body && typeof Array.isArray(data.body)) {
            var returnValue = [];
            for (var i in data.body) {
                returnValue[i] = User.connection.parseData.call(User.connection, data.body[i]);
            }
            return returnValue;
        }
        return data;
    },
    parseData: function (data) {
        data = data || {};
        // if the provided data are formatted as an ajax server response
        if (typeof data.header != 'undefined') {
            data = CakeSerializer.from(data.body, 'User');
        } else {
            var className = 'User';
            if (data[className]) {
                data = CakeSerializer.from(data, 'User');
            }
        }
        return data;
    }

    //findAll: 'GET /testusers',
    //findAllUpdated: function() {
    //    return Ajax.request({
    //        url: '/testuserscarolupdated'
    //    }).then(function(data) {
    //        return UserTestModel.connection.hydrateList(UserTestModel.parseModels(data));
    //    });
    //},
    //findOne: 'GET /testusers/{id}',
    //findOneUpdated: function(id) {
    //    var params = {id: id};
    //    return Ajax.request({
    //        url: '/testusersupdated/{id}',
    //        params: params
    //    }).then(function(data) {
    //        return UserTestModel.connection.hydrateInstance(UserTestModel.parseModel(data.body));
    //    });
    //},
    //create : function (attrs) {
    //    var url = '/testusers';
    //    var self = this;
    //    var params = CakeSerializer.to(attrs, UserTestModel);
    //    return Ajax.request({
    //        url: url,
    //        type: 'POST',
    //        params: params
    //    }).pipe(function (data, textStatus, jqXHR) {
    //        // pipe the result to convert cakephp response format into can format
    //        // else the new attribute are not well placed
    //        var def = $.Deferred();
    //        def.resolveWith(this, [CakeSerializer.from(data, self)]);
    //        return def;
    //    });
    //},
    //update: function (data) {
    //    var params = CakeSerializer.to(data, UserTestModel);
    //    params.id = data.id;
    //    return Ajax.request({
    //        url: '/testusers/{id}',
    //        type: 'PUT',
    //        params: data
    //    });
    //},
    //destroy: '/testusers/{id}',
    //findCustom: function (params) {
    //    var self = this;
    //    return Ajax.request({
    //        url: '/testusers/custom/0',
    //        type: 'GET',
    //        params: params
    //    }).pipe(function (data, textStatus, jqXHR) {
    //        // pipe the result to convert cakephp response format into can format
    //        var def = $.Deferred();
    //        var instance = self.model(data);
    //        def.resolveWith(this, [instance]);
    //        return def;
    //    });
    //}
});

export default User;

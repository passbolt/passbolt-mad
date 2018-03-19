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
import connectStore from 'can-connect/constructor/store/store';
import connectConstructorHydrate from 'can-connect/can/constructor-hydrate/constructor-hydrate';
import DefineList from 'passbolt-mad/model/list/list';
import DefineMap from 'passbolt-mad/model/map/map';
import Profile from 'passbolt-mad/test/model/map/profile';
import Role from 'passbolt-mad/test/model/map/role';

var User = DefineMap.extend('mad.test.model.User', {
    id: 'string',
    username: 'string',
    email: 'string',
    active: 'boolean',
    profile: Profile,
    role: Role.List
});
DefineMap.setReference('User', User);

User.List = DefineList.extend({'#': { Type: User }});
User.List.itemReference = User;

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
        },
        destroyData: 'DELETE /test/users/{id}'
    }
});

export default User;

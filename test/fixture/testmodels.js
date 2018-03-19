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
import "passbolt-mad/net/ajax";
import fixture from "can-fixture";
import Response from 'passbolt-mad/net/response';
import uuid from 'uuid/v4';

var store = [
    {
        'TestModel': {
            'id': '10cdea9c-aa88-46cb-a09b-2f4fd7a10fce'
        },
        'TestModel1': {
            'id': '20cdea9c-aa88-46cb-a09b-2f4fd7a10fce',
            'test_model_id': '10cdea9c-aa88-46cb-a09b-2f4fd7a10fce',
            'TestModel2': {
                'id': '30cdea9c-aa88-46cb-a09b-2f4fd7a10fce',
                'test_model_1_id': '20cdea9c-aa88-46cb-a09b-2f4fd7a10fce'
            }
        }
    }
];

// Fixture for UserTestModel findAll.
fixture({
    type: 'GET',
    url: '/testmodels'
}, function () {
    return {
        'header': {
            'id': uuid(),
            'status': Response.STATUS_SUCCESS,
            'title': 'success',
            'message': '',
            'controller': 'TestModels',
            'action': 'index'
        },
        'body': store
    };
});

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
import Model from 'passbolt-mad/model/model';
import TestModel1 from 'passbolt-mad/test/model/testModel1';

var TestModel = Model.extend('mad.test.model.TestModel', {
    attributes: {
        TestModel1: 'mad.test.model.TestModel1.model',
        TestModel1s: 'mad.test.model.TestModel1.models',
        testModelAttribute: 'string'
    },
    validationRules: {
        'testModelAttribute': {
            'alphaNumeric': {
                'rule': '/^[a-zA-Z0-9\-_]*$/',
                'message': 'testModelAttribute should only contain alphabets, numbers only and the special characters : - _'
            },
            'size': {
                'rule': ['lengthBetween', 3, 8],
                'message': 'testModelAttribute should be between %s and %s characters long'
            }
        }
    }
}, {});

export default TestModel;
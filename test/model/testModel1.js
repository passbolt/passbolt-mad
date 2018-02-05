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
import TestModel2 from 'passbolt-mad/test/model/testModel2';

var Test1Model = Model.extend('mad.test.model.TestModel1', {
    attributes: {
        TestModel2: 'mad.test.model.TestModel2.model',
        TestModel2s: 'mad.test.model.TestModel2.models',
        testModel1Attribute: 'string'
    },
    validationRules: {
        'testModel1Attribute': {
            'alphaNumeric': {
                'rule': '/^[a-zA-Z0-9\-_]*$/',
                'message': 'testModel1Attribute should only contain alphabets, numbers only and the special characters : - _'
            },
            'size': {
                'rule': ['lengthBetween', 3, 8],
                'message': 'testModel1Attribute should be between %s and %s characters long'
            }
        },
        'TestModel2s': {
            'size': {
                'rule': ['lengthBetween', 1, 2],
                'message': 'TestModel2s should be between %s and %s selected element'
            }
        }
    }
}, {});

export default Test1Model;

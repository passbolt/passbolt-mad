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
import Construct from 'can-construct';
import MadMap from 'passbolt-mad/util/map/map';

describe("mad.Map", () => {
  it("should inherit can.Construct", () => {
    const map = new MadMap();
    expect(map).to.be.instanceOf(Construct);
  });

  it("mapObject() should map simple objects", () => {
    const object = {
      'key1': 'value1',
      'key2': 'value2',
      'key3': 'value3'
    };
    const map = new MadMap({
      'key1': 'key2',
      'key2': 'key3',
      'key3': 'key1'
    });
    const mappedObject = map.mapObject(object);
    expect(mappedObject.key1).to.be.equal('value2');
    expect(mappedObject.key2).to.be.equal('value3');
    expect(mappedObject.key3).to.be.equal('value1');
  });

  it("mapObject() should map nested keys", () => {
    const object = {
      'key1': 'value1',
      'key2': 'value2',
      'key3': 'value3'
    };
    const map = new MadMap({
      'key1.sub1': 'key2',
      'key2.sub2.sub21': 'key3',
      'key3.sub3.sub31.sub32': 'key1'
    });
    const mappedObject = map.mapObject(object);
    expect(mappedObject.key1.sub1).to.be.equal('value2');
    expect(mappedObject.key2.sub2.sub21).to.be.equal('value3');
    expect(mappedObject.key3.sub3.sub31.sub32).to.be.equal('value1');
  });

  it("mapObject() should map nested keys and should be able to use transformation functions", () => {
    const object = {
      'key1': 'value1',
      'key2': 'value2',
      'key3': 'value3'
    };
    const map = new MadMap({
      'key1.sub1': 'key2',
      'key2.sub2.sub21': 'key3',
      'key3.sub3.sub31.sub32': {
        'key': 'key1',
        func: function(value) {
          return `${value} changed`;
        }
      }
    });
    const mappedObject = map.mapObject(object);
    expect(mappedObject.key1.sub1).to.be.equal('value2');
    expect(mappedObject.key2.sub2.sub21).to.be.equal('value3');
    expect(mappedObject.key3.sub3.sub31.sub32).to.be.equal('value1 changed');
  });

  it("mapObject() should map array of simple objects", () => {
    const object = {
      'key1': 'value1',
      'key2': 'value2',
      'key3': 'value3'
    };
    const map = new MadMap({
      'key1': 'key2',
      'key2': 'key3',
      'key3': 'key1'
    });
    const arr = [object, object, object];
    const mappedObjects = map.mapObjects(arr);
    expect(Array.isArray(mappedObjects)).to.be.true;
    expect(mappedObjects.length).not.to.be.equal(0);

    for (const i in mappedObjects) {
      const mappedObject = mappedObjects[i];
      expect(mappedObject.key1).to.be.equal('value2');
      expect(mappedObject.key2).to.be.equal('value3');
      expect(mappedObject.key3).to.be.equal('value1');
    }
  });
});

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
import $ from 'jquery';
import "passbolt-mad/test/bootstrap";
import ComponentHelper from 'passbolt-mad/helper/component';
import DefineList from 'passbolt-mad/model/list/list';
import Tree from "passbolt-mad/component/tree";

describe("mad.helper.Component", () => {
  beforeEach(() => {
  });

  afterEach(() => {
    $('#test-html').empty();
  });

  describe('create()', () => {
    it("instantiates and inserts a component", () => {
      const selector = $('#test-html');
      const component = ComponentHelper.create(selector, 'last', Tree);
      component.start();
      const items = new DefineList([{
        id: 'item_1',
        label: 'Item 1'
      }, {
        id: 'item_2',
        label: 'Item 2'
      }, {
        id: 'item_3',
        label: 'Item 3'
      }]);
      component.load(items);

      expect(component instanceof Tree).to.be.true;
      expect($('ul', $('#test-html')).length).to.be.equal(1);
      expect($rootElement.text()).to.contain('Item 1');
      expect($rootElement.text()).to.contain('Item 2');
      expect($rootElement.text()).to.contain('Item 3');
    });
  });
});

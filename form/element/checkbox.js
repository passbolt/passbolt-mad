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
import ChoiceElement from 'passbolt-mad/form/choice_element';
import CheckboxView from 'passbolt-mad/view/form/element/checkbox';
import template from 'passbolt-mad/view/template/form/checkbox.stache!';

/**
 * @parent Mad.form_api
 * @inherits mad.Component
 *
 * The Checkbox Form Element
 * @todo TBD
 */
const Checkbox = ChoiceElement.extend('mad.form.Checkbox', /* @static */ {

  defaults: {
    // Override the label option.
    label: 'Checkbox Form Element',
    // Override the tag option.
    tag: 'div',
    // Override the template option.
    template: template,
    // Override the viewClass option.
    viewClass: CheckboxView
  }

}, /** @prototype */ {});

export default Checkbox;

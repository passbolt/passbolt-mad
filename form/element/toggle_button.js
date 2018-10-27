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
import Element from 'passbolt-mad/form/element';
import ToggleButtonView from 'passbolt-mad/view/form/element/toggle_button';
import template from 'passbolt-mad/view/template/form/toggle_button.stache!';

/**
 * @parent Mad.form_api
 * @inherits mad.Component
 *
 * The Toggle Button Form Element
 */
const ToggleButton = Element.extend('mad.form.ToggleButton', /* @static */ {

  defaults: {
    // Override the label option.
    label: 'Toggle Button Element',
    // Override the tag option.
    tag: 'div',
    // Override the template option.
    template: template,
    // Override the viewClass option.
    viewClass: ToggleButtonView
  }

}, /** @prototype */ {

  /**
   * @inheritdoc
   */
  onDisabledChange: function(disabled) {
    if (disabled) {
      $(this.element).addClass('disabled');
      $('input', this.element).attr('disabled', 'disabled').addClass('disabled');
    } else {
      $(this.element).removeClass('disabled');
      $('input', this.element).removeAttr('disabled').removeClass('disabled');
    }
  }

});

export default ToggleButton;

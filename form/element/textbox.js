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
import Element from '../element';
import TextboxView from '../../view/form/element/textbox';

/**
 * @parent Mad.form_api
 * @inherits mad.Component
 *
 * The Textbox Form Element
 * @todo TBD
 */
const Textbox = Element.extend('mad.form.Textbox', /* @static */ {

  defaults: {
    // Override the label option.
    label: 'Textbox Form Element',
    // Override the tag option.
    tag: 'input',
    // Override the viewClass option.
    viewClass: TextboxView,

    /*
     * Add a period of time before firing the changed event.
     * By instance while typing into a textbox, you'd like to be notified that the value
     * of the textbox changed after the user inserted the while string, not after each character.
     */
    onChangeTimeout: 0,

    /*
     * Add a length limit before firing the changed event.
     * By instance on an autocomplete textbox, you'd like to broadcast the changed event only
     * when the value length is greater than 2.
     */
    onChangeAfterLength: 0
  }

}, /** @prototype */ {});

export default Textbox;

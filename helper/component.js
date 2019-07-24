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
import Construct from 'can-construct';
import HtmlHelper from '../helper/html';
import View from '../view/view';

import componentTagTemplate from '../view/template/helper/componentTag.stache!';

/**
 * @parent Mad.core_helper_api
 * @inherits can.Construct
 *
 * A set of tools to help developer with Components.
 */
const ComponentHelper = Construct.extend('mad.helper.Component', /** @static */ {

  /**
   * A factory to create and insert components.
   *
   * @param {HTMLElement} refElement The reference element to position the component with.
   * @param {string} position The position of the content to insert, regarding the reference element.
   * For a complete list of available values see the [mad.helper.Html HTML Helper]
   * @param {mad.Component} ComponentClass The component class
   * @param {array} options The options to pass to the component class constructor
   *
   * @return {mad.Component}
   */
  create: function(refElement, position, ComponentClass, options) {
    // The options to pass to the Component Class constructor.
    options = options || {};

    // class attributes options.
    let classAttributes = {};
    if (typeof ComponentClass.defaults.attributes != 'undefined') {
      classAttributes = ComponentClass.defaults.attributes;
    }
    // attributes to add to the tag
    const attributes = $.extend({}, classAttributes, options.attributes);

    if (refElement.length == 0) {
      throw mad.Exception.get(mad.error.WRONG_PARAMETER, 'refElement');
    }

    // Construct the html based on the component options.
    const tag = options.tag || ComponentClass.defaults.tag;
    const componentHtml = this._renderTag(tag, options.id, attributes);

    // Insert the HTML Element which will carry the component in the DOM.
    const $component = HtmlHelper.create(refElement, position, componentHtml);

    // Instantiate the component and return it.
    return new ComponentClass($component[0], options);
  },

  /**
   * Render a tag.
   */
  _renderTag: function(tag, id, attributes) {
    let componentHtml = `<${tag}`;
    componentHtml += ` ${View.render(componentTagTemplate, {
      id: id || '',
      attributes: attributes
    })}`;
    componentHtml += '/>';

    return componentHtml;
  }

}, /* @prototype */ {});

export default ComponentHelper;

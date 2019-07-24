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
import ComponentHelper from '../helper/component';
import CompositeComponent from './composite';
import template from '../view/template/component/free_composite/workspace.stache!';

/**
 * @parent Mad.components_api
 * @inherits {mad.component.Composite}
 *
 * Our implementation of a workspace controller. The component
 * is by definition an organized container which will carry other
 * components
 *
 * @constructor
 * Instantiate a new FreeComposite Component.
 * @param {HTMLElement|can.NodeList|CSSSelectorString} el The element the control will be created on
 * @param {Object} [options] option values for the component.  These get added to
 * this.options and merged with defaults static variable
 * @return {mad.component.FreeComposite}
 */
const FreeComposite = CompositeComponent.extend('mad.component.FreeComposite', /** @static */ {

  defaults: {
    label: 'WorkspaceController',
    template: template
  }
}, /** @prototype */ {

  /**
   * Add a component to the container
   * @param {String} ComponentClass The component class to use to instantiate the component
   * @param {Array} componentOptions The optional data to pass to the component constructor
   * @param {String} area The area to add the component. Default : mad-container-main
   * @todo Implement this function with the view system
   */
  addComponent: function(ComponentClass, componentOptions, area) {
    area = area || 'mad-container-main';
    const $area = $(`.${area}`, this.element);
    const component = ComponentHelper.create($area, 'inside_replace', ComponentClass, componentOptions);
    return this._super(component);
  }
});

export default FreeComposite;

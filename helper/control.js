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
import 'can/control/control';
import Config from 'passbolt-mad/config/config';
import Control from 'can-control';
import StringUtil from 'can-util/js/string/string';

/**
 * @parent Mad.core_helper_api
 * @inherits can.Control
 *
 * A set of tools to help developer with Controllers.
 */
var ControlHelper = Control.extend('mad.helper.Control', /** @static */ {

	/**
	 * Get view path of a Control class.
	 *
	 * @todo Rename the function in getTemplatePath
	 * @param {can.Control} Control The inherited Control class to determine the view path of.
	 * @return {string} Return the view path of the given Control.
	 *
	 * @body
	 * The helper is able to determine the view paths of Control classes defined in :
	 * * The mad framework itself;
	 * * The application using the mad framework;
	 * * The plugin
	 *
	 * By instance for a mad framework Control:
	 * ```
	 * mad.helper.Control('mad.component.Tree')
	 * // mad/view/template/tree.ejs
	 * ```
	 *
	 * For an application Control :
	 * ```
	 * mad.helper.Control('APPLICATION_NAMESPACE.control.PasswordWorkspace')
	 * // app/view/template/control/PasswordWorkspace.ejs
	 * ```
	 *
	 * For a out of context Control
	 * ```
	 * mad.helper.Control('custom_ns.MyControl')
	 * // app/view/template/custom_ns/MyControl.ejs
	 * ```
	 */
	getViewPath: function (Control, options) {
		// The path to build.
		var path = '',
			// Split the Control full name by .
			split = Control.shortName.split('.');

		// Check if the top namespace is known and require a specific treatment.
		var root = split.shift();
		switch (root) {
			// The Control is a framework controller.
			case 'mad':
				path += 'mad/view/template/';
				break;
			// The Control is an application controller.
			case Config.read('app.namespace'):
				path += Config.read('app.namespace') + '/view/template/';
				break;
			// We are in another case, use the app.
			default:
				path += Config.read('app.namespace') + '/view/template/' + root + '/';
				break;
		}

		// The view file name is directly based on the controller name.
		var viewName = StringUtil.underscore(split.pop());

		// Add the object nested namespaces to the path.
		if (split.length) {
			path += split.join('/') + '/';
		}

		// Add the view name to the path.
		path += viewName + '.ejs';
		return path;
	}

},{});

export default ControlHelper;

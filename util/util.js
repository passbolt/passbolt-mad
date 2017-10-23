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
import can from 'can/can';
/* Override the can/util/string.js to use our patched version of the function getObject
 * Our version allow to set a value in a nested object if required. (@todo remove this trick) */
import 'passbolt-mad/lib/can/utilString';
import 'can/construct/super/super';
import 'passbolt-mad/util/string/uuid';

// Define the global context.
var glbl = typeof window !== "undefined" ? window : global,
// Define the mad namespace.
    mad = {};

// Make mad global.
glbl.mad = mad;
mad.global = mad;

// Global configuration. Can be overriden later by other components.
mad.config = {
    // Root element.
    rootElement: $('body')
};

/**
 * All mad controllers instances are registered in mad._controls and can be retrieve with mad.getControl
 * until their destruction.
 */
mad._controls = {};

/**
 * @parent Mad.core_tools
 * @signature mad.getControl()
 *
 * Get a mad controller instance based on its identifier.
 *
 * @param {string} id The controller identifier to find.
 * @param {string} controlName The controller class name.
 * @return {mad.Control} The found controller or undefined.
 */
mad.getControl = function (id, controlName) {
    // If a controller class name is not given.
    // Find the first one.
    if (controlName == undefined) {
        for (controlName in mad._controls[id]) {
            break;
        }
    }
    return mad._controls[id][controlName];
};

/**
 * @parent Mad.core_tools
 * @signature mad.referenceControl()
 *
 * Reference a mad controller instance based on its identifier.
 *
 * @param {mad.Control} control The controller to reference
 */
mad.referenceControl = function (control) {
    var id = control.getId();
    if (mad._controls[id] == undefined) {
        mad._controls[id] = {};
    }
    mad._controls[id][control.constructor.fullName] = control;
};

/**
 * @parent Mad.core_tools
 * @signature mad.unreferenceControl()
 *
 * Unreference a mad controller instance based on its identifier.
 *
 * @param {mad.Control} control The controller to reference
 */
mad.unreferenceControl = function (control) {
    delete mad._controls[control.getId()][control.constructor.fullName];
};

/**
 * @parent Mad.core_tools
 * @signature mad.setGlobal()
 *
 * Set a global variable.
 *
 * @param {mixed} name The variable name to set.
 * @param {mixed} value The variable value to set.
 */
mad.setGlobal = function (name, value) {
    glbl[name] = value;
};

export default mad;

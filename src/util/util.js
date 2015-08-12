import can from 'can/can';
import 'can/construct/super/super';
import 'mad/util/string/uuid';

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
    rootElement : $('body')
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
 * @return {mad.Control} The found controller or undefined.
 */
mad.getControl = function(id) {
	return mad._controls[id];
};

/**
 * @parent Mad.core_tools
 * @signature mad.referenceControl()
 *
 * Reference a mad controller instance based on its identifier.
 *
 * @param {mad.Control} control The controller to reference
 */
mad.referenceControl = function(control) {
	mad._controls[control.getId()] = control;
};

/**
 * @parent Mad.core_tools
 * @signature mad.unreferenceControl()
 *
 * Unreference a mad controller instance based on its identifier.
 *
 * @param {mad.Control} control The controller to reference
 */
mad.unreferenceControl = function(control) {
	delete(mad._controls[control.getId()]);
};

export default mad;

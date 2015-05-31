import Control from 'mad/control/control';

/**
 * @parent Mad.core_api
 *
 * @constructor mad.Component
 * @inherits mad.Control
 */
var Component = mad.Component = mad.Control.extend(/** @static */{}, /** @prototype */ {
    /**
     * Get the controller dispatcher. The Dispatcher explain how the routes have to
     * be dispatch for this controller.
     * @param {string} test sdqsdqs
     * @return {mad.route.Dispatcher} By default return the common extension -> controller -> action
     * dispatcher.
     *
     * @body
     * ## Use
     * @demo mad/src/demo/control.html
     */
    getDispatcher: function (test = "") {
        return mad.route.ExtensionControllerActionDispatcher;
    }

});

export default Component;

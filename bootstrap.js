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
import Config from 'passbolt-mad/config/config';
import Construct from 'can-construct';
import ErrorHandler from 'passbolt-mad/error/error_handler';
import global from 'passbolt-mad/util/global/global';
import HtmlHelper from 'passbolt-mad/helper/html';
import MadBus from "passbolt-mad/control/bus";
import I18n from "passbolt-mad/util/lang/i18n";

import madConfig from "passbolt-mad/config/config.js";

// Load the default mad config.
// See mad/config/config.json
Config.load(madConfig);

/**
 * @inherits can.Construct
 * @parent Mad.core_api
 *
 * The Boostrap class is the application launcher. It takes care of initializing :
 *
 * * The application namespace ;
 * * The global variables ;
 * * The event bus ;
 * * The route handler ;
 * * The internationalization layer ;
 * * The application ;
 *
 *    ##Example
 *    The bootstrap use by the demo found in the documentation
 *
 * ```
 // Launch the application and its master pieces
 var boot = new passbolt.bootstrap.AppBootstrap({ 'config': [ 'app/config/config.json' ] });
 * ```
 *
 * ##Config Example
 *
 * ```
 {
     "app": {
     "url": "http://passbolt.local",
         "controllerElt": "#js_app_controller",
         "namespace": "passbolt",
         "ControllerClassName": "passbolt.controller.AppController"
 },
     "error": {
     "ErrorHandlerClassName": "passbolt.helper.ErrorHandler"
 },
     "event": {
     "eventBusControllerElt": "#js_bus_controller"
 },
     "i18n": {
     "lang": "EN-en"
 },
     "route": {
     "defaultRoute": {
         "extension": "passbolt",
             "controller": "passwordWorkspace",
             "action": "index"
     }
 }
  *	```
  *
  * @constructor
 * Creates a Application Bootstrap
 * @param {Array} options Array of options
 * @param {String} options.appControllerId Id of the application controller. A DOM element with this ID must
 * exist on your page. Default : app-controller
 * @param {Array} options.dispatchOptions Array of options for the dispatcher. See the Class mad.bootstrap.DispatcherInterface
 * @param {Array} defaultRoute The default route used by the dispatcher
 * @param {String} defaultRoute.extension The default extension
 * @param {String} defaultRoute.controller The default controller
 * @param {String} defaultRoute.action The default action
 * @return {mad.bootstrap.AppBootstrap}
 */
var Bootstrap = Construct.extend('mad.Bootstrap', /* @static */ {

    defaults: {
        // Callbacks.
        callbacks: {
            // The application is ready.
            ready: null
        }
    }

}, /**  @prototype */ {

    // constructor like
    init: function () {
        // Define the error handler
        Config.write('error.ErrorHandlerClass', ErrorHandler);

        // Define the APP_URL
        var baseUrl = $('base').attr('href');
        global('APP_URL', baseUrl);

        // Initialize the event bus.
        this.initEventBus();
    },

    /**
     * Initialize the Application Event Bus Controller.
     */
    initEventBus: function () {
        var elt = HtmlHelper.create(
            $('body'),
            'first',
            '<div id="bus"/>'
        );
        var bus = MadBus.singleton('#bus');
        mad.bus = bus;
    }
});

export default Bootstrap;

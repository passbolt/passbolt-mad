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

steal.config({
    name: "passbolt-mad",
    main: "passbolt-mad",
    map: {
        "jquery/jquery": "jquery"
    },
    //paths: {
    //    "jquery": "node_modules/jquery/dist/jquery.js",
    //    "steal": "node_modules/steal/steal.js",
    //    "mocha": "node_modules/mocha/mocha.js",
    //    "mocha/mocha.css": "node_modules/mocha/mocha.css",
    //    "chai": "node_modules/chai/chai.js",
    //    "chai-jq": "node_modules/chai-jq/chai-jq.js",
    //    "xregexp": "node_modules/xregexp/xregexp-all.js",
    //    "can": "node_modules/can/can.js",
    //    "can/*": "node_modules/can/*.js",
    //    "can-assign": "node_modules/can-assign/can-assign.js",
    //    "can-cid": "node_modules/can-cid/can-cid.js",
    //    "can-cid/*": "node_modules/can-cid/*.js",
    //    "can-compute": "node_modules/can-compute/can-compute.js",
    //    "can-control": "node_modules/can-control/can-control.js",
    //    "can-construct": "node_modules/can-construct/can-construct.js",
    //    "can-dom-data-state": "node_modules/can-dom-data-state/can-dom-data-state.js",
    //    "can-event": "node_modules/can-event/can-event.js",
    //    "can-event/*": "node_modules/can-event/*.js",
    //    "can-globals/*": "node_modules/can-globals/*.js",
    //    "can-log": "node_modules/can-log/can-log.js",
    //    "can-log/*": "node_modules/can-log/*.js",
    //    "can-namespace": "node_modules/can-namespace/can-namespace.js",
    //    "can-observation": "node_modules/can-observation/can-observation.js",
    //    "can-reflect": "node_modules/can-reflect/can-reflect.js",
    //    "can-reflect/*": "node_modules/can-reflect/*.js",
    //    //"can-reflect/reflections/*": "node_modules/can-reflect/reflections/*.js",
    //    "can-reflect-promise": "node_modules/can-reflect-promise/can-reflect-promise.js",
    //    "can-stache-key": "node_modules/can-stache-key/can-stache-key.js",
    //    "can-symbol": "node_modules/can-symbol/can-symbol.js",
    //    "can-types": "node_modules/can-types/can-types.js",
    //    "can-util/*": "node_modules/can-util/*.js",
    //    "passbolt-mad/*": "./*.js",
    //    "proto-compute": "node_modules/can-compute/proto-compute.js",
    //    "reflections/*": "node_modules/can-reflect/reflections/*.js",
    //    "types/map": "node_modules/can-reflect/types/map.js",
    //    "types/set": "node_modules/can-reflect/types/set.js"
    //},
    meta: {
        "mocha": {
            "format": "global",
            "exports": "mocha",
            "deps": [
                "test/lib/stealMochaAddDom"
            ]
        }
    },
    ext: {
        "ejs": "lib/can/viewEjsSystem"
    }
});
System.config({
    buildConfig: {
        map: {
            "can/util/util": "can-util/domless/domless"
        }
    }
});

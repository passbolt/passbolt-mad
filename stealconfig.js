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
    map: {
        "jquery/jquery": "jquery"
    },
    paths: {
        "jquery": "node_modules/jquery/dist/jquery.js",
        "steal-mocha": "node_modules/steal-mocha/steal-mocha.js",
        "steal-mocha/*": "node_modules/steal-mocha/*.js",
        "mocha": "node_modules/mocha/mocha.js",
        "mocha/mocha.css": "node_modules/mocha/mocha.css",
        "chai": "node_modules/chai/chai.js",
        "chai-jq": "node_modules/chai-jq/chai-jq.js",
        "underscore": "node_modules/underscore/underscore.js",
        "xregexp": "node_modules/xregexp/xregexp-all.js",
        "can": "node_modules/can/can.js",
        "can/*": "node_modules/can/*.js"
    },
    "meta": {
        "mocha": {
            "format": "global",
            "exports": "mocha",
            "deps": [
                "steal-mocha/add-dom"
            ]
        }
    },
    "ext": {
        "ejs": "src/lib/can/viewEjsSystem"
    }
});
System.config({
    buildConfig: {
        map: {
            "can/util/util": "node_modules/can/util/domless/domless"
        }
    }
});

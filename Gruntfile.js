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
var childProcess = require('child_process'),
    fs = require('fs'),
    path = require('path');

/**
 * List directories.
 * @param srcpath
 * @returns {*}
 */
function getDemoApps(srcpath) {
    var directories = fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
    return directories.map(function (value) {
        return srcpath + '/' + value + '/' + value;
    });
}

module.exports = function (grunt) {

    // ========================================================================
    // High level variables

    var config = {
        path: {
            demo: 'demo',
            doc: 'docs'
        }
    };

    // ========================================================================
    // Configure tasks options

    grunt.initConfig({
        config: config,
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            doc: [
                '<%= config.path.doc %>/*'
            ]
        },
        shell: {
            publish: {
                options: {
                    stdout: true
                },
                command: [
                    'git commit -am \'<%= pkg.version %>\'',
                    'git tag -a <%= pkg.version %> -m \'<%= pkg.version %>\'',
                    'git push origin <%= pkg.version %>',
                    'git push',
                    'npm publish'
                ].join('&&')
            }
        },
        "steal-build": {
            default: {
                options: {
                    system: {
                        config: "stealconfig.js",
                        main: getDemoApps(config.path.demo)
                    },
                    buildOptions: {
                        minify: false
                    }
                }
            }
        }
    });

    // ========================================================================
    // Initialise

    grunt.loadNpmTasks('documentjs');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-shell');

    grunt.loadNpmTasks("steal-tools");

    // ========================================================================
    // Register Tasks

    // Clean & generate the documentation
    grunt.registerTask('mad-doc', ['clean:doc', 'documentjs']);

    // Tag and publish
    grunt.registerTask('publish', [ 'shell:publish']);

    // Build mad & all the demos apps to ensure that everything compile
    grunt.registerTask("build", ["steal-build"]);

};

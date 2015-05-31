steal.config({
    root: 'js/',
    map: {
        "jquery/jquery": "jquery", // @todo should not be necessary, test when updating can (now v2.2.6)
        "underscore": "lib/underscore",
        "jquery.js" : "jquery.min.js",
        "can": "lib/can",
        "mad" : "../src"
    },
    paths: {
        //"can/*": "lib/can/*",
        //"mad/*" : "/js/src/*",
        "jquery": "lib/jquery/dist/jquery.min.js"
    }
});

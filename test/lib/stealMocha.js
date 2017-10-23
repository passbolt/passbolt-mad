import mocha from "mocha";
import steal from "@steal";
import loader from "@loader";

if(loader.mocha) {
    var opts = loader.mocha;
    mocha.setup(opts);
}

var getOpts,
    mochaRequire = loader.mochaRequire,
    global = loader.global;

if(mochaRequire) {
    getOpts = loader["import"](mochaRequire).then(function(mochaConfig) {
        return mochaConfig.default || mochaConfig;
    });
}
else {
    getOpts = Promise.resolve(function() {});
}

steal.done().then(function() {
    if (global.Testee && global.Testee.init) {
        global.Testee.init();
    }

    return getOpts;
}).then(function(mochaConfig) {
    mochaConfig(mocha);
    mocha.run();
});

export default mocha;
import mocha from "mocha";
import steal from "@steal";
import loader from "@loader";

if (loader.mocha) {
  const opts = loader.mocha;
  mocha.setup(opts);
}

let getOpts,
  mochaRequire = loader.mochaRequire,
  global = loader.global;

if (mochaRequire) {
  getOpts = loader["import"](mochaRequire).then(mochaConfig => mochaConfig.default || mochaConfig);
} else {
  getOpts = Promise.resolve(() => {});
}

steal.done().then(() => {
  if (global.Testee && global.Testee.init) {
    global.Testee.init();
  }

  return getOpts;
}).then(mochaConfig => {
  mochaConfig(mocha);
  mocha.run();
});

export default mocha;

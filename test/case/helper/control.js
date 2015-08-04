import "steal-mocha";
import mad from "mad"
var expect = chai.expect;
var assert = chai.assert;

describe("mad.helper.Control", function(){

	beforeEach(function(){
		mad.Config.write('app.namespace', 'testapp');
	});

	afterEach(function(){
		mad.Config.flush();
	});

	// Control helper test namespace.
	mad.helper.test = mad.helper.test || {};

	it("getViewPath() should build the template path based on mad's Controls full name", function(){
		mad.helper.test = mad.Control.extend('mad.helper.test.Control1', {}, {});
		var path = mad.helper.Control.getViewPath(mad.helper.test);
		expect(path).to.be.equal('mad/view/template/helper/test/control1.ejs');
	});

	it("getViewPath() should build the template path based on application's Controls full name", function(){
		mad.helper.test = mad.Control.extend('testapp.control.Control1', {}, {});
		var path = mad.helper.Control.getViewPath(mad.helper.test);
		expect(path).to.be.equal('testapp/view/template/control/control1.ejs');
	});

	it("getViewPath() should build the template path based on out of context Controls name", function(){
		mad.helper.test = mad.Control.extend('out_of_context.control.Control1', {}, {});
		var path = mad.helper.Control.getViewPath(mad.helper.test);
		expect(path).to.be.equal('testapp/view/template/out_of_context/control/control1.ejs');
	});

});

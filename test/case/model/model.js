import "steal-mocha";
import chai from "chai";
import mad from "mad"
var expect = chai.expect;
var assert = chai.assert;

describe("mad.Model", function(){

	it("should inherit can.Model", function(){
		var model = new mad.Model();
		expect(model).to.be.instanceOf(can.Model);
	});

});

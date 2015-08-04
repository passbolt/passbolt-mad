import "steal-mocha";
import chai from "chai";
import mad from "mad"
var expect = chai.expect;
var assert = chai.assert;

describe("mad.Control", function(){

	it("should inherit can.Control & mad.Control", function(){
		var control = new mad.Control($('#test-html'));
		expect(control).to.be.instanceOf(can.Control);
		expect(control).to.be.instanceOf(mad.Control);
		control.destroy();
	});

	it("should be referenced on instantiation and unreferenced on destroy", function() {
		var control = new mad.Control($('#test-html'));
		assert.isDefined(mad._controls['test-html']);
		var searchedControl = mad.getControl('test-html');
		assert.isDefined(searchedControl);
		control.destroy();
		assert.isUndefined(mad._controls['test-html']);
		var searchedControl = mad.getControl('test-html');
		assert.isUndefined(searchedControl);
	});
});

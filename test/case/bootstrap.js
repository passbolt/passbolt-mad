import "test/bootstrap";
import "mad/bootstrap";

describe("mad.Bootstrap", function () {

    it("should inherit can.Construct", function () {
        mad.Component.extend('mad.test.bootstrap.AppControl', {}, {});
        mad.Config.write('app.controllerElt', '#test-html');
        mad.Config.write('app.ControllerClassName', 'mad.test.bootstrap.AppControl');

        var bootstrap = new mad.Bootstrap();
        expect(bootstrap).to.be.instanceOf(can.Construct);
    });

});

import "test/bootstrap";
import "mad/form/element/textbox"

describe("mad.form.element.Textbox", function () {

    // The HTMLElement which will carry the textbox component.
    var $textbox = null;

    // Insert a <input> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $textbox = $('<input id="textbox" type="text" />').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit mad.form.Element & the inherited parent classes", function () {
        var textbox = new mad.form.Textbox($textbox, {});

        // Basic control of classes inheritance.
        expect(textbox).to.be.instanceOf(can.Control);
        expect(textbox).to.be.instanceOf(mad.Component);
        expect(textbox).to.be.instanceOf(mad.form.Element);

        textbox.destroy();
    });

    it("Changing the value of the textbox should fire the changed event", function (done) {
        var firedChanged = false,
            textbox = new mad.form.Textbox($textbox, {});

        // While the textbox value change.
        $textbox.on('changed', function () {
            firedChanged = true;
        });
        expect(firedChanged).to.be.false;

        // Start the textbox.
        textbox.start();

        // Simulate a keypress
        $textbox.val('abc');
        $textbox.focus().trigger('input');

        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(textbox.getValue()).to.be.equal('abc');
            expect(firedChanged).to.be.true;
            textbox.destroy();
            done();
        }, 0);
    });

    it("With onChangeAfterLength changing the value of the textbox should fire the changed event after the value length limit has been reached", function (done) {
        var firedChanged = false,
            textbox = new mad.form.Textbox($textbox, {
                onChangeAfterLength: 3
            });

        // While the textbox value change.
        $textbox.on('changed', function () {
            firedChanged = true;
        });
        expect(firedChanged).to.be.false;

        // Start the textbox.
        textbox.start();

        // Simulate a keypress
        $textbox.val('ab');
        $textbox.focus().trigger('input');

        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(textbox.getValue()).to.be.null;
            expect(firedChanged).to.be.false;
        }, 0);

        $textbox.val('abc');
        $textbox.focus().trigger('input');

        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(textbox.getValue()).to.be.equal('abc');
            expect(firedChanged).to.be.true;
            textbox.destroy();
            done();
        }, 0);
    });

    it("With onChangeTimeout changing the value of the textbox should fire the changed event after a period of time", function (done) {
        var firedChanged = false,
            textbox = new mad.form.Textbox($textbox, {
                onChangeTimeout: 100
            });

        // While the textbox value change.
        $textbox.on('changed', function () {
            firedChanged = true;
        });
        expect(firedChanged).to.be.false;

        // Start the textbox.
        textbox.start();

        // Simulate a keypress
        $textbox.val('a');
        $textbox.focus().trigger('input');
        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(textbox.getValue()).to.be.null;
            expect(firedChanged).to.be.false;
        }, 0);

        // Simulate a keypress
        $textbox.val('b');
        $textbox.focus().trigger('input');
        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(textbox.getValue()).to.be.null;
            expect(firedChanged).to.be.false;
        }, 0);

        // Simulate a keypress and check after the timeout
        $textbox.val('c');
        $textbox.focus().trigger('input');
        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(textbox.getValue()).to.be.equal('c');
            expect(firedChanged).to.be.true;
            textbox.destroy();
            done();
        }, 150);
    });
});

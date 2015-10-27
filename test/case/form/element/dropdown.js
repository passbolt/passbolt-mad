import "test/bootstrap";
import "mad/form/element/dropdown"

describe("mad.form.element.Dropdown", function () {

    // The HTMLElement which will carry the dropdown component.
    var $dropdown = null;

    // Insert a <input> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $dropdown = $('<select id="dropdown" />').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit mad.form.Element & the inherited parent classes", function () {
        var dropdown = new mad.form.Dropdown($dropdown, {});

        // Basic control of classes inheritance.
        expect(dropdown).to.be.instanceOf(can.Control);
        expect(dropdown).to.be.instanceOf(mad.Component);
        expect(dropdown).to.be.instanceOf(mad.form.Element);
        expect(dropdown).to.be.instanceOf(mad.form.ChoiceElement);

        dropdown.destroy();
    });

    it("getValue() should return the value of the dropdown", function (done) {
        var dropdown = new mad.form.Dropdown($dropdown, {
                availableValues: {
                    ID_1: 'VALUE 1',
                    ID_2: 'VALUE 2',
                    ID_3: 'VALUE 3'
                },
                value: 'ID_1'
            }).start();

        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(dropdown.getValue()).to.be.equal('ID_1');
            dropdown.destroy();
            done();
        }, 0);
    });

    it("Changing the value of the dropdown should fire the changed event", function (done) {
        var firedChanged = false,
            dropdown = new mad.form.Dropdown($dropdown, {
            availableValues: {
                ID_1: 'VALUE 1',
                ID_2: 'VALUE 2',
                ID_3: 'VALUE 3'
            },
            value: 'ID_1'
        }).start();

        // While the dropdown value change.
        $dropdown.on('changed', function () {
            firedChanged = true;
        });
        expect(firedChanged).to.be.false;

        // Simulate a keypress and check after the timeout
        $dropdown.val('ID_2').trigger('change');

        // After all event handlers have done their treatment.
        setTimeout(function () {
            expect(dropdown.getValue()).to.be.equal('ID_2');
            expect(firedChanged).to.be.true;
            dropdown.destroy();
            done();
        }, 0);
    });

});

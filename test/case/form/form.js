import "test/bootstrap";
import Form from "mad/form/form"
import Textbox from "mad/form/element/textbox";
import Tree from "mad/component/tree";

describe("mad.Form", function () {

    // The HTMLElement which will carry the form component.
    var $form = null;

    // Insert a <form> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $form = $('<form id="form"></form>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit mad.Form & the inherited parent classes", function () {
        var form = new mad.Form($form, {});

        // Basic control of classes inheritance.
        expect(form).to.be.instanceOf(can.Control);
        expect(form).to.be.instanceOf(mad.Component);
        expect(form).to.be.instanceOf(mad.Form);

        form.destroy();
    });

    it("addElement() should not associate not form element with the form", function () {
        var form = new mad.Form($form, {});
        form.start();

        // Try to add a tree to the form.
        $form.append('<ul id="tree"></ul>');
        var tree = new mad.component.Tree($('#tree'), {
            itemClass: mad.Model
        });
        expect(function () {
            form.addElement(tree.start());
        }).to.throw(Error);

        form.destroy();
    });

    it("addElement() should associate form elements with the form", function () {
        var form = new mad.Form($form, {});
        form.start();

        // Try to add a tree to the form.
        $form.append('<input id="tree"></ul>');
        var textbox = textbox = new mad.form.Textbox($textbox, {});, {
            itemClass: mad.Model
        });
        expect(function () {
            form.addElement(tree.start());
        }).to.throw(Error);
    });
});
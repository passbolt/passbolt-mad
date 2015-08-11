import "steal-mocha";
import mad from "mad"
import "mad/component/menu"
var expect = chai.expect;
var assert = chai.assert;

describe("mad.component.Menu", function () {

    // The HTMLElement which will carry the button component.
    var $menu = null;
    var $debugOutput = null;

    // Insert a <ul> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $menu = $('<ul id="menu"></ul>').appendTo($('#test-html'));
        $debugOutput = $('<div id="test-output"></div>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit mad.component.Tree & the inherited parent classes", function () {
        var menu = new mad.component.Menu($menu);

        // Basic control of classes inheritance.
        expect(menu).to.be.instanceOf(can.Control);
        expect(menu).to.be.instanceOf(mad.Control);
        expect(menu).to.be.instanceOf(mad.Component);
        expect(menu).to.be.instanceOf(mad.component.Menu);

        menu.start();
        menu.destroy();
    });

    it("menu items should trigger the right actions when clicked", function () {
        var menu = new mad.component.Menu($menu);
        menu.start();

        expect($menu.text()).to.not.contain('Item 1');

        var menuItems = [];
        var menuItem = new mad.model.Action({
            id: 'i1',
            label: 'Item 1',
            action: function () {
                $debugOutput.html('item 1 clicked');
            }
        });
        menuItems.push(menuItem);
        var menuItem = new mad.model.Action({
            id: 'i2',
            label: 'Item 2',
            action: function () {
                $debugOutput.html('item 2 clicked');
            }
        });
        menuItems.push(menuItem);
        menu.load(menuItems);

        expect($menu.text()).to.contain('Item 1');
        expect($menu.text()).to.contain('Item 2');

        // Click on an Item and observe that it triggers the action.
        $('#i1 a').click();
        expect($debugOutput.text()).to.contain('item 1 clicked');
    });
});
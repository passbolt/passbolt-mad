import "test/bootstrap";
import "mad/component/button_dropdown"

describe("mad.component.ButtonDropdown", function () {

    // The HTMLElement which will carry the button component.
    var $buttonDropdown = null;
    var $debugOutput = null;

    // Insert a <ul> HTMLElement into the DOM for the test.
    beforeEach(function () {
        $buttonDropdown = $('<button id="button-dropdown"></ul>').appendTo($('#test-html'));
        $debugOutput = $('<div id="test-output"></div>').appendTo($('#test-html'));
    });

    // Clean the DOM after each test.
    afterEach(function () {
        $('#test-html').empty();
    });

    it("constructed instance should inherit mad.component.Tree & the inherited parent classes", function () {
        var buttonDropdown = new mad.component.ButtonDropdown($buttonDropdown);

        // Basic control of classes inheritance.
        expect(buttonDropdown).to.be.instanceOf(can.Control);
        expect(buttonDropdown).to.be.instanceOf(mad.Control);
        expect(buttonDropdown).to.be.instanceOf(mad.Component);
        expect(buttonDropdown).to.be.instanceOf(mad.component.Button);

        buttonDropdown.start();
        buttonDropdown.destroy();
    });

    it("buttonDropdown items should be in the dom after instantiation of the buttonDropdown only", function () {
        expect($buttonDropdown.parent().text()).to.not.contain('Item 1');

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
        var buttonDropdown = new mad.component.ButtonDropdown($buttonDropdown, {
            items:menuItems
        });
        buttonDropdown.start();

        expect($buttonDropdown.parent().text()).to.contain('Item 1');
        expect($buttonDropdown.parent().html()).to.contain('Item 2');
    });

    it("buttonDropdown items should be visible after the button is clicked", function () {
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
        var buttonDropdown = new mad.component.ButtonDropdown($buttonDropdown, {
            items:menuItems
        });
        buttonDropdown.start();

        // Check whether elements are visible after clicking on the button.
        expect($('.dropdown-content').hasClass('visible')).to.equal(false);

        // Click on the button and observer that it opens the dropdown content.
        $buttonDropdown.click();
        expect($('.dropdown-content').hasClass('visible')).to.equal(true);

        // Click on an Item and observe that it triggers the action.
        $('#i1 a').click();
        expect($debugOutput.text()).to.contain('item 1 clicked');
    });

    it("buttonDropdown disabled item should not close dialog when clicked", function () {
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
        var buttonDropdown = new mad.component.ButtonDropdown($buttonDropdown, {
            items:menuItems
        });
        buttonDropdown.start();

        // Set action state to disabled.
        buttonDropdown.setItemState('i2', 'disabled');

        // Click on the button to open the content.
        $buttonDropdown.click();
        expect($('.dropdown-content').hasClass('visible')).to.equal(true);

        // Check whether the element is disabled.
        expect($('#i2').hasClass('disabled')).to.equal(true);

        // Click on disabled element.
        $('#i2 a').click();

        // Observe that the dropdown content is still visible.
        expect($('.dropdown-content').hasClass('visible')).to.equal(true);
    });
});
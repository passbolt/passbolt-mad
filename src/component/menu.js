import 'mad/component/component';
import 'mad/component/tree';
import 'mad/util/map/map';
import 'mad/model/action';
import 'mad/view/template/component/menu/menu_item.ejs!';


/**
 * @class mad.component.Menu
 * @inherits {mad.component.Tree}
 * @parent mad.component.component
 *
 * ## Example
 * @demo demo.html#menu/menu
 *
 * @constructor
 * Instanciate a Menu Controller
 *
 * @param {HTMLElement} element the element this instance operates on.
 * @param {Object} [options] option values for the controller.  These get added to
 * this.options and merged with defaults static variable
 * @return {mad.controller.component.MenuController}
 */
var Menu = mad.component.Menu = mad.component.Tree.extend('mad.component.Menu', {

    'defaults': {
        'label': 'Menu',
        'cssClasses': ['menu'],
        // View class.
        'viewClass': mad.view.component.Tree,
        // The template to use to render each action.
        'itemTemplateUri': 'mad/view/template/component/menu/menu_item.ejs',
        // The class which represent the item.
        'itemClass': mad.model.Action,
        // Mapping of the items for the view.
        'map': new mad.Map({
            'id': 'id',
            'label': 'label',
            // @todo : be carefull, for now if no cssClasses defined while creating the action.
            // @todo : this mapping is not done, and the state is not added to css classes.
            'cssClasses': {
                'key': 'cssClasses',
                'func': function(value, map, item, mappedValues) {
                    var mappedValue = $.merge([], value);
                    // If a state is defined for the given item.
                    // Add the state to the css classes.
                    if (typeof item.state != 'undefined') {
                        mappedValue = $.merge(mappedValue, item.state.current);
                    }
                    return mappedValue.join(' ');
                }
            },
            'children': {
                'key': 'children',
                'func': mad.Map.mapObjects
            }
        })
    }

}, /** @prototype */ {

    /**
     * Set the item state.
     * @param id The item id.
     * @param stateName The state to set.
     */
    setItemState: function(id, stateName) {
        for (i in this.options.items) {
            if (this.options.items[i].id == id) {
                this.options.items[i].state.setState(stateName);
                this.refreshItem(this.options.items[i]);
            }
        }
    },

    /* ************************************************************** */
    /* LISTEN TO THE VIEW EVENTS */
    /* ************************************************************** */

    /**
     * An item has been selected
     * @param {HTMLElement} el The element the event occured on
     * @param {HTMLEvent} ev The event which occured
     * @param {string} item The selected item
     * @return {void}
     */
    ' item_selected': function (el, ev, item) {
        this._super(el, ev, item);
        var action =  item.getAction();
        // If an action has been associated, and the item is not disabled.
        if(action && !item.state.is('disabled')) {
           action();
        }
    }
});

